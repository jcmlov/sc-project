$(function() {
	var address = user.mbaseAddr + " " + user.mdetAddr;
	$.post(contextRoot + "/manageMember/updateLocation.do", {
		tpoint : address
	}, function(resultObj) {
		var ajaxResult = resultObj.ajaxResult
		if (ajaxResult.status == "success") {
			// map(ajaxResult.data.lat, ajaxResult.data.lng)
			map(ajaxResult, ajaxResult.data.lat, ajaxResult.data.lng)
		} else if (ajaxResult.status == "fail") {
			alert("fail");
		}
	}, 'json');
});

function map(ajaxResult, lat, lon) {
	var teamInfo = ajaxResult.data.teamInfo;
	var latitude = lat;
	var longitude = lon;

	var mapContainer = document.getElementById('map'), // 지도를 표시할 div
	mapOption = {
		center : new daum.maps.LatLng(latitude, longitude), // 지도의 중심좌표
		level : 7
	// 지도의 확대 레벨
	};

	var map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

	var positions = [];

	for (var i = 0; i < teamInfo.length; i++) {
		positions.push({
			content : '<div class="teamsInfoDiv" style="width:auto; margin-top:-15px; margin-bottom: 10px; padding:10px;"><div><img alt="" src="' + teamInfo[i].tepath + '" style="width: 20px; height: 20ox; float: left;"><div style="margin-left:45px;"><h3>'+ teamInfo[i].tname +'</h4></div></div><div><span>인원:&nbsp; '+ teamInfo[i].tmemCnt +' &nbsp;&nbsp;창립일: &nbsp; '+ teamInfo[i].tregDate +'</span></div><div><span>소개:&nbsp; '+ teamInfo[i].tcontent +' </span></div></div></div>',
			latlng : new daum.maps.LatLng(teamInfo[i].tlatitude,
					teamInfo[i].tlongitude)
		});
	}
	positions
			.push({
				content : '<div style="margin-left:50px;">내위치</div>',
				latlng : new daum.maps.LatLng(latitude, longitude)
			});
	

	// 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다

	for (var i = 0; i < positions.length; i++) {
		// 마커를 생성합니다
		var marker = new daum.maps.Marker({
			map : map, // 마커를 표시할 지도
			position : positions[i].latlng
		// 마커의 위치
		});

		// 마커에 표시할 인포윈도우를 생성합니다
		var infowindow = new daum.maps.InfoWindow({
			content : positions[i].content
		// 인포윈도우에 표시할 내용
		});

		// 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
		// 이벤트 리스너로는 클로저를 만들어 등록합니다
		// for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
		daum.maps.event.addListener(marker, 'mouseover', makeOverListener(map,
				marker, infowindow));
		daum.maps.event.addListener(marker, 'mouseout',
				makeOutListener(infowindow));
	}

	// 인포윈도우를 표시하는 클로저를 만드는 함수입니다
	function makeOverListener(map, marker, infowindow) {
		return function() {
			infowindow.open(map, marker);
		};
	}

	// 인포윈도우를 닫는 클로저를 만드는 함수입니다
	function makeOutListener(infowindow) {
		return function() {
			infowindow.close();
		};
	}
}