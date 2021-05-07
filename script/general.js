$(function() {
	setTimeout(function() {
		var headerHeight = $('#MPOuterHeader').css('height');
		$('#MPOuter').css('padding-top', headerHeight);
	}, 500);

	$('.HLLandingControl.HLEventList ul li').each(function() {
		var self = $(this),
			month = $(self).find('.date-block .calendar-month span').text();

		month = month.substring(0, 3);
		$(self).find('.date-block .calendar-month').text(month);
	});

	var headerText = $('.header-text');

	if (headerText.length) {
		$(headerText).appendTo('#PageTitleH1');
        $('#PageTitleH1').addClass('header-text')
	}

    handleBgImage($('.interior-header-img'), $('#PageTitleH1'));

	handleTopTiles();
	handleForYouTiles();
	handleSiteFrame();
	handleByLines();
	handleCLP();
});

function handleTopTiles() {
	$('.top-tile').wrapAll('<div class="top-tile-wrapper"/>');

	$('.top-tile').each(function() {
		var anchor = $(this).find('a');
		var anchorHref = $(anchor).attr('href');
		$(this).wrap('<a href="' + anchorHref + '"></a>');
		var anchorText = $(anchor).text();
		$(anchor).replaceWith('<span>' + anchorText + '</span>');
	});
}

function handleForYouTiles() {
	$('.for-you-tile.byline').each(function() {
		var img = $(this).find('img');
		$(img).wrapAll('<div class="byline-wrap" />');

		var byLineWrap = $(this).find('.byline-wrap');

		var byline = $(this).find('h5');
		var postedTo = $(this).find('h6');

		$(byLineWrap).append(byline);
		$(byLineWrap).append(postedTo);

		$(byLineWrap).unwrap();

		$(byline).wrap('<div class="byline-posted-to"/>');
		var bylinePostedTo = $(this).find('.byline-posted-to');
		$(bylinePostedTo).append(postedTo);

		var readmorebutton = $(this).find('em a');

		$(readmorebutton).parent().unwrap();
	});

	$('.for-you-tile.advisor').each(function() {
		var img = $(this).find('img');

		$(img).unwrap();

		var readmorebutton = $(this).find('em a');

		$(readmorebutton).parent().unwrap();

		var htmlContent = $(this).find('.HtmlContent');

		$(htmlContent).find('h3').wrap('<div class="text-content"></div>');

		var textContent = $(this).find('.text-content');

		var paragraph = $(this).find('p');

		$(textContent).append(paragraph);
	});
}

function handleSiteFrame() {
	$('.siteframe-wrapper').wrapInner('<div class="siteframe"></div>');
}

function handleByLines() {
	$('.home .tabs .SearchResults ul li, .community-home .HLLandingControl ul li').each(function() {
		var self = $(this);
		var contentTags = $(self).find('div[id*="pnlTags"]');
		var byline = $(self).find('.ByLine');
		var communityName = $(self).find('h5');
		// var profileImg = $(self).find('div[id*="pnlProfPic"]');

		// $(profileImg).appendTo(self);
		$(byline).appendTo(self);
		$(communityName).appendTo(self);
		$(contentTags).appendTo(self);
		$(self).append('<div class="byline-wrap"/>');

		var bylineWrap = $(self).find('.byline-wrap');

		// $(bylineWrap).append(profileImg);
		$(bylineWrap).append(byline);
		$(bylineWrap).append(communityName);
	});

	$(
		'.interior div:not(.featured):not(.filtered-grants) > div > .SearchResults.HLLandingControl ul li'
	).each(function() {
		var self = $(this);
		var contentTags = $(self).find('div[id*="pnlTags"]');

		var byline = $(self).find('.ByLine');
		var communityName = $(self).find('h5');

		$(byline).appendTo(self);
		$(communityName).appendTo(self);
		$(byline + ',' + communityName).wrapAll('<div class="byline-wrap"/>');
		var byLine = $(this).find('.byline-wrap');

		$(contentTags).appendTo(self);
	});

	$('.latest-activity .HLDiscussions ul li').each(function() {
		var byline = $(this).find('.ByLine');
		var contentRow = $(this).find('> .row.content-row');
		var profileImg = $(this).find('div[id*="DiscussionList_Picture"]');
		$(contentRow).prepend($(byline));
		$(contentRow).prepend($(profileImg));
	});
}

function handleCLP() {
	// Wrapping the Community Tabs
	$('#CommunityTabsContainer').wrap('<div class="community-tabs-wrap"></div>');

	// Wrapping

	var bgImg = $('.summary-edit .Content img');

	var bgImgSrc = $(bgImg).attr('src');

	var header = $('.community-home')
		.closest('.MPContentArea')
		.find('h1')
		.wrap('<div class="community-home-title-wrapper"></div>');

	var communityHeaderWrap = $('.MPContentArea').find('.community-home-title-wrapper');

	$(communityHeaderWrap).css('background-image', 'url("' + bgImgSrc + '")');

	$('ul[id*="CommunityTabsContainer"]').removeClass('nav-tabs').addClass('nav-pills');

	// Pull Join Leave Button into Header

	if ($('div[id*="PermissionJoin_JoinPanel"]').length) {
		$(header).append($('div[id*="PermissionJoin_JoinPanel"]'));
	}

	if ($('.community-home .summary-edit .Content div div iframe').length === 0) {
		$('.community-home .summary-edit').hide();
	}
}
