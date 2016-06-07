var imgCount = 0;
var params = location.href;
var tno = params.split('?')[1].split('&')[0].split('=')[1];
var mno = params.split('?')[1].split('&')[1].split('=')[1];
$(document).ready(function() {
	var template = Handlebars.compile($("#template").html());
		
	$(".fileDrop").on("dragenter dragover", function(event) {
		event.preventDefault();
	});
	
	$(".fileDrop").on("drop", function(event) {
		event.preventDefault();
		event.stopPropagation();
		var file = event.originalEvent.dataTransfer.files;
		
		for (var i=0; i < file.length; i++) {
			var formData = new FormData();
			formData.append('file', file[i]);
			imgCount++;
			uploadFile(formData);
		}
		console.log(imgCount);
	});
	
	$("#deleteAll").click(function(event){
		var fileNames = new Array();
		var index = $('.uploadedList').find('li').length;

		if(index != 0) {
			for(var i=0; i<index; i++){
				fileName = $('.uploadedList li').eq(i).find('[name=fileName]').val();
				fileNames.push(fileName);
			}
			
			$.ajax({
				url: "/soccer-kick/gallery/ajax/deleteAllFiles.do"
				,type: "POST"
				,data: {files: fileNames}
				,dataType: "text"
				,success: function(data) {
					$('[name=btitle]').val("");
					$('[name=bcontent]').val("");
					$('.hiddenTg input').remove();
					$('.uploadedList li').remove(); 
				}
			});
		} else if(index == 0){
			$('[name=btitle]').val("");
			$('[name=bcontent]').val("");
			$('.hiddenTg input').remove();
		}
		$("button#close").trigger("click");
	});
	
	function uploadFile(formData){
		$.ajax({
			url: "/soccer-kick/gallery/ajax/galleryRegist.do"
			,data: formData
			,dataType: 'text'
			,processData: false
			,contentType: false
			,type: 'POST'
			,success: function(data) {
				
				var fileInfo = getFileInfo(data);
				console.log(fileInfo);
				var html = template(fileInfo);
				
				$(".uploadedList").append(html);
				
				var str = "";
				$(".uploadedList .delbtn").each(function(index){
					str = "<input type='hidden' name='files"+ index +"' value='" + $(this).siblings("[name=fileName]").val() + "'>";
				});
				
				$(".hiddenTg").append(str);
			}
		});
	}
	
	function checkImageType(fileName) {
		var pattern = /jpg|gif|png|jpeg/i;
		
		return fileName.match(pattern);
	}
	
	function getImageLink(fileName) {
		if(!checkImageType(fileName)){
			return; 
		}
		var front = fileName.substr(0,12);
		var end = fileName.substr(14);
		
		return front + end;
	}
	
	function getFileInfo(fullName) {
		var fileName, imgsrc, getLink;
		
		var fileLink;
		
		if(checkImageType(fullName)){
			imgsrc= "/soccer-kick/gallery/ajax/displayFile.do?fileName=" + fullName;
			fileLink = fullName.substr(14);
			
			var front = fullName.substr(0,12);
			var end = fullName.substr(14);
			
			getLink = "/soccer-kick/gallery/ajax/displayFile.do?fileName=" + front + end;
		} else {}
		
		fileName = fileLink.substr(fileLink.indexOf("_") + 1);
		
		return {fileName:fileName, imgsrc:imgsrc, getLink:getLink, fullName:fullName};
	}
});

function fn_delete(obj) {
	var object = $(obj);
	var fullName = $(obj).parent().find("[name=fileName]").val();
	
	$.ajax({
		url: "/soccer-kick/gallery/ajax/deleteFile.do"
		,type: "POST"
		,data: {fileName: fullName}
		,dataType: "text"
		,success: function(data) {
			var name = $(obj).parent().find("[name=fileName]").val();
			console.log(name);
			console.log($(".hiddenTg").find("input").length);
			
			$(".hiddenTg").find("input").each(function(){
				if($(this).val() == name) {
					$(this).remove();
					console.log("test");
				}
			});

			$(obj).parent().parent().remove();
		}
	});
	
}

function insert() {
	if($("[name=btitle]").val() == ""){
		alertMsgBox("제목을 입력하세요.", "none");
		return false;
	}
	
	if($("[name=bcontent]").val() == ""){
		alertMsgBox("내용을 입력하세요.", "none");
		return false;
	}
	
	var imgsUrl = "";
	var imgCount = $("div.hiddenTg").children().length;
	
	var imgsStr = "";
	for(var i = 0; i < imgCount; i++) {
		imgsStr += $("input[name=files" + i + "]").val();
		if(i != imgCount - 1) imgsStr += "?";
	}
	
	$.post(contextRoot + "/gallery/ajax/galleryInsert.do", {
		mno : mno,
		tno : tno,
		btitle : $("input[name=btitle]").val(),
		bcontent : $("textarea[name=bcontent]").val(),
		files : imgsStr
	}, function(resultObj) {
		if(resultObj.ajaxResult.status == "success") {
			$("button#close").trigger("click");
			alertMsgBox("파일 업로드 성공", "/views/myteam/board/gallery/teamGallery.html?tno=" + userTeamInfo.tno + "&no=" +user.mno);
			//location.href = contextRoot + "/views/myteam/board/gallery/teamGallery.html?tno=" + userTeamInfo.tno + "&no=" +user.mno;
		}
	}, "json");
	return false;
}

function update() {
	var imgUrl = "";
	var imgCount = $("div.hiddenTg").children().length;
	var mnoVal = $(".clonDiv > input[name=mno]").val();
	var tnoVal = $(".clonDiv > input[name=tno]").val();
	var fnoVal = $(".clonDiv > input[name=fno]").val();
	var bnoVal = $(".clonDiv > input[name=bno]").val(); 
	
	console.log("mnoVal : " + mnoVal + ", tnoVal : " + tnoVal + ", bnoVal : " + bnoVal + ", fnoVal : " + fnoVal);
	
	var imgsStr = "";
	for(var i = 0; i < imgCount; i++) {
		imgsStr += $("input[name=files" + i + "]").val();
		if(i != imgCount - 1) imgsStr += "?";
	}

	$.post(contextRoot + "/gallery/ajax/galleryUpdate.do", {
		mno : mnoVal,
		tno : tnoVal,
		fno : fnoVal,
		bno : bnoVal,
		btitle : $("input[name=btitle]").val(),
		bcontent : $("textarea[name=bcontent").val(),
		files : imgsStr
	}, function(resultObj) {
		if(resultObj.ajaxResult.status == "success") {
			$("button#close").trigger("click");
			$("a.close").trigger("click");
			alertMsgBox("파일 수정 성공", "/views/myteam/board/gallery/teamGallery.html?tno=" + userTeamInfo.tno + "&no=" +user.mno);
			//location.href = contextRoot + "/views/myteam/board/gallery/teamGallery.html?tno=" + userTeamInfo.tno + "&no=" +user.mno;
		}
	}, "json");
	return false;
}

Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear().toString();
    var yarr = [];
    yarr = yyyy.split("");
    var mm = (this.getMonth() + 1).toString();
    var dd = this.getDate().toString();
    return yyyy + "/" + (mm[1] ? mm : '0'+mm[0]) + "/" + (dd[1] ? dd : '0'+dd[0]);
};