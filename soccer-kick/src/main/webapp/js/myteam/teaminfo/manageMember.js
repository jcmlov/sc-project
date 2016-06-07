
if(user.mleaderYN == "N") {
	$(".colTitle").remove();
	$(".colApply").remove();
	$(".teamAddrSearch").remove();
	$(".manageModal button").css({"display" : "none"});
	$(".modalClose").css({"display" : "inline"});
}
console.log(user);
// 이펙트 효과
function runEffect(target, type) {
	// 이벤트 종류
	var selectedEffect = type;
	var options = {};
	if (selectedEffect === "scale") {
		options = {
			percent : 0
		};
	} else if (selectedEffect === "size") {
		options = {
			to : {
				width : 200,
				height : 60
			}
		};
	}

	$(target).siblings('.toggler').find("#effect").toggle(selectedEffect,
			options, 500);
};

// 포지션 숨기기
function positionHidden(target, type) {
	runEffect(target, type);
};


// 득점, 도움, 실점 포인트 넣기
$(document).on(
		'click',
		'.number-spinner button',
		function() {
			var btn = $(this), oldValue = btn.closest('.number-spinner').find(
					'input').val().trim(), newVal = 0;

			if (btn.attr('data-dir') == 'up') {
				newVal = parseInt(oldValue) + 1;
			} else {
				if (oldValue > 1) {
					newVal = parseInt(oldValue) - 1;
				} else {
					newVal = 1;
				}
			}
			btn.closest('.number-spinner').find('input').val(newVal);
		});

// AJAX
var applyMembers;
var draggingId;
$.getJSON(contextRoot + "/manageMember/teamMember.do", {
	tno : user.tno,
	mapplyTno : user.tno
}, function(resultObj) {
	var ajaxResult = resultObj.ajaxResult
	if (ajaxResult.status == "success") {
// ==================================================  기존 팀원목록 화면에 출력  =================================================================================== 
		var teamInfo = ajaxResult.data.location;
		var tlatitude = teamInfo.tlatitude
		var tlongitude = teamInfo.tlongitude
		
		if (teamInfo.tepath == null) {
			$('#teamEm').css('background-image', 'url(" /soccer-kick/images/commons/baseEmblIcon.png ")');
		} else {
			$('#teamEm').css('background-image', 'url(' + teamInfo.tepath + ')');
		}
		
		$('#teamName').text(teamInfo.tname);
		$('#teamContent').text(teamInfo.tcontent);
		
		var members = ajaxResult.data.members;
		for (var i = 0; i < members.length; i++) {
			var liObj = "";
			liObj += '<li onclick="detailInfo(this)" id="drag' + members[i].mno + '" class="get-mno"><img src="' + ((members[i].mpath == null) ? "/soccer-kick/images/commons/baseUserIcon.png" : members[i].mpath) + '"';
			liObj += 'alt="img" class="img drag"><b class="desc">' + members[i].mname + '</b><span class="desc">' + members[i].mbirth + '</span></li>';
			if(members[i].mposname == "GK") {
				$(".gk").html($(".gk").html() + liObj);
			} else if(members[i].mposname == "DF") {
				$(".df").html($(".df").html() + liObj);
			} else if(members[i].mposname == "MF") {
				$(".mf").html($(".mf").html() + liObj);
			} else {
				$(".fw").html($(".fw").html() + liObj);
			}
		}
		$('.bootstrap img').css('border-radius', '20px');
		
//		$('.basic-list li').click(function () {
//			$(".manageModal").css({"display":"block"});
//		});

// ==================================================  기존 팀원목록 화면에 출력  ===================================================================================
		
		

		map(tlatitude, tlongitude);
		
		
// =====================================================   입단 신청자 목록 화면에 출력  ==============================================================================
		applyMembers = ajaxResult.data.applyMembers;
		if (applyMembers.length == 0) {
			$('.colTitle').css('display', 'none');
			$('.colApply').css('display', 'none');
		}
		for (var i = 0; i < applyMembers.length; i++) {
			var liObj = "";     
			liObj += '<li data-idx="' + applyMembers[i].mno + '"><span class="thumb"                                                 '; 
			liObj += '	style="background-image: url(\'' + ((applyMembers[i].mpath == null) ? "/soccer-kick/images/commons/baseUserIcon.png" : applyMembers[i].mpath)  + '\');">';
			liObj += '		<div class="applyName"                                                          ';
			liObj += '			style="float: right; width: 170px; margin-bottom: 5px;">이름:               ';
			liObj += '			' + applyMembers[i].mname + '</div>                                                                ';
			liObj += '		<div class="applyPosition" style="width: 170px; margin-bottom: 5px;">포지션:    ';
			liObj += '			' + applyMembers[i].mposname + '</div>                                                                    ';
			liObj += '		<div class="applyBirth" style="width: 170px; margin-bottom: 5px;">생일:         ';
			liObj += '			' + applyMembers[i].mbirth + '</div>                                                            ';
			liObj += '		<div class="applyAddr" style="width: 170px; margin-bottom: 10px;">주소:         ';
			liObj += '			' + applyMembers[i].mbaseAddr + '&nbsp' + applyMembers[i].mdetAddr + '</div> <a class="memberApply" style="cursor:pointer; text-decoration: none;" memberNo=' + applyMembers[i].mno + '';
			liObj += '		onclick="updateMember(' + i + ',' + 'this)">승인</a> <a class="memberCancel"          ';
			liObj += '		 onclick="updateMember(' + i + ',' + 'this)" style="cursor:pointer; text-decoration: none;"                                         ';
			liObj += '		memberNo=' + applyMembers[i].mno + ' >거부</a>                                        ';
			liObj += '</span></li>                             '; 
			$("#applyList").html($("#applyList").html() + liObj);
		}
		
		var mcThumbnailSlider = new ThumbnailSlider(thumbnailSliderOptions);
		var slides = document.getElementById("thumbnail-slider").getElementsByTagName("li");
			for (var i = 0; i < slides.length; i++) {
				slides[i].onmouseover = function(e) {
					var li = this;
					if (li.thumb) {
						var content = "<img src='" + li.thumbSrc + "' />"
								+ li.thumb.innerHTML;
						tooltip.pop(li, content);
					}
				};
			}
// =====================================================   입단 신청자 목록 화면에 출력  ==============================================================================

		$('.thumb').hover(function() {
			$(this).css({
				'width' : '170px',
				'height' : '80px'
			});
		}, function() {
			$(this).css({
				'width' : '150px',
				'height' : '70px'
			});
		});
	} else if (ajaxResult.status == "fail") {
		alertMsgBox("실패.", "none");;
	}
});

//============================================================  팀 활동위치  ====================================================================================
function map(tlatitude, tlongitude) {
	var mapContainer = document.getElementById('map'), // 지도를 표시할 div
	mapOption = { 
	    center: new daum.maps.LatLng(tlatitude, tlongitude), // 지도의 중심좌표
	    level: 3 // 지도의 확대 레벨
	};

	var map = new daum.maps.Map(mapContainer, mapOption); 

	// 마커가 표시될 위치입니다
	var markerPosition  = new daum.maps.LatLng(tlatitude, tlongitude); 

	// 마커를 생성합니다
	var marker = new daum.maps.Marker({
	    position: markerPosition
	});
	ltlatitude = tlatitude;
	ltlongitude = tlongitude;
	
	// 마커가 지도 위에 표시되도록 설정합니다
	marker.setMap(map);
}
//============================================================  팀 활동위치  ====================================================================================


function updateMember(idx, target) {
	var targetClass = $(event.target).attr("class");
	var obj = $(target).parent().clone();
	var img = obj.find("img");
	var imgSrc = img.attr("src");
	$("#applyList").find("li").each(function(i, data) {
		var didx = $(data).attr("data-idx");
		if (didx == applyMembers[idx].mno) {
			$(data).animate({
				opacity : "0",
				width : 0
			}, 1000, function() {
				$(this).remove();
			});
		}
	});
	$("#mcTooltipWrapper").css("display", "none");
	
	
	if(targetClass == "memberApply") {
		var liObj = "";
		liObj += '<li style="opacity:0;"><img src="' + imgSrc + '"';
		liObj += 'alt="img" class="img"><b>' + applyMembers[idx].mname + '</b><span class="desc">' + applyMembers[idx].mbirth + '</span></li>';
		
		var $targetObj;
		if(applyMembers[idx].mposname == "GK") {
			$targetObj = $(".gk");
		} else if(applyMembers[idx].mposname == "DF") {
			$targetObj = $(".df");
		} else if(applyMembers[idx].mposname == "MF") {
			$targetObj = $(".mf");
		} else {
			$targetObj = $(".fw");
		}
		
		$targetObj.prepend(liObj);
		$targetObj.children().eq(0).animate({
			opacity : 1
		}, 1000);
		$('.bootstrap img').css('border-radius', '20px');
		update(user.tno, applyMembers[idx].mno, 0);
	} else {
		update(0, applyMembers[idx].mno, 0);
	}
}

function update(tno, tmno, applyTno) {
	$.post(contextRoot + "/manageMember/updateApply.do", {
		tno : arguments[0],
		mno : arguments[1],
		mapplyTno : arguments[2]
	}, function(resultObj) {
		var ajaxResult = resultObj.ajaxResult
		if (ajaxResult.status == "success") {
			$.getJSON(contextRoot + "/manageMember/teamMember.do", {
				tno : user.tno,
				mapplyTno : user.tno
			}, function(resultObj) {
				var result = resultObj.ajaxResult
				var resultLength = result.data.applyMembers.length;
				if (result.status == "success") {
					if (resultLength == 0) {
						$('.colTitle').css('display', 'none');
						$('.colApply').css('display', 'none');
					}
				} else if (ajaxResult.status == "fail") {
					alertMsgBox("실패.", "none");;
				}
			});
			
		} else if (ajaxResult.status == "fail") {
			alertMsgBox("실패.", "none");;
		}
	}, 'json');
}

function cancelApply(event) {
	var mno = $(event.target).attr("memberno");
	var obj = $(target).parent().clone();
	var img = obj.find("img");
	var imgSrc = img.attr("src");
	
	$("#applyList").find("li").each(function(i, data) {
		var didx = $(data).attr("data-idx");
		if (didx == applyMembers[idx].mno) {
			$(data).animate({
				opacity : "0",
				width : 0
			}, 1000, function() {
				$(this).remove();
			});
		}
	});
	$("#mcTooltipWrapper").css("display", "none");
}

// ============================ 팀원이미지 클릭 시 상세정보 보임 ============================
var expulsionId;
var detailInfo = function(target) {
	var memberId = $(target).attr('id');
	expulsionId = memberId;
	memberId = memberId.split('g');
	$.get(contextRoot + "/manageMember/teamMemberDetail.do", {
		mno : memberId[1],
	}, function(resultObj) {
		var ajaxResult = resultObj.ajaxResult
		if (ajaxResult.status == "success") {
			
			$('.photo-box').css('background-image',
					'url(' + ((ajaxResult.data.mpath == null) ? "/soccer-kick/images/commons/baseUserIcon.png" : ajaxResult.data.mpath) + ')');
			$('.memberName').text(ajaxResult.data.mname);
			$('.memberPosition').text(ajaxResult.data.mposname);
			$('.memberBirth').text(ajaxResult.data.mbirth);
			$('#memberGoal').val(ajaxResult.data.mgoalCnt);
			$('#memberSupport').val(ajaxResult.data.msupportCnt);
			$('#memberMloss').val(ajaxResult.data.mlossCnt);
			$('.content-box').attr('id', ajaxResult.data.mno)

		} else if (ajaxResult.status == "fail") {
			alertMsgBox("실패.", "none");;
		}
	}, 'json');

	$(".manageModal").css('opacity', 0);
	$(".manageModal").css({"display":"block"});
	$(".manageModal").animate({
		opacity : 1
	}, 500, function() {
	});
};
// ============================ 팀원이미지 클릭 시 상세정보 보임 ============================


// 멤버 득점, 도움, 실점 올리기
 var addPoint = function (target) {
	 var memberId = $(target).parent().parent('.content-box').attr('id');
	 var mgoal = $('#memberGoal').val();
	 var msupport = $('#memberSupport').val();
	 var mloss = $('#memberMloss').val();
	 $.post(contextRoot + "/manageMember/updateMemberPoint.do", {
		 mno : memberId,
		 mgoalCnt : mgoal,
		 msupportCnt : msupport,
		 mlossCnt : mloss
		}, function(resultObj) {
			var ajaxResult = resultObj.ajaxResult
			if (ajaxResult.status == "success") {
				detailInfoClose(target);
			} else if (ajaxResult.status == "fail") {
				alertMsgBox("실패.", "none");;
			}
		}, 'json');
 };


// 팀원 상세정보 닫기 버튼
var detailInfoClose = function(target) {
	$(".manageModal").animate({
		opacity : 0
	}, 1000, function() {
		$(".manageModal").css('display', 'none');
	});
};





// =======================================================  포지션 이동  ========================================================================================
$('.basic-list li').hover(function () {
	$(this).css({'background': 'red', 'border': '1px solid black'});
});

$( ".connectedSortable" ).sortable({
	opacity: 0.5,
    connectWith: ".connectedSortable",
    change: function( event, ui ) {
    	var dragId = ui.item.attr('id');
    	var positionChange = event.target.id;
    	console.log(dragId)
    	dragId = dragId.split('g');
    	$.post(contextRoot + "/manageMember/updateTeamPosition.do", {
    		mno : dragId[1],
    		mposname : positionChange 
    	}, function(resultObj) {
    		var ajaxResult = resultObj.ajaxResult
    		if (ajaxResult.status == "success") {
    		} else if (ajaxResult.status == "fail") {
    			alertMsgBox("실패.", "none");;
    		}
    	}, 'json');
    }
  }).disableSelection();
// =======================================================  포지션 이동  ========================================================================================



// ========================================================== 활동위치 검색 =========================================================================================
$("#searchAddr").click(function() {
	new daum.Postcode({
	    oncomplete: function(data) {
	        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
	
	        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
	        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
	        var fullAddr = ''; // 최종 주소 변수
	        var extraAddr = ''; // 조합형 주소 변수
	
	        // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
	        if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
	            fullAddr = data.roadAddress;
	
	        } else { // 사용자가 지번 주소를 선택했을 경우(J)
	            fullAddr = data.jibunAddress;
	        }
	
	        // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
	        if(data.userSelectedType === 'R'){
	            //법정동명이 있을 경우 추가한다.
	            if(data.bname !== ''){
	                extraAddr += data.bname;
	            }
	            // 건물명이 있을 경우 추가한다.
	            if(data.buildingName !== ''){
	                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
	            }
	            // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
	            fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
	        }
	
	        // 우편번호와 주소 정보를 해당 필드에 넣는다.
	        //document.getElementById('sample6_postcode').value = data.zonecode; //5자리 새우편번호 사용
	        document.getElementById('mbaseAddress').value = fullAddr;
	        // 커서를 상세주소 필드로 이동한다.
	        document.getElementById('mdetAddr').focus();
	        
	        
	        $.post(contextRoot + "/manageMember/updateLocation.do", {
	        	tpoint: fullAddr
	        }, function(resultObj) {
	        	var ajaxResult = resultObj.ajaxResult
	        	if (ajaxResult.status == "success") {
	        		var lat = ajaxResult.data.lat;
	        		var lng = ajaxResult.data.lng;
	        		
	        		map(lat, lng);
	        		
	        	} else if (ajaxResult.status == "fail") {
	        		alertMsgBox("실패.", "none");;
	        	}
	        }, 'json');
        }
	}).open();
	return false;
});
// ========================================================== 지도검색 =========================================================================================

var ltlatitude; // 갱신 할 위도
var ltlongitude; // 갱신 할 경도
//======================================================= 활동위치 저장버튼 클릭시 ===================================================================================
$('#locationUpdate').click(function () {
	$.post(contextRoot + "/manageMember/updateTeamLocation.do", {
		tno : user.tno,
		tlatitude : ltlatitude,
		tlongitude : ltlongitude,
		tpoint : $("#mbaseAddr").val()
	}, function(resultObj) {
		var ajaxResult = resultObj.ajaxResult
		if (ajaxResult.status == "success") {
			alertMsgBox("팀활동 위치가 변경되었습니다.", "none");;
		} else if (ajaxResult.status == "fail") {
			alertMsgBox("실패.", "none");;
		}
	}, 'json');
});
//======================================================= 활동위치 저장버튼 클릭시 ===================================================================================


//======================================================= 팀원 제명 ===================================================================================
var teamExpulsion = function (target) {
	var memNo = $(target).parent().attr('id');
	$.post(contextRoot + "/manageMember/updateExpulsion.do", {
		mno : memNo,
		tno : user.tno
	}, function(resultObj) {
		var ajaxResult = resultObj.ajaxResult
		if (ajaxResult.status == "success") {
			alertMsgBox("팀에서 제명하였습니다.", "none");
			detailInfoClose();
			$('#'+expulsionId).css('display', 'none');
		} else if (ajaxResult.status == "fail") {
			alertMsgBox("실패.", "none");;
		}
	}, 'json');
};