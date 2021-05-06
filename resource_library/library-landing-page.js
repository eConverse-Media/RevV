$(function () {
    $('.library-card').each(function() {
        var self = $(this);

		var anchor = $(self).find('a');
		var href = $(self).find('a').attr('href');
		var anchorText = $(self).find('a').text();

		$(anchor).replaceWith('<span>' + anchorText + '</span>');
		$(self).wrapInner('<a href="' + href + '"></a>');

        $(self).find('.HtmlContent').wrapInner('<div class="text-container" />');
        (self).find('.HtmlContent').prepend('<div class="img-container" />');
        (self).find('.HtmlContent img').hide();

        handleBgImage($(self), $(self).find('.img-container'));
	});

});
