$(document).ready(function () {
wordflick();
var myMno = location.href.split("?")[1].split("=")[1];
var img = document.getElementById('img');
var noimage = img.src;
var cnt = 0;
var fData;

var blank = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

var imgCentering = function(obj, options) {
	var defaults = {
		'forceWidth': false,
		'forceHeight': false,
		'forceSmart': false,
		'bgColor': "inherit"
	};
	
	function forceWidth(obj) {
		obj.css('width', '100%');
	}
	
	function forceHeight(obj) {
		obj.css('height', '100%');
	}

	var img = $(obj);
	var settings = $.extend(defaults, options);
	img.load( function() {
		
		var _conwidth = img.parent().width();
		var _conheight = img.parent().height();
		
		var _parentpos = img.parent().css('position');
		if( settings.bgColor == 'inherit' )
			var _parentbg = img.parent().css('backgroundColor');
		else
			var _parentbg = settings.bgColor;
					
		img.css('width', 'auto');
		img.css('height', 'auto');
					
		if( settings.forceSmart ) {
			var _fullratio = img.width() / img.height();
			var _conratio = _conwidth / _conheight;
			if( _fullratio > _conratio ) 
				forceWidth(img);
			else if(_fullratio < _conratio)
				forceHeight(img);
		} else {
			if( settings.forceWidth )
				forceWidth(img);
			if( settings.forceHeight )	
				forceHeight(img);
		}
					
		var _finalwidth = img.width();
		var _finalheight = img.height();
		
		img.css({
			'position': 'relative',
			'left': -(_finalwidth-_conwidth)/20+'px',
			'top': -(_finalheight-_conheight)/2+'px'
		})
		.parent().css({
			'position': _parentpos,
			'overflow': 'hidden',
			'backgroundColor': _parentbg
		});
	});
	
	if( obj.complete || obj.complete === undefined ) {
		var src = obj.src;
		obj.src = blank;
		obj.src = src;
	}
}

$.fn.imgCentering = function(options) {
	
	return this.each( function(e) {
		var img = $(this);
		if(img.data('imgCentering')) return;
		
		var imgcenter = new imgCentering(this, options);
		img.data('imgCentering', imgcenter);
		
	});
}

function handleFileSelect(evt) {
	var file = evt.target.files[0];
	
	fData = new FormData($("#fForm"));
	fData.append("file", file);
	
	$.ajax({
		url: "/soccer-kick/gallery/ajax/galleryRegist.do"
		,data: fData
		,dataType: 'text'
		,processData: false
		,contentType: false
		,type: 'POST'
		,success: function(resultObj) {
			console.log(resultObj);
			$("#img").attr("src", "/soccer-kick/attachfile" + resultObj);
			$('#img').imgCentering({'forceSmart':true, 'bgColor':'white'});
			
			$("#teamHidden").append('<input type="hidden" name="tepath" value="'+ resultObj +'"/>');
		}
	});
}

document.getElementById('file').addEventListener('change', handleFileSelect, false);

document.querySelector('#removephoto').addEventListener('click', function(e) {		
	document.getElementById('file').value="";
	img.src=noimage;
	e.preventDefault();
});					
document.querySelector('#img').addEventListener('click', function(e) {	
	performClick(document.getElementById('file'));
	e.preventDefault();
});
document.querySelector('#addphoto').addEventListener('click', function(e) {		
	performClick(document.getElementById('file'));
	e.preventDefault();
});

function performClick(node) {			
  	var evt = document.createEvent("MouseEvents");
	  evt.initEvent("click", true, false);
 	 node.dispatchEvent(evt);
}

$("[name=mpno]").keyup(function(e){
	if(e.keyCode != 8) {
		if($("[name=mpno]").val().length == 3) {
			$("[name=mpno]").val($("[name=mpno]").val() + ".");
		}
		if($("[name=mpno]").val().length == 8) {
			$("[name=mpno]").val($("[name=mpno]").val() + ".");
		}
	}
});

$("#registBtn").click(function(){
	if($("[name=tname]").val() == "") {
		alertMsgBox("팀명을 입력하세요.", "none");
		return false;
	}
	
	if($("[name=tpoint]").val() == "") {
		alertMsgBox("팀 주소를 입력하세요.", "none");
		return false;
	}
	
	if($("[name=tcontent]").val() == "") {
		alertMsgBox("팀 소개를 입력하세요.", "none");
		return false;
	}
	
	var path = $("[name=tepath]").val().split("s_")[0];
	var midFileName = $("[name=tepath]").val().split("s_")[1];
	
	var tepaths = "/soccer-kick/attachfile" + path + "md_" + midFileName;
	
	var count = 0;
	var mnoArr = myMno + "?";
	$("#memHidden").children().each(function(){
		mnoArr += $("[name=mno"+ count++ +"]").val();
		if(count != 12) {
			mnoArr += "?";
		}
	});
	
	var minTpoint = $("[name=tpoint]").val().substr(0, 2);
	
	$.ajax({
		url: "/soccer-kick/team/registCreateTeam.do"
		,dataType: "JSON"
		,type: "POST"
		,data: {
			tepath: tepaths
			,tname: $("[name=tname]").val()
			,tpoint: minTpoint
			,tlatitude: $("[name=tlatitude]").val()
			,tlongitude: $("[name=tlongitude]").val()
			,tcontent: $("[name=tcontent]").val()
			,mnos: mnoArr
		}
		,success: function(resultObj) {
			alertMsgBox("팀 생성이 완료되었습니다.", "none");
			location.href = contextRoot + "/views/teams.html";
		}
	});
	
}); 

$("#searchMemBtn").on("click", function(){
	if($("[name=mpno]").val() == "") {
		alertMsgBox("핸드폰 번호를 입력하세요.", "none");
		return false;
	}
	
	$.ajax({
		url: "/soccer-kick/team/searchMembers.do"
		,dataType: "JSON"
		,type: "POST"
		,data: {
			mpno: $("[name=mpno]").val()
		}
		,success: function(resultObj) {
			var result = resultObj.data;
			
			if(result == null) {
				$("[name=mpno]").val("");
				
				alertMsgBox("회원이 존재하지 않거나 다른 팀에 가입되어 있습니다.", "none");
			} else if(result.mno != myMno) {
				var tf = true;
				var memPic = result.mpath;
				var groupOne = $("#memberGroup1");
				var groupTwo = $("#memberGroup2");
				var oneLength = $("#memberGroup1").children().length;
				var twoLength = $("#memberGroup2").children().length;
				console.log(cnt);
				if(cnt > 0) {
					for(var i=0; i<cnt; i++) {
						if(result.mno == $("#memHidden > [name=mno" + i + "]").val()){
							console.log(result.mno);
							tf = false;
						}
					}
				}
				
				if(tf == true) {
					$("[name=mpno]").val("");
					
					if(memPic == null){
						memPic = "/soccer-kick/images/createTeam/drag avatar.jpg";
					}
					
					var memberStr = '<li role="presentation" class="">'
		                				+'<a href="#" aria-controls="'+ result.mname +'" role="tab" data-toggle="tab">'
		                					+'<img class="img-circle" src="'+ memPic +'" style="height:120px; width:120px;"/>'
		                						+'<h3 class="text-center">'+ result.mname +'</h3>'
		                						+'<p class="text-center">'+ result.mpno +'</p>'
		                				+'</a>'
		                			+'</li>';
					
					if(oneLength < 6) {
						groupOne.append(memberStr);
					} else if(oneLength == 6) {
						groupTwo.append(memberStr);
					}
					
					$("#memHidden").append('<input type="hidden" name="mno'+ cnt +'" value="'+ result.mno +'"/>');
					cnt++;
					
					if(twoLength == 5) {
						$("#registBtn").removeAttr("disabled");
						$("[name=mpno]").attr("disabled", "disabled");
						$("#searchMemBtn").attr("disabled", "disabled");
						
						return false;
					}
				} else {
					$("[name=mpno]").val("");
					
					alertMsgBox("동일한 팀원이 존재합니다.", "none");
				}
			} else {
				$("[name=mpno]").val("");
				
				alertMsgBox("본인은 추가할 수 없습니다.", "none");
			}
		}
	});

});

$("#removephoto").click(function(){
	
	var fullName = $("[name=tepath]").val();
	console.log(fullName);
	
	$.ajax({
		url: "/soccer-kick/gallery/ajax/deleteFile.do"
		,type: "POST"
		,data: {
			fileName: fullName
		}
		,dataType: "text"
		,success: function(resultObj) {
			$("#teamHidden").children("[name=tepath]").remove();
			alertMsgBox("파일 삭제 성공.", "none");
		}
	});
});


});

/* 주소 및 지도 api*/
var mapContainer = document.getElementById('map'), // 지도를 표시할 div
mapOption = {
	center: new daum.maps.LatLng(37.537187, 127.005476), // 지도의 중심좌표
	level: 5 // 지도의 확대 레벨
};

//지도를 미리 생성
var map = new daum.maps.Map(mapContainer, mapOption);
//주소-좌표 변환 객체를 생성
var geocoder = new daum.maps.services.Geocoder();
//마커를 미리 생성
var marker = new daum.maps.Marker({
    position: new daum.maps.LatLng(37.537187, 127.005476),
    map: map
});

$("#searchAddrBtn1").click(function(){
	var lat = "";
	var long = "";
	
    new daum.Postcode({
        oncomplete: function(data) {
            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var fullAddr = data.address; // 최종 주소 변수
            var extraAddr = ''; // 조합형 주소 변수

            // 기본 주소가 도로명 타입일때 조합한다.
            if(data.addressType === 'R'){
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
            // 주소 정보를 해당 필드에 넣는다.
            $("#tpoint").val(fullAddr);

            // 주소로 좌표를 검색
            geocoder.addr2coord(data.address, function(status, result) {
                // 정상적으로 검색이 완료됐으면
                if (status === daum.maps.services.Status.OK) {
                    // 해당 주소에 대한 좌표를 받아서
                    var coords = new daum.maps.LatLng(result.addr[0].lat, result.addr[0].lng);
                    // 지도를 보여준다.
                    mapContainer.style.display = "block";
                    map.relayout();
                    // 지도 중심을 변경한다.
                    map.setCenter(coords);
                    // 마커를 결과값으로 받은 위치로 옮긴다.
                    marker.setPosition(coords);
                    
                    lat = "<input type='hidden' name='tlatitude' value='"+ result.addr[0].lat +"'/>";
                    long = "<input type='hidden' name='tlongitude' value='"+ result.addr[0].lng +"'/>";
                    $("#teamHidden").append(lat);
                    $("#teamHidden").append(long);
                }
            });
        }
    }).open();
    return false;
});

var words = ['No soccer, No My Life!','Create Team!','I will Play With You!'],
	part,
	i = 0,
	offset = 0,
	len = words.length,
	forwards = true,
	skip_count = 0,
	skip_delay = 5,
	speed = 100;

var wordflick = function(){
setInterval(function(){
    if (forwards) {
      if(offset >= words[i].length){
        ++skip_count;
        if (skip_count == skip_delay) {
          forwards = false;
          skip_count = 0;
        }
      }
    }
    else {
       if(offset == 0){
          forwards = true;
          i++;
          offset = 0;
          if(i >= len){
            i=0;
          } 
       }
    }
    part = words[i].substr(0, offset);
    if (skip_count == 0) {
      if (forwards) {
        offset++;
      }
      else {
        offset--;
      }
    }
  	$('.word').text(part);
},speed);
};