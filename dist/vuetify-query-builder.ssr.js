'use strict';function _typeof(obj) {
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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var deepClone = function deepClone(obj) {
  if (Array.isArray(obj)) {
    return obj.map(deepClone);
  } else if (obj && _typeof(obj) === 'object') {
    var cloned = {};
    Object.keys(obj).forEach(function (key) {
      cloned[key] = deepClone(obj[key]);
    });
    return cloned;
  } else {
    return obj;
  }
};

var operatorToText = function operatorToText(operator) {
  switch (operator) {
    case OperatorType.EQUAL:
      return "is equal";

    case OperatorType.N_EQUAL:
      return "is not equal";

    case OperatorType.CONTAINS:
      return "contains";

    case OperatorType.N_CONTAINS:
      return "not contains";

    case OperatorType.EMPTY:
      return "is empty";

    case OperatorType.N_EMPTY:
      return "is not empty";

    case OperatorType.BEGINS_WITH:
      return "begins with";

    case OperatorType.ENDS_WITH:
      return "ends with";

    case OperatorType.GREATER:
      return "is greater";

    case OperatorType.GREATER_OR_EQUAL:
      return "is greater or equals";

    case OperatorType.SMALLER:
      return "is smaller";

    case OperatorType.SMALLER_OR_EQUAL:
      return "is smaller or equals";
  }

  return "--- error, not defined ---";
};

var mapOperators = function mapOperators(operatorsArray) {
  return operatorsArray.map(function (x) {
    return {
      text: operatorToText(x),
      value: x
    };
  });
};
var RuleTypes = {
  NUMBER: 0,
  TEXT: 1,
  SELECT: 2,
  MULTI_SELECT: 3,
  DATE: 4,
  TIME: 5,
  BOOL: 6,
  AGGREGATE: 7,
  BOOL_INPUT: 8,
  CURRENCY: 9
};
var OperatorType = {
  EQUAL: 0,
  N_EQUAL: 1,
  CONTAINS: 2,
  N_CONTAINS: 3,
  EMPTY: 4,
  N_EMPTY: 5,
  BEGINS_WITH: 6,
  ENDS_WITH: 7,
  GREATER: 8,
  GREATER_OR_EQUAL: 9,
  SMALLER: 10,
  SMALLER_OR_EQUAL: 11
};//
var script = {
  name: "query-builder-rule",
  props: ['query', 'index', 'rule', 'labels'],
  data: function data() {
    return {
      modal: false,
      date: null,
      modal2: false,
      time: null,
      boolOptions: [{
        text: "TRUE",
        value: true
      }, {
        text: "FALSE",
        value: false
      }],
      RuleTypes: RuleTypes,
      OperatorType: OperatorType,
      mappedOperators: mapOperators(this.rule.operators)
    };
  },
  beforeMount: function beforeMount() {
    if (this.rule.type === 'custom-component') {
      this.$options.components[this.id] = this.rule.component;
    }
  },
  methods: {
    remove: function remove() {
      this.$emit('child-deletion-requested', this.index);
    },
    updateQuery: function updateQuery(value) {
      var updated_query = deepClone(this.query);
      updated_query.value = value;
      this.$emit('update:query', updated_query);
    }
  },
  computed: {
    selectOptions: function selectOptions() {
      if (typeof this.rule.options === 'undefined') {
        return {};
      }

      return this.rule.options.map(function (x) {
        return {
          text: x.label,
          value: x.value
        };
      });
    }
  },
  mounted: function mounted() {
    var updated_query = deepClone(this.query); // Set a default value for these types if one isn't provided already

    if (this.query.value === null) {
      if (this.rule.inputType === 'checkbox') {
        updated_query.value = [];
      }

      if (this.rule.type === 'select') {
        updated_query.value = this.rule.choices[0].value;
      }

      if (this.rule.type === 'custom-component') {
        updated_query.value = this.rule.default || null;
      }

      this.$emit('update:query', updated_query);
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('v-card', {
    staticClass: "vqb-rule"
  }, [_c('v-card-text', [_c('v-btn', {
    staticClass: "remove-button",
    attrs: {
      "color": "error",
      "x-small": ""
    },
    on: {
      "click": _vm.remove
    }
  }, [_c('v-icon', {
    attrs: {
      "x-small": ""
    }
  }, [_vm._v("fa-times")])], 1), _vm._v(" "), _c('v-row', [_c('v-col', {
    staticClass: "d-flex align-center text-break",
    attrs: {
      "cols": "12",
      "sm": "6",
      "md": "2"
    }
  }, [_c('b', [_vm._v(_vm._s(_vm.rule.label))])]), _vm._v(" "), _c('v-col', {
    attrs: {
      "cols": "12",
      "sm": "6",
      "md": "4"
    }
  }, [_c('v-select', {
    attrs: {
      "hide-details": "",
      "items": _vm.mappedOperators,
      "outlined": "",
      "dense": "",
      "label": "Rule"
    },
    model: {
      value: _vm.query.operator,
      callback: function callback($$v) {
        _vm.$set(_vm.query, "operator", $$v);
      },
      expression: "query.operator"
    }
  })], 1), _vm._v(" "), _vm.query.operator !== _vm.OperatorType.EMPTY && _vm.query.operator !== _vm.OperatorType.N_EMPTY ? _c('v-col', {
    attrs: {
      "cols": "12",
      "sm": "12",
      "md": "6"
    }
  }, [_vm.rule.inputType === _vm.RuleTypes.TEXT ? _c('v-text-field', {
    attrs: {
      "hide-details": "",
      "outlined": "",
      "type": "text",
      "dense": "",
      "label": "Value"
    },
    model: {
      value: _vm.query.value,
      callback: function callback($$v) {
        _vm.$set(_vm.query, "value", $$v);
      },
      expression: "query.value"
    }
  }) : _vm._e(), _vm._v(" "), _vm.rule.inputType === _vm.RuleTypes.NUMBER || _vm.rule.inputType === _vm.RuleTypes.AGGREGATE || _vm.rule.inputType === _vm.RuleTypes.CURRENCY ? _c('v-text-field', {
    attrs: {
      "hide-details": "",
      "outlined": "",
      "type": "number",
      "dense": "",
      "label": "Value"
    },
    model: {
      value: _vm.query.value,
      callback: function callback($$v) {
        _vm.$set(_vm.query, "value", $$v);
      },
      expression: "query.value"
    }
  }) : _vm._e(), _vm._v(" "), _vm.rule.inputType === _vm.RuleTypes.SELECT || _vm.rule.inputType === _vm.RuleTypes.MULTI_SELECT ? _c('v-select', {
    attrs: {
      "hide-details": "",
      "dense": "",
      "items": _vm.selectOptions,
      "multiple": _vm.rule.inputType === _vm.RuleTypes.MULTI_SELECT,
      "outlined": "",
      "label": "Value"
    },
    model: {
      value: _vm.query.value,
      callback: function callback($$v) {
        _vm.$set(_vm.query, "value", $$v);
      },
      expression: "query.value"
    }
  }) : _vm._e(), _vm._v(" "), _vm.rule.inputType === _vm.RuleTypes.BOOL || _vm.rule.inputType === _vm.RuleTypes.BOOL_INPUT ? _c('v-select', {
    attrs: {
      "hide-details": "",
      "dense": "",
      "items": _vm.boolOptions,
      "outlined": "",
      "label": "Value"
    },
    model: {
      value: _vm.query.value,
      callback: function callback($$v) {
        _vm.$set(_vm.query, "value", $$v);
      },
      expression: "query.value"
    }
  }) : _vm._e(), _vm._v(" "), _vm.rule.inputType === _vm.RuleTypes.DATE ? _c('v-dialog', {
    ref: "dialog2",
    attrs: {
      "return-value": _vm.query.value,
      "persistent": "",
      "width": "290px"
    },
    on: {
      "update:returnValue": function updateReturnValue($event) {
        return _vm.$set(_vm.query, "value", $event);
      },
      "update:return-value": function updateReturnValue($event) {
        return _vm.$set(_vm.query, "value", $event);
      }
    },
    scopedSlots: _vm._u([{
      key: "activator",
      fn: function fn(ref) {
        var on = ref.on;
        return [_c('v-text-field', _vm._g({
          attrs: {
            "outlined": "",
            "label": "Value",
            "dense": "",
            "prepend-icon": "far fa-calendar-alt",
            "readonly": ""
          },
          model: {
            value: _vm.query.value,
            callback: function callback($$v) {
              _vm.$set(_vm.query, "value", $$v);
            },
            expression: "query.value"
          }
        }, on))];
      }
    }], null, false, 405712533),
    model: {
      value: _vm.modal,
      callback: function callback($$v) {
        _vm.modal = $$v;
      },
      expression: "modal"
    }
  }, [_vm._v(" "), _vm.modal ? _c('v-date-picker', {
    attrs: {
      "full-width": ""
    },
    model: {
      value: _vm.query.value,
      callback: function callback($$v) {
        _vm.$set(_vm.query, "value", $$v);
      },
      expression: "query.value"
    }
  }, [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    attrs: {
      "outlined": "",
      "color": "primary"
    },
    on: {
      "click": function click($event) {
        _vm.modal = false;
      }
    }
  }, [_vm._v("Cancel")]), _vm._v(" "), _c('v-btn', {
    attrs: {
      "color": "primary"
    },
    on: {
      "click": function click($event) {
        return _vm.$refs.dialog2.save(_vm.query.value);
      }
    }
  }, [_vm._v("OK")])], 1) : _vm._e()], 1) : _vm._e(), _vm._v(" "), _vm.rule.inputType === _vm.RuleTypes.TIME ? _c('v-dialog', {
    ref: "dialog",
    attrs: {
      "return-value": _vm.query.value,
      "persistent": "",
      "width": "290px"
    },
    on: {
      "update:returnValue": function updateReturnValue($event) {
        return _vm.$set(_vm.query, "value", $event);
      },
      "update:return-value": function updateReturnValue($event) {
        return _vm.$set(_vm.query, "value", $event);
      }
    },
    scopedSlots: _vm._u([{
      key: "activator",
      fn: function fn(ref) {
        var on = ref.on;
        return [_c('v-text-field', _vm._g({
          attrs: {
            "outlined": "",
            "label": "Value",
            "dense": "",
            "prepend-icon": "far fa-clock",
            "readonly": ""
          },
          model: {
            value: _vm.query.value,
            callback: function callback($$v) {
              _vm.$set(_vm.query, "value", $$v);
            },
            expression: "query.value"
          }
        }, on))];
      }
    }], null, false, 2329567163),
    model: {
      value: _vm.modal2,
      callback: function callback($$v) {
        _vm.modal2 = $$v;
      },
      expression: "modal2"
    }
  }, [_vm._v(" "), _vm.modal2 ? _c('v-time-picker', {
    attrs: {
      "full-width": ""
    },
    model: {
      value: _vm.query.value,
      callback: function callback($$v) {
        _vm.$set(_vm.query, "value", $$v);
      },
      expression: "query.value"
    }
  }, [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    attrs: {
      "outlined": "",
      "color": "primary"
    },
    on: {
      "click": function click($event) {
        _vm.modal2 = false;
      }
    }
  }, [_vm._v("Cancel")]), _vm._v(" "), _c('v-btn', {
    attrs: {
      "color": "primary"
    },
    on: {
      "click": function click($event) {
        return _vm.$refs.dialog.save(_vm.query.value);
      }
    }
  }, [_vm._v("OK")])], 1) : _vm._e()], 1) : _vm._e()], 1) : _vm._e()], 1)], 1)], 1);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-e73c9384";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);//
var script$1 = {
  name: "query-builder-group",
  components: {
    QueryBuilderRule: __vue_component__
  },
  props: ['ruleTypes', 'type', 'query', 'rules', 'index', 'maxDepth', 'depth', 'labels'],
  methods: {
    tryAddRule: function tryAddRule() {
      this.showRuleDialog = true;
    },
    ruleById: function ruleById(ruleId) {
      return this.rules.find(function (x) {
        return x.id === ruleId;
      });
    },
    addRule: function addRule() {
      this.showRuleDialog = false;
      var updated_query = deepClone(this.query);
      updated_query.children.push({
        type: 'rule',
        query: {
          id: this.selectedRule.id,
          operator: this.selectedRule.operators[0],
          value: null,
          ruleType: this.selectedRule.type
        }
      });
      this.$emit('update:query', updated_query);
    },
    addGroup: function addGroup() {
      var updated_query = deepClone(this.query);

      if (this.depth < this.maxDepth) {
        updated_query.children.push({
          type: 'group',
          query: {
            operator: this.labels.matchTypeAll,
            children: []
          }
        });
        this.$emit('update:query', updated_query);
      }
    },
    remove: function remove() {
      this.$emit('child-deletion-requested', this.index);
    },
    removeChild: function removeChild(index) {
      var updated_query = deepClone(this.query);
      updated_query.children.splice(index, 1);
      this.$emit('update:query', updated_query);
    },
    prepareRules: function prepareRules(newValue) {
      var rulesId = this.rulesList.map(function (x) {
        return "".concat(x.value.id);
      });
      var updated_query = deepClone(newValue);
      var startCount = updated_query.children.length;
      updated_query.children = updated_query.children.filter(function (x) {
        return x.type !== 'rule' || rulesId.includes("".concat(x.query.id));
      });
      var endCount = updated_query.children.length;
      if (startCount !== endCount) this.$emit('update:query', updated_query);
    }
  },
  data: function data() {
    return {
      showRuleDialog: false,
      fab: false,
      selectedRule: this.rules[0],
      logicalOperatorList: [this.labels.matchTypeAll, this.labels.matchTypeAny]
    };
  },
  watch: {
    query: {
      deep: true,
      handler: function handler(newValue) {
        this.prepareRules(newValue);
      }
    }
  },
  computed: {
    rulesList: function rulesList() {
      return this.rules.map(function (x) {
        return {
          text: x.label,
          value: x
        };
      });
    },
    classObject: function classObject() {
      var classObject = {};
      classObject['depth-' + this.depth.toString()] = true;
      return classObject;
    }
  },
  mounted: function mounted() {
    this.prepareRules(this.query);
  }
};function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('v-card', {
    staticClass: "vqb-group",
    class: _vm.classObject
  }, [_c('v-card-title', [_c('v-select', {
    attrs: {
      "items": _vm.logicalOperatorList,
      "label": _vm.labels.matchType,
      "outlined": "",
      "hide-details": "",
      "dense": ""
    },
    model: {
      value: _vm.query.operator,
      callback: function callback($$v) {
        _vm.$set(_vm.query, "operator", $$v);
      },
      expression: "query.operator"
    }
  }), _vm._v(" "), this.depth > 1 ? _c('v-btn', {
    staticClass: "remove-button",
    attrs: {
      "color": "error",
      "x-small": ""
    },
    on: {
      "click": _vm.remove
    }
  }, [_c('v-icon', {
    attrs: {
      "x-small": ""
    }
  }, [_vm._v("fa-times")])], 1) : _vm._e()], 1), _vm._v(" "), _c('v-card-text', [_c('v-row', [_c('v-col', {
    attrs: {
      "cols": "12"
    }
  }, [_c('v-divider')], 1), _vm._v(" "), _c('v-col', {
    staticClass: "speed-dial-container",
    attrs: {
      "cols": "12"
    }
  }, [_c('v-btn', {
    attrs: {
      "color": "primary",
      "small": ""
    },
    on: {
      "click": _vm.tryAddRule
    }
  }, [_vm._v("\n                    Add Rule\n                ")]), _vm._v(" "), this.depth < this.maxDepth ? _c('v-btn', {
    attrs: {
      "color": "primary",
      "small": ""
    },
    on: {
      "click": _vm.addGroup
    }
  }, [_vm._v("\n                    Add Groups\n                ")]) : _vm._e()], 1), _vm._v(" "), _c('v-col', {
    attrs: {
      "cols": "12"
    }
  }, [_c('div', {
    staticClass: "group-child px-5 py-2"
  }, [_vm.query.children.length === 0 ? _c('v-alert', {
    attrs: {
      "dense": "",
      "text": "",
      "type": "info"
    }
  }, [_vm._v("\n                        No rules here! Add some "), _c('b', [_vm._v("rules")]), _vm._v(" or "), _c('b', [_vm._v("group of rules")]), _vm._v(" using button above.\n                    ")]) : _vm._e(), _vm._v(" "), _vm._l(_vm.query.children, function (child, index) {
    return _c(child.type === 'rule' ? 'query-builder-rule' : 'query-builder-group', {
      key: index,
      tag: "component",
      attrs: {
        "type": child.type,
        "query": child.query,
        "ruleTypes": _vm.ruleTypes,
        "rules": _vm.rules,
        "rule": _vm.ruleById(child.query.id),
        "index": index,
        "maxDepth": _vm.maxDepth,
        "depth": _vm.depth + 1,
        "labels": _vm.labels
      },
      on: {
        "update:query": function updateQuery($event) {
          return _vm.$set(child, "query", $event);
        },
        "child-deletion-requested": _vm.removeChild
      }
    });
  })], 2)])], 1)], 1), _vm._v(" "), _c('v-dialog', {
    attrs: {
      "persistent": "",
      "max-width": "800"
    },
    model: {
      value: _vm.showRuleDialog,
      callback: function callback($$v) {
        _vm.showRuleDialog = $$v;
      },
      expression: "showRuleDialog"
    }
  }, [_c('v-card', [_c('v-card-title', {
    staticClass: "headline"
  }, [_vm._v("Add new rule")]), _vm._v(" "), _c('v-card-text', [_c('p', [_vm._v("Select an element to describe the rules")]), _vm._v(" "), _c('v-autocomplete', {
    attrs: {
      "items": _vm.rulesList,
      "label": "Select rule",
      "outlined": ""
    },
    model: {
      value: _vm.selectedRule,
      callback: function callback($$v) {
        _vm.selectedRule = $$v;
      },
      expression: "selectedRule"
    }
  })], 1), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    attrs: {
      "color": "primary",
      "text": ""
    },
    on: {
      "click": function click($event) {
        _vm.showRuleDialog = false;
      }
    }
  }, [_vm._v("Cancel")]), _vm._v(" "), _c('v-btn', {
    attrs: {
      "color": "primary"
    },
    on: {
      "click": _vm.addRule
    }
  }, [_vm._v("Add new rule")])], 1)], 1)], 1)], 1);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-49d1e684_0", {
    source: ".group-child>div:not(:first-of-type){margin-top:25px}.vqb-group .remove-button{position:absolute;right:10px;top:-10px}.speed-dial-container{margin-top:-39px}.speed-dial-container button{margin-right:5px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = "data-v-49d1e684";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, createInjectorSSR, undefined);var defaultLabels = {
  matchType: "Match Type",
  matchTypeAll: "All",
  matchTypeAny: "Any",
  addRule: "Add Rule",
  removeRule: "&times;",
  addGroup: "Add Group",
  removeGroup: "&times;",
  textInputPlaceholder: "value"
};
var script$2 = {
  name: 'vuetify-query-builder',
  components: {
    QueryBuilderGroup: __vue_component__$1
  },
  props: {
    rules: Array,
    labels: {
      type: Object,
      default: function _default() {
        return defaultLabels;
      }
    },
    maxDepth: {
      type: Number,
      default: 3,
      validator: function validator(value) {
        return value >= 1;
      }
    },
    value: Object
  },
  data: function data() {
    var _ruleTypes;

    return {
      depth: 1,
      query: {
        operator: "All",
        children: []
      },
      ruleTypes: (_ruleTypes = {}, _defineProperty(_ruleTypes, RuleTypes.AGGREGATE, {
        operators: [OperatorType.EQUAL, OperatorType.N_EQUAL, OperatorType.EMPTY, OperatorType.N_EMPTY, OperatorType.GREATER, OperatorType.GREATER_OR_EQUAL, OperatorType.SMALLER, OperatorType.SMALLER_OR_EQUAL],
        inputType: RuleTypes.AGGREGATE
      }), _defineProperty(_ruleTypes, RuleTypes.DATE, {
        operators: [OperatorType.EQUAL, OperatorType.N_EQUAL, OperatorType.EMPTY, OperatorType.N_EMPTY, OperatorType.GREATER, OperatorType.GREATER_OR_EQUAL, OperatorType.SMALLER, OperatorType.SMALLER_OR_EQUAL],
        inputType: RuleTypes.DATE
      }), _defineProperty(_ruleTypes, RuleTypes.TIME, {
        operators: [OperatorType.EQUAL, OperatorType.N_EQUAL, OperatorType.EMPTY, OperatorType.N_EMPTY, OperatorType.GREATER, OperatorType.GREATER_OR_EQUAL, OperatorType.SMALLER, OperatorType.SMALLER_OR_EQUAL],
        inputType: RuleTypes.TIME
      }), _defineProperty(_ruleTypes, RuleTypes.BOOL, {
        operators: [OperatorType.EQUAL, OperatorType.N_EQUAL, OperatorType.EMPTY, OperatorType.N_EMPTY],
        inputType: RuleTypes.BOOL
      }), _defineProperty(_ruleTypes, RuleTypes.BOOL_INPUT, {
        operators: [OperatorType.EQUAL, OperatorType.N_EQUAL, OperatorType.EMPTY, OperatorType.N_EMPTY],
        inputType: RuleTypes.BOOL_INPUT
      }), _defineProperty(_ruleTypes, RuleTypes.TEXT, {
        operators: [OperatorType.EQUAL, OperatorType.N_EQUAL, OperatorType.CONTAINS, OperatorType.N_CONTAINS, OperatorType.EMPTY, OperatorType.N_EMPTY, OperatorType.BEGINS_WITH, OperatorType.ENDS_WITH],
        inputType: RuleTypes.TEXT
      }), _defineProperty(_ruleTypes, RuleTypes.NUMBER, {
        operators: [OperatorType.EQUAL, OperatorType.N_EQUAL, OperatorType.CONTAINS, OperatorType.N_CONTAINS, OperatorType.GREATER, OperatorType.GREATER_OR_EQUAL, OperatorType.SMALLER, OperatorType.SMALLER_OR_EQUAL],
        inputType: RuleTypes.NUMBER
      }), _defineProperty(_ruleTypes, RuleTypes.CURRENCY, {
        operators: [OperatorType.EQUAL, OperatorType.N_EQUAL, OperatorType.CONTAINS, OperatorType.N_CONTAINS, OperatorType.GREATER, OperatorType.GREATER_OR_EQUAL, OperatorType.SMALLER, OperatorType.SMALLER_OR_EQUAL],
        inputType: RuleTypes.NUMBER
      }), _defineProperty(_ruleTypes, RuleTypes.SELECT, {
        operators: [OperatorType.EQUAL, OperatorType.N_EQUAL],
        inputType: RuleTypes.SELECT
      }), _defineProperty(_ruleTypes, RuleTypes.MULTI_SELECT, {
        operators: [OperatorType.EQUAL, OperatorType.N_EQUAL, OperatorType.CONTAINS, OperatorType.N_CONTAINS, OperatorType.GREATER, OperatorType.GREATER_OR_EQUAL, OperatorType.SMALLER, OperatorType.SMALLER_OR_EQUAL, OperatorType.EMPTY, OperatorType.N_EMPTY],
        inputType: RuleTypes.MULTI_SELECT
      }), _ruleTypes)
    };
  },
  computed: {
    mergedLabels: function mergedLabels() {
      return Object.assign({}, defaultLabels, this.labels);
    },
    mergedRules: function mergedRules() {
      var mergedRules = [];
      var self = this;
      this.rules.forEach(function (rule) {
        if (typeof self.ruleTypes[rule.type] !== "undefined") {
          mergedRules.push(Object.assign({}, self.ruleTypes[rule.type], rule));
        } else {
          mergedRules.push(rule);
        }
      });
      return mergedRules;
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$watch('query', function (newQuery) {
      _this.$emit('input', deepClone(newQuery));
    }, {
      deep: true
    });

    if (typeof this.$options.propsData.value !== "undefined") {
      this.query = Object.assign(this.query, this.$options.propsData.value);
    }
  }
};/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vue-query-builder vue-query-builder-styled"
  }, [_c('query-builder-group', {
    attrs: {
      "index": 0,
      "query": _vm.query,
      "ruleTypes": _vm.ruleTypes,
      "rules": _vm.mergedRules,
      "maxDepth": _vm.maxDepth,
      "depth": _vm.depth,
      "labels": _vm.mergedLabels,
      "type": "query-builder-group"
    },
    on: {
      "update:query": function updateQuery($event) {
        _vm.query = $event;
      }
    }
  })], 1);
};

var __vue_staticRenderFns__$2 = [];
/* style */

var __vue_inject_styles__$2 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-4d329766_0", {
    source: ".vue-query-builder-styled .vqb-group .rule-actions{margin-bottom:20px}.vue-query-builder-styled .vqb-rule{margin-top:15px;margin-bottom:15px}.vue-query-builder-styled .vqb-rule label{margin-right:10px}.vue-query-builder-styled .vqb-group.depth-1 .vqb-rule,.vue-query-builder-styled .vqb-group.depth-2{border-left:2px solid #8bc34a}.vue-query-builder-styled .vqb-group.depth-2 .vqb-rule,.vue-query-builder-styled .vqb-group.depth-3{border-left:2px solid #00bcd4}.vue-query-builder-styled .vqb-group.depth-3 .vqb-rule,.vue-query-builder-styled .vqb-group.depth-4{border-left:2px solid #ff5722}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$2 = undefined;
/* module identifier */

var __vue_module_identifier__$2 = "data-v-4d329766";
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, createInjectorSSR, undefined);// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var component = /*#__PURE__*/(function () {
  // Get component instance
  var installable = __vue_component__$2; // Attach install function executed by Vue.use()

  installable.install = function (Vue) {
    Vue.component('VuetifyQueryBuilder', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default': component});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;