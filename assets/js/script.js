// price for ticket, located registration form
var ticketPrice = 95;

var setSectionHeight = function() {
	// get current window height
	var winHeight = $(window).height() + 50;

	// set all section to window height
	$('.section > .inner').css('min-height', winHeight);
};


$(document).ready( function() {

	// Resize the section on load
	setSectionHeight();

	// Resize the section on window resize
	$(window).resize( function() {
		setSectionHeight();
	});

	// Bind event on window scroll
	$(window).scroll( function() {
		if ($(this).scrollTop() > 50) {
			$('#logo').addClass('scrolled');
			$('#mainnav').addClass('scrolled');
		}
		else {
			$('#logo').removeClass('scrolled');
			$('#mainnav').removeClass('scrolled');
		}

		// set active menu to item
		$('#mainnav li').each( function() {

			$(this).parent().addClass('active');

			var section = $(this).attr('data-menuanchor');

			if ($('#' + section).isOnScreen()) {
				// remove all active class
				$('#mainnav li').removeClass('active');
				$(this).addClass('active');
			}
		});
	});


	// set the speakers item to same height
	$('.speaker').equalHeights();


	// Add scrolling effect when clicking the main navigation
	$('#mainnav a').smoothScroll({
		preventDefault: false,
		afterScroll: function() {
			var section = $(this).attr('data-menuanchor');

			if ($('#' + section).isOnScreen()) {
				// remove all active class
				$('#mainnav li').removeClass('active');
				$(this).addClass('active');
			}
		}
	});


	// Apply styling to select box on registration section
	$('#ticket')
		.fancySelect()
		.change( function() {
			var total = $(this).val().split(' ')[0];

			var totalPrice = parseInt(total) * ticketPrice;

			//alert(total);
			$('#totalPrice').text(totalPrice);
		});
});


// Detect if the element is visible on viewport
$.fn.isOnScreen = function() {
	
	var win = $(window);
	
	var viewport = {
		top : win.scrollTop()
	};
	//viewport.right = viewport.left + win.width();
	viewport.bottom = (viewport.top + win.height()) - 100;
	
	var bounds = this.offset();
	//bounds.right = bounds.left + this.outerWidth();
	bounds.bottom = (bounds.top + this.outerHeight()) - 50;
	
	return (!(viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};
