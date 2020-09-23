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
  var require_C_Users_beast_Documents_GitHub_bradeneast_com_src_js_libs_prism = __commonJS((exports, module) => {
    var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {};
    var Prism2 = function(u) {
      var g = /\blang(?:uage)?-([\w-]+)\b/i, t = 0, T = {
        manual: u.Prism && u.Prism.manual,
        disableWorkerMessageHandler: u.Prism && u.Prism.disableWorkerMessageHandler,
        util: {
          encode: function e2(t2) {
            return t2 instanceof z ? new z(t2.type, e2(t2.content), t2.alias) : Array.isArray(t2) ? t2.map(e2) : t2.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
          },
          type: function(e2) {
            return Object.prototype.toString.call(e2).slice(8, -1);
          },
          objId: function(e2) {
            return e2.__id || Object.defineProperty(e2, "__id", {
              value: ++t
            }), e2.__id;
          },
          clone: function n2(e2, a2) {
            var r, t2;
            switch (a2 = a2 || {}, T.util.type(e2)) {
              case "Object":
                if (t2 = T.util.objId(e2), a2[t2])
                  return a2[t2];
                for (var s2 in (r = {}, a2[t2] = r, e2))
                  e2.hasOwnProperty(s2) && (r[s2] = n2(e2[s2], a2));
                return r;
              case "Array":
                return (t2 = T.util.objId(e2), a2[t2]) ? a2[t2] : (r = [], a2[t2] = r, e2.forEach(function(e3, t3) {
                  r[t3] = n2(e3, a2);
                }), r);
              default:
                return e2;
            }
          },
          getLanguage: function(e2) {
            for (; e2 && !g.test(e2.className); )
              e2 = e2.parentElement;
            return e2 ? (e2.className.match(g) || [, "none"])[1].toLowerCase() : "none";
          },
          currentScript: function() {
            if ("undefined" == typeof document)
              return null;
            if ("currentScript" in document)
              return document.currentScript;
            try {
              throw new Error();
            } catch (e2) {
              var t2 = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e2.stack) || [])[1];
              if (t2) {
                var n2 = document.getElementsByTagName("script");
                for (var a2 in n2)
                  if (n2[a2].src == t2)
                    return n2[a2];
              }
              return null;
            }
          },
          isActive: function(e2, t2, n2) {
            for (var a2 = "no-" + t2; e2; ) {
              var r = e2.classList;
              if (r.contains(t2))
                return true;
              if (r.contains(a2))
                return false;
              e2 = e2.parentElement;
            }
            return !!n2;
          }
        },
        languages: {
          extend: function(e2, t2) {
            var n2 = T.util.clone(T.languages[e2]);
            for (var a2 in t2)
              n2[a2] = t2[a2];
            return n2;
          },
          insertBefore: function(n2, e2, t2, a2) {
            var r = (a2 = a2 || T.languages)[n2], s2 = {};
            for (var i in r)
              if (r.hasOwnProperty(i)) {
                if (i == e2)
                  for (var l in t2)
                    t2.hasOwnProperty(l) && (s2[l] = t2[l]);
                t2.hasOwnProperty(i) || (s2[i] = r[i]);
              }
            var o = a2[n2];
            return a2[n2] = s2, T.languages.DFS(T.languages, function(e3, t3) {
              t3 === o && e3 != n2 && (this[e3] = s2);
            }), s2;
          },
          DFS: function e2(t2, n2, a2, r) {
            r = r || {};
            var s2, i, l = T.util.objId;
            for (var o in t2) {
              t2.hasOwnProperty(o) && (n2.call(t2, o, t2[o], a2 || o), s2 = t2[o], "Object" !== (i = T.util.type(s2)) || r[l(s2)] ? "Array" !== i || r[l(s2)] || (r[l(s2)] = true, e2(s2, n2, o, r)) : (r[l(s2)] = true, e2(s2, n2, null, r)));
            }
          }
        },
        plugins: {},
        highlightAll: function(e2, t2) {
          T.highlightAllUnder(document, e2, t2);
        },
        highlightAllUnder: function(e2, t2, n2) {
          var a2 = {
            callback: n2,
            container: e2,
            selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
          };
          T.hooks.run("before-highlightall", a2), a2.elements = Array.prototype.slice.apply(a2.container.querySelectorAll(a2.selector)), T.hooks.run("before-all-elements-highlight", a2);
          for (var r, s2 = 0; r = a2.elements[s2++]; )
            T.highlightElement(r, true === t2, a2.callback);
        },
        highlightElement: function(e2, t2, n2) {
          var a2 = T.util.getLanguage(e2), r = T.languages[a2];
          e2.className = e2.className.replace(g, "").replace(/\s+/g, " ") + " language-" + a2;
          var s2 = e2.parentElement;
          s2 && "pre" === s2.nodeName.toLowerCase() && (s2.className = s2.className.replace(g, "").replace(/\s+/g, " ") + " language-" + a2);
          var i, l = {
            element: e2,
            language: a2,
            grammar: r,
            code: e2.textContent
          };
          function o(e3) {
            l.highlightedCode = e3, T.hooks.run("before-insert", l), l.element.innerHTML = l.highlightedCode, T.hooks.run("after-highlight", l), T.hooks.run("complete", l), n2 && n2.call(l.element);
          }
          if (T.hooks.run("before-sanity-check", l), !l.code)
            return T.hooks.run("complete", l), void (n2 && n2.call(l.element));
          T.hooks.run("before-highlight", l), l.grammar ? t2 && u.Worker ? ((i = new Worker(T.filename)).onmessage = function(e3) {
            o(e3.data);
          }, i.postMessage(JSON.stringify({
            language: l.language,
            code: l.code,
            immediateClose: true
          }))) : o(T.highlight(l.code, l.grammar, l.language)) : o(T.util.encode(l.code));
        },
        highlight: function(e2, t2, n2) {
          var a2 = {
            code: e2,
            grammar: t2,
            language: n2
          };
          return T.hooks.run("before-tokenize", a2), a2.tokens = T.tokenize(a2.code, a2.grammar), T.hooks.run("after-tokenize", a2), z.stringify(T.util.encode(a2.tokens), a2.language);
        },
        tokenize: function(e2, t2) {
          var n2 = t2.rest;
          if (n2) {
            for (var a2 in n2)
              t2[a2] = n2[a2];
            delete t2.rest;
          }
          var r = new s();
          return N(r, r.head, e2), function e3(t3, n3, a3, r2, s2, i) {
            for (var l in a3)
              if (a3.hasOwnProperty(l) && a3[l]) {
                var o = a3[l];
                o = Array.isArray(o) ? o : [o];
                for (var u2 = 0; u2 < o.length; ++u2) {
                  if (i && i.cause == l + "," + u2)
                    return;
                  var g2, c = o[u2], d = c.inside, p = !!c.lookbehind, m = !!c.greedy, h = 0, f = c.alias;
                  m && !c.pattern.global && (g2 = c.pattern.toString().match(/[imsuy]*$/)[0], c.pattern = RegExp(c.pattern.source, g2 + "g"));
                  for (var v = c.pattern || c, y = r2.next, b = s2; y !== n3.tail && !(i && b >= i.reach); b += y.value.length, y = y.next) {
                    var F = y.value;
                    if (n3.length > t3.length)
                      return;
                    if (!(F instanceof z)) {
                      var k, x, w, A, P, $2, S = 1;
                      if (m && y != n3.tail.prev) {
                        v.lastIndex = b;
                        var _ = v.exec(t3);
                        if (!_)
                          break;
                        var E = _.index + (p && _[1] ? _[1].length : 0), j = _.index + _[0].length, C = b;
                        for (C += y.value.length; C <= E; )
                          y = y.next, C += y.value.length;
                        if (C -= y.value.length, b = C, y.value instanceof z)
                          continue;
                        for (var O = y; O !== n3.tail && (C < j || "string" == typeof O.value); O = O.next)
                          S++, C += O.value.length;
                        S--, F = t3.slice(b, C), _.index -= b;
                      } else {
                        v.lastIndex = 0;
                        var _ = v.exec(F);
                      }
                      _ && (p && (h = _[1] ? _[1].length : 0), E = _.index + h, k = _[0].slice(h), j = E + k.length, x = F.slice(0, E), w = F.slice(j), A = b + F.length, i && A > i.reach && (i.reach = A), P = y.prev, x && (P = N(n3, P, x), b += x.length), L(n3, P, S), $2 = new z(l, d ? T.tokenize(k, d) : k, f, k), y = N(n3, P, $2), w && N(n3, y, w), 1 < S && e3(t3, n3, a3, y.prev, b, {
                        cause: l + "," + u2,
                        reach: A
                      }));
                    }
                  }
                }
              }
          }(e2, r, t2, r.head, 0), function(e3) {
            var t3 = [], n3 = e3.head.next;
            for (; n3 !== e3.tail; )
              t3.push(n3.value), n3 = n3.next;
            return t3;
          }(r);
        },
        hooks: {
          all: {},
          add: function(e2, t2) {
            var n2 = T.hooks.all;
            n2[e2] = n2[e2] || [], n2[e2].push(t2);
          },
          run: function(e2, t2) {
            var n2 = T.hooks.all[e2];
            if (n2 && n2.length)
              for (var a2, r = 0; a2 = n2[r++]; )
                a2(t2);
          }
        },
        Token: z
      };
      function z(e2, t2, n2, a2) {
        this.type = e2, this.content = t2, this.alias = n2, this.length = 0 | (a2 || "").length;
      }
      function s() {
        var e2 = {
          value: null,
          prev: null,
          next: null
        }, t2 = {
          value: null,
          prev: e2,
          next: null
        };
        e2.next = t2, this.head = e2, this.tail = t2, this.length = 0;
      }
      function N(e2, t2, n2) {
        var a2 = t2.next, r = {
          value: n2,
          prev: t2,
          next: a2
        };
        return t2.next = r, a2.prev = r, e2.length++, r;
      }
      function L(e2, t2, n2) {
        for (var a2 = t2.next, r = 0; r < n2 && a2 !== e2.tail; r++)
          a2 = a2.next;
        (t2.next = a2).prev = t2, e2.length -= r;
      }
      if (u.Prism = T, z.stringify = function t2(e2, n2) {
        if ("string" == typeof e2)
          return e2;
        if (Array.isArray(e2)) {
          var a2 = "";
          return e2.forEach(function(e3) {
            a2 += t2(e3, n2);
          }), a2;
        }
        var r = {
          type: e2.type,
          content: t2(e2.content, n2),
          tag: "span",
          classes: ["token", e2.type],
          attributes: {},
          language: n2
        }, s2 = e2.alias;
        s2 && (Array.isArray(s2) ? Array.prototype.push.apply(r.classes, s2) : r.classes.push(s2)), T.hooks.run("wrap", r);
        var i = "";
        for (var l in r.attributes)
          i += " " + l + '="' + (r.attributes[l] || "").replace(/"/g, "&quot;") + '"';
        return "<" + r.tag + ' class="' + r.classes.join(" ") + '"' + i + ">" + r.content + "</" + r.tag + ">";
      }, !u.document)
        return u.addEventListener && (T.disableWorkerMessageHandler || u.addEventListener("message", function(e2) {
          var t2 = JSON.parse(e2.data), n2 = t2.language, a2 = t2.code, r = t2.immediateClose;
          u.postMessage(T.highlight(a2, T.languages[n2], n2)), r && u.close();
        }, false)), T;
      var e, n = T.util.currentScript();
      function a() {
        T.manual || T.highlightAll();
      }
      return n && (T.filename = n.src, n.hasAttribute("data-manual") && (T.manual = true)), T.manual || ("loading" === (e = document.readyState) || "interactive" === e && n && n.defer ? document.addEventListener("DOMContentLoaded", a) : window.requestAnimationFrame ? window.requestAnimationFrame(a) : window.setTimeout(a, 16)), T;
    }(_self);
    "undefined" != typeof module && module.exports && (module.exports = Prism2), "undefined" != typeof global && (global.Prism = Prism2), Prism2.languages.markup = {
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
    }, Prism2.languages.markup.tag.inside["attr-value"].inside.entity = Prism2.languages.markup.entity, Prism2.languages.markup.doctype.inside["internal-subset"].inside = Prism2.languages.markup, Prism2.hooks.add("wrap", function(e) {
      "entity" === e.type && (e.attributes.title = e.content.replace(/&amp;/, "&"));
    }), Object.defineProperty(Prism2.languages.markup.tag, "addInlined", {
      value: function(e, t) {
        var n = {};
        n["language-" + t] = {
          pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
          lookbehind: true,
          inside: Prism2.languages[t]
        }, n.cdata = /^<!\[CDATA\[|\]\]>$/i;
        var a = {
          "included-cdata": {
            pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
            inside: n
          }
        };
        a["language-" + t] = {
          pattern: /[\s\S]+/,
          inside: Prism2.languages[t]
        };
        var r = {};
        r[e] = {
          pattern: RegExp(/(<__[\s\S]*?>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
            return e;
          }), "i"),
          lookbehind: true,
          greedy: true,
          inside: a
        }, Prism2.languages.insertBefore("markup", "cdata", r);
      }
    }), Prism2.languages.html = Prism2.languages.markup, Prism2.languages.mathml = Prism2.languages.markup, Prism2.languages.svg = Prism2.languages.markup, Prism2.languages.xml = Prism2.languages.extend("markup", {}), Prism2.languages.ssml = Prism2.languages.xml, Prism2.languages.atom = Prism2.languages.xml, Prism2.languages.rss = Prism2.languages.xml, function(e) {
      var t = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
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
          pattern: RegExp("\\burl\\((?:" + t.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
          greedy: true,
          inside: {
            function: /^url/i,
            punctuation: /^\(|\)$/,
            string: {
              pattern: RegExp("^" + t.source + "$"),
              alias: "url"
            }
          }
        },
        selector: RegExp(`[^{}\\s](?:[^{};"']|` + t.source + ")*?(?=\\s*\\{)"),
        string: {
          pattern: t,
          greedy: true
        },
        property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
        important: /!important\b/i,
        function: /[-a-z0-9]+(?=\()/i,
        punctuation: /[(){};:,]/
      }, e.languages.css.atrule.inside.rest = e.languages.css;
      var n = e.languages.markup;
      n && (n.tag.addInlined("style", "css"), e.languages.insertBefore("inside", "attr-value", {
        "style-attr": {
          pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
          inside: {
            "attr-name": {
              pattern: /^\s*style/i,
              inside: n.tag.inside
            },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            "attr-value": {
              pattern: /.+/i,
              inside: e.languages.css
            }
          },
          alias: "language-css"
        }
      }, n.tag));
    }(Prism2), Prism2.languages.clike = {
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
    }, Prism2.languages.javascript = Prism2.languages.extend("clike", {
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
        greedy: true
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
    }), Prism2.languages.markup && Prism2.languages.markup.tag.addInlined("script", "javascript"), Prism2.languages.js = Prism2.languages.javascript, function() {
      var o, u, g, c, d, a, e;
      function p(e2, t) {
        var n = (n = e2.className).replace(a, " ") + " language-" + t;
        e2.className = n.replace(/\s+/g, " ").trim();
      }
      "undefined" != typeof self && self.Prism && self.document && (o = window.Prism, u = {
        js: "javascript",
        py: "python",
        rb: "ruby",
        ps1: "powershell",
        psm1: "powershell",
        sh: "bash",
        bat: "batch",
        h: "c",
        tex: "latex"
      }, d = "pre[data-src]:not([" + (g = "data-src-status") + '="loaded"]):not([' + g + '="' + (c = "loading") + '"])', a = /\blang(?:uage)?-([\w-]+)\b/i, o.hooks.add("before-highlightall", function(e2) {
        e2.selector += ", " + d;
      }), o.hooks.add("before-sanity-check", function(e2) {
        var t, n, a2, r, s, i, l = e2.element;
        l.matches(d) && (e2.code = "", l.setAttribute(g, c), (t = l.appendChild(document.createElement("CODE"))).textContent = "Loading…", n = l.getAttribute("data-src"), "none" === (r = e2.language) && (a2 = (/\.(\w+)$/.exec(n) || [, "none"])[1], r = u[a2] || a2), p(t, r), p(l, r), (s = o.plugins.autoloader) && s.loadLanguages(r), (i = new XMLHttpRequest()).open("GET", n, true), i.onreadystatechange = function() {
          4 == i.readyState && (i.status < 400 && i.responseText ? (l.setAttribute(g, "loaded"), t.textContent = i.responseText, o.highlightElement(t)) : (l.setAttribute(g, "failed"), 400 <= i.status ? t.textContent = "✖ Error " + i.status + " while fetching file: " + i.statusText : t.textContent = "✖ Error: File does not exist or is empty"));
        }, i.send(null));
      }), e = !(o.plugins.fileHighlight = {
        highlight: function(e2) {
          for (var t, n = (e2 || document).querySelectorAll(d), a2 = 0; t = n[a2++]; )
            o.highlightElement(t);
        }
      }), o.fileHighlight = function() {
        e || (console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."), e = true), o.plugins.fileHighlight.highlight.apply(this, arguments);
      });
    }();
  });

  // src\_js\parts\utils.js
  let $ = (selector, context = document) => context.querySelector(selector);
  let ls = (key, value2) => value2 == void 0 ? JSON.parse(localStorage.getItem(key)) : localStorage.setItem(key, JSON.stringify(value2));

  // src\_js\codeDemo.js
  const prism = __toModule(require_C_Users_beast_Documents_GitHub_bradeneast_com_src_js_libs_prism());
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
    value = prism.default.highlight(input.value, prism.languages[lang], lang);
    ls("codeDemo", {
      value: input.value,
      lang
    });
    output.innerHTML = value;
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
