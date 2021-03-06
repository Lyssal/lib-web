/**
 * A class to do blinking an element.
 *
 * @author Rémi Leclerc
 * @var Element $element (optional) The element
 */
var Lyssal_Blinking = function($element) {
    this.onGoing = false;

    if (undefined !== $element) {
        this.setElement($($element));
        this.start();
    }
};

/**
 * @var integer The duration of one blinking (in seconds)
 */
Lyssal_Blinking.ANIMATION_TIME = 1500;

/**
 * @var string The CSS class of the layer
 */
Lyssal_Blinking.CSS_CLASS = 'lyssal-blinking-layer';

/**
 * @var string The color of the blinking
 */
Lyssal_Blinking.FLASH_COLOR = '#ffffff';

/**
 * @var string The animation delay
 */
Lyssal_Blinking.ANIMATION_DELAY = 250;

/**
 * @var int The default z-index
 */
Lyssal_Blinking.Z_INDEX = 99999;


/**
 * Set the blinked element.
 *
 * @var Element $element The element
 */
Lyssal_Blinking.prototype.setElement = function($element) {
  this.$element = $($element);
};

/**
 * Start the blinking.
 */
Lyssal_Blinking.prototype.start = function() {
    var top = ('relative' === this.$element.css('position') ? 0 : parseInt(this.$element.position().top)) + parseInt(this.$element.css('paddingTop')),
        left = ('relative' === this.$element.css('position') ? 0 : parseInt(this.$element.position().left)) + parseInt(this.$element.css('paddingLeft')),
        $layer = $('<div>'),
        css = {
            backgroundColor: Lyssal_Blinking.FLASH_COLOR,
            height: this.$element.height(),
            left: left,
            position: 'absolute',
            top:  top,
            width: this.$element.width(),
            zIndex: Lyssal_Blinking.Z_INDEX
        }
    ;

    $layer.addClass(Lyssal_Blinking.CSS_CLASS);
    $layer.css(css);

    this.$element.append($layer);

  this.onGoing = true;
  this.blink();
};


/**
 * Do the blinking until the stop demand.
 */
Lyssal_Blinking.prototype.blink = function() {
    var duration = parseInt(Lyssal_Blinking.ANIMATION_TIME / 2);
    var flashContainer = this.$element.find('.' + Lyssal_Blinking.CSS_CLASS);

    if (this.onGoing) {
        var self = this;
        $(flashContainer)
            .animate({
                opacity:0.1
            }, {
                duration: duration
            })
            .delay(Lyssal_Blinking.ANIMATION_DELAY)
            .animate({
                opacity:1
            }, {
                duration: duration,
                complete: function() {
                    self.blink();
                }
            })
        ;
    } else {
        $(flashContainer).remove();
    }
};


/**
 * Stop the blinking.
 */
Lyssal_Blinking.prototype.stop = function() {
    this.onGoing = false;
};
