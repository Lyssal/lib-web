'use strict';

/**
 * A class which permit to load pages in AJAX.
 *
 * Set the attribute data-ajax="true" in your links or submit buttons to activate the AJAX page loader.
 * Init with <code>Lyssal_AjaxPageLoader.initAjaxLinks();</code>
 *
 * You define can define default properties or use these attributes :
 * <ul>
 *     <li>data-target : The element where the page will be loaded</li>
 *     <li>data-url : The URL of the AJAX call (by default, the href parameter of the link or the action parameter of the form)</li>
 *     <li>data-redirect-url : The redirect location, useful to force a redirection when forms are submitted</li>
 *     <li>data-refresh-target : The other elements which have to be refreshed (separated with commas) ; use data-url and data-target on these elements</li>
 *     <li>data-method : The HTTP method</li>
 *     <li>data-before-ajax-loading : The function name to call before the AJAX loading (for the declaration, the argument is the element)</li>
 *     <li>data-after-ajax-loading : The function name to call after the AJAX loading (for the declaration, the argument is the element)</li>
 *     <li>data-before-form-submitting : The function name to call before a form submit using the ajax loading (for the declaration, the argument is the element)</li>
 *     <li>data-after-form-submitting : The function name to call after a form submit using the ajax loading (for the declaration, the argument is the element)</li>
 *     <li>data-before-content-setting : The function name to call before the content setting (for the declaration, the argument is the element)</li>
 *     <li>data-after-content-setting : The function name to call after the content setting (for the declaration, the argument is the element)</li>
 *     <li>data-ajax-events="false" : Unactivate all events</li>
 * </ul>
 *
 * You also can modify the general class parameters.
 * For example:
 * <code>
 *     Lyssal_AjaxPageLoader.AFTER_AJAX_LOADING_DEFAULT = function (element) {
 *         Lyssal_Navigation.setStateUrl(Lyssal_AjaxPageLoader.getUrl(element));
 *
 *         // You can have the target element like that:
 *         // var targetElement = ($(element).is('[data-target]') ? $(element).attr('data-target') : Lyssal_AjaxPageLoader.TARGET_DEFAULT);
 *     };
 * </code>
 *
 * If you use CKEditor, you can use:
 * <code>
 *     Lyssal_AjaxPageLoader.BEFORE_FORM_SUBMITTING_DEFAULT = function () {
 *         for (instance in CKEDITOR.instances) {
 *             CKEDITOR.instances[instance].updateElement();
 *         }
 *     };
 * </code>
 *
 * Needs Lyssal_Navigation.
 * Can be used with Lyssal_Blinking for beautiful transitions: <code>Lyssal_AjaxPageLoader.LOADING_TYPE = Lyssal_AjaxPageLoader.LOADING_TYPE_LYSSAL_BLINKING;</code>
 *
 * @author Rémi Leclerc
 */
var Lyssal_AjaxPageLoader = function() {};

/**
 * @type Element The target element by default
 */
Lyssal_AjaxPageLoader.TARGET_DEFAULT = $('body');

/**
 * @type string The send method by default
 */
Lyssal_AjaxPageLoader.METHOD_DEFAULT = 'GET';

/**
 * @type function The function event before AJAX loading
 *
 * For example: function (element) { console.info('Ajax loader on ' + element + '.'); }
 */
Lyssal_AjaxPageLoader.BEFORE_AJAX_LOADING_DEFAULT = null;

/**
 * @type function The function event after AJAX loading
 */
Lyssal_AjaxPageLoader.AFTER_AJAX_LOADING_DEFAULT = null;

/**
 * @type function The function event before a form submit
 */
Lyssal_AjaxPageLoader.BEFORE_FORM_SUBMITTING_DEFAULT = null;

/**
 * @type function The function event after a form submit
 */
Lyssal_AjaxPageLoader.AFTER_FORM_SUBMITTING_DEFAULT = null;

/**
 * @type function The function event before the content setting
 */
Lyssal_AjaxPageLoader.BEFORE_CONTENT_SETTING_DEFAULT = null;

/**
 * @type function The function event after the content setting
 */
Lyssal_AjaxPageLoader.AFTER_CONTENT_SETTING_DEFAULT = null;

/**
 * @type int|null The loader type
 */
Lyssal_AjaxPageLoader.LOADING_TYPE = null;

/**
 * @type int Type Lyssal_Blinking
 */
Lyssal_AjaxPageLoader.LOADING_TYPE_LYSSAL_BLINKING = 1;

/**
 * @type int Type jQuery Loading Overlay
 */
Lyssal_AjaxPageLoader.LOADING_TYPE_JGERIGMEYER_JQUERY_LOADING_OVERLAY = 2;

/**
 * @type int Type jQuery Loading Overlay
 */
Lyssal_AjaxPageLoader.LOADING_TYPE_GASPARE_SGANGA_JQUERY_LOADING_OVERLAY = 3;


/**
 * Initialize the AJAX links.
 * Please, to init new elements when they appears with AJAX loading, prefer to use a string like 'a.ajax' whereas a jQuery object.
 *
 * @var string elements (optional) The jQuery string of the links, by default a[data-ajax="true"]
 */
Lyssal_AjaxPageLoader.initAjaxLinks = function(elements)
{
	  Lyssal_AjaxPageLoader.initDefaultLoadingType();

    if ('undefined' == typeof elements) {
        elements = 'a[data-ajax="true"], input[type="submit"][data-ajax="true"], button[type="submit"][data-ajax="true"]';
    }

    var elementsToAjax = $(elements).not('[data-page-loader-init="true"]');

    $.each(elementsToAjax, function (i, element) {
        var $element = $(element);

        // If there is a click event, we got it to see if the event have to be stopped or not
        var context = $element.context;
        var onclickEvent = ('undefined' != typeof context ? context.onclick : null);
        if (null !== onclickEvent) {
            $element.unbind('click').prop('onclick', null).attr('onclick', null);
        }

        $element.click(function(event) {
            if (null !== onclickEvent) {
                var clickReturn = onclickEvent();
                if (!clickReturn) {
                  event.preventDefault();
                  return;
                }
            }

            return Lyssal_AjaxPageLoader.ajaxLink_Click(this, elements);
        });

        $(this).attr('data-page-loader-init', 'true');
    });
};

/**
 * Initialize the type of loader by default.
 */
Lyssal_AjaxPageLoader.initDefaultLoadingType = function()
{
    if (null === Lyssal_AjaxPageLoader.LOADING_TYPE) {
        if ('function' === typeof jQuery.fn.LoadingOverlay) {
            Lyssal_AjaxPageLoader.LOADING_TYPE = Lyssal_AjaxPageLoader.LOADING_TYPE_GASPARE_SGANGA_JQUERY_LOADING_OVERLAY;
        } else if ('function' === typeof jQuery.fn.loadingOverlay) {
    		Lyssal_AjaxPageLoader.LOADING_TYPE = Lyssal_AjaxPageLoader.LOADING_TYPE_JGERIGMEYER_JQUERY_LOADING_OVERLAY;
    	} else if ('undefined' !== typeof Lyssal_Blinking) {
    		Lyssal_AjaxPageLoader.LOADING_TYPE = Lyssal_AjaxPageLoader.LOADING_TYPE_LYSSAL_BLINKING;
    	}
    }
};

/**
 * The event when a user clicks an AJAX link.
 *
 * @var Element link           The target link
 * @var string  elements       The jQuery string of the links
 * @var bollean refreshTargets If have to refresh target elements
 *
 * @return boolean IF there is an AJAX call
 */
Lyssal_AjaxPageLoader.ajaxLink_Click = function(link, elements, refreshTargets)
{
    if (false !== refreshTargets) {
        refreshTargets = true;
    }

    var url = Lyssal_AjaxPageLoader.getUrl(link);

    if (null !== url && 'undefined' != typeof url) {
        var targetElement = Lyssal_AjaxPageLoader.getAttribute(link, 'data-target', Lyssal_AjaxPageLoader.TARGET_DEFAULT),
            ajaxOptions = {},
            isForm = false;

        // Options for form
        if (!Lyssal_AjaxPageLoader.isLink(link)) {
            var $form = Lyssal_AjaxPageLoader.getElementForm(link);
            if (null !== $form) {
                isForm = true;
                ajaxOptions.method = Lyssal_AjaxPageLoader.getAttribute($form, 'method', 'POST');

                Lyssal_AjaxPageLoader._processEvent(link, 'data-before-form-submitting', Lyssal_AjaxPageLoader.BEFORE_FORM_SUBMITTING_DEFAULT);

                if ('get' === ajaxOptions.method.toLowerCase()) {
                    ajaxOptions.data = $form.serialize();
                } else {
                    ajaxOptions.data = new FormData($form.get(0));
                    ajaxOptions.contentType = false;
                    ajaxOptions.cache = false;
                    ajaxOptions.processData = false;
                }

                // Add the button name, useful if there are many buttons (to manage after a redirection for example)
                var buttonName = Lyssal_AjaxPageLoader.getAttribute(link, 'name');
                if (null !== buttonName) {
                    if ('get' === ajaxOptions.method.toLowerCase()) {
                        ajaxOptions.data += '&' + encodeURI(buttonName) + '=' + encodeURI($(link).val());
                    } else {
                        ajaxOptions.data.append(buttonName, $(link).val());
                    }
                }
            } else {
                ajaxOptions.method = Lyssal_AjaxPageLoader.getAttribute(link, 'data-method', Lyssal_AjaxPageLoader.METHOD_DEFAULT);
            }
        }

        var ajaxLoader = Lyssal_AjaxPageLoader.displayLoading(targetElement);
        var redirectUrl = Lyssal_AjaxPageLoader.getAttribute(link, 'data-redirect-url');

        Lyssal_AjaxPageLoader._processEvent(link, 'data-before-ajax-loading', Lyssal_AjaxPageLoader.BEFORE_AJAX_LOADING_DEFAULT);
        ajaxOptions.success = function(response) {
            if (null === redirectUrl) {
                Lyssal_AjaxPageLoader._processEvent(link, 'data-before-content-setting', Lyssal_AjaxPageLoader.BEFORE_CONTENT_SETTING_DEFAULT);
                $(targetElement).html(response);
                Lyssal_AjaxPageLoader.initAjaxLinks(elements);
                Lyssal_AjaxPageLoader._processEvent(link, 'data-after-content-setting', Lyssal_AjaxPageLoader.AFTER_CONTENT_SETTING_DEFAULT);
            } else {
                $.ajax(redirectUrl, {
                    success: function (response) {
                        Lyssal_AjaxPageLoader._processEvent(link, 'data-before-content-setting', Lyssal_AjaxPageLoader.BEFORE_CONTENT_SETTING_DEFAULT);
                        $(targetElement).html(response);
                        Lyssal_AjaxPageLoader.initAjaxLinks(elements);
                        Lyssal_AjaxPageLoader._processEvent(link, 'data-after-content-setting', Lyssal_AjaxPageLoader.AFTER_CONTENT_SETTING_DEFAULT);
                    },
                    complete: function () {
                        Lyssal_AjaxPageLoader.hideLoading(ajaxLoader);
                        if (isForm) {
                            Lyssal_AjaxPageLoader._processEvent(link, 'data-after-form-submitting', Lyssal_AjaxPageLoader.AFTER_FORM_SUBMITTING_DEFAULT);
                        }
                        Lyssal_AjaxPageLoader._processEvent(link, 'data-after-ajax-loading', Lyssal_AjaxPageLoader.AFTER_AJAX_LOADING_DEFAULT);
                    }
                });
            }

            if (refreshTargets) {
                var refreshTargetElements = Lyssal_AjaxPageLoader.getAttribute(link, 'data-refresh-target');
                if (null !== refreshTargetElements) {
                    var $refreshTargetElements = $(refreshTargetElements);
                    $refreshTargetElements.each(function (i, refreshTargetElement) {
                        Lyssal_AjaxPageLoader.ajaxLink_Click(refreshTargetElement, elements, false);
                    });
                }
            }
        };
        ajaxOptions.complete = function() {
            if (null === redirectUrl) {
                Lyssal_AjaxPageLoader.hideLoading(ajaxLoader);
                if (isForm) {
                    Lyssal_AjaxPageLoader._processEvent(link, 'data-after-form-submitting', Lyssal_AjaxPageLoader.AFTER_FORM_SUBMITTING_DEFAULT);
                }
                Lyssal_AjaxPageLoader._processEvent(link, 'data-after-ajax-loading', Lyssal_AjaxPageLoader.AFTER_AJAX_LOADING_DEFAULT);
            }
        };
        $.ajax(url, ajaxOptions);

        return false;
    } else {
        console.error('The element ' + link + ' has not be found for the AJAX page loader.');
    }

    return true;
};

/**
 * Return if the element is a link.
 *
 * @var Element element The element
 *
 * @return bool If link
 */
Lyssal_AjaxPageLoader.isLink = function(element)
{
    return $(element).is('a[href]');
};

/**
 * Get the attribute of an element.
 *
 * @var Element    element      The element
 * @var string     attribute    The attribute
 * @var mixed|null defaultValue The value if attribute not found
 *
 * @return string|null The attribute
 */
Lyssal_AjaxPageLoader.getAttribute = function(element, attribute, defaultValue)
{
    var $element = $(element);

    if ('undefined' == typeof defaultValue) {
        defaultValue = null;
    }

    if ($element.is('[' + attribute + ']')) {
        return $element.attr(attribute);
    }

    return defaultValue;
};

/**
 * Get the target URL from an AJAX element.
 *
 * @var Element element The element
 *
 * @return string|null The URL
 */
Lyssal_AjaxPageLoader.getUrl = function(element)
{
    var $element = $(element);

    var url = Lyssal_AjaxPageLoader.getAttribute(element, 'data-url');
    if (url !== null) {
        return url;
    }

    if ($element.is('[href]')) {
        return $element.attr('href');
    }

    // Form button submit
    var $form = Lyssal_AjaxPageLoader.getElementForm(element);
    if (null !== $form) {
        if ($form.is('[action]')) {
            return $form.attr('action');
        } else {
            return Lyssal_Navigation.getCurrentUrl();
        }
    }

    return null;
};

/**
 * Get the form from the element.
 *
 * @var Element element The element
 *
 * @return Element|null The form
 */
Lyssal_AjaxPageLoader.getElementForm = function(element)
{
    var $forms = $(element).closest('form');

    if ($forms.length > 0) {
        return $($forms.get(0));
    }

    return null;
};

/**
 * Return if events are activate.
 *
 * @var Element element The element
 *
 * @return boolean If activate
 */
Lyssal_AjaxPageLoader.eventsAreActivate = function(element)
{
    return ('false' !== Lyssal_AjaxPageLoader.getAttribute(element, 'data-ajax-events'));
};

/**
 * Process an event.
 *
 * @var Element  element         The element
 * @var string   dataAttribute   The element attribute used for the event function
 * @var function functionDefault The default function
 */
Lyssal_AjaxPageLoader._processEvent = function(element, dataAttribute, functionDefault)
{
    if (Lyssal_AjaxPageLoader.eventsAreActivate(element)) {
        var eventFunction = Lyssal_AjaxPageLoader.getAttribute(element, dataAttribute, functionDefault);

        if (null !== eventFunction) {
          if ('function' != typeof eventFunction) {
            // If eventFunction is a script, eval will execute it
            if ('function' == eval('typeof ' + eventFunction)) {
              eval(eventFunction + '(element)');
            }
          } else {
            eventFunction(element);
          }
        }
    }
};

/**
 * Display the animation during the loading.
 *
 * @var Element targetElement The element where there is the animation
 * @return mixed|null The used object for the animation
 */
Lyssal_AjaxPageLoader.displayLoading = function (targetElement)
{
	if (null !== Lyssal_AjaxPageLoader.LOADING_TYPE) {
      switch (Lyssal_AjaxPageLoader.LOADING_TYPE) {
          case Lyssal_AjaxPageLoader.LOADING_TYPE_LYSSAL_BLINKING:
              var ajaxLoader = new Lyssal_Blinking(targetElement);
              ajaxLoader.start();
              return ajaxLoader;
          case Lyssal_AjaxPageLoader.LOADING_TYPE_JGERIGMEYER_JQUERY_LOADING_OVERLAY:
              $(targetElement).loadingOverlay();
              return targetElement;
          case Lyssal_AjaxPageLoader.LOADING_TYPE_GASPARE_SGANGA_JQUERY_LOADING_OVERLAY:
              $(targetElement).LoadingOverlay('show');
              return targetElement;
      }
	}

	return null;
};

/**
 * Remove the animation.
 *
 * @var mixed|null object The used object for the animation
 */
Lyssal_AjaxPageLoader.hideLoading = function (object)
{
	if (null !== Lyssal_AjaxPageLoader.LOADING_TYPE) {
      switch (Lyssal_AjaxPageLoader.LOADING_TYPE) {
          case Lyssal_AjaxPageLoader.LOADING_TYPE_LYSSAL_BLINKING:
              object.stop();
              break;
          case Lyssal_AjaxPageLoader.LOADING_TYPE_JGERIGMEYER_JQUERY_LOADING_OVERLAY:
              $(object).loadingOverlay('remove');
              break;
          case Lyssal_AjaxPageLoader.LOADING_TYPE_GASPARE_SGANGA_JQUERY_LOADING_OVERLAY:
              $(object).LoadingOverlay('hide');
              break;
      }
	}
};
