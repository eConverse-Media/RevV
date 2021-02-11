$(function () {
    var username = $('.member-dashboard-name .ProfileUserName span'),
        greeting = !!($('.member-dashboard-name').html()) ? '<div class="greeting">Welcome back, <br /> <h2 class="username"><a href="profile">' + username.text() + '</a></h2></div>' : '<div class="greeting">Welcome to Cayuse</div>',
        progressBar = "",
        progressText = "",
        collapsedGreeting = !!($('.member-dashboard-name').html()) ? '<div class="collapsed-greeting"><div>Welcome back, </div><a href="profile">' + username.text() + '</a></div>' : '<div class="collapsed-greeting"><div>Welcome to Cayuse</div></div>';

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
        $('.greeting').append('<a href="' + $('a[id*="MessagesCount"]').attr('href') + '" class="inbox-numbers">' + messageNumber + 'Unread Messages</a>');
    }
    else {
        $('.greeting').append($('<a class="inbox-link" href="/network/members/profile/myaccount/inbox" >Inbox</a>'));
    }


    //create the second column
    $('.engage').wrapAll('<div class="dashboard-col-2 col-md-3" />');
    $('.make-buttons.engage').wrapAll('<div class="dashboard-btns" />');

    //create the third column
    $('.featured').wrapAll('<div class="dashboard-col-3 col-md-4" />');

    $('.featured .ByLine').prepend($('.featured div[id*="FoundIn"] h5'));

    $('.featured .heading h2').append($('.featured .add-event-button'));

    // Moving in the 

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