var t=/*#__PURE__*/function(){function t(){}return t.t=function(t){var i=document.cookie.match("(^|;)\\s*"+t+"\\s*=\\s*([^;]+)");return i&&i.pop()||""},t.i=function(t){var i=t.name,n=t.value,a=t.expirationYears,r=window.location.hostname,e=new Date;e.setFullYear(e.getFullYear()+a);var c=e.toUTCString();document.cookie=i+"="+n+";expires="+c+";domain="+r+";path=/;SameSite=None;secure"},t.o=function(t){this.i({name:t,value:"",expirationYears:-1})},t}();new(/*#__PURE__*/function(){function i(){this.u="iframeswitch",this.m=10,this.h(),this.v(),i.l(),window.iframeSwitch=this||{}}i.p=function(t){var n=i.S(t),a=document.createElement("iframe");n.forEach(function(t){a.setAttribute(t.name,t.value)});var r=t.parentNode;r.insertBefore(a,t),r.classList.remove("iframeswitch-init"),r.removeChild(t)};var n=i.prototype;return n.v=function(){var n=document.querySelectorAll("[data-iframeswitch-src]"),a=t.t(this.u).split(",");n.forEach(function(t){if(a.includes("*"))i.p(t);else{var n=t.getAttribute("data-iframeswitch-src");if(n){var r=i.M(n);a.forEach(function(n){n===r&&i.p(t)})}}})},i.l=function(){document.querySelectorAll("[data-iframeswitch-uri]").forEach(function(t){var n=i.Y(t,"[data-iframeswitch-src]");if(n){var a=n.getAttribute("data-iframeswitch-src")||"error, domain not found";t.innerHTML=i.M(a)}})},n.h=function(){var n=this;document.querySelectorAll("[data-iframeswitch-src]").forEach(function(a){var r=a.querySelector("[data-iframeswitch-submit]");r&&r.addEventListener("click",function(a){var r=t.t(n.u);if("*"!==r){var e=i.Y(a.target,"[data-iframeswitch-src]");if(e){var c=e.getAttribute("data-iframeswitch-src");if(c){var o=i.M(c);t.i({name:n.u,value:r.length>0?r+","+o:o,expirationYears:n.m}),n.v()}}}})})},i.Y=function(t,i){var n,a;for(["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"].some(function(t){return"function"==typeof document.body[t]&&(n=t,!0)});t;){if((a=t.parentElement)&&a[n](i))return a;t=a}return null},i.S=function(t){var i=[];return Array.from(t.attributes).forEach(function(t){-1!==t.name.indexOf("data-iframeswitch-")&&i.push({name:t.name.replace("data-iframeswitch-",""),value:t.value})}),i},i.M=function(t){return(t.indexOf("//")>-1?t.split("/")[2]:t.split("/")[0]).split(":")[0].split("?")[0]||""},n.enableAll=function(){t.i({name:this.u,value:"*",expirationYears:this.m}),this.v()},n.disableAll=function(){t.o(this.u)},n.getVersion=function(){console.log("in2iframeconsent is running on version 3.0.0 🌈")},i}());
//# sourceMappingURL=in2iframeconsent.module.js.map
