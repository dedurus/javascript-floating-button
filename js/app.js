var floatingBtn = function () {
    'use strict';

    // Default configuration
    var config = {
        'button_id' : 'floating-btn', // button ID
        'location'  : 'bottom-right', // or 'bottom-left', 'middle-right', 'middle-left'
        'bg_color'  : '#e62e00', // background color (hexadecimal value or CSS named color, e.g. 'yellow')
        'text_color': '#FFFFFF', // color of the button text (hexadecimal value or CSS named color, e.g. 'yellow')
        'text'      : 'Feedback',
        'url'       : 'http://engramweb.com',
        'corners'   : {
            type         : 'rounded', // or 'square'
            border_radius: '5px' // default border radius in pixels
        },
        'visible'   : 'slide_in',  // 'slide_in' for hiding the button when the window is scrolled. 'always' keeps the button in viewport
        delay: 2500, // The animation start delay in miliseconds. Only used when `visible` is set to 'slide_in`
    }



    var styles = {
        'background-color': '#e62e00',
        'padding'         : '10px 20px',
        'color'           : '#fff',
        'position'        : 'fixed',
        'margin'          : '10px'
    }

    // get width of the button including left and right margins
    var _getAbsoluteWidth = function (btn) {
        var btn_styles = window.getComputedStyle(btn);
        var margin = parseFloat(btn_styles['marginLeft']) + parseFloat(btn_styles['marginRight']);

        return btn.offsetWidth + margin;
    }

    // get height of the button including margins
    var _getAbsoluteHeight = function (btn) {
        var btn_styles = window.getComputedStyle(btn);
        var margin = parseFloat(btn_styles['marginTop']) + parseFloat(btn_styles['marginBottom']);

        return btn.offsetHeight + margin;
    }


    var _location = function(location){
        switch(location){
            case  'bottom-left':
                styles.bottom = 0;
                styles.left = 0;
                break;

            case 'bottom-right':
                styles.bottom = 0;
                styles.right = 0;
                break;

            case 'middle-left':
                styles.left = 0;
                styles.top = '50%';
                break;

            case 'middle-right':
                styles.right = 0;
                styles.top = '50%';
                break;
            default:
                break;

        }
    }

    // ---------------- transition effects ----------------
    var _transition = function(config){
        var location = config.location,
            btn = document.getElementById(config.button_id),
            width = _getAbsoluteWidth(btn),
            height = _getAbsoluteHeight(btn);

        switch(location){
            case 'bottom-right':
            case 'middle-right':
                _move_box(btn, width, 0, config.delay);
                break;

            case 'bottom-left':
            case 'middle-left':
                _move_box(btn, -width, 0, config.delay);
                break;
            default:
                break;
        }
    }

    // initial transition CSS
    var _set_transition = function(btn) {
         btn.style["-webkit-transition"] = "all 0.5s ease-out";
         btn.style["-moz-transition"] = "all 0.5s ease-out";
         btn.style["-ms-transition"] = "all 0.5s ease-out";
         btn.style["-o-transition"] = "all 0.5s ease-out";
         btn.style["transition"] = "all 0.5s ease-out";

    }

    var _set_translate = function(btn, horizontal, vertical) {
        btn.style["-webkit-transform"] = "translate(" + horizontal + "px, "+ vertical +"px)";
        btn.style["-moz-transform"] = "translate(" + horizontal + "px, -" + vertical +"px)";
        btn.style["-ms-transform"] = "translate(" + horizontal + "px, -" + vertical + "px)";
        btn.style["-o-transform"] = "translate(" + horizontal + "px, " + vertical  + "px)";
        btn.style["transform"] = "translate(" + horizontal + "px, -" + vertical + "px)";
    }

    var _move_box = function(btn, horizontal, vertical, delay) {
        _set_transition(btn);
        setTimeout(function(){
            _set_translate(btn, horizontal, vertical);
        },
        delay);
    }
    // ----------- ./transition effects ----------------

    // --- onScroll animation
    var onScrollAnim = function(config){

    }
    // ---

    var _bg_color = function(bg_color){
        styles['background-color'] = bg_color;
    }

    var _text_color = function(text_color){
        styles['color'] = text_color;
    }

    var _corners = function(corners){
        switch(corners.type){
            case 'rounded':
                styles['border-radius'] = corners.border_radius || '5px';
                break;
            case 'square':
                styles['border-radius'] = 0;
                break;
        }
    }

    var _btn_text = function(text){
        config.text = text;
    }







    var init = function(settings){
        for(var prop in settings) {
            if(settings.hasOwnProperty(prop)){
                config[prop] = settings[prop];
            }
        }
        _bg_color(config.bg_color);
        _text_color(config.text_color);
        _corners(config.corners);
        _btn_text(config.text);
        generate_button(config);

        _location(config.location);

        append_btn(generate_button(config), config);
        _transition(config);




        console.log('Settings', settings);
        console.log('Config', config);
        console.log('Styles', styles);
    }


    function setStyle(el, propertyObject) {
        for (var property in propertyObject) {
            el.style[property] = propertyObject[property];
        }
    }


   function generate_button(config){
        // create nodes
        var btn_link = document.createElement('a'),
            text =  document.createTextNode(config.text);

        // set attributes
        btn_link.setAttribute('href', config.url);
        btn_link.id = 'floating-btn';
        btn_link.appendChild(text);

        //set styles
        setStyle(btn_link, styles);

        return btn_link;
   }

   function append_btn(btn, config){
        // append button to document
        document.body.appendChild(btn);
   }

   return {
    init: init
   };
}();

floatingBtn.init({
    'location': 'bottom-left',
    'bg_color': 'blue',
    'text_color': 'violet',
    'corners': {
        type:'rounded',
    },
    'text': 'tralala',
    'url': 'http://facebook.com',
    'visible': 'always',
    delay: 5000
})