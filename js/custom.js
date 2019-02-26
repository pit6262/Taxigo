$(window).on('load', function(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		$('body').addClass('ios');
	};
	$('body').removeClass('loaded');
});

$(function(){


	/* ---------------------------------------------- /*
	 * Styler
	/* ---------------------------------------------- */
    if($('.styler').length){
        $('.styler').styler();
    };

	/* ---------------------------------------------- /*
	 * Tel Mask
	/* ---------------------------------------------- */
	if($('.tel-mask').length){
        $('.tel-mask').mask('999 999 99 99');
    };

    $('.js-close-tel').on('click', function(){
    	$(this).parents('.order-spare').remove();
    	return false
    })

    $('.js-append-tel').on('click', function(){
    	$(this).parents('.form-column').find('.tel2').show();
    	$(this).parents('.order-spare').remove();
    	$('.styler').styler().trigger('refresh');
    	return false
    })

    $('#bothway').change(function() {
	  if(this.checked != false){
	       $('#retutnblock').show();
	  } 
	  else {
	  	$('#retutnblock').hide();
	  }
	});   

	$('.js-tab').on('click', function(){
		$('.js-tab--all').parent().removeClass('active');
		$(this).parent().toggleClass('active');
		return false;
	})
	$('.js-tab--all').on('click', function(){
		$('.tabend-list__item').removeClass('active')
		$(this).parent().addClass('active');
		return false;
	})


	/* ---------------------------------------------- /*
	 * Fancybox
	/* ---------------------------------------------- */

	if($('.fancybox').length) {
		$(".fancybox").fancybox({
			autoSize : true,
			width : 'auto',
			maxWidth : '100%',
			helpers: {
				overlay: {
					locked: true
				},
			}
		});
	}

	$('.close-btn').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$.fancybox.close();
	});

    /* ---------------------------------------------- /*
	 * Timepicker
	/* ---------------------------------------------- */
	if($('.timepicker').length){
	    timepicker($(".timepicker"));
		
	};
	if($('.timepicker2').length){
	    
		timepicker($(".timepicker2"));
	};
	if($('.timepicker3').length){
	    
		timepicker($(".timepicker3"));
	};
	if($('.timepicker4').length){
	    
		timepicker($(".timepicker4"));
	};

	/* ---------------------------------------------- /*
	 * Datepicker
	/* ---------------------------------------------- */

	$( ".date" ).datepicker( {showOtherMonths: true,selectOtherMonths: true, minDate: 0,} );
    

	/* ---------------------------------------------- /*
	 * Fixed filter 
	/* ---------------------------------------------- */
	
	
	if($('.references-slider').length){
        $('.references-slider').slick({
        	slidesToShow: 3,
        	slidesToScroll: 1,
        	prevArrow: '<button class="slick-arrow slick-prev"><svg class="icon icon-angle-arrow-down"><use xlink:href="#icon-angle-arrow-down"></use></svg></button>',
        	nextArrow: '<button class="slick-arrow slick-next"><svg class="icon icon-angle-arrow-down"><use xlink:href="#icon-angle-arrow-down"></use></svg></button>',
        	responsive: [
        		{
        			breakpoint: 1025,
        			settings: {
        				slidesToShow: 2
        			}
        		},
        		{
        			breakpoint: 767,
        			settings: {
        				slidesToShow: 1,
        				adaptiveHeight: true,
        			}
        		}
        	]
        });
    };

    

	/* ---------------------------------------------- /*
	 * Fixed filter 
	/* ---------------------------------------------- */

	if($('.filter').length){
		var navPos, winPos, navHeight;
		function refreshVar() {
			navPos = $('.filter').offset().top;
			navHeight = $('.filter').outerHeight(true);
		}
		refreshVar();

		$('<div class="clone-nav"></div>').insertBefore('.sec-filter .wrapper').css('height', navHeight).hide();
		$(window).on('scroll load resize', function() {
			winPos = $(window).scrollTop();
			if (winPos >= navPos) {
				$('.boxes-filter').addClass('fixed');
				$('.clone-nav').show();
			}
			else {
				$('.boxes-filter').removeClass('fixed');
				$('.clone-nav').hide();
			}
		});
	};

	/* ---------------------------------------------- /*
	 * Counter 
	/* ---------------------------------------------- */

	$('.js-minus').click(function () {
		var $input = $(this).parent().find('input');
		var count = parseInt($input.val()) - 1;
		count = count < 0 ? 0 : count;
		$input.val(count);
		$input.change();
		return false;
	});
	$('.js-plus').click(function () {
		var $input = $(this).parent().find('input');
		$input.val(parseInt($input.val()) + 1);
		$input.change();
		return false;
	});

	$('.js-count-dt').on('change', function () {
		var $input = $(this);
		var vla = $input.val();
		$('.count-dt').html(vla);
		
		return false;
	});

	$('.js-count-vz').on('change', function () {
		var $input = $(this);
		var vla = $input.val();
		$('.count-vz').html(vla);
		
		return false;
	});


	/* ---------------------------------------------- /*
	 * filter Dropdown 
	/* ---------------------------------------------- */

	$(".noclose").click(function(e){
	   e.stopPropagation();
	});

	$('.dropdown-toggle').dropdown()


	$('.filter-list__item').on('click', function() {
		var $this = $(this);

		$this.parent().parent().find('.filter-input').val($this.attr('data-value')).addClass('focused');
		$this.parent().find('.active').removeClass('active');
		$this.addClass('active');
		$this.parent().parent().find('.filter-reset').show();
	});
	$('.filter-reset').on('click', function() {
		var $this = $(this)
		$this.parent().find('.filter-input').val('').removeClass('focused')
		$this.hide();
	});
	
	// Проверяем значение value 
	$.fn.autoClearValue = function () {
        // сохраняем во внутреннюю переменную текущее значение
        $(this).each(function() {
            $(this).data("autoclear", $(this).val());
        });
        $(this)
            .bind('focus', function() {   // обработка фокуса
            		var $this = $(this);
                if ($(this).val() == "") {
                    $(this).addClass('focused')
                } else {
                	$this.parent().find('.filter-reset').show();
                }
            })
            .bind('blur', function() {    // обработка потери фокуса
                var $this = $(this);

                setTimeout(function() {
                    if($this.val() == "") {
		                      $this.attr("value", $this.data("autoclear")).removeClass('focused');
		                      $this.parent().find('.filter-reset').hide();
		                  }
                }, 150);
            })
            .bind('keyup', function() {    // обработка потери фокуса
                var $this = $(this);

                $this.parent().find('.filter-reset').show();
            });
        return $(this);
    }
	$('.filter-input').autoClearValue();


	// Проверяем все поля input если пустое то добавляем класс
	$.fn.autoClear = function () {
        $(this).each(function() {
            $(this).data("autoclear", $(this).attr("placeholder"));
        });
        $(this)
            .bind('focus', function() {   // обработка фокуса
                if ($(this).attr("placeholder") == $(this).data("autoclear")) {
                    $(this).removeClass('incorrect');
                }
            })
            .bind('blur', function() {    // обработка потери фокуса
                if ($(this).val() == "") {
                    $(this).attr("placeholder", $(this).data("autoclear")).addClass('incorrect');
                }
                if ($(this).val() != "") {
                    $(this).removeClass('incorrect');
                }
            });
        return $(this);
    }
    $('.form-input:not(.date):not(.timepicker):not(.timepicker2)').autoClear();

    
	/* ---------------------------------------------- /*
	 * Tabs
	/* ---------------------------------------------- */
	$('.tabs a').click(function(){
		$(this).parents('.tab-wrap').find('.tab-cont').addClass('hide');
		$(this).parent().siblings().removeClass('active');
		var id = $(this).attr('href');
		$(id).removeClass('hide');
		$(this).parent().addClass('active');
		return false
	});

	$('.lang-selected').on('click', function(){
		$(this).parents('.box-lang').toggleClass('active').find('.list-lang').slideToggle(0);
		return false;
	})
	$(document).click( function(event){
      if( $(event.target).closest(".box-lang").length ) 
        return;
      $(".list-lang").hide();
      $('.box-lang').removeClass('active')
      event.stopPropagation();
    });

});

(function(){
var a = document.querySelector('#wrap-sidebar'), b = null, P = 20;
window.addEventListener('scroll', Ascroll, false);
document.body.addEventListener('scroll', Ascroll, false);
function Ascroll() {
  if (b == null) {
    var Sa = getComputedStyle(a, ''), s = '';
    for (var i = 0; i < Sa.length; i++) {
      if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || Sa[i].indexOf('box-shadow') == 0 || Sa[i].indexOf('background') == 0) {
        s += Sa[i] + ': ' +Sa.getPropertyValue(Sa[i]) + '; '
      }
    }
    b = document.createElement('div');
    b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
    a.insertBefore(b, a.firstChild);
    var l = a.childNodes.length;
    for (var i = 1; i < l; i++) {
      b.appendChild(a.childNodes[1]);
    }
    a.style.height = b.getBoundingClientRect().height + 'px';
    a.style.padding = '0';
    a.style.border = '0';
  }
  var Ra = a.getBoundingClientRect(),
      R = Math.round(Ra.top + b.getBoundingClientRect().height - document.querySelector('#wrap-content').getBoundingClientRect().bottom);  // селектор блока, при достижении нижнего края которого нужно открепить прилипающий элемент
  if ((Ra.top - P) <= 0) {
    if ((Ra.top - P) <= R) {
      b.className = 'stop';
      b.style.top = - R +'px';
    } else {
      b.className = 'sticky';
      b.style.top = P + 'px';
    }
  } else {
    b.className = '';
    b.style.top = '';
  }
  window.addEventListener('resize', function() {
    a.children[0].style.width = getComputedStyle(a, '').width
  }, false);
}
})()



