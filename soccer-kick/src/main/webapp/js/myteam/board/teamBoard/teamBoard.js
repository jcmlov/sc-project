//////////////////// 게시글 검색 ////////////////////
$(document).ready(function() {
	
	var activeSystemClass = $('.list-group-item.active');

	$('#system-search').keyup(function() {
		var that = this;
		var tableBody = $('.table-list-search tbody');
		var tableRowsClass = $('.table-list-search tbody tr');
		$('.search-sf').remove();
		tableRowsClass.each(function(i, val) {

			var rowText = $(val).text().toLowerCase();
			var inputText = $(that).val().toLowerCase();
			if (inputText != '') {
				$('.search-query-sf').remove();
				tableBody.prepend('<tr class="search-query-sf"></tr>');
			} else {
				$('.search-query-sf').remove();
			}

			if (rowText.indexOf(inputText) == -1) {
				tableRowsClass.eq(i).hide();

			} else {
				$('.search-sf').remove();
				tableRowsClass.eq(i).show();
			}
		});
		if (tableRowsClass.children(':visible').length == 0) {
			tableBody.append('<tr class="search-sf"></tr>');
		}
	});
});

//////////////////// 게시판 리스트 ////////////////////
var params = location.href.split("?")[1];
var btype  = params.split("&")[0].split("=")[1];
var tno    = params.split("&")[1].split("=")[1];
var mno    = params.split("&")[2].split("=")[1];
var pno = 1;

callList(pno);
function callList(pno) {
	$.getJSON('/soccer-kick/TeamBoard/ajax/teamBoardList.do?btype=B&tno=' + tno + '&pno=' + pno, function(resultObj){
		var table = $("#listTable");
		var beginPage = resultObj.beginPage;
		var endPage = resultObj.endPage;
		var lastPage = resultObj.lastPage;
		$("tbody").html("");
		
		if(resultObj.list.length == 0) {
			$("<tr>")
			.html("<td colspan='5' style='text-align: center;'>등록된 게시물이 존재하지 않습니다.</td>").appendTo(table);
		} else {
			for (var board of resultObj.list) {
				$("<tr>")
				.html("<td style='width: 8%; text-align: center;'>" + board.rnum +"</td>"
						+"<td><a class='detailLnk' href='#' boardNo='" + board.bno +"'> " +  board.btitle + "</a></td>" 
						+"<td style='width: 10%; text-align: center;'>" + board.bwriter + "</td>"
						+"<td style='width: 15%; text-align: center;'>" + board.bregDate + "</td>"
						+"<td style='width: 10%; text-align: center;'>" + board.bviewCnt + "</td>")
						.appendTo(table);
			}
		}
		
		var liObj = "";
		liObj += '<li><a href="#" class="pageLink" pageNo="' + 1 + '">First</a></li>';
		liObj += '<li><a href="#" class="pageLink" pageNo="' + ((pno==1) ? 1 : pno - 1) + '">Previous</a></li>';
		for(var i = beginPage; i <= endPage; i++) {
			if(pno == i) {
				liObj += '<li><a href="#" class="pageLink" style="background:skyblue;" pageNo="' + i + '">' + i + '</a></li>';
			} else {
				liObj += '<li><a href="#" class="pageLink" pageNo="' + i + '">' + i + '</a></li>';				
			}
		}
		liObj += '<li><a href="#" class="pageLink" pageNo="' + ((pno != lastPage) ? pno++ + 1 : (pno)) + '">Next</a></li>';
		liObj += '<li><a href="#" class="pageLink" pageNo="' + lastPage + '">Last</a></li>';
		
		$(".dc_pagination").html(liObj);
		$("a.detailLnk").click(clickDetailLnk);
		$("a.pageLink").click(clickPageLink);
	})
	.fail(function(){
		
	});
}

 function clickPageLink(event) {
	 event.preventDefault();
	 pno = $(event.target).attr("pageNo");
	 callList(pno);
 }
 
function clickDetailLnk(event) {
	event.preventDefault();
	location.href="detail.html?bno=" + $(event.target).attr("boardNo") + "&tno=" + tno + "&no=" + mno;
	return false;
}
	
//////////////////// 글등록 MODAL ////////////////////
$('#myModal').on('shown.bs.modal', function () {
	  $('#myInput').focus()
});

//////////////////// 파일등록 ////////////////////
var files;

$('#file_Attach').click(function (event){
	event.preventDefault();
	$('#file').click();
});
$('#file').change(function (event){
	$('#file_path').val($(this).val());
	
	files = event.target.files[0];
	
	var fData = new FormData();
	
	fData.append("file", files);
	console.log(fData);
	
	$.ajax({
		url: "/soccer-kick/TeamBoard/ajax/fileRegist.do"
		,dataType: "text"
		,data: fData
		,processData: false
		,contentType: false
		,type: "POST"
		,success: function(resultObj) {
			console.log(resultObj);
			var fileSrc = "";
			var hiddenLoc = $(".form-group");
			var len = hiddenLoc.find("[name=fileAttach]").length;
			
			if(len > 0) {
				hiddenLoc.find("[name=fileAttach]").remove();
			}
			fileSrc = "<input type='hidden' name='fileAttach' value='"+ resultObj+"'>";
			
			hiddenLoc.append(fileSrc);
		}
	});
});
$('#file_path').click(function(){
	$('#file_Attach').click();
});
	
//////////////////// 글등록 ////////////////////
$('#regist').click(function () {
	
	if($("#btitle").val() == "") {
		alertMsgBox("제목을 입력하세요.", "none");
		return false;
	}
	if($("#bcontent").val() == "") {
		alertMsgBox("내용을 입력하세요.", "none");
		return false;
	}
	
	console.log($("input[name=btitle]").val());
	
	$.post('/soccer-kick/TeamBoard/ajax/insert.do',{
		tno: tno,
		btype: 'B',
		btitle: $('#btitle').val(),
		bcontent:$('#bcontent').val(),
		mno: user.mno,
		bfile: $("[name=fileAttach]").val()
	},function (resultObj) {
		$("#btitle").val("");
		$("#bcontent").val("");
		pno = 1;
		callList(pno);
	}, 'json');
});
	
$("#cancleBtn").click(function() {
	$("#btitle").val("");
	$("#bcontent").val("");
	$("#file_path").val("");
	
	var hiddenLoc = $(".form-group");
	var len = hiddenLoc.find("[name=fileAttach]").length;
	
	if(len > 0) {
		hiddenLoc.find("[name=fileAttach]").remove();
	}
});