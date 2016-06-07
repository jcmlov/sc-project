/*
 $('#myModal').on('shown.bs.modal', function () {
	  $('#myInput').focus()
	})
	    var bno = location.href.split('?')[1].split('=')[1];
	    */



//////////////////// 게시글 상세정보 ////////////////////
var params = location.href.split("?")[1];
var bno = params.split('&')[0].split("=")[1];
var tno = params.split("&")[1].split("=")[1];
var mno = params.split('&')[2].split("=")[1];
var pno = 1;
getDetail();
getCommentList();
function getDetail() {
	$.getJSON("/soccer-kick/board/detail.do?bno=" + bno + "&btype=B", function(resultObj) {
		if(resultObj.status == "success") {
			var boardDetail = resultObj.boardDetail;
			var files = resultObj.files;
			console.log(files);
			$('.title').text(boardDetail.btitle);
			$('.reg_date').text(boardDetail.bregDate);
			$('.writer').text(boardDetail.bwriter);
			$('.content').text(boardDetail.bcontent);
			if(files.length == 0) {
				$('.file').html("등록된 파일이 없습니다.");
			} else {
				for(var i = 0; i < files.length; i++) {
					$('.file').html("<a href=" + contextRoot + "/board/down.do?foriName=" + files[i].foriName + "&frealName=" + files[i].frealName + "&fpath=" + files[i].fpath + ">" + files[i].foriName + "</a>");
				}
			}
			$('.viewcnt').text(boardDetail.bviewCnt);
			$('.viewcnt').append(
					"<input type='hidden' name='bno' value='" + boardDetail.bno + "'/>");
			// if(mno =)
		}
	});	
	
	$.ajax({
		url: "/soccer-kick/TeamBoard/ajax/userSelect.do"
		,data: {
			mno: mno
		}
		,success: function(resultObj) {
			var result = resultObj.data;
			console.log(result)
			$("[name=mname]").val(result.mname);
			$("[name=memail]").val(result.memail);
		}
	});
}

function getCommentList() {
	$.getJSON("/soccer-kick/comment/list.do?bno=" + bno + "&pno=" + pno, function(resultObj) {
		var lastPage = resultObj.lastPage;
		var commentList = resultObj.list;
		var commentObj = "";
		
		var result = resultObj.list;
		var comDiv = $("#commentDiv");
		
		for(var comment of result) {
			var commentStr = "";
				commentStr += '<span ><div class="col-sm-1">';
				commentStr += '<div class="thumbnail">';
				if(comment.mpath != null) {
					commentStr += '<img class="img-responsive user-photo" src="'+ comment.mpath +'">';
				} else {
					commentStr += '<img class="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png">';
				}
				commentStr += '</div></div>';
				commentStr += '<div class="col-sm-11">';
				commentStr += '<div class="panel panel-default">';
				commentStr += '<div class="panel-heading"><div class="form-group">';
				commentStr += '<div class="col-sm-10"><span class="glyphicon glyphicon-user"></span><span style="margin-left:1%;"><strong>'+ comment.mname +'</strong></span>';
				commentStr += '<span class="glyphicon glyphicon-calendar" style="margin-left:2%; color:#1180A6;"></span>';
				commentStr += '<span class="text-muted"><strong>'+ comment.cregDate +'</strong></span></div>';
				if(comment.memail == user.memail) {
					commentStr += '<div class="col-sm-1">';
					commentStr += '<a href="#" class="modLink" cno="'+ comment.cno +'" ctnt="' + comment.ccontent +'"><span class="glyphicon glyphicon-pencil" style="color:#1180A6;"></span></a>';
					commentStr += '<a href="#" class="cancelLink" cno="'+ comment.cno +'"><span class="glyphicon glyphicon-trash" style="margin-left:10px; color:#D62054;"></span></a></div>';
				}
				commentStr += '</div></div><div class="panel-body">'+ comment.ccontent +'</div>';
				commentStr += '</div></div></span>';
				
				comDiv.append(commentStr);
				
		}
		$(".modLink").click(clickModLink);
		$(".cancelLink").click(clickCancelLink);
	});	
}

$("#load-list").click(function() {
	event.preventDefault();
	pno++;
	getCommentList();
});

$( "#list" ).click(clickListLnk);

//////////////////// 게시글 수정 ////////////////////
$('#modify').click(function () {
	  $('.update-title').val($("th.title").text());
	  $('.update-content').text($("p.content").text());
	  $('#bno').val(bno);
});

$('#regist').click(function () {
   	if($("#btitle").val() == "") {
   		alertMsgBox("제목을 입력하세요.", "none");
   		return false;
   	}
   	if($("#bcontent").val() == "") {
   		alertMsgBox("내용을 입력하세요.", "none");
   		return false;
   	}
   	 var bno = $('#bno').val();
   	 var btitle = $('#btitle').val();
   	 var bcontent = $('#bcontent').val();
   	 $.post('/soccer-kick/TeamBoard/ajax/update.do',{
   		bno: bno,
   		btitle: btitle,
   		bcontent: bcontent
   		
   	 }, function (resultObj) {
   		 if(resultObj.status =="success") {
   			 alertMsgBox("게시글 수정이 완료되었습니다.", "none");
   			 $('.title').text(resultObj.data.btitle);
   			 $('.content').text(resultObj.data.bcontent);
	   	 }
   	 },'json');	
});

//////////////////// 게시글 삭제 ////////////////////
$("#delete").click(function( event ) {
	 if(confirm("정말 삭제하시겠습니까?") == true) {
		 $.ajax({
			 url: "/soccer-kick/TeamBoard/ajax/delete.do"
				 ,data: { bno: $("[name=bno]").val() }
		 ,success: function() {
			 location.href="boardListForm.html?btype=B&tno=" + tno + "&no" + mno;
		 }
		 },'json');
	}else{
		retrun;
	} 
});

$( "#write" ).click(function( event ) {
    location.href='/community/notice/edit';
});

function clickListLnk(event) {
	event.preventDefault();
	location.href="boardListForm.html?btype=B&tno=" + tno + "&no=" + mno;
}
////////////////////댓글 등록 ////////////////////
$("#comRegBtn").click(function(event) {
	event.preventDefault();
	
	$.ajax({
		url: "/soccer-kick/comment/add.do"
		,dataType: "JSON"
		,type: "POST"
		,data: {
			bno: bno
			,mno: mno
			,mname: $("[name=mname]").val()
			,ccontent: $("[name=ccontent]").val()
		}
		,success: function(resultObj) {
			var result = resultObj.comment;
			
			location.href="detail.html?bno=" + result.bno + "&tno=" + tno + "&no=" + mno;
		}
	});
})

function clickModLink(event) {
	event.preventDefault();
	event.stopPropagation();
	var cno = $(event.target).parent().attr("cno");
	var ctnt = $(event.target).parent().attr("ctnt");
	
	$.ajax({
		url: "/soccer-kick/TeamBoard/ajax/commentSelectOne.do"
		,dataType: "JSON"
		,type: "GET"
		,data: {
			cno: cno
		}
		,success: function(resultObj) {
			ctnt = resultObj.data.ccontent;
		}
	});
	
	var content = '<textarea id="ccontent" name="ccontent" class="form-control2 col-lg-5" rows="2" maxlength="250" style="width:90%;">'+ ctnt +'</textarea>';
		content += '<input type="hidden" name="cno" value="'+ cno +'">';
		content += '<button type="button" id="comUpdate" class="btn btn-info btn-xs">수정</button>';
		content += '<button type="button" id="comCancle" class="btn btn-danger btn-xs">취소</button>';
		
	$(event.target).parent().parent().parent().parent().parent().find(".panel-body").empty().append(content);
}

$(document).on("click", "#comUpdate", function(event){
	event.preventDefault();
	event.stopPropagation();
	var cno = $(event.target).parent().find("[name=cno]").val();
	var ctnt = $(event.target).parent().find("[name=ccontent]").val();
	var email = $("#commentTb").children().find("[name=memail]").val();
	
	$.ajax({
		url: "/soccer-kick/comment/update.do"
		,dataType: "JSON"
		,type: "POST"
		,data: {
			cno: cno
			,ccontent: ctnt
			,memail: email
		}
		,success: function(resultObj) {
			$(event.target).parent().empty().text(resultObj.comment.ccontent);
			$(event.target).parent(".panel-default").find(".panel-heading").children().find(".modLink").attr("ctnt", resultObj.comment.ccontent);
		}
	});
});

$(document).on("click", "#comCancle", function(event){
	event.preventDefault();
	event.stopPropagation();
	var ctnt = $(event.target).parent().find("[name=ccontent]").val();
	
	$(event.target).parent().empty().text(ctnt);
});


function clickCancelLink(event) {
	event.preventDefault();
	event.stopPropagation();

	var cno = $(event.target).parent().attr("cno");
	var email = $("#commentTb").children().find("[name=memail]").val();
	
	$.ajax({
		url: "/soccer-kick/comment/delete.do"
		,dataType: "JSON"
		,type: "GET"
		,data: {
			cno: cno
			,memail: email
		}
		,success: function(resultObj) {
			$(event.target).parent().parent().parent().parent().parent().parent().parent().children().remove();
		}
	});
}