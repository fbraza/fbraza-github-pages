(self.webpackChunkfbraza=self.webpackChunkfbraza||[]).push([[611],{4218:function(e,t,r){"use strict";r.d(t,{Z:function(){return b}});var n=r(7294),a=r(1883);var o=()=>n.createElement("section",null,n.createElement("footer",{"aria-label":"Site Footer"},n.createElement("div",{className:"mx-auto max-w-5xl px-4 pt-24 pb-16"},n.createElement("nav",{className:"mt-10"},n.createElement("div",{className:"flex flex-wrap justify-center gap-12"},n.createElement(a.Link,{to:"/articles",className:"hover:underline hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500"},"Blog"),n.createElement(a.Link,{to:"/about",className:"hover:underline hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500"},"About"),n.createElement(a.Link,{to:"/about/#contact",className:"hover:underline hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500"},"Contact"),n.createElement("a",{href:"https://github.com/fbraza",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center hover:underline hover:text-blue-600 dark:text-slate-400 dark:hover:border-b-blue-500 dark:hover:text-blue-500"},"Github",n.createElement("svg",{className:"w-5 h-5 ml-1",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},n.createElement("path",{d:"M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"}),n.createElement("path",{d:"M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"}))))),n.createElement("div",{className:"mt-8 flex flex-wrap justify-center text-sm text-slate-600 dark:text-slate-500"},"© ",(new Date).getFullYear()," Andrew Villazon. All rights reserved."))));function u(e,t,a,o){void 0===a&&(a=r.g),void 0===o&&(o={});var u=(0,n.useRef)(),l=o.capture,c=o.passive,i=o.once;(0,n.useEffect)((function(){u.current=t}),[t]),(0,n.useEffect)((function(){if(r.g&&r.g.addEventListener){var t=function(e){return u.current(e)},n={capture:l,passive:c,once:i};return r.g.addEventListener(e,t,n),function(){r.g.removeEventListener(e,t,n)}}}),[e,r.g,l,c,i])}var l={},c=function(e,t,r){return l[e]||(l[e]={callbacks:[],value:r}),l[e].callbacks.push(t),{deregister:function(){var r=l[e].callbacks,n=r.indexOf(t);n>-1&&r.splice(n,1)},emit:function(r){l[e].value!==r&&(l[e].value=r,l[e].callbacks.forEach((function(e){t!==e&&e(r)})))}}};function i(e,t){if(void 0===t&&(t=void 0!==r.g&&r.g.localStorage?r.g.localStorage:"undefined"!=typeof globalThis&&globalThis.localStorage?globalThis.localStorage:"undefined"!=typeof window&&window.localStorage?window.localStorage:"undefined"!=typeof localStorage?localStorage:null),t){var a=(o=t,{get:function(e,t){var r=o.getItem(e);return null==r?"function"==typeof t?t():t:JSON.parse(r)},set:function(e,t){o.setItem(e,JSON.stringify(t))}});return function(t){return function(e,t,r){var a=r.get,o=r.set,l=(0,n.useRef)(null),i=(0,n.useState)((function(){return a(t,e)})),s=i[0],f=i[1];u("storage",(function(e){if(e.key===t){var r=JSON.parse(e.newValue);s!==r&&f(r)}})),(0,n.useEffect)((function(){return l.current=c(t,f,e),function(){l.current.deregister()}}),[e,t]);var d=(0,n.useCallback)((function(e){var r="function"==typeof e?e(s):e;o(t,r),f(r),l.current.emit(e)}),[s,o,t]);return[s,d]}(t,e,a)}}var o;return n.useState}var s=function(){},f={classList:{add:s,remove:s}},d=function(e,t,a){void 0===a&&(a=r.g);var o=e?i(e,t):n.useState,u=r.g.matchMedia?r.g.matchMedia("(prefers-color-scheme: dark)"):{},l={addEventListener:function(e,t){return u.addListener&&u.addListener(t)},removeEventListener:function(e,t){return u.removeListener&&u.removeListener(t)}},c="(prefers-color-scheme: dark)"===u.media,s=r.g.document&&r.g.document.body||f;return{usePersistedDarkModeState:o,getDefaultOnChange:function(e,t,r){return void 0===e&&(e=s),void 0===t&&(t="dark-mode"),void 0===r&&(r="light-mode"),function(n){e.classList.add(n?t:r),e.classList.remove(n?r:t)}},mediaQueryEventTarget:l,getInitialValue:function(e){return c?u.matches:e}}};const m=()=>n.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-4 h-4 stroke-slate-100 block dark:hidden"},n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"})),v=()=>n.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-4 h-4 stroke-slate-800 hidden dark:block"},n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"}));function x(){const{toggle:e}=function(e,t){void 0===e&&(e=!1),void 0===t&&(t={});var r=t.element,a=t.classNameDark,o=t.classNameLight,l=t.onChange,c=t.storageKey;void 0===c&&(c="darkMode");var i=t.storageProvider,s=t.global,f=(0,n.useMemo)((function(){return d(c,i,s)}),[c,i,s]),m=f.getDefaultOnChange,v=f.mediaQueryEventTarget,x=(0,f.usePersistedDarkModeState)((0,f.getInitialValue)(e)),g=x[0],b=x[1],p=(0,n.useMemo)((function(){return l||m(r,a,o)}),[l,r,a,o,m]);return(0,n.useEffect)((function(){p(g)}),[p,g]),u("change",(function(e){return b(e.matches)}),v),{value:g,enable:(0,n.useCallback)((function(){return b(!0)}),[b]),disable:(0,n.useCallback)((function(){return b(!1)}),[b]),toggle:(0,n.useCallback)((function(){return b((function(e){return!e}))}),[b])}}(void 0,{classNameDark:"dark"});return n.createElement("button",{className:"p-2 rounded-full bg-slate-800 shadow transition-all dark:bg-slate-300",onClick:e},n.createElement(v,null),n.createElement(m,null))}var g=()=>n.createElement("section",{className:"pt-8"},n.createElement("nav",null,n.createElement("div",{className:"container mx-auto"},n.createElement("div",{className:"text-2xl mb-2 font-bold text-gray-800 dark:text-slate-300"},n.createElement(a.Link,{to:"/"},"Andrew Villazon")),n.createElement("div",{className:"container mx-auto flex justify-between items-center"},n.createElement("div",{className:"flex space-x-6"},[{url:"/articles",text:"Blog"},{url:"/about",text:"About"},{url:"/about/#contact",text:"Contact"}].map((e=>n.createElement(a.Link,{to:e.url,key:e.text,className:"text-lg py-2 text-gray-700 font-medium hover:border-b-blue-600 hover:text-blue-600 border-transparent border-y-2 dark:text-slate-400 dark:hover:border-b-blue-500 dark:hover:text-blue-500"},e.text)))),n.createElement("div",null,n.createElement(x,null))))));var b=e=>{let{children:t}=e;return n.createElement("div",{className:"flex flex-col h-screen justify-between"},n.createElement(g,null),n.createElement("main",{className:"mt-24 mb-auto"},t),n.createElement(o,null))}},5505:function(e,t,r){"use strict";r.d(t,{p:function(){return o}});var n=r(7294),a=r(1883);const o=e=>{let{title:t,description:r,pathname:o}=e;const u=(0,a.useStaticQuery)("2750728228"),{title:l,description:c,author:i,siteUrl:s}=u.site.siteMetadata,f={title:t||l,description:r||c,url:""+s+(o||""),author:i};return n.createElement(n.Fragment,null,n.createElement("title",null,f.title),n.createElement("meta",{name:"description",content:f.description}),n.createElement("meta",{name:"creator",content:f.author}))}},328:function(e,t,r){"use strict";var n=r(1883),a=r(7294),o=r(1804),u=r.n(o);t.Z=e=>{let{tags:t}=e;return a.createElement("div",{className:"flex flex-wrap"},t.map((e=>a.createElement(n.Link,{key:e,to:"/tags/"+u()(e),className:"font-semibold text-slate-700 border rounded py-2 px-2 border-slate-400 mr-2 mb-2 bg-slate-100 dark:bg-slate-700 dark:border-gray-600 dark:text-gray-400"},e))))}},2705:function(e,t,r){var n=r(5639).Symbol;e.exports=n},9932:function(e){e.exports=function(e,t){for(var r=-1,n=null==e?0:e.length,a=Array(n);++r<n;)a[r]=t(e[r],r,e);return a}},2663:function(e){e.exports=function(e,t,r,n){var a=-1,o=null==e?0:e.length;for(n&&o&&(r=e[++a]);++a<o;)r=t(r,e[a],a,e);return r}},9029:function(e){var t=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;e.exports=function(e){return e.match(t)||[]}},4239:function(e,t,r){var n=r(2705),a=r(9607),o=r(2333),u=n?n.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":u&&u in Object(e)?a(e):o(e)}},8674:function(e){e.exports=function(e){return function(t){return null==e?void 0:e[t]}}},531:function(e,t,r){var n=r(2705),a=r(9932),o=r(1469),u=r(3448),l=n?n.prototype:void 0,c=l?l.toString:void 0;e.exports=function e(t){if("string"==typeof t)return t;if(o(t))return a(t,e)+"";if(u(t))return c?c.call(t):"";var r=t+"";return"0"==r&&1/t==-Infinity?"-0":r}},5393:function(e,t,r){var n=r(2663),a=r(3816),o=r(8748),u=RegExp("['’]","g");e.exports=function(e){return function(t){return n(o(a(t).replace(u,"")),e,"")}}},9389:function(e,t,r){var n=r(8674)({"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss","Ā":"A","Ă":"A","Ą":"A","ā":"a","ă":"a","ą":"a","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","ć":"c","ĉ":"c","ċ":"c","č":"c","Ď":"D","Đ":"D","ď":"d","đ":"d","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","Ĥ":"H","Ħ":"H","ĥ":"h","ħ":"h","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","ĩ":"i","ī":"i","ĭ":"i","į":"i","ı":"i","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","ĸ":"k","Ĺ":"L","Ļ":"L","Ľ":"L","Ŀ":"L","Ł":"L","ĺ":"l","ļ":"l","ľ":"l","ŀ":"l","ł":"l","Ń":"N","Ņ":"N","Ň":"N","Ŋ":"N","ń":"n","ņ":"n","ň":"n","ŋ":"n","Ō":"O","Ŏ":"O","Ő":"O","ō":"o","ŏ":"o","ő":"o","Ŕ":"R","Ŗ":"R","Ř":"R","ŕ":"r","ŗ":"r","ř":"r","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","ś":"s","ŝ":"s","ş":"s","š":"s","Ţ":"T","Ť":"T","Ŧ":"T","ţ":"t","ť":"t","ŧ":"t","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","ź":"z","ż":"z","ž":"z","Ĳ":"IJ","ĳ":"ij","Œ":"Oe","œ":"oe","ŉ":"'n","ſ":"s"});e.exports=n},1957:function(e,t,r){var n="object"==typeof r.g&&r.g&&r.g.Object===Object&&r.g;e.exports=n},9607:function(e,t,r){var n=r(2705),a=Object.prototype,o=a.hasOwnProperty,u=a.toString,l=n?n.toStringTag:void 0;e.exports=function(e){var t=o.call(e,l),r=e[l];try{e[l]=void 0;var n=!0}catch(c){}var a=u.call(e);return n&&(t?e[l]=r:delete e[l]),a}},3157:function(e){var t=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;e.exports=function(e){return t.test(e)}},2333:function(e){var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},5639:function(e,t,r){var n=r(1957),a="object"==typeof self&&self&&self.Object===Object&&self,o=n||a||Function("return this")();e.exports=o},2757:function(e){var t="\\ud800-\\udfff",r="\\u2700-\\u27bf",n="a-z\\xdf-\\xf6\\xf8-\\xff",a="A-Z\\xc0-\\xd6\\xd8-\\xde",o="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",u="["+o+"]",l="\\d+",c="["+r+"]",i="["+n+"]",s="[^"+t+o+l+r+n+a+"]",f="(?:\\ud83c[\\udde6-\\uddff]){2}",d="[\\ud800-\\udbff][\\udc00-\\udfff]",m="["+a+"]",v="(?:"+i+"|"+s+")",x="(?:"+m+"|"+s+")",g="(?:['’](?:d|ll|m|re|s|t|ve))?",b="(?:['’](?:D|LL|M|RE|S|T|VE))?",p="(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?",h="[\\ufe0e\\ufe0f]?",k=h+p+("(?:\\u200d(?:"+["[^"+t+"]",f,d].join("|")+")"+h+p+")*"),E="(?:"+[c,f,d].join("|")+")"+k,y=RegExp([m+"?"+i+"+"+g+"(?="+[u,m,"$"].join("|")+")",x+"+"+b+"(?="+[u,m+v,"$"].join("|")+")",m+"?"+v+"+"+g,m+"+"+b,"\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])","\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",l,E].join("|"),"g");e.exports=function(e){return e.match(y)||[]}},3816:function(e,t,r){var n=r(9389),a=r(9833),o=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,u=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]","g");e.exports=function(e){return(e=a(e))&&e.replace(o,n).replace(u,"")}},1469:function(e){var t=Array.isArray;e.exports=t},7005:function(e){e.exports=function(e){return null!=e&&"object"==typeof e}},3448:function(e,t,r){var n=r(4239),a=r(7005);e.exports=function(e){return"symbol"==typeof e||a(e)&&"[object Symbol]"==n(e)}},1804:function(e,t,r){var n=r(5393)((function(e,t,r){return e+(r?"-":"")+t.toLowerCase()}));e.exports=n},9833:function(e,t,r){var n=r(531);e.exports=function(e){return null==e?"":n(e)}},8748:function(e,t,r){var n=r(9029),a=r(3157),o=r(9833),u=r(2757);e.exports=function(e,t,r){return e=o(e),void 0===(t=r?void 0:t)?a(e)?u(e):n(e):e.match(t)||[]}}}]);
//# sourceMappingURL=adc7963990d82702d5db74f896e9dc68ac36dd6a-8f400014070dcc8a4420.js.map