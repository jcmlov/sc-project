var params = location.href.split("?")[1];
var btype  = params.split("&")[0].split("=")[1];
var tno    = params.split("&")[1].split("=")[1];
var pno	   = 1;
var listStatus = "before";
getList(btype, tno, pno);
function getList() {
	var root = contextRoot + "/board/list.do?btype=" 
			 + arguments[0] + "&tno=" + arguments[1] 
			 + "&pno=" + arguments[2];
	if(arguments.length > 3) { 
		root += "&keyword=" + arguments[3] 
			 + "&category=" + arguments[4];
	}
	$.getJSON(root, function(resultObj) {
		var lastPage = resultObj.lastPage;
		console.log(lastPage);
		var boardList = "";
		console.log(lastPage);
		for (var board of resultObj.list) {
			boardList += '<div class="post-list ' + listStatus + '">';
			boardList += '<div class="row">																						    ';
			boardList += '    <div class="col-sm-2">																			    ';																   
			boardList += '         <img class="img-responsive" alt="Opt wizard thumbnail" src="' + board.bwriterPhotoPath + '">     ';
			boardList += '    </div>																							    ';
			boardList += '    <div class="col-sm-6">																			    ';
			boardList += '        <h4>																							    ';
			boardList += '            <a href="#" class="username detailLink" boardNo="' + board.bno + '">' + board.btitle + '</a>	';
			boardList += '            <label class="label label-info"><span class="glyphicon glyphicon-comment"></span>' + board.bcommentCnt + '</label>';
			boardList += '        </h4>																							    ';
			boardList += '        <h5>																							    ';
			boardList += '        <span>글쓴이&nbsp: ' + board.bwriter + '|</span>													';
			boardList += '        <span><i class="fa fa-calendar"></i>' + board.bmodDate + '|</span>								';
			boardList += '		  조회수 : ' + board.bviewCnt;
			boardList += '        </h5>																							    ';
			boardList += '        <p class="description" style="font-size:15px;">' + board.bcontent + '</p>							';   
			boardList += '    </div>																							    ';
			boardList += '    <div class="col-sm-4" data-no-turbolink="">														   ' ;
			boardList += '        <a class="btn btn-info btn-download btn-round pull-right makeLoading detailLink" boardNo="' + board.bno + '" href="#">';
			boardList += '        <i class="fa fa-share detailLink" boardNo="' + board.bno + '"></i> 상세보기							';
			boardList += '        </a>																							    ';
			boardList += '    </div>                                                     										    ';
			boardList += '</div>																									';
			boardList += '</div>                                                                                                    ';
			boardList += '<hr style="color:skyblue; background-color: skyblue;height: 1px;"/>										';
		}
		if(pno == lastPage) {
			$("#load-list").css("display", "none");
			$("#goTop").removeClass("col-md-4").removeClass("col-md-offset-2")
					.addClass("col-md-6").addClass("col-md-offset-3")
					.find("a").html('<i class="fa fa-chevron-up fa-fw text-danger"></i>위로가기 ( 더이상 목록이 없습니다. )</a>');
		} else {
			$("#load-list").css("display", "block");
			$("#goTop").removeClass("col-md-6").removeClass("col-md-offset-3")
			.addClass("col-md-4").addClass("col-md-offset-2")
			.find("a").html('<i class="fa fa-chevron-up fa-fw text-danger"></i>위로가기</a>');
		}
		$("#listDiv").html($("#listDiv").html() + boardList);
		$("a.detailLink").click(clickDetailLink);
	});
};
function clickDetailLink(event) {
	event.preventDefault();
	location.href = "detail.html?btype=S&bno="
				  + $(event.target).attr("boardNo");
};

$("a.searchIndex").click(function(event) {
	event.preventDefault();
	$(".search_concept").html($(event.target).text());
});

$("input.search-data").keyup(function(event) {
	var keyword = $(event.target).val();
	var category = $("span.search_concept").text();
	if(keyword == "") {
		getList(btype, tno, pno);
		$("." + listStatus).remove();
		if(listStatus == "before") {
			listStatus = "after";			
		} else {
			listStatus = "before";
		}
	} else {
		getList(btype, tno, pno, keyword, category);
		$("." + listStatus).remove();
		if(listStatus == "before") {
			listStatus = "after";			
		} else {
			listStatus = "before";
		}
	}
});

$("a.search-btn").click(function(event) {
	event.preventDefault();
});

$("a.text-muted").click(function(event) {
	event.preventDefault();
	$(".search-data").val("");
});

$("#new").click(function() {
	event.preventDefault();
	location.href = "form.html?tno=" + userTeamInfo.tno;
});

$("#load-list").click(function() {
	event.preventDefault();
	pno++;
	getList(btype, tno, pno);
});

//typo ----------------------------------------
var duration = 300;
$('#typo').typoShadow({radius: 2});

