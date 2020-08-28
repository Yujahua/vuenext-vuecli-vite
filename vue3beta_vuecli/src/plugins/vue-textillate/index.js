/**
 * 
 * vue-textillate
 * (c) 2020 Yu Jahua
 * @version v0.1.0
 * @description develop plugin for vue 3, codding jQuery-like style
 * @email yujahua@163.com
 * @github https://github.com/Yujahua/vue-textillate/tree/Native
 * @license MIT 
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
    ? module.exports = factory()
    : /* global define: readonly */typeof define === 'function' && define.amd 
        ? define(factory)
        : (global = global || self, global.textillate = factory());
    
})(this, function() {
    'use strict';

    var
        _Vue,
        version = '0.1.0';

    // Inner private method start
    function assert (condition, message) {
        if(!condition) {
            throw new Error(('[vue-textillate] ' + message))
        }
    }

    /*
    function warn (condition, message) {
        if(!condition) {
            typeof console !== 'undefined' && console.warn(('[vue-textillate] ' + message))
        }
    }
    */

    function extend (a, b) {
        for(var key in b) {
            a[key] = b[key];
        }
        return a;
    }

    // env
    var inBrowser = typeof window !== 'undefined';

    // Install for plugin
    function install(Vue) {
        console.log(Vue)
        if(install.installed && _Vue === Vue) { return }
        install.installed = true;

        _Vue = Vue;

        var isDef = function (v) {return v!= undefined; };

        var registerInstance = function(vm, callV) {
            var i = vm.config.globalProperties;
            if(isDef(i) && !isDef(i['textillate'])) {
                extend(i, {'textillate': callV})
            }
        };

        // Global mixin 
        // cannot execute onMounted unMounted
        Vue.mixin({
            onMount: function onMounted() {
                VueTextillate.init(this);
                registerInstance(this, this)
            },
            unMounted: function unMounted() {
                registerInstance(this)
            }
        })
        
    }

    var VueTextillate = function VueTextillate(options) {
        if(options === void 0) { options = {} }

        this.app = null;

        var mode = options.mode || 'common';
        this.options = options;

        if(!inBrowser) {
            mode = 'abstract';
        }
        this.mode = mode;

        switch(mode) {
            case 'common':
                // support for common browser env

                break;
            case 'abstract':
                // support for node env

                break;
            default:
                assert(false, (
                    "invalid mode: " + mode
                ));
        }
    };

    // init for textillate
    VueTextillate.prototype.init = function init (app /* Vue component instance */) {

        assert(install.installed,
            "not installed. Make sure to call `Vue.use(VueTextillate)` " +
            "before creating root instance."    
        )

        this.app = app;
    }

    //

    VueTextillate.install = install;
    VueTextillate.version = version;
    
    if(inBrowser && window.Vue) {
        window.Vue.use(VueTextillate);
    }

    return VueTextillate;

})