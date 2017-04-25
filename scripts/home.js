$(window).on('load', init);
$(window).resize(function () {
    setBlurClip();
})
$(window).scroll(function () {
    setBlurClip();
})

function init() {
    setBlurClip();
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