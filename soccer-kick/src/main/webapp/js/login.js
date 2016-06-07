Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear().toString();
    var yarr = [];
    var mm = (this.getMonth() + 1).toString();
    var dd = this.getDate().toString();
    return yyyy + "-" + (mm[1] ? mm : '0'+mm[0]) + "-" + (dd[1] ? dd : '0'+dd[0]);
};

var d = new Date();
$("input#mbirth").attr("max", d.yyyymmdd())
				 .attr("value", d.yyyymmdd());

////////////////////////////node id check///////////////////////
$("#memail").keyup(function() {
	console.log(123);
	$.getJSON(nodeRoot + contextRoot + "/nodeTest?callback=?&memail=" + $("#memail").val(), function(resultObj) {
		var status = resultObj.status;
		if(status == "invalid") {
			$("#emailDupCheck i").css("color", "red");
			$("#emailDupCheck > input").css("color", "red");
		} else if(status == "fail") {
			$("#emailDupCheck i").css("color", "red");
			$("#emailDupCheck > input").css("color", "red");
		} else {
			$("#emailDupCheck i").removeAttr("style");
			$("#emailDupCheck > input").css("color", "blue");
		}
	});
})
//////////////////////////////회원가입////////////////////////////
function memAdd() {
	if($("#mpass").val() != $("#mpassConfirm").val()) {
		alertMsgBox("Two password is not same", "none");
		$("#mpass").val("").focus();
		$("#mpassConfirm").val("");
		return false;
	}
	
	if($("#mname").val().indexOf(" ") >= 0) {
		alertMsgBox("Cannot include null with namespace", "none");
		$("#mname").focus().select();
		return false;
	}
	
	for(var i = 0; i < $("#mname").val().length; i++) {
		var ch = $("#mname").val().charAt(i);
		 if ((ch >= '0' && ch <= '9')) {
			  alertMsgBox("Cannot include number character with namespace", "none");
			  $("#mname").focus().select();
			  return false;
		 }
	}
	
	var phone = $("#mpno").val().split(".");
	if(phone[0].length != 3 ||
	   phone[1].length != 4 ||
	   phone[2].length != 4) {
		alertMsgBox("Input phone number correctly", "none");
		$("#mpno").focus().select();
		return false;
	}
	
	$.post(contextRoot + "/member/add.do", {
		memail 		: $("#memail").val(),
		mname 		: $("#mname").val(),
		mpass 		: $("#mpass").val(),
		mpno 		: $("#mpno").val(),
		mbirth 		: $("#mbirth").val(),
		mbaseAddr 	: $("#mbaseAddr").val(),
		mdetAddr 	: $("#mdetAddr").val(),
		mposname 	: $("#mposname:checked").val(),
		mgender 	: $("#mgender:checked").val()
	}, function(resultObj) {
		var ajaxResult = resultObj.ajaxResult
		if(ajaxResult.status == "success") {
			alertMsgBox("Registration Complete!", "/")
		} else if(ajaxResult.status == "fail") {
			alertMsgBox("Email duplication!", "none");
			$("#memail").val("");
			$("#memail").focus();
		}
	}, 'json');
	return false;
}
///////////////////////////////////////////////////////////////
///////////////////////////로그인///////////////////////////////
function login() {
	$.post(contextRoot + "/login/login.do", {
		memail 	: $("#loginMemail").val(),
		mpass 	: $("#loginMpass").val()
	}, function(resultObj) {
		var ajaxResult = resultObj.ajaxResult
		if(ajaxResult.status == "success") {
			location.href = contextRoot + "/views/home.html";
		} else if(ajaxResult.status == "fail") {
			alertMsgBox("Check email or password!", "none");
		}
	}, 'json');
	return false;
}