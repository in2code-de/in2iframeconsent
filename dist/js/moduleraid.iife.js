!function(){var t=/*#__PURE__*/function(){function t(){}return t.t=function(t){var i=document.cookie.match("(^|;)\\s*"+t+"\\s*=\\s*([^;]+)");return i&&i.pop()||""},t.i=function(t){var i=t.name,n=t.value,a=t.expirationMonths,r=window.location.hostname,e=new Date;e.setMonth(e.getMonth()+a);var c=e.toUTCString();document.cookie=i+"="+n+";expires="+c+";domain="+r+";path=/;SameSite=None;secure"},t.o=function(t){this.i({name:t,value:"",expirationMonths:-1})},t}();window.iframeSwitch=new(/*#__PURE__*/function(){function i(){this.u="iframeswitch",this.h=3,this.m="3.0.4",this.v(),this.l(),this.M(),i.p()}var n=i.prototype;return n.v=function(){if(window.iframeSwitchConfig){var t=window.iframeSwitchConfig;this.u=t.cookieName||this.u,this.h=t.expirationMonths||this.h}},i.S=function(t){var n=i.k(t),a=document.createElement("iframe");n.forEach(function(t){a.setAttribute(t.name,t.value)});var r=t.parentNode;r.insertBefore(a,t),r.classList.remove("iframeswitch-init"),r.removeChild(t)},n.M=function(){var n=document.querySelectorAll("[data-iframeswitch-src]"),a=t.t(this.u).split(",");n.forEach(function(t){if(a.includes("*"))i.S(t);else{var n=t.getAttribute("data-iframeswitch-src");if(n){var r=i.g(n);a.forEach(function(n){n===r&&i.S(t)})}}})},i.p=function(){document.querySelectorAll("[data-iframeswitch-uri]").forEach(function(t){var n=t,a=i.A(n,"[data-iframeswitch-src]");if(a){var r=a.getAttribute("data-iframeswitch-src")||"error, domain not found";n.innerHTML=i.g(r)}})},n.l=function(){var n=this;document.querySelectorAll("[data-iframeswitch-src]").forEach(function(a){var r=a.querySelector("[data-iframeswitch-submit]");r&&r.addEventListener("click",function(a){var r=t.t(n.u);if("*"!==r){var e=i.A(a.target,"[data-iframeswitch-src]");if(e){var c=e.getAttribute("data-iframeswitch-src");if(c){var o=i.g(c);r.split(",").includes(o)||t.i({name:n.u,value:r.length>0?r+","+o:o,expirationMonths:n.h}),n.M()}}}})})},i.A=function(t,i){var n,a;for(["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"].some(function(t){return"function"==typeof document.body[t]&&(n=t,!0)});t;){if((a=t.parentElement)&&a[n](i))return a;t=a}return null},i.k=function(t){var i=[];return Array.from(t.attributes).forEach(function(t){-1!==t.name.indexOf("data-iframeswitch-")&&i.push({name:t.name.replace("data-iframeswitch-",""),value:t.value})}),i},i.g=function(t){var i=t.indexOf("//")>-1?t.split("/")[2]:t.split("/")[0];return(i=(i=i.split(":").shift()).split("?").shift())||""},n.enableAll=function(){t.i({name:this.u,value:"*",expirationMonths:this.h}),this.M()},n.disableAll=function(){t.o(this.u)},n.getVersion=function(){console.log("in2iframeconsent is running on version "+this.m+" 🌈")},i}())}();
//# sourceMappingURL=moduleraid.iife.js.map
