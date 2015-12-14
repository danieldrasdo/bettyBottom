$(document).ready(function(){
  //Code Module
  (function() {
    var bettyBottom = {
      init: function() {
        this.cacheDom();
        this.siteForms();
        this.duplicateDom();
        this.updateView();
        //initialized here so that the view updates, is then called with scrolling (in the 'bindEvents' method)
        this.windowScrolling();
        this.bindEvents();
      },

      cacheDom: function() {
        this.$body = $('body');
        this.$window = $(window);
        this.$siteNav = $('.siteNav');

        this.$lastSection = $('.main section:last-child');

        this.$home = $('#home');
        this.$aboutUs = $('#about-us');
        this.$event = this.$aboutUs.find('.event');
        this.currentYear = new Date().getFullYear();
        this.$currentYearText = this.$aboutUs.find('.currentYear');
        this.$manufacturers = $('#manufacturers');
        this.$manufacturer = this.$manufacturers.find('.manufacturer');
        this.$manufacturerText = this.$manufacturer.find('.text');
        this.$manufacturerImages = this.$manufacturer.find('.images');
        this.$moonlight = this.$manufacturerText.parent('.moonlight').find('.text');
        this.$effiesHeart = this.$manufacturerText.parent('.effiesHeart').find('.text');
        this.$cuteOptions = this.$manufacturerText.parent('.cuteOptions').find('.text');
        this.$dzhavael = this.$manufacturerText.parent('.dzhavael').find('.text');
        this.$eucalyptus = this.$manufacturerText.parent('.eucalyptus').find('.text');
        this.$pureWhite = this.$manufacturerText.parent('.pureWhite').find('.text');
        this.$recycledTraditions = this.$manufacturerText.parent('.recycledTraditions').find('.text');
        this.$flutterSqueak = this.$manufacturerText.parent('.flutterSqueak').find('.text');
        this.$cocoonHouse = this.$manufacturerText.parent('.cocoonHouse').find('.text');
        this.$peacockDesigns = this.$manufacturerText.parent('.peacockDesigns').find('.text');

        this.$marketDates = $('#market-dates');

        this.$leaves = this.$marketDates.find('.leaves');
        this.$flowers = this.$marketDates.find('.flowers');
        this.$dresss = this.$marketDates.find('.dress');
        this.$dressOnTable = this.$marketDates.find('.dressOnTable');

        this.$customers = $('#customers');
        this.$customersForm = this.$customers.find('#customersForm');
        this.$customersFormTextArea = this.$customersForm.find('textarea');
        this.$customersFormButton = this.$customersForm.find('button');
        this.$customerBgImageCycle = this.$customers.find('.customerBgImageCycle');

        this.$mapAddress = $('#map-address');

        this.$contactForm = $('#contactForm');
        this.$contactFormTextArea = this.$contactForm.find('textarea');
        this.$contactFormButton = this.$contactForm.find('button');

        this.$bottom = $('#bottom');
      },

      siteForms: function() {
        //Sets defaults and validates forms before submission (uses 'jquery.validate.min.js')
        jQuery.validator.setDefaults({
          submitHandler: function(form) {
            this.sendEmail(form);
          }.bind(this),
          messages: {
            name: '<i class="fa fa-exclamation-circle"></i> What shall we call you?',
            email: {
              required: '<i class="fa fa-exclamation-circle"></i> What is your email? Your email is only required because we may need to reply to your message. Oh, and don&#39;t worry, we won&#39;t share your email address to third parties and we won&#39;t send you spam.',
              email: '<i class="fa fa-exclamation-circle"></i> Your email should be in the format of name@domain.com'
            },
            message: '<i class="fa fa-exclamation-circle"></i> What would you like to tell us?'
          }
        });
        this.$customersForm.validate({
          messages: {
            email: {
              required: '<i class="fa fa-exclamation-circle"></i> What email should we send our reply to?'
            },
            message: '<i class="fa fa-exclamation-circle"></i> Need help finding a store near you? Or would you like to see our collections in your favorite boutique? Let us know!'
          }
        });
        this.$contactForm.validate();
      },

      sendEmail: function(form) {
        var theForm = $(form);
        var url = theForm.attr('action');
        var type = theForm.attr('method');
        var data = {};

        theForm.find('[name]').each(function(index, value) {
          var inputsWithNames = $(this);
          var inputName = inputsWithNames.attr('name');
          var inputValue = inputsWithNames.val();
          //constructs the 'data' object
          data[inputName] = inputValue;
        });

        $.ajax({
          url: url,
          type: type,
          data: data,
          success: function(response) {
            var $response = theForm.find('#response').addClass('active').css({
              'display': 'block'
            });
            $response.addClass('success');
            $response.html('<i class="fa fa-thumbs-up"></i> Your message has been sent!').delay(6000).fadeOut();
            console.log('success: \n');
            console.log(response);
          },
          error: function(response) {
            var $response = theForm.find('#response').addClass('active').css({
              'display': 'block'
            });
            $response.addClass('error');
            $response.html('<i class="fa fa-exclamation-circle"></i> Oops! There was an issue sending your message, please try again later.').delay(6000).fadeOut();
            console.log('There was a problem, please try again later\nerror: \n');
            console.log(response);
          }
        });
        this.preventDefault();
      },

      preventDefault: function() {
        return false;
      },

      duplicateDom: function() {
        //Duplicates the site navigation
        this.$siteNav.clone().removeClass('siteNav').addClass('siteNavFixed').prependTo(this.$body);
        this.$siteNavFixed = $('.siteNavFixed');
        this.$navLink = this.$siteNavFixed.find('.navLink');
        this.$aboutUsNavLink = this.$siteNavFixed.find('a.aboutUs');
        this.$manufacturersNavLink = this.$siteNavFixed.find('a.manufacturers');
        this.$customersNavLink = this.$siteNavFixed.find('a.customers');
        this.$marketDatesNavLink = this.$siteNavFixed.find('a.marketDates');

        //Duplicates the manufacturer images div, shows/hides depending on screensize
        this.$manufacturerImages.each(function() {
          $(this).addClass('desktop').clone().removeClass('desktop').addClass('mobile').insertAfter(this);
        });
      },

      updateView: function() {
        //About Us 'today' text replacement
        this.$currentYearText.html(this.currentYear);

        //Adds background lines to the timeline events
        this.$event.each(function() {
          $(this).append('<span></span>');
        });

        //Sets text opacity within manufacturer divs to 0 for parallaxing
        this.$manufacturerText.css({
          'opacity': 0
        });

        //Footer copyright year addition
        this.$bottom.find('p i.fa-copyright').after(' ' + this.currentYear);

        //Sets the mobile manufacturer images div to carousel (uses 'owl.carousel.min.js')
        $('.mobile').owlCarousel({
          items : 1
        });
      },

      windowScrolling: function() {
        this.wScrollTop = this.$window.scrollTop();
        this.wHeight = this.$window.height();
        this.wScrollBottom = this.wScrollTop + this.wHeight;

        //siteNav
        if ( this.$siteNav.offset().top < (this.wScrollTop - (this.$siteNav.height() * 3)) ) {
          this.$siteNavFixed.addClass('unhide');
        } else {
          this.$siteNavFixed.removeClass('unhide');
        }

        if ( this.wScrollTop > this.$lastSection.offset().top + this.$lastSection.height() -this.$siteNavFixed.height() ) {
          this.$siteNavFixed.removeClass('unhide');
        }

        //Nav Link Activation
        if ( this.wScrollTop >= this.$aboutUs.offset().top - this.$siteNavFixed.height() && this.wScrollTop < this.$manufacturers.offset().top - this.$siteNavFixed.height() ) {
          this.$navLink.removeClass('active');
          this.$aboutUsNavLink.addClass('active');
        } else if ( this.wScrollTop >= this.$manufacturers.offset().top - this.$siteNavFixed.height() && this.wScrollTop < this.$marketDates.offset().top - this.$siteNavFixed.height() ) {
          this.$navLink.removeClass('active');
          this.$manufacturersNavLink.addClass('active');
        } else if ( this.wScrollTop >= this.$marketDates.offset().top - this.$siteNavFixed.height() && this.wScrollTop < this.$customers.offset().top - this.$siteNavFixed.height() ) {
          this.$navLink.removeClass('active');
          this.$marketDatesNavLink.addClass('active');
        } else if ( this.wScrollTop >= this.$customers.offset().top - this.$siteNavFixed.height() ) {
          this.$navLink.removeClass('active');
          this.$customersNavLink.addClass('active');
        } else {
          this.$navLink.removeClass('active');
        }

        //manufacturers parallaxing
        if ( this.wScrollBottom > this.$moonlight.offset().top + ( this.$moonlight.height() * 1.25) ) {
          this.$moonlight.css({
            'opacity': '1'
          });
        }

        if ( this.wScrollBottom > this.$effiesHeart.offset().top + ( this.$effiesHeart.height() * 1.25) ) {
          this.$effiesHeart.css({
            'opacity': '1'
          });
        }

        if ( this.wScrollBottom > this.$cuteOptions.offset().top + ( this.$cuteOptions.height() * 1.25) ) {
          this.$cuteOptions.css({
            'opacity': '1'
          });
        }

        if ( this.wScrollBottom > this.$dzhavael.offset().top + ( this.$dzhavael.height() * 1.25) ) {
          this.$dzhavael.css({
            'opacity': '1'
          });
        }

        if ( this.wScrollBottom > this.$eucalyptus.offset().top + ( this.$eucalyptus.height() * 1.25) ) {
          this.$eucalyptus.css({
            'opacity': '1'
          });
        }

        if ( this.wScrollBottom > this.$pureWhite.offset().top + ( this.$pureWhite.height() * 1.25) ) {
          this.$pureWhite.css({
            'opacity': '1'
          });
        }

        if ( this.wScrollBottom > this.$recycledTraditions.offset().top + ( this.$recycledTraditions.height() * 1.25) ) {
          this.$recycledTraditions.css({
            'opacity': '1'
          });
        }

        if ( this.wScrollBottom > this.$flutterSqueak.offset().top + ( this.$flutterSqueak.height() * 1.25) ) {
          this.$flutterSqueak.css({
            'opacity': '1'
          });
        }

        if ( this.wScrollBottom > this.$cocoonHouse.offset().top + ( this.$cocoonHouse.height() * 1.25) ) {
          this.$cocoonHouse.css({
            'opacity': '1'
          });
        }

        if ( this.wScrollBottom > this.$peacockDesigns.offset().top + ( this.$peacockDesigns.height() * 1.25) ) {
          this.$peacockDesigns.css({
            'opacity': '1'
          });
        }

        //market dates parallaxing
        if ( this.wScrollBottom >= this.$leaves.offset().top ) {
          this.$leaves.css({
            'transform': 'translateY(-' + (this.wScrollBottom - this.$leaves.parent().offset().top) / 2.5 + 'px)'
          });
          this.$flowers.css({
            'transform': 'translateY(-' + (this.wScrollBottom - this.$flowers.parent().offset().top) / 9 + 'px)'
          });
        }

        /*if (this.wScrollBottom >= this.$dress.offset().top) {
          this.$dress.css({
            'transform': 'translateY(' + (this.wScrollBottom - this.$dress.offset().top) / 20 + 'px)'
          });
        }*/

        if (this.wScrollBottom >= this.$dressOnTable.offset().top) {
          this.$dressOnTable.css({
            'bottom': '90px',
            'transform': 'translateY(' + (this.wScrollBottom - this.$dressOnTable.offset().top) / 5 + 'px)'
          });
        }
      },

      //IMPORTANT: this method is called only when the entire page, not just the doc, is ready!
      windowLoaded: function() {
        //Calls methods
        this.customerBgImageCycle();
        this.googleMap();
      },

      customerBgImageCycle: function() {
        //Customers Section Background Image Cycle (uses 'background.cycle.min.js')
        this.$customerBgImageCycle.backgroundCycle({
          imageUrls: [
            'assets/img/mannequin-1.jpg',
            'assets/img/accessories.jpg',
            'assets/img/mannequin-2.jpg',
            'assets/img/showroom.jpg'
          ],
          fadeSpeed: 2500,
          duration: 6000,
          backgroundSize: SCALING_MODE_COVER
        });
      },

      googleMap: function() {
        var map;
        var geocoder = new google.maps.Geocoder();
        var address = this.$mapAddress.text();

        map = new google.maps.Map(document.getElementById('map-canvas'),{
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          scrollwheel: false
        });

        if (geocoder) {
          geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                map.setCenter(results[0].geometry.location);

                var infowindow = new google.maps.InfoWindow({
                  content: address,
                  map: map,
                  position: results[0].geometry.location
                });
                var marker = new google.maps.Marker({
                  position: results[0].geometry.location,
                  map: map,
                  title: address
                });
              } else {
                alert('No results found');
              }
            }
          });
        }
      },

      bindEvents: function() {
        //fires off windowLoaded() only once the entire page (images, iframes, etc), not just the doc, is ready.
        this.$window.on('load', this.windowLoaded.bind(this));

        this.$window.scroll(this.windowScrolling.bind(this));

        this.$customersFormTextArea.on('focus', this.textAreaHeight.bind(this));
        this.$contactFormTextArea.on('focus', this.textAreaHeight.bind(this));

        this.$customersForm.on('submit', this.preventDefault.bind(this));
        this.$contactForm.on('submit', this.preventDefault.bind(this));
      },

      textAreaHeight: function(event) {
        //used instead of :focus because submit button was hard to click with the transition in place.
        $(event.target).css({'height': '120px'});
      }
    };

    bettyBottom.init();
  }());
  //End Code Module

});
