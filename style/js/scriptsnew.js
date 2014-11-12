
/*-----------------------------------------------------------------------------------*/
/*	ANCHOR SCROLL
/*-----------------------------------------------------------------------------------*/
/**
* jQuery.LocalScroll - Animated scrolling navigation, using anchors.
* Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
* Dual licensed under MIT and GPL.
* Date: 3/11/2009
* @author Ariel Flesler
* @version 1.2.7
**/
(function($){var l=location.href.replace(/#.*/,'');var g=$.localScroll=function(a){$('body').localScroll(a)};g.defaults={duration:1e3,axis:'y',event:'click',stop:true,target:window,reset:true};g.hash=function(a){if(location.hash){a=$.extend({},g.defaults,a);a.hash=false;if(a.reset){var e=a.duration;delete a.duration;$(a.target).scrollTo(0,a);a.duration=e}i(0,location,a)}};$.fn.localScroll=function(b){b=$.extend({},g.defaults,b);return b.lazy?this.bind(b.event,function(a){var e=$([a.target,a.target.parentNode]).filter(d)[0];if(e)i(a,e,b)}):this.find('a,area').filter(d).bind(b.event,function(a){i(a,this,b)}).end().end();function d(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,'')==l&&(!b.filter||$(this).is(b.filter))}};function i(a,e,b){var d=e.hash.slice(1),f=document.getElementById(d)||document.getElementsByName(d)[0];if(!f)return;if(a)a.preventDefault();var h=$(b.target);if(b.lock&&h.is(':animated')||b.onBefore&&b.onBefore.call(b,a,f,h)===false)return;if(b.stop)h.stop(true);if(b.hash){var j=f.id==d?'id':'name',k=$('<a> </a>').attr(j,d).css({position:'absolute',top:$(window).scrollTop(),left:$(window).scrollLeft()});f[j]='';$('body').prepend(k);location=e.hash;k.remove();f[j]=d}h.scrollTo(f,b).trigger('notify.serialScroll',[f])}})(jQuery);
/**
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.5 BETA
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);
$(document).ready(function(){ 
    menuHandler();
    $('#tiny, .scroll, #responsive-menu').localScroll({
	    offset: {top:-20, left:0}
    });
  });  
/*-----------------------------------------------------------------------------------*/
/*	PORTFOLIO SHOWCASE 
/*-----------------------------------------------------------------------------------*/
/**************************************************************************
 * jQuery Plugin for Showcase
 * @version: 1.0
 * @requires jQuery v1.8 or later
 * @author ThunderBudies http://themeforest.net/user/Thunderbuddies/portfolio
 **************************************************************************/
jQuery(document).ready(function() {
	 var $container = $('.portfolio-wrapper.showcase .items');

	 var speed = 600;
	 var header_offset = 97;
	 var scrollspeed = 600;
	 var force_scrolltotop = false;


	 ///////////////////////////
	// GET THE URL PARAMETER //
	///////////////////////////
	function getUrlVars(hashdivider)
			{
				
				try { var vars = [], hash;
					var hashes = window.location.href.slice(window.location.href.indexOf(hashdivider) + 1).split('_');
					for(var i = 0; i < hashes.length; i++)
					{
						hashes[i] = hashes[i].replace('%3D',"=");
						hash = hashes[i].split('=');
						vars.push(hash[0]);
						vars[hash[0]] = hash[1];
					}
					return vars;
				} catch(e) { }
				
			}


	////////////////////////
	// GET THE BASIC URL  //
	///////////////////////
    function getAbsolutePath() {
		    var loc = window.location;
		    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
		    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
    }

    //////////////////////////
	// SET THE URL PARAMETER //
	///////////////////////////
    function updateURLParameter(paramVal){
    		var yScroll=document.body.scrollTop;


	    	var baseurl = window.location.pathname.split("#")[0];
	    	var url = baseurl.split("#")[0];
	    	if (paramVal==undefined) paramVal="";

	    	if (paramVal.length==0)
		    	par="#"
	   		else
 		  		par='#'+paramVal;

		    //window.location.replace(url+par);

		    if(history.pushState) {
			    history.pushState(null, null, par);
			}
			else {
			    location.hash = par;
			}

	}


	 var deeplink = getUrlVars("#");
	 var ie = !$.support.opacity;
	 var ie9 = (document.documentMode == 9);

	 $container.find('.item').click(function() {

		 	// The CLicked Thumb
		 	var thumb = jQuery(this);



		 	// IF THE CLICKED THUMB IS ALREADY SELECTED, WE NEED TO CLOSE THE WINDOWS SIMPLE
		 	if (thumb.hasClass("active")) {
			 	thumb.removeClass("active");

		 		closeDetailView($container);

			// OTHER WAY WE CLOSE THE WINDOW (IF NECESsARY, OPEN AGAIN, AND DESELET / SELECT THE RIGHT THUMBS
		 	}  else {
		 		updateURLParameter("entry-"+thumb.index());
			 	thumb.addClass("latest-active");
			 	removeActiveThumbs($container);

			 	thumb.removeClass("latest-active");
			 	thumb.addClass("active");

			 	// CHECK IF WE ALREADY HAVE THE DETAIL WINDOW OPEN
			 	 var pdv = jQuery('body').find('.portfolio-detail-view');
				 
			 	if (pdv.length) {
			 		var fade=false;
			 		clearInterval(pdv.data('interval'));
			 		pdv.addClass("portfolio-detail-view-remove").removeClass('portfolio-detail-view');
				 	pdv.animate({'height':'0px','opacity':'0'},{duration:speed, complete:function() { jQuery(this).remove();}});

				 	var delay=speed+50;
				 	//if (thumb.position().top<pdv.position().top) {
			 		// 	delay=0;
				 	//} else {
				 	   moveThumbs($container,pdv.data('itemstomove'),0);
			 		   setTimeout(function() {$container.isotope( 'reLayout');},speed+50);
			 		// }

				 	setTimeout(function() {
				 			jQuery('body,html').animate({
                                scrollTop: thumb.offset().top-(header_offset+10)
                            }, {
                                duration: scrollspeed,
                                queue: false
                            });
                             if (force_scrolltotop) {

	                             openDetailView($container,thumb,fade);
			                    } else {
				                    setTimeout(function () {
									 	openDetailView($container,thumb,fade);
				                    },scrollspeed)
			                    }


				 	},delay)

			 	} else {

				 	jQuery('body,html').animate({
                                scrollTop: thumb.offset().top-(header_offset+10)
                            }, {
                                duration: scrollspeed,
                                queue: false
                            });
                    if (force_scrolltotop) {
						 	openDetailView($container,thumb);
                    } else {
	                    setTimeout(function () {
						 	openDetailView($container,thumb);
	                    },scrollspeed)
                    }




			 	}
			}
			return false;
	 }) // END OF CLICK ON PORTFOLIO ITEM

	 // DEEPLINK START IF NECESSARY
		 if (deeplink[0].split('entry-').length>1) {
		 	var thmb = parseInt(deeplink[0].split('entry-')[1],0)+1;
			 $container.find('.item:nth-child('+thmb+')').click();
			 $container.find('.item:nth-child('+thmb+')').addClass("active").children('a').children('div').fadeIn(300);;
			 
		}



	 // CLICK ON FILTER SHOULD CLOSE THE DETAIL PAGE ALSO
	 jQuery('.portfolio-wrapper.showcase .filter').find('li a').each(function() {
		 jQuery(this).click(function() {
			
			closeDetailView($container)
		 })
	 })

	 // ON RESIZE REMOVE THE DETAIL VIEW CONTAINER
	 
	 if (!ie) {
		 jQuery(window).bind('resize',function()  {		
			if (!isiPhone()) {
				closeDetailView($container);
				centerpdv($container);
				
			}
		 });
	} else {
		
		$container.isotope( 'option', {resizable:false});
	}

	 //  CHECK IPHONE
	// Return boolean TRUE/FALSE
		function isiPhone(){
			return (
				(navigator.platform.indexOf("iPhone") != -1) ||
				(navigator.platform.indexOf("iPod") != -1) ||
    			(navigator.platform.indexOf("iPad") != -1)
			);
		}
		
		
	 // REMOVE ACTIVE THUMB EFFECTS
	 function removeActiveThumbs($container) {
		 	$container.find('.item').each(function() {
					jQuery(this).removeClass('active');
					if (!jQuery(this).hasClass('latest-active')) jQuery(this).children('a').children('div').fadeOut(200);

			 	});
	 }

	 // CLOSE DETAILVIEW
	 function closeDetailView($container) {
		
		 var pdv = jQuery('body').find('.portfolio-detail-view');
	 	 setTimeout(function() {
			 if (pdv.length) {
			 		removeActiveThumbs($container);
			 		clearInterval(pdv.data('interval'));
				 	pdv.animate({'height':'0px','opacity':'0'},{duration:speed, complete:function() { jQuery(this).remove();}});
				 	moveThumbs($container,pdv.data('itemstomove'),0);
			}
			setTimeout(function() {
					$container.isotope( 'reLayout',function() { 
						$container.data('height',$container.height());								
						setTimeout(function() {
							
							$container.data('height',$container.height());
						},speed);  //500 old value
					});
			},speed+50);
			if (!ie && !ie9) updateURLParameter("");
			 	
		},150)
	 }

	 function centerpdv($container) {
		try {
			var pdv = jQuery('body').find('.portfolio-detail-view');
			var pleft=jQuery('body').width()/2 - pdv.width()/2;
			
			pdv.css({'left':pleft+"px"});
			
		} catch(e) { }
	 }
	 
	 
	 // OPEN THE DETAILVEW AND CATCH THE THUMBS BEHIND THE CURRENT THUMB
	 function openDetailView($container,thumb,fadeit) {

		 	// The Top Position of the Current Item.
		 	currentTop= thumb.position().top;
		 	thumbOffsetTop= thumb.offset().top;

			 // ALL ITEM WE NEED TO MOVE SOMEWHERE
		 	var itemstomove =[];

		 	$container.find('.item').each(function() {
			 	var curitem = jQuery(this);
			 	if (curitem.position().top>currentTop) itemstomove.push(curitem);

		 	})

		 	// Reset CurrentPositions

		 	jQuery.each(itemstomove,function() {
			 	var thumb = jQuery(this);
			 	thumb.data('oldPos',thumb.position().top);

		 	})

		 	// We Save the Height Of the current Container here.
		 	if ($container.data('height')!=undefined) {
			 	if ($container.height()<$container.data('height')) 	$container.data('height',$container.height());
		 	} else {
			 	$container.data('height',$container.height());
			 }

		 	// ADD THE NEW CONTENT IN THE DETAIL VIEW WINDOW.
		 	jQuery('body').append(
				'<div class="portfolio-detail-view">'+
		 		'<div class="inner">'+
		 		'<div class="portfolio-detail-content-container">'+
		 		thumb.data('detailcontent')+
		 		'</div>'+
		 		'</div>'+
		 		'<div class="closebutton"><i class="icon-cancel-1"></i></div>'+
		 		'</div>');
		
		 	// CATCH THE DETAIL VIEW AND CONTENT CONTAINER
		 	var pdv = jQuery('body').find('.portfolio-detail-view');
		 	var closeb = pdv.find('.closebutton');
		 	var pdcc = pdv.find('.portfolio-detail-content-container');
		 	var pdvpad = parseInt(pdcc.css('paddingBottom'),0) + parseInt(pdcc.css('paddingTop'),0);
			
		 	var offset = pdcc.height()+pdvpad + parseInt(pdv.css('marginBottom'),0);

	
		 	closeb.click(function() {
				
		 			closeDetailView($container);
		 	})

		 	// ANIMATE THE OPENING OF THE CONTENT CONTAINER

			pdv.animate({'height':(pdcc.outerHeight(true)+pdvpad)+"px"},{duration:speed,queue:false});


		 	// SAVE THE ITEMS TO MOVE IN THE PDV
		 	pdv.data('itemstomove',itemstomove);

			
			
		 	//PUT THE CONTAINER IN THE RIGHT POSITION
		 	pdv.css({'top':(thumbOffsetTop+thumb.height()+parseInt(thumb.css('marginBottom'),0))+"px"});
			
			centerpdv($container);
			
			// FIRE THE CALLBACK HERE
			try{
				var callback = new Function(thumb.data('callback'));
				
				callback();
			} catch(e) {}
							
			//INITIALISE THE CAROUSEL HERE			
			pdv.find('.carousel').each(function() {

				jQuery(this).carousel({
					interval: 2000
				})
			});

			

			jQuery.each(itemstomove,function() {
				var thumb = jQuery(this);
				if (ie ||ie9) 
					thumb.data('top',parseInt(thumb.position().top,0));
				else
					thumb.data('top',0);
			});
		 	// MOVE THE REST OF THE THUMBNAILS
		 	moveThumbs($container,itemstomove,offset);

		 	pdv.data('interval',setInterval(function() {
			 	var pdv = jQuery('body').find('.portfolio-detail-view');
			 	var closeb = pdv.find('.closebutton');
			 	var pdcc = pdv.find('.portfolio-detail-content-container');
			 	var pdvpad =  parseInt(pdcc.css('paddingBottom'),0) + parseInt(pdcc.css('paddingTop'),0);
			 	var offset = pdcc.height()+pdvpad + parseInt(pdv.css('marginBottom'),0);
			 	moveThumbs($container,itemstomove,offset);
			 	pdv.animate({'height':Math.round(pdcc.height()+pdvpad)+"px"},{duration:speed,queue:false});
				
		 	},100));

	 }

	 // MOVE THE THUMBS
	 function moveThumbs($container,itemstomove,offset) {
		 
			jQuery.each(itemstomove,function() {
			 	var thumb = jQuery(this);
			 	thumb.stop(true);				
			 	thumb.animate({'top':(thumb.data('top')+offset)+"px"},{duration:speed,queue:false});				
		 	})
			
			
			if (ie || ie9) {
				$container.stop(true);
				$container.animate({'height':($container.data('height')+offset)+"px"}, {duration:speed,queue:false});
			} else {				
				$container.css({'height':Math.round($container.data('height')+offset)+"px"});
			}
	 }
});
/*-----------------------------------------------------------------------------------*/
/*	RESPONSIVE NAV
/*-----------------------------------------------------------------------------------*/
$(document).ready(function () {
    selectnav('tiny', {
        label: '--- Click to Navigate --- ',
        indent: '-'
    });
});
/*-----------------------------------------------------------------------------------*/
/*	CALL PORTFOLIO SCRIPTS
/*-----------------------------------------------------------------------------------*/
function callPortfolioScripts() {
    jQuery('.vid').fitVids();
};  
/*-----------------------------------------------------------------------------------*/
/*	SCROLL NAV
/*-----------------------------------------------------------------------------------*/
$(document).ready(function() {
	headerWrapper		= parseInt($('header').height());
	offsetTolerance	= 40;
	
	//Detecting user's scroll
	$(window).scroll(function() {
	
		//Check scroll position
		scrollPosition	= parseInt($(this).scrollTop());
		
		//Move trough each menu and check its position with scroll position then add current class
		$('#tiny a').each(function() {

			thisHref				= $(this).attr('href');
			thisTruePosition	= parseInt($(thisHref).offset().top);
			thisPosition 		= thisTruePosition - headerWrapper - offsetTolerance;
			
			if(scrollPosition >= thisPosition) {
				
				$('.current').removeClass('current');
				$('#tiny a[href='+ thisHref +']').parent('li').addClass('current');
				
			}
		});
		
		
		//If we're at the bottom of the page, move pointer to the last section
		bottomPage	= parseInt($(document).height()) - parseInt($(window).height());
		
		if(scrollPosition == bottomPage || scrollPosition >= bottomPage) {
		
			$('.current').removeClass('current');
			$('#tiny a:last').parent('li').addClass('current');
		}
	});
	
});
/*-----------------------------------------------------------------------------------*/
/*	RESPONSIVE MENU
/*-----------------------------------------------------------------------------------*/
function menuHandler() {
	var defpar = jQuery('#tiny').parents().length;
	jQuery('#tiny li').each(function(i) {
		var li = jQuery(this);
		var depth = li.parents("ul").size();
	});
	jQuery('#tiny li').each(function(i) {
		var main = jQuery(this);
		var newtxt = jQuery("<div>" + main.text() + "</div>").text();
		if (main.find('ul').length > 0) {
			newtxt = main.html().split('</a>')[0];
			newtxt = newtxt.split(">")[1];
			jQuery('#responsive-menu ul').append('<li class="rev-toplevel">' + newtxt + '</li>');
		} else {
			if (main.parents("ul").size() == 1) jQuery('#responsive-menu ul').append('<a href="' + main.find('a').attr('href') + '"><li class="rev-toplevel">' + newtxt + '</li></a>');
		}
		main.find('>ul>li').each(function() {
			var sub = jQuery(this);
			var newtxt = jQuery("<div>" + sub.html() + "</div>").html().split('<ul')[0];
			jQuery('#responsive-menu ul').append('<li class="rev-sublevel">' + newtxt + '</li>');
			sub.find('>ul>li').each(function() {
				var subsub = jQuery(this);
				var newtxt = jQuery("<div>" + subsub.html() + "</div>").html().split('<ul')[0];
				jQuery('#responsive-menu ul').append('<li class="rev-subsublevel">' + newtxt + '</li>');
			});
		});
	});
/*jQuery(document).scroll(function() {
					var pos=Math.abs(jQuery(document).scrollTop());
					var jm=jQuery('#responsive-menu');
					var max=jm.position().top+jm.height();
					if (pos>max-100) pos=max-100;
					jQuery('.resp-closer').css({top:+pos+"px"});
				})*/
	jQuery('.resp-navigator').click(function() {
		setTimeout(function() {
			jQuery('#responsive-menu').addClass('active');
		}, 100);
		jQuery('.responsive_wrapper').addClass('active');
		setTimeout(function() {
			jQuery('.responsive_wrapper').height(jQuery('#responsive-menu').height() + 500)
		}, 600);
	})
	jQuery('#responsive-menu a').each(function() {
		jQuery(this).click(function() {
			jQuery('.resp-closer').click();
		});
	});
	jQuery('.resp-closer').click(function() {
		jQuery('#responsive-menu').removeClass('active');
		setTimeout(function() {
			jQuery('.responsive_wrapper').removeClass('active');
		}, 1000);
	})
}			
/*-----------------------------------------------------------------------------------*/
/*	PARALLAX MOBILE
/*-----------------------------------------------------------------------------------*/
$(document).ready(function() {
if( navigator.userAgent.match(/Android/i) || 
	navigator.userAgent.match(/webOS/i) ||
	navigator.userAgent.match(/iPhone/i) || 
	navigator.userAgent.match(/iPad/i)|| 
	navigator.userAgent.match(/iPod/i) || 
	navigator.userAgent.match(/BlackBerry/i)){
			$('.parallax').addClass('mobile');
}
});
/*-----------------------------------------------------------------------------------*/
/*	ISOTOPE SHOWCASE
/*-----------------------------------------------------------------------------------*/
$(document).ready(function () {
    var $container = $('.portfolio-wrapper.showcase .items');
    $container.imagesLoaded(function () {
        $container.isotope({
            itemSelector: '.item',
            layoutMode: 'fitRows'
        });
    });

    $('.portfolio-wrapper.showcase .filter li a').click(function () {

        $('.portfolio-wrapper.showcase .filter li a').removeClass('active');
        $(this).addClass('active');

        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector
        });

        return false;
    });
});

/*-----------------------------------------------------------------------------------*/
/*	ISOTOPE LIGHTBOX
/*-----------------------------------------------------------------------------------*/
$(document).ready(function () {
    var $con = $('.portfolio-wrapper.lightbox .items');
    $con.imagesLoaded(function () {
        $con.isotope({
            itemSelector: '.item',
            layoutMode: 'fitRows'
        });
    });

    $('.portfolio-wrapper.lightbox .filter li a').click(function () {

        $('.portfolio-wrapper.lightbox .filter li a').removeClass('active');
        $(this).addClass('active');

        var selector = $(this).attr('data-filter');
        $con.isotope({
            filter: selector
        });

        return false;
    });
});
/*-----------------------------------------------------------------------------------*/
/*	FANCYBOX
/*-----------------------------------------------------------------------------------*/
$(document).ready(function() {
	$(".fancybox-media").fancybox({
		arrows: true,
		padding: 0,
		closeBtn: true,
		openEffect: 'fade',
		closeEffect: 'fade',
		prevEffect: 'fade',
		nextEffect: 'fade',
		helpers: {
			media: {},
			overlay: {
		        locked: false
		    },
			buttons: false,
			thumbs: {
				width: 50,
				height: 50
			},
			title: {
				type: 'inside'
			}
		},
		beforeLoad: function() {
			var el, id = $(this.element).data('title-id');
			if (id) {
				el = $('#' + id);
				if (el.length) {
					this.title = el.html();
				}
			}
		}
	});
}); 
/*-----------------------------------------------------------------------------------*/
/*	FORM
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function ($) {
    $('.forms').dcSlickForms();
});
$(document).ready(function () {
    $('.comment-form input[title], .comment-form textarea').each(function () {
        if ($(this).val() === '') {
            $(this).val($(this).attr('title'));
        }

        $(this).focus(function () {
            if ($(this).val() == $(this).attr('title')) {
                $(this).val('').addClass('focused');
            }
        });
        $(this).blur(function () {
            if ($(this).val() === '') {
                $(this).val($(this).attr('title')).removeClass('focused');
            }
        });
    });
});
/*-----------------------------------------------------------------------------------*/
/*	TABS
/*-----------------------------------------------------------------------------------*/
$(document).ready(function () {
    $('.tabs').easytabs({
        animationSpeed: 300,
        updateHash: false
    });
});
/*-----------------------------------------------------------------------------------*/
/*	TESTIMONIALS
/*-----------------------------------------------------------------------------------*/  
 $(document).ready( function() {
      $('#testimonials').easytabs({
	      animationSpeed: 500,
	      updateHash: false,
	      cycle: 5000
      });
      
    });
/*-----------------------------------------------------------------------------------*/
/*	TOGGLE
/*-----------------------------------------------------------------------------------*/
$(document).ready(function () {
    //Hide the tooglebox when page load
    $(".togglebox").hide();
    //slide up and down when click over heading 2
    $("h4").click(function () {
        // slide toggle effect set to slow you can set it to fast too.
        $(this).toggleClass("active").next(".togglebox").slideToggle("slow");
        return true;
    });
});
/*-----------------------------------------------------------------------------------*/
/*	VIDEO
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function () {
    jQuery('.video').fitVids();
});
/*-----------------------------------------------------------------------------------*/
/*	HOVER OPACITY
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function ($) {
    $("ul.client-list li").css("opacity", "0.70");
    $("ul.client-list li").hover(function () {
        $(this).stop().animate({
            opacity: 1.0
        }, "fast");
    },

    function () {
        $(this).stop().animate({
            opacity: 0.70
        }, "fast");
    });
});
/*-----------------------------------------------------------------------------------*/
/*	SLIDER
/*-----------------------------------------------------------------------------------*/
$(document).ready(function() {
	if ($.fn.cssOriginal != undefined) $.fn.css = $.fn.cssOriginal;
	$('.banner').revolution({
		delay: 7000,
		startheight: 460,
		startwidth: 1110,
		hideThumbs: 200,
		thumbWidth: 100,
		// Thumb With and Height and Amount (only if navigation Tyope set to thumb !)
		thumbHeight: 50,
		thumbAmount: 5,
		navigationType: "bullet",
		// bullet, thumb, none
		navigationArrows: "verticalcentered",
		// nexttobullets, solo (old name verticalcentered), none
		navigationStyle: "round",
		// round,square,navbar,round-old,square-old,navbar-old, or any from the list in the docu (choose between 50+ different item), custom
		navigationHAlign: "center",
		// Vertical Align top,center,bottom
		navigationVAlign: "bottom",
		// Horizontal Align left,center,right
		navigationHOffset: 0,
		navigationVOffset: 20,
		soloArrowLeftHalign: "left",
		soloArrowLeftValign: "center",
		soloArrowLeftHOffset: 20,
		soloArrowLeftVOffset: 0,
		soloArrowRightHalign: "right",
		soloArrowRightValign: "center",
		soloArrowRightHOffset: 20,
		soloArrowRightVOffset: 0,
		touchenabled: "on",
		// Enable Swipe Function : on/off
		onHoverStop: "on",
		// Stop Banner Timet at Hover on Slide on/off
		stopAtSlide: -1,
		// Stop Timer if Slide "x" has been Reached. If stopAfterLoops set to 0, then it stops already in the first Loop at slide X which defined. -1 means do not stop at any slide. stopAfterLoops has no sinn in this case.
		stopAfterLoops: -1,
		// Stop Timer if All slides has been played "x" times. IT will stop at THe slide which is defined via stopAtSlide:x, if set to -1 slide never stop automatic
		hideCaptionAtLimit: 0,
		// It Defines if a caption should be shown under a Screen Resolution ( Basod on The Width of Browser)
		hideAllCaptionAtLilmit: 0,
		// Hide all The Captions if Width of Browser is less then this value
		hideSliderAtLimit: 0,
		// Hide the whole slider, and stop also functions if Width of Browser is less than this value
		shadow: 0,
		//0 = no Shadow, 1,2,3 = 3 Different Art of Shadows  (No Shadow in Fullwidth Version !)
		fullWidth: "on" // Turns On or Off the Fullwidth Image Centering in FullWidth Modus
	});	
	$('.portfolio-banner').revolution({
		delay: 9000,
		startheight: 550,
		startwidth: 1110,
		hideThumbs: 200,
		thumbWidth: 100,
		// Thumb With and Height and Amount (only if navigation Tyope set to thumb !)
		thumbHeight: 50,
		thumbAmount: 5,
		navigationType: "bullet",
		// bullet, thumb, none
		navigationArrows: "verticalcentered",
		// nexttobullets, solo (old name verticalcentered), none
		navigationStyle: "round",
		// round,square,navbar,round-old,square-old,navbar-old, or any from the list in the docu (choose between 50+ different item), custom
		navigationHAlign: "center",
		// Vertical Align top,center,bottom
		navigationVAlign: "bottom",
		// Horizontal Align left,center,right
		navigationHOffset: 0,
		navigationVOffset: 20,
		soloArrowLeftHalign: "left",
		soloArrowLeftValign: "center",
		soloArrowLeftHOffset: 20,
		soloArrowLeftVOffset: 0,
		soloArrowRightHalign: "right",
		soloArrowRightValign: "center",
		soloArrowRightHOffset: 20,
		soloArrowRightVOffset: 0,
		touchenabled: "on",
		// Enable Swipe Function : on/off
		onHoverStop: "on",
		// Stop Banner Timet at Hover on Slide on/off
		stopAtSlide: -1,
		// Stop Timer if Slide "x" has been Reached. If stopAfterLoops set to 0, then it stops already in the first Loop at slide X which defined. -1 means do not stop at any slide. stopAfterLoops has no sinn in this case.
		stopAfterLoops: -1,
		// Stop Timer if All slides has been played "x" times. IT will stop at THe slide which is defined via stopAtSlide:x, if set to -1 slide never stop automatic
		hideCaptionAtLimit: 0,
		// It Defines if a caption should be shown under a Screen Resolution ( Basod on The Width of Browser)
		hideAllCaptionAtLilmit: 0,
		// Hide all The Captions if Width of Browser is less then this value
		hideSliderAtLimit: 0,
		// Hide the whole slider, and stop also functions if Width of Browser is less than this value
		shadow: 0,
		//0 = no Shadow, 1,2,3 = 3 Different Art of Shadows  (No Shadow in Fullwidth Version !)
		fullWidth: "off" // Turns On or Off the Fullwidth Image Centering in FullWidth Modus
	});
});
/*-----------------------------------------------------------------------------------*/
/*	IMAGE HOVER
/*-----------------------------------------------------------------------------------*/				
$(document).ready(function() {
	$('.overlay a').prepend('<span class="more"></span>');
});
$(document).ready(function() {
	$('.overlay').mouseenter(function(e) {
		$(this).children('a').children('span').fadeIn(300);
	}).mouseleave(function(e) {
		$(this).children('a').children('span').fadeOut(200);
	});
}); 
$(document).ready(function() {
        $('.items li').mouseenter(function(e) {

            $(this).children('a').children('div').fadeIn(300);
        }).mouseleave(function(e) {

            if (!$(this).hasClass("active")) $(this).children('a').children('div').fadeOut(200);
        });
    });	
/*-----------------------------------------------------------------------------------*/
/*	TOUCH CAROUSEL
/*-----------------------------------------------------------------------------------*/	
jQuery(function($) {
			$(".touch-carousel").touchCarousel({					
				pagingNav: false,
				snapToItems: false,
				itemsPerMove: 4,				
				scrollToLast: false,
				loopItems: false,
				scrollbar: true
		    });
		});	
/*-----------------------------------------------------------------------------------*/
/*	RETINA.JS
/*-----------------------------------------------------------------------------------*/
(function () {
    function t(e) {
        this.path = e;
        var t = this.path.split("."),
            n = t.slice(0, t.length - 1).join("."),
            r = t[t.length - 1];
        this.at_2x_path = n + "@2x." + r
    }
    function n(e) {
        this.el = e, this.path = new t(this.el.getAttribute("src"));
        var n = this;
        this.path.check_2x_variant(function (e) {
            e && n.swap()
        })
    }
    var e = typeof exports == "undefined" ? window : exports;
    e.RetinaImagePath = t, t.confirmed_paths = [], t.prototype.is_external = function () {
        return !!this.path.match(/^https?\:/i) && !this.path.match("//" + document.domain)
    }, t.prototype.check_2x_variant = function (e) {
        var n, r = this;
        if (this.is_external()) return e(!1);
        if (this.at_2x_path in t.confirmed_paths) return e(!0);
        n = new XMLHttpRequest, n.open("HEAD", this.at_2x_path), n.onreadystatechange = function () {
            return n.readyState != 4 ? e(!1) : n.status >= 200 && n.status <= 399 ? (t.confirmed_paths.push(r.at_2x_path), e(!0)) : e(!1)
        }, n.send()
    }, e.RetinaImage = n, n.prototype.swap = function (e) {
        function n() {
            t.el.complete ? (t.el.setAttribute("width", t.el.offsetWidth), t.el.setAttribute("height", t.el.offsetHeight), t.el.setAttribute("src", e)) : setTimeout(n, 5)
        }
        typeof e == "undefined" && (e = this.path.at_2x_path);
        var t = this;
        n()
    }, e.devicePixelRatio > 1 && (window.onload = function () {
        var e = document.getElementsByTagName("img"),
            t = [],
            r, i;
        for (r = 0; r < e.length; r++) i = e[r], t.push(new n(i))
    })
})();
/*-----------------------------------------------------------------------------------*/
/*	MENU
/*-----------------------------------------------------------------------------------*/
ddsmoothmenu.init({
    mainmenuid: "menu",
    orientation: 'h',
    classname: 'menu',
    contentsource: "markup"
})

/*-----------------------*/
$(document).ready(function () {
    $("body").queryLoader2({
        barColor: "#FFF",
        backgroundColor: "#F79E21",
        percentage: true,
        barHeight: 2,
        completeAnimation: "fade",
        minimumTime: 1
    });
});