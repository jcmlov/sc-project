/**
 *  header ajax
 */
var userDistrict;
var user;
var userTeamInfo;
var applyMemberCnt = -1;
var socket = io.connect(nodeRoot);
var intval;
socket.on("toclient", function(data) {
	if(user.memail == data.leaderEmail) {
		var applyDiv = "";
		var dt = new Date();
		if(data.clientInfo.mpath == null) {
			data.clientInfo.mpath = 
				"/soccer-kick/images/commons/baseUserIcon.png";
		} 
		applyDiv += '<div id="notifications-bottom-right-tab" class="animated flash">          ';
		applyDiv += '	<div id="notifications-bottom-right-tab-close" class="close">          ';
		applyDiv += '		<span class="iconb" data-icon=""></span>                         ';
		applyDiv += '	</div>                                                                 ';
		applyDiv += '	<div id="notifications-bottom-right-tab-avatar">                       ';
		applyDiv += '		<img src="' + data.clientInfo.mpath + '" width="70" height="70">   ';
		applyDiv += '	</div>                                                                 ';
		applyDiv += '	<div id="notifications-bottom-right-tab-right">                        ';
		applyDiv += '		<div id="notifications-bottom-right-tab-right-title">              ';
		applyDiv += '			<span>' + data.clientInfo.mname + '</span> new apply request   ';
		applyDiv += '		</div>                                                             ';
		applyDiv += '		<div id="notifications-bottom-right-tab-right-text">               ';
		applyDiv += '			' + data.clientInfo.mname + '(' + data.clientInfo.mposname + ', ' + (dt.getFullYear() - data.clientInfo.mbirth.split("-")[0]) + ') <br> ' + data.clientInfo.memail + '  ';
		applyDiv += '		</div>                                                             ';
		applyDiv += '	</div>                                                                 ';
		applyDiv += '</div>																	   ';
		
		$("body").prepend(applyDiv);
		$("#notifications-bottom-right-tab").css({"top" : (document.body.clientHeight + document.body.scrollTop - 130)});
	}
	intval = setInterval(fadeout, 3000);
});

function fadeout() {
	$("#notifications-bottom-right-tab").fadeOut();
	clearInterval(intval);
}

function sleep(num) {
	var now = new Date();
	var stop = now.getTime() + num;
	while(true) {
		now = new Date();
		if(now.getTime() > stop)
			return;
	}
}

$.ajax({
	type: "GET",
	url: contextRoot + "/login/getUserInfo.do",
	dataType: "json",
	error: function(xhr, textStatus, errorThrown) {
		alertMsgBox("Serviced only membership!", "/views/login.html");
	},
	success: function(resultObj) {
		var ajaxResult = resultObj.ajaxResult;
		if(ajaxResult.status == "success") {
			userDistrict = ajaxResult.data.user.mbaseAddr.split(" ")[0];
			var header = "";
			var modal = "";
			var mpath = ajaxResult.data.user.mpath;
			user = ajaxResult.data.user;
			userTeamInfo = ajaxResult.data.userTeamInfo;
			if(mpath == null) {
				mpath = "/soccer-kick/images/commons/baseUserIcon.png";
			}
			header += '<div class="container">                                                                             ';
			header += '	<div class="navbar-header">                                                                        ';
			header += '		<button type="button" class="navbar-toggle" data-toggle="collapse"                             ';
			header += '			data-target="#navbar-ex-collapse">                                                         ';
			header += '			<span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span>              ';
			header += '			<span class="icon-bar"></span> <span class="icon-bar"></span>                              ';
			header += '		</button>                                                                                      ';
			header += '		<a class="navbar-brand"><span class="text-primary">SK PLAN-IT</span></a>                       ';
			header += '	</div>                                                                                             ';
			header += '	<div class="collapse navbar-collapse" id="navbar-ex-collapse">                                     ';
			header += '		<ul class="nav navbar-nav navbar-right">                                                       ';
			header += '			<li><a class="home" href="#">메인</a></li>                         						   ';
			header += '			<li><a class="teams" href="#">팀 목록</a></li>                      						   ';
			header += '			<li><a class="createTeam" href="#">팀 생성하기</a></li>                            	       ';
			header += '<li class="dropdown"><a href="#" class="dropdown-toggle"                                            ';
			header += '	data-toggle="dropdown" role="button" aria-expanded="false">나의 팀	                               ';
			header += '		<i class="fa fa-caret-down"></i>                                                               ';
			header += '</a>                                                                                                ';
			header += '	<ul class="dropdown-menu" role="menu">                                                             ';
			header += '		<li><a href="#" id="teamInfo">내 팀정보</a></li>									    		   ';
			header += '		<li class="divider"></li>                                                                      ';
			header += '		<li><a href="#" id="strategyBoard">전략 게시판</a></li>										   ';
			header += '		<li><a href="#" id="gallery">갤러리</a></li>                                 	                   ';
			header += '		<li><a href="#" id="board">커뮤니티</a></li>													   ';
			header += '	</ul></li>                                                                                         ';				
			header += '			<li class="dropdown"><a href="#" class="dropdown-toggle"                                   ';
			header += '				data-toggle="dropdown"><img id="profileThumnail"                                       ';
			header += '					src="' + mpath + '"                                 						       ';
			header += '					style="width: 15px; height: 15px;" />&nbsp; <strong id="username">' + user.mname + '</strong>';
			header += '					<span class="glyphicon glyphicon-chevron-down"></span> </a>                        ';
			header += '				<ul class="dropdown-menu">                                                             ';
			header += '					<li>                                                                               ';
			header += '						<div class="navbar-login">                                                     ';
			header += '							<div class="row">                                                          ';
			header += '								<div class="col-lg-4">                                                 ';
			header += '									<p class="text-center">                                            ';
			header += '										<img id="profileThumnail2"                                     ';
			header += '											src="' + mpath + '"         						       ';
			header += '											style="width: 87px; height: 87px;" />                      ';
			header += '									</p>                                                               ';
			header += '								</div>                                                                 ';
			header += '								<div class="col-lg-8">                                                 ';
			header += '									<p class="text-left">                                              ';
			header += '										<strong>' + user.mname + '</strong>                        	   ';
			header += '									</p>                                                               ';
			header += '									<p class="text-left small">' + user.memail + '</p>                 ';
			header += '									<p class="text-left">                                              ';
			header += '										<a href="" class="btn btn-primary btn-block btn-sm"            ';
			header += '											data-toggle="modal" data-target="#profileModal">프로필 	   ';
			header += '											보기/수정</a>                                                ';
			header += '									</p>                                                               ';
			header += '								</div>                                                                 ';
			header += '							</div>                                                                     ';
			header += '						</div>                                                                         ';
			header += '					</li>                                                                              ';
			header += '					<li class="divider"></li>                                                          ';
			header += '					<li>                                                                               ';
			header += '						<div class="navbar-login navbar-login-session">                                ';
			header += '							<div class="row">                                                          ';
			header += '								<div class="col-lg-12">                                                ';
			header += '									<p>                                                                ';
			header += '										<a id="logoutBtn"class="btn btn-danger btn-block">로그아웃</a>  ';
			header += '									</p>                                                               ';
			header += '								</div>                                                                 ';
			header += '							</div>                                                                     ';
			header += '						</div>                                                                         ';
			header += '					</li>                                                                              ';
			header += '				</ul></li>                                                                             ';
			header += '		</ul>                                                                                          ';
			header += '	</div>                                                                                             ';
			header += '</div>                                                                                              ';
			
			modal += '<div class="modal-dialog">';
			modal += '	<div class="modal-content">';
			modal += '		<div class="modal-header">                                                                                                           ';
			modal += '			<button type="button" class="close" data-dismiss="modal"                                                                         ';
			modal += '				aria-hidden="true">×</button>                                                                                                ';
			modal += '			<h4 class="modal-title text-muted">Profile/Info</h4>                                                                             ';
			modal += '		</div>                                                                                                                               ';
			modal += '		<div class="modal-body">                                                                                                             ';
			modal += '			<div class="row">                                                                                                                ';
			modal += '				<div class="col-md-12">                                                                                                      ';
			modal += '					<div class="panel with-nav-tabs panel-default">                                                                          ';
			modal += '						<div class="panel-heading">                                                                                          ';
			modal += '							<ul class="nav nav-tabs">                                                                                        ';
			modal += '								<li class="active"><a href="#tab1default" data-toggle="tab">프로필                             	             ';
			modal += '										수정</a></li>                                                                             	         ';
			modal += '								<li><a href="#tab2default" data-toggle="tab">나의                                                             ';
			modal += '										팀정보</a></li>                                                                                       ';
			modal += '							</ul>                                                                                                            ';
			modal += '						</div>                                                                                                               ';
			modal += '						<div class="panel-body">                                                                                             ';
			modal += '							<div class="tab-content">                                                                                        ';
			modal += '								<div class="tab-pane fade in active" id="tab1default">                                                       ';
			modal += '									<form class="form-horizontal" role="form">                                                               ';
			modal += ' 										<input type="hidden" id="mno" name="mno" value="' +  user.mno + '"/>								 ';
			modal += '										<div class="row">                                                                                    ';
			modal += '											<div class="col-md-5">                                                                           ';
			modal += '												<div class="fileWrapper">                                                                    ';
			modal += '													<div class="photoBox" id="photoBox"                                                      ';
			modal += '														style="background-image: url(\'' + mpath + '\');"></div>						 	 ';
			modal += '													<input type="file" class="fileBox" id="profilePhoto" name="profilePhoto"                 ';
			modal += '														onchange="selectFile(event)">                                                        ';
			modal += '												</div>                                                                                       ';
			modal += '												<br>                                                                                         ';
			modal += '											</div>                                                                                           ';
            modal += '                                                                                                                                           ';
			modal += '											<div class="col-md-7">                                                                           ';
			modal += '												<div class="form-group">                                                                     ';
			modal += '													<div class="col-sm-12">                                                                  ';
			modal += '														<div class="input-group margin-bottom-4">                                            ';
			modal += '															<span class="input-group-addon" contenteditable="true">                          ';
			modal += '																<i class="glyphicon glyphicon-envelope mycolor"></i>                         ';
			modal += '															</span> <input size="60" maxlength="255" class="form-control"                    ';
			modal += '																name="memail"                                               				 ';
			modal += '																id="memail" type="email"                                     				 ';
			modal += '																disabled="disabled" value="' + user.memail + '">                             ';
			modal += '														</div>                                                                               ';
			modal += '														<div class="input-group margin-bottom-4">                                            ';
			modal += '															<span class="input-group-addon" contenteditable="true">                          ';
			modal += '																<i class="glyphicon glyphicon-user mycolor"></i>                             ';
			modal += '															</span> <input size="60" maxlength="255" class="form-control"                    ';
			modal += '																name="mname"                                               					 ';
			modal += '																id="mname" type="text" value="' + user.mname + '"            		         ';
			modal += '																disabled="disabled">                                                         ';
			modal += '														</div>                                                                               ';
			modal += '														<div class="input-group margin-bottom-4">                                            ';
			modal += '															<span class="input-group-addon"> <i                                              ';
			modal += '																class="glyphicon glyphicon-phone mycolor"></i>                               ';
			modal += '															</span> <input size="60" maxlength="255" class="form-control"                    ';
			modal += '																placeholder="휴대폰(000.0000.000)"                              			     ';
			modal += '																required="required"                                                          ';
			modal += '																name="mpno"                                       							 ';
			modal += '																id="mpno" type="text"                              							 ';
			modal += '																value="' + user.mpno + '">                                                   ';
			modal += '														</div>                                                                               ';
			modal += '														<div class="input-group margin-bottom-4">                                            ';
			modal += '															<input size="60" maxlength="255" class="form-control"                            ';
			modal += '																placeholder="주소" required="required"                                   	 ';
			modal += '																name="mbaseAddr" id="mbaseAddr" value="' + user.mbaseAddr + '"               ';
			modal += '																type="text"> <span class="input-group-addon">                                ';
			modal += '																<button id="searchAddrBtn"                                                   ';
			modal += '																	class="glyphicon glyphicon-tag mycolor"></button>                        ';
			modal += '															</span>                                                                          ';
			modal += '														</div>                                                                               ';
			modal += '														<div class="input-group margin-bottom-4">                                            ';
			modal += '															<input size="100" maxlength="255" class="form-control"                           ';
			modal += '																placeholder="상세주소" required="required"                             		 ';
			modal += '																name="mdetAddr" value="' + user.mdetAddr + '"                                ';
			modal += '																id="mdetAddr" type="text">                                              	 ';
			modal += '														</div>                                                                               ';
			modal += '														<div class="input-group margin-bottom-4">                                            ';
			modal += '															<div class="has-success radio">                                                  ';
			modal += '																<label> <input type="radio" name="mposname"                                  ';
			modal += '																	id="mposname" value="FW" checked="checked">FW                            ';
			modal += '																</label> <label> <input type="radio" name="mposname"                         ';
			modal += '																	id="mposname" value="MF">MF                                              ';
			modal += '																</label> <label> <input type="radio" name="mposname"                         ';
			modal += '																	id="mposname" value="DF">DF                                              ';
			modal += '																</label> <label> <input type="radio" name="mposname"                         ';
			modal += '																	id="mposname" value="GK">GK                                              ';
			modal += '																</label>                                                                     ';
			modal += '															</div>                                                                           ';
			modal += '														</div>                                                                               ';
			modal += '													</div>                                                                                   ';
			modal += '												</div>                                                                                       ';
			modal += '											</div>                                                                                           ';
			modal += '										</div>                                                                                               ';
			modal += '										<hr>                                                                                                 ';
			modal += '										<div class="form-group">                                                                             ';
			modal += '											<div class="col-sm-offset-3 col-sm-6">                                                           ';
			modal += '												<button type="button" id="profileUpdateBtn" class="btn btn-block btn-default"><i class="fa fa-star fa-fw"></i>수정하기</button>';
			modal += '											</div>                                                                                           ';
			modal += '										</div>																								 ';
			modal += '									</form>                                                                                                  ';
			modal += '								</div>                                                                                                       ';
			modal += '								<div class="tab-pane fade" id="tab2default">                                                                 ';
			modal += '									<div class="row">                                                                                        ';
			modal += '										<div class="col-md-6">                                                                               ';
			modal += '											<img                                                                                             ';
			if(userTeamInfo == null || userTeamInfo.tepath == null) {
				modal += '												src="http://pingendo.github.io/pingendo-bootstrap/assets/placeholder.png" style="width:250px; height:200px;"';				
			} else {
				modal += '												src="' + userTeamInfo.tepath + '" style="width:250px; height:200px;"                     ';
			}
			modal += '												class="img-responsive">                                                                      ';
			modal += '										</div>                                                                                               ';
			modal += '										<div class="col-md-6">                                                                               ';
			modal += '											<div class="panel panel-primary">                                                                ';
			modal += '												<div class="panel-heading">                                                                  ';
			modal += '													<h1 class="panel-title">나의 스코어</h1>                                                    ';
			modal += '												</div>                                                                                       ';
			modal += '												<div class="panel-body">                                                                     ';
			modal += '													<ul class="list-group">                                                                  ';
			modal += '														<li class="list-group-item">득점<span class="badge">' + user.mgoalCnt + '</span>  ';
			modal += '														</li>                                                                                ';
			modal += '														<li class="list-group-item">도움<span class="badge">' + user.msupportCnt + '</span>        ';
			modal += '														</li>                                                                                ';
			modal += '														<li class="list-group-item">실점<span class="badge">' + user.mlossCnt + '</span>   ';
			modal += '														</li>                                                                                ';
			modal += '													</ul>                                                                                    ';
			modal += '												</div>                                                                                       ';
			modal += '											</div>                                                                                           ';
			modal += '										</div>                                                                                               ';
			modal += '									</div>                                                                                                   ';
			modal += '									<div class="row">                                                                                        ';
			modal += '										<div class="col-md-12">                                                                              ';
			modal += '											<h1 class="text-primary">' + (userTeamInfo==null ? "소속된 팀이 없습니다." : userTeamInfo.tname) + '</h1>';
			modal += '											<div class="row">                                                                                ';
			modal += '												<div class="col-md-8">                                                                       ';
			modal += '													<h4 class="text-primary">팀장명 : ' + (userTeamInfo==null ? "-" : userTeamInfo.tleader) + '</h4>';
			modal += '												</div>                                                                                       ';
			if(userTeamInfo != null) {
				modal += '												<div class="col-md-4">                                                                   ';
				modal += '													<a class="btn btn-primary">탈퇴하기</a>                                        	     ';
				modal += '												</div>                                                                                   ';				
			}
			modal += '											</div>                                                                                           ';
			modal += '											<table class="table table-bordered">                                                             ';
			modal += '												<thead>                                                                                      ';
			modal += '													<tr>                                                                                     ';
			modal += '														<th>지역</th>                                                                         ';
			modal += '														<th>회원수</th>                                                                 	     ';
			modal += '														<th>개설일</th>                                                                       ';
			modal += '													</tr>                                                                                    ';
			modal += '												</thead>                                                                                     ';
			modal += '												<tbody>                                                                                      ';
			modal += '													<tr>                                                                                     ';
			modal += '														<td>' + (userTeamInfo==null ? "-" : userTeamInfo.tpoint) + '</td>                    ';
			modal += '														<td>' + (userTeamInfo==null ? "-" : userTeamInfo.tmemCnt + " / 24" ) + '</td>        ';
			modal += '														<td>' + (userTeamInfo==null ? "-" : userTeamInfo.tregDate) + '</td>					 ';
			modal += '													</tr>                                                                                    ';
			modal += '												</tbody>                                                                                     ';
			modal += '											</table>                                                                                         ';
			modal += '										</div>                                                                                               ';
			modal += '									</div>                                                                                                   ';
			modal += '								</div>                                                                                                       ';
			modal += '							</div>                                                                                                           ';
			modal += '						</div>                                                                                                               ';
			modal += '					</div>                                                                                                                   ';
			modal += '				</div>                                                                                                                       ';
			modal += '			</div>                                                                                                                           ';
			modal += '		</div>                                                                                                                               ';
			modal += '	</div>                                                                                                                                   ';
			modal += '</div>                                                                                                                                     ';
			$("#header").html(header);
			$("#profileModal").html(modal);
			var url = location.pathname.split("/")[3].split(".")[0];
			$("#" + url).addClass("active");
			
			$("#profilePhoto").fileupload({
				url: contextRoot + '/member/updatePhoto.do',
				dataType: 'json',
				singleFileUploads: false,
				add : function(e, data){
					data.formDate = {
						mno : user.mno
					};
					data.submit().success(function(resultObj) {
						user.mpath = resultObj.ajaxResult.data;
					});
				}
			});
			
			$("#profileUpdateBtn").click(function() {
				$.post(contextRoot + "/member/updateProfile.do", {
					mno: $('#mno').val(),
	    			mpno: $('#mpno').val(),
	    			mbaseAddr: $("#mbaseAddr").val(),
	    			mdetAddr: $("#mdetAddr").val(),
	    			mposname: $("#mposname:checked").val()
				}, function(resultObj) {
					if(resultObj.ajaxResult.status == "success") {
						alertMsgBox("Updated!", "none");
						$("div.modal-header > button.close").trigger("click");
					}
				}, 'json');
				return false;
			});
			
			$("#logoutBtn").click(function() {
				$.getJSON(contextRoot + "/login/logout.do", function(resultObj) {
					if(resultObj.ajaxResult.status == "success") {
						alertMsgBox("Logout complete. Bye Bye.", "/views/login.html");
					}
				});
			});
			
			$("a.home").click(function(event) {
				event.preventDefault();
				location.href = contextRoot + "/views/home.html";
			});
			
			$("a.teams").click(function(event) {
				event.preventDefault();
				location.href = contextRoot + "/views/teams.html";
			});
			
			$("a.createTeam").click(function(event){
				event.preventDefault();
				if(user.tno == 0) {
					location.href = contextRoot + "/views/createTeam.html?mno=" + user.mno ;
				} else {
					alertMsgBox("팀 생성을 할 수 없습니다.", "none");
				} 
			});
			
			$("#teamInfo").click(function(event) {
				event.preventDefault();
				event.preventDefault();
				if(user.tno == 0) {
					alertMsgBox("가입된 팀이 없습니다.", "none");
					return;
				}
				location.href = contextRoot + "/views/myteam/teaminfo/manageMember.html";
			});
			
			$("#strategyBoard").click(function(event) {
				event.preventDefault();
				if(user.tno == 0) {
					alertMsgBox("가입된 팀이 없습니다.", "none");
					return;
				}
				location.href = contextRoot + "/views/myteam/board/strategy/list.html?btype=S&tno=" + userTeamInfo.tno;
			});
			
			$("#gallery").click(function(event) {
				event.preventDefault();
				if(user.tno == 0) {
					alertMsgBox("가입된 팀이 없습니다.", "none");
					return;
				}
				location.href = contextRoot + "/views/myteam/board/gallery/teamGallery.html?tno=" + userTeamInfo.tno + "&no=" +user.mno;
			});
			
			$("#board").click(function(event) {
				event.preventDefault();
				if(user.tno == 0) {
					alertMsgBox("가입된 팀이 없습니다.", "none");
					return;
				}
				location.href = contextRoot + "/views/myteam/board/teamBoard/boardListForm.html?btype=B&tno=" + userTeamInfo.tno + "&no=" +user.mno;
			});
		}
	}
});

/*
 * Sticky header
 */
$(function() {
    $('.my-header').each(function () {
        var $window = $(window), // 창을 jQuery 오브젝트 화
            $header = $(this),   // 헤더를 jQuery 객체 화
            // 헤더의 기본 위치를 검색
            headerOffsetTop = $header.offset().top;

        // 윈도우의 스크롤 이벤트를 모니터링
        // (창이 스크롤 할 때마다 작업을 수행하기)
        $window.on('scroll', $.throttle(1000 / 15, function () {
            // 윈도우의 스크롤 량을 확인하고,
            // 헤더의 기본 위치를 지나서 있으면 클래스를 부여,
            // 그렇지 않으면 삭제
            if ($window.scrollTop() > headerOffsetTop) {
                $header.addClass('sticky');
            } else {
                $header.removeClass('sticky');
            }
        }));

        // 윈도우의 스크롤 이벤트를 발생시키는
        // (헤더의 초기 위치를 조정하기 위해)
        $window.trigger('scroll');

    });
});


/*
 *  modal event
 */
function selectFile(event) {
	var file = event.target.files[0];
	var strExt = event.target.value.split('.').pop().toLowerCase();
	if ($.inArray(strExt, [ "jpg", "jpeg", "png", "gif" ]) == -1) {
		alertMsgBox('이미지 파일만 업로드할 수 있습니다!', "none");
		return false;
	} else {
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function(event) {
			var imgThumnail = event.target.result;
			$('#photoMsg').html('');
			$('#photoBox').css('background-image',
					'url(' + imgThumnail + ')');
			$('#photoBox').css('background-size', '100% 100%');
			document.getElementById("profileThumnail").src = imgThumnail;
			document.getElementById("profileThumnail2").src = imgThumnail;
		}
		// document.profileForm.changePhoto.value="1";
	}
};

/*
 * footer
 */
var footer = "";
footer += '<div class="container">                                                                  ';
footer += '	<div class="row">                                                                       ';
footer += '		<div class="col-md-12">                                                             ';
footer += '			<hr>                                                                            ';
footer += '		</div>                                                                              ';
footer += '	</div>                                                                                  ';
footer += '	<div class="row">                                                                       ';
footer += '		<div class="col-sm-6">                                                              ';
footer += '			<h2>SK PLAN-IT</h2>                                                          ';
footer += '			<p>COPYRIGHT 2016 JAVA-77 SK PLAN-IT. ALL COPYRIGHTS RESERVED                ';
footer += '				CONTACT BITCAMP Corp.</p>                                                   ';
footer += '		</div>                                                                              ';
footer += '		<div class="col-sm-6">                                                              ';
footer += '			<p class="text-info text-right">                                                ';
footer += '				<br> <br>                                                                   ';
footer += '			</p>                                                                            ';
footer += '			<div class="row">                                                               ';
footer += '				<div class="col-md-12 hidden-lg hidden-md hidden-sm text-left">             ';
footer += '					<a href="#"><i class="fa fa-3x fa-fw text-inverse fa-youtube"></i></a>  ';
footer += '					<a href="#"><i class="fa fa-3x fa-fw fa-facebook text-inverse"></i></a> ';
footer += '					<a href="#"><i class="fa fa-3x fa-fw fa-github text-inverse"></i></a>   ';
footer += '				</div>                                                                      ';
footer += '			</div>                                                                          ';
footer += '			<div class="row">                                                               ';
footer += '				<div class="col-md-12 hidden-xs text-right">                                ';
footer += '					<a href="#"><i class="fa fa-2x fa-fw fa-youtube"></i></a> <a            ';
footer += '						href="#"><i class="fa fa-2x fa-facebook fa-fw"></i></a> <a          ';
footer += '						href="#"><i class="fa fa-2x fa-fw fa-github"></i></a>               ';
footer += '				</div>                                                                      ';
footer += '			</div>                                                                          ';
footer += '		</div>                                                                              ';
footer += '	</div>                                                                                  ';
footer += '</div>                                                                                   ';
$("#footer").html(footer);