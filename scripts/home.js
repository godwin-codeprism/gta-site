$(window).on('load', init);
$(window).resize(function () {
    if ($('.blurbox:eq(0)').length > 0) {
        setBlurClip();
    }
    $('.icon-inner-block').hide();
})
$(window).scroll(function () {
    if ($('.blurbox:eq(0)').length > 0) {
        setBlurClip();
    }
    navControl();
    iconBlocksDisplay($(window).scrollTop());
})

function init() {
    String.prototype.splice = function (idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
    };
    if ($('.blurbox:eq(0)').length > 0) {
        setBlurClip();
    }
    $('.gallery-img-block').click(openModal);
}

function iconBlocksDisplay(w) {
    if (w > 400) {
        $('.icon-inner-block').show();
    }
}

function navControl() {
    if ($(window).scrollTop() > 20) {
        $('nav').removeClass('navbar-trans');
    } else {
        $('nav').addClass('navbar-trans');
    }
}
window.setBlurClip = function () {
    var elm = $('.blurbox:eq(0)');
    var _top = Math.round(elm.offset().top) - $(window).scrollTop();
    var _left = Math.round(elm.offset().left);
    var _bottom = Math.round(700 - (elm.offset().top + elm.height())) + $(window).scrollTop();
    var _right = Math.round(elm.offset().left);
    var clipPath = 'inset(' + _top + 'px ' + _right + 'px ' + _bottom + 'px ' + _left + 'px)';
    var clip = 'rect(' + Math.round(elm.offset().top - $(window).scrollTop()) + 'px ' + Math.round(elm.offset().left + elm.width()) + 'px ' + (Math.round(elm.offset().top + elm.height()) - $(window).scrollTop()) + 'px ' + elm.offset().left + 'px)';
    $('.blurbox-background:eq(0)').css({
        'clip-path': clipPath,
        'clip': clip
    });
}

function openModal(e) {
    var src = $(this).find('img').attr('src');
    $('.image-model img').attr('src', src.splice(src.length - 4, 0, "_xl"));
    $('.image-model').removeClass('image-model-hidden');
}

window.scrollToForm = function () {
    $('html, body').animate({
        scrollTop: $('#inputname').offset().top - 210
    }, 500);
    setTimeout(function () {
        $('#inputname').focus()
    }, 500);
}