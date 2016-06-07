function alertMsgBox(msg, url) {
	var alertObj = "";
	alertObj += '<div id="notifications-full" class="animated fadeIn">';
	alertObj += '<div id="notifications-full-close" class="close">';
	alertObj += '	<span class="iconb" data-icon=""></span>';
	alertObj += '</div>';
	alertObj += '<div id="notifications-full-icon">';
	alertObj += '	<span class="iconb" data-icon=""></span>';
	alertObj += '</div>';
	alertObj += '<div id="notifications-full-text">';
	alertObj += '	' + msg + ' <br/><hr/>';
	alertObj += '	<button id="alertBtn" class="btn btn-success btn-xs">확인</button>';
	alertObj += '</div>';
	alertObj += '</div>';
	$("body > *").css({"opacity": 0.5});
	$("body.window").css({"display" : "none"});
	$("body").prepend(alertObj);
	$("#notifications-full-close").click(function() {
		$('#notifications-full').fadeOut(100);
		$("body > *").css({"opacity": 1});
		if(url != "none") {
			location.href = contextRoot + url;			
		}
	});
	$("#alertBtn").click(function() {
		console.log(111);
		$("#notifications-full-close").trigger("click");
	});
}