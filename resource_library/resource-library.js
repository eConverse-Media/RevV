var filterText = [],
	gridItems = [];

$(function() {
	
	//handle filtering
	$('.library-list').each(function() {
		var self = $(this),
			tags = $(self).find('a.label-search-tag').toArray();

		$(self).addClass('iso');

		// handle tag info
		if (tags.length) {
			for (var i = 0; i < tags.length; i++) {
				var tag = $(tags[i]).attr('data-tag').toLowerCase();
				tag = tag.replace(/\s+/g, '-');
				tag = tag.replace(/,/g, '');
				tag = tag.replace(/[{()}]/g, '');
				tag = tag.replace(/&/g, '');
				tag = tag.replace(/\//g, '-');
				// console.log(tag);
				$(self).addClass(tag);
			}
		}

		//check for pinned entry
		var pin = $(self).find('h3 span');

		if ($(pin).hasClass('glyphicon-pushpin')) {
			$(self).prepend('<div class="featured-resource"><i class="fa fa-star"></i>Featured</div>');
		}

		// create a view resource button
		var urlHref = $(self).find('h3 a').attr('href');
		var rating = $(self).find('div[id*="likeRatingContainer"]');

		if (urlHref.length) {
			$(
				'<div class="view-resource"><a href="' +
					urlHref +
					'" target="_blank" ">View Resource<i class="fa fa-arrow-right"></i></a></div>'
			).appendTo(self);
		}

		$(rating).appendTo($(self).find('.view-resource'));

		var entryAttachementList = $(self).find('.libListReptEntAttchLble');
		$(entryAttachementList).parent().addClass('attachment-wrap');

		var tagsContainer = $(self).find('.tags-container');
		$(tagsContainer).appendTo(self);
		
	});

	// handle filtering
	$('.section2 div[id*="DocumentPanel"]').prepend('<div class="dropdown-group"><div class="HtmlContent"></div></div>');

	makinFilters();

	$('.filter-label').click(function() {
		$(this).parent().toggleClass('open');
	});

	$("div[id*='DocumentPanel'] .row > .col-md-12 .Content div[id*='ListViewContent']").isotope({
		itemSelector: '.library-list'
	});

	var contentText = [];

	// for(var i = 0; i < $('.filter-button-group').length; i++ ) {

	var groupFilterButtons = $('.filter-button-group');

	$(groupFilterButtons).each(function(i) {
		w = window;

		var filterButtonGroupEach = groupFilterButtons[i];

		firstFilterClass = filterButtonGroupEach.className.split(' ')[0];

		// return firstFilterClass;

		w['arr_' + firstFilterClass] = [];
	});

	// }

	// Update Filters When Drop down input clicked
	$('.checkbox-filter input').click(function() {
		var self = $(this),
			parent = $(self).parents('.filter-button-group'),
			selectors = $(parent).find('.checkbox-filter input').toArray(),
			parentGroup = $(parent).attr('class').split(/\s+/)[0],
			label = $(parent).find('.filter-label'),
			text = $(self).attr('id').toLowerCase(),
			labelText,
			defaultText = 'Filter by';

		//toggle active class
		$(self).toggleClass('active');

		//check for show all
		var dataFilter = $(self).attr('data-filter');
		if (!dataFilter && $(self).hasClass('active')) {
			for (var i = 1; i < selectors.length; i++) {
				var checkbox = selectors[i];
				$(checkbox).removeClass('active');
				checkbox.checked = false;
			}
		} else {
			$(selectors[0]).removeClass('active');
			selectors[0].checked = false;
		}

		// set dropdown label text
		text = text.replace('-', ' ');

		filterButtonGroup = $('.filter-button-group');

		$(filterButtonGroup).each(function(i) {
			var filterButtonFirstElement = filterButtonGroup[i];
			var elementFirstClass = filterButtonFirstElement.className.split(' ')[0];
			var classConversion = elementFirstClass.replace(/-/g, ' ');

			switch (parentGroup) {
				case elementFirstClass:
					if (!dataFilter) {
						w['arr_' + elementFirstClass] = [];
					}
					labelText = w['arr_' + elementFirstClass];
					defaultText += ' ' + classConversion;
					break;
			}
		});

		if ($(self).hasClass('active') && !!text && text !== 'all') {
			labelText.push(text);
		} else {
			var index = labelText.indexOf(text);
			if (index !== -1) {
				labelText.splice(index, 1);
			}
		}

		if (labelText.length) {
			labelText = labelText.join(', ');
			$(label).text(labelText);
			$(parent).find('.filter-content').addClass('has-selection');
		} else {
			$(label).text(defaultText);
			$(parent).find('.filter-content').removeClass('has-selection');
		}

		// updateFilters();
	});

	$(document).click(function(e) {
		var target = e.target,
			selector;

		if ($(target).parents('.filter-content').length) {
			var parent = $(target).parents('.filter-content'),
				klass = $(parent).parent().attr('class').split(/\s+/)[0];
			selector = '.filter-button-group:not(.' + klass + ') .filter-content';
		} else {
			selector = '.filter-content';
		}
		$(selector).removeClass('open');
	});

	handleSlick();
});

function updateSelection(val, klass, filters) {
	var checkboxes = $(val).find('.active').toArray(),
		localFilters = [];

	$(checkboxes).each(function() {
		var dataFilter = $(this).attr('data-filter');
		localFilters.push(dataFilter);
	});

	if (klass.indexOf('-') > -1) {
		klass = klass.replace(/-/g, '');
	}

	filters[klass] = localFilters;
}

function clearFilters() {
	// remove filter button
	var selectors = $('.checkbox-filter input');

	// remove active/checked status from filter checkboxes
	$(selectors).each(function() {
		var selector = $(this);
		$(selector).removeClass('active');
		selector.prop('checked', false);
		$(selector).parent().removeClass('is-active');
	});

	// remove content from filter array

	$('.filter-button-group').each(function() {
		var self = $(this),
			klass = $(self).attr('class').split(' ')[0];

		w['arr_' + klass].splice(0, w['arr_' + klass].length);

		for (var i = 0; i < filterText.length; i++) {
			var currText = filterText[i],
				currTextClass = currText.categoryClass;

			if (currTextClass == klass) {
				classConversion = currText.categoryName;
			}
		}

		var filterLabelClass = $(self).attr('class').split(" ")[0].replace(/-/g, ' ');;
		$($(self).find('.filter-label')).text(filterLabelClass);

	});

	// show all items in the grid and reset filter dropdowns
	$('.filtered-library div[id*="ListViewContent"]').isotope({ filter: '*' });
	// $('.filter-label').text('Select filter options');
	$('.filter-content').removeClass('has-selection');
}

function updateFilters() {
	var groups = $('.filter-button-group').toArray(),
		filters = {};

	$(groups).each(function() {
		var self = $(this),
			klass = $(self).attr('class').split(/\s+/)[0],
			selector = '.' + klass;

		updateSelection(selector, klass, filters);
	});

	var filterVal = concatFilters(filters);

	$("div[id*='DocumentPanel'] .row > .col-md-12 .Content div[id*='ListViewContent']").isotope({
		filter: filterVal
	});
}

function concatFilters(obj) {
	var allFilters = [];

	for (var prop in obj) {
		var group = obj[prop];
		if (!group.length) {
			continue;
		}

		if (!allFilters.length) {
			allFilters = group.slice(0);
			continue;
		}

		var nextFilterList = [];

		for (var i = 0; i < allFilters.length; i++) {
			for (var j = 0; j < group.length; j++) {
				var item = allFilters[i] + group[j];
				nextFilterList.push(item);
			}
		}

		allFilters = nextFilterList;
	}

	allFilters = allFilters.join(', ');

	return allFilters;
}

function makinFilters() {
	categoryList = [];

	$('.label-search-tag:not([aria-label*="User"])').each(function() {
		var self = $(this);
		categoriesMaster = {};
		var ariaLabels = $(self).attr('aria-label');
		var filterCategory = ariaLabels.indexOf(':');
		var categoryValue = ariaLabels.slice(6, filterCategory);
		var tagValueStart = ariaLabels.indexOf('tag=') + 4;
		var tagValue = ariaLabels.slice(tagValueStart, ariaLabels.length);
		categoriesMaster.categoryType = categoryValue;
		categoriesMaster.tag = tagValue;
		categoryList.push(categoriesMaster);
	});

	categoryList.forEach(function(category) {
		var categoryTypeClassConversion = category.categoryType;
		categoryTypeClassConversion = categoryTypeClassConversion.replace(/\s+/g, '-').toLowerCase();
		categoryTypeClassConversion = categoryTypeClassConversion.replace(/\//g, '-').toLowerCase();


		var categoryTagClassConversion = category.tag;
		categoryTagClassConversion = categoryTagClassConversion.replace(/\s+/g, '-').toLowerCase();
		categoryTagClassConversion = categoryTagClassConversion.replace(/\//g, '-').toLowerCase();

		if (
			$('.dropdown-group .HtmlContent > div.' + categoryTypeClassConversion + '.filter-button-group').length === 0
		) {
			$('.dropdown-group .HtmlContent').append(
				'<div class="' +
					categoryTypeClassConversion +
					' filter-button-group "><div class="filter-content"><span class="filter-label">' +
					category.categoryType +
					'</span><ul class="multiple-select"></ul></div></div>'
			);
		}

		if ($('.filter-button-group').hasClass(categoryTypeClassConversion)) {
			if (
				$(
					'ul.multiple-select > li.checkbox-filter label input[data-filter=".' +
						categoryTagClassConversion +
						'"]'
				).length === 0
			) {
				$('div.' + categoryTypeClassConversion + '.filter-button-group ul.multiple-select').append(
					'<li class="checkbox-filter"><label class="container"><input type="checkbox" id="' +
						category.tag +
						'" data-filter=".' +
						categoryTagClassConversion +
						'">' +
						category.tag +
						'<span class="checkmark"></span></label></li>'
				);
			}
		}
	});

	$('.filter-button-group').wrapAll('<div class="row"/>');

	$('.filter-button-group .filter-content .multiple-select').prepend(
		'<li class="checkbox-filter"><label class="container"><input type="checkbox" id="all" data-filter="">Show All Types<span class="checkmark"></span></label></li>'
	);

	$('.filter-button-group').each(function() {
		var self = $(this),
			multiselect = $(self).find('.multiple-select'),
			listItems = multiselect.children('li:not(:contains("Show All"))').get();
		listItems.sort(sortAlphaNum);
		$.each(listItems, function(idx, itm) {
			multiselect.append(itm);
		});
	});

	function sortAlphaNum(a, b) {
		var aText = $(a).text(),
			bText = $(b).text(),
			regexAlpha = /[a-zA-Z*]/g,
			regexNum = /[0-9*]/g;

		aText = aText.toString();
		aText = aText.toLowerCase();

		bText = bText.toString();
		bText = bText.toLowerCase();

		// remove numbers
		var aTextAlpha = aText.replace(regexNum, ''),
			bTextAlpha = bText.replace(regexNum, '');

		// remove extra words
		var aTextAlphaFirstWord = aTextAlpha.split(' ')[0],
			bTextAlphaFirstWord = bTextAlpha.split(' ')[0];

		// remove letters
		var aTextNum = parseInt(aText.replace(regexAlpha, '')),
			bTextNum = parseInt(bText.replace(regexAlpha, ''));

		// alphabetically sorting words
		if (!(aTextAlphaFirstWord === bTextAlphaFirstWord)) {
			return aTextAlpha > bTextAlpha ? 1 : -1;
		} else {
			// sorting alphanumeric values
			return aTextNum > bTextNum ? 1 : -1;
		}
	}

	$('.dropdown-group .HtmlContent').append('<a class="apply-filters" onclick="updateFilters();">Apply</a>');

	$('.dropdown-group .HtmlContent').append('<a class="clear-filters" onclick="clearFilters();">Clear Filters</a>');

	$('.clear-filters, .apply-filters').wrapAll('<div class="filter-buttons" />');
}

function handleSlick() {
	$('.card-slide').each(function() {
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

    // slider

    $('.card-slide').wrapAll('<div class="card-slider slider-for slick-dotted" />');
    $('.card-slider.slider-for').slick({
        dots: false,
        arrows: true,
        infinite: true,
        autoplay: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: '<button type="button" class="slick-arrow next-arrow"><i class="fas fa-arrow-right"></i></button',
        prevArrow: '<button type="button" class="slick-arrow prev-arrow"><i class="fas fa-arrow-left"></i></button'
    });
}
