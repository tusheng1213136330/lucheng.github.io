!function () {
    function e(e) {
        if (void 0 === e) return e;
        var t, o, n, r, a, i;
        for (n = e.length, o = 0, t = ""; n > o;) {
            if (r = 255 & e.charCodeAt(o++), o === n) {
                t += p.charAt(r >> 2), t += p.charAt((3 & r) << 4), t += "==";
                break
            }
            if (a = e.charCodeAt(o++), o === n) {
                t += p.charAt(r >> 2), t += p.charAt((3 & r) << 4 | (240 & a) >> 4), t += p.charAt((15 & a) << 2), t += "=";
                break
            }
            i = e.charCodeAt(o++), t += p.charAt(r >> 2), t += p.charAt((3 & r) << 4 | (240 & a) >> 4), t += p.charAt((15 & a) << 2 | (192 & i) >> 6), t += p.charAt(63 & i)
        }
        return t
    }

    function t(e) {
        for (var t in e) return !1;
        return !0
    }

    function o(e, o) {
        var n = 100;
        if ("share" === e) {
            if (o && !t(o)) return o;
            var r = "", a = "", i = "", c = document.querySelector("title"),
                d = document.querySelector("meta[name=description]"),
                u = document.querySelector("link[rel*=apple-touch-icon]"),
                f = document.querySelector("link[rel*=shortcut]");
            if (c && (r = c.innerText), d && (a = d.content), f && (i = f.href), u && (i = u.href), !i) for (var l = document.querySelectorAll("body img"), s = 0; s < l.length; s++) {
                var m = l[s];
                if (m.naturalWidth > n && m.naturalHeight > n) {
                    i = m.src;
                    break
                }
            }
            return {platform: "weixin_moments", url: location.href, title: r, desc: a, image: i}
        }
        return o
    }

    function n() {
        m = document.createElement("iframe"), m.id = "__ToutiaoJSBridgeIframe_SetResult", m.style.display = "none", document.documentElement.appendChild(m), s = document.createElement("iframe"), s.id = "__ToutiaoJSBridgeIframe", s.style.display = "none", document.documentElement.appendChild(s)
    }

    function r(e, t) {
        var o = document.getElementById(e);
        o && "IFRAME" === o.tagName && o.parentNode ? o.src = t : (o = document.createElement("iframe"), o.id = e, o.style.display = "none", document.documentElement.appendChild(o), o.src = t)
    }

    function a() {
        var e = JSON.stringify(h);
        return h.length > 0 && c("SCENE_FETCHQUEUE", e), h = [], e
    }

    function i(e) {
        var t, o = e.__msg_type, n = e.__params, r = e.__event_id, a = e.__callback_id;
        return "callback" === o ? (t = {__err_code: "cb404"}, "string" == typeof a && "function" == typeof C[a] && (t = C[a](n), delete C[a])) : "event" === o && (t = {__err_code: "ev404"}, "string" == typeof r && "function" == typeof S[r] && (t = S[r](n))), c("SCENE_HANDLEMSGFROMTT", JSON.stringify(t)), JSON.stringify(t)
    }

    function c(t, o) {
        r("__ToutiaoJSBridgeIframe_SetResult", y + "private/setresult/" + t + "&" + e(g.encode(o)))
    }

    function d(e, t, n, a) {
        if (a = a || 1, e && "string" == typeof e && !(["getSMSAuthCode"].indexOf(e) > -1)) {
            "object" != typeof t && (t = {}), t = o(e, t);
            var i = (_++).toString();
            "function" == typeof n && (C[i] = n);
            var c = {JSSDK: a, func: e, params: t, __msg_type: "call", __callback_id: i, __ts: Date.now()};
            h.push(c), r("__ToutiaoJSBridgeIframe", y + "dispatch_message/")
        }
    }

    function u(e, t) {
        e && "string" == typeof e && "function" == typeof t && (S[e] = t, d("addEventListener", {name: e}, null))
    }

    function f(e, t) {
        "function" == typeof S[e] && S[e](t)
    }

    function l() {
        function e(e, t) {
            return "params" === t ? e : e[t]
        }

        var o = {
                pageStateChange: "page_state_change",
                isVisible: "is_visible",
                isLogin: "is_login",
                uploadImage: "upload_image"
            },
            n = ["appInfo", "adInfo", "login", "comment", "close", "isVisible", "isLogin", "playVideo", "formDialogClose"],
            r = ["isAppInstalled", "open", "share", "systemShare", "pay", "pageStateChange", "downloadApp", "openThirdApp", "uploadImage", "addChannel", "gallery", "copyToClipboard", "openCocosPlay", "callNativePhone"],
            a = n.concat(r), i = navigator.userAgent.match(/JSSDK\/([\d.]+)/i), c = i ? i[1] : 1;
        i ? a = a.concat(["config"]) : window.toutiao.config = function (t) {
            var o = e(t, "success");
            return o ? o({code: 1, supportList: {call: n}}) : void 0
        }, a.forEach(function (n) {
            window.toutiao[n] = function (r) {
                r = r || {};
                var a = e(r, "params"), i = e(r, "error"), u = e(r, "success"), f = e(r, "fail");
                n = o[n] || n, d(n, a, function (e) {
                    e = e || {};
                    var o = e.code;
                    t(e) ? o = 1 : void 0 === o && (o = 1), o = +o, -1 === o && i && i(e), 0 === o && f && f(e), 1 === o && u && u(e)
                }, c)
            }
        })
    }

    var s, m, g = {
            encode: function (e) {
                e = e || "", e = e.replace(/\r\n/g, "\n");
                for (var t = "", o = 0; o < e.length; o++) {
                    var n = e.charCodeAt(o);
                    128 > n ? t += String.fromCharCode(n) : n > 127 && 2048 > n ? (t += String.fromCharCode(n >> 6 | 192), t += String.fromCharCode(63 & n | 128)) : (t += String.fromCharCode(n >> 12 | 224), t += String.fromCharCode(n >> 6 & 63 | 128), t += String.fromCharCode(63 & n | 128))
                }
                return t
            }, decode: function (e) {
                for (var t = "", o = 0, n = 0, r = 0, a = 0; o < e.length;) a = e.charCodeAt(o), 128 > a ? (t += String.fromCharCode(a), o++) : a > 191 && 224 > a ? (n = e.charCodeAt(o + 1), t += String.fromCharCode((31 & a) << 6 | 63 & n), o += 2) : (n = e.charCodeAt(o + 1), r = e.charCodeAt(o + 2), t += String.fromCharCode((15 & a) << 12 | (63 & n) << 6 | 63 & r), o += 3);
                return t
            }
        }, p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", h = [], _ = 1e3, C = {}, S = {},
        y = "bytedance://";
    "object" == typeof window.toutiao && "object" == typeof window.ToutiaoJSBridge || (n(), window.ToutiaoJSBridge = {
        on: u,
        call: d,
        _fetchQueue: a,
        _handleMessageFromToutiao: i
    }, window.toutiao = {on: u, trigger: f}, l())
}();