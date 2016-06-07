$(function () {

    /*
     * 갤러리
     */
    $('#gallery').each(function () {

        var $container = $(this),
            $loadMoreButton = $('#load-more'), // 추가 버튼
            $scrollUp = $('#scroll-up'),	   // 맨위로 버튼
            $registPic = $('#regist-pic'),	   // 사진 등록버튼
            $filter = $('#gallery-filter'),    // 필터링 양식
            addItemCount = 16,                 // 한 번에 표시 할 항목 수
            addedd = 0,                        // 표시 된 항목 수
            allData = [],                      // 모든 JSON 데이터
            filteredData = [];                 // 필터링 된 JSON
        
        var body = $('body');
    	body.append('<div id="zoom"><a class="close"></a><a href="#previous" class="previous"></a><a href="#next" class="next"></a><div class="content loading"></div></div>');

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

        // JSON을 검색하고 initGallery 함수를 실행
        $.getJSON('teamGallery/data/content.json', initGallery);

        //갤러리 초기화
        function initGallery (data) {

            // 취득한 JSON 데이터를 저장
            allData = data;
            
            // 초기 상태에서는 필터링하지 않고 그대로 전체 데이터를 전달
            filteredData = allData;

            // 첫 번째 항목을 표시
            addItems();

            // 추가 버튼을 클릭하면 추가로 표시
            $loadMoreButton.on('click', addItems);

            // 필터 라디오 버튼이 변경되면 필터링을 수행
            $filter.on('slider:changed', 'input[type="text"]', filterItems);

            // 항목 링크에 호버 효과 처리 등록
            $container.on('mouseenter mouseleave', '.gallery-item a', hoverDirection);
            
            // 맨위로 버튼 클릭
            $scrollUp.click(function(){
            	$('html, body').animate({scrollTop: 0}, 400);
            	return false;
            });
            
            $registPic.click(function(e){
            	e.preventDefault();
            	wrapWindowByMask();
            });
            
            $('.window #close').click(function (e) {  
                //링크 기본동작은 작동하지 않도록 한다.
                e.preventDefault();  
                $('#mask, .window').hide();  
            });
            
            $("[data-slider]").each(function () {
                var input = $(this);
                $("<span>").addClass("output").insertAfter($(this));
              })
              .bind("slider:ready slider:changed", function (event, data) {
                var year = $(this).nextAll(".output:first").html(data.value);
                Math.floor(year);
            });
            
        }

        // 항목을 생성하고 문서에 삽입
        function addItems (filter) {

            var elements = [],
                // 추가 데이터의 배열
                slicedData = filteredData.slice(addedd, addedd + addItemCount);
            
            // slicedData의 요소마다 DOM 요소를 생성
            $.each(slicedData, function (i, item) {
                var itemHTML =
                        '<li class="gallery-item is-loading">' +
                            '<a href="' + item.images.large + '">' +
                                '<img class="item" src="' + item.images.thumb + '" alt="">' +
                                '<span class="caption">' +
                                    '<span class="inner">' +
                                        '<b class="title">' + item.title + '</b>' +
                                        '<time class="date" datatime="' + item.date + '">' +
                                            item.date.replace(/-0?/g, '/') +
                                        '</time>' +
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

            	if (event) {
        			event.preventDefault();
        		}
        		var link = $(this),
        		    src = link.attr('href');
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
        			}
        		}
            });
            
            // 추가 된 항목 수량 갱신
            addedd += slicedData.length;
            
            // JSON 데이터가 추가 된 후에 있으면 추가 버튼을 지운다
            if (addedd < filteredData.length) {
                $loadMoreButton.show();
            } else {
                $loadMoreButton.hide();
            }
        }
        
        function openPrevious() {
        	i--;
    		var prev = openedImage.parent('div').prev();
    		if (prev.length == 0) {
    			prev = $('#gallery li:eq('+ i +')');
    		}
    		prev.find('a').trigger('click');
    	}
    	
    	function openNext() {
    		i++;
    		var next = openedImage.parent('div').next();
    		if (next.length == 0) {
    			next = $('#gallery li:eq('+ i +')');
    		} 
    		if(i == addedd){
    			next = $('#gallery li:first-child');
    		}
    		next.children('a').trigger('click');
    	}
    		
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
    		
    		$('#zoom .content').on('click', function(){
    			
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
        function filterItems () {
            var key = $(this).val(), // 체크 된 라디오 버튼의 value
            
            // 추가 된 Masonry 아이템
            masonryItems = $container.masonry('getItemElements');

            // Masonry 항목을 삭제
            $container.masonry('remove', masonryItems);

            // 필터링 된 항목의 데이터를 재설정과
            // 추가 된 항목 수를 재설정
            filteredData = [];
            addedd = 0;

            if (key === 'all') {
                // all이 클릭 된 경우 모든 JSON 데이터를 저장
                filteredData = allData;
            } else {
                // all 이외의 경우, 키와 일치하는 데이터를 추출
                filteredData = $.grep(allData, function (item) {
                    return item.category === key;
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

    function wrapWindowByMask() {
    	/* 동적이라 필요없음
    	var maskHeight = $(document).height();
    	var maskWidth = $(window).width();
    	*/
    	
    	$('#mask').css({
    		'width': "20000px"
    		,'height': "100000px"
    	});
    	$('#mask').fadeIn(0);
    	$('#mask').fadeTo('slow', 0.6);
    	$('.window').show();
    	$('[name=imageTitle]').focus();
    }
    
});
