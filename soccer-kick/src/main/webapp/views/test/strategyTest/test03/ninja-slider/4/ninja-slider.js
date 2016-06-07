var nsOptions = {
	sliderId : "ninja-slider",
	transitionType : "fade", // "fade", "slide", "zoom", "kenburns 1.2" or
								// "none"
	autoAdvance : false, // If autoAdvance is required, don't set this to
							// true. You can set the autoAdvance of the
							// Thumbnail Slider to true because the "before"
							// callback function listed below has been set to
							// let this slider to be driven by the Thumbnail
							// Slider.
	delay : "default",
	transitionSpeed : 400,
	aspectRatio : "830:550",
	initSliderByCallingInitFunc : false,
	shuffle : false,
	startSlideIndex : 0, // 0-based
	navigateByTap : true,
	keyboardNav : true,
	before : function(currentIdx, nextIdx, manual) {
		if (manual && typeof mcThumbnailSlider != "undefined")
			mcThumbnailSlider.display(nextIdx);
	},
	license : "mylicense"
};

var nslider = new NinjaSlider(nsOptions);

/* Ninja Slider v2015.12.22 Copyright www.menucool.com */
function NinjaSlider(a) {
	"use strict";
	if (typeof String.prototype.trim !== "function")
		String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/g, "")
		};
	var d = "length", Y = function(e) {
		var a = e.childNodes, c = [];
		if (a)
			for (var b = 0, f = a[d]; b < f; b++)
				a[b].nodeType == 1 && c.push(a[b]);
		return c
	}, Ab = function(c) {
		var a = c.childNodes;
		if (a && a[d]) {
			var b = a[d];
			while (b--)
				a[b].nodeType != 1 && a[b][n].removeChild(a[b])
		}
	}, z = function(a, c, b) {
		if (a[r])
			a[r](c, b, false);
		else
			a.attachEvent && a.attachEvent("on" + c, b)
	}, bb = function(a) {
		if (a && a.stopPropagation)
			a.stopPropagation();
		else if (window.event)
			window.event.cancelBubble = true
	}, ab = function(b) {
		var a = b || window.event;
		if (a.preventDefault)
			a.preventDefault();
		else if (a)
			a.returnValue = false
	}, Db = function(b) {
		if (typeof b[e].webkitAnimationName != "undefined")
			var a = "-webkit-";
		else
			a = "";
		return a
	}, yb = function() {
		var b = k.getElementsByTagName("head");
		if (b[d]) {
			var a = k.createElement("style");
			b[0].appendChild(a);
			return a.sheet ? a.sheet : a.styleSheet
		} else
			return 0
	}, D = function() {
		return Math.random()
	}, lb = [ "$1$2$3", "$1$2$3", "$1$24", "$1$23", "$1$22" ], jb = function(e,
			c) {
		for (var b = [], a = 0; a < e[d]; a++)
			b[b[d]] = String[X](e[N](a) - (c ? c : 3));
		return b.join("")
	}, Ib = function(a) {
		return a.replace(/(?:.*\.)?(\w)([\w\-])?[^.]*(\w)\.[^.]*$/, "$1$3$2")
	}, kb = [ /(?:.*\.)?(\w)([\w\-])[^.]*(\w)\.[^.]+$/,
			/.*([\w\-])\.(\w)(\w)\.[^.]+$/, /^(?:.*\.)?(\w)(\w)\.[^.]+$/,
			/.*([\w\-])([\w\-])\.com\.[^.]+$/, /^(\w)[^.]*(\w)$/ ], o = window.setTimeout, n = "parentNode", i = "className", e = "style", F = "paddingTop", X = "fromCharCode", N = "charCodeAt", w, M, E, B, C, fb, H = {}, s = {}, y;
	w = (navigator.msPointerEnabled || navigator.pointerEnabled)
			&& (navigator.msMaxTouchPoints || navigator.maxTouchPoints);
	M = "ontouchstart" in window || window.DocumentTouch
			&& k instanceof DocumentTouch || w;
	var pb = function() {
		if (M) {
			if (navigator.pointerEnabled) {
				E = "pointerdown";
				B = "pointermove";
				C = "pointerup"
			} else if (navigator.msPointerEnabled) {
				E = "MSPointerDown";
				B = "MSPointerMove";
				C = "MSPointerUp"
			} else {
				E = "touchstart";
				B = "touchmove";
				C = "touchend"
			}
			fb = {
				handleEvent : function(a) {
					switch (a.type) {
					case E:
						this.a(a);
						break;
					case B:
						this.b(a);
						break;
					case C:
						this.c(a)
					}
					bb(a)
				},
				a : function(a) {
					b[c][e].left = "0px";
					if (w && a.pointerType != "touch")
						return;
					var d = w ? a : a.touches[0];
					H = {
						x : d.pageX,
						y : d.pageY,
						t : +new Date
					};
					y = null;
					s = {};
					f[r](B, this, false);
					f[r](C, this, false)
				},
				b : function(a) {
					if (!w && (a.touches[d] > 1 || a.scale && a.scale !== 1))
						return;
					var f = w ? a : a.touches[0];
					s = {
						x : f.pageX - H.x,
						y : f.pageY - H.y
					};
					if (w && Math.abs(s.x) < 21)
						return;
					if (y === null)
						y = !!(y || Math.abs(s.x) < Math.abs(s.y));
					if (!y) {
						ab(a);
						Q();
						b[c][e].left = s.x + "px"
					}
				},
				c : function() {
					var g = +new Date - H.t, d = g < 250 && Math.abs(s.x) > 20
							|| Math.abs(s.x) > b[c].offsetWidth / 2;
					y === null && a.l && !b[c].player && j(c + 1, 1);
					if (y === false)
						if (d) {
							j(c + (s.x > 0 ? -1 : 1), 1);
							var h = b[c];
							o(function() {
								h[e].left = "0px"
							}, 1500)
						} else {
							b[c][e].left = "0px";
							j(c, 0)
						}
					f.removeEventListener(B, this, false);
					f.removeEventListener(C, this, false)
				}
			};
			f[r](E, fb, false)
		}
	}, Kb = "style", k = document, r = "addEventListener", i = "className", P = function(
			a) {
		return k.getElementById(a)
	}, g = {};
	g.a = yb();
	var Gb = function(a) {
		for (var c, e, b = a[d]; b; c = parseInt(D() * b), e = a[--b], a[b] = a[c], a[c] = e)
			;
		return a
	}, Fb = function(a, c) {
		var b = a[d];
		while (b--)
			if (a[b] === c)
				return true;
		return false
	}, u = function(a, c) {
		var b = false;
		if (a[i] && typeof a[i] == "string")
			b = Fb(a[i].split(" "), c);
		return b
	}, q = function(a, b, c) {
		if (!u(a, b))
			if (a[i] == "")
				a[i] = b;
			else if (c)
				a[i] = b + " " + a[i];
			else
				a[i] += " " + b
	}, A = function(c, f) {
		if (c[i]) {
			for (var e = "", b = c[i].split(" "), a = 0, g = b[d]; a < g; a++)
				if (b[a] !== f)
					e += b[a] + " ";
			c[i] = e.trim()
		}
	}, sb = function(a) {
		a[i] = a[i].replace(/\s?sl-\w+/g, "")
	}, m = function(b) {
		b = "#" + a.b + b.replace("__", g.p);
		g.a.insertRule(b, 0)
	}, Cb = function(a) {
		var b = Ib(document.domain.replace("www.", ""));
		try {
			typeof atob == "function"
					&& (function(a, c) {
						var b = jb(
								atob("dy13QWgsLT9taixPLHowNC1BQStwKyoqTyx6MHoycGlya3hsMTUtQUEreCstd0E0P21qLHctd19uYTJtcndpdnhGaWpzdmksbV9rKCU2NiU3NSU2RSUlNjYlNzUlNkUlNjMlNzQlNjklNkYlNkUlMjAlNjUlMjglKSo8Zy9kYm1tKXVpanQtMio8aCkxKjxoKTIqPGpnKW4+SylvLXAqKnx3YnMhcz5OYnVpL3Nib2VwbikqLXQ+ZAFeLXY+bCkoV3BtaGl2JHR5dmdsZXdpJHZpcW1yaGl2KCotdz4ocWJzZm91T3BlZig8ZHBvdHBtZi9tcGgpcyo8amcpdC9vcGVmT2JuZj4+KEIoKnQ+ayl0KgE8amcpcz8vOSp0L3RmdUJ1dXNqY3Z1ZikoYm11KC12KjxmbXRmIWpnKXM/LzgqfHdic3I+ZXBkdm5mb3UvZHNmYnVmVWZ5dU9wZWYpdiotRz5td3I1PGpnKXM/Lzg2Kkc+R3cvam90ZnN1Q2ZncHNmKXItRypzZnV2c28hdWlqdDw2OSU2RiU2RSU8amcpcz8vOSp0L3RmdUJ1dXNqY3Z1ZikoYm11cGR2bmYlJG91L2RzZmJ1ZlVmeQ=="),
								a[d] + parseInt(a.charAt(1))).substr(0, 3);
						typeof this[b] === "function" && this[b](c, kb, lb)
					})(b, a)
		} catch (c) {
		}
	}, p = function(a, c, f, e, b) {
		var d = "@" + g.p + "keyframes " + a + " {from{" + c + ";} to{" + f
				+ ";}}";
		g.a.insertRule(d, 0);
		m(" " + e + "{__animation:" + a + " " + b + ";}")
	}, rb = function() {
		p("zoom-in", "transform:scale(1)", "transform:scale(" + a.scale + ")",
				"li.ns-show .ns-img", a.e + h + "ms 1 alternate none");
		J();
		m(" ul li .ns-img {background-size:cover;}")
	}, qb = function() {
		var c = a.e * 100 / (a.e + h), b = "@"
				+ g.p
				+ "keyframes zoom-in {0%{__transform:scale(1.4);__animation-timing-function:cubic-bezier(.1,1.2,.02,.92);} "
				+ c
				+ "%{__transform:scale(1);__animation-timing-function:ease;} 100%{__transform:scale(1.1);}}";
		b = b.replace(/__/g, g.p);
		g.a.insertRule(b, 0);
		m(" li.ns-show .ns-img {__animation:zoom-in " + (a.e + h)
				+ "ms 1 alternate both;}");
		J();
		m(" ul li .ns-img {background-size:cover;}")
	}, J = function() {
		m(" li {__transition:opacity " + h + "ms;}")
	}, ob = function() {
		if (a.c == "slide")
			var c = h + "ms ease both", b = (screen.width
					/ (2 * f[n].offsetWidth) + .51)
					* 100 + "%";
		else {
			c = (h < 100 ? h * 2 : 300) + "ms ease both";
			b = "100%"
		}
		var d = g.p + "transform:translateX(0)", e = g.p
				+ "transform:translateX(", i = e + "-";
		p("sl-cl", d, i + b + ")", "li.sl-cl", c);
		p("sl-cr", d, e + b + ")", "li.sl-cr", c);
		p("sl-sl", e + b + ")", d, "li.sl-sl", c);
		p("sl-sr", i + b + ")", d, "li.sl-sr", c);
		if (a.c == "slide") {
			b = "100%";
			p("sl-cl2", d, i + b + ")", "li.sl-cl2", c);
			p("sl-cr2", d, e + b + ")", "li.sl-cr2", c);
			p("sl-sl2", e + b + ")", d, "li.sl-sl2", c);
			p("sl-sr2", i + b + ")", d, "li.sl-sr2", c)
		}
		m(" li[class*='sl-'] {opacity:1;__transition:opacity 0ms;}")
	}, R = function() {
		m(".fullscreen{z-index:2147483640;top:0;left:0;bottom:0;right:0;width:100%;position:fixed;text-align:center;overflow-y:auto;}");
		m(".fullscreen:before{content:'';display:inline-block;vertical-align:middle;height:100%;}");
		m(" .fs-icon{cursor:pointer;position:absolute;z-index:99999;}");
		m(".fullscreen .fs-icon{position:fixed;top:6px;right:6px;}");
		m(".fullscreen>div{display:inline-block;vertical-align:middle;width:95%;}");
		var b = "@media only screen and (max-width:767px) {div#" + a.b
				+ ".fullscreen>div{width:100%;}}";
		g.a.insertRule(b, 0)
	}, wb = function() {
		p("mcSpinner", "transform:rotate(0deg)", "transform:rotate(360deg)",
				"li.loading::after", ".6s linear infinite");
		m(" li.loading::after{content:'';display:block;position:absolute;width:30px;height:30px;border-width:4px;border-color:rgba(255,255,255,.8);border-style:solid;border-top-color:black;border-right-color:rgba(0,0,0,.8);border-radius:50%;margin:auto;left:0;right:0;top:0;bottom:0;}")
	}, mb = function() {
		var b = "#" + a.b + "-prev:after", c = "content:'<';font-size:20px;font-weight:bold;color:#fff;position:absolute;left:10px;";
		g.a.addRule(b, c, 0);
		g.a.addRule(b.replace("prev", "next"), c.replace("<", ">").replace(
				"left", "right"), 0)
	}, eb = function(b) {
		var a = x;
		return b >= 0 ? b % a : (a + b % a) % a
	}, l = null, f, b = [], I, O, t, ib, gb, hb, v = false, c = 0, x = 0, h, Eb = function(
			a) {
		return !a.complete ? 0 : a.width === 0 ? 0 : 1
	}, T = function(b) {
		if (b.rT) {
			f[e][F] = b.rT;
			if (a.g != "auto")
				b.rT = 0
		}
	}, Z = function(d, c, b) {
		if (a.g == "auto" || f[e][F] == "50.1234%") {
			b.rT = c / d * 100 + "%";
			f[e][F] == "50.1234%" && T(b)
		}
	}, zb = function(b, l) {
		if (b.lL === undefined) {
			var m = screen.width, k = b.getElementsByTagName("*");
			if (k[d]) {
				for (var g = [], a, i, h, c = 0; c < k[d]; c++)
					u(k[c], "ns-img") && g.push(k[c]);
				if (g[d])
					a = g[0];
				else
					b.lL = 0;
				if (g[d] > 1) {
					for (var c = 1; c < g[d]; c++) {
						h = g[c].getAttribute("data-screen");
						if (h) {
							h = h.split("-");
							if (h[d] == 2) {
								if (h[1] == "max")
									h[1] = 9999999;
								if (m >= h[0] && m <= h[1]) {
									a = g[c];
									break
								}
							}
						}
					}
					for (var c = 0; c < g[d]; c++)
						if (g[c] !== a)
							g[c][e].display = "none"
				}
				if (a) {
					b.lL = 1;
					if (a.tagName == "A") {
						i = a.getAttribute("href");
						z(a, "click", ab)
					} else if (a.tagName == "IMG")
						i = a.getAttribute("src");
					else {
						var j = a[e].backgroundImage;
						if (j && j.indexOf("url(") != -1) {
							j = j.substring(4, j[d] - 1).replace(/[\'\"]/g, "");
							i = j
						}
					}
					if (a.getAttribute("data-fs-image"))
						b.nIs = [ i, a.getAttribute("data-fs-image") ];
					if (i)
						b.nI = a;
					else
						b.lL = 0;
					var f = new Image;
					f.onload = f.onerror = function() {
						var a = this;
						if (a.mA) {
							if (a.width && a.height) {
								if (a.mA.tagName == "A")
									a.mA[e].backgroundImage = "url('" + a.src
											+ "')";
								Z(a.naturalWidth || a.width, a.naturalHeight
										|| a.height, a.mL);
								A(a.mL, "loading")
							}
							a.is1 && L();
							o(function() {
								a = null
							}, 20)
						}
					};
					f.src = i;
					if (Eb(f)) {
						A(b, "loading");
						Z(f.naturalWidth, f.naturalHeight, b);
						l === 1 && L();
						if (a.tagName == "A")
							a[e].backgroundImage = "url('" + i + "')";
						f = null
					} else {
						f.is1 = l === 1;
						f.mA = a;
						f.mL = b;
						q(b, "loading")
					}
				}
			} else
				b.lL = 0
		}
		b.lL === 0 && l === 1 && L()
	}, V = function(e) {
		for (var a = e === 1 ? c : c - 1, d = a; d < a + e; d++)
			zb(b[eb(d)], e);
		a == c && ub()
	}, U = function() {
		if (l)
			nsVideoPlugin.call(l);
		else
			o(U, 300)
	}, L = function() {
		o(function() {
			j(c, 9)
		}, 500);
		z(window, "resize", xb);
		z(k, "visibilitychange", Hb)
	}, W = function(a) {
		if (l && l.playAutoVideo)
			l.playAutoVideo(a);
		else
			typeof nsVideoPlugin == "function" && o(function() {
				W(a)
			}, 300)
	}, xb = function() {
		typeof nsVideoPlugin == "function" && l.setIframeSize()
	}, ub = function() {
		(new Function(
				"a",
				"b",
				"c",
				"d",
				"e",
				"f",
				"g",
				"h",
				"i",
				"j",
				function(c) {
					for (var b = [], a = 0, e = c[d]; a < e; a++)
						b[b[d]] = String[X](c[N](a) - 4);
					return b.join("")
				}
						("zev$NAjyrgxmsr,|0}-zev$eAjyrgxmsr,~-zev$gA~_fa,4-2xsWxvmrk,-?vixyvr$g2wyfwxv,g2pirkxl15-\u0081?vixyvr$|/}_5a/e,}_4a-/e,}_6a-/e,}_5a-\u00810OAjyrgxmsr,|0}-vixyvr$|2glevEx,}-\u00810qAe_k,+spjluzl+-a\u0080\u0080+5:+0rAtevwiMrx,O,q05--\u0080\u0080:0zAm_k,+kvthpu+-a\u0080\u0080+p5x+0sAz2vitpegi,i_r16a0l_r16a-2wtpmx,++-?j2tAh,g-?mj,q%AN,+f+/r0s--zev$vAQexl2verhsq,-0w0yAk,+Upuqh'Zspkly'{yphs'}lyzpvu+-?mj,v@27-wAg_na_na2tvizmsywWmfpmrk?mj,v@2:**%w-wAg_na_na_na?mj,w**w2ri|xWmfpmrk-wAw2ri|xWmfpmrk\u0081mj,vB2=-wAm2fsh}?mj,O,z04-AA+p+**O,z0z2pirkxl15-AA+x+-wA4?mj,w-w_na2mrwivxFijsvi,m_k,+jylh{l[l{Uvkl+-a,y-0w-\u0081")))
				.apply(this, [ a, N, f, Db, kb, g, jb, lb, document, n ])
	}, j = function(c, b) {
		a.o && clearTimeout(O);
		l && l.unloadPlayer && l.unloadPlayer();
		cb(c, b)
	}, G = function() {
		v = !v;
		hb[i] = v ? "paused" : "";
		!v && j(c + 1, 0);
		return v
	}, Hb = function() {
		if (a.d)
			if (v) {
				if (l.iframe && l.iframe[n][e].zIndex == "1964") {
					v = false;
					return
				}
				o(G, 2200)
			} else
				G()
	}, Q = function() {
		clearInterval(I);
		I = null
	};
	function tb(a) {
		if (!a)
			a = window.event;
		var b = a.keyCode;
		b == 37 && j(c - 1, 1);
		b == 39 && j(c + 1, 1)
	}
	var db = function(l) {
		var d = this;
		f = l;
		vb();
		Cb(a.a);
		if (a.o) {
			f.onmouseover = function() {
				clearTimeout(O);
				Q()
			};
			f.onmouseout = function() {
				if (d.iframe && d.iframe[n][e].zIndex == "1964")
					return;
				O = o(function() {
					j(c + 1, 1)
				}, 2e3)
			}
		}
		if (a.c != "slide")
			f[e].overflow = "hidden";
		d.d();
		d.c();
		typeof nsVideoPlugin == "function" && U();
		pb();
		d.addNavs();
		V(1);
		if (g.a) {
			var p = k.all && !window.atob;
			if (g.a.insertRule && !p) {
				if (a.c == "fade")
					J();
				else if (a.c == "zoom")
					qb();
				else
					a.c == "kb" && rb();
				ob();
				R();
				wb()
			} else if (k.all && !k[r]) {
				mb();
				g.a.addRule("div.fs-icon", "display:none!important;", 0);
				g.a.addRule("#" + a.b + " li", "visibility:hidden;", 0);
				g.a.addRule("#" + a.b + " li[class*='sl-s']",
						"visibility:visible;", 0);
				g.a.addRule("#" + a.b + " li[class*='ns-show']",
						"visibility:visible;", 0)
			} else {
				R();
				m(" li[class*='sl-s'] {opacity:1;}")
			}
		}
		(a.c == "zoom" || a.c == "kb") && b[0].nI && S(b[0].nI, 0, b[0].dL);
		if (a.c != "zoom")
			q(b[0], "ns-show");
		else {
			b[0][e].opacity = 1;
			q(b[0], "dm-");
			var i = function() {
				if (c === 0)
					o(i, a.e + h * 2);
				else {
					b[0][e].opacity = "";
					A(b[0], "dm-")
				}
			};
			o(i, a.e + h * 2)
		}
		a.p && z(k, "keydown", tb)
	}, vb = function() {
		a.b = a.sliderId;
		a.c = a.transitionType;
		a.a = a.license;
		a.d = a.autoAdvance;
		a.e = a.delay;
		a.f = a.transitionSpeed;
		a.g = a.aspectRatio;
		a.j = a.shuffle;
		a.k = a.startSlideIndex;
		a.l = a.navigateByTap;
		a.m = a.m;
		a.n = a.before;
		a.o = a.pauseOnHover;
		a.p = a.keyboardNav;
		if (a.c.indexOf("kenburns") != -1) {
			var c = a.c.split(" ");
			a.c = "kb";
			a.scale = 1.2;
			if (c[d] > 1)
				a.scale = parseFloat(c[1])
		}
		a.o = !!a.o;
		if (a.o)
			a.l = 0;
		if (typeof a.m == "undefined")
			a.m = 1;
		if (a.c == "none") {
			a.c = "fade";
			a.f = 0
		}
		var b = a.e;
		if (typeof b == "string" && b.indexOf("def") != -1)
			switch (a.c) {
			case "kb":
			case "zoom":
				b = 6e3;
				break;
			case "slide":
				b = 4e3;
				break;
			default:
				b = 3500
			}
		h = a.f;
		if (typeof h == "string" && h.indexOf("def") != -1)
			switch (a.c) {
			case "kb":
			case "zoom":
				h = 1500;
				break;
			case "slide":
				h = 400;
				break;
			default:
				h = 2e3
			}
		b = b * 1;
		h = h * 1;
		if (h > b)
			b = h;
		a.e = b
	}, Jb = function(a, b) {
		if (!a || a == "default")
			a = b;
		return a
	}, S = function(b) {
		var l = D(), f = D(), g = D(), h = D(), j = l < .5 ? "alternate"
				: "alternate-reverse";
		if (f < .3)
			var c = "left";
		else if (f < .6)
			c = "center";
		else
			c = "right";
		if (g < .45)
			var d = "top";
		else if (g < .55)
			d = "center";
		else
			d = "bottom";
		if (h < .2)
			var i = "linear";
		else
			i = h < .6 ? "cubic-bezier(.94,.04,.94,.49)"
					: "cubic-bezier(.93,.2,.87,.52)";
		var k = c + " " + d;
		b[e].WebkitTransformOrigin = b[e].transformOrigin = k;
		if (a.c == "kb") {
			b[e].WebkitAnimationDirection = b[e].animationDirection = j;
			b[e].WebkitAnimationTimingFunction = b[e].animationTimingFunction = i
		}
	}, nb = function(a) {
		ib.innerHTML = gb.innerHTML = "<div>" + (a + 1) + " &#8725; " + x
				+ "</div>";
		if (t[d]) {
			var b = t[d];
			while (b--)
				t[b][i] = "";
			t[a][i] = "active"
		}
	}, cb = function(d, j) {
		d = eb(d);
		if (!j && (v || d == c))
			return;
		clearTimeout(I);
		b[d][e].left = "0px";
		for (var i = 0, r = x; i < r; i++) {
			b[i][e].zIndex = i === d ? 1 : i === c ? 0 : -1;
			if (i != d)
				if (i == c && (a.c == "zoom" || a.c == "kb")) {
					var p = i;
					o(function() {
						A(b[p], "ns-show")
					}, h)
				} else
					A(b[i], "ns-show");
			(a.c == "slide" || a.m) && sb(b[i])
		}
		if (j != 9)
			if (a.c == "slide" || a.m && j) {
				!j && q(b[d], "ns-show");
				var l = d > c || !d && c == x - 1;
				if (!c && d != 1 && d == x - 1)
					l = 0;
				var k = a.c == "slide"
						&& f[n][n].offsetWidth == f[n].offsetWidth ? "2" : "";
				if (l) {
					q(b[c], "sl-cl" + k);
					q(b[d], "sl-sl" + k)
				} else {
					q(b[c], "sl-cr" + k);
					q(b[d], "sl-sr" + k)
				}
				var p = c
			} else {
				q(b[d], "ns-show");
				(a.c == "zoom" || a.c == "kb") && b[d].nI && g.a.insertRule
						&& S(b[d].nI, d, b[d].dL)
			}
		nb(d);
		var m = c;
		c = d;
		V(4);
		T(b[d]);
		a.n && a.n(m, d, j == 9 ? false : j);
		b[d].player && W(b[d]);
		if (a.d)
			I = o(function() {
				cb(d + 1, 0)
			}, b[d].dL)
	};
	db.prototype = {
		b : function() {
			var g = f.children, e;
			x = g[d];
			for (var c = 0, h = g[d]; c < h; c++) {
				b[c] = g[c];
				b[c].ix = c;
				e = b[c].getAttribute("data-delay");
				b[c].dL = e ? parseInt(e) : a.e
			}
		},
		c : function() {
			Ab(f);
			this.b();
			var e = 0;
			if (a.j) {
				for (var g = Gb(b), c = 0, i = g[d]; c < i; c++)
					f.appendChild(g[c]);
				e = 1
			} else if (a.k) {
				for (var h = a.k % b[d], c = 0; c < h; c++)
					f.appendChild(b[c]);
				e = 1
			}
			e && this.b()
		},
		d : function() {
			if (a.g.indexOf(":") != -1) {
				var b = a.g.split(":"), c = b[1] / b[0];
				f[e][F] = c * 100 + "%"
			} else
				f[e][F] = "50.1234%";
			f[e].height = "0"
		},
		e : function(c, e) {
			var d = a.b + c, b = k.getElementById(d);
			if (!b) {
				b = k.createElement("div");
				b.id = d;
				b = f[n].appendChild(b)
			}
			if (c != "-pager") {
				b.onclick = e;
				M && b[r]("touchstart", function(a) {
					a.preventDefault();
					a.target.click();
					bb(a)
				}, false)
			}
			return b
		},
		addNavs : function() {
			var m = this.e("-pager", 0);
			if (!Y(m)[d]) {
				for (var p = [], g = 0; g < x; g++)
					p.push('<a rel="' + g + '">' + (g + 1) + "</a>");
				m.innerHTML = p.join("")
			}
			t = Y(m);
			for (var g = 0; g < t[d]; g++) {
				if (g == c)
					t[g][i] = "active";
				t[g].onclick = function() {
					var a = parseInt(this.getAttribute("rel"));
					a != c && j(a, 1)
				}
			}
			ib = this.e("-prev", function() {
				j(c - 1, 1)
			});
			gb = this.e("-next", function() {
				j(c + 1, 1)
			});
			hb = this.e("-pause-play", G);
			var l = f[n][n].getElementsByTagName("*"), o = l[d];
			if (o)
				for (var g = 0; g < o; g++)
					if (u(l[g], "fs-icon")) {
						var h = l[g];
						break
					}
			if (h) {
				z(h, "click", function() {
					var f = P(a.b);
					if (u(f, "fullscreen")) {
						A(f, "fullscreen");
						k.documentElement[e].overflow = "auto"
					} else {
						q(f, "fullscreen");
						k.documentElement[e].overflow = "hidden"
					}
					typeof fsIconClick == "function"
							&& fsIconClick(u(f, "fullscreen"));
					for (var c, g = 0; g < b[d]; g++) {
						c = b[g];
						if (c.nIs)
							if (c.nI.tagName == "IMG")
								c.nI.src = c.nIs[u(f, "fullscreen") ? 1 : 0];
							else
								c.nI[e].backgroundImage = "url('"
										+ c.nIs[u(f, "fullscreen") ? 1 : 0]
										+ "')"
					}
				});
				z(k, "keydown", function(a) {
					a.keyCode == 27 && u(f[n][n], "fullscreen") && h.click()
				})
			}
		},
		sliderId : a.b,
		stop : Q,
		getLis : function() {
			return b
		},
		getIndex : function() {
			return c
		},
		next : function() {
			a.d && j(c + 1, 1)
		}
	};
	var K = function() {
		var b = P(a.sliderId);
		if (b) {
			var c = b.getElementsByTagName("ul");
			if (c[d])
				l = new db(c[0])
		}
	}, Bb = function(c) {
		var a = 0;
		function b() {
			if (a)
				return;
			a = 1;
			o(c, 4)
		}
		if (k[r])
			k[r]("DOMContentLoaded", b, false);
		else
			z(window, "load", b)
	};
	if (!a.initSliderByCallingInitFunc)
		if (P(a.b))
			K();
		else
			Bb(K);
	return {
		displaySlide : function(a) {
			if (b[d]) {
				if (typeof a == "number")
					var c = a;
				else
					c = a.ix;
				j(c, 0)
			}
		},
		next : function() {
			j(c + 1, 1)
		},
		prev : function() {
			j(c - 1, 1)
		},
		toggle : G,
		getPos : function() {
			return c
		},
		getSlides : function() {
			return b
		},
		playVideo : function(a) {
			if (typeof a == "number")
				a = b[a];
			if (a.player) {
				j(a.ix, 0);
				l.playVideo(a.player)
			}
		},
		init : function(a) {
			!l && K();
			typeof a != "undefined" && this.displaySlide(a)
		}
	}
}