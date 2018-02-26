// If `.container` is smaller than the window height then
// we want to veritcally align it
var shouldVerticalAlignContent = function() {
    var contentHeight = $('.container').outerHeight();
    var windowHeight = window.innerHeight;
    if (windowHeight > contentHeight) {
        $('body').addClass('vertical-align');
    } else {
        $('body').removeClass('vertical-align');
    }
};

$(document).ready(function() {
    var isTouch = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );

    if (!isTouch && $('body').attr('data-video').length) {
        BV = new $.BigVideo({ forceAutoplay: isTouch });
        BV.init();
        BV.show($('body').attr('data-video'), { ambient: true });
        BV.getPlayer().on('durationchange', function() {
            $('#big-video-wrap').fadeIn();
        });
    }

    $('#open-modal').click(function(e) {
        e.preventDefault();
        $('#modal').fadeIn();
        $('body').css('overflow', 'hidden');
    });
    $('#modal').click(function(e) {
        if (e.target.id == 'modal') {
            $('body').removeAttr('style');
            $('#modal').fadeOut();
        }
    });
    $('#modal #close').click(function(e) {
        e.preventDefault();
        $('#modal').click();
    });
    $('#modal #submit').click(function(e) {
        $form = $('#modal form');
        var datastring = $form.serialize();

        $.ajax({
            type: 'POST',
            url: $form.attr('action'),
            data: datastring,
            success: function(data, textStatus) {
                $form.find('.field-wrap').fadeOut();
                $(e.target).fadeOut(function() {
                    $form.find('.success').fadeIn();
                });
            },
            error: function(xhr, status, error) {
                $form.find('.error').fadeIn();
            }
        });
    });

    $('body').css('min-height', $('body .container').height());

    shouldVerticalAlignContent();
});

$(window, document).resize(shouldVerticalAlignContent);
