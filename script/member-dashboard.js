$(function () {
    var username = $('.member-dashboard-name .ProfileUserName span'),
        greeting = !!($('.member-dashboard-name').html()) ? '<div class="greeting">Welcome back, <br /> <h2 class="username"><a href="profile">' + username.text() + '</a></h2></div>' : '<div class="greeting">Welcome to Revv</div>',
        progressBar = "",
        progressText = "",
        collapsedGreeting = !!($('.member-dashboard-name').html()) ? '<div class="collapsed-greeting"><div>Welcome back, </div><a href="profile">' + username.text() + '</a></div>' : '<div class="collapsed-greeting"><div>Welcome to Revv</div></div>';

    //create the first column
    $('.dashboard-link').wrapAll('<div class="dashboard-col-1 col-md-5" />');
    $('<h4>Quick Links</h4>').insertAfter($('.dashboard-progress'));
    if (!!($('#Welcome_Content div[id*="CompleteBarProgress"]').html())) {
        progressBar = $('#Welcome_Content div[id*="CompleteBarProgress"]').clone();
        $(progressBar).addClass('dashboard-progress');
        progressText = '<span class="progress-text">Profile completion:</span>';
        $(progressText).prependTo(progressBar);
    } else {
        progressBar = '<div class="dashboard-progress"><span class="progress-text">Profile Completion</span><div class="progress"><div class="progress-bar progress-bar-info" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 50%;">50%</div></div></div>';
    }
    $(progressBar).prependTo('.dashboard-col-1');
    $(greeting).prependTo('.dashboard-col-1');
    if (!!($('.member-dashboard-img').html())) {
        $('.member-dashboard-img').prependTo('.dashboard-col-1');
    }
    if ($('.HLWelcome a[id*="MessagesCount"]').length) {
        var messageNumber = $('.HLWelcome a[id*="MessagesCount"]').text().slice(0, -6);
        $('.member-dashboard-img .text-center>div').append('<a href="' + $('a[id*="MessagesCount"]').attr('href') + '" class="inbox-numbers">' + messageNumber + '</a>');
    }
    else {
        $('.greeting').append($('<a class="inbox-link" href="/network/members/profile/myaccount/inbox" >Inbox</a>'));
    }


    //create the second column
    $('.getting-started').wrapAll('<div class="dashboard-col-2 col-md-3" />');
    $('.make-buttons.getting-started').wrapAll('<div class="dashboard-btns" />');

    $('.dashboard-col-2').append($('<span class="new-things-label">New things to do</span>'));

    //create the third column
    $('.announcements-wrapper').wrapAll('<div class="dashboard-col-3 col-md-4" />');


    $(".announcements-wrapper .HtmlContent").html("");

    $(".announcements-wrapper .HtmlContent").append($(".announcements-slide"));

    $(".announcements-slide").wrapAll(
        '<div class="announcements-slider html slick-dotted" />'
    );
    $(".announcements-slider.html").slick({
        autoplay: false,
        infinite: true,
        fade: false,
        dots: true,
        arrows: true,
        prevArrow:
            '<button type="button" class="slick-arrow prev-arrow"><i class="ft ft-arrow-back" /></button>',
        nextArrow:
            '<button type="button" class="slick-arrow next-arrow"><i class="ft ft-arrow-forward" /></button>',
    });

    //create the dashboard
    $('.dashboard-col-1, .dashboard-col-2, .dashboard-col-3').wrapAll('<div class="member-dashboard" /div>');
    $('.member-dashboard').wrapInner('<div class="row row-wide" />');
    $(collapsedGreeting).prependTo('.member-dashboard');
    $('.member-dashboard').append(($('.collapsed-message')));
    if ($('.HLWelcome a[id*="MessagesCount"]').length === 0) {
        $('.collapsed-greeting').append($('<a class="inbox-link collapsed-inbox" href="/network/members/profile/myaccount/inbox" >Inbox</a>'));
    }


    //check for desktop
    checkForDesktop();

    // handle click event
    $('.member-dashboard-toggle').click(function () {
        if ($('.member-dashboard').hasClass('open')) {
            handleClose();

        } else {
            handleOpen();
        }
    });

});


function handleOpen() {
    $('.member-dashboard').addClass('open');
    $('.member-dashboard-toggle').addClass('open');
    $('.member-dashboard-toggle span').text('Collapse');
}

function handleClose() {
    $('.member-dashboard').removeClass('open');
    $('.member-dashboard-toggle').removeClass('open');
    $('.member-dashboard-toggle span').text('Expand');
    if ($(window).width() < 992) {
        $('.dashboard-slider').slick('slickGoTo', 0, false);
    }
    $('.member-dashboard > .row-wide').animate({
        scrollTop: 0
    });
}

function checkForDesktop() {
    handleOpen();
    $('.toggle-content').hide();
}

$(function () {
    $('div[class*="dashboard-col"]').wrapAll('<div class="dashboard-slider slick-dotted" />');
    handleWindowSize();
    $(window).on('resize orientationChange', function () {
        handleWindowSize();
    });
});

function handleWindowSize() {
    if ($('.dashboard-slider').hasClass('slick-initialized')) {
        return;
    } else if ($(window).width() < 992) {
        slickify();
    } else if ($(window).width() > 991) {
        unslickify();
    }
}

function slickify() {
    $('.dashboard-slider').slick({
        dots: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        autoplay: false,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 991,
                settings: "unslick"
            }
        ]
    });
}

function unslickify() {
    $('.dashboard-slider > *').removeAttr('tabindex');
}