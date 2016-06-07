var slideIndex = 1;
var numImages;
function autoPlay() {
	console.log(slideIndex, numImages);
	$("#thumb" + slideIndex).trigger("click");
	slideIndex++;
	if(slideIndex > numImages) slideIndex = 1;
};

$("thumbnail-slider-next").click(function() {
	slideIndex++;	
});

$("thumbnail-slider-prev").click(function() {
	slideIndex--;
});

//////////////////ajax/////////////////////
var params = location.href.split("?")[1];
var btype  = params.split("&")[0].split("=")[1];
var bno    = params.split("&")[1].split("=")[1];

$.getJSON(
	contextRoot + "/board/detail.do?btype=" + btype + "&bno=" + bno,
	function(resultObj) {
		
		var boardDetailObj = resultObj.boardDetail;
		var filesObj = resultObj.files;
		numImages = filesObj.length;
		
		if(numImages != 0) {
			for(var i = 0; i < numImages; i++) {
				var slideObj = '<li><a class="ns-img" href="' + filesObj[i].fpath + '"></a></li>';
				var thumbObj = '<li id="thumb' + (i + 1) + '"onclick="return thumbClick(' + (i + 1) + ')"><a class="thumb" href="' + filesObj[i].fpath + '"></a><span>' + (i + 1) + '</span></li>';
				$("#slideList").html($("#slideList").html() + slideObj);
				$("#thumbList").html($("#thumbList").html() + thumbObj);
				
			}
			var mcThumbnailSlider = new ThumbnailSlider(thumbnailSliderOptions);
			var nslider = new NinjaSlider(nsOptions);
		} else {
			$("#ninja-slider").remove();
		}
		
		var boardDetailObj = resultObj.boardDetail;
		var filesObj = resultObj.files;
		$("#btitle").html($("#btitle").html() + boardDetailObj.btitle);
		$("#bmodDate").html($("#bmodDate").html() + boardDetailObj.bmodDate);
		$("#bwriter").html($("#bwriter").html() + boardDetailObj.bwriter);
		$("#bviewCnt").html($("#bviewCnt").html() + " 조회수 : " + boardDetailObj.bviewCnt);
		$("#bcontent").html($("#bcontent").html() + boardDetailObj.bcontent);
		$("#bcommentCnt").html($("#bcommentCnt").html() + " 댓글수 : " + boardDetailObj.bcommentCnt);
		$("#btns").css("opacity", "0")
				.css("left", $("#slideList").offset().left + 10)
				.css("top", 90);
		if(user.mno != boardDetailObj.mno) {
			$("#modify").remove();
			$("#delete").remove();
		}
	}
);
//////////////////////////////////////////////
///////////////////play interval/////////////
var interval;
var currentState = "stop";
$("#playBtn").click(function () {
	if(currentState == "stop") {
		interval = setup();
		currentState = "play";
	}
});
$("#stopBtn").click(function() {
	clearInterval(interval);
	currentState = "stop";
});

function thumbClick(index) {
	slideIndex = index;
};

function setup() {
	return setInterval(autoPlay, 1000);
};

$(window).resize(function() {
	$("#btns").css("opacity", "0")
			.css("left", $("#slideList").offset().left + 10)
			.css("top", 90);
});

window.onload = function() {
	$("#btns").css("opacity", "0")
			.css("left", $("#slideList").offset().left + 10)
			.css("top", 90);
};
/////////////////////////////////////////////////////
/////////////////////btns hidden////////////////////
$("#slideList").hover(function() {
	$("#btns").css("opacity", "0.7")
			.css("transition-duration", "1s");
}, function() {
	$("#btns").css("opacity", "0")
			.css("transition-duration", "1s");
});
$("#playBtn").hover(function() {
	$("#btns").css("opacity", "0.7")
	.css("transition-duration", "1s");
}, function() {
	$("#btns").css("opacity", "0")
			.css("transition-duration", "1s");
});
$("#stopBtn").hover(function() {
	$("#btns").css("opacity", "0.7")
	.css("transition-duration", "1s");
}, function() {
	$("#btns").css("opacity", "0")
			.css("transition-duration", "1s");
});


//////////////////////버튼 클릭 이벤트////////////////
$("#list").click(function() {
	location.href = contextRoot + "/views/myteam/board/strategy/list.html?btype=S&tno=" + userTeamInfo.tno;
});

$("#modify").click(function() {
	var str = $("#btitle").html().toString();
	var btitle = str.substring(40, str.length);
	var bcontent = $("#bcontent").html().toString();
	$("#mBtitle").val(btitle);
	$("#mBcontent").html(bcontent);
});

$("#modalModBtn").click(function() {
	var btitle = $("#mBtitle").val();
	var bcontent = $("#mBcontent").val();
	$.post(contextRoot + "/board/update.do", {
		btitle : btitle,
		bcontent : bcontent,
		bno : bno
	}, function(resultObj) {
		if(resultObj.ajaxResult.status == "success") {
			$("#btitle").html(btitle);
			$("#bcontent").html(bcontent);
			$("button.close").trigger("click");			
		}
	}, 'json');
	//console.log(btitle, bcontent);
});

$("#delete").click(function() {
	$.getJSON(contextRoot + "/board/delete.do?bno=" + bno + "&memail=" + user.memail, function(resultObj) {
		console.log(resultObj.ajaxResult.status);
		if(resultObj.ajaxResult.status == "success") {
			location.href = "list.html?btype=S&tno=" + userTeamInfo.tno;			
		}
	});
});

$("#write").click(function() {
	location.href = "form.html?tno=" + userTeamInfo.tno;
});


////////////////////댓글///////////////////////
var pno = 1;
getCmtList();
function getCmtList() {
	$.getJSON(contextRoot + "/comment/list.do?bno=" + bno + "&pno=" + pno, function(resultObj) {
		var lastPage = resultObj.lastPage;
		var commentList = resultObj.list;
		var commentObj = "";
		for(var comment of commentList) {
			commentObj += '<li id="cno' + comment.cno + '" class="clearfix"><img               ';
			commentObj += 'src="' + comment.mpath + '" class="avatar"      					   ';
			commentObj += 'alt="">                                                             ';
			commentObj += '<div class="post-comments">                                         ';
			commentObj += '	<p class="meta">                                                   ';
			commentObj += comment.cregDate + ' <a>' + comment.mname + ' (' + comment.memail + ')</a><i';
			commentObj += '			class="pull-right">';
			if(comment.memail == user.memail) {
				commentObj += '<a class="cmtUpdateLink" href="#"><small cno="' + comment.cno + '">수정</small></a>&nbsp;&nbsp;&nbsp;';
				commentObj += '<a class="cmtDeleteLink" href="#"><small cno="' + comment.cno + '">삭제</small></a></i>';				
			}
			commentObj += '	</p>                                                               ';
			commentObj += '	<p id="cmtContent">' + comment.ccontent + '</p>    				   ';
			
			commentObj += '<form class="form-horizontal" role="form" style="display:none;">';
			commentObj += '	<div class="form-group">';
			commentObj += '		<div class="col-sm-12">';
			commentObj += '			<textarea id="modContent" class="form-control2" style="resize:none;"></textarea>';
			commentObj += '		</div>';
			commentObj += '	</div>';
			commentObj += '	<div class="form-group">';
			commentObj += '		<div class="col-sm-12">';
			commentObj += '			<a href="#" class="btn btn-default btn-sm modLink" cno="' + comment.cno + '">modify</a>';
			commentObj += '			<a href="#" id="cancelBtn" class="btn btn-default btn-sm cancelLink" cno="' + comment.cno + '">cancel</a>';	
			commentObj += '		</div>';
			commentObj += '	</div>';
			commentObj += '</form>';
			commentObj += '</div></li>                                                         ';
		}
		if(pno == lastPage) {
			$("#load-list").css("display", "none");
			$("#goTop").removeClass("col-md-4").removeClass("col-md-offset-2")
					.addClass("col-md-6").addClass("col-md-offset-3")
					.find("a").html('<i class="fa fa-chevron-up fa-fw text-danger"></i>위로가기 ( 더이상 목록이 없습니다. )</a>');
		}
		$(".comments").html($(".comments").html() + commentObj);
		$("a.cmtUpdateLink").click(clickCmtUpdateLink);
		$("a.cmtDeleteLink").click(clickCmtDeleteLink);
		$("a.modLink").click(clickModLink);
		$("a.cancelLink").click(clickCancelLink);
	});
};

$("#load-list").click(function() {
	event.preventDefault();
	pno++;
	getCmtList();
});

function cmtAdd(event) {
	var ccontent = $("#cmtInputBox").val()
	$.post(contextRoot + "/comment/add.do", {
		bno : bno,
		mno : user.mno,
		ccontent : ccontent
	}, function(resultObj) {
		if(resultObj.ajaxResult.status == "success") {
			$(".comments").empty();
			getCmtList();
		}
	}, 'json');
	
	$("#cmtInputBox").val("");
	return false;
};

Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear().toString();
    var yarr = [];
    yarr = yyyy.split("");
    var mm = (this.getMonth() + 1).toString();
    var dd = this.getDate().toString();
    return yarr[2] + yarr[3] + "-" + (mm[1] ? mm : '0'+mm[0]) + "-" + (dd[1] ? dd : '0'+dd[0]);
};

function clickCmtUpdateLink(event) {
	event.preventDefault();
	var cno = $(event.target).attr("cno");
	$("#cno" + cno).find(".form-horizontal").css("display", "block");
	$("#cno" + cno).find("#cmtContent").css("display", "none");
	$("#cno" + cno).find("#modContent")
				   .html($("#cno" + cno).find("#cmtContent").html())
				   .focus();
};

function clickCmtDeleteLink(event) {
	event.preventDefault();
	var cno = $(event.target).attr("cno");
	$.getJSON(contextRoot + "/comment/delete.do?memail=" + user.memail + "&cno=" + cno, function(resultObj) {
		if(resultObj.ajaxResult.status == "success") {
			$("#cno" + cno).remove();			
		}
	});
};

function clickModLink(event) {
	event.preventDefault();
	var cno = $(event.target).attr("cno");
	console.log(cno)
	var ccontent = $("#cno" + cno).find("#modContent").val();
	console.log(ccontent);
	$.post(contextRoot + "/comment/update.do", {
		memail : user.memail,
		cno : cno,
		ccontent : ccontent
	}, function(resultObj) {
		if(resultObj.ajaxResult.status == "success") {
			$("#cno" + cno).find(".form-horizontal").css("display", "none");
			$("#cno" + cno).find("#cmtContent").css("display", "block").html(ccontent);
		}
	}, 'json');
};

function clickCancelLink(event) {
	event.preventDefault();
	var cno = $(event.target).attr("cno");
	$("#cno" + cno).find(".form-horizontal").css("display", "none");
	$("#cno" + cno).find("#cmtContent").css("display", "block");
}