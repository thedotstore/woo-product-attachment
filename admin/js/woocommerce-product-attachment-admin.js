!function(e, t) {
    "use strict";
    e.wp = e.wp || {}, e.wp.hooks = new function() {
        function e(e, t, i, a) {
            if (o[e][t])
                if (i) {
                    var n, s = o[e][t];
                    if (a)
                        for (n = s.length; n--; ) {
                            var r = s[n];
                            r.callback === i && r.context === a && s.splice(n, 1)
                        }
                    else
                        for (n = s.length; n--; )
                            s[n].callback === i && s.splice(n, 1)
                } else
                    o[e][t] = []
        }
        function t(e, t, a, n, s) {
            var r = {callback: a, priority: n, context: s}, l = o[e][t];
            l ? (l.push(r), l = i(l)) : l = [r], o[e][t] = l
        }
        function i(e) {
            for (var t, i, a, n = 1, o = e.length; n < o; n++) {
                for (t = e[n], i = n; (a = e[i - 1]) && a.priority > t.priority; )
                    e[i] = e[i - 1], --i;
                e[i] = t
            }
            return e
        }
        function a(e, t, i) {
            var a = o[e][t];
            if (!a)
                return"filters" === e && i[0];
            var n = 0, s = a.length;
            if ("filters" === e)
                for (; n < s; n++)
                    i[0] = a[n].callback.apply(a[n].context, i);
            else
                for (; n < s; n++)
                    a[n].callback.apply(a[n].context, i);
            return"filters" !== e || i[0]
        }
        var n = {removeFilter: function(t, i) {
                return"string" == typeof t && e("filters", t, i), n
            }, applyFilters: function() {
                var e = Array.prototype.slice.call(arguments), t = e.shift();
                return"string" == typeof t ? a("filters", t, e) : n
            }, addFilter: function(e, i, a, o) {
                return"string" == typeof e && "function" == typeof i && t("filters", e, i, a = parseInt(a || 10, 10), o), n
            }, removeAction: function(t, i) {
                return"string" == typeof t && e("actions", t, i), n
            }, doAction: function() {
                var e = Array.prototype.slice.call(arguments), t = e.shift();
                return"string" == typeof t && a("actions", t, e), n
            }, addAction: function(e, i, a, o) {
                return"string" == typeof e && "function" == typeof i && t("actions", e, i, a = parseInt(a || 10, 10), o), n
            }, storage: function() {
                return o
            }}, o = {actions: {}, filters: {}};
        return n
    }
}(window);
var wcpoa;
!function(e) {
    e.fn.exists = function() {
        return e(this).length > 0
    }, e.fn.outerHTML = function() {
        return e(this).get(0).outerHTML
    }, (wcpoa = {l10n: {}, o: {}, update: function(e, t) {
            this.o[e] = t
        }, get: function(e) {
            return void 0 !== this.o[e] ? this.o[e] : null
        }, _e: function(e, t) {
            t = t || !1;
            var i = this.l10n[e] || "";
            return t && (i = i[t] || ""), i
        }, add_action: function() {
            for (var e = arguments[0].split(" "), t = e.length, i = 0; i < t; i++)
                arguments[0] = "wcpoa/" + e[i], wp.hooks.addAction.apply(this, arguments);
            return this
        }, remove_action: function() {
            return arguments[0] = "wcpoa/" + arguments[0], wp.hooks.removeAction.apply(this, arguments), this
        }, do_action: function() {
            return arguments[0] = "wcpoa/" + arguments[0], wp.hooks.doAction.apply(this, arguments), this
        }, add_filter: function() {
            return arguments[0] = "wcpoa/" + arguments[0], wp.hooks.addFilter.apply(this, arguments), this
        }, remove_filter: function() {
            return arguments[0] = "wcpoa/" + arguments[0], wp.hooks.removeFilter.apply(this, arguments), this
        }, apply_filters: function() {
            return arguments[0] = "wcpoa/" + arguments[0], wp.hooks.applyFilters.apply(this, arguments)
        }, get_selector: function(t) {
            t = t || "";
            var i = ".wcpoa-field";
            if (e.isPlainObject(t))
                if (e.isEmptyObject(t))
                    t = "";
                else
                    for (k in t) {
                        t = t[k];
                        break
                    }
            return t && (i = (i = (i += "-" + t).split("_").join("-")).split("field-field-").join("field-")), i
        }, get_fields: function(t, i, a) {
            t = t || "", i = i || !1, a = a || !1;
            var n = this.get_selector(t), o = e(n, i);
            return!1 !== i && i.each(function() {
                e(this).is(n) && (o = o.add(e(this)))
            }), a || (o = o.not(".wcpoa-clone .wcpoa-field"), o = wcpoa.apply_filters("get_fields", o)), o
        }, get_field: function(e, t) {
            e = e || "", t = t || !1;
            var i = this.get_fields(e, t, !0);
            return!!i.exists() && i.first()
        }, get_closest_field: function(e, t) {
            return t = t || "", e.closest(this.get_selector(t))
        }, get_field_wrap: function(e) {
            return e.closest(this.get_selector())
        }, get_field_key: function(e) {
            return e.data("key")
        }, get_field_type: function(e) {
            return e.data("type")
        }, get_data: function(e, t) {
            var i = e.data();
            return"object" == typeof t && (i = this.parse_args(i, t)), i
        }, get_uniqid: function(e, t) {
            void 0 === e && (e = "");
            var i, a = function(e, t) {
                return e = parseInt(e, 10).toString(16), t < e.length ? e.slice(e.length - t) : t > e.length ? Array(t - e.length + 1).join("0") + e : e
            };
            return this.php_js || (this.php_js = {}), this.php_js.uniqidSeed || (this.php_js.uniqidSeed = Math.floor(123456789 * Math.random())), this.php_js.uniqidSeed++, i = e, i += a(parseInt((new Date).getTime() / 1e3, 10), 8), i += a(this.php_js.uniqidSeed, 5), t && (i += (10 * Math.random()).toFixed(8).toString()), i
        }, serialize_form: function() {
            return this.serialize.apply(this, arguments)
        }, serialize: function(t, i) {
            i = i || "";
            var a = {}, n = {}, o = t.find("select, textarea, input").serializeArray();
            return e.each(o, function(e, t) {
                var o = t.name, s = t.value;
                if (i) {
                    if (0 !== o.indexOf(i))
                        return;
                    "[" == (o = o.slice(i.length)).slice(0, 1) && (o = o.slice(1).replace("]", ""))
                }
                "[]" === o.slice(-2) && (o = o.slice(0, -2), void 0 === n[o] && (n[o] = -1), o += "[" + ++n[o] + "]"), a[o] = s
            }), a
        }, disable: function(e, t) {
            if (t = t || "", e.hasClass("wcpoa-disabled"))
                return!1;
            if (e.prop("disabled", !0), t) {
                var i = e.data("wcpoa_disabled") || [];
                i.indexOf(t) < 0 && (i.push(t), e.data("wcpoa_disabled", i))
            }
            return!0
        }, enable: function(e, t) {
            if (t = t || "", e.hasClass("wcpoa-disabled"))
                return!1;
            var i = e.data("wcpoa_disabled") || [];
            if (t) {
                var a = i.indexOf(t);
                a > -1 && (i.splice(a, 1), e.data("wcpoa_disabled", i))
            }
            return!i.length && (e.prop("disabled", !1), !0)
        }, disable_el: function(t, i) {
            i = i || "", t.find("select, textarea, input").each(function() {
                wcpoa.disable(e(this), i)
            })
        }, disable_form: function(e, t) {
            this.disable_el.apply(this, arguments)
        }, enable_el: function(t, i) {
            i = i || "", t.find("select, textarea, input").each(function() {
                wcpoa.enable(e(this), i)
            })
        }, enable_form: function(e, t) {
            this.enable_el.apply(this, arguments)
        }, remove_tr: function(e, t) {
            var i = e.height(), a = e.children().length;
            e.addClass("wcpoa-remove-element"), setTimeout(function() {
                e.removeClass("wcpoa-remove-element"), e.html('<td style="padding:0; height:' + i + 'px" colspan="' + a + '"></td>'), e.children("td").animate({height: 0}, 250, function() {
                    e.remove(), "function" == typeof t && t()
                })
            }, 250)
        }, remove_el: function(e, t, i) {
            i = i || 0;
            var a = e.height(), n = e.width(), o = e.css("margin"), s = e.outerHeight(!0);
            wcpoa.do_action("remove", e), e.wrap('<div class="wcpoa-temp-remove" style="height:' + s + 'px"></div>');
            var r = e.parent();
            e.css({height: a, width: n, margin: o, position: "absolute"}), setTimeout(function() {
                r.css({opacity: 0, height: i})
            }, 50), setTimeout(function() {
                r.remove(), "function" == typeof t && t.apply(this, arguments)
            }, 301)
        }, isset: function() {
            var e = arguments, t = e.length, a = null;
            if (0 === t)
                throw new Error("Empty isset");
            for (a = e[0], i = 1; i < t; i++) {
                if (void 0 === e[i] || void 0 === a[e[i]])
                    return!1;
                a = a[e[i]]
            }
            return!0
        }, maybe_get: function(e, t, i) {
            void 0 === i && (i = null), keys = String(t).split(".");
            for (var a in keys) {
                if (void 0 === e[t = keys[a]])
                    return i;
                e = e[t]
            }
            return e
        }, open_popup: function(t) {
            if ($popup = e("body > #wcpoa-popup"), $popup.exists())
                return update_popup(t);
            var i = ['<div id="wcpoa-popup">', '<div class="wcpoa-popup-box wcpoa-box">', '<div class="title"><h3></h3><a href="#" class="wcpoa-icon -cancel grey wcpoa-close-popup"></a></div>', '<div class="inner"></div>', '<div class="loading"><i class="wcpoa-loading"></i></div>', "</div>", '<div class="bg"></div>', "</div>"].join("");
            return e("body").append(i), e("#wcpoa-popup").on("click", ".bg, .wcpoa-close-popup", function(e) {
                e.preventDefault(), wcpoa.close_popup()
            }), this.update_popup(t)
        }, update_popup: function(t) {
            return $popup = e("#wcpoa-popup"), !!$popup.exists() && ((t = e.extend({}, {title: "", content: "", width: 0, height: 0, loading: !1}, t)).title && $popup.find(".title h3").html(t.title), t.content && ($inner = $popup.find(".inner:first"), $inner.html(t.content), wcpoa.do_action("append", $inner), $inner.attr("style", "position: relative;"), t.height = $inner.outerHeight(), $inner.removeAttr("style")), t.width && $popup.find(".wcpoa-popup-box").css({width: t.width, "margin-left": 0 - t.width / 2}), t.height && (t.height += 44, $popup.find(".wcpoa-popup-box").css({height: t.height, "margin-top": 0 - t.height / 2})), t.loading ? $popup.find(".loading").show() : $popup.find(".loading").hide(), $popup)
        }, close_popup: function() {
            $popup = e("#wcpoa-popup"), $popup.exists() && $popup.remove()
        }, update_user_setting: function(t, i) {
            e.ajax({url: wcpoa.get("ajaxurl"), dataType: "html", type: "post", data: wcpoa.prepare_for_ajax({action: "wcpoa/update_user_setting", name: t, value: i})})
        }, prepare_for_ajax: function(t) {
            var i = {nonce: wcpoa.get("nonce"), post_id: wcpoa.get("post_id")};
            return e.each(t, function(t, a) {
                e.isPlainObject(a) && !e.isEmptyObject(a) ? e.each(a, function(e, a) {
                    var n = (e += "").indexOf("[");
                    e = 0 == n ? t + e : n > 0 ? t + "[" + e.slice(0, n) + "]" + e.slice(n) : t + "[" + e + "]", i[e] = a
                }) : i[t] = a
            }), i = wcpoa.apply_filters("prepare_for_ajax", i)
        }, is_ajax_success: function(e) {
            return!(!e || !e.success)
        }, get_ajax_message: function(e) {
            var t = {text: "", type: "error"};
            return e ? (e.success && (t.type = "success"), e.data && e.data.message && (t.text = e.data.message), e.data && e.data.error && (t.text = e.data.error), t) : t
        }, is_in_view: function(t) {
            var i = t.offset().top, a = i + t.height();
            if (i === a)
                return!1;
            var n = e(window).scrollTop();
            return a <= n + e(window).height() && i >= n
        }, val: function(e, t) {
            var i = e.val();
            e.val(t), t != i && e.trigger("change")
        }, str_replace: function(e, t, i) {
            return i.split(e).join(t)
        }, str_sanitize: function(e) {
            var t = {"À": "A", "Á": "A", "Â": "A", "Ã": "A", "Ä": "A", "Å": "A", "Æ": "AE", "Ç": "C", "È": "E", "É": "E", "Ê": "E", "Ë": "E", "Ì": "I", "Í": "I", "Î": "I", "Ï": "I", "Ð": "D", "Ñ": "N", "Ò": "O", "Ó": "O", "Ô": "O", "Õ": "O", "Ö": "O", "Ø": "O", "Ù": "U", "Ú": "U", "Û": "U", "Ü": "U", "Ý": "Y", "ß": "s", "à": "a", "á": "a", "â": "a", "ã": "a", "ä": "a", "å": "a", "æ": "ae", "ç": "c", "è": "e", "é": "e", "ê": "e", "ë": "e", "ì": "i", "í": "i", "î": "i", "ï": "i", "ñ": "n", "ò": "o", "ó": "o", "ô": "o", "õ": "o", "ö": "o", "ø": "o", "ù": "u", "ú": "u", "û": "u", "ü": "u", "ý": "y", "ÿ": "y", "Ā": "A", "ā": "a", "Ă": "A", "ă": "a", "Ą": "A", "ą": "a", "Ć": "C", "ć": "c", "Ĉ": "C", "ĉ": "c", "Ċ": "C", "ċ": "c", "Č": "C", "č": "c", "Ď": "D", "ď": "d", "Đ": "D", "đ": "d", "Ē": "E", "ē": "e", "Ĕ": "E", "ĕ": "e", "Ė": "E", "ė": "e", "Ę": "E", "ę": "e", "Ě": "E", "ě": "e", "Ĝ": "G", "ĝ": "g", "Ğ": "G", "ğ": "g", "Ġ": "G", "ġ": "g", "Ģ": "G", "ģ": "g", "Ĥ": "H", "ĥ": "h", "Ħ": "H", "ħ": "h", "Ĩ": "I", "ĩ": "i", "Ī": "I", "ī": "i", "Ĭ": "I", "ĭ": "i", "Į": "I", "į": "i", "İ": "I", "ı": "i", "Ĳ": "IJ", "ĳ": "ij", "Ĵ": "J", "ĵ": "j", "Ķ": "K", "ķ": "k", "Ĺ": "L", "ĺ": "l", "Ļ": "L", "ļ": "l", "Ľ": "L", "ľ": "l", "Ŀ": "L", "ŀ": "l", "Ł": "l", "ł": "l", "Ń": "N", "ń": "n", "Ņ": "N", "ņ": "n", "Ň": "N", "ň": "n", "ŉ": "n", "Ō": "O", "ō": "o", "Ŏ": "O", "ŏ": "o", "Ő": "O", "ő": "o", "Œ": "OE", "œ": "oe", "Ŕ": "R", "ŕ": "r", "Ŗ": "R", "ŗ": "r", "Ř": "R", "ř": "r", "Ś": "S", "ś": "s", "Ŝ": "S", "ŝ": "s", "Ş": "S", "ş": "s", "Š": "S", "š": "s", "Ţ": "T", "ţ": "t", "Ť": "T", "ť": "t", "Ŧ": "T", "ŧ": "t", "Ũ": "U", "ũ": "u", "Ū": "U", "ū": "u", "Ŭ": "U", "ŭ": "u", "Ů": "U", "ů": "u", "Ű": "U", "ű": "u", "Ų": "U", "ų": "u", "Ŵ": "W", "ŵ": "w", "Ŷ": "Y", "ŷ": "y", "Ÿ": "Y", "Ź": "Z", "ź": "z", "Ż": "Z", "ż": "z", "Ž": "Z", "ž": "z", "ſ": "s", "ƒ": "f", "Ơ": "O", "ơ": "o", "Ư": "U", "ư": "u", "Ǎ": "A", "ǎ": "a", "Ǐ": "I", "ǐ": "i", "Ǒ": "O", "ǒ": "o", "Ǔ": "U", "ǔ": "u", "Ǖ": "U", "ǖ": "u", "Ǘ": "U", "ǘ": "u", "Ǚ": "U", "ǚ": "u", "Ǜ": "U", "ǜ": "u", "Ǻ": "A", "ǻ": "a", "Ǽ": "AE", "ǽ": "ae", "Ǿ": "O", "ǿ": "o", " ": "_", "'": "", "?": "", "/": "", "\\": "", ".": "", ",": "", "`": "", ">": "", "<": "", '"': "", "[": "", "]": "", "|": "", "{": "", "}": "", "(": "", ")": ""}, i = /\W/g;
            return e = e.replace(i, function(e) {
                return void 0 !== t[e] ? t[e] : e
            }), e = e.toLowerCase()
        }, addslashes: function(e) {
            return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
        }, render_select: function(t, i) {
            var a = t.val();
            t.html(""), i && e.each(i, function(i, n) {
                var o = t;
                n.group && ((o = t.find('optgroup[label="' + n.group + '"]')).exists() || (o = e('<optgroup label="' + n.group + '"></optgroup>'), t.append(o))), o.append('<option value="' + n.value + '">' + n.label + "</option>"), a == n.value && t.prop("selectedIndex", i)
            })
        }, duplicate: function(t) {
            void 0 !== t.length && (t = {$el: t});
            var i, a = (t = wcpoa.parse_args(t, {$el: !1, search: "", replace: "", before: function(e) {
                }, after: function(e, t) {
                }, append: function(e, t) {
                    e.after(t)
                }})).$el;
            return t.search || (t.search = a.attr("data-id")), t.replace || (t.replace = wcpoa.get_uniqid()), t.before.apply(this, [a]), wcpoa.do_action("before_duplicate", a), (i = a.clone()).removeClass("wcpoa-clone"), wcpoa.do_action("remove", i), t.search && (i.attr("data-id", t.replace), i.find('[id*="' + t.search + '"]').each(function() {
                e(this).attr("id", e(this).attr("id").replace(t.search, t.replace))
            }), i.find('[name*="' + t.search + '"]').each(function() {
                e(this).attr("name", e(this).attr("name").replace(t.search, t.replace))
            }), i.find('label[for*="' + t.search + '"]').each(function() {
                e(this).attr("for", e(this).attr("for").replace(t.search, t.replace))
            })), i.find(".ui-sortable").removeClass("ui-sortable"), wcpoa.do_action("after_duplicate", a, i), t.after.apply(this, [a, i]), t.append.apply(this, [a, i]), setTimeout(function() {
                wcpoa.do_action("append", i)
            }, 1), jQuery("table.wcpoa-table tr:last").each(function() {
                jQuery("table.wcpoa-table tr:last").find(".wcpoa_attachments_id").val(t.replace), jQuery("table.wcpoa-table tr:last div ul.wcpoa-order-checkbox-list input[type=checkbox]").each(function() {
                    jQuery(this).attr("name", "wcpoa_order_status[" + t.replace + "][]")
                }), jQuery("table.wcpoa-table tr:last div.wcpoa_product_variation input[type=checkbox]").each(function() {
                    jQuery(this).attr("name", "wcpoa_variation[" + t.replace + "][]")
                }), jQuery("table.wcpoa-table tr:last select.wcpoa-pro-category-list").each(function() {
                    jQuery(this).attr("name", "wcpoa_category_list[" + t.replace + "][]")
                })
            }), i
        }, decode: function(t) {
            return e("<textarea/>").html(t).text()
        }, parse_args: function(t, i) {
            return"object" != typeof t && (t = {}), "object" != typeof i && (i = {}), e.extend({}, i, t)
        }, enqueue_script: function(e, t) {
            var i = document.createElement("script");
            i.type = "text/javascript", i.src = e, i.async = !0, i.readyState ? i.onreadystatechange = function() {
                "loaded" != i.readyState && "complete" != i.readyState || (i.onreadystatechange = null, t())
            } : i.onload = function() {
                t()
            }, document.body.appendChild(i)
        }}).model = {actions: {}, filters: {}, events: {}, extend: function(t) {
            var i = e.extend({}, this, t);
            return e.each(i.actions, function(e, t) {
                i._add_action(e, t)
            }), e.each(i.filters, function(e, t) {
                i._add_filter(e, t)
            }), e.each(i.events, function(e, t) {
                i._add_event(e, t)
            }), i
        }, _add_action: function(e, t) {
            var i = this, a = e.split(" "), e = a[0] || "", n = a[1] || 10;
            wcpoa.add_action(e, i[t], n, i)
        }, _add_filter: function(e, t) {
            var i = this, a = e.split(" "), e = a[0] || "", n = a[1] || 10;
            wcpoa.add_filter(e, i[t], n, i)
        }, _add_event: function(t, i) {
            var a = this, n = t.indexOf(" "), o = n > 0 ? t.substr(0, n) : t, s = n > 0 ? t.substr(n + 1) : "", r = function(t) {
                t.$el = e(this), "function" == typeof a.event && (t = a.event(t)), a[i].apply(a, arguments)
            };
            s ? e(document).on(o, s, r) : e(document).on(o, r)
        }, get: function(e, t) {
            return t = t || null, void 0 !== this[e] && (t = this[e]), t
        }, set: function(e, t) {
            return this[e] = t, "function" == typeof this["_set_" + e] && this["_set_" + e].apply(this), this
        }}, wcpoa.field = wcpoa.model.extend({type: "", o: {}, $field: null, _add_action: function(e, t) {
            var i = this;
            e = e + "_field/type=" + i.type, wcpoa.add_action(e, function(e) {
                i.set("$field", e), i[t].apply(i, arguments)
            })
        }, _add_filter: function(e, t) {
            var i = this;
            e = e + "_field/type=" + i.type, wcpoa.add_filter(e, function(e) {
                i.set("$field", e), i[t].apply(i, arguments)
            })
        }, _add_event: function(t, i) {
            var a = this, n = t.substr(0, t.indexOf(" ")), o = t.substr(t.indexOf(" ") + 1), s = wcpoa.get_selector(a.type);
            e(document).on(n, s + " " + o, function(t) {
                t.$el = e(this), t.$field = wcpoa.get_closest_field(t.$el, a.type), a.set("$field", t.$field), a[i].apply(a, [t])
            })
        }, _set_$field: function() {
            "function" == typeof this.focus && this.focus()
        }, doFocus: function(e) {
            return this.set("$field", e)
        }}), wcpoa.fields = wcpoa.model.extend({actions: {prepare: "_prepare", prepare_field: "_prepare_field", ready: "_ready", ready_field: "_ready_field", append: "_append", append_field: "_append_field", load: "_load", load_field: "_load_field", remove: "_remove", remove_field: "_remove_field", sortstart: "_sortstart", sortstart_field: "_sortstart_field", sortstop: "_sortstop", sortstop_field: "_sortstop_field", show: "_show", show_field: "_show_field", hide: "_hide", hide_field: "_hide_field"}, _prepare: function(t) {
            wcpoa.get_fields("", t).each(function() {
                wcpoa.do_action("prepare_field", e(this))
            })
        }, _prepare_field: function(e) {
            wcpoa.do_action("prepare_field/type=" + e.data("type"), e)
        }, _ready: function(t) {
            wcpoa.get_fields("", t).each(function() {
                wcpoa.do_action("ready_field", e(this))
            })
        }, _ready_field: function(e) {
            wcpoa.do_action("ready_field/type=" + e.data("type"), e)
        }, _append: function(t) {
            wcpoa.get_fields("", t).each(function() {
                wcpoa.do_action("append_field", e(this))
            })
        }, _append_field: function(e) {
            wcpoa.do_action("append_field/type=" + e.data("type"), e)
        }, _load: function(t) {
            wcpoa.get_fields("", t).each(function() {
                wcpoa.do_action("load_field", e(this))
            })
        }, _load_field: function(e) {
            wcpoa.do_action("load_field/type=" + e.data("type"), e)
        }, _remove: function(t) {
            wcpoa.get_fields("", t).each(function() {
                wcpoa.do_action("remove_field", e(this))
            })
        }, _remove_field: function(e) {
            wcpoa.do_action("remove_field/type=" + e.data("type"), e)
        }, _sortstart: function(t, i) {
            wcpoa.get_fields("", t).each(function() {
                wcpoa.do_action("sortstart_field", e(this), i)
            })
        }, _sortstart_field: function(e, t) {
            wcpoa.do_action("sortstart_field/type=" + e.data("type"), e, t)
        }, _sortstop: function(t, i) {
            wcpoa.get_fields("", t).each(function() {
                wcpoa.do_action("sortstop_field", e(this), i)
            })
        }, _sortstop_field: function(e, t) {
            wcpoa.do_action("sortstop_field/type=" + e.data("type"), e, t)
        }, _hide: function(t, i) {
            wcpoa.get_fields("", t).each(function() {
                wcpoa.do_action("hide_field", e(this), i)
            })
        }, _hide_field: function(e, t) {
            wcpoa.do_action("hide_field/type=" + e.data("type"), e, t)
        }, _show: function(t, i) {
            wcpoa.get_fields("", t).each(function() {
                wcpoa.do_action("show_field", e(this), i)
            })
        }, _show_field: function(e, t) {
            wcpoa.do_action("show_field/type=" + e.data("type"), e, t)
        }}), e(document).ready(function() {
        wcpoa.do_action("ready", e("body"))
    }), e(window).on("load", function() {
        wcpoa.do_action("load", e("body"))
    }), wcpoa.layout = wcpoa.model.extend({active: 0, actions: {"prepare 99": "prepare", refresh: "refresh"}, prepare: function() {
            this.active = 1, this.refresh()
        }, refresh: function(t) {
            if (this.active) {
                t = t || e("body");
                this.render_tables(t), this.render_groups(t)
            }
        }, render_tables: function(t) {
            var i = this, a = t.find(".wcpoa-table:visible");
            t.is("tr") && (a = t.parent().parent()), a.each(function() {
                i.render_table(e(this))
            })
        }, render_table: function(t) {
            var i = t.find("> thead th.wcpoa-th"), a = 1, n = 100;
            if (i.exists()) {
                var o = t.find("> tbody > tr"), s = o.find("> td.wcpoa-field");
                o.hasClass("wcpoa-clone") && o.length > 1 && (s = o.not(".wcpoa-clone").find("> td.wcpoa-field")), i.each(function() {
                    var t = e(this), i = t.attr("data-key"), a = s.filter('[data-key="' + i + '"]');
                    a.removeClass("appear-empty"), t.removeClass("hidden-by-conditional-logic"), a.exists() && (0 == a.not(".hidden-by-conditional-logic").length ? t.addClass("hidden-by-conditional-logic") : a.filter(".hidden-by-conditional-logic").addClass("appear-empty"))
                }), i.css("width", "auto"), a = (i = i.not(".hidden-by-conditional-logic")).length, i.filter("[data-width]").each(function() {
                    var t = parseInt(e(this).attr("data-width"));
                    n -= t, e(this).css("width", t + "%")
                }), (i = i.not("[data-width]")).each(function() {
                    var t = n / i.length;
                    e(this).css("width", t + "%")
                }), t.find(".wcpoa-row .wcpoa-field.-collapsed-target").removeAttr("colspan"), t.find(".wcpoa-row.-collapsed .wcpoa-field.-collapsed-target").attr("colspan", a)
            }
        }, render_groups: function(t) {
            var i = this, a = t.find(".wcpoa-fields:visible");
            t && t.is(".wcpoa-fields") && (a = a.add(t)), a.each(function() {
                i.render_group(e(this))
            })
        }, render_group: function(t) {
            var i = e(), a = 0, n = 0, o = -1, s = t.children(".wcpoa-field[data-width]:visible");
            if (s.exists()) {
                if (t.hasClass("-left"))
                    return s.removeAttr("data-width"), void s.css("width", "auto");
                s.removeClass("wcpoa-r0 wcpoa-c0").css({"min-height": 0}), s.each(function(t) {
                    var s = e(this), r = s.position().top;
                    0 == t && (a = r), r != a && (i.css({"min-height": n + 1 + "px"}), i = e(), a = s.position().top, n = 0, o = -1), o++, n = s.outerHeight() > n ? s.outerHeight() : n, i = i.add(s), 0 == r ? s.addClass("wcpoa-r0") : 0 == o && s.addClass("wcpoa-c0")
                }), i.exists() && i.css({"min-height": n + 1 + "px"})
            }
        }}), e(document).on("change", ".wcpoa-field input, .wcpoa-field textarea, .wcpoa-field select", function() {
        var t = e("#_wcpoa_changed");
        t.length && t.val(1), wcpoa.do_action("change", e(this))
    }), e(document).on("click", '.wcpoa-field a[href="#"]', function(e) {
        e.preventDefault()
    }), wcpoa.unload = wcpoa.model.extend({locked: 1, active: 1, changed: 0, filters: {validation_complete: "validation_complete"}, actions: {ready: "ready", change: "on"}, ready: function() {
            setTimeout(function() {
                wcpoa.unload.locked = 0
            }, 1e3)
        }, events: {"submit form": "off"}, validation_complete: function(e, t) {
            return e && e.errors && this.on(), e
        }, on: function() {
            this.changed || !this.active || this.locked || (this.changed = 1, e(window).on("beforeunload", this.unload))
        }, off: function() {
            this.changed = 0, e(window).off("beforeunload", this.unload)
        }, unload: function() {
            return wcpoa._e("unload")
        }}), wcpoa.tooltip = wcpoa.model.extend({events: {"mouseenter .wcpoa-js-tooltip": "_on", "mouseup .wcpoa-js-tooltip": "_off", "mouseleave .wcpoa-js-tooltip": "_off"}, tooltip: function(t, i) {
            var a = e('<div class="wcpoa-tooltip">' + t + "</div>");
            e("body").append(a);
            target_w = i.outerWidth(), target_h = i.outerHeight(), target_t = i.offset().top, target_l = i.offset().left, tooltip_w = a.outerWidth(), tooltip_h = a.outerHeight();
            var n = target_t - tooltip_h, o = target_l + target_w / 2 - tooltip_w / 2;
            return o < 10 ? (a.addClass("right"), o = target_l + target_w, n = target_t + target_h / 2 - tooltip_h / 2) : o + tooltip_w + 10 > e(window).width() ? (a.addClass("left"), o = target_l - tooltip_w, n = target_t + target_h / 2 - tooltip_h / 2) : n - e(window).scrollTop() < 10 ? (a.addClass("bottom"), n = target_t + target_h) : a.addClass("top"), a.css({top: n, left: o}), a
        }, confirm: function(t, i, a, n, o) {
            a = a || wcpoa._e("are_you_sure"), n = n || '<a href="#" class="wcpoa-confirm-y">' + wcpoa._e("yes") + "</a>", o = o || '<a href="#" class="wcpoa-confirm-n">' + wcpoa._e("No") + "</a>";
            var s = this.tooltip(a + " " + n + " " + o, t);
            s.addClass("-confirm");
            var r = function(a, n) {
                a.preventDefault(), a.stopImmediatePropagation(), t.off("click", l), s.off("click", ".wcpoa-confirm-y", l), s.off("click", ".wcpoa-confirm-n", c), e("body").off("click", c), s.remove(), i.apply(null, [n])
            }, l = function(e) {
                r(e, !0)
            }, c = function(e) {
                r(e, !1)
            };
            s.on("click", ".wcpoa-confirm-y", l), s.on("click", ".wcpoa-confirm-n", c), t.on("click", l), e("body").on("click", c)
        }, confirm_remove: function(e, t) {
            text = !1, button_y = 'Are you sure?  <a href="#" class="wcpoa-confirm-y -red">Remove</a>', button_n = '<a href="#" class="wcpoa-confirm-n"> Cancel</a>', this.confirm(e, t, !1, button_y, button_n)
        }, _on: function(e) {
            var t = e.$el.attr("title");
            if (t) {
                var i = this.tooltip(t, e.$el);
                e.$el.data("wcpoa-tooltip", {title: t, $el: i}), e.$el.attr("title", "")
            }
        }, _off: function(e) {
            var t = e.$el.data("wcpoa-tooltip");
            t && (t.$el.remove(), e.$el.attr("title", t.title))
        }}), wcpoa.postbox = wcpoa.model.extend({events: {"mouseenter .wcpoa-postbox .handlediv": "on", "mouseleave .wcpoa-postbox .handlediv": "off"}, on: function(e) {
            e.$el.siblings(".hndle").addClass("hover")
        }, off: function(e) {
            e.$el.siblings(".hndle").removeClass("hover")
        }, render: function(t) {
            t = e.extend({}, {id: "", key: "", style: "default", label: "top", edit_url: "", edit_title: "", visibility: !0}, t);
            var i = e("#" + t.id), a = e("#" + t.id + "-hide"), n = a.parent();
            i.addClass("wcpoa-postbox"), n.addClass("wcpoa-postbox-toggle"), i.removeClass("hide-if-js"), n.removeClass("hide-if-js"), "default" !== t.style && i.addClass(t.style), i.children(".inside").addClass("wcpoa-fields").addClass("-" + t.label), t.visibility ? a.prop("checked", !0) : (i.addClass("wcpoa-hidden"), n.addClass("wcpoa-hidden")), t.edit_url && i.children(".hndle").append('<a href="' + t.edit_url + '" class="dashicons dashicons-admin-generic wcpoa-hndle-cog wcpoa-js-tooltip" title="' + t.edit_title + '"></a>')
        }}), wcpoa.add_action("sortstart", function(t, i) {
        t.is("tr") && (t.css("position", "relative"), t.children().each(function() {
            e(this).width(e(this).width())
        }), t.css("position", "absolute"), i.html('<td style="height:' + t.height() + 'px; padding:0;" colspan="' + t.children("td").length + '"></td>'))
    }), wcpoa.add_action("before_duplicate", function(e) {
        e.find("select option:selected").addClass("selected")
    }), wcpoa.add_action("after_duplicate", function(t, i) {
        i.find("select").each(function() {
            var t = e(this), i = [];
            t.find("option.selected").each(function() {
                i.push(e(this).val())
            }), t.val(i)
        }), t.find("select option.selected").removeClass("selected"), i.find("select option.selected").removeClass("selected")
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function(t) {
        return e.inArray(t, this)
    })
}(jQuery), function(e) {
    wcpoa.ajax = wcpoa.model.extend({active: !1, actions: {ready: "ready"}, events: {"change #page_template": "_change_template", "change #parent_id": "_change_parent", "change #post-formats-select input": "_change_format", "change .categorychecklist input": "_change_term", "change .categorychecklist select": "_change_term", 'change .wcpoa-taxonomy-field[data-save="1"] input': "_change_term", 'change .wcpoa-taxonomy-field[data-save="1"] select': "_change_term"}, o: {}, xhr: null, update: function(e, t) {
            return this.o[e] = t, this
        }, get: function(e) {
            return this.o[e] || null
        }, ready: function() {
            this.update("post_id", wcpoa.get("post_id")), this.active = !0
        }, fetch: function() {
            if (this.active && wcpoa.get("ajax")) {
                this.xhr && this.xhr.abort();
                var t = this, i = this.o;
                i.action = "wcpoa/post/get_field_groups", i.exists = [], e(".wcpoa-postbox").not(".wcpoa-hidden").each(function() {
                    i.exists.push(e(this).attr("id").substr(4))
                }), this.xhr = e.ajax({url: wcpoa.get("ajaxurl"), data: wcpoa.prepare_for_ajax(i), type: "post", dataType: "json", success: function(e) {
                        wcpoa.is_ajax_success(e) && t.render(e.data)
                    }})
            }
        }, render: function(t) {
            e(".wcpoa-postbox").addClass("wcpoa-hidden"), e(".wcpoa-postbox-toggle").addClass("wcpoa-hidden"), e("#wcpoa-style").html(""), e.each(t, function(t, i) {
                var a = e("#wcpoa-" + i.key), n = e("#wcpoa-" + i.key + "-hide"), o = n.parent();
                a.removeClass("wcpoa-hidden hide-if-js").show(), o.removeClass("wcpoa-hidden hide-if-js").show(), n.prop("checked", !0);
                var s = a.find(".wcpoa-replace-with-fields");
                s.exists() && (s.replaceWith(i.html), wcpoa.do_action("append", a)), 0 === t && e("#wcpoa-style").html(i.style), a.find(".wcpoa-hidden-by-postbox").prop("disabled", !1)
            }), e(".wcpoa-postbox.wcpoa-hidden").find("select, textarea, input").not(":disabled").each(function() {
                e(this).addClass("wcpoa-hidden-by-postbox").prop("disabled", !0)
            })
        }, sync_taxonomy_terms: function() {
            var t = [""];
            e(".categorychecklist, .wcpoa-taxonomy-field").each(function() {
                var i = e(this), a = i.find('input[type="checkbox"]').not(":disabled"), n = i.find('input[type="radio"]').not(":disabled"), o = i.find("select").not(":disabled"), s = i.find('input[type="hidden"]').not(":disabled");
                i.is(".wcpoa-taxonomy-field") && "1" != i.attr("data-save") || i.closest(".media-frame").exists() || (a.exists() ? a.filter(":checked").each(function() {
                    t.push(e(this).val())
                }) : n.exists() ? n.filter(":checked").each(function() {
                    t.push(e(this).val())
                }) : o.exists() ? o.find("option:selected").each(function() {
                    t.push(e(this).val())
                }) : s.exists() && s.each(function() {
                    e(this).val() && t.push(e(this).val())
                }))
            }), t = t.filter(function(e, t, i) {
                return i.indexOf(e) == t
            }), this.update("post_taxonomy", t).fetch()
        }, _change_template: function(e) {
            var t = e.$el.val();
            this.update("page_template", t).fetch()
        }, _change_parent: function(e) {
            var t = "parent", i = 0;
            "" != e.$el.val() && (t = "child", i = e.$el.val()), this.update("page_type", t).update("page_parent", i).fetch()
        }, _change_format: function(e) {
            var t = e.$el.val();
            "0" == t && (t = "standard"), this.update("post_format", t).fetch()
        }, _change_term: function(e) {
            var t = this;
            e.$el.closest(".media-frame").exists() || setTimeout(function() {
                t.sync_taxonomy_terms()
            }, 1)
        }})
}(jQuery), function(e) {
    wcpoa.fields.checkbox = wcpoa.field.extend({type: "checkbox", events: {"change input": "_change", "click .wcpoa-add-checkbox": "_add"}, focus: function() {
            this.$ul = this.$field.find("ul"), this.$input = this.$field.find('input[type="hidden"]')
        }, add: function() {
            var e = '<li><input class="wcpoa-checkbox-custom" type="checkbox" checked="checked" /><input type="text" name="' + (this.$input.attr("name") + "[]") + '" /></li>';
            this.$ul.find(".wcpoa-add-checkbox").parent("li").before(e)
        }, _change: function(e) {
            var t = this.$ul, i = t.find('input[type="checkbox"]').not(".wcpoa-checkbox-toggle"), a = e.$el.is(":checked");
            if (e.$el.hasClass("wcpoa-checkbox-toggle"))
                i.prop("checked", a).trigger("change");
            else {
                if (e.$el.hasClass("wcpoa-checkbox-custom")) {
                    var n = e.$el.next('input[type="text"]');
                    e.$el.next('input[type="text"]').prop("disabled", !a), a || "" != n.val() || e.$el.parent("li").remove()
                }
                if (t.find(".wcpoa-checkbox-toggle").exists()) {
                    a = 0 == i.not(":checked").length;
                    t.find(".wcpoa-checkbox-toggle").prop("checked", a)
                }
            }
        }, _add: function(e) {
            this.add()
        }})
}(jQuery), function(e) {
    wcpoa.fields.color_picker = wcpoa.field.extend({type: "color_picker", $input: null, $hidden: null, actions: {ready: "initialize", append: "initialize"}, focus: function() {
            this.$input = this.$field.find('input[type="text"]'), this.$hidden = this.$field.find('input[type="hidden"]')
        }, initialize: function() {
            var e = this.$input, t = this.$hidden, i = function() {
                setTimeout(function() {
                    wcpoa.val(t, e.val())
                }, 1)
            }, a = {defaultColor: !1, palettes: !0, hide: !0, change: i, clear: i}, a = wcpoa.apply_filters("color_picker_args", a, this.$field);
            this.$input.wpColorPicker(a)
        }})
}(jQuery), function(e) {
    wcpoa.conditional_logic = wcpoa.model.extend({actions: {"prepare 20": "render", "append 20": "render"}, events: {"change .wcpoa-field input": "change", "change .wcpoa-field textarea": "change", "change .wcpoa-field select": "change"}, items: {}, triggers: {}, add: function(e, t) {
            for (var i in t) {
                var a = t[i];
                for (var n in a) {
                    var o = a[n].field, s = this.triggers[o] || {};
                    s[e] = e, this.triggers[o] = s
                }
            }
            this.items[e] = t
        }, render: function(e) {
            e = e || !1;
            var t = wcpoa.get_fields("", e, !0);
            this.render_fields(t), wcpoa.do_action("refresh", e)
        }, change: function(e) {
            var t = e.$el, i = wcpoa.get_field_wrap(t), a = i.data("key");
            if (void 0 === this.triggers[a])
                return!1;
            $parent = i.parent();
            for (var n in this.triggers[a]) {
                var o = this.triggers[a][n], s = wcpoa.get_fields(o, $parent, !0);
                this.render_fields(s)
            }
            wcpoa.do_action("refresh", $parent)
        }, render_fields: function(t) {
            var i = this;
            t.each(function() {
                i.render_field(e(this))
            })
        }, render_field: function(e) {
            var t = e.data("key");
            if (void 0 === this.items[t])
                return!1;
            for (var i = !1, a = this.items[t], n = 0; n < a.length; n++) {
                for (var o = a[n], s = !0, r = 0; r < o.length; r++) {
                    var l = o[r], c = this.get_trigger(e, l.field);
                    if (!this.calculate(l, c, e)) {
                        s = !1;
                        break
                    }
                }
                if (s) {
                    i = !0;
                    break
                }
            }
            i ? this.show_field(e) : this.hide_field(e)
        }, show_field: function(e) {
            var t = e.data("key");
            e.removeClass("hidden-by-conditional-logic"), wcpoa.enable_form(e, "condition_" + t), wcpoa.do_action("show_field", e, "conditional_logic")
        }, hide_field: function(e) {
            var t = e.data("key");
            e.addClass("hidden-by-conditional-logic"), wcpoa.disable_form(e, "condition_" + t), wcpoa.do_action("hide_field", e, "conditional_logic")
        }, get_trigger: function(t, i) {
            var a = wcpoa.get_selector(i), n = t.siblings(a);
            if (!n.exists()) {
                var o = wcpoa.get_selector();
                t.parents(o).each(function() {
                    if ((n = e(this).siblings(a)).exists())
                        return!1
                })
            }
            return!!n.exists() && n
        }, calculate: function(e, t, i) {
            if (!t || !i)
                return!1;
            var a = !1, n = t.data("type");
            return"true_false" == n || "checkbox" == n || "radio" == n ? a = this.calculate_checkbox(e, t) : "select" == n && (a = this.calculate_select(e, t)), "!=" === e.operator && (a = !a), a
        }, calculate_checkbox: function(e, t) {
            var i = t.find('input[value="' + e.value + '"]:checked').exists();
            return"" !== e.value || t.find("input:checked").exists() || (i = !0), i
        }, calculate_select: function(t, i) {
            var a = i.find("select").val();
            return a || e.isNumeric(a) || (a = ""), e.isArray(a) || (a = [a]), match = e.inArray(t.value, a) > -1, match
        }})
}(jQuery), function(e) {
    wcpoa.datepicker = wcpoa.model.extend({actions: {"ready 1": "ready"}, ready: function() {
            var t = wcpoa.get("locale"), i = wcpoa.get("rtl");
            l10n = wcpoa._e("date_picker"), l10n && void 0 !== e.datepicker && (l10n.isRTL = i, e.datepicker.regional[t] = l10n, e.datepicker.setDefaults(l10n))
        }, init: function(t, i) {
            void 0 !== e.datepicker && (i = i || {}, t.datepicker(i), e("body > #ui-datepicker-div").exists() && e("body > #ui-datepicker-div").wrap('<div class="wcpoa-ui-datepicker" />'))
        }, destroy: function(e) {
        }}), wcpoa.fields.date_picker = wcpoa.field.extend({type: "date_picker", $el: null, $input: null, $hidden: null, o: {}, actions: {ready: "initialize", append: "initialize"}, events: {'blur input[type="text"]': "blur"}, focus: function() {
            this.$el = this.$field.find(".wcpoa-date-picker"), this.$input = this.$el.find('input[type="text"]'), this.$hidden = this.$el.find('input[type="hidden"]'), this.o = wcpoa.get_data(this.$el)
        }, initialize: function() {
            if (this.o.save_format)
                return this.initialize2();
            var e = {dateFormat: this.o.date_format, altField: this.$hidden, altFormat: "yy/mm/dd", changeYear: !0, yearRange: "-100:+100", changeMonth: !0, showButtonPanel: !0, minDate: 0, firstDay: this.o.first_day};
            e = wcpoa.apply_filters("date_picker_args", e, this.$field), wcpoa.datepicker.init(this.$input, e), wcpoa.do_action("date_picker_init", this.$input, e, this.$field)
        }, initialize2: function() {
            this.$input.val(this.$hidden.val());
            var e = {dateFormat: this.o.date_format, altField: this.$hidden, altFormat: this.o.save_format, changeYear: !0, yearRange: "-100:+100", changeMonth: !0, showButtonPanel: !0, minDate: 0, firstDay: this.o.first_day}, t = (e = wcpoa.apply_filters("date_picker_args", e, this.$field)).dateFormat;
            e.dateFormat = this.o.save_format, wcpoa.datepicker.init(this.$input, e), this.$input.datepicker("option", "dateFormat", t), wcpoa.do_action("date_picker_init", this.$input, e, this.$field)
        }, blur: function() {
            this.$input.val() || this.$hidden.val("")
        }})
}(jQuery), function(e) {
    wcpoa.datetimepicker = wcpoa.model.extend({actions: {"ready 1": "ready"}, ready: function() {
            var t = wcpoa.get("locale"), i = wcpoa.get("rtl");
            l10n = wcpoa._e("date_time_picker"), l10n && void 0 !== e.timepicker && (l10n.isRTL = i, e.timepicker.regional[t] = l10n, e.timepicker.setDefaults(l10n))
        }, init: function(t, i) {
            void 0 !== e.timepicker && (i = i || {}, t.datetimepicker(i), e("body > #ui-datepicker-div").exists() && e("body > #ui-datepicker-div").wrap('<div class="wcpoa-ui-datepicker" />'))
        }, destroy: function(e) {
        }}), wcpoa.fields.date_time_picker = wcpoa.field.extend({type: "date_time_picker", $el: null, $input: null, $hidden: null, o: {}, actions: {ready: "initialize", append: "initialize"}, events: {'blur input[type="text"]': "blur"}, focus: function() {
            this.$el = this.$field.find(".wcpoa-date-time-picker"), this.$input = this.$el.find('input[type="text"]'), this.$hidden = this.$el.find('input[type="hidden"]'), this.o = wcpoa.get_data(this.$el)
        }, initialize: function() {
            var e = {dateFormat: this.o.date_format, timeFormat: this.o.time_format, altField: this.$hidden, altFieldTimeOnly: !1, altFormat: "yy-mm-dd", altTimeFormat: "HH:mm:ss", changeYear: !0, yearRange: "-100:+100", changeMonth: !0, showButtonPanel: !0, firstDay: this.o.first_day, controlType: "select", oneLine: !0};
            e = wcpoa.apply_filters("date_time_picker_args", e, this.$field), wcpoa.datetimepicker.init(this.$input, e), wcpoa.do_action("date_time_picker_init", this.$input, e, this.$field)
        }, blur: function() {
            this.$input.val() || this.$hidden.val("")
        }})
}(jQuery), function(e) {
    wcpoa.fields.file = wcpoa.field.extend({type: "file", $el: null, $input: null, actions: {ready: "initialize", append: "initialize"}, events: {'click a[data-name="add"]': "add", 'click a[data-name="edit"]': "edit", 'click a[data-name="remove"]': "remove", 'change input[type="file"]': "change"}, focus: function() {
            this.$el = this.$field.find(".wcpoa-file-uploader"), this.$input = this.$el.find('input[type="hidden"]'), this.o = wcpoa.get_data(this.$el)
        }, initialize: function() {
            "basic" == this.o.uploader && this.$el.closest("form").attr("enctype", "multipart/form-data")
        }, prepare: function(e) {
            if ((e = e || {})._valid)
                return e;
            var t = {url: "", alt: "", title: "", filename: "", filesize: "", icon: "/wp-includes/images/media/default.png"};
            return e.id && (t = e.attributes), t._valid = !0, t
        }, render: function(e) {
            e = this.prepare(e), this.$el.find("img").attr({src: e.icon, alt: e.alt, title: e.title}), this.$el.find('[data-name="title"]').text(e.title), this.$el.find('[data-name="filename"]').text(e.filename).attr("href", e.url), this.$el.find('[data-name="filesize"]').text(e.filesize);
            var t = "";
            e.id && (t = e.id), wcpoa.val(this.$input, t), t ? this.$el.addClass("has-value") : this.$el.removeClass("has-value")
        }, add: function() {
            var t = this, i = this.$field, a = wcpoa.get_closest_field(i, "repeater");
            wcpoa.media.popup({title: wcpoa._e("file", "select"), mode: "select1", type: "", field: i.data("key"), multiple: a.exists(), library: this.o.library, mime_types: this.o.mime_types, select: function(n, o) {
                    if (o > 0) {
                        var s = i.data("key"), r = i.closest(".wcpoa-row");
                        if (i = !1, r.nextAll(".wcpoa-row:visible").each(function() {
                            return(i = wcpoa.get_field(s, e(this))) ? !!i.find(".wcpoa-file-uploader.has-value").exists() && void(i = !1) : void 0
                        }), !i) {
                            if (!(r = wcpoa.fields.repeater.doFocus(a).add()))
                                return!1;
                            i = wcpoa.get_field(s, r)
                        }
                    }
                    t.set("$field", i).render(n), jQuery(".wcpoa-error-message").hide()
                }})
        }, edit: function() {
            var e = this, t = this.$field, i = this.$input.val();
            if (i)
                wcpoa.media.popup({title: wcpoa._e("file", "edit"), button: wcpoa._e("file", "update"), mode: "edit1", attachment: i, select: function(i, a) {
                        e.set("$field", t).render(i)
                    }})
        }, remove: function() {
            var e = {};
            this.render(e)
        }, change: function(e) {
            this.$input.val(e.$el.val())
        }})
}(jQuery), function(e) {
    wcpoa.fields.google_map = wcpoa.field.extend({type: "google_map", url: "", $el: null, $search: null, timeout: null, status: "", geocoder: !1, map: !1, maps: {}, $pending: e(), actions: {ready: "initialize", append: "initialize", show: "show"}, events: {'click a[data-name="clear"]': "_clear", 'click a[data-name="locate"]': "_locate", 'click a[data-name="search"]': "_search", "keydown .search": "_keydown", "keyup .search": "_keyup", "focus .search": "_focus", "blur .search": "_blur", "mousedown .wcpoa-google-map": "_mousedown"}, focus: function() {
            this.$el = this.$field.find(".wcpoa-google-map"), this.$search = this.$el.find(".search"), this.o = wcpoa.get_data(this.$el), this.o.id = this.$el.attr("id"), this.maps[this.o.id] && (this.map = this.maps[this.o.id])
        }, is_ready: function() {
            var e = this;
            return"ready" == this.status || "loading" != this.status && (wcpoa.isset(window, "google", "maps", "places") ? (this.status = "ready", !0) : (wcpoa.isset(window, "google", "maps") && (this.status = "ready"), this.url && (this.status = "loading", wcpoa.enqueue_script(this.url, function() {
                e.status = "ready", e.initialize_pending()
            })), "ready" == this.status))
        }, initialize_pending: function() {
            var t = this;
            this.$pending.each(function() {
                t.set("$field", e(this)).initialize()
            }), this.$pending = e()
        }, initialize: function() {
            if (!this.is_ready())
                return this.$pending = this.$pending.add(this.$field), !1;
            this.geocoder || (this.geocoder = new google.maps.Geocoder);
            var e = this, t = this.$field, i = this.$el;
            this.$search.val(this.$el.find(".input-address").val());
            var a = wcpoa.apply_filters("google_map_args", {scrollwheel: !1, zoom: parseInt(this.o.zoom), center: new google.maps.LatLng(this.o.lat, this.o.lng), mapTypeId: google.maps.MapTypeId.ROADMAP}, this.$field);
            if (this.map = new google.maps.Map(this.$el.find(".canvas")[0], a), wcpoa.isset(window, "google", "maps", "places", "Autocomplete")) {
                var n = new google.maps.places.Autocomplete(this.$search[0]);
                n.bindTo("bounds", this.map), google.maps.event.addListener(n, "place_changed", function(t) {
                    var i = this.getPlace();
                    e.search(i)
                }), this.map.autocomplete = n
            }
            var o = wcpoa.apply_filters("google_map_marker_args", {draggable: !0, raiseOnDrag: !0, map: this.map}, this.$field);
            this.map.marker = new google.maps.Marker(o), this.map.$el = i, this.map.$field = t;
            var s = i.find(".input-lat").val(), r = i.find(".input-lng").val();
            s && r && this.update(s, r).center(), google.maps.event.addListener(this.map.marker, "dragend", function() {
                var t = this.map.marker.getPosition(), i = t.lat(), a = t.lng();
                e.update(i, a).sync()
            }), google.maps.event.addListener(this.map, "click", function(t) {
                var i = t.latLng.lat(), a = t.latLng.lng();
                e.update(i, a).sync()
            }), wcpoa.do_action("google_map_init", this.map, this.map.marker, this.$field), this.maps[this.o.id] = this.map
        }, search: function(t) {
            var i = this, a = this.$search.val();
            if (!a)
                return!1;
            this.$el.find(".input-address").val(a);
            var n = a.split(",");
            if (2 == n.length) {
                var o = n[0], s = n[1];
                if (e.isNumeric(o) && e.isNumeric(s))
                    return o = parseFloat(o), s = parseFloat(s), void i.update(o, s).center()
            }
            if (t && t.geometry) {
                var o = t.geometry.location.lat(), s = t.geometry.location.lng();
                i.update(o, s).center()
            } else
                this.$el.addClass("-loading"), i.geocoder.geocode({address: a}, function(e, a) {
                    if (i.$el.removeClass("-loading"), a == google.maps.GeocoderStatus.OK)
                        if (e[0]) {
                            var n = (t = e[0]).geometry.location.lat(), o = t.geometry.location.lng();
                            i.update(n, o).center()
                        } else
                            console.log("No results found");
                    else
                        console.log("Geocoder failed due to: " + a)
                })
        }, update: function(e, t) {
            var i = new google.maps.LatLng(e, t);
            return wcpoa.val(this.$el.find(".input-lat"), e), wcpoa.val(this.$el.find(".input-lng"), t), this.map.marker.setPosition(i), this.map.marker.setVisible(!0), this.$el.addClass("-value"), this.$field.removeClass("error"), wcpoa.do_action("google_map_change", i, this.map, this.$field), this.$search.blur(), this
        }, center: function() {
            var e = this.map.marker.getPosition(), t = this.o.lat, i = this.o.lng;
            e && (t = e.lat(), i = e.lng());
            var a = new google.maps.LatLng(t, i);
            this.map.setCenter(a)
        }, sync: function() {
            var e = this, t = this.map.marker.getPosition(), i = new google.maps.LatLng(t.lat(), t.lng());
            return this.$el.addClass("-loading"), this.geocoder.geocode({latLng: i}, function(t, i) {
                if (e.$el.removeClass("-loading"), i == google.maps.GeocoderStatus.OK)
                    if (t[0]) {
                        var a = t[0];
                        e.$search.val(a.formatted_address), wcpoa.val(e.$el.find(".input-address"), a.formatted_address)
                    } else
                        console.log("No results found");
                else
                    console.log("Geocoder failed due to: " + i)
            }), this
        }, refresh: function() {
            if (!this.is_ready())
                return!1;
            google.maps.event.trigger(this.map, "resize"), this.center()
        }, show: function() {
            var e = this, t = this.$field;
            setTimeout(function() {
                e.set("$field", t).refresh()
            }, 10)
        }, _clear: function(e) {
            this.$el.removeClass("-value -loading -search"), this.$search.val(""), wcpoa.val(this.$el.find(".input-address"), ""), wcpoa.val(this.$el.find(".input-lat"), ""), wcpoa.val(this.$el.find(".input-lng"), ""), this.map.marker.setVisible(!1)
        }, _locate: function(e) {
            var t = this;
            if (!navigator.geolocation)
                return alert(wcpoa._e("google_map", "browser_support")), this;
            this.$el.addClass("-loading"), navigator.geolocation.getCurrentPosition(function(e) {
                t.$el.removeClass("-loading");
                var i = e.coords.latitude, a = e.coords.longitude;
                t.update(i, a).sync().center()
            })
        }, _search: function(e) {
            this.search()
        }, _focus: function(e) {
            this.$el.removeClass("-value"), this._keyup()
        }, _blur: function(e) {
            var t = this, i = this.$el.find(".input-address").val();
            i && (this.timeout = setTimeout(function() {
                t.$el.addClass("-value"), t.$search.val(i)
            }, 100))
        }, _keydown: function(e) {
            13 == e.which && e.preventDefault()
        }, _keyup: function(e) {
            this.$search.val() ? this.$el.addClass("-search") : this.$el.removeClass("-search")
        }, _mousedown: function(e) {
            var t = this;
            setTimeout(function() {
                clearTimeout(t.timeout)
            }, 1)
        }})
}(jQuery), function(e) {
    wcpoa.fields.image = wcpoa.field.extend({type: "image", $el: null, $input: null, $img: null, actions: {ready: "initialize", append: "initialize"}, events: {'click a[data-name="add"]': "add", 'click a[data-name="edit"]': "edit", 'click a[data-name="remove"]': "remove", 'change input[type="file"]': "change"}, focus: function() {
            this.$el = this.$field.find(".wcpoa-image-uploader"), this.$input = this.$el.find('input[type="hidden"]'), this.$img = this.$el.find("img"), this.o = wcpoa.get_data(this.$el)
        }, initialize: function() {
            "basic" == this.o.uploader && this.$el.closest("form").attr("enctype", "multipart/form-data")
        }, prepare: function(e) {
            if ((e = e || {})._valid)
                return e;
            var t = {url: "", alt: "", title: "", caption: "", description: "", width: 0, height: 0};
            return e.id && ((t = e.attributes).url = wcpoa.maybe_get(t, "sizes." + this.o.preview_size + ".url", t.url)), t._valid = !0, t
        }, render: function(e) {
            e = this.prepare(e), this.$img.attr({src: e.url, alt: e.alt, title: e.title});
            var t = "";
            e.id && (t = e.id), wcpoa.val(this.$input, t), t ? this.$el.addClass("has-value") : this.$el.removeClass("has-value")
        }, add: function() {
            var t = this, i = this.$field, a = wcpoa.get_closest_field(this.$field, "repeater");
            wcpoa.media.popup({title: wcpoa._e("image", "select"), mode: "select", type: "image", field: i.data("key"), multiple: a.exists(), library: this.o.library, mime_types: this.o.mime_types, select: function(n, o) {
                    if (o > 0) {
                        var s = i.data("key"), r = i.closest(".wcpoa-row");
                        if (i = !1, r.nextAll(".wcpoa-row:visible").each(function() {
                            if (i = wcpoa.get_field(s, e(this))) {
                                if (!i.find(".wcpoa-image-uploader.has-value").exists())
                                    return!1;
                                i = !1
                            }
                        }), !i) {
                            if (!(r = wcpoa.fields.repeater.doFocus(a).add()))
                                return!1;
                            i = wcpoa.get_field(s, r)
                        }
                    }
                    t.set("$field", i).render(n)
                }})
        }, edit: function() {
            var e = this, t = this.$field, i = this.$input.val();
            if (i)
                wcpoa.media.popup({title: wcpoa._e("image", "edit"), button: wcpoa._e("image", "update"), mode: "edit", attachment: i, select: function(i, a) {
                        e.set("$field", t).render(i)
                    }})
        }, remove: function() {
            var e = {};
            this.render(e)
        }, change: function(e) {
            wcpoa.fields.file.get_file_info(e.$el, this.$input)
        }})
}(jQuery), function(e) {
    wcpoa.fields.link = wcpoa.field.extend({type: "link", active: !1, $el: null, $node: null, events: {'click a[data-name="add"]': "add", 'click a[data-name="edit"]': "edit", 'click a[data-name="remove"]': "remove", "change .link-node": "change"}, focus: function() {
            this.$el = this.$field.find(".wcpoa-link"), this.$node = this.$el.find(".link-node")
        }, add: function(e) {
            wcpoa.link.open(this.$node)
        }, edit: function(e) {
            this.add()
        }, remove: function(e) {
            this.val("")
        }, change: function(e, t) {
            var i = {title: this.$node.html(), url: this.$node.attr("href"), target: this.$node.attr("target")};
            this.val(i)
        }, val: function(e) {
            e = wcpoa.parse_args(e, {title: "", url: "", target: ""}), this.$el.removeClass("-value -external"), e.url && this.$el.addClass("-value"), "_blank" === e.target && this.$el.addClass("-external"), this.$el.find(".link-title").html(e.title), this.$el.find(".link-url").attr("href", e.url).html(e.url), this.$el.find(".input-title").val(e.title), this.$el.find(".input-target").val(e.target), this.$el.find(".input-url").val(e.url).trigger("change"), this.$node.html(e.title), this.$node.attr("href", e.url), this.$node.attr("target", e.target)
        }}), wcpoa.link = wcpoa.model.extend({active: !1, $textarea: null, $node: null, events: {"click #wp-link-submit": "_update", "wplink-open": "_open", "wplink-close": "_close"}, atts: function(e) {
            return void 0 !== e ? (this.$node.html(e.title), this.$node.attr("href", e.url), this.$node.attr("target", e.target), this.$node.trigger("change", [e]), !0) : {title: this.$node.html(), url: this.$node.attr("href"), target: this.$node.attr("target")}
        }, inputs: function(t) {
            return void 0 !== t ? (e("#wp-link-text").val(t.title), e("#wp-link-url").val(t.url), e("#wp-link-target").prop("checked", "_blank" === t.target), !0) : {title: e("#wp-link-text").val(), url: e("#wp-link-url").val(), target: e("#wp-link-target").prop("checked") ? "_blank" : ""}
        }, open: function(t) {
            var i = e('<textarea id="wcpoa-link-textarea"></textarea>');
            t.before(i), this.active = !0, this.$node = t, this.$textarea = i;
            var a = this.atts();
            wpLink.open("wcpoa-link-textarea", a.url, a.title, null), e("#wp-link-wrap").addClass("has-text-field")
        }, reset: function() {
            this.active = !1, this.$textarea.remove(), this.$textarea = null, this.$node = null
        }, _select: function(e, t) {
            var i = this.inputs();
            i.title || (i.title = t.find(".item-title").text(), this.inputs(i), console.log(i))
        }, _open: function(e) {
            if (this.active) {
                var t = this.atts();
                this.inputs(t)
            }
        }, _close: function(e) {
            this.active && setTimeout(function() {
                wcpoa.link.reset()
            }, 100)
        }, _update: function(e) {
            if (this.active) {
                var t = this.inputs();
                this.atts(t)
            }
        }})
}(jQuery), function(e) {
    wcpoa.media = wcpoa.model.extend({frames: [], mime_types: {}, actions: {ready: "ready"}, frame: function() {
            var e = this.frames.length - 1;
            return!(e < 0) && this.frames[e]
        }, destroy: function(e) {
            e.detach(), e.dispose(), e = null, this.frames.pop()
        }, popup: function(t) {
            var i = wcpoa.get("post_id"), a = !1;
            e.isNumeric(i) || (i = 0);
            var n = wcpoa.parse_args(t, {mode: "select", title: "", button: "", type: "", field: "", mime_types: "", library: "all", multiple: !1, attachment: 0, post_id: i, select: function() {
                }});
            n.id && (n.attachment = n.id);
            a = this.new_media_frame(n);
            return this.frames.push(a), setTimeout(function() {
                a.open()
            }, 1), a
        }, _get_media_frame_settings: function(e, t) {
            return"select" === t.mode ? e = this._get_select_frame_settings(e, t) : "edit" === t.mode && (e = this._get_edit_frame_settings(e, t)), e
        }, _get_select_frame_settings: function(e, t) {
            return t.type && (e.library.type = t.type), "uploadedTo" === t.library && (e.library.uploadedTo = t.post_id), e._button = wcpoa._e("media", "select"), e
        }, _get_edit_frame_settings: function(e, t) {
            return e.library.post__in = [t.attachment], e._button = wcpoa._e("media", "update"), e
        }, _add_media_frame_events: function(e, t) {
            return e.on("open", function() {
                this.$el.closest(".media-modal").addClass("wcpoa-media-modal -" + t.mode)
            }, e), e.on("content:render:edit-image", function() {
                var e = this.state().get("image"), t = new wp.media.view.EditImage({model: e, controller: this}).render();
                this.content.set(t), t.loadEditor()
            }, e), e.on("toolbar:create:select", function(t) {
                t.view = new wp.media.view.Toolbar.Select({text: e.options._button, controller: this})
            }, e), e.on("select", function() {
                var i = e.state(), a = i.get("image"), n = i.get("selection");
                if (a)
                    t.select.apply(e, [a, 0]);
                else if (n) {
                    var o = 0;
                    n.each(function(i) {
                        t.select.apply(e, [i, o]), o++
                    })
                } else
                    ;
            }), e.on("close", function() {
                setTimeout(function() {
                    wcpoa.media.destroy(e)
                }, 500)
            }), "select" === t.mode ? e = this._add_select_frame_events(e, t) : "edit" === t.mode && (e = this._add_edit_frame_events(e, t)), e
        }, _add_select_frame_events: function(t, i) {
            var a = this;
            return wcpoa.isset(_wpPluploadSettings, "defaults", "multipart_params") && (_wpPluploadSettings.defaults.multipart_params._wcpoauploader = i.field, t.on("open", function() {
                delete _wpPluploadSettings.defaults.multipart_params._wcpoauploader
            })), t.on("content:activate:browse", function() {
                try {
                    var n = t.content.get().toolbar, o = n.get("filters"), s = n.get("search")
                } catch (e) {
                    return
                }
                if ("image" == i.type && (o.filters.all.text = wcpoa._e("image", "all"), delete o.filters.audio, delete o.filters.video, e.each(o.filters, function(e, t) {
                    null === t.props.type && (t.props.type = "image")
                })), i.mime_types) {
                    var r = i.mime_types.split(" ").join("").split(".").join("").split(",");
                    e.each(r, function(t, i) {
                        e.each(a.mime_types, function(e, t) {
                            if (-1 !== e.indexOf(i)) {
                                var a = {text: i, props: {status: null, type: t, uploadedTo: null, orderby: "date", order: "DESC"}, priority: 20};
                                o.filters[t] = a
                            }
                        })
                    })
                }
                "uploadedTo" == i.library && (delete o.filters.unattached, delete o.filters.uploaded, o.$el.parent().append('<span class="wcpoa-uploadedTo">' + wcpoa._e("image", "uploadedTo") + "</span>"), e.each(o.filters, function(e, t) {
                    t.props.uploadedTo = i.post_id
                })), e.each(o.filters, function(e, t) {
                    t.props._wcpoauploader = i.field
                }), s.model.attributes._wcpoauploader = i.field, "function" == typeof o.refresh && o.refresh()
            }), t
        }, _add_edit_frame_events: function(e, t) {
            return e.on("open", function() {
                this.$el.closest(".media-modal").addClass("wcpoa-expanded"), "browse" != this.content.mode() && this.content.mode("browse");
                var e = this.state().get("selection"), i = wp.media.attachment(t.attachment);
                e.add(i)
            }, e), e
        }, new_media_frame: function(e) {
            var t = {title: e.title, multiple: e.multiple, library: {}, states: []};
            t = this._get_media_frame_settings(t, e);
            var i = wp.media.query(t.library);
            wcpoa.isset(i, "mirroring", "args") && (i.mirroring.args._wcpoauploader = e.field), t.states = [new wp.media.controller.Library({library: i, multiple: t.multiple, title: t.title, priority: 20, filterable: "all", editable: !0, allowLocalEdits: !0})], wcpoa.isset(wp, "media", "controller", "EditImage") && t.states.push(new wp.media.controller.EditImage);
            var a = wp.media(t);
            return a.wcpoa = e, a = this._add_media_frame_events(a, e)
        }, ready: function() {
            var t = wcpoa.get("wp_version"), i = wcpoa.get("browser"), a = wcpoa.get("post_id");
            wcpoa.isset(window, "wp", "media", "view", "settings", "post") && e.isNumeric(a) && (wp.media.view.settings.post.id = a), i && e("body").addClass("browser-" + i), t && (t += "", major = t.substr(0, 1), e("body").addClass("major-" + major)), wcpoa.isset(window, "wp", "media", "view") && (this.customize_Attachment(), this.customize_AttachmentFiltersAll(), this.customize_AttachmentCompat())
        }, customize_Attachment: function() {
            var e = wp.media.view.Attachment.Library;
            wp.media.view.Attachment.Library = e.extend({render: function() {
                    var t = wcpoa.media.frame(), i = wcpoa.maybe_get(this, "model.attributes.wcpoa_errors");
                    return t && i && this.$el.addClass("wcpoa-disabled"), e.prototype.render.apply(this, arguments)
                }, toggleSelection: function(t) {
                    this.collection;
                    var i = this.options.selection, a = this.model, n = (i.single(), wcpoa.media.frame()), o = wcpoa.maybe_get(this, "model.attributes.wcpoa_errors"), s = this.controller.$el.find(".media-frame-content .media-sidebar");
                    if (s.children(".wcpoa-selection-error").remove(), s.children().removeClass("wcpoa-hidden"), n && o) {
                        var r = wcpoa.maybe_get(this, "model.attributes.filename", "");
                        return s.children().addClass("wcpoa-hidden"), s.prepend(['<div class="wcpoa-selection-error">', '<span class="selection-error-label">' + wcpoa._e("restricted") + "</span>", '<span class="selection-error-filename">' + r + "</span>", '<span class="selection-error-message">' + o + "</span>", "</div>"].join("")), i.reset(), void i.single(a)
                    }
                    e.prototype.toggleSelection.apply(this, arguments)
                }})
        }, customize_AttachmentFiltersAll: function() {
            wp.media.view.AttachmentFilters.All.prototype.refresh = function() {
                this.$el.html(_.chain(this.filters).map(function(t, i) {
                    return{el: e("<option></option>").val(i).html(t.text)[0], priority: t.priority || 50}
                }, this).sortBy("priority").pluck("el").value())
            }
        }, customize_AttachmentCompat: function() {
            var t = wp.media.view.AttachmentCompat;
            wp.media.view.AttachmentCompat = t.extend({add_wcpoa_expand_button: function() {
                    var t = this.$el.closest(".media-modal");
                    if (!t.find(".media-frame-router .wcpoa-expand-details").exists()) {
                        var i = e(['<a href="#" class="wcpoa-expand-details">', '<span class="is-closed"><span class="wcpoa-icon -left small grey"></span>' + wcpoa._e("expand_details") + "</span>", '<span class="is-open"><span class="wcpoa-icon -right small grey"></span>' + wcpoa._e("collapse_details") + "</span>", "</a>"].join(""));
                        i.on("click", function(e) {
                            e.preventDefault(), t.hasClass("wcpoa-expanded") ? t.removeClass("wcpoa-expanded") : t.addClass("wcpoa-expanded")
                        }), t.find(".media-frame-router").append(i)
                    }
                }, render: function() {
                    if (this.ignore_render)
                        return this;
                    var e = this;
                    return setTimeout(function() {
                        e.add_wcpoa_expand_button()
                    }, 0), clearTimeout(wcpoa.media.render_timout), wcpoa.media.render_timout = setTimeout(function() {
                        wcpoa.do_action("append", e.$el)
                    }, 50), t.prototype.render.apply(this, arguments)
                }, dispose: function() {
                    return wcpoa.do_action("remove", this.$el), t.prototype.dispose.apply(this, arguments)
                }, save: function(e) {
                    e && e.preventDefault();
                    var t = wcpoa.serialize(this.$el);
                    this.ignore_render = !0, this.model.saveCompat(t)
                }})
        }})
}(jQuery), function(e) {
    wcpoa.fields.oembed = wcpoa.field.extend({type: "oembed", $el: null, events: {'click [data-name="search-button"]': "_search", 'click [data-name="clear-button"]': "_clear", 'click [data-name="value-title"]': "_edit", 'keypress [data-name="search-input"]': "_keypress", 'keyup [data-name="search-input"]': "_keyup", 'blur [data-name="search-input"]': "_blur"}, focus: function() {
            this.$el = this.$field.find(".wcpoa-oembed"), this.$search = this.$el.find('[data-name="search-input"]'), this.$input = this.$el.find('[data-name="value-input"]'), this.$title = this.$el.find('[data-name="value-title"]'), this.$embed = this.$el.find('[data-name="value-embed"]'), this.o = wcpoa.get_data(this.$el)
        }, maybe_search: function() {
            var e = this.$input.val(), t = this.$search.val();
            t ? t != e && this.search() : this.clear()
        }, search: function() {
            var t = this.$search.val();
            "http" != t.substr(0, 4) && (t = "http://" + t, this.$search.val(t)), this.$el.addClass("is-loading");
            var i = wcpoa.prepare_for_ajax({action: "wcpoa/fields/oembed/search", s: t, field_key: this.$field.data("key")});
            this.$el.data("xhr") && this.$el.data("xhr").abort();
            var a = e.ajax({url: wcpoa.get("ajaxurl"), data: i, type: "post", dataType: "json", context: this, success: this.search_success});
            this.$el.data("xhr", a)
        }, search_success: function(e) {
            var t = this.$search.val();
            this.$el.removeClass("is-loading"), e && e.html ? (this.$el.removeClass("has-error").addClass("has-value"), this.$input.val(t), this.$title.html(t), this.$embed.html(e.html)) : this.$el.removeClass("has-value").addClass("has-error")
        }, clear: function() {
            this.$el.removeClass("has-error has-value"), this.$el.find('[data-name="search-input"]').val(""), this.$input.val(""), this.$title.html(""), this.$embed.html("")
        }, edit: function() {
            this.$el.addClass("is-editing"), this.$search.val(this.$title.text()).focus()
        }, blur: function(e) {
            this.$el.removeClass("is-editing"), this.maybe_search()
        }, _search: function(e) {
            this.search()
        }, _clear: function(e) {
            this.clear()
        }, _edit: function(e) {
            this.edit()
        }, _keypress: function(e) {
            13 == e.which && e.preventDefault()
        }, _keyup: function(e) {
            this.$search.val() && this.maybe_search()
        }, _blur: function(e) {
            this.blur()
        }})
}(jQuery), function(e) {
    wcpoa.fields.radio = wcpoa.field.extend({type: "radio", $ul: null, actions: {ready: "initialize", append: "initialize"}, events: {'click input[type="radio"]': "click"}, focus: function() {
            this.$ul = this.$field.find(".wcpoa-radio-list"), this.o = wcpoa.get_data(this.$ul)
        }, initialize: function() {
            this.$ul.find(".selected input").prop("checked", !0)
        }, click: function(e) {
            var t = e.$el, i = t.parent("label"), a = i.hasClass("selected"), n = t.val();
            if (this.$ul.find(".selected").removeClass("selected"), i.addClass("selected"), this.o.allow_null && a && (e.$el.prop("checked", !1), i.removeClass("selected"), n = !1, e.$el.trigger("change")), this.o.other_choice) {
                var o = this.$ul.find('input[type="text"]');
                "other" === n ? o.prop("disabled", !1).attr("name", t.attr("name")) : o.prop("disabled", !0).attr("name", "")
            }
        }})
}(jQuery), function(e) {
    wcpoa.fields.relationship = wcpoa.field.extend({type: "relationship", $el: null, $input: null, $filters: null, $choices: null, $values: null, actions: {ready: "initialize", append: "initialize"}, events: {"keypress [data-filter]": "submit_filter", "change [data-filter]": "change_filter", "keyup [data-filter]": "change_filter", "click .choices .wcpoa-rel-item": "add_item", 'click [data-name="remove_item"]': "remove_item"}, focus: function() {
            this.$el = this.$field.find(".wcpoa-relationship"), this.$input = this.$el.children('input[type="hidden"]'), this.$choices = this.$el.find(".choices"), this.$values = this.$el.find(".values"), this.o = wcpoa.get_data(this.$el)
        }, initialize: function() {
            var t = this, i = this.$field, a = this.$el, n = this.$input;
            this.$values.children(".list").sortable({items: "li", forceHelperSize: !0, forcePlaceholderSize: !0, scroll: !0, update: function() {
                    n.trigger("change")
                }}), this.$choices.children(".list").scrollTop(0).on("scroll", function(n) {
                if (!a.hasClass("is-loading") && !a.hasClass("is-empty") && Math.ceil(e(this).scrollTop()) + e(this).innerHeight() >= e(this).get(0).scrollHeight) {
                    var o = a.data("paged") || 1;
                    a.data("paged", o + 1), t.set("$field", i).fetch()
                }
            }), this.fetch()
        }, maybe_fetch: function() {
            var e = this, t = this.$field;
            this.o.timeout && clearTimeout(this.o.timeout);
            var i = setTimeout(function() {
                e.doFocus(t), e.fetch()
            }, 300);
            this.$el.data("timeout", i)
        }, fetch: function() {
            var t = this, i = this.$field;
            this.$el.addClass("is-loading"), this.o.xhr && (this.o.xhr.abort(), this.o.xhr = !1), this.o.action = "wcpoa/fields/relationship/query", this.o.field_key = i.data("key"), this.o.post_id = wcpoa.get("post_id");
            var a = wcpoa.prepare_for_ajax(this.o);
            1 == a.paged && this.$choices.children(".list").html(""), this.$choices.find("ul:last").append('<p><i class="wcpoa-loading"></i> ' + wcpoa._e("relationship", "loading") + "</p>");
            var n = e.ajax({url: wcpoa.get("ajaxurl"), dataType: "json", type: "post", data: a, success: function(e) {
                    t.set("$field", i).render(e)
                }});
            this.$el.data("xhr", n)
        }, render: function(t) {
            if (this.$el.removeClass("is-loading is-empty"), this.$choices.find("p").remove(), !t || !t.results || !t.results.length)
                return this.$el.addClass("is-empty"), void(1 == this.o.paged && this.$choices.children(".list").append("<p>" + wcpoa._e("relationship", "empty") + "</p>"));
            var i = e(this.walker(t.results));
            if (this.$values.find(".wcpoa-rel-item").each(function() {
                i.find('.wcpoa-rel-item[data-id="' + e(this).data("id") + '"]').addClass("disabled")
            }), this.o.s) {
                var a = this.o.s;
                a = wcpoa.addslashes(a), i.find(".wcpoa-rel-item").each(function() {
                    var t = e(this).text(), i = t.replace(new RegExp("(" + a + ")", "gi"), "<b>$1</b>");
                    e(this).html(e(this).html().replace(t, i))
                })
            }
            this.$choices.children(".list").append(i);
            var n = "", o = null;
            this.$choices.find(".wcpoa-rel-label").each(function() {
                if (e(this).text() == n)
                    return o.append(e(this).siblings("ul").html()), void e(this).parent().remove();
                n = e(this).text(), o = e(this).siblings("ul")
            })
        }, walker: function(t) {
            var i = "";
            if (e.isArray(t))
                for (var a in t)
                    i += this.walker(t[a]);
            else
                e.isPlainObject(t) && (void 0 !== t.children ? (i += '<li><span class="wcpoa-rel-label">' + t.text + '</span><ul class="wcpoa-bl">', i += this.walker(t.children), i += "</ul></li>") : i += '<li><span class="wcpoa-rel-item" data-id="' + t.id + '">' + t.text + "</span></li>");
            return i
        }, submit_filter: function(e) {
            13 == e.which && e.preventDefault()
        }, change_filter: function(e) {
            var t = e.$el.val(), i = e.$el.data("filter");
            this.$el.data(i) != t && (this.$el.data(i, t), this.$el.data("paged", 1), e.$el.is("select") ? this.fetch() : this.maybe_fetch())
        }, add_item: function(e) {
            if (this.o.max > 0 && this.$values.find(".wcpoa-rel-item").length >= this.o.max)
                alert(wcpoa._e("relationship", "max").replace("{max}", this.o.max));
            else {
                if (e.$el.hasClass("disabled"))
                    return!1;
                e.$el.addClass("disabled");
                var t = ["<li>", '<input type="hidden" name="' + this.$input.attr("name") + '[]" value="' + e.$el.data("id") + '" />', '<span data-id="' + e.$el.data("id") + '" class="wcpoa-rel-item">' + e.$el.html(), '<a href="#" class="wcpoa-icon -minus small dark" data-name="remove_item"></a>', "</span>", "</li>"].join("");
                this.$values.children(".list").append(t), this.$input.trigger("change"), wcpoa.validation.remove_error(this.$field)
            }
        }, remove_item: function(e) {
            var t = e.$el.parent(), i = t.data("id");
            t.parent("li").remove(), this.$choices.find('.wcpoa-rel-item[data-id="' + i + '"]').removeClass("disabled"), this.$input.trigger("change")
        }})
}(jQuery), function(e) {
    var t, i;

    t = wcpoa.select2 = wcpoa.model.extend({version: 0, version3: null, version4: null, actions: {"ready 1": "ready"}, ready: function() {
				    alert('hi');
            this.version = this.get_version(), this.do_function("ready")

        }, get_version: function() {
            return wcpoa.maybe_get(window, "Select2") ? 3 : wcpoa.maybe_get(window, "jQuery.fn.select2.amd") ? 4 : 0
        }, do_function: function(e, t) {
            t = t || [];
            var i = "version" + this.version;
            return void 0 !== this[i] && void 0 !== this[i][e] && this[i][e].apply(this, t)
        }, get_data: function(t, i) {
            var a = this;
            return i = i || [], t.children().each(function() {
                var t = e(this);
                t.is("optgroup") ? i.push({text: t.attr("label"), children: a.get_data(t)}) : i.push({id: t.attr("value"), text: t.text()})
            }), i
        }, decode_data: function(i) {
            return i ? (e.each(i, function(e, a) {
                i[e].text = wcpoa.decode(a.text), void 0 !== a.children && (i[e].children = t.decode_data(a.children))
            }), i) : []
        }, count_data: function(t) {
            var i = 0;
            return t ? (e.each(t, function(e, t) {
                i++, void 0 !== t.children && (i += t.children.length)
            }), i) : i
        }, get_ajax_data: function(e, t, i, a) {
            var n = wcpoa.prepare_for_ajax({action: e.ajax_action, field_key: e.key, s: t.term || "", paged: t.page || 1});
            return n = wcpoa.apply_filters("select2_ajax_data", n, e, i, a)
        }, get_ajax_results: function(e, t) {
            var i = {results: []};
            return e || (e = i), void 0 === e.results && (i.results = e, e = i), e.results = this.decode_data(e.results), e = wcpoa.apply_filters("select2_ajax_results", e, t)
        }, get_value: function(t) {
            var i = [], a = t.find("option:selected");
            return a.exists() ? ((a = a.sort(function(e, t) {
                return+e.getAttribute("data-i") - +t.getAttribute("data-i")
            })).each(function() {
                var t = e(this);
                i.push({id: t.attr("value"), text: t.text(), $el: t})
            }), i) : i
        }, get_input_value: function(e) {
            return e.val().split("||")
        }, sync_input_value: function(e, t) {
            e.val(t.val().join("||"))
        }, add_option: function(e, t, i) {
            e.find('option[value="' + t + '"]').length || e.append('<option value="' + t + '">' + i + "</option>")
        }, select_option: function(e, t) {
            e.find('option[value="' + t + '"]').prop("selected", !0), e.trigger("change")
        }, unselect_option: function(e, t) {
            e.find('option[value="' + t + '"]').prop("selected", !1), e.trigger("change")
        }, init: function(e, t, i) {
            this.do_function("init", arguments)
        }, destroy: function(e) {
            this.do_function("destroy", arguments)
        }, add_value: function(e, t, i) {
            this.do_function("add_value", arguments)
        }, remove_value: function(e, t) {
            this.do_function("remove_value", arguments)
        }, remove_value:function(e, t) {
            this.do_function("remove_value", arguments)
        }}), i = t.version4 = {init: function(a, n, o) {
            n = n || {}, o = o || null, n = e.extend({allow_null: !1, placeholder: "", multiple: !1, ajax: !1, ajax_action: ""}, n);
            var s = a.siblings("input");
            if (s.exists()) {
                var r = {width: "100%", allowClear: n.allow_null, placeholder: n.placeholder, multiple: n.multiple, separator: "||", data: [], escapeMarkup: function(e) {
                        return e
                    }}, l = this.get_value(a);
                n.multiple ? e.each(l, function(e, t) {
                    t.$el.detach().appendTo(a)
                }) : l = wcpoa.maybe_get(l, 0, ""), n.ajax ? r.ajax = {url: wcpoa.get("ajaxurl"), delay: 250, dataType: "json", type: "post", cache: !1, data: function(e) {
                        return t.get_ajax_data(n, e, a, o)
                    }, processResults: function(e, a) {
                        var n = t.get_ajax_results(e, a);
                        return n.more && (n.pagination = {more: !0}), setTimeout(function() {
                            i.merge_results()
                        }, 1), n
                    }} : (a.removeData("ajax"), a.removeAttr("data-ajax")), r = wcpoa.apply_filters("select2_args", r, a, n, o), a.select2(r);
                var c = a.next(".select2-container");
                if (n.multiple) {
                    var d = c.find("ul");
                    d.sortable({stop: function(t) {
                            d.find(".select2-selection__choice").each(function() {
                                e(e(this).data("data").element).detach().appendTo(a), s.trigger("change")
                            })
                        }}), a.on("select2:select", function(t) {
                        e(t.params.data.element).detach().appendTo(a)
                    })
                }
                s.val(""), c.addClass("-wcpoa"), wcpoa.do_action("select2_init", a, r, n, o)
            }
        }, merge_results: function() {
            var t = null, i = null;
            e('.select2-results__option[role="group"]').each(function() {
                var a = e(this).children("ul"), n = e(this).children("strong");
                if (null !== i && n.text() == i.text())
                    return t.append(a.children()), void e(this).remove();
                t = a, i = n
            })
        }, add_value: function(e, i, a) {
            t.add_option(e, i, a), t.select_option(e, i)
        }, remove_value: function(e, i) {
            t.unselect_option(e, i)
        }, destroy: function(e) {
            e.data("select2") && e.select2("destroy"), e.siblings(".select2-container").remove()
        }}, wcpoa.add_select2 = function(e, i) {
        t.init(e, i)
    }, wcpoa.remove_select2 = function(e) {
        t.destroy(e)
    }
}(jQuery), function(e) {
    wcpoa.fields.select = wcpoa.field.extend({type: "select", $select: null, actions: {ready: "render", append: "render", remove: "remove"}, focus: function() {
            this.$select = this.$field.find("select"), this.$select.exists() && (this.o = wcpoa.get_data(this.$select), this.o = wcpoa.parse_args(this.o, {ajax_action: "wcpoa/fields/" + this.type + "/query", key: this.$field.data("key")}))
        }, render: function() {
            if (!this.$select.exists() || !this.o.ui)
                return!1;
            wcpoa.select2.init(this.$select, this.o, this.$field)
        }, remove: function() {
            if (!this.$select.exists() || !this.o.ui)
                return!1;
            wcpoa.select2.destroy(this.$select)
        }}), wcpoa.fields.user = wcpoa.fields.select.extend({type: "user"}), wcpoa.fields.post_object = wcpoa.fields.select.extend({type: "post_object"}), wcpoa.fields.page_link = wcpoa.fields.select.extend({type: "page_link"})
}(jQuery), function(e) {
    wcpoa.fields.tab = wcpoa.field.extend({type: "tab", $el: null, $wrap: null, actions: {prepare: "initialize", append: "initialize", hide: "hide", show: "show"}, focus: function() {
            this.$el = this.$field.find(".wcpoa-tab"), this.o = this.$el.data(), this.o.key = this.$field.data("key"), this.o.text = this.$el.html()
        }, initialize: function() {
            this.$field.is("td") || t.add_tab(this.$field, this.o)
        }, hide: function(t, i) {
            if ("conditional_logic" == i) {
                var a = t.data("key"), n = t.prevAll(".wcpoa-tab-wrap"), o = n.find('a[data-key="' + a + '"]').parent();
                n.exists() && (o.addClass("hidden-by-conditional-logic"), setTimeout(function() {
                    t.nextUntil(".wcpoa-field-tab", ".wcpoa-field").each(function() {
                        e(this).hasClass("hidden-by-conditional-logic") || (wcpoa.conditional_logic.hide_field(e(this)), e(this).addClass("-hbcl-" + a))
                    }), o.hasClass("active") && n.find("li:not(.hidden-by-conditional-logic):first a").trigger("click")
                }, 0))
            }
        }, show: function(t, i) {
            if ("conditional_logic" == i) {
                var a = t.data("key"), n = t.prevAll(".wcpoa-tab-wrap"), o = n.find('a[data-key="' + a + '"]'), s = o.parent();
                n.exists() && (s.removeClass("hidden-by-conditional-logic"), setTimeout(function() {
                    t.siblings(".wcpoa-field.-hbcl-" + a).each(function() {
                        wcpoa.conditional_logic.show_field(e(this)), e(this).removeClass("-hbcl-" + a)
                    });
                    var i = s.siblings(".active");
                    i.exists() && !i.hasClass("hidden-by-conditional-logic") || o.trigger("click")
                }, 0))
            }
        }});
    var t = wcpoa.model.extend({actions: {"prepare 15": "render", "append 15": "render", "refresh 15": "render"}, events: {"click .wcpoa-tab-button": "_click"}, render: function(t) {
            e(".wcpoa-tab-wrap", t).each(function() {
                var t = e(this), i = t.parent();
                if (t.find("li.active").exists() || t.find("li:not(.hidden-by-conditional-logic):first a").trigger("click"), i.hasClass("-sidebar")) {
                    var a = i.is("td") ? "height" : "min-height", n = t.position().top + t.children("ul").outerHeight(!0) - 1;
                    i.css(a, n)
                }
            })
        }, add_group: function(t, i) {
            var a = t.parent(), n = "";
            return a.hasClass("wcpoa-fields") && "left" == i.placement ? a.addClass("-sidebar") : i.placement = "top", n = a.is("tbody") ? '<tr class="wcpoa-tab-wrap"><td colspan="2"><ul class="wcpoa-hl wcpoa-tab-group"></ul></td></tr>' : '<div class="wcpoa-tab-wrap -' + i.placement + '"><ul class="wcpoa-hl wcpoa-tab-group"></ul></div>', $group = e(n), t.before($group), $group
        }, add_tab: function(t, i) {
            var a = t.siblings(".wcpoa-tab-wrap").last();
            a.exists() ? i.endpoint && (a = this.add_group(t, i)) : a = this.add_group(t, i);
            var n = e('<li><a class="wcpoa-tab-button" href="#" data-key="' + i.key + '">' + i.text + "</a></li>");
            "" === i.text && n.hide(), a.find("ul").append(n), t.hasClass("hidden-by-conditional-logic") && n.addClass("hidden-by-conditional-logic")
        }, _click: function(t) {
            t.preventDefault();
            var i = t.$el, a = i.closest(".wcpoa-tab-wrap"), n = i.data("key"), o = "";
            i.parent().addClass("active").siblings().removeClass("active"), a.nextUntil(".wcpoa-tab-wrap", ".wcpoa-field").each(function() {
                var t = e(this);
                if ("tab" == t.data("type") && (o = t.data("key"), t.hasClass("endpoint")))
                    return!1;
                o === n ? t.hasClass("hidden-by-tab") && (t.removeClass("hidden-by-tab"), wcpoa.do_action("show_field", e(this), "tab")) : t.hasClass("hidden-by-tab") || (t.addClass("hidden-by-tab"), wcpoa.do_action("hide_field", e(this), "tab"))
            }), wcpoa.do_action("refresh", a.parent()), i.trigger("blur")
        }});
    wcpoa.model.extend({active: 1, actions: {add_field_error: "add_field_error"}, add_field_error: function(e) {
            if (this.active && e.hasClass("hidden-by-tab")) {
                var t = this, i = e.prevAll(".wcpoa-field-tab:first");
                e.prevAll(".wcpoa-tab-wrap:first").find('a[data-key="' + i.data("key") + '"]').trigger("click"), this.active = 0, setTimeout(function() {
                    t.active = 1
                }, 1e3)
            }
        }})
}(jQuery), function(e) {
    wcpoa.fields.time_picker = wcpoa.field.extend({type: "time_picker", $el: null, $input: null, $hidden: null, o: {}, actions: {ready: "initialize", append: "initialize"}, events: {'blur input[type="text"]': "blur"}, focus: function() {
            this.$el = this.$field.find(".wcpoa-time-picker"), this.$input = this.$el.find('input[type="text"]'), this.$hidden = this.$el.find('input[type="hidden"]'), this.o = wcpoa.get_data(this.$el)
        }, initialize: function() {
            if (void 0 !== e.timepicker) {
                var t = {timeFormat: this.o.time_format, altField: this.$hidden, altFieldTimeOnly: !1, altTimeFormat: "HH:mm:ss", showButtonPanel: !0, controlType: "select", oneLine: !0, closeText: wcpoa._e("date_time_picker", "selectText")};
                t.onClose = function(t, i) {
                    var a = i.dpDiv.find(".ui-datepicker-close");
                    if (!t && a.is(":hover")) {
                        if (!(t = wcpoa.maybe_get(i, "settings.timepicker.formattedTime")))
                            return;
                        e.datepicker._setTime(i)
                    }
                }, t = wcpoa.apply_filters("time_picker_args", t, this.$field), this.$input.timepicker(t), e("body > #ui-datepicker-div").exists() && e("body > #ui-datepicker-div").wrap('<div class="wcpoa-ui-datepicker" />'), wcpoa.do_action("time_picker_init", this.$input, t, this.$field)
            }
        }, blur: function() {
            this.$input.val() || this.$hidden.val("")
        }})
}(jQuery), function(e) {
    wcpoa.fields.true_false = wcpoa.field.extend({type: "true_false", $switch: null, $input: null, actions: {prepare: "render", append: "render", show: "render"}, events: {"change .wcpoa-switch-input": "_change", "focus .wcpoa-switch-input": "_focus", "blur .wcpoa-switch-input": "_blur", "keypress .wcpoa-switch-input": "_keypress"}, focus: function() {
            this.$input = this.$field.find(".wcpoa-switch-input"), this.$switch = this.$field.find(".wcpoa-switch")
        }, render: function() {
            if (this.$switch.exists()) {
                var e = this.$switch.children(".wcpoa-switch-on"), t = this.$switch.children(".wcpoa-switch-off");
                width = Math.max(e.width(), t.width()), width && (e.css("min-width", width), t.css("min-width", width))
            }
        }, on: function() {
            this.$input.prop("checked", !0), this.$switch.addClass("-on")
        }, off: function() {
            this.$input.prop("checked", !1), this.$switch.removeClass("-on")
        }, _change: function(e) {
            e.$el.prop("checked") ? this.on() : this.off()
        }, _focus: function(e) {
            this.$switch.addClass("-focus")
        }, _blur: function(e) {
            this.$switch.removeClass("-focus")
        }, _keypress: function(e) {
            return 37 === e.keyCode ? this.off() : 39 === e.keyCode ? this.on() : void 0
        }})
}(jQuery), function(e) {
    wcpoa.fields.taxonomy = wcpoa.field.extend({type: "taxonomy", $el: null, actions: {ready: "render", append: "render", remove: "remove"}, events: {'click a[data-name="add"]': "add_term"}, focus: function() {
            this.$el = this.$field.find(".wcpoa-taxonomy-field"), this.o = wcpoa.get_data(this.$el), this.o.key = this.$field.data("key")
        }, render: function() {
            var e = this.$field.find("select");
            if (e.exists()) {
                var t = wcpoa.get_data(e);
                t = wcpoa.parse_args(t, {pagination: !0, ajax_action: "wcpoa/fields/taxonomy/query", key: this.o.key}), wcpoa.select2.init(e, t)
            }
        }, remove: function() {
            var e = this.$field.find("select");
            if (!e.exists())
                return!1;
            wcpoa.select2.destroy(e)
        }, add_term: function(t) {
            var i = this;
            wcpoa.open_popup({title: t.$el.attr("title") || t.$el.data("title"), loading: !0, height: 220});
            var a = wcpoa.prepare_for_ajax({action: "wcpoa/fields/taxonomy/add_term", field_key: this.o.key});
            e.ajax({url: wcpoa.get("ajaxurl"), data: a, type: "post", dataType: "html", success: function(e) {
                    i.add_term_confirm(e)
                }})
        }, add_term_confirm: function(t) {
            var i = this;
            wcpoa.update_popup({content: t}), e('#wcpoa-popup input[name="term_name"]').focus(), e("#wcpoa-popup form").on("submit", function(t) {
                t.preventDefault(), i.add_term_submit(e(this))
            })
        }, add_term_submit: function(t) {
            var i = this, a = t.find(".wcpoa-submit"), n = t.find('input[name="term_name"]'), o = t.find('select[name="term_parent"]');
            if ("" === n.val())
                return n.focus(), !1;
            a.find("button").attr("disabled", "disabled"), a.find(".wcpoa-spinner").addClass("is-active");
            var s = wcpoa.prepare_for_ajax({action: "wcpoa/fields/taxonomy/add_term", field_key: this.o.key, term_name: n.val(), term_parent: o.exists() ? o.val() : 0});
            e.ajax({url: wcpoa.get("ajaxurl"), data: s, type: "post", dataType: "json", success: function(e) {
                    var t = wcpoa.get_ajax_message(e);
                    wcpoa.is_ajax_success(e) && (n.val(""), i.append_new_term(e.data)), t.text && a.find("span").html(t.text)
                }, complete: function() {
                    a.find("button").removeAttr("disabled"), a.find(".wcpoa-spinner").removeClass("is-active"), a.find("span").delay(1500).fadeOut(250, function() {
                        e(this).html(""), e(this).show()
                    }), n.focus()
                }})
        }, append_new_term: function(t) {
            t.term_id, t.term_label;
            switch (e('.wcpoa-taxonomy-field[data-taxonomy="' + this.o.taxonomy + '"]').each(function() {
                    var i = e(this).data("type");
                    if ("radio" == i || "checkbox" == i) {
                        var a = e(this).children('input[type="hidden"]'), n = e(this).find("ul:first"), o = a.attr("name");
                        "checkbox" == i && (o += "[]");
                        var s = e(['<li data-id="' + t.term_id + '">', "<label>", '<input type="' + i + '" value="' + t.term_id + '" name="' + o + '" /> ', "<span>" + t.term_label + "</span>", "</label>", "</li>"].join(""));
                        if (t.term_parent) {
                            var r = n.find('li[data-id="' + t.term_parent + '"]');
                            (n = r.children("ul")).exists() || (n = e('<ul class="children wcpoa-bl"></ul>'), r.append(n))
                        }
                        n.append(s)
                    }
                }), e("#wcpoa-popup #term_parent").each(function() {
                    var i = e('<option value="' + t.term_id + '">' + t.term_label + "</option>");
                    t.term_parent ? e(this).children('option[value="' + t.term_parent + '"]').after(i) : e(this).append(i)
                }), this.o.type){case"select":
                case"multi_select":
                    var i = this.$el.children("select");
                    wcpoa.select2.add_value(i, t.term_id, t.term_label);
                    break;
                case"checkbox":
                case"radio":
                    var a = this.$el.find(".categorychecklist-holder"), n = a.find('li[data-id="' + t.term_id + '"]'), o = a.get(0).scrollTop + (n.offset().top - a.offset().top);
                    n.find("input").prop("checked", !0), a.animate({scrollTop: o}, "250")
                }
        }})
}(jQuery), function(e) {
    wcpoa.fields.url = wcpoa.field.extend({type: "url", $input: null, actions: {ready: "render", append: "render"}, events: {'keyup input[type="url"]': "render"}, focus: function() {
            this.$input = this.$field.find('input[type="url"]')
        }, is_valid: function() {
            var e = this.$input.val();
            if (-1 !== e.indexOf("://"))
                ;
            else if (0 !== e.indexOf("//"))
                return!1;
            return!0
        }, render: function() {
            this.is_valid() ? this.$input.parent().addClass("-valid") : this.$input.parent().removeClass("-valid")
        }})
}(jQuery), function(e) {
    wcpoa.validation = wcpoa.model.extend({actions: {ready: "ready", append: "ready"}, filters: {validation_complete: "validation_complete"}, events: {"click #save-post": "click_ignore", 'click [type="submit"]': "click_publish", "submit form": "submit_form", "click .wcpoa-error-message a": "click_message"}, active: 1, ignore: 0, busy: 0, valid: !0, errors: [], error_class: "wcpoa-error", message_class: "wcpoa-error-message", $trigger: null, ready: function(t) {
            t.find(".wcpoa-field input").filter('[type="number"], [type="email"], [type="url"]').on("invalid", function(t) {
                t.preventDefault(), wcpoa.validation.errors.push({input: e(this).attr("name"), message: t.target.validationMessage}), wcpoa.validation.fetch(e(this).closest("form"))
            })
        }, validation_complete: function(t, a) {
            if (!this.errors.length)
                return t;
            t.valid = 0, t.errors = t.errors || [];
            var n = [];
            if (t.errors.length)
                for (i in t.errors)
                    n.push(t.errors[i].input);
            if (this.errors.length)
                for (i in this.errors) {
                    var o = this.errors[i];
                    -1 === e.inArray(o.input, n) && t.errors.push(o)
                }
            return this.errors = [], t
        }, click_message: function(e) {
            e.preventDefault(), wcpoa.remove_el(e.$el.parent())
        }, click_ignore: function(e) {
            this.ignore = 1, this.$trigger = e.$el
        }, click_publish: function(e) {
            this.$trigger = e.$el
        }, submit_form: function(e) {
            if (!this.active)
                return!0;
            if (this.ignore)
                return this.ignore = 0, !0;
            if (!e.$el.find("#wcpoa-form-data").exists())
                return!0;
            var t = e.$el.find("#wp-preview");
            if (t.exists() && t.val())
                return this.toggle(e.$el, "unlock"), !0;
            e.preventDefault(), this.fetch(e.$el)
        }, toggle: function(t, i) {
            i = i || "unlock";
            var a = null, n = null, o = e("#submitdiv");
            o.exists() || (o = e("#submitpost")), o.exists() || (o = t.find("p.submit").last()), o.exists() || (o = t.find(".wcpoa-form-submit")), o.exists() || (o = t), a = o.find('input[type="submit"], .button'), n = o.find(".spinner, .wcpoa-spinner"), this.hide_spinner(n), "unlock" == i ? this.enable_submit(a) : "lock" == i && (this.disable_submit(a), this.show_spinner(n.last()))
        }, fetch: function(t) {
            if (this.busy)
                return!1;
            var i = this;
            wcpoa.do_action("validation_begin");
            var a = wcpoa.serialize(t);
            a.action = "wcpoa/validate_save_post", a = wcpoa.prepare_for_ajax(a), this.busy = 1, this.toggle(t, "lock"), e.ajax({url: wcpoa.get("ajaxurl"), data: a, type: "post", dataType: "json", success: function(e) {
                    wcpoa.is_ajax_success(e) && i.fetch_success(t, e.data)
                }, complete: function() {
                    i.fetch_complete(t)
                }})
        }, fetch_complete: function(e) {
            if (this.busy = 0, this.toggle(e, "unlock"), this.valid) {
                this.ignore = 1;
                var t = e.children(".wcpoa-error-message");
                t.exists() && (t.addClass("-success"), t.children("p").html(wcpoa._e("validation_successful")), setTimeout(function() {
                    wcpoa.remove_el(t)
                }, 2e3)), e.find(".wcpoa-postbox.wcpoa-hidden").remove(), wcpoa.do_action("submit", e), this.$trigger ? this.$trigger.click() : e.submit(), this.toggle(e, "lock")
            }
        }, fetch_success: function(t, i) {
            if (!(i = wcpoa.apply_filters("validation_complete", i, t)) || i.valid || !i.errors)
                return this.valid = !0, void wcpoa.do_action("validation_success");
            wcpoa.do_action("validation_failure"), this.valid = !1, this.$trigger = null;
            var a = null, n = 0, o = wcpoa._e("validation_failed");
            if (i.errors && i.errors.length > 0) {
                for (var s in i.errors) {
                    var r = i.errors[s];
                    if (r.input) {
                        var l = t.find('[name="' + r.input + '"]').first();
                        if (l.exists() || (l = t.find('[name^="' + r.input + '"]').first()), l.exists()) {
                            n++;
                            var c = wcpoa.get_field_wrap(l);
                            this.add_error(c, r.message), null === a && (a = c)
                        }
                    } else
                        o += ". " + r.message
                }
                1 == n ? o += ". " + wcpoa._e("validation_failed_1") : n > 1 && (o += ". " + wcpoa._e("validation_failed_2").replace("%d", n))
            }
            var d = t.children(".wcpoa-error-message");
            d.exists() || (d = e('<div class="wcpoa-error-message"><p></p><a href="#" class="wcpoa-icon -cancel small"></a></div>'), t.prepend(d)), d.children("p").html(o), null === a && (a = d), setTimeout(function() {
                e("html, body").animate({scrollTop: a.offset().top - e(window).height() / 2}, 500)
            }, 1)
        }, add_error: function(e, t) {
            var i = this;
            e.addClass(this.error_class), void 0 !== t && (e.children(".wcpoa-input").children("." + this.message_class).remove(), e.children(".wcpoa-input").prepend('<div class="' + this.message_class + '"><p>' + t + "</p></div>"));
            var a = function() {
                i.remove_error(e), e.off("focus change", "input, textarea, select", a)
            };
            e.on("focus change", "input, textarea, select", a), wcpoa.do_action("add_field_error", e)
        }, remove_error: function(e) {
            var t = e.children(".wcpoa-input").children("." + this.message_class);
            e.removeClass(this.error_class), setTimeout(function() {
                wcpoa.remove_el(t)
            }, 250), wcpoa.do_action("remove_field_error", e)
        }, add_warning: function(e, t) {
            this.add_error(e, t), setTimeout(function() {
                wcpoa.validation.remove_error(e)
            }, 1e3)
        }, show_spinner: function(e) {
            if (e.exists()) {
                var t = wcpoa.get("wp_version");
                parseFloat(t) >= 4.2 ? e.addClass("is-active") : e.css("display", "inline-block")
            }
        }, hide_spinner: function(e) {
            if (e.exists()) {
                var t = wcpoa.get("wp_version");
                parseFloat(t) >= 4.2 ? e.removeClass("is-active") : e.css("display", "none")
            }
        }, disable_submit: function(e) {
            e.exists() && e.addClass("disabled button-disabled button-primary-disabled")
        }, enable_submit: function(e) {
            e.exists() && e.removeClass("disabled button-disabled button-primary-disabled")
        }})
}(jQuery), function(e) {
    wcpoa.fields.wysiwyg = wcpoa.field.extend({type: "wysiwyg", $el: null, $textarea: null, toolbars: {}, events: {"mousedown .wcpoa-editor-wrap.delay": "mousedown"}, actions: {load: "initialize", append: "initialize", remove: "disable", sortstart: "disable", sortstop: "enable"}, focus: function() {
            this.$el = this.$field.find(".wp-editor-wrap").last(), this.$textarea = this.$el.find("textarea"), this.o = wcpoa.get_data(this.$el), this.o.id = this.$textarea.attr("id")
        }, mousedown: function(e) {
            e.preventDefault(), this.$el.removeClass("delay"), this.$el.find(".wcpoa-editor-toolbar").remove(), this.initialize()
        }, initialize: function() {
            if (!this.$el.hasClass("delay") && "undefined" != typeof tinyMCEPreInit) {
                var e = this.o.id, t = wcpoa.get_uniqid("wcpoa-editor-"), i = this.$el.outerHTML();
                i = wcpoa.str_replace(e, t, i), this.$el.replaceWith(i), this.o.id = t, this.initialize_tinymce(), this.initialize_quicktags()
            }
        }, initialize_tinymce: function() {
            if ("undefined" != typeof tinymce && void 0 !== tinyMCEPreInit.mceInit) {
                var e = this.get_mceInit();
                if (tinyMCEPreInit.mceInit[e.id] = e, this.$el.hasClass("tmce-active"))
                    try {
                        tinymce.init(e);
                        var t = tinyMCE.get(e.id);
                        wcpoa.do_action("wysiwyg_tinymce_init", t, t.id, e, this.$field)
                    } catch (e) {
                    }
            }
        }, initialize_quicktags: function() {
            if ("undefined" != typeof quicktags && void 0 !== tinyMCEPreInit.qtInit) {
                var e = this.get_qtInit();
                tinyMCEPreInit.qtInit[e.id] = e;
                try {
                    var t = quicktags(e);
                    this._buttonsInit(t), wcpoa.do_action("wysiwyg_quicktags_init", t, t.id, e, this.$field)
                } catch (e) {
                }
            }
        }, get_mceInit: function() {
            var t = this.$field, i = this.get_toolbar(this.o.toolbar), a = e.extend({}, tinyMCEPreInit.mceInit.wcpoa_content);
            if (a.selector = "#" + this.o.id, a.id = this.o.id, a.elements = this.o.id, i)
                for (var n = tinymce.majorVersion < 4 ? "theme_advanced_buttons" : "toolbar", o = 1; o < 5; o++)
                    a[n + o] = wcpoa.isset(i, o) ? i[o] : "";
            return tinymce.majorVersion < 4 ? a.setup = function(i) {
                i.onInit.add(function(i, a) {
                    e(i.getBody()).on("focus", function() {
                        wcpoa.validation.remove_error(t)
                    }), e(i.getBody()).on("blur", function() {
                        i.save(), t.find("textarea").trigger("change")
                    })
                })
            } : a.setup = function(e) {
                e.on("focus", function(e) {
                    wcpoa.validation.remove_error(t)
                }), e.on("change", function(i) {
                    e.save(), t.find("textarea").trigger("change")
                })
            }, a.wp_autoresize_on = !1, a = wcpoa.apply_filters("wysiwyg_tinymce_settings", a, a.id, this.$field)
        }, get_qtInit: function() {
            var t = e.extend({}, tinyMCEPreInit.qtInit.wcpoa_content);
            return t.id = this.o.id, t = wcpoa.apply_filters("wysiwyg_quicktags_settings", t, t.id, this.$field)
        }, disable: function() {
            try {
                var e = tinyMCE.get(this.o.id);
                e.save(), e.destroy()
            } catch (e) {
            }
        }, enable: function() {
            try {
                this.$el.hasClass("tmce-active") && switchEditors.go(this.o.id, "tmce")
            } catch (e) {
            }
        }, get_toolbar: function(e) {
            return void 0 !== this.toolbars[e] && this.toolbars[e]
        }, _buttonsInit: function(e) {
            canvas = e.canvas, name = e.name, settings = e.settings, html = "", theButtons = {}, use = "", settings.buttons && (use = "," + settings.buttons + ",");
            for (i in edButtons)
                edButtons[i] && (id = edButtons[i].id, use && -1 !== ",strong,em,link,block,del,ins,img,ul,ol,li,code,more,close,".indexOf("," + id + ",") && -1 === use.indexOf("," + id + ",") || edButtons[i].instance && edButtons[i].instance !== inst || (theButtons[id] = edButtons[i], edButtons[i].html && (html += edButtons[i].html(name + "_"))));
            use && -1 !== use.indexOf(",fullscreen,") && (theButtons.fullscreen = new qt.FullscreenButton, html += theButtons.fullscreen.html(name + "_")), "rtl" === document.getElementsByTagName("html")[0].dir && (theButtons.textdirection = new qt.TextDirectionButton, html += theButtons.textdirection.html(name + "_")), e.toolbar.innerHTML = html, e.theButtons = theButtons
        }});
    wcpoa.model.extend({$div: null, actions: {ready: "ready"}, ready: function() {
            this.$div = e("#wcpoa-hidden-wp-editor"), this.$div.exists() && (this.$div.appendTo("body"), wcpoa.isset(window, "tinymce", "on") && tinymce.on("AddEditor", function(e) {
                var t = e.editor;
                "wcpoa" === t.id.substr(0, 3) && (t = tinymce.editors.content || t, tinymce.activeEditor = t, wpActiveEditor = t.id)
            }))
        }})
}(jQuery), function(e) {
    e(document).ready(function() {
        var t = 1;
        e("button").click(function() {
            e("#inputtext").append("<input type='text' value='photo_" + t + "' name='photo_" + t++ + "'/><br />")
        }), e("table.wcpoa-table tr.wcpoa-row").each(function() {
            var t = e(this).find(".enable_date").val(), i = e(this).find(".wcpoa-field-date-picker");
            "yes" == t ? i.show() : i.hide(), e(document).on("change", "table.wcpoa-table tr.wcpoa-row .enable_date", function() {
                "yes" == e(this).val() ? e(this).parents("tr.wcpoa-row").find(".wcpoa-field-date-picker").show() : e(this).parents("tr.wcpoa-row").find(".wcpoa-field-date-picker").hide()
            })
        }), jQuery(jQuery("<div class='wcpoa-error-message'><p>Attachment Name value is required</p></div>")).insertBefore(jQuery(".wcpoa-attachment-name")), jQuery(".wcpoa-error-message").hide(), jQuery("#publish").click(function() {
            var e = 0, t = 0;
            if (jQuery(".wcpoa-has-value input[name='wcpoa_attachment_file[]']").each(function() {
                "" == jQuery(this).val().trim() ? (e = 1, jQuery(this).parent("div").show(), jQuery(this).find(".wcpoa-error-message").show(), 0 == t && jQuery(this).parent("div").parent("div").find(".hide-if-value").find(".button").focus(), t = 1) : jQuery(this).parent("div").hide()
            }), jQuery(".wcpoa-has-value input[name='wcpoa_attachment_name[]']").each(function() {
                "" == jQuery(this).val().trim() ? (e = 1, jQuery(this).parent("div").find(".wcpoa-error-message").show(), 0 == t && jQuery(this).parent("div").find(".wcpoa-attachment-name").focus(), t = 1) : jQuery(this).parent("div").find(".wcpoa-error-message").hide()
            }), 1 == e)
                return!1
        })
    })
}(jQuery);