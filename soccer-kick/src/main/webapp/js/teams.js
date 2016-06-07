var pno = 1;
var teamLeaderEmail;
var atno;
var listStatus = "before";
getTeamList();
function getTeamList() {
	var root = contextRoot + "/team/list.do?district=" + encodeURI(encodeURIComponent(userDistrict))
	+ "&pno=" + pno;
	if(arguments.length == 0) {
		root += "&keyword=none";
	} else {
		root += "&keyword=" + encodeURI(encodeURIComponent(arguments[0]));
	}
	$.getJSON(root, function(resultObj) {
		var lastPage = resultObj.lastPage;
		//console.log(lastPage);
		var teamListDiv = $("#team-list");
		var team = "";
		for(var teamObj of resultObj.list) {
			//console.log(teamObj.tno);
			team += '<div class="section ' + listStatus + '">                                                                        ';
			team += '	<div class="container">                                                                                      ';
			team += '		<div class="row">                                                                                        ';
			team += '			<div class="col-md-10 col-md-offset-1">                                                              ';
			team += '				<div class="row user-menu-container square">                                                     ';
			team += '					<div class="col-md-7 user-details">                                                          ';
			team += '						<div class="row coralbg white">                                                          ';
			team += '							<div class="col-md-6 no-pad">                                                        ';
			team += '								<div class="user-pad">                                                           ';
			team += '									<h3>' + teamObj.tname + '</h3>                                               ';
			team += '									<h4 class="white">                                                           ';
			team += '										<i class="fa fa-check-circle-o">Area : ' + teamObj.tpoint + '</i>        ';
			team += '									</h4>                                                                        ';
			team += '									<h4 class="white">                                                           ';
			team += '										<i class="fa -circle-o fa-envelope">' + teamObj.tleaderEmail + '</i>     ';
			team += '									</h4>                                                                        ';
			team += '									<button id="applyMember1" type="button" teamNo="' + teamObj.tno + '" teamName="' + teamObj.tname + '"';
			team += '										class="btn btn-info btn-labeled applyMember" teamLeaderEmail="' + teamObj.tleaderEmail + '" data-toggle="modal"';
			team += '										data-target="#applyModal1">                                              ';
			team += '										<span class="btn-label"> <i class="fa fa-futbol-o"></i>                  ';
			team += '										</span>팀원으로 신청하기	                                                 ';
			team += '									</button>                                                                    ';
			team += '								</div>                                                                           ';
			team += '							</div>                                                                               ';
			team += '							<div class="col-md-6 no-pad">                                                        ';
			team += '								<div class="user-image">                                                         ';
			team += ' 									<div class="img-responsive thumbnail" style="background-image:url(\'' + teamObj.tepath + '\'); background-size:100% 100%; border-radius: 0px;"></div>';
			team += '								</div>                                                                           ';
			team += '							</div>                                                                               ';
			team += '						</div>                                                                                   ';
			team += '						<div class="row overview">                                                               ';
			team += '							<div class="col-md-4 user-pad text-center">                                          ';
			team += '								<h3>팀장명</h3>                                                                   ';
			team += '								<h4>' + teamObj.tleader + '</h4>                                                 ';
			team += '							</div>                                                                               ';
			team += '							<div class="col-md-4 user-pad text-center">                                          ';
			team += '								<h3>회원수</h3>                                                                   ';
			team += '								<h4>' + teamObj.tmemCnt + ' / 24</h4>                                            ';
			team += '							</div>                                                                               ';
			team += '							<div class="col-md-4 user-pad text-center">                                          ';
			team += '								<h3>생성일</h3>                                                                   ';
			team += '								<h4>' + teamObj.tregDate + '</h4>                                                ';
			team += '							</div>                                                                               ';
			team += '						</div>                                                                                   ';
			team += '					</div>                                                                                       ';
			team += '					<div class="col-md-5 user-menu user-pad">                                                    ';
			team += '						<h2>팀 소개.</h2>                                                                      ';
			team += '						<div class="user-menu-content active">                                                   ';
			team += '							<a class="btn btn-info" data-toggle="modal"                                          ';
			team += '								data-target="#infoModal1"                                                        ';
			team += '								onclick="changeMap(' + teamObj.tlatitude + ', ' + teamObj.tlongitude + ');">주요 활동지역';
			team += '								보기</a>                                                                   		 ';
			team += '							<ul class="user-menu-list">                                                          ';
			team += '								<li>                                                                             ';
			team += '									<h4>' + teamObj.tcontent + '</h4>                                            ';
			team += '								</li>                                                                            ';
			team += '							</ul>                                                                                ';
			team += '						</div>                                                                                   ';
			team += '					</div>                                                                                       ';
			team += '				</div>                                                                                           ';
			team += '			</div>                                                                                               ';
			team += '		</div>                                                                                                   ';
			team += '	</div>                                                                                                       ';
			team += '</div>                                                                                                          ';
		}
		teamListDiv.html(teamListDiv.html() + team);
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
		$("button.applyMember").click(function(event) {
			var tno = $(event.target).attr("teamNo");
			var tname = $(event.target).attr("teamName");
			teamLeaderEmail = $(event.target).attr("teamLeaderEmail");
			$("#applyConfirm").html("Apply for a member of " + tname);
			//$("#atno").val(tno);
			//alert($("atno").val());
			atno = tno;
		});
	});
}
$("#load-list").click(function(event) {
	event.preventDefault();
	pno++;
	getTeamList();
});

$("input.search-data").keyup(function(event) {
	var keyword = $(event.target).val();
	if(keyword == "") {
		getTeamList();
		$("." + listStatus).remove();
		if(listStatus == "before") {
			listStatus = "after";			
		} else {
			listStatus = "before";
		}
	} else {
		getTeamList(keyword);
		$("." + listStatus).remove();
		if(listStatus == "before") {
			listStatus = "after";			
		} else {
			listStatus = "before";
		}
	}
});

function changeMap(latitude, longitude) {
	var container = document.getElementById('map');
	var latLng = new daum.maps.LatLng(latitude, longitude);
	var options = {
		center : latLng,
		level : 3
	};
	$("#map").html("");
	var map = new daum.maps.Map(container, options);
	
	var markerPosition  = new daum.maps.LatLng(latitude, longitude); 
	
	var marker = new daum.maps.Marker({
	    position: markerPosition // 마커의 좌표
	});
	marker.setMap(map); // 마커를 표시할 지도 객체
	
	setTimeout(function() {
		map.relayout();
		map.setCenter(latLng);
	}, 500);
}

$("#yesBtn").click(function() {
	if(user.tno != 0 || user.mapplyTno != 0 || user.mapplyYN != "N") {
		alertMsgBox("이미 소속된 팀이 있거나 지원한 팀이 있습니다.", "none");
	} else {
		console.log(atno);
		$.post(contextRoot + "/member/updateApply.do", {
			mno : user.mno,
			mapplyTno : atno 
		}, function(resultObj) {
			if(resultObj.ajaxResult.status == "success") {
				alertMsgBox("입단신청이 완료되었습니다.", "none");
				user.mapplyTno = atno;
			}
		}, "json")
		socket.emit("fromclient", {
			leaderEmail : teamLeaderEmail,
			clientInfo : user
		});
	}
	$("button.noBtn").trigger("click");
});