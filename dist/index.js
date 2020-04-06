/*!
 * vue-cs-timeago v2.0.0
 * (c) Md Ummar Ali
 * Released under the MIT License.
 */
'use strict';

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var TimeAgo = /*#__PURE__*/function () {
  function TimeAgo(dateTime) {
    _classCallCheck(this, TimeAgo);

    this.dateTime = dateTime;
  }

  _createClass(TimeAgo, [{
    key: "time_ago",
    value: function time_ago() {
      var time = this.dateTime;

      switch (_typeof(time)) {
        case "number":
          break;

        case "string":
          time = +new Date(time);
          break;

        case "object":
          if (time.constructor === Date) time = time.getTime();
          break;

        default:
          time = +new Date();
      }

      var time_indexs = [[60, "seconds", 1], [120, "1 minute ago", "1 minute from now"], [3600, "minutes", 60], [7200, "1 hour ago", "1 hour from now"], [86400, "hours", 3600], [172800, "Yesterday", "Tomorrow"], [604800, "days", 86400], [1209600, "Last week", "Next week"], [2419200, "weeks", 604800], [4838400, "Last month", "Next month"], [29030400, "months", 2419200], [58060800, "Last year", "Next year"], [2903040000, "years", 29030400], [5806080000, "Last century", "Next century"], [58060800000, "centuries", 2903040000]];
      var seconds = (+new Date() - time) / 1000,
          message = "ago",
          pickup = 1;

      if (seconds == 0) {
        return "Just now";
      }

      if (seconds < 0) {
        seconds = Math.abs(seconds);
        message = "from now";
        pickup = 2;
      }

      var i = 0,
          index;

      while (index = time_indexs[i++]) {
        if (seconds < index[0]) {
          if (typeof index[2] == "string") return index[pickup];else return Math.floor(seconds / index[2]) + " " + index[1] + " " + message;
        }
      }

      return time;
    }
  }]);

  return TimeAgo;
}();

var factory = function factory(eventTime) {
  return new TimeAgo(eventTime).time_ago();
};

//
var script = {
  name: "CsTimeAgo",
  props: {
    datetime: {
      type: [String, Date, Number],
      "default": function _default() {
        return new Date();
      }
    },
    refresher: {
      type: [Number, Boolean],
      "default": true
    }
  },
  data: function data() {
    return {
      time_ago: "",
      intVal: null
    };
  },
  methods: {
    loadTimer: function loadTimer() {
      var time = factory(this.datetime);
      this.time_ago = time;
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.loadTimer();

      if (_this.refresher) {
        _this.refresher === true ? 60 : _this.refresher;
        _this.intVal = setInterval(_this.loadTimer, _this.refresher * 1000);
      }
    });
  },
  destroyed: function destroyed() {
    if (this.intVal) clearInterval(this.intVal);
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    attrs: {
      "id": "v-cstimeago"
    }
  }, [_vm._t("prepend"), _vm._v(" "), _c('span', {
    domProps: {
      "textContent": _vm._s(_vm.time_ago)
    }
  }), _vm._v(" "), _vm._t("append")], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

var index = {
  install: function install(Vue, options) {
    // Let's register our component globally
    // https://vuejs.org/v2/guide/components-registration.html
    Vue.component("cs-time-ago", __vue_component__);
  }
};

module.exports = index;
