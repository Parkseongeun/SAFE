// Scroll시 Fadein 효과
var scrollFadeEffect = function(){
	$('.fade-in').each( function(i){
		var bottom_of_element = ($(this).offset().top + $(this).outerHeight()) - ($(this).outerHeight()/3);
		var bottom_of_window = $(window).scrollTop() + $(window).height();
		if( bottom_of_window > bottom_of_element ){
			$(this).animate({'opacity':'1','top':'0'}, 500);
		}
	}); 
}

// form
window.onload = function(){
    inputEvent();
    if($('form').find(':input')[0]!==undefined){
      $(':focus').blur();
      //$('form').find(':input')[0].focus();
    }
};
var inputEvent = function() {
	var $inputs = $('form').find(':input');
	$inputs.each(function() {
		var $input = $(this),
			$label = $input.parent('div.form-control');
		if ($input.val())
			$label.addClass('js-active');

			$input.focusin(function() {
				$label.addClass('js-focus');
			});
			$input.change(function() {
				$label.addClass('js-active');
			});
			$input.focusout(function() {
				$label.removeClass('js-focus');
			});
		}
    );
}

// form files
var fileTarget = $('.box__files .upload-hidden');
fileTarget.on('change', function(){
	if(window.FileReader){
		var filename = $(this)[0].files[0].name;
	} else {
		var filename = $(this).val().split('/').pop().split('\\').pop();
	}

	$(this).siblings('.upload-name').val(filename);
});

// 레이어 팝업
var FuncLayer = (function(){
    var method = {};
    var member = {};
    method.init = function(){
        method.element();
    };
    method.element = function(){
        member.$window = $(window);
        member.$wrap = $('body');
    };
    method.open = function(layer,event){
        member.scrollTop = member.$window.scrollTop();
        member.$layer = $(layer);
        member.$openbutton = $(event.target);
		var $dimmed = '<div class="box__dimmed" style="display:none" onclick="FuncLayer.close(\'' + layer + '\')"></div>'
        
        member.$wrap.addClass('js-scroll-lock')
        member.$wrap.css('top', '-' + member.scrollTop +'px');
		member.$layer.addClass('box__layer--active').attr('tabindex','0').focus().after($dimmed).next('.box__dimmed').show();

    };
    method.closed = function(){
        member.$wrap.css('top','').removeClass('js-scroll-lock');
        member.$window.scrollTop(member.scrollTop);
		member.$layer.removeClass('box__layer--active').removeAttr('tabindex');
		setTimeout(function() {
			member.$layer.next('.box__dimmed').remove();
			member.$openbutton.focus();
		}, 100);
    };
    return{
        init:method.init,
        open:method.open,
        closed:method.closed
    }
})();
$(function(){
    FuncLayer.init();
})

$(function(){

	// 공통 - 위로가기
	$(window).scroll(function(){
		if ($(this).scrollTop() > 200 ) {
			$('.button__gotop').fadeIn('fast');
		} else {
			$('.button__gotop').fadeOut('fast');
		}
	});
	$('.button__gotop').click(function(){
		$('html, body').animate( { scrollTop : 0 }, 400 );
		return false;
	});

	// 메인 - 네트워킹 - 연사 상세
	$('.list__networking-person .button__info').click(function(){
		$(this).parent().siblings().find('.box__info').hide();
		$(this).siblings('.box__info').toggle();
	});

	// 공통 - GNB (Mobile)
	$('.button__gnb').click(function(){
		$('.header .box__nav--header').addClass('js-open');
		$('body').addClass('js-scroll-fixed');
	});
	$('.header .box__nav--header .button__close').click(function(){
		$('.header .box__nav--header').removeClass('js-open');
		$('body').removeClass('js-scroll-fixed');
	});

	// Message 수정/삭제
	$('.button__contact').click(function(){
		$(this).siblings('.layer__setting').toggleClass('js-active');
	});

	scrollFadeEffect();
    $(window).scroll( function(){
		var time = setTimeout(function(){
			clearTimeout(time);
			scrollFadeEffect();
		},100)
    });

});

// Session View Type Toggle
$(document).on('click', '.button__sort', function(){
	$(this).addClass('button--active').siblings().removeClass('button--active');
	if($(this).hasClass('button__sort--gallery')) {
		$('.box__article--list').addClass('view--gallery').removeClass('view--list');
	} else {
		$('.box__article--list').addClass('view--list').removeClass('view--gallery');
	}
});