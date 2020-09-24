(() => {
  let __defineProperty = Object.defineProperty;
  let __hasOwnProperty = Object.prototype.hasOwnProperty;
  let __commonJS = (callback) => {
    let module;
    return () => {
      if (!module) {
        module = {
          exports: {}
        };
        callback(module.exports, module);
      }
      return module.exports;
    };
  };
  let __toModule = (module) => {
    if (module && module.__esModule)
      return module;
    let result = {};
    __defineProperty(result, "default", {
      value: module,
      enumerable: true
    });
    for (let key in module)
      if (__hasOwnProperty.call(module, key) && key !== "default")
        __defineProperty(result, key, {
          get: () => module[key],
          enumerable: true
        });
    return result;
  };

  // src\_js\libs\prism.js
  var require_C_Users_brade_Documents_GitHub_bradeneast_com_src_js_libs_prism = __commonJS((exports, module) => {
    var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {};
    var Prism2 = function(u) {
      var c = /\blang(?:uage)?-([\w-]+)\b/i, n = 0, M = {
        manual: u.Prism && u.Prism.manual,
        disableWorkerMessageHandler: u.Prism && u.Prism.disableWorkerMessageHandler,
        util: {
          encode: function e2(n2) {
            return n2 instanceof W ? new W(n2.type, e2(n2.content), n2.alias) : Array.isArray(n2) ? n2.map(e2) : n2.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
          },
          type: function(e2) {
            return Object.prototype.toString.call(e2).slice(8, -1);
          },
          objId: function(e2) {
            return e2.__id || Object.defineProperty(e2, "__id", {
              value: ++n
            }), e2.__id;
          },
          clone: function t2(e2, r2) {
            var a, n2;
            switch (r2 = r2 || {}, M.util.type(e2)) {
              case "Object":
                if (n2 = M.util.objId(e2), r2[n2])
                  return r2[n2];
                for (var i2 in (a = {}, r2[n2] = a, e2))
                  e2.hasOwnProperty(i2) && (a[i2] = t2(e2[i2], r2));
                return a;
              case "Array":
                return n2 = M.util.objId(e2), r2[n2] ? r2[n2] : (a = [], r2[n2] = a, e2.forEach(function(e3, n3) {
                  a[n3] = t2(e3, r2);
                }), a);
              default:
                return e2;
            }
          },
          getLanguage: function(e2) {
            for (; e2 && !c.test(e2.className); )
              e2 = e2.parentElement;
            return e2 ? (e2.className.match(c) || [, "none"])[1].toLowerCase() : "none";
          },
          currentScript: function() {
            if ("undefined" == typeof document)
              return null;
            if ("currentScript" in document)
              return document.currentScript;
            try {
              throw new Error();
            } catch (e2) {
              var n2 = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e2.stack) || [])[1];
              if (n2) {
                var t2 = document.getElementsByTagName("script");
                for (var r2 in t2)
                  if (t2[r2].src == n2)
                    return t2[r2];
              }
              return null;
            }
          },
          isActive: function(e2, n2, t2) {
            for (var r2 = "no-" + n2; e2; ) {
              var a = e2.classList;
              if (a.contains(n2))
                return true;
              if (a.contains(r2))
                return false;
              e2 = e2.parentElement;
            }
            return !!t2;
          }
        },
        languages: {
          extend: function(e2, n2) {
            var t2 = M.util.clone(M.languages[e2]);
            for (var r2 in n2)
              t2[r2] = n2[r2];
            return t2;
          },
          insertBefore: function(t2, e2, n2, r2) {
            var a = (r2 = r2 || M.languages)[t2], i2 = {};
            for (var l in a)
              if (a.hasOwnProperty(l)) {
                if (l == e2)
                  for (var o in n2)
                    n2.hasOwnProperty(o) && (i2[o] = n2[o]);
                n2.hasOwnProperty(l) || (i2[l] = a[l]);
              }
            var s = r2[t2];
            return r2[t2] = i2, M.languages.DFS(M.languages, function(e3, n3) {
              n3 === s && e3 != t2 && (this[e3] = i2);
            }), i2;
          },
          DFS: function e2(n2, t2, r2, a) {
            a = a || {};
            var i2 = M.util.objId;
            for (var l in n2)
              if (n2.hasOwnProperty(l)) {
                t2.call(n2, l, n2[l], r2 || l);
                var o = n2[l], s = M.util.type(o);
                "Object" !== s || a[i2(o)] ? "Array" !== s || a[i2(o)] || (a[i2(o)] = true, e2(o, t2, l, a)) : (a[i2(o)] = true, e2(o, t2, null, a));
              }
          }
        },
        plugins: {},
        highlightAll: function(e2, n2) {
          M.highlightAllUnder(document, e2, n2);
        },
        highlightAllUnder: function(e2, n2, t2) {
          var r2 = {
            callback: t2,
            container: e2,
            selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
          };
          M.hooks.run("before-highlightall", r2), r2.elements = Array.prototype.slice.apply(r2.container.querySelectorAll(r2.selector)), M.hooks.run("before-all-elements-highlight", r2);
          for (var a, i2 = 0; a = r2.elements[i2++]; )
            M.highlightElement(a, true === n2, r2.callback);
        },
        highlightElement: function(e2, n2, t2) {
          var r2 = M.util.getLanguage(e2), a = M.languages[r2];
          e2.className = e2.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r2;
          var i2 = e2.parentElement;
          i2 && "pre" === i2.nodeName.toLowerCase() && (i2.className = i2.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r2);
          var l = {
            element: e2,
            language: r2,
            grammar: a,
            code: e2.textContent
          };
          function o(e3) {
            l.highlightedCode = e3, M.hooks.run("before-insert", l), l.element.innerHTML = l.highlightedCode, M.hooks.run("after-highlight", l), M.hooks.run("complete", l), t2 && t2.call(l.element);
          }
          if (M.hooks.run("before-sanity-check", l), !l.code)
            return M.hooks.run("complete", l), void (t2 && t2.call(l.element));
          if (M.hooks.run("before-highlight", l), l.grammar)
            if (n2 && u.Worker) {
              var s = new Worker(M.filename);
              s.onmessage = function(e3) {
                o(e3.data);
              }, s.postMessage(JSON.stringify({
                language: l.language,
                code: l.code,
                immediateClose: true
              }));
            } else
              o(M.highlight(l.code, l.grammar, l.language));
          else
            o(M.util.encode(l.code));
        },
        highlight: function(e2, n2, t2) {
          var r2 = {
            code: e2,
            grammar: n2,
            language: t2
          };
          return M.hooks.run("before-tokenize", r2), r2.tokens = M.tokenize(r2.code, r2.grammar), M.hooks.run("after-tokenize", r2), W.stringify(M.util.encode(r2.tokens), r2.language);
        },
        tokenize: function(e2, n2) {
          var t2 = n2.rest;
          if (t2) {
            for (var r2 in t2)
              n2[r2] = t2[r2];
            delete n2.rest;
          }
          var a = new i();
          return I(a, a.head, e2), function e3(n3, t3, r3, a2, i2, l) {
            for (var o in r3)
              if (r3.hasOwnProperty(o) && r3[o]) {
                var s = r3[o];
                s = Array.isArray(s) ? s : [s];
                for (var u2 = 0; u2 < s.length; ++u2) {
                  if (l && l.cause == o + "," + u2)
                    return;
                  var c2 = s[u2], g = c2.inside, f = !!c2.lookbehind, h = !!c2.greedy, d = 0, v = c2.alias;
                  if (h && !c2.pattern.global) {
                    var p = c2.pattern.toString().match(/[imsuy]*$/)[0];
                    c2.pattern = RegExp(c2.pattern.source, p + "g");
                  }
                  for (var m = c2.pattern || c2, y = a2.next, k = i2; y !== t3.tail && !(l && k >= l.reach); k += y.value.length, y = y.next) {
                    var b = y.value;
                    if (t3.length > n3.length)
                      return;
                    if (!(b instanceof W)) {
                      var x = 1;
                      if (h && y != t3.tail.prev) {
                        m.lastIndex = k;
                        var w = m.exec(n3);
                        if (!w)
                          break;
                        var A = w.index + (f && w[1] ? w[1].length : 0), P = w.index + w[0].length, S = k;
                        for (S += y.value.length; S <= A; )
                          y = y.next, S += y.value.length;
                        if (S -= y.value.length, k = S, y.value instanceof W)
                          continue;
                        for (var E = y; E !== t3.tail && (S < P || "string" == typeof E.value); E = E.next)
                          x++, S += E.value.length;
                        x--, b = n3.slice(k, S), w.index -= k;
                      } else {
                        m.lastIndex = 0;
                        var w = m.exec(b);
                      }
                      if (w) {
                        f && (d = w[1] ? w[1].length : 0);
                        var A = w.index + d, O = w[0].slice(d), P = A + O.length, L = b.slice(0, A), N = b.slice(P), j = k + b.length;
                        l && j > l.reach && (l.reach = j);
                        var C = y.prev;
                        L && (C = I(t3, C, L), k += L.length), z(t3, C, x);
                        var _ = new W(o, g ? M.tokenize(O, g) : O, v, O);
                        y = I(t3, C, _), N && I(t3, y, N), 1 < x && e3(n3, t3, r3, y.prev, k, {
                          cause: o + "," + u2,
                          reach: j
                        });
                      }
                    }
                  }
                }
              }
          }(e2, a, n2, a.head, 0), function(e3) {
            var n3 = [], t3 = e3.head.next;
            for (; t3 !== e3.tail; )
              n3.push(t3.value), t3 = t3.next;
            return n3;
          }(a);
        },
        hooks: {
          all: {},
          add: function(e2, n2) {
            var t2 = M.hooks.all;
            t2[e2] = t2[e2] || [], t2[e2].push(n2);
          },
          run: function(e2, n2) {
            var t2 = M.hooks.all[e2];
            if (t2 && t2.length)
              for (var r2, a = 0; r2 = t2[a++]; )
                r2(n2);
          }
        },
        Token: W
      };
      function W(e2, n2, t2, r2) {
        this.type = e2, this.content = n2, this.alias = t2, this.length = 0 | (r2 || "").length;
      }
      function i() {
        var e2 = {
          value: null,
          prev: null,
          next: null
        }, n2 = {
          value: null,
          prev: e2,
          next: null
        };
        e2.next = n2, this.head = e2, this.tail = n2, this.length = 0;
      }
      function I(e2, n2, t2) {
        var r2 = n2.next, a = {
          value: t2,
          prev: n2,
          next: r2
        };
        return n2.next = a, r2.prev = a, e2.length++, a;
      }
      function z(e2, n2, t2) {
        for (var r2 = n2.next, a = 0; a < t2 && r2 !== e2.tail; a++)
          r2 = r2.next;
        (n2.next = r2).prev = n2, e2.length -= a;
      }
      if (u.Prism = M, W.stringify = function n2(e2, t2) {
        if ("string" == typeof e2)
          return e2;
        if (Array.isArray(e2)) {
          var r2 = "";
          return e2.forEach(function(e3) {
            r2 += n2(e3, t2);
          }), r2;
        }
        var a = {
          type: e2.type,
          content: n2(e2.content, t2),
          tag: "span",
          classes: ["token", e2.type],
          attributes: {},
          language: t2
        }, i2 = e2.alias;
        i2 && (Array.isArray(i2) ? Array.prototype.push.apply(a.classes, i2) : a.classes.push(i2)), M.hooks.run("wrap", a);
        var l = "";
        for (var o in a.attributes)
          l += " " + o + '="' + (a.attributes[o] || "").replace(/"/g, "&quot;") + '"';
        return "<" + a.tag + ' class="' + a.classes.join(" ") + '"' + l + ">" + a.content + "</" + a.tag + ">";
      }, !u.document)
        return u.addEventListener && (M.disableWorkerMessageHandler || u.addEventListener("message", function(e2) {
          var n2 = JSON.parse(e2.data), t2 = n2.language, r2 = n2.code, a = n2.immediateClose;
          u.postMessage(M.highlight(r2, M.languages[t2], t2)), a && u.close();
        }, false)), M;
      var e = M.util.currentScript();
      function t() {
        M.manual || M.highlightAll();
      }
      if (e && (M.filename = e.src, e.hasAttribute("data-manual") && (M.manual = true)), !M.manual) {
        var r = document.readyState;
        "loading" === r || "interactive" === r && e && e.defer ? document.addEventListener("DOMContentLoaded", t) : window.requestAnimationFrame ? window.requestAnimationFrame(t) : window.setTimeout(t, 16);
      }
      return M;
    }(_self);
    "undefined" != typeof module && module.exports && (module.exports = Prism2), "undefined" != typeof global && (global.Prism = Prism2);
    Prism2.languages.markup = {
      comment: /<!--[\s\S]*?-->/,
      prolog: /<\?[\s\S]+?\?>/,
      doctype: {
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: true,
        inside: {
          "internal-subset": {
            pattern: /(\[)[\s\S]+(?=\]>$)/,
            lookbehind: true,
            greedy: true,
            inside: null
          },
          string: {
            pattern: /"[^"]*"|'[^']*'/,
            greedy: true
          },
          punctuation: /^<!|>$|[[\]]/,
          "doctype-tag": /^DOCTYPE/,
          name: /[^\s<>'"]+/
        }
      },
      cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
      tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: true,
        inside: {
          tag: {
            pattern: /^<\/?[^\s>\/]+/,
            inside: {
              punctuation: /^<\/?/,
              namespace: /^[^\s>\/:]+:/
            }
          },
          "attr-value": {
            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
            inside: {
              punctuation: [{
                pattern: /^=/,
                alias: "attr-equals"
              }, /"|'/]
            }
          },
          punctuation: /\/?>/,
          "attr-name": {
            pattern: /[^\s>\/]+/,
            inside: {
              namespace: /^[^\s>\/:]+:/
            }
          }
        }
      },
      entity: [{
        pattern: /&[\da-z]{1,8};/i,
        alias: "named-entity"
      }, /&#x?[\da-f]{1,8};/i]
    }, Prism2.languages.markup.tag.inside["attr-value"].inside.entity = Prism2.languages.markup.entity, Prism2.languages.markup.doctype.inside["internal-subset"].inside = Prism2.languages.markup, Prism2.hooks.add("wrap", function(a) {
      "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"));
    }), Object.defineProperty(Prism2.languages.markup.tag, "addInlined", {
      value: function(a, e) {
        var s = {};
        s["language-" + e] = {
          pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
          lookbehind: true,
          inside: Prism2.languages[e]
        }, s.cdata = /^<!\[CDATA\[|\]\]>$/i;
        var n = {
          "included-cdata": {
            pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
            inside: s
          }
        };
        n["language-" + e] = {
          pattern: /[\s\S]+/,
          inside: Prism2.languages[e]
        };
        var t = {};
        t[a] = {
          pattern: RegExp("(<__[^]*?>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g, function() {
            return a;
          }), "i"),
          lookbehind: true,
          greedy: true,
          inside: n
        }, Prism2.languages.insertBefore("markup", "cdata", t);
      }
    }), Prism2.languages.html = Prism2.languages.markup, Prism2.languages.mathml = Prism2.languages.markup, Prism2.languages.svg = Prism2.languages.markup, Prism2.languages.xml = Prism2.languages.extend("markup", {}), Prism2.languages.ssml = Prism2.languages.xml, Prism2.languages.atom = Prism2.languages.xml, Prism2.languages.rss = Prism2.languages.xml;
    !function(e) {
      var s = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
      e.languages.css = {
        comment: /\/\*[\s\S]*?\*\//,
        atrule: {
          pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
          inside: {
            rule: /^@[\w-]+/,
            "selector-function-argument": {
              pattern: /(\bselector\s*\((?!\s*\))\s*)(?:[^()]|\((?:[^()]|\([^()]*\))*\))+?(?=\s*\))/,
              lookbehind: true,
              alias: "selector"
            },
            keyword: {
              pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
              lookbehind: true
            }
          }
        },
        url: {
          pattern: RegExp("\\burl\\((?:" + s.source + `|(?:[^\\\\\r
()"']|\\\\[^])*)\\)`, "i"),
          greedy: true,
          inside: {
            function: /^url/i,
            punctuation: /^\(|\)$/,
            string: {
              pattern: RegExp("^" + s.source + "$"),
              alias: "url"
            }
          }
        },
        selector: RegExp(`[^{}\\s](?:[^{};"']|` + s.source + ")*?(?=\\s*\\{)"),
        string: {
          pattern: s,
          greedy: true
        },
        property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
        important: /!important\b/i,
        function: /[-a-z0-9]+(?=\()/i,
        punctuation: /[(){};:,]/
      }, e.languages.css.atrule.inside.rest = e.languages.css;
      var t = e.languages.markup;
      t && (t.tag.addInlined("style", "css"), e.languages.insertBefore("inside", "attr-value", {
        "style-attr": {
          pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
          inside: {
            "attr-name": {
              pattern: /^\s*style/i,
              inside: t.tag.inside
            },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            "attr-value": {
              pattern: /.+/i,
              inside: e.languages.css
            }
          },
          alias: "language-css"
        }
      }, t.tag));
    }(Prism2);
    Prism2.languages.clike = {
      comment: [{
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: true
      }, {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: true,
        greedy: true
      }],
      string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: true
      },
      "class-name": {
        pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: true,
        inside: {
          punctuation: /[.\\]/
        }
      },
      keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
      boolean: /\b(?:true|false)\b/,
      function: /\w+(?=\()/,
      number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
      operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
      punctuation: /[{}[\];(),.:]/
    };
    Prism2.languages.javascript = Prism2.languages.extend("clike", {
      "class-name": [Prism2.languages.clike["class-name"], {
        pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
        lookbehind: true
      }],
      keyword: [{
        pattern: /((?:^|})\s*)(?:catch|finally)\b/,
        lookbehind: true
      }, {
        pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|(?:get|set)(?=\s*[\[$\w\xA0-\uFFFF])|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
        lookbehind: true
      }],
      number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
      function: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
      operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
    }), Prism2.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/, Prism2.languages.insertBefore("javascript", "keyword", {
      regex: {
        pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
        lookbehind: true,
        greedy: true,
        inside: {
          "regex-source": {
            pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
            lookbehind: true,
            alias: "language-regex",
            inside: Prism2.languages.regex
          },
          "regex-flags": /[a-z]+$/,
          "regex-delimiter": /^\/|\/$/
        }
      },
      "function-variable": {
        pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
        alias: "function"
      },
      parameter: [{
        pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
        lookbehind: true,
        inside: Prism2.languages.javascript
      }, {
        pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
        inside: Prism2.languages.javascript
      }, {
        pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
        lookbehind: true,
        inside: Prism2.languages.javascript
      }, {
        pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
        lookbehind: true,
        inside: Prism2.languages.javascript
      }],
      constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    }), Prism2.languages.insertBefore("javascript", "string", {
      "template-string": {
        pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
        greedy: true,
        inside: {
          "template-punctuation": {
            pattern: /^`|`$/,
            alias: "string"
          },
          interpolation: {
            pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
            lookbehind: true,
            inside: {
              "interpolation-punctuation": {
                pattern: /^\${|}$/,
                alias: "punctuation"
              },
              rest: Prism2.languages.javascript
            }
          },
          string: /[\s\S]+/
        }
      }
    }), Prism2.languages.markup && Prism2.languages.markup.tag.addInlined("script", "javascript"), Prism2.languages.js = Prism2.languages.javascript;
    !function() {
      if ("undefined" != typeof self && self.Prism && self.document) {
        var o = "line-numbers", a = /\n(?!$)/g, e = Prism2.plugins.lineNumbers = {
          getLine: function(e2, n2) {
            if ("PRE" === e2.tagName && e2.classList.contains(o)) {
              var t2 = e2.querySelector(".line-numbers-rows"), i = parseInt(e2.getAttribute("data-start"), 10) || 1, r = i + (t2.children.length - 1);
              n2 < i && (n2 = i), r < n2 && (n2 = r);
              var s = n2 - i;
              return t2.children[s];
            }
          },
          resize: function(e2) {
            u([e2]);
          },
          assumeViewportIndependence: true
        }, t = function(e2) {
          return e2 ? window.getComputedStyle ? getComputedStyle(e2) : e2.currentStyle || null : null;
        }, n = void 0;
        window.addEventListener("resize", function() {
          e.assumeViewportIndependence && n === window.innerWidth || (n = window.innerWidth, u(Array.prototype.slice.call(document.querySelectorAll("pre." + o))));
        }), Prism2.hooks.add("complete", function(e2) {
          if (e2.code) {
            var n2 = e2.element, t2 = n2.parentNode;
            if (t2 && /pre/i.test(t2.nodeName) && !n2.querySelector(".line-numbers-rows") && Prism2.util.isActive(n2, o)) {
              n2.classList.remove(o), t2.classList.add(o);
              var i, r = e2.code.match(a), s = r ? r.length + 1 : 1, l = new Array(s + 1).join("<span></span>");
              (i = document.createElement("span")).setAttribute("aria-hidden", "true"), i.className = "line-numbers-rows", i.innerHTML = l, t2.hasAttribute("data-start") && (t2.style.counterReset = "linenumber " + (parseInt(t2.getAttribute("data-start"), 10) - 1)), e2.element.appendChild(i), u([t2]), Prism2.hooks.run("line-numbers", e2);
            }
          }
        }), Prism2.hooks.add("line-numbers", function(e2) {
          e2.plugins = e2.plugins || {}, e2.plugins.lineNumbers = true;
        });
      }
      function u(e2) {
        if (0 != (e2 = e2.filter(function(e3) {
          var n3 = t(e3)["white-space"];
          return "pre-wrap" === n3 || "pre-line" === n3;
        })).length) {
          var n2 = e2.map(function(e3) {
            var n3 = e3.querySelector("code"), t2 = e3.querySelector(".line-numbers-rows");
            if (n3 && t2) {
              var i = e3.querySelector(".line-numbers-sizer"), r = n3.textContent.split(a);
              i || ((i = document.createElement("span")).className = "line-numbers-sizer", n3.appendChild(i)), i.innerHTML = "0", i.style.display = "block";
              var s = i.getBoundingClientRect().height;
              return i.innerHTML = "", {
                element: e3,
                lines: r,
                lineHeights: [],
                oneLinerHeight: s,
                sizer: i
              };
            }
          }).filter(Boolean);
          n2.forEach(function(e3) {
            var i = e3.sizer, n3 = e3.lines, r = e3.lineHeights, s = e3.oneLinerHeight;
            r[n3.length - 1] = void 0, n3.forEach(function(e4, n4) {
              if (e4 && 1 < e4.length) {
                var t2 = i.appendChild(document.createElement("span"));
                t2.style.display = "block", t2.textContent = e4;
              } else
                r[n4] = s;
            });
          }), n2.forEach(function(e3) {
            for (var n3 = e3.sizer, t2 = e3.lineHeights, i = 0, r = 0; r < t2.length; r++)
              void 0 === t2[r] && (t2[r] = n3.children[i++].getBoundingClientRect().height);
          }), n2.forEach(function(e3) {
            var n3 = e3.sizer, t2 = e3.element.querySelector(".line-numbers-rows");
            n3.style.display = "none", n3.innerHTML = "", e3.lineHeights.forEach(function(e4, n4) {
              t2.children[n4].style.height = e4 + "px";
            });
          });
        }
      }
    }();
  });

  // src\_js\parts\utils.js
  let $ = (selector, context = document) => context.querySelector(selector);
  let elem = (tagName, content = "") => {
    let tag = document.createElement(tagName);
    tag.innerHTML = content;
    return tag;
  };
  let ls = (key, value2) => value2 == void 0 ? JSON.parse(localStorage.getItem(key)) : localStorage.setItem(key, JSON.stringify(value2));

  // src\_js\codeDemo.js
  const prism = __toModule(require_C_Users_brade_Documents_GitHub_bradeneast_com_src_js_libs_prism());
  let output = $("#output");
  let input = $("#input");
  let retrieved = ls("codeDemo");
  let lang = (retrieved == null ? void 0 : retrieved.lang) || "javascript";
  let value = (retrieved == null ? void 0 : retrieved.value) || "";
  let shiftPressed = false;
  let waiter;
  let handleKeydown = (event) => {
    clearTimeout(waiter);
    let target = event.target;
    let val = target.value;
    let keycode = event.keyCode || event.which;
    if (keycode == 16)
      shiftPressed = true;
    if (keycode == 9 && val.length) {
      event.preventDefault();
      let tabMatcher = /^/gm;
      let tabReplacer = "	";
      let moveSelectionRange = 1;
      if (shiftPressed) {
        tabMatcher = /^\t/gm;
        tabReplacer = "";
        moveSelectionRange = -1;
      }
      let start = target.selectionStart;
      let end = target.selectionEnd;
      let selection = val.slice(start, end);
      let allLines = val.split(/\n/);
      let precedingLines = val.slice(0, start).split(/\n/).slice(0, -1);
      let selectionStartLine = precedingLines.length;
      let selectionEndLine = selectionStartLine + selection.split(/\n/).length;
      let selectedLines = allLines.slice(selectionStartLine, selectionEndLine);
      let subsequentLines = allLines.slice(selectionEndLine);
      let precedingLinesString = precedingLines.join("\n");
      let selectedLinesString = selectedLines.join("\n").replace(tabMatcher, tabReplacer);
      let subsequentLinesString = subsequentLines.join("\n");
      if (!precedingLines.length)
        target.value = [selectedLinesString, subsequentLinesString].join("\n");
      else if (!subsequentLines.length)
        target.value = [precedingLinesString, selectedLinesString].join("\n");
      else
        target.value = [precedingLinesString, selectedLinesString, subsequentLinesString].join("\n");
      target.setSelectionRange(start + moveSelectionRange, end + moveSelectionRange);
    }
  };
  let highlightInput = () => {
    let lineNumbers = elem("span");
    let lineCount = value.split(/\n/).length;
    lineNumbers.classList.add("line-numbers-rows");
    lineNumbers.setAttribute("aria-hidden", true);
    for (let i = 0; i < lineCount; i++)
      lineNumbers.append(elem("span"));
    value = prism.default.highlight(input.value, prism.languages[lang], lang);
    output.innerHTML = "";
    output.append(elem("code", value));
    output.append(lineNumbers);
    ls("codeDemo", {
      value: input.value,
      lang
    });
  };
  let handleKeyup = (event) => {
    let keycode = event.keyCode || event.which;
    waiter = setTimeout(highlightInput, 250);
    if (keycode == 16)
      shiftPressed = false;
  };
  addEventListener("input", (event) => {
    if (event.target.name == "lang") {
      lang = event.target.id;
      highlightInput();
    }
  });
  input.addEventListener("keydown", handleKeydown);
  input.addEventListener("keyup", handleKeyup);
  input.value = value;
  $(`#${lang}`).checked = true;
  highlightInput();
})();
