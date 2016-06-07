//tno 파싱해서 선수정보 불러와서 이미지 주소 활용해야함!
var tno = location.href.split("?")[1].split("=")[1];
var memberCnt;
var imagePath = [];
$.getJSON(contextRoot + "/member/list.do?tno=" + tno, function(resultObj) {
	if(resultObj.ajaxResult.status == "success") {
		console.log(11111);
		var memberList = resultObj.ajaxResult.data;
		memberCnt = memberList.length;
		console.log(memberList);
		for(var i = 0; i < memberCnt; i++) {
			if(memberList[i].mpath == null) {
				imagePath[i] = contextRoot + "/images/commons/baseUserIcon.png";
			} else {
				imagePath[i] = memberList[i].mpath;				
			}
		}
		if(memberCnt <= 11) {
			for(var i = memberCnt - 1; i < 11; i++) {
				imagePath[i] = contextRoot + "/images/commons/baseUserIcon.png";
			}
		}
		if(memberCnt > 11) {
			for(var i = 11; i < memberCnt; i++) {
				var tempObj = '<li><img src="' + imagePath[i] + '" /></li>';
				$("#replacementPlayers").html($("#replacementPlayers").html() + tempObj);
			}
		}
		initGround();
		window.addEventListener('resize', reCanvasResize);
	}
});

// target elements with the "draggable" class
interact('.draggable').draggable({
	// enable inertial throwing
	inertia : true,
	// keep the element within the area of it's parent
	restrict : {
		restriction : "parent",
		endOnly : true,
		elementRect : {
			top : 0,
			left : 0,
			bottom : 1,
			right : 1
		}
	},
	// enable autoScroll
	autoScroll : true,

	// call this function on every dragmove event
	onmove : dragMoveListener,
});

function dragMoveListener(event) {
	var target = event.target,
	// keep the dragged position in the data-x/data-y attributes
	x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx, y = (parseFloat(target
			.getAttribute('data-y')) || 0)
			+ event.dy;

	// translate the element
	target.style.webkitTransform = target.style.transform = 'translate('
			+ x + 'px, ' + y + 'px)';

	// update the posiion attributes
	target.setAttribute('data-x', x);
	target.setAttribute('data-y', y);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

//capture
var screenShotIndex = 0;
var scrollPos;
$("#captureBtn").click(function(event) {
	event.preventDefault();
	scrollPos = document.body.scrollTop;
	html2canvas($("#playGround"), {
		useCORS : true,
		proxy : '/etc/proxy_image',
		allowTaint: true,
		onrendered : function(canvas) {
			var image = canvas.toDataURL("image/png", 1.0);
			$("#capturedImages").html($("#capturedImages").html() + '<span id="screenShot' + screenShotIndex + '"><img src=' + image + ' style="width: 118px; height: 78px; padding:5px;"></span>');
			//reset canvas
			var canvas = document.getElementById('playGroundCanvas');
		    var context = canvas.getContext('2d');
		    context.clearRect(0, 0, canvas.width, canvas.height);
		    context.beginPath();
		    window.scrollTo(0,scrollPos);
		}
	});
	screenShotIndex++;
});

//Strategyboard image upload and regist
$("#registBtn").click(function () {
	var imgUrlObj = $("#capturedImages").children();
	var imgUrlCnt = $("#capturedImages").children().size();
	var imgUrlList = "";
	
	for(var i = 1; i < imgUrlCnt; i++) {
		imgUrlList += imgUrlObj.eq(i).children().eq(0).attr("src");
		if(i != imgUrlCnt - 1) {
			imgUrlList += "?"
		}
	}
	
	$.post(contextRoot + "/board/add.do",  {
		tno : user.tno,
		mno : user.mno,
		btype : 'S',
		btitle : $("#strategyTitle").val(),
		bcontent : $("#strategyContent").val(),
		screenShotImages : imgUrlList
	}, function(resultObj) {
		alertMsgBox("Registed!", "/views/myteam/board/strategy/list.html?btype=S&tno=" + user.tno);
	}, 'json');
	return false;
});

$("#test111").click(function() {
	basicLineColor = "red";
	painter();
});


var basicLineColor = "black";
function setTextColor(picker) {
	basicLineColor = '#' + picker.toString();
	painter();
}
var isPress = false;
var painter = function() {
	var canvas = document.getElementById("playGroundCanvas");
	var context = canvas.getContext("2d");
	context.strokeStyle = basicLineColor;
	context.lineWidth = 3;
	$(canvas).on({
		mousedown : function(event) {
			isPress = true;
			var pos = $(this).offset();
			var x = event.pageX - pos.left;
			var y = event.pageY - pos.top;

			context.beginPath();
			context.moveTo(x, y);
			
		},
		mouseup : function(event) {
			isPress = false;
		},
		mousemove : function(event) {
			var pos = $(this).offset();
			var x = event.pageX - pos.left;
			var y = event.pageY - pos.top;

			if(isPress) {
				context.lineTo(x, y);
				context.stroke();
			}
		}
	});
};

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
var playGroundWidth, playGroundHeight, tmpPlayGroundWidth, tmpPlayGroundHeight;
//initial fomation : 3-2-3-2
var fomationInfo = "3-2-3-2";
var fomationInfo2 = "2-3-2-3";

var initGround = function() {
	playGroundWidth = $("#playGround").width();
	playGroundHeight = $("#playGround").height();
	$("#playGround").html("<canvas id='playGroundCanvas' width=" + playGroundWidth + " height=" + playGroundHeight + " style='background-size:" + playGroundWidth + "px " + playGroundHeight + "px; background-image: url(\"/soccer-kick/images/myteam/board/strategy/sField.png\"); box-shadow: 10px 10px 10px gray;'></canvas>")
					.css({"width" : playGroundWidth, "height" : playGroundHeight});
	playerArranger(0);
	playerArranger2(12);
	painter();
}

var reCanvasResize = function() {
	tmpPlayGroundWidth = playGroundWidth, tmpPlayGroundHeight = playGroundHeight;
	$("#playParent").empty().html("<div id='playGround'><img src='/soccer-kick/images/myteam/board/strategy/sField.png' class='img-responsive'></div>");
	playGroundWidth = $("#playGround").width();
	playGroundHeight = $("#playGround").height();
	$("#playGround").html("<canvas id='playGroundCanvas' width=" + playGroundWidth + " height=" + playGroundHeight + " style='background-size:" + playGroundWidth + "px " + playGroundHeight + "px; background-image: url(\"/soccer-kick/images/myteam/board/strategy/sField.png\"); box-shadow: 10px 10px 10px gray;'></canvas>")
					.css({"width" : playGroundWidth, "height" : playGroundHeight});
	playerArranger(0);
	playerArranger2(12);
	painter();
}

var playerArranger = function(index) {
	var fomation = fomationInfo.split("-");
	var playerIndex = index;
	
	ball2html(playGroundWidth / 2 - 14, -playGroundHeight / 2 - 25);
	playerIndex++;
	var div = 1;
	for(var i = - 1; i < fomation.length; i++) {
		if(i == -1) {
			player2html(playerIndex, playGroundWidth / 20, -1 * playGroundHeight / 2 - 50);
			playerIndex++;
		} else {
			for(var j = 1; j <= fomation[i]; j++) {
				player2html(
						playerIndex, 
						div * playGroundWidth / ((fomation.length + 1) * 2),  
						j * (-1 * playGroundHeight / (parseInt(fomation[i]) + 1)) + (playerIndex) * -35
				);
				playerIndex++;
			}
			div++;
		}
	}
}

var playerArranger2 = function(index) {
	var fomation = fomationInfo2.split("-");
	var playerIndex = index;
	
	var div = 1;
	for(var i = 0; i < fomation.length; i++) {
		 for(var j = 1; j <= fomation[i]; j++) {
				player2html2(
					playerIndex, 
					playGroundWidth / 2 + div * playGroundWidth / ((fomation.length + 1) * 2) - 30,  
					j * (-1 * playGroundHeight / (parseInt(fomation[i]) + 1)) + (playerIndex) * -33
				);
				playerIndex++;
			}
			div++; 
		}
	player2html2(
		playerIndex,
		playGroundWidth * 18.5 / 20,
		-1 * playGroundHeight / 2 + ((playerIndex) * -33)
	);
}
/////////////////////////////
////////ball to html///////
var ball2html = function(x, y) {
	var playerObj = "<div id='ball' class='draggable drag' data-x=" + x + " data-y=" + y + " style='transform: translate(" + x + "px, " + y + "px); background-image: url(\"/soccer-kick/images/myteam/board/strategy/ball.png\"); background-size: 100%, 100%;'></div>";
	$("#playGround").html($("#playGround").html() + playerObj);
}
/////////////////////////////
////////player to html///////
var player2html = function(playerIndex, x, y) {
	var playerObj = "<div id='player" + playerIndex + "' class='draggable drag' data-x=" + x + " data-y=" + y + " style='transform: translate(" + x + "px, " + y + "px); background-image: url(\"" + imagePath[playerIndex - 1] + "\"); background-size: 100%, 100%;'></div>";
	$("#playGround").html($("#playGround").html() + playerObj);
}
var player2html2 = function(playerIndex, x, y) {
	var playerObj = "<div id='player" + playerIndex + "' class='draggable drag drag2' data-x=" + x + " data-y=" + y + " style='transform: translate(" + x + "px, " + y + "px); background-image: url(\"/soccer-kick/images/myteam/board/strategy/devil.png\"); background-size: 100%, 100%;'></div>";
	$("#playGround").html($("#playGround").html() + playerObj);
}
///////////////////////////////////////////////
////////////event for formation buttons/////////
$("#fomation3232").click(function() {
	fomationInfo = "3-2-3-2";
	initGround();
});
$("#fomation3142").click(function() {
	fomationInfo = "3-1-4-2";
	initGround();
});
$("#fomation3223").click(function() {
	fomationInfo = "3-2-2-3";
	initGround();
});
$("#fomation442").click(function() {
	fomationInfo = "4-4-2";
	initGround();
});
$("#fomation4312").click(function() {
	fomationInfo = "4-3-1-2";
	initGround();
});
$("#fomation4231").click(function() {
	fomationInfo = "4-2-3-1";
	initGround();
});
$("#fomation4213").click(function() {
	fomationInfo = "4-2-1-3";
	initGround();
});
$("#fomation4321").click(function() {
	fomationInfo = "4-3-2-1";
	initGround();
});
$("#fomation4123").click(function() {
	fomationInfo = "4-1-2-3";
	initGround();
});
$("#fomation433").click(function() {
	fomationInfo = "4-3-3";
	initGround();
});
$("#fomation5221").click(function() {
	fomationInfo = "5-2-2-1";
	initGround();
});

$("#fomation2-3232").click(function() {
	fomationInfo2 = "2-3-2-3";
	initGround();
});
$("#fomation2-3142").click(function() {
	fomationInfo2 = "2-3-1-3";
	initGround();
});
$("#fomation2-3223").click(function() {
	fomationInfo2 = "3-2-2-3";
	initGround();
});
$("#fomation2-442").click(function() {
	fomationInfo2 = "2-4-4";
	initGround();
});
$("#fomation2-4312").click(function() {
	fomationInfo2 = "2-1-3-4";
	initGround();
});
$("#fomation2-4231").click(function() {
	fomationInfo2 = "1-3-2-4";
	initGround();
});
$("#fomation2-4213").click(function() {
	fomationInfo2 = "3-1-2-4";
	initGround();
});
$("#fomation2-4321").click(function() {
	fomationInfo2 = "1-2-3-4";
	initGround();
});
$("#fomation2-4123").click(function() {
	fomationInfo2 = "3-2-1-4";
	initGround();
});
$("#fomation2-433").click(function() {
	fomationInfo2 = "3-3-4";
	initGround();
});
$("#fomation2-5221").click(function() {
	fomationInfo2 = "1-2-2-5";
	initGround();
});



/////////////////change player///////////////////////
var replacePlayerClickCnt = 0;
var imgTmpPath = [];
var objTest = [];
var judge = [];

function playerEventInField() {
	objTest[replacePlayerClickCnt] = $(this);
	judge[replacePlayerClickCnt] = 0;
	$(this).css("border", "1px solid yellow");
	imgTmpPath[replacePlayerClickCnt] = $(this).css("background-image");
	var host = location.protocol + '//' + location.hostname + ':'+ location.port;
	imgTmpPath[replacePlayerClickCnt] = imgTmpPath[replacePlayerClickCnt].substring(5, imgTmpPath[replacePlayerClickCnt].length - 2);
	imgTmpPath[replacePlayerClickCnt] = imgTmpPath[replacePlayerClickCnt].substring(host.length);
	replacePlayerClickCnt++;					
	
	if(replacePlayerClickCnt == 2) {
		if(judge[0] == 0 && judge[1] == 0) {
			objTest[0].css({"border" : "2px solid blue", "background-image": "url('" + imgTmpPath[1] + "')", "box-shadow": "2px 2px 2px gray"});
			objTest[1].css({"border" : "2px solid blue", "background-image": "url('" + imgTmpPath[0] + "')", "box-shadow": "2px 2px 2px gray"});							
		} else if(judge[0] == 0 && judge[1] == 1) {
			objTest[0].css({"border" : "2px solid blue", "background-image": "url('" + imgTmpPath[1] + "')", "box-shadow": "2px 2px 2px gray"});
			objTest[1].attr("src", imgTmpPath[0]).css("border", "2px solid yellow");
		} else if(judge[0] == 1 && judge[1] == 0) {
			objTest[1].css({"border" : "2px solid blue", "background-image": "url('" + imgTmpPath[0] + "')", "box-shadow": "2px 2px 2px gray"});
			objTest[0].attr("src", imgTmpPath[1]).css("border", "2px solid yellow");
		} else {
			objTest[0].attr("src", imgTmpPath[1]).css("border", "2px solid yellow");
			objTest[1].attr("src", imgTmpPath[0]).css("border", "2px solid yellow");
		}
		replacePlayerClickCnt = 0;
	}
}

function playerEventInReplacementArea() {
	objTest[replacePlayerClickCnt] = $(this).children().eq(0);
	$(this).children().eq(0).css("border", "2px solid red");
	judge[replacePlayerClickCnt] = 1;
	imgTmpPath[replacePlayerClickCnt] = $(this).children().eq(0).attr('src');
	replacePlayerClickCnt++;
	
	if(replacePlayerClickCnt == 2) {
		if(judge[0] == 0 && judge[1] == 0) {
			objTest[0].css({"border" : "2px solid blue", "background-image": "url('" + imgTmpPath[1] + "')", "box-shadow": "2px 2px 2px gray"});
			objTest[1].css({"border" : "2px solid blue", "background-image": "url('" + imgTmpPath[0] + "')", "box-shadow": "2px 2px 2px gray"});							
		} else if(judge[0] == 0 && judge[1] == 1) {
			objTest[0].css({"border" : "2px solid blue", "background-image": "url('" + imgTmpPath[1] + "')", "box-shadow": "2px 2px 2px gray"});
			objTest[1].attr("src", imgTmpPath[0]).css("border", "2px solid yellow");
		} else if(judge[0] == 1 && judge[1] == 0) {
			objTest[1].css({"border" : "2px solid blue", "background-image": "url('" + imgTmpPath[0] + "')", "box-shadow": "2px 2px 2px gray"});
			objTest[0].attr("src", imgTmpPath[1]).css("border", "2px solid yellow");
		} else {
			objTest[0].attr("src", imgTmpPath[1]).css("border", "2px solid yellow");
			objTest[1].attr("src", imgTmpPath[0]).css("border", "2px solid yellow");
		}
		replacePlayerClickCnt = 0;
	}
}

(function() {
// store the slider in a local variable
	var $window = $(window),
	flexslider = { vars:{} };

	// tiny helper function to add breakpoints
	function getGridSize() {
		return (window.innerWidth < 600) ? 4 :
               (window.innerWidth < 900) ? 5 : 6;
	}

	$("#changePlayerBtn").click(function() {
		
		if(memberCnt < 11) {
			alertMsgBox("여분의 선수가 없습니다.!", "none");
			return;
		}
		
		for(var i = 1; i < 12; i++) {
			$("#player" + i).removeClass("draggable").click(playerEventInField);
		}
		
		for(var i = 1; i < $("#replacementPlayers").children().length; i++) {
			$("#replacementPlayers").children().eq(i).click(playerEventInReplacementArea);
		}
		
		$("#replacementPlayerArea").show('fast', function() { 
			$('.flexslider').flexslider({
				animation: "slide",
				animationSpeed: 500,
				animationLoop: false,
				itemWidth: 210,
				itemMargin: 15,
				minItems: getGridSize(), // use function to pull in initial value
				maxItems: getGridSize(), // use function to pull in initial value
				start: function(slider){
					flexslider = slider;
				}
			});
		$("#main ol").remove();		
		});
	});
	
	// check grid size on resize event
	$window.resize(function() {
		var gridSize = getGridSize();
        flexslider.vars.minItems = gridSize;
        flexslider.vars.maxItems = gridSize;
	});
}());

$("#closeReplacementPlayerAreaBtn").click(function() {
	for(var i = 1; i < 12; i++) {
		$("#player" + i).addClass("draggable").off("click", playerEventInField);			
	}
	for(var i = 1; i < $("#replacementPlayers").children().length; i++) {
		$("#replacementPlayers").children().eq(i).off("click", playerEventInReplacementArea);
	}
	replacePlayerClickCnt = 0;
	$("#replacementPlayerArea").hide('fast');
});