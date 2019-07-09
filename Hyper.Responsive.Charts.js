/*!
 * HyperResponsiveCharts.js
 * Version: 1.0.3
 *
 * Copyright 2016 BBC
 * Released under the Apache 2.0 license
 * https://github.com/bbc/news-vj-chartjs-plugin-hyper-responsiveness
 */
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
var Chart,
    HyperResponsiveChartsPlugin,
    privateApi;

Chart = require('Chart');
Chart = typeof (Chart) === 'function' ? Chart : window.Chart;
privateApi = {};
privateApi.selectedBreakPoint = false;
privateApi.helpers = Chart.helpers;

privateApi.getUserDefinedBreakpoints = function (config) {
    var breakPoints;

    breakPoints = false;
    if (config.options.responsiveBreakPointConfig) {
        breakPoints = Object.keys(config.options.responsiveBreakPointConfig.breakPoints);
        breakPoints = breakPoints.sort(function (a, b) {
            return a - b;
        });
    }

    return breakPoints;
};

privateApi.pluginConfigSet = function (argObj) {
    var result, config;

    if (argObj && argObj.chartInstance.options.responsiveBreakPointConfig && argObj.chartInstance.options.responsive) {
        return true;
    }
    return result;
};

privateApi.updateConfigAtBreakpoint = function (argObj, supressRedraw) {
    var config, currentBreakPoint, i, max;

    if (privateApi.pluginConfigSet(argObj)) {
        config = argObj.chartInstance.config;

        //change config back to default at non specified breakpoints
        if (argObj.size > parseInt(argObj.breakPoints[argObj.breakPoints.length - 1], 10)) {
            config = config.options.responsiveBreakPointConfig.defaultConfig(config);
            if (!supressRedraw)
            {
                argObj.chartInstance.update(0, false);
            }
            
            return true;
        }

        //loop user defined breakpoints and update config when required
        for (i = 0, max = argObj.breakPoints.length; i < max; i += 1) {
            currentBreakPoint = argObj.breakPoints[i];
            if (argObj.size < currentBreakPoint) {
                selectedBreakPoint = currentBreakPoint;
                config.options.responsiveBreakPointConfig.breakPoints[currentBreakPoint](config);
                if (!supressRedraw)
                {
                    argObj.chartInstance.update(0, false);
                }
                break;
            }
        }
    }
};

// https://stackoverflow.com/a/27078401/6289890
privateApi.throttle = function (func, wait, options) {
    var context, args, result, later,
        timeout = null,
        previous = 0;

    if (!options) {
        options = {};
    }

    later = function () {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);

        if (!timeout) {
            context = args = null;
        }
    };

    return function () {
        var now = Date.now(),
            remaining = wait - (now - previous);

        if (!previous && options.leading === false) {
            previous = now;
        }

        context = this;
        args = arguments;

        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }

            previous = now;
            result = func.apply(context, args);

            if (!timeout) {
                context = args = null;
            }
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }

        return result;
    };
};

privateApi.onResize = function (chartInstance, size) {
    var breakPoints, updateChart;

    breakPoints = privateApi.getUserDefinedBreakpoints(chartInstance);
    privateApi.updateConfigAtBreakpoint({ size: size.width, breakPoints: breakPoints, chartInstance: chartInstance }, true);
};

HyperResponsiveChartsPlugin = Chart.PluginBase.extend({
    resize: privateApi.throttle(privateApi.onResize, 200),

    afterInit: function(chartInstance) {
        var breakPoints, updateChart;

            breakPoints = privateApi.getUserDefinedBreakpoints(chartInstance);
            privateApi.updateConfigAtBreakpoint({ size: chartInstance.width, breakPoints: breakPoints, chartInstance: chartInstance }, true);
    }
});

Chart.pluginService.register(new HyperResponsiveChartsPlugin());

},{"Chart":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9saWIvX2VtcHR5LmpzIiwic3JjL2h5cGVyLnJlc3BvbnNpdmUuY2hhcnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIiIsInZhciBDaGFydCxcbiAgICBIeXBlclJlc3BvbnNpdmVDaGFydHNQbHVnaW4sXG4gICAgcHJpdmF0ZUFwaTtcblxuQ2hhcnQgPSByZXF1aXJlKCdDaGFydCcpO1xuQ2hhcnQgPSB0eXBlb2YgKENoYXJ0KSA9PT0gJ2Z1bmN0aW9uJyA/IENoYXJ0IDogd2luZG93LkNoYXJ0O1xucHJpdmF0ZUFwaSA9IHt9O1xucHJpdmF0ZUFwaS5zZWxlY3RlZEJyZWFrUG9pbnQgPSBmYWxzZTtcbnByaXZhdGVBcGkuaGVscGVycyA9IENoYXJ0LmhlbHBlcnM7XG5cbnByaXZhdGVBcGkuZ2V0VXNlckRlZmluZWRCcmVha3BvaW50cyA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICB2YXIgYnJlYWtQb2ludHM7XG5cbiAgICBicmVha1BvaW50cyA9IGZhbHNlO1xuICAgIGlmIChjb25maWcub3B0aW9ucy5yZXNwb25zaXZlQnJlYWtQb2ludENvbmZpZykge1xuICAgICAgICBicmVha1BvaW50cyA9IE9iamVjdC5rZXlzKGNvbmZpZy5vcHRpb25zLnJlc3BvbnNpdmVCcmVha1BvaW50Q29uZmlnLmJyZWFrUG9pbnRzKTtcbiAgICAgICAgYnJlYWtQb2ludHMgPSBicmVha1BvaW50cy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYSAtIGI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBicmVha1BvaW50cztcbn07XG5cbnByaXZhdGVBcGkucGx1Z2luQ29uZmlnU2V0ID0gZnVuY3Rpb24gKGFyZ09iaikge1xuICAgIHZhciByZXN1bHQsIGNvbmZpZztcblxuICAgIGlmIChhcmdPYmogJiYgYXJnT2JqLmNoYXJ0SW5zdGFuY2Uub3B0aW9ucy5yZXNwb25zaXZlQnJlYWtQb2ludENvbmZpZyAmJiBhcmdPYmouY2hhcnRJbnN0YW5jZS5vcHRpb25zLnJlc3BvbnNpdmUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG5wcml2YXRlQXBpLnVwZGF0ZUNvbmZpZ0F0QnJlYWtwb2ludCA9IGZ1bmN0aW9uIChhcmdPYmosIHN1cHJlc3NSZWRyYXcpIHtcbiAgICB2YXIgY29uZmlnLCBjdXJyZW50QnJlYWtQb2ludCwgaSwgbWF4O1xuXG4gICAgaWYgKHByaXZhdGVBcGkucGx1Z2luQ29uZmlnU2V0KGFyZ09iaikpIHtcbiAgICAgICAgY29uZmlnID0gYXJnT2JqLmNoYXJ0SW5zdGFuY2UuY29uZmlnO1xuXG4gICAgICAgIC8vY2hhbmdlIGNvbmZpZyBiYWNrIHRvIGRlZmF1bHQgYXQgbm9uIHNwZWNpZmllZCBicmVha3BvaW50c1xuICAgICAgICBpZiAoYXJnT2JqLnNpemUgPiBwYXJzZUludChhcmdPYmouYnJlYWtQb2ludHNbYXJnT2JqLmJyZWFrUG9pbnRzLmxlbmd0aCAtIDFdLCAxMCkpIHtcbiAgICAgICAgICAgIGNvbmZpZyA9IGNvbmZpZy5vcHRpb25zLnJlc3BvbnNpdmVCcmVha1BvaW50Q29uZmlnLmRlZmF1bHRDb25maWcoY29uZmlnKTtcbiAgICAgICAgICAgIGlmICghc3VwcmVzc1JlZHJhdylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBhcmdPYmouY2hhcnRJbnN0YW5jZS51cGRhdGUoMCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vbG9vcCB1c2VyIGRlZmluZWQgYnJlYWtwb2ludHMgYW5kIHVwZGF0ZSBjb25maWcgd2hlbiByZXF1aXJlZFxuICAgICAgICBmb3IgKGkgPSAwLCBtYXggPSBhcmdPYmouYnJlYWtQb2ludHMubGVuZ3RoOyBpIDwgbWF4OyBpICs9IDEpIHtcbiAgICAgICAgICAgIGN1cnJlbnRCcmVha1BvaW50ID0gYXJnT2JqLmJyZWFrUG9pbnRzW2ldO1xuICAgICAgICAgICAgaWYgKGFyZ09iai5zaXplIDwgY3VycmVudEJyZWFrUG9pbnQpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEJyZWFrUG9pbnQgPSBjdXJyZW50QnJlYWtQb2ludDtcbiAgICAgICAgICAgICAgICBjb25maWcub3B0aW9ucy5yZXNwb25zaXZlQnJlYWtQb2ludENvbmZpZy5icmVha1BvaW50c1tjdXJyZW50QnJlYWtQb2ludF0oY29uZmlnKTtcbiAgICAgICAgICAgICAgICBpZiAoIXN1cHJlc3NSZWRyYXcpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBhcmdPYmouY2hhcnRJbnN0YW5jZS51cGRhdGUoMCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNzA3ODQwMS82Mjg5ODkwXG5wcml2YXRlQXBpLnRocm90dGxlID0gZnVuY3Rpb24gKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgICB2YXIgY29udGV4dCwgYXJncywgcmVzdWx0LCBsYXRlcixcbiAgICAgICAgdGltZW91dCA9IG51bGwsXG4gICAgICAgIHByZXZpb3VzID0gMDtcblxuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0ge307XG4gICAgfVxuXG4gICAgbGF0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHByZXZpb3VzID0gb3B0aW9ucy5sZWFkaW5nID09PSBmYWxzZSA/IDAgOiBEYXRlLm5vdygpO1xuICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcblxuICAgICAgICBpZiAoIXRpbWVvdXQpIHtcbiAgICAgICAgICAgIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbm93ID0gRGF0ZS5ub3coKSxcbiAgICAgICAgICAgIHJlbWFpbmluZyA9IHdhaXQgLSAobm93IC0gcHJldmlvdXMpO1xuXG4gICAgICAgIGlmICghcHJldmlvdXMgJiYgb3B0aW9ucy5sZWFkaW5nID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcHJldmlvdXMgPSBub3c7XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0ID0gdGhpcztcbiAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcblxuICAgICAgICBpZiAocmVtYWluaW5nIDw9IDAgfHwgcmVtYWluaW5nID4gd2FpdCkge1xuICAgICAgICAgICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHByZXZpb3VzID0gbm93O1xuICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcblxuICAgICAgICAgICAgaWYgKCF0aW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCF0aW1lb3V0ICYmIG9wdGlvbnMudHJhaWxpbmcgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgcmVtYWluaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn07XG5cbnByaXZhdGVBcGkub25SZXNpemUgPSBmdW5jdGlvbiAoY2hhcnRJbnN0YW5jZSwgc2l6ZSkge1xuICAgIHZhciBicmVha1BvaW50cywgdXBkYXRlQ2hhcnQ7XG5cbiAgICBicmVha1BvaW50cyA9IHByaXZhdGVBcGkuZ2V0VXNlckRlZmluZWRCcmVha3BvaW50cyhjaGFydEluc3RhbmNlKTtcbiAgICBwcml2YXRlQXBpLnVwZGF0ZUNvbmZpZ0F0QnJlYWtwb2ludCh7IHNpemU6IHNpemUud2lkdGgsIGJyZWFrUG9pbnRzOiBicmVha1BvaW50cywgY2hhcnRJbnN0YW5jZTogY2hhcnRJbnN0YW5jZSB9LCB0cnVlKTtcbn07XG5cbkh5cGVyUmVzcG9uc2l2ZUNoYXJ0c1BsdWdpbiA9IENoYXJ0LlBsdWdpbkJhc2UuZXh0ZW5kKHtcbiAgICByZXNpemU6IHByaXZhdGVBcGkudGhyb3R0bGUocHJpdmF0ZUFwaS5vblJlc2l6ZSwgMjAwKSxcblxuICAgIGFmdGVySW5pdDogZnVuY3Rpb24oY2hhcnRJbnN0YW5jZSkge1xuICAgICAgICB2YXIgYnJlYWtQb2ludHMsIHVwZGF0ZUNoYXJ0O1xuXG4gICAgICAgICAgICBicmVha1BvaW50cyA9IHByaXZhdGVBcGkuZ2V0VXNlckRlZmluZWRCcmVha3BvaW50cyhjaGFydEluc3RhbmNlKTtcbiAgICAgICAgICAgIHByaXZhdGVBcGkudXBkYXRlQ29uZmlnQXRCcmVha3BvaW50KHsgc2l6ZTogY2hhcnRJbnN0YW5jZS53aWR0aCwgYnJlYWtQb2ludHM6IGJyZWFrUG9pbnRzLCBjaGFydEluc3RhbmNlOiBjaGFydEluc3RhbmNlIH0sIHRydWUpO1xuICAgIH1cbn0pO1xuXG5DaGFydC5wbHVnaW5TZXJ2aWNlLnJlZ2lzdGVyKG5ldyBIeXBlclJlc3BvbnNpdmVDaGFydHNQbHVnaW4oKSk7XG4iXX0=
