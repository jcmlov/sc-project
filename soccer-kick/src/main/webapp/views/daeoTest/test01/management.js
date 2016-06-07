$(function(){
	var imgs;
	
//	 전체 이미지 개수
	imgLength = $('.thumbnails').length

	for (var i = 0; i < imgLength; i++) {
		var imgs =+ $('.thumbnails:eq(i)').clone();
	}
	// 화면에 처음 보여질 이미지들
	for (var i = 0; i < 3; i++) {
		$('.thumbnails:eq('+i+')').css('display', 'block');
	}
	
});



// 현재 보여지는 이미지 위치
var index = 0;
var indexSub = 0;
// 승인/거부 후 보여질 이미지
var indexStatus = 0;
//현재 이미지 페이지
var page = 0;

// 상태 값
var pos = 0;
var imgLength;
// 반복 개수
var repeat = 3;

// =============== 이전가기 ==========================
var prev = function(target) {	
		if (index != 0) {
			// 현재 3개 이미지 숨기기
			for (var i = 0; i < repeat; i++) {
				$('.thumbnails:eq('+index++ +')').css('display', 'none');
				indexSub = index - 3;
			}
			// 다음 3개 이미지 보이기
			for (var i = 0; i < repeat; i++) {
				$('.thumbnails:eq('+ --indexSub +')').css('display', 'block');
				index = indexSub;
			}
		
		} else {
			
			alert('처음 이미지입니다.')
		}
		if(page != 0) {
			page--;
		}
};
// =============== 이전가기 ==========================


// =============== 다음가기 ==========================
var next = function() {	
	// 전체 이미지 개수
//	imgLength = $('.thumbnails').length
	if (page==0 && (imgLength < 3)) {
		alert('마지막페이지입니다.');
	} else if (page==1 && (imgLength < 6)) {
		alert('마지막페이지입니다.');
	} else if (page==2 && (imgLength < 9)) {
		alert('마지막페이지입니다.');
	} else if(imgLength-3 != index) {
		// 다음 3개 이미지 보이기
		for (var i = 0; i < repeat; i++) {
			$('.thumbnails:eq('+ index++ +')').css('display', 'none');
			indexSub = index;
		}
		
		// 현재 3개 이미지 숨기기
		for (var i = 0; i < repeat; i++) {
			$('.thumbnails:eq('+indexSub++ +')').css('display', 'block');
		}	
	} else {
		alert('마지막 이미지입니다.');
	}
	page++;

};
// =============== 다음가기 ==========================


//=============== 입단 승인 ==========================
var move = function (target) {
	// 승인한사람 포지션정보 가져오기
	var position = $(target).siblings('p.position').text();
	console.log(position)
	// 승인한 이미지 복사
	var clone = $(target).parent().siblings('img').clone();
		
	clone = clone.attr({'ondragstart': 'drag(this, event);'});
	clone.animate( { width:500, height:10 } );
	clone.animate( { width:0 } );
	clone.animate( { width:100, height:100 } );
		
	switch(position) {
 	case "포지션 : GK" :
    	$('#GK').append(clone);
 	break;
 	case "포지션 : DF" : 
 		$('#DF').append(clone);

 	break;
 	case "포지션 : MF" : 
 		$('#MF').append(clone);

 	break;
 	case "포지션 : FW" : 
 		$('#FW').append(clone);
 	break;
	};
	cancel(target);
};
//=============== 입단 승인 ==========================



//=============== 입단 거부 ==========================
var cancel = function (target) {
	
//	$(target).parent().css('display', 'none');
	$(target).parent().parent().animate({
         width:0,
         opacity:0.5
     }, 1000, function() {
    	 $(target).parent().parent().parent().parent().remove();
    	 if (page == 0) {
    		for (var i = 0; i < repeat; i++) {
    			$('.thumbnails:eq('+i+')').css('display', 'block');
			}	
    	 }
    	 else if (page == 1) { 
    		 indexStatus = indexStatus + 3;
    		 for (var i = 0; i < repeat; i++) {
     			$('.thumbnails:eq('+indexStatus++ +')').css('display', 'block');
 			}
    		 indexStatus = 0;
    	}
    	 else if (page == 2) { 
    		 indexStatus = indexStatus + 6;
    		 for (var i = 0; i < repeat; i++) {
     			$('.thumbnails:eq('+indexStatus++ +')').css('display', 'block');	
 			}
    		 indexStatus = 0;
    	}
     });
	imgLength--;
};
//=============== 입단 거부 ==========================



//=============== 이미지 드래그 시작시 호출함수 ==========================
var drag = function (target, img) {
	img.dataTransfer.setData('imgid', target.id);
};
//=============== 이미지 드롭시 호출 할 함수 ==========================
var	drop = function (target, img) {
	var imgId = img.dataTransfer.getData('imgId');
	target.appendChild(document.getElementById(imgId));
	img.preventDefault();
};
//=============== 이미지 드롭시 호출 할 함수 ==========================
