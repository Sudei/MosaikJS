(function($){
    $.MosaikJS = function(el, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        var $wrapper = null;
        var $list = null;
        var $elements = null;
        var $bg = null;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data("MosaikJS", base);

        base.init = function(){
            base.options = $.extend({},$.MosaikJS.defaultOptions, options);

            base.$el.addClass('MosaikJS');

            // Properties order in objects are not guaranteed in JavaScript, you need to use an Array or Map.
            _orderBreakpoints(base.options.breakpoints);

            $wrapper  = base.$el.find('.mosaikjs-wrapper');
            $list     = base.$el.find('.mosaikjs-wrapper .mosaikjs-list-boxes');
            $elements = base.$el.find('.mosaikjs-wrapper .mosaikjs-list-boxes .case');
            $bg       = base.$el.find('.mosaikjs-bg-project');

            $elements.each(function(index){
                var $this = $(this);

                var $img = $this.find('.case-img-container');
                $img.css({'background-image': 'url('+$img.attr('data-img')+')'});

                base.hoverCaser($this);
            });

            $wrapper.append('<div class="clear"></div>');
            base.responsive();

            //base.separators();
            _debounceResize();
        };

        base.responsive = function(){
            var breakpoints = base.options.breakpoints;
            var responsive = false;

            // Check if we define some breakpoints to alter items width/heights
            for (var key in breakpoints) {
                    if (window.matchMedia("(min-width: "+breakpoints[key].size+"px)").matches) {
                        // the viewport is at least key pixels wide
                        base.applyElemsDimensions(breakpoints[key].elementWidth, breakpoints[key].elementHeight);
                        responsive = true;
                        // Exit the for loop
                        break;
                    }
            }

            // Nothing has been defined as breakpoints, use default values
            if( !responsive ){
                base.applyElemsDimensions(base.options.elementWidth, base.options.elementHeight);
            }

            // Apply separators depending of layouts
            base.separators();
        };

        base.applyElemsDimensions = function(width, height){
            $elements.each(function(index){
                var $this = $(this);
                $this.css({'width': width, 'height': height});
            });
        };

        /**
         * Generate the correct number of separators
         * @method function
         * @return {[type]} [description]
         */
        base.separators = function(){
            var elements_count = $elements.length;
            var element_width = $elements[0].offsetWidth;
            var element_height = $elements[0].offsetHeight;

            var mosaic_width = base.$el.width();

            var verticals = mosaic_width / element_width;
            var horizontals = elements_count / verticals;
            var totals = verticals * (horizontals + 1);

            // Clean separators
            $wrapper.find('.sep').remove();

            // Append verticals separators
            for (var i = 1; i < verticals; i++) {
                var $div_vt = $('<div class="sep sep-vt sep-vt-'+i+'"></div>');
                $div_vt.css({'left': element_width*i});
                $wrapper.append($div_vt);
            }

            // Append horizontals separators
            for (var y = 0; y <= horizontals; y++) {
                var $div_hz = $('<div class="sep sep-hz sep-hz-'+y+'"></div>');
                $div_hz.css({'top': element_height*y});
                $wrapper.append($div_hz);
            }
        };


        /**
         * When an element is hover by the mouse
         * @method function
         * @param  {[type]} elem [description]
         * @return {[type]}      [description]
         */
        base.hoverCaser = function(elem){
            // When the mouse enter the element, Unactive all others elements to show background cover
            $(elem).on( "mouseenter", function(){
                $elements.addClass('unactive');
                $(this).removeClass('unactive');

                $bg.css({'background-image': 'url('+$(this).find('.case-img-container').attr('data-cover')+')'});

                var enter = new Event('enter');
                enter.element = elem;
                base.el.dispatchEvent(enter);
            });

            // When mouse leave the element, reactive all element to hidde the background cover
            $(elem).on( "mouseleave", function(){
                var leave = new Event('leave');
                leave.element = elem;
                base.el.dispatchEvent(leave);

                $elements.removeClass('unactive');
            });
        };

        /**
         * Breakpoints must be order by DESC for responsive Media min-width checker, later.
         * Properties order in objects are not guaranteed in JavaScript, you need to use an Array. or Map
         * @method _orderBreakpoints
         * @param  {array}          breakpoints [array of beakpoint object]
         */
        function _orderBreakpoints(breakpoints){
            breakpoints.sort(function(a, b){
                var keyA = new Date(a.size),
                    keyB = new Date(b.size);
                // Compare the 2 dates
                if(keyA > keyB) return -1;
                if(keyA < keyB) return 1;
                return 0;
            });
        }

        /**
         * Responsive resize redraw separators
         * @method function
         * @return {[type]} [description]
         */
        function _debounceResize(){
            $(window).on('resize', function(e) {
                base.responsive();
            });
        }

        // Run initializer
        base.init();
    };

    $.MosaikJS.defaultOptions = {
        elementWidth: '33.3%',
        elementHeight: "210px",
        breakpoints: [],
        features: {
            'responsive': true,
            'fit_texts': false,
        }
    };

    $.fn.mosaikJS = function(options){
        return this.each(function(){
            (new $.MosaikJS(this, options));
        });
    };

})(jQuery);
