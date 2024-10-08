jQuery(function () {
    prime();
});


/*global jQuery:false */
var sliderDragScroll = false;
var error_msg_box = null;
jQuery(window).load(function () {
    if (!jQuery.browser.msie) {
        jQuery('.slides li').each(function () {

            var imgs = jQuery(this).find('img');
            if (imgs.length > 0 && imgs.get(0).width === 0) {
                jQuery(this).html('Sorry, requested content is unavailable');
            }
        });
    }
    jQuery('#home-gallery-wrapper').elastislide({
        margin: 18,
        minItems: 3,
        imageW: 194
    });
});

function prime() {

    /*UI Shortcodes */
    jQuery("#tabs, #categoryTabs, .shortTabs").tabs();
    jQuery(".accordion").accordion();
    jQuery(".toogles").click(function () {
        jQuery(this).find("h3").toggleClass("current")
        jQuery(this).find(".content").slideToggle()
    });




    // tabs -> tags 
    var MAX_LEFT = 0,
        MAX_TOP = 0;
    var MIN_TIME = 600;
    var MAX_TIME = 1000;
    var maxInCenter = false;
    var usedCoords = [];
    var OVERLAP = 0.1;
    var maxCount = 0;
    jQuery('#categoryTabs a[href=#news_tags]').click(function flyBubbles() {
        MAX_LEFT = jQuery('#news_style1_body .tab_tags').eq(0).width();
        MAX_TOP = Math.floor(MAX_LEFT / 2);

        jQuery('#news_style1_body .tab_tags div').show('fade').each(function () {
            time = Math.max(MIN_TIME, Math.round(Math.random() * MAX_TIME));
            w = jQuery(this).width();
            a = jQuery(this).find('a').eq(0);
            aw = a.width();
            ah = a.height();
            acount = parseInt(a.attr('title'));
            a.css({
                'left': Math.round((w - aw) / 2) + 'px',
                'top': Math.round((w - ah) / 2) + 'px',
                'height': a.width(),
                'width': a.width(),
                'line-height': a.width() + 'px'
            });
            var coords = getCoords(Math.max(w, aw), acount);
            jQuery(this).animate({
                left: coords.x,
                top: coords.y
            }, time);

        });

    });

    function getCoords(w, acount) {
        if (!maxInCenter && acount == maxCount) {
            maxInCenter = true;
            x = Math.round((MAX_LEFT - w) / 2);
            y = Math.round((MAX_TOP - w) / 2);
        } else {
            for (var i = 0; i < 100; i++) {
                x = Math.round(Math.random() * (MAX_LEFT - w));
                y = Math.round(Math.random() * (MAX_TOP - w));
                var good = true;
                for (j = 0; j < usedCoords.length; j++) {
                    if (((usedCoords[j].x > x && (usedCoords[j].x - x) < w * (1 - OVERLAP)) || (usedCoords[j].x < x && (x - usedCoords[j].x) < usedCoords[j].w * (1 - OVERLAP))) && (
                        (usedCoords[j].y > y && (usedCoords[j].y - y) < w * (1 - OVERLAP)) || (usedCoords[j].y < y && (y - usedCoords[j].y) < usedCoords[j].w * (1 - OVERLAP)))) {
                        good = false;
                        break;
                    }
                }
                if (good) break;
            }
        }
        rez = {
            x: x,
            y: y,
            w: w
        };
        usedCoords.push(rez);
        return rez;
    }



    "use strict";
    /*topClock*/
    jQuery('#jclock1').jclock({
        format: '%a %B %d, %Y %I:%M:%S %p' // 12-hour
    });
    /*mainMenu & mobile*/
    jQuery('.mainHeaderMenu').superfish({
        autoArrows: false,
        speed: 'fast',
        speedOut: 'fast',
        animation: {
            height: 'show'
        },
        animationOut: {
            opacity: 'hide'
        },
        useClick: false,
        delay: 100,
        disableHI: true
    });

    jQuery('.mobileMenuSelect').click(function (e) {
        var $mobileMenu = jQuery('.mobileHeaderMenuDrop');

        if ($mobileMenu.css('display') != 'block') {
            $mobileMenu.slideDown();

            var firstClick = true;
            jQuery(document).bind('click.myEvent', function (e) {
                if (!firstClick && jQuery(e.target).closest('.mobileHeaderMenuDrop').length == 0) {
                    $mobileMenu.slideUp();
                    jQuery(document).unbind('click.myEvent');
                }
                firstClick = false;
            });
        }

        e.preventDefault();
    });
    // top menu left
    jQuery('.top-left-menu').superfish({
        autoArrows: false,
        speed: 'fast',
        speedOut: 'fast',
        animation: {
            height: 'show'
        },
        animationOut: {
            height: 'hide'
        },
        useClick: false,
        disableHI: true
    });

    /* go to Top */
    jQuery(window).scroll(function () {
        if (jQuery(this).scrollTop() >= 110) {
            jQuery('#toTop').show();
        } else {
            jQuery('#toTop').hide();
        }
    });
    if (jQuery('.single article .post_thumb img').attr('width') <= 500) {
        jQuery('.single article .pic').parent().addClass('img-floated');
    }
    jQuery('#toTop').click(function (e) {

        jQuery('body,html').animate({
            scrollTop: 0
        }, 800);
        e.preventDefault();
    });


    /*Video Carousel*/
    jQuery("#video_carousel .jcarousel-list li a").click(function () {
        var v_url = jQuery(this).attr("href");
        var v_title = jQuery(this).attr("title");
        var v_thumb = jQuery(this).attr("data-href");
        var p_url = jQuery(this).attr("data-content");
        jQuery("#carousel_target .img-link").attr("href", v_url).attr("href", v_url).find("img").attr("src", v_thumb);
        jQuery("#carousel_target .post_name").attr("href", p_url).text(v_title);
        return false;
    })
    jQuery("#video_carousel").jcarousel({
        vertical: true,
        buttonNextHTML: "&lt;div&gt;&lt;span&gt;&lt;/span&gt;&lt;/div&gt;",
        buttonPrevHTML: "&lt;div&gt;&lt;span&gt;&lt;/span&gt;&lt;/div&gt;"
    });

    /* Disable select text on dbl click */
    jQuery('.section2 .newsletter .newsletter-title,.jcarousel-prev,.jcarousel-next,.login-popup-link,.registration-popup-link').mousedown(function (e) {

        e.preventDefault();
        return false;
    });

    jQuery('.section2 .newsletter .newsletter-title,.jcarousel-prev,.jcarousel-next,.login-popup-link,.registration-popup-link').select(function (e) {

        e.preventDefault();
        return false;
    });
    /* /Disable select text on dbl click */
    jQuery("a.prettyPhoto").prettyPhoto({
        social_tools: ''
    }) *
    //jQuery('#site-main-menu').mobileMenu();
    jQuery('body #overlay').click(function (e) {

        jQuery('body').removeClass('overlayed');
        jQuery(this).fadeOut(100);
        jQuery('.login-popup').fadeOut();
        jQuery('#registration').fadeOut();
        e.preventDefault();
        return false;
    });
    jQuery('.section2 .newsletter .newsletter-title').click(function () {
        jQuery(this).parent().find('.newsletter-popup:hidden').fadeToggle(100).find('input[type="text"]').focus();
    });
    jQuery('.newsletter-popup').focusout(function () {
        jQuery(this).fadeOut();
    });


    jQuery('#flexslider-news').flexslider({
        animation: "slide",
        pausePlay: true,
        slideshow: true,
        slideshowSpeed: 10000,
        controlNav: false
    });
    jQuery('article .gallery').flexslider({
        animation: "fade",
        speed: "slow",
        controlNav: true,
        directionNav: true
    });
    jQuery('#news_style2_header').flexslider({
        animation: "fade",
        slideshow: true,
        slideshowSpeed: 10000,
        controlNav: true
    });



    /*home slider*/
    jQuery('#home_slider1').flexslider({
        animation: 'fade',
        animationLoop: true,
        slideshow: true,
        slideshowSpeed: 7000,
        animationSpeed: 600,
        controlNav: true,
        directionNav: true,
        pauseOnAction: true,
        pauseOnHover: false,
        useCSS: false,
        manualControls: '#paging_controls li',
        start: function () {},
        before: function (slider) {
            jQuery('#home_slider .caption').animate({
                'marginLeft': '-500',
                'opacity': '1'
            }, 700);
        },
        after: function () {
            jQuery('#home_slider .caption').animate({
                'marginLeft': '0',
                'opacity': '1'
            }, 400);
        },
        end: function () {},
        added: function () {},
        removed: function () {}
    });

    jQuery(function () {
        jQuery('#home_slider2').flexslider({
            animation: 'fade',
            animationLoop: true,
            slideshow: true,
            slideshowSpeed: 7000,
            animationSpeed: 600,
            controlNav: true,
            directionNav: true,
            pauseOnAction: true,
            pauseOnHover: false,
            useCSS: false,
            manualControls: '#thumb_controls li',
            start: function () {},
            end: function () {},
            added: function () {},
            removed: function () {}
        });
    });

    jQuery(function () {
        jQuery('#home_slider3').flexslider({
            animation: 'fade',
            animationLoop: true,
            slideshow: true,
            slideshowSpeed: 7000,
            animationSpeed: 600,
            controlNav: true,
            directionNav: true,
            pauseOnAction: true,
            pauseOnHover: false,
            useCSS: false,
            manualControls: '',
            start: function () {},
            end: function () {},
            added: function () {},
            removed: function () {}
        });
    });
    /*Recent posts Slider*/
    var curSlide = 1;
    jQuery(document).ready(function () {
        jQuery(".widget_recent_blogposts .widget_body").flexslider({
            animation: "fade",
            slideshow: false,
            controlNav: false,
            directionNav: true,
            prevText: "",
            nextText: "",
            smoothHeight: true,
            controlsContainer: ".flex-container",
            after: function (slider) {
                jQuery(".widget_recent_blogposts .cur_page").eq(0).html(slider.currentSlide + 1);
            }
        });
    });

    jQuery('#blog_posts .slider_container').flexslider({
        animation: "fade",
        controlNav: false
    });

    // Recent posts
    jQuery("#recent_photos_thumbs").flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        itemWidth: 44,
        prevText: "&lt;span&gt;&lt;/span&gt;",
        nextText: "&lt;span&gt;&lt;/span&gt;",
        itemMargin: 2,
        asNavFor: "#recent_photos_slider"
    });
    jQuery("#recent_photos_slider").flexslider({
        animation: "slide",
        controlNav: false,
        directionNav: false,
        animationLoop: false,
        slideshow: false,
        sync: "#recent_photos_thumbs"
    });


    jQuery('div.sc_infobox_closeable').click(function () {

        jQuery(this).fadeOut();
    });
    jQuery('.sc_tooltip_parent').hover(function () {

            var obj = jQuery(this);
            obj.find('.sc_tooltip').stop().animate({
                'marginTop': '5'
            }, 100).show();
        },
        function () {

            var obj = jQuery(this);
            obj.find('.sc_tooltip').stop().animate({
                'marginTop': '0'
            }, 100).hide();
        });

    // ----------------------- Contact form submit ----------------
    jQuery('.sc_contact_form .enter').click(function (e) {
        userSubmitForm();
        e.preventDefault();
        return false;
    });
    //audio
    jQuery('video,audio').mediaelementplayer( /* Options */ );

    //google maps
    if (jQuery("div").is("#sc_googlemap")) {
        googlemap_init(jQuery("#sc_googlemap").get(0), "25 Broadway, NY");
    };

    function userSubmitForm() {
        var error = formValidate(jQuery(".sc_contact_form form"), {
            error_message_show: true,
            error_message_time: 5000,
            error_message_class: "sc_infobox sc_infobox_style_error",
            error_fields_class: "error_fields_class",
            exit_after_first_error: false,
            rules: [{
                field: "username",
                min_length: {
                    value: 1,
                    message: "The name field name can't be empty"
                },
                max_length: {
                    value: 60,
                    message: "Too long name field"
                }
            }, {
                field: "email",
                min_length: {
                    value: 7,
                    message: "Too short (or empty) email address"
                },
                max_length: {
                    value: 60,
                    message: "Too long email address"
                },
                mask: {
                    value: "^([a-z0-9_\-]+\.)*[a-z0-9_\-]+@[a-z0-9_\-]+(\.[a-z0-9_\-]+)*\.[a-z]{2,6}$",
                    message: "Not valid email address"
                }
            }, {
                field: "message",
                min_length: {
                    value: 10,
                    message: "The message text can't be empty"
                },
                max_length: {
                    value: 200,
                    message: "Too long message"
                }
            }]
        });
        if (!error) {
            var user_name = jQuery(".sc_contact_form #sc_contact_form_username").val();
            var user_email = jQuery(".sc_contact_form #sc_contact_form_email").val();
            var user_site = jQuery(".sc_contact_form #sc_contact_form_site").val();
            var user_msg = jQuery(".sc_contact_form #sc_contact_form_message").val();
            var data = {
                action: "submit_contact_form",
                nonce: "33247b083f",
                user_name: user_name,
                user_email: user_email,
                user_site: user_site,
                user_msg: user_msg
            };
            jQuery.post("include/sendmail.php", data, userSubmitFormResponse, "text"); 
        }
    }

    function userSubmitFormResponse(response) {
        var rez = JSON.parse(response);
		console.log(rez); 
        jQuery(".sc_contact_form .result")
            .toggleClass("sc_infobox_style_error", false)
            .toggleClass("sc_infobox_style_success", false);
        if (rez.error == 0) {
            jQuery(".sc_contact_form .result").addClass("sc_infobox_style_success").html("Your message sended!");
            setTimeout("jQuery('.sc_contact_form .result').fadeOut(); jQuery('.sc_contact_form form').get(0).reset();", 3000);
        } else {
            jQuery(".sc_contact_form .result").addClass("sc_infobox_style_error").html("Transmit failed! " + rez.message);
        }
        jQuery(".sc_contact_form .result").fadeIn();
    }



    // ----------------------- Comment form submit ----------------
    jQuery("form#commentform").submit(function (e) {
        var error = formValidate(jQuery(this), {
            error_message_text: 'Global error text', // Global error message text (if don't write in checked field)
            error_message_show: true, // Display or not error message
            error_message_time: 5000, // Time to display error message
            error_message_class: 'sc_infobox sc_infobox_style_error', // Class, appended to error message block
            error_fields_class: 'error_fields_class', // Class, appended to error fields
            exit_after_first_error: false, // Cancel validation and exit after first error
            rules: [{
                field: 'author',
                min_length: {
                    value: 1,
                    message: 'The author name can\'t be empty'
                },
                max_length: {
                    value: 60,
                    message: 'Too long author name'
                }
            }, {
                field: 'email',
                min_length: {
                    value: 7,
                    message: 'Too short (or empty) email address'
                },
                max_length: {
                    value: 60,
                    message: 'Too long email address'
                },
                mask: {
                    value: '^([a-z0-9_\\-]+\\.)*[a-z0-9_\\-]+@[a-z0-9_\\-]+(\\.[a-z0-9_\\-]+)*\\.[a-z]{2,6}$',
                    message: 'Not valid email address'
                }
            }, {
                field: 'comment',
                min_length: {
                    value: 1,
                    message: 'The comment text can\'t be empty'
                },
                max_length: {
                    value: 200,
                    message: 'Too long comment'
                }
            }]
        });
        if (error) {
            e.preventDefault();
        }
        return !error;
    });

    // ---------------------------- Registration / Autorization ------------------------
    jQuery('.login-popup-link').click(function (e) {

        jQuery('.login-popup').fadeIn();
        jQuery('#overlay').fadeIn(100);
        jQuery('body').addClass('overlayed');
        jQuery('.login-popup #log').get(0).focus();
        e.preventDefault();
        return false;
    });
    jQuery('.login-popup .close').click(function (e) {

        jQuery('body').removeClass('overlayed');
        jQuery('#overlay').fadeOut(100);
        jQuery('.login-popup').fadeOut();
        e.preventDefault();
        return false;
    });
    jQuery('.login-popup form').keypress(function (e) {

        if (e.keyCode === 27) {
            jQuery('.login-popup .close').trigger('click');
            e.preventDefault();
            return false;
        } else if (e.keyCode === 13) {
            jQuery('.login-popup .enter').trigger('click');
            e.preventDefault();
            return false;
        }
    });
    jQuery('.login-popup .enter').click(function (e) {

        userLogin();
        e.preventDefault();
        return false;
    });
    jQuery('.logout-popup-link').click(function (e) {

        userLogout();
        e.preventDefault();
        return false;
    });
    jQuery('.registration-popup-link').click(function (e) {

        jQuery('.registration-popup').fadeIn();
        jQuery('#overlay').fadeIn(100);
        jQuery('body').addClass('overlayed');
        jQuery('.registration-popup #registration_form_username').get(0).focus();
        e.preventDefault();
        return false;
    });
    jQuery('.registration-popup .close').click(function (e) {

        jQuery('body').removeClass('overlayed');
        jQuery('#overlay').fadeOut(100);
        jQuery('.registration-popup').fadeOut();
        e.preventDefault();
        return false;
    });
    jQuery('.registration-popup form').keypress(function (e) {

        if (e.keyCode === 27) {
            jQuery('.registration-popup .close').trigger('click');
            e.preventDefault();
            return false;
        } else if (e.keyCode === 13) {
            jQuery('.registration-popup .enter').trigger('click');
            e.preventDefault();
            return false;
        }
    });
    jQuery('.registration-popup .enter').click(function (e) {

        userRegistration();
        e.preventDefault();
        return false;
    });
    jQuery('.register-redirect').click(function (e) {

        jQuery('.login-popup .close').trigger('click');
        jQuery('.registration-popup-link').trigger('click');
        e.preventDefault();
        return false;
    });
    jQuery('.autorization-redirect').click(function (e) {


        jQuery('.registration-popup .close').trigger('click');
        jQuery('.login-popup-link').trigger('click');
        e.preventDefault();
        return false;
    });
	
	// Check for validity login Form
	function userLogin(){
			var error = formValidate(jQuery(".login-popup form"), {
				error_message_show: true,
				error_message_time: 3000,
				error_message_class: "sc_infobox sc_infobox_style_error",
				error_fields_class: "error_fields_class",
				exit_after_first_error: true,
				rules: [
					{
						field: "log",
						min_length: { value: 1,	 message: "The Login field can\'t be empty" },
						max_length: { value: 60, message: "Too long login field"}
					},
					{
						field: "pwd",
						min_length: { value: 5,  message: "The password can\'t be empty and shorter then 5 characters" },
						max_length: { value: 20, message: "Too long password"}
					}
				]
			});
			if (!error) {
				document.forms['login_form'].submit();
			}
		}
		
		// Check for validity Register Form
		function userRegistration(){
			var error = formValidate(jQuery(".registration-popup form"), {
				error_message_show: true,
				error_message_time: 3000,
				error_message_class: "sc_infobox sc_infobox_style_error",
				error_fields_class: "error_fields_class",
				exit_after_first_error: true,
				rules: [
					{
						field: "registration_form_username",
						min_length: { value: 1,	 message: "The name field can\'t be empty" },
						max_length: { value: 60, message: "Too long name field"}
					},
					{
						field: "registration_form_email",
						min_length: { value: 7,	 message: "Too short (or empty) email address" },
						max_length: { value: 60, message: "Too long email address"},
						mask: { value: "^([a-z0-9_\\-]+\\.)*[a-z0-9_\\-]+@[a-z0-9_\\-]+(\\.[a-z0-9_\\-]+)*\\.[a-z]{2,6}$", message: "Not valid email address"}
					},
					{
						field: "registration_form_pwd1",
						min_length: { value: 5,  message: "The password can\'t be empty and shorter then 5 characters" },
						max_length: { value: 20, message: "Too long password"}
					},
					{
						field: "registration_form_pwd2",
						equal_to: { value: 'registration_form_pwd1',  message: "The passwords in both fields are not equal" }
					}
				]
			});
			if (!error) {
				document.forms['registration_form'].submit();
			}
		}
		
		function userRegistrationResponse(response) {
			var rez = JSON.parse(response);
			jQuery('.registration-popup .result')
				.toggleClass('sc_infobox_style_error', false)
				.toggleClass('sc_infobox_style_success', false);
			if (rez.code == 0) {
				jQuery('.registration-popup .result').addClass('sc_infobox_style_success').html('Registration success! Please log in!');
				setTimeout("jQuery('.registration-popup .close').trigger('click'); jQuery('.login-popup-link').trigger('click');", 2000);
			} else {
				jQuery('.registration-popup .result').addClass('sc_infobox_style_error').html('Registration failed! ' + rez.message);
			}
			jQuery('.registration-popup .result').fadeIn();
			setTimeout("jQuery('.registration-popup .result').fadeOut()", 5000);
		}
    // ----------------- Gallery slider -----------------
    jQuery('.galleries .thumbs').flexslider({
        animation: "slide",
        slideshow: false,
        controlNav: false,
        directionNav: false,
        itemWidth: 69,
        itemMargin: 3,
        asNavFor: '.galleries .post_slider'
    });
    jQuery('article.reviews .slider_container').flexslider({
        animation: 'fade',
        controlNav: false,
        directionNav: true
    });
    jQuery('.galleries .post_slider').flexslider({
        animation: "slide",
        slideshow: true,
        controlNav: false,
        directionNav: true,
        slideshowSpeed: 10000,
        sync: ".galleries .thumbs",
        start: function (slider) {

            var scroller = jQuery('.galleries .progress span').eq(0);
            scroller.css({
                width: Math.round(scroller.parent().width() / slider.count) + 'px'
            });
            jQuery(".galleries .progress span").draggable({
                axis: 'x',
                containment: 'parent',
                drag: function () {
                    var curSlide = Math.round(parseInt(jQuery(this).css('left'), 10) / parseInt(jQuery(this).css('width'), 10));
                    if (slider.currentSlide !== curSlide) {
                        sliderDragScroll = true;
                        slider.flexAnimate(curSlide, true, true, false, false);
                    }
                }
            });
        },
        before: function (slider) {

            if (!sliderDragScroll) {
                var scroller = jQuery('.galleries .progress span').eq(0);
                scroller.animate({
                    left: slider.animatingTo === slider.count - 1 ? scroller.parent().width() - scroller.width() : Math.round(scroller.width() * slider.animatingTo)
                });
            } else {
                sliderDragScroll = false;
            }
        }
    });


    function formValidate(form, opt) {
        "use strict";
        var error_msg = '';
        form.find(":input").each(function () {
            if (error_msg !== '' && opt.exit_after_first_error) {
                return;
            }
            for (var i = 0; i < opt.rules.length; i++) {
                if (jQuery(this).attr("name") === opt.rules[i].field) {
                    var val = jQuery(this).val();
                    var error = false;
                    if (typeof (opt.rules[i].min_length) === 'object') {
                        if (opt.rules[i].min_length.value > 0 && val.length < opt.rules[i].min_length.value) {
                            if (error_msg === '') {
                                jQuery(this).get(0).focus();
                            }
                            error_msg += '<p class="error_item">' + (typeof (opt.rules[i].min_length.message) !== 'undefined' ? opt.rules[i].min_length.message : opt.error_message_text) + '</p>';
                            error = true;
                        }
                    }
                    if ((!error || !opt.exit_after_first_error) && typeof (opt.rules[i].max_length) === 'object') {
                        if (opt.rules[i].max_length.value > 0 && val.length > opt.rules[i].max_length.value) {
                            if (error_msg === '') {
                                jQuery(this).get(0).focus();
                            }
                            error_msg += '<p class="error_item">' + (typeof (opt.rules[i].max_length.message) !== 'undefined' ? opt.rules[i].max_length.message : opt.error_message_text) + '</p>';
                            error = true;
                        }
                    }
                    if ((!error || !opt.exit_after_first_error) && typeof (opt.rules[i].mask) === 'object') {
                        if (opt.rules[i].mask.value !== '') {
                            var regexp = new RegExp(opt.rules[i].mask.value);
                            if (!regexp.test(val)) {
                                if (error_msg === '') {
                                    jQuery(this).get(0).focus();
                                }
                                error_msg += '<p class="error_item">' + (typeof (opt.rules[i].mask.message) !== 'undefined' ? opt.rules[i].mask.message : opt.error_message_text) + '</p>';
                                error = true;
                            }
                        }
                    }
                    if ((!error || !opt.exit_after_first_error) && typeof (opt.rules[i].equal_to) === 'object') {
                        if (opt.rules[i].equal_to.value !== '' && val !== jQuery(jQuery(this).get(0).form[opt.rules[i].equal_to.value]).val()) {
                            if (error_msg === '') {
                                jQuery(this).get(0).focus();
                            }
                            error_msg += '<p class="error_item">' + (typeof (opt.rules[i].equal_to.message) !== 'undefined' ? opt.rules[i].equal_to.message : opt.error_message_text) + '</p>';
                            error = true;
                        }
                    }
                    if (opt.error_fields_class !== '') {
                        jQuery(this).toggleClass(opt.error_fields_class, error);
                    }
                }
            }
        });
        if (error_msg !== '' && opt.error_message_show) {
            error_msg_box = form.find(".result");
            if (error_msg_box.length === 0) {
                form.append('<div class="result"></div>');
                error_msg_box = form.find(".result");
            }
            if (opt.error_message_class) {
                error_msg_box.toggleClass(opt.error_message_class, true);
            }
            error_msg_box.html(error_msg).fadeIn();
            setTimeout(function () {
                error_msg_box.fadeOut();
            }, opt.error_message_time);
        }
        return error_msg !== '';
    };

    //Social sideBar
    //Twitter 
	/*
    var url = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=envato&amp;count=1&amp;callback=?";
    jQuery.getJSON(url, function (json) {
        jQuery('.service.twitter_info .num').html(json[0].user.followers_count);
    });
	*/
    //FaceBook
//    var url = "http://graph.facebook.com/envato";
//    jQuery.getJSON(url, function (json) {
//        jQuery('.service.facebook_info .num').html(json.likes);
//    });
//
//	//include Custom.JS
//	 jQuery('head').append('<link rel="stylesheet" href="style/custom.css" type="text/css" media="all">');
//	 //jQuery('head').append('<script type="text/javascript" src="js/custom.js"></script>');
//	 jQuery('head').append('<script type="text/javascript" src="js/jquery.cookie.js"></script>');

};