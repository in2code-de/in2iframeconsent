!function(){var t=/*#__PURE__*/function(){function t(){}return t.t=function(t){var n=document.cookie.match("(^|;)\\s*"+t+"\\s*=\\s*([^;]+)");return n&&n.pop()||""},t.i=function(t){var n=t.name,i=t.value,a=t.expirationMonths,r=window.location.hostname,e=new Date;e.setMonth(e.getMonth()+a);var c=e.toUTCString();document.cookie=n+"="+i+";expires="+c+";domain="+r+";path=/;SameSite=None;secure"},t.o=function(t){this.i({name:t,value:"",expirationMonths:-1})},t}();new(/*#__PURE__*/function(){function n(){this.u="iframeswitch",this.h=3,this.m(),this.v(),n.l(),window.iframeSwitch=this||{}}n.M=function(t){var i=n.p(t),a=document.createElement("iframe");i.forEach(function(t){a.setAttribute(t.name,t.value)});var r=t.parentNode;r.insertBefore(a,t),r.classList.remove("iframeswitch-init"),r.removeChild(t)};var i=n.prototype;return i.v=function(){var i=document.querySelectorAll("[data-iframeswitch-src]"),a=t.t(this.u).split(",");i.forEach(function(t){if(a.includes("*"))n.M(t);else{var i=t.getAttribute("data-iframeswitch-src");if(i){var r=n.S(i);a.forEach(function(i){i===r&&n.M(t)})}}})},n.l=function(){document.querySelectorAll("[data-iframeswitch-uri]").forEach(function(t){var i=t,a=n.k(i,"[data-iframeswitch-src]");if(a){var r=a.getAttribute("data-iframeswitch-src")||"error, domain not found";i.innerHTML=n.S(r)}})},i.m=function(){var i=this;document.querySelectorAll("[data-iframeswitch-src]").forEach(function(a){var r=a.querySelector("[data-iframeswitch-submit]");r&&r.addEventListener("click",function(a){var r=t.t(i.u);if("*"!==r){var e=n.k(a.target,"[data-iframeswitch-src]");if(e){var c=e.getAttribute("data-iframeswitch-src");if(c){var o=n.S(c);t.i({name:i.u,value:r.length>0?r+","+o:o,expirationMonths:i.h}),i.v()}}}})})},n.k=function(t,n){var i,a;for(["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"].some(function(t){return"function"==typeof document.body[t]&&(i=t,!0)});t;){if((a=t.parentElement)&&a[i](n))return a;t=a}return null},n.p=function(t){var n=[];return Array.from(t.attributes).forEach(function(t){-1!==t.name.indexOf("data-iframeswitch-")&&n.push({name:t.name.replace("data-iframeswitch-",""),value:t.value})}),n},n.S=function(t){var n=t.indexOf("//")>-1?t.split("/")[2]:t.split("/")[0];return(n=(n=n.split(":").shift()).split("?").shift())||""},i.enableAll=function(){t.i({name:this.u,value:"*",expirationMonths:this.h}),this.v()},i.disableAll=function(){t.o(this.u)},n.getVersion=function(){console.log("in2iframeconsent is running on version 3.0.1 🌈")},n}())}();
//# sourceMappingURL=moduleraid.iife.js.map
