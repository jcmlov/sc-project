$(function () {

    /*
     * 갤러리
     */
    $('#gallery').each(function () {
    	
    	var params = location.href;
    	var tno = params.split('?')[1].split('&')[0].split('=')[1];
    	var mno = params.split('?')[1].split('&')[1].split('=')[1];
    	
    	var template = Handlebars.compile($("#template").html());
    	
    	$(".clonDiv").append("<input type='hidden' name='tno' value='" + tno + "'/>");
    	$(".clonDiv").append("<input type='hidden' name='mno' value='" + mno + "'/>");
    	
        var $container = $(this),
            $loadMoreButton = $('#load-more'), // 추가 버튼
            $scrollUp = $('#scroll-up'),	   // 맨위로 버튼
            $registPic = $('#regist-pic'),	   // 사진 등록 팝업 버튼
            $filter = $('#gallery-filter'),    // 필터링 양식
            addItemCount = 16,                 // 한 번에 표시 할 항목 수
            addedd = 0,                        // 표시 된 항목 수
            allData = [],                      // 모든 JSON 데이터
            filteredData = [];                 // 필터링 된 JSON
        
        var minYear = "",
        	minMonth = "",
        	minDate ="",
        	maxYear = "",
        	maxMonth = "",
        	maxDate ="",
        	maxHour = "",
        	maxMinute = "",
        	maxSecond = "",
        	minFilter = "",
        	maxFilter = "";
        
        var body = $('body');
    	body.append('<div id="zoom">'
	    				+'<a class="close"></a>'
	    				+'<a href="#previous" class="previous"></a>'
	    				+'<a href="#next" class="next"></a>'
		    				+'<form name="detailForm">'
		    					+'<div class="content loading"></div>'
		    				+'</form>'
		    		+'</div>');

    	var zoom = $('#zoom').hide(),
    	    zoomContent = $('#zoom .content'),
    	    overlay = '<div class="overlay"></div>',
    	    zoomedIn = false,
    	    openedImage = null,
    	    windowWidth = $(window).width(),
    	    windowHeight = $(window).height(),
    		i = 0;
    	
        $container.masonry({
            columnWidth: 260,
            gutter: 10,
            itemSelector: '.gallery-item'
        });

        // Filter 조건 minDate와 maxDate를 조회함
        $.getJSON("/soccer-kick/gallery/ajax/filterData.do?tno=" + tno, function(resultObj){
        	if(resultObj.data[0] != null) {
        		var min = new Date(resultObj.data[0].minDate);
               	var max = new Date(resultObj.data[0].maxDate);
               	
               	minYear = min.getFullYear();
               	minMonth = min.getMonth();
               	minDate = min.getDate();
                	
               	maxYear = max.getFullYear();
               	maxMonth = max.getMonth();
               	maxDate = max.getDate();
               	maxHour = max.getHours();
               	maxMinute = max.getMinutes();
               	maxSecond = max.getSeconds();
               	
               	minFilter = minYear + minMonth + minDate;
              	maxFilter = maxYear + maxMonth + maxDate;
        	}
        });
        
        // JSON을 검색하고 initGallery 함수를 실행
        $.getJSON('/soccer-kick/gallery/ajax/galleryList.do?tno=' + tno, initGallery);
        
        
        //갤러리 초기화
        function initGallery (data) {
        	// 취득한 JSON 데이터를 저장
        	$.each(data.data, function(key, val){
        		allData[key] = val;
        	});
        	
            // 초기 상태에서는 필터링하지 않고 그대로 전체 데이터를 전달
            filteredData = allData;
            
            // 첫 번째 항목을 표시
            addItems();
			
            // 추가 버튼을 클릭하면 추가로 표시
            $loadMoreButton.on('click', addItems);

            // 항목 링크에 호버 효과 처리 등록
            $container.on('mouseenter mouseleave', '.gallery-item a', hoverDirection);
            
            // 맨위로 버튼 클릭
            $scrollUp.click(function(){
            	$('html, body').animate({scrollTop: 0}, 400);
            	return false;
            });
            
            // 사진 등록
            $registPic.click(function(e){
            	e.preventDefault();
            	wrapWindowByMask();
            	
            	$("[name=btitle]").focus();
            });
            
            // lightbox 닫기 버튼
            $('.window #close').click(function (e) {  
                //링크 기본동작은 작동하지 않도록 한다.
                e.preventDefault();  
                $('#mask, .window').hide();  
            });
            
            if(allData.length != 0) {
	            // filter slider 불러오기
	            $("#slider").dateRangeSlider({
	                bounds: {min: new Date(minYear, minMonth, minDate), max: new Date(maxYear, maxMonth, maxDate, maxHour, maxMinute, maxSecond)},
	                scales: [{
	                  first: function(value){return value; },
	                  end: function(value) {return value; },
	                  next: function(value){
	                    var next = new Date(value);
	                    return new Date(next.setMonth(value.getMonth() + 1));
	                  },
	                  format: function(tickContainer, tickStart, tickEnd){
	                    tickContainer.addClass("myCustomClass");
	                  }
	                }]
	              });
	
	              $("#slider").dateRangeSlider("values", new Date(minYear, minMonth, minDate), new Date(maxYear, maxMonth, maxDate, maxHour, maxMinute, maxSecond));
	              
	              $("#slider").bind("valuesChanged", function(e, data){
	            	  console.log(data);
	            	  filterItems(data);
	              });
            }
        }

        // 항목을 생성하고 문서에 삽입
        function addItems(filter) {
            var elements = [],
                // 추가 데이터의 배열
                slicedData = filteredData.slice(addedd, addedd + addItemCount);
            
            // slicedData의 요소마다 DOM 요소를 생성
            $.each(slicedData, function (i, item) {
            	var imgSrc = "/soccer-kick/attachfile" + item.frealName;
            	var oriName = "/soccer-kick/attachfile" + item.foriName;
            	var regDate = new Date(item.bregDate);
            	var center;
            	if(regDate.getMonth() + 1 < 10) {
					center = "0" + (regDate.getMonth() + 1 );
				} else {
					center = regDate.getMonth() + 1; 
				};
            	var bregDates = regDate.getFullYear() + " - " + center + " - " + regDate.getDate();
                
                var itemHTML =
                        '<li class="gallery-item is-loading">' +
                            '<a href="' + imgSrc + '">' +
                            '<input type="hidden" name="fno" value="' + item.fno + '">' +
                            '<input type="hidden" name="bno" value="' + item.bno + '">' +
                            '<input type="hidden" name="mno" value="' + item.mno + '">' +
                                '<img class="item" src="' + oriName + '" alt="">' +
                                '<span class="caption">' +
                                    '<span class="inner">' +
                                        '<time class="date" datatime="' + item.bregDate + '">' +
                                            // item.fpath.replace(/-0?/g, '/') +
                                        	 bregDates + 
                                        '</time>' +
                                        '<b class="title">[' + item.btitle + ']</b>' +
                                        '<b class="content">' + item.bcontent + '</b>' +
                                    '</span>' +
                                '</span>' +
                            '</a>' +
                        '</li>';
                elements.push($(itemHTML).get(0));
            });

            // DOM 요소의 배열을 컨테이너에 넣고 Masonry 레이아웃을 실행
            $container
                .append(elements)
                .imagesLoaded(function () {
                    $(elements).removeClass('is-loading');
                    $container.masonry('appended', elements);

                    // 필터링시 재배치
                    if (filter) {
                        $container.masonry();
                    }
                });
            
            // 링크에 Colorbox 설정
            $container.find('a').on("click", function(event){
            	i = $(this).parent().index();
            	
            	var hiddenFno = "<input type='hidden' name='fno' value='" + $(this).find('[name=fno]').val() + "'/>";
            	var hiddenBno = "<input type='hidden' name='bno' value='" + $(this).find('[name=bno]').val() + "'/>";
            	var hiddenMno = $(this).find('[name=mno]').val();
            	var modButton = "<button class='btn btn-info' id='galleyModBtn'>수정</button>"; 
            	var delButton = "<button class='btn btn-danger' id='galleyDelBtn'>삭제</button>"
            	var front = "";
            	var end = "";
            	var fileNameVal = "";
            		
            	if (event) {
        			event.preventDefault();
        		}
        		var link = $(this),
        		    src = link.attr('href');
        		
        		front = src.substring(23, 35);
        		end  = src.substring(35, src.length);
        		
        		fileNameVal = front + "s_" + end;
        		
        		if (!src) {
        			return;
        		}
        		$('#zoom .previous, #zoom .next').show();
        		if (link.hasClass('zoom')) {
        			$('#zoom .previous, #zoom .next').hide();
        		}
        		if (!zoomedIn) {
        			zoomedIn = true;
        			zoom.show();
        			body.addClass('zoomed');
        		}
        		var image = $(new Image()).hide().css({width: 'auto'});
        		body.append(image);
        		zoomContent.html('').delay(500).addClass('loading');
        		zoomContent.prepend(overlay);
        		image.load(render).attr('src', src);
        		openedImage = link;
        		
        		function render() {
        			var image = $(this),
        			    borderWidth = parseInt(zoomContent.css('borderLeftWidth')),
        			    maxImageWidth = windowWidth - (borderWidth * 2),
        			    maxImageHeight = windowHeight - (borderWidth * 2),
        			    imageWidth = image.width(),
        			    imageHeight = image.height();
        			if (imageWidth == zoomContent.width() && imageWidth <= maxImageWidth && imageHeight == zoomContent.height() && imageHeight <= maxImageHeight) {
        					show(image);
        					return;
        			}
        			if (imageWidth > maxImageWidth || imageHeight > maxImageHeight) {
        				var desiredHeight = maxImageHeight < imageHeight ? maxImageHeight : imageHeight,
        				    desiredWidth  = maxImageWidth  < imageWidth  ? maxImageWidth  : imageWidth;
        				
        					desiredHeight = desiredHeight * 0.7;
        					desiredWidth = desiredWidth * 0.7;
        					
        				if ( desiredHeight / imageHeight <= desiredWidth / imageWidth ) {
        					image.width(Math.round(imageWidth * desiredHeight / imageHeight));
        					image.height(desiredHeight);
        				} else {
        					image.width(desiredWidth);
        					image.height(Math.round(imageHeight * desiredWidth / imageWidth));
        				}
        			}
        			zoomContent.animate({
        				width: image.width(),
        				height: image.height(),
        				marginTop: -(image.height() / 2) - borderWidth,
        				marginLeft: -(image.width() / 2) - borderWidth
        			}, 100, function() {
        				show(image);
        			});

        			function show(image) {
        				zoomContent.html(image);
        				image.show();
        				zoomContent.removeClass('loading');
        				zoomContent.append(hiddenFno);
        				zoomContent.append(hiddenBno);
        				console.log(hiddenMno);
        				zoomContent.append("<input type='hidden' name='tno' value='" + tno + "'/>");
        				zoomContent.append("<input type='hidden' name='mno' value='" + mno + "'/>");
        				zoomContent.append("<input type='hidden' name='fileName' value='" + fileNameVal + "'/>");
        				if(mno == hiddenMno){
        					zoomContent.append(modButton);
        					zoomContent.append(delButton);
        				}
        			}
        		}
            });
            
            // 추가 된 항목 수량 갱신
            addedd += slicedData.length;
            
            // JSON 데이터가 추가 된 후에 있으면 추가 버튼을 지운다
            if (addedd < filteredData.length) {
                $loadMoreButton.show();
                
                $("#goTop").removeClass("col-md-6").removeClass("col-md-offset-3")
    			.addClass("col-md-4").addClass("col-md-offset-2")
    			.find("a").html('<i class="fa fa-chevron-up fa-fw text-danger"></i>TOP</a>');
            } else {
                $loadMoreButton.hide();
                /////////////////////////
                $("#goTop").removeClass("col-md-4").removeClass("col-md-offset-2")
				.addClass("col-md-6").addClass("col-md-offset-3")
				.find("a").html('<i class="fa fa-chevron-up fa-fw text-danger"></i>TOP ( NO MORE LIST )</a>');
            }
        }
        
        $(document).on("click", "#galleyModBtn", function(e){
        	
        	$(".clonDiv").append($(this).parent().find("[name=fno]").clone());
        	$(".clonDiv").append($(this).parent().find("[name=bno]").clone());
        	
        	$.ajax({
        		url: "/soccer-kick/gallery/ajax/galleryDetail.do"
        		,data: {
        			bno: $(this).parent().find("[name=bno]").val()
        			,fno: $(this).parent().find("[name=fno]").val()
        			,mno: $(this).parent().find("[name=mno]").val()
        			,tno: $(this).parent().find("[name=tno]").val()
        		}
        		,type: "post"
        		,dataType: "JSON"
        		,success: function(resultObj) {
        			e.preventDefault();
                	wrapWindowByMask();
                	
                	$("[name=btitle]").val(resultObj.data.btitle);
                	$("[name=bcontent]").val(resultObj.data.bcontent);
                	
                	$("#registBtn").css("display", "none");
                	$("#updateBtn").css("display", "inline");
                	$("#deleteAll").css("display", "none");
                	$("#cancel").css("display", "inline");
                	$("[name=multiForm]").attr("onsubmit", "return update();");
                	
                	var fileInfo = getFileInfo(resultObj);
    				var html = template(fileInfo);
    				$(".uploadedList").append(html);
    				
    				var str = "";
    				$(".uploadedList .delbtn").each(function(index){
    					str = "<input type='hidden' name='files"+ index +"' value='" + $(this).siblings("[name=fileName]").val() + "'>";
    				});
    				$(".hiddenTg").append(str);
                	
        			$("[name=btitle]").focus();
        		}
        	});
        	
        });
        
        $(document).on("click", "#galleyDelBtn", function(event){
        	event.preventDefault();
        	event.stopPropagation();
        	
        	var imgUrl = "";
        	var fnoVal = $(".content > input[name=fno]").val();
        	var bnoVal = $(".content > input[name=bno]").val();
        	var fileNameVal = $(".content > input[name=fileName]").val();
        	
        	$.post(contextRoot + "/gallery/ajax/deleteGalleryFile.do", {
        		fno: fnoVal
        		,bno: bnoVal
        		,fileName: fileNameVal
        	}, function(resultObj) {
        		if(resultObj.ajaxResult.status == "success") {
        			$("button#close").trigger("click");
        			$("a.close").trigger("click");
        			alertMsgBox("파일 삭제 성공", "/views/myteam/board/gallery/teamGallery.html?tno=" + userTeamInfo.tno + "&no=" +user.mno);
        			//location.href = contextRoot + "/views/myteam/board/gallery/teamGallery.html?tno=" + userTeamInfo.tno + "&no=" +user.mno;
        		}
        	}, "json");
        	return false;
        });
        
        $(document).on("click", "#cancel", function(e){
        	$('[name=btitle]').val("");
			$('[name=bcontent]').val("");
			$('.hiddenTg input').remove();
			$('.uploadedList li').remove();
			
			$("#wrap").hide();
        });
        
        // 라이트 박스에서 이전버튼
        function openPrevious() {
        	i--;
    		var prev = openedImage.parent('li').prev();
    		if (prev.length == 0) {
    			prev = $('#gallery li:eq('+ i +')');
    		}
    		prev.find('a').trigger('click');
    	}
    	
        // 라이트 박스에서 다음버튼
    	function openNext() {
    		i++;
    		var next = openedImage.parent('li').next();
    		if (next.length == 0) {
    			next = $('#gallery li:eq('+ i +')');
    		} 
    		if(i == addedd){
    			next = $('#gallery li:first-child');
    		}
    		next.children('a').trigger('click');
    	}
    		
        // 라이트 박스에서 닫기버튼
    	function close(event) {
    		if (event) {
    			event.preventDefault();
    		}
    		zoomedIn = false;
    		openedImage = null;
    		zoom.hide();
    		body.removeClass('zoomed');
    		zoomContent.empty();
    	}
    	
    	function changeImageDimensions() {
    		windowWidth = $(window).width();
    		windowHeight = $(window).height();
    	}
    	
    	(function bindNavigation() {
    		zoom.on('click', function(event) {
    			event.preventDefault();
    			if ($(event.target).attr('id') == 'zoom') {
    				close();
    			}
    		});
    		
    		$('#zoom .close').on('click', close);
    		$('#zoom .previous').on('click', openPrevious);
    		$('#zoom .next').on('click', openNext);
    		$(document).keydown(function(event) {
    			if (!openedImage) {
    				return;
    			}
    			if (event.which == 38 || event.which == 40) {
    				event.preventDefault();
    			}
    			if (event.which == 27) {
    				close();
    			}
    			if (event.which == 37 && !openedImage.hasClass('zoom')) {
    				openPrevious();
    			}
    			if (event.which == 39 && !openedImage.hasClass('zoom')) {
    				openNext();
    			}
    		});

    		if ($('#gallery a').length == 1) {
    			$('#gallery a')[0].addClass('zoom');
    		}
    		$('.zoom, #gallery a').on('click', open);
    	})();
    	
    	(function bindChangeImageDimensions() {
    		$(window).on('resize', changeImageDimensions);
    	})();

    	(function bindScrollControl() {
    		$(window).on('mousewheel DOMMouseScroll', function(event) {
    			if (!openedImage) {
    				return;
    			}
    			event.stopPropagation();
    			event.preventDefault();
    			event.cancelBubble = false;
    		});
    	})();
        
        // 항목을 필터링한다.
        function filterItems(data) {
        	var min = data.values.min;
        	var max = data.values.max;
        	
        	var minY = "",
	        	minM = "",
	        	minD = "",
	        	maxY = "",
	        	maxM = "",
	        	maxD = "",
	        	maxH = "",
	        	maxm = "",
	        	maxS = "",
	        	minF = "",
	        	maxF = "";
        	
        	minY = min.getFullYear();
        	minM = min.getMonth();
        	minD = min.getDate();
        	
        	maxY = max.getFullYear();
        	maxM = max.getMonth();
        	maxD = max.getDate();
        	maxH = max.getHours();
        	maxm = max.getMinutes();
        	maxS = max.getSeconds();
        	
        	minF = minY + (minM + 1) + minD;
        	maxF = maxY + (maxM + 1) + maxD;
        	
            // 추가 된 Masonry 아이템
            var masonryItems = $container.masonry('getItemElements');
            
            // Masonry 항목을 삭제
            $container.masonry('remove', masonryItems);

            // 필터링 된 항목의 데이터를 재설정과
            // 추가 된 항목 수를 재설정
            filteredData = [];
            addedd = 0;
            
            if (minF === minFilter && maxF === maxFilter) {
                // all이 클릭 된 경우 모든 JSON 데이터를 저장
                filteredData = allData;
            } else {
                // all 이외의 경우, 키와 일치하는 데이터를 추출
                filteredData = $.grep(allData, function(item) {
                	var fpathArray = item.fpath.split("/");
                    
                    fpaths = parseInt(fpathArray[1]) + parseInt(fpathArray[2]) + parseInt(fpathArray[3]);
                    
                    return  fpaths >= minF && fpaths <= maxF;
                });
            }

            // 항목을 추가
            addItems(true);
        }

        // 호버 효과
        function hoverDirection (event) {
            var $overlay = $(this).find('.caption'),
                side = getMouseDirection(event),
                animateTo,
                positionIn = {
                    top:  '0%',
                    left: '0%'
                },
                positionOut = (function () {
                    switch (side) {
                        // case 0: top, case 1: right, case 2: bottom, default: left
                        case 0:  return { top: '-100%', left:    '0%' }; break; // top
                        case 1:  return { top:    '0%', left:  '100%' }; break; // right
                        case 2:  return { top:  '100%', left:    '0%' }; break; // bottom
                        default: return { top:    '0%', left: '-100%' }; break; // left
                    }
                })();
            if (event.type === 'mouseenter') {
                animateTo = positionIn;
                $overlay.css(positionOut);
            } else {
                animateTo = positionOut;
            }
            $overlay.stop(true).animate(animateTo, 250, 'easeOutExpo');
        }

        // 마우스의 방향을 감지하는 함수
        // http://stackoverflow.com/a/3647634
        function getMouseDirection (event) {
            var $el = $(event.currentTarget),
                offset = $el.offset(),
                w = $el.outerWidth(),
                h = $el.outerHeight(),
                x = (event.pageX - offset.left - w / 2) * ((w > h)? h / w: 1),
                y = (event.pageY - offset.top - h / 2) * ((h > w)? w / h: 1),
                direction = Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90  + 3) % 4;
            return direction;
        }
    });
    
    // 사진 클릭시 라이트 박스
    function wrapWindowByMask() {
    	$('#mask').css({
    		'width': "20000px"
    		,'height': "100000px"
    	});
    	$('#mask').fadeIn(0);
    	$('#mask').fadeTo('slow', 0.6);
    	$('.window').show();
    	$('[name=imageTitle]').focus();
    }
    
    function getFileInfo(fullName) {
		var fileName, imgsrc, getLink;
		
		var fileLink;
		
		imgsrc= "/soccer-kick/gallery/ajax/displayFile.do?fileName=" + fullName.data.fthumb;
		fileLink = fullName.data.fthumb.substr(14);
		
		var front = fullName.data.fthumb.substr(0,12);
		var end = fullName.data.fthumb.substr(14);
		
		getLink = "/soccer-kick/gallery/ajax/displayFile.do?fileName=" + front + end;
		
		fileName = fileLink.substr(fileLink.indexOf("_") + 1);
		
		return {fileName:fileName, imgsrc:imgsrc, getLink:getLink, fullName:fullName.data.fthumb};
	}
    
});