!function(n){"function"==typeof define&&define.amd?define(n):n()}(function(){var n=/*#__PURE__*/function(){function n(){}return n.t=function(n){var t=document.cookie.match("(^|;)\\s*"+n+"\\s*=\\s*([^;]+)");return t&&t.pop()||""},n.i=function(n){var t=n.name,i=n.value,a=n.expirationMonths,e=window.location.hostname,r=new Date;r.setMonth(r.getMonth()+a);var c=r.toUTCString();document.cookie=t+"="+i+";expires="+c+";domain="+e+";path=/;SameSite=None;secure"},n.o=function(n){this.i({name:n,value:"",expirationMonths:-1})},n}();new(/*#__PURE__*/function(){function t(){this.u="iframeswitch",this.h=10,this.m(),this.v(),t.l(),window.iframeSwitch=this||{}}t.p=function(n){var i=t.M(n),a=document.createElement("iframe");i.forEach(function(n){a.setAttribute(n.name,n.value)});var e=n.parentNode;e.insertBefore(a,n),e.classList.remove("iframeswitch-init"),e.removeChild(n)};var i=t.prototype;return i.v=function(){var i=document.querySelectorAll("[data-iframeswitch-src]"),a=n.t(this.u).split(",");i.forEach(function(n){if(a.includes("*"))t.p(n);else{var i=n.getAttribute("data-iframeswitch-src");if(i){var e=t.S(i);a.forEach(function(i){i===e&&t.p(n)})}}})},t.l=function(){document.querySelectorAll("[data-iframeswitch-uri]").forEach(function(n){var i=n,a=t.k(i,"[data-iframeswitch-src]");if(a){var e=a.getAttribute("data-iframeswitch-src")||"error, domain not found";i.innerHTML=t.S(e)}})},i.m=function(){var i=this;document.querySelectorAll("[data-iframeswitch-src]").forEach(function(a){var e=a.querySelector("[data-iframeswitch-submit]");e&&e.addEventListener("click",function(a){var e=n.t(i.u);if("*"!==e){var r=t.k(a.target,"[data-iframeswitch-src]");if(r){var c=r.getAttribute("data-iframeswitch-src");if(c){var o=t.S(c);n.i({name:i.u,value:e.length>0?e+","+o:o,expirationMonths:i.h}),i.v()}}}})})},t.k=function(n,t){var i,a;for(["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"].some(function(n){return"function"==typeof document.body[n]&&(i=n,!0)});n;){if((a=n.parentElement)&&a[i](t))return a;n=a}return null},t.M=function(n){var t=[];return Array.from(n.attributes).forEach(function(n){-1!==n.name.indexOf("data-iframeswitch-")&&t.push({name:n.name.replace("data-iframeswitch-",""),value:n.value})}),t},t.S=function(n){var t=n.indexOf("//")>-1?n.split("/")[2]:n.split("/")[0];return(t=(t=t.split(":").shift()).split("?").shift())||""},i.enableAll=function(){n.i({name:this.u,value:"*",expirationMonths:this.h}),this.v()},i.disableAll=function(){n.o(this.u)},t.getVersion=function(){console.log("in2iframeconsent is running on version 3.0.1 🌈")},t}())});
//# sourceMappingURL=moduleraid.iife.umd.js.map
