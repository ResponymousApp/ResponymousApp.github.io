window.jQuery(document).ready(function($) {
	
	'use strict';
	
	//-------------------- jQuery smooth scrolling --------------------//
	
	$('a.smooth-scroll').on('click', function(event) {
		var $anchor		= $(this);
		var offsetTop	= parseInt($($anchor.attr('href')).offset().top, 0);
				
		$('html, body').stop().animate({
			scrollTop: offsetTop
		}, 2000,'easeInOutExpo');
		
		event.preventDefault();
	});
	
	//-------------------- End jQuery smooth scrolling --------------------//
	
	
	
	//-------------------- Responsive main menu --------------------//
	
	// Create a selectbox for menu list value
	$('<select />').addClass('visible-phone').appendTo('#header .menu-nav');
	$('<option />', {
		'selected': 'selected',
		'value'   : '#',
		'text'    : 'Please select one option....'
	}).appendTo('#header .menu-nav select');
	
	// Dropdown menu list value
	$('#header .menu-nav ul li a').each(function() {
		var el = $(this);
		$('<option />', {
			'value'   : el.attr('href'),
			'text'    : el.text()
		}).appendTo('#header .menu-nav select');
	});
	
	// Make the drop-down work
	$('#header .menu-nav select').change(function() {
		window.location = $(this).find('option:selected').val();
	});
	
	//-------------------- End responsive main menu --------------------//
	
	
	
	//-------------------- Main slider function with nivoSlider --------------------//
	
	$('#slider .nivoSlider').nivoSlider({
		directionNav: false,
		controlNav: false,
		pauseTime: 5000
	});
	
	//-------------------- End main slider function with nivoSlider --------------------//
	
	
	
	//-------------------- Responsive video object --------------------//
	
	$('body').fitVids();
	
	//-------------------- End responsive video object --------------------//
	
	
	
	//-------------------- Parallax effect for contact base background --------------------//
	
	var $mobileSupport = $.browser.mobile;
	
	if (navigator.appVersion.indexOf('MSIE 7') === -1 && navigator.appVersion.indexOf('MSIE 6') === -1 && !$mobileSupport) {
		$('#slider').parallax();
		$('#contact').parallax();
	}
	
	$('#main-tabs .tabs a').click(function() {
		setTimeout(function() {
			if (navigator.appVersion.indexOf('MSIE 7') === -1 && navigator.appVersion.indexOf('MSIE 6') === -1 && !$mobileSupport) {
				$('#contact').parallax();
			}
		}, 500);
	});
	
	$(window).resize(function() {
		if (navigator.appVersion.indexOf('MSIE 7') === -1 && navigator.appVersion.indexOf('MSIE 6') === -1 && !$mobileSupport) {
			$('#slider').parallax();
			$('#contact').parallax();
		}
	});
	
	//-------------------- End parallax effect for contact base background --------------------//
	
	
	
	//-------------------- prettyPhoto for image gallery modal popup --------------------//

	$('a[data-rel^="prettyPhoto"]').prettyPhoto({
		social_tools: false,
		hook: 'data-rel'
	});
	
	//-------------------- End prettyPhoto for image gallery modal popup --------------------//
	
	
	
	//-------------------- jQuery placeholder for IE --------------------//

	$('input, textarea').placeholder();
	
	//-------------------- End jQuery placeholder for IE --------------------//
	
	
	
	//-------------------- Figure overlay effect --------------------//
	
	if (navigator.appVersion.indexOf('MSIE 7') === -1 && navigator.appVersion.indexOf('MSIE 6') === -1) {
		$('figure.figure-overlay').each(function() {
			$(this).hoverdir({
				hoverParent: $(this).children('a'),
				hoverElement: $(this).children('a').children('div').children('p')
			});
		});
	}
	
	//-------------------- End figure overlay effect --------------------//
	
	
	
	//-------------------- Subscribe form submit process --------------------//
	
	// Email input focus function
	$('#subscribe-form input[name="email"]').on('focus keypress',function() { // Checking subcribe form when focus event
		var $input = $(this);
		if($input.hasClass('error')) {
			$input.val('').removeClass('error').css({'color': '#505050', 'backgroundColor': '#FFF'});
		}
	});
	
	// Subscribe submit from process
	$('#subscribe-form').submit(function() {
		var $form		= $(this);
		var $email		= $form.find('input[name="email"]');
		var $submit		= $form.find('input[name="submit"]');
		var $dataStatus	= $form.parent().find('.data-status');
			
		var submitData = $form.serialize();
		$email.attr('disabled','disabled');
		$submit.attr('disabled','disabled');
		$.ajax({ // Submit process with AJAX
			type: 'POST',
			url:  'process-subscribe.php',
			data: submitData + '&action=add',
			dataType: 'html',
			success: function(msg) {
				if (parseInt(msg, 0) !== 0) {
					var msg_split = msg.split('|');
					if (msg_split[0] === 'success') {
						$form.fadeOut(function() {
							$dataStatus.html(msg_split[1]).fadeIn();
						});
					} else {
						$submit.removeAttr('disabled');
						$email.val(msg_split[1]).removeAttr('disabled').addClass('error').css({'color': '#921b1b', 'backgroundColor': '#fea5a5'});
					}
				}
			}
		});
		return false;
	});
	
	//-------------------- End subscribe form submit process --------------------//
	
	
	
	//-------------------- Contact form submit process --------------------//
	
	$('#contact-form').submit(function() {
		var $form		= $(this);
		var submitData	= $form.serialize();
		var $email		= $form.find('input[name="email"]');
		var $name		= $form.find('input[name="name"]');
		var $subject	= $form.find('input[name="subject"]');
		var $message	= $form.find('textarea[name="message"]');
		var $submit		= $form.find('input[name="submit"]');
		var $dataStatus	= $form.find('.data-status');
		
		$email.attr('disabled','disabled');
		$name.attr('disabled','disabled');
		$subject.attr('disabled','disabled');
		$message.attr('disabled','disabled');
		$submit.attr('disabled','disabled');
		
		$dataStatus.show().html('<div class="alert alert-info"><strong>Loading...</strong></div>');
		
		$.ajax({ // Send an offer process with AJAX
			type: 'POST',
			url: 'process-contact.php',
			data: submitData + '&action=add',
			dataType: 'html',
			success: function(msg){
				if(parseInt(msg, 0) !== 0) {
					var msg_split = msg.split('|');
					if(msg_split[0] === 'success') {
						$email.val('').removeAttr('disabled');
						$name.val('').removeAttr('disabled');
						$subject.val('').removeAttr('disabled');
						$message.val('').removeAttr('disabled');
						$submit.removeAttr('disabled');
						$dataStatus.html(msg_split[1]).fadeIn();
					} else {
						$email.removeAttr('disabled');
						$name.removeAttr('disabled');
						$subject.removeAttr('disabled');
						$message.removeAttr('disabled');
						$submit.removeAttr('disabled');
						$dataStatus.html(msg_split[1]).fadeIn();
					}
				}
			}
		});
		return false;
	});
	
	//-------------------- End contact form submit process --------------------//
	
	
	
	//-------------------- Back to top scroll --------------------//
	
	$(window).scroll(function(){
		var $scrollup = $('.scrollup');
		if ($(this).scrollTop() > 100) { $scrollup.css('opacity', 1); }
		else { $scrollup.css('opacity', 0); }
	}); 
	
	$('.scrollup').click(function(){
		$("html, body").stop().animate({ scrollTop: 0 }, 2000, 'easeInOutExpo');
		return false;
	});
	
	//-------------------- End back to top scroll --------------------//

});