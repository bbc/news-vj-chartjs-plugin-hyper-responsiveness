/*!
 * HyperResponsiveCharts.js
 * Version: 1.0.3
 *
 * Copyright 2016 BBC
 * Released under the Apache 2.0 license
 * https://github.com/bbc/news-vj-chartjs-plugin-hyper-responsiveness
 */
(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){

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

privateApi.updateConfigAtBreakpoint = function (argObj) {
    var config, currentBreakPoint, i, max;

    if (privateApi.pluginConfigSet(argObj)) {
        config = argObj.chartInstance.config;

        //change config back to default at non specified breakpoints
        if (argObj.size > parseInt(argObj.breakPoints[argObj.breakPoints.length - 1], 10)) {
            config = config.options.responsiveBreakPointConfig.defaultConfig(config);
            argObj.chartInstance.update(0, false);
            return true;
        }

        //loop user defined breakpoints and update config when required
        for (i = 0, max = argObj.breakPoints.length; i < max; i += 1) {
            currentBreakPoint = argObj.breakPoints[i];
            if (argObj.size < currentBreakPoint) {
                selectedBreakPoint = currentBreakPoint;
                config.options.responsiveBreakPointConfig.breakPoints[currentBreakPoint](config);
                argObj.chartInstance.update(0, false);
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
    privateApi.updateConfigAtBreakpoint({ size: size.width, breakPoints: breakPoints, chartInstance: chartInstance });
};

HyperResponsiveChartsPlugin = Chart.PluginBase.extend({
    resize: privateApi.throttle(privateApi.onResize, 200)
});

Chart.pluginService.register(new HyperResponsiveChartsPlugin());

},{"Chart":1}]},{},[2]);
