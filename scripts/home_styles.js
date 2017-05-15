window.homeStyles = function (body) {
    var elm = body.find('.home-styles-container:eq(0)');
    var _top = Math.round(elm.offset().top) - $(window).scrollTop();
    var _left = Math.round(elm.offset().left);
    var _bottom = Math.round(700 - (elm.offset().top + elm.height())) + $(window).scrollTop();
    var _right = Math.round(elm.offset().left);
    var clip = 'rect(' + Math.round(elm.offset().top - $(window).scrollTop()) + 'px ' + Math.round(elm.offset().left + elm.width() + 30) + 'px ' + (Math.round(elm.offset().top + elm.height() + 7) - $(window).scrollTop()) + 'px ' + elm.offset().left + 'px)';
    body.find('.blurbox-background').css({
        'clip': clip
    })
    body.css({
        "margin-top": ($('nav:eq(0)').height() + 15) + "px"
    })
}
window.homeStylesInit = function(){
    $('.home-style-form:eq(0)').submit(openStyles);
    $('[type="password"]').blur(passcodeCheck);
    $('[type="password"]').focus(passcodeCheck);
}

window.openStyles = function (e) {
    e.preventDefault();
    if ($('.home-style-form:eq(0) [type="password"]').val().toUpperCase() == "GTA2144") {
        $('[type="submit"]').addClass('disabled');
        $('[type="submit"]').html('<i class="fa fa-spinner fa-lg fa-pulse fa-fw"></i> Loading Styles...');
        $('#recaptcha_msg').hide();
        var data = {};
        var rawData = JSON.parse(JSON.stringify($(this).serializeArray()));
        rawData.forEach(function (element) {
            data[element.name] = element.value;
        }, this);
        $.ajax({
            type: "POST",
            url: "./endpoints/send-style-mail.php",
            dataType: 'text',
            data: {
                myData: JSON.stringify(data)
            },
            complete: function (r) {
                if (r.responseText == "ok") {
                    $('[type="submit"]').addClass('disabled');
                    $('[type="submit"]').html('<i class="fa fa-spinner fa-lg fa-pulse fa-fw"></i> Loading Styles...');
                    $('#recaptcha_msg').hide();
                    generateStyles();
                } else {
                    $('#recaptcha_msg').html("Some thing went wrong! Please try again.");
                    $('#recaptcha_msg').show();
                    $('[type="submit"]').removeClass('disabled');
                    $('[type="submit"]').html('Generate My Home Styles');
                }
            }
        })
    } else {
        $('#recaptcha_msg').show();
        $('[type="submit"]').removeClass('disabled');
        $('[type="submit"]').html('Generate My Home Styles');
    }
}

window.passcodeCheck = function (e) {

    if (e.type == "blur" && $(this).val().toUpperCase() != "GTA2144") {
        $('#passcode_msg').show();
    } else {
        $('#passcode_msg').hide();
    }
    if (e.type == "focus") {
        $('#passcode_msg').hide();
    }
}

window.generateStyles =  function() {
    $('.home-style-form:eq(0)').fadeOut(500);
    $('.home-styles-container').css('width', '95%');
    var currentWidth = null;
    var loop = setInterval(function () {
        if (currentWidth != $('.home-styles-container').width()) {
            homeStyles($('body'));
            currentWidth = $('.home-styles-container').width();
        } else {
            clearInterval(loop);
            $('.heading').html("Style Previews");
            $('.samples-container').show();
            $('.sample-input input').focus(updateSample);
            $('.sample-input input').blur(updateSample);
        }
    }, 50)
}

function updateSample(e){
    var that = this;
    var loop = setInterval(function(){
        if(e.type == 'focus'){
            $('.sample-display input').val($(that).val());
        }else if(e.type == 'blur'){
            clearInterval(loop)
        }
    },100);
}