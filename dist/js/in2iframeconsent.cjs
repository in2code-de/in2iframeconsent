var e=/*#__PURE__*/function(){function e(){}return e.getCookie=function(e){var t=document.cookie.match("(^|;)\\s*"+e+"\\s*=\\s*([^;]+)");return t&&t.pop()||""},e.setCookie=function(e){var t=e.name,a=e.value,i=e.expirationYears,o=window.location.hostname,r=new Date;r.setFullYear(r.getFullYear()+i);var n=r.toUTCString();document.cookie=t+"="+a+";expires="+n+";domain="+o+";path=/;SameSite=None;secure"},e.deleteCookie=function(e){this.setCookie({name:e,value:"nothing",expirationYears:-100})},e}();new(/*#__PURE__*/function(){function t(){this.cookieName="iframeswitch",this.expirationYears=10,this.addButtonEvents(),this.autoEnableIframes(),t.addDomainInformation(),window.iframeSwitch=window.iframeSwitch||{}}t.changeElementToIframe=function(e){var a=t.getAllDataAttributes(e),i=document.createElement("iframe");a.forEach(function(e){i.setAttribute(e.name,e.value)});var o=e.parentNode;o.insertBefore(i,e),o.classList.remove("iframeswitch-init"),o.removeChild(e)};var a=t.prototype;return a.autoEnableIframes=function(){var a=document.querySelectorAll("[data-iframeswitch-src]"),i=e.getCookie(this.cookieName).split(",");a.forEach(function(e){if(i.includes("*"))t.changeElementToIframe(e);else{var a=e.getAttribute("data-iframeswitch-src");if(a){var o=t.extractHostname(a);i.forEach(function(a){a===o&&t.changeElementToIframe(e)})}}})},t.addDomainInformation=function(){document.querySelectorAll("[data-iframeswitch-uri]").forEach(function(e){var a=t.closest(e,"[data-iframeswitch-src]");if(a){var i=a.getAttribute("data-iframeswitch-src")||"error, domain not found";e.innerHTML=t.extractHostname(i)}})},a.addButtonEvents=function(){var a=this;document.querySelectorAll("[data-iframeswitch-src]").forEach(function(i){var o=i.querySelector("[data-iframeswitch-submit]");o&&o.addEventListener("click",function(i){var o=e.getCookie(a.cookieName);if("*"!==o){var r=t.closest(i.target,"[data-iframeswitch-src]");if(r){var n=r.getAttribute("data-iframeswitch-src");if(n){var c=t.extractHostname(n);e.setCookie({name:a.cookieName,value:o.length>0?o+","+c:c,expirationYears:a.expirationYears}),a.autoEnableIframes()}}}})})},t.closest=function(e,t){var a,i;for(["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"].some(function(e){return"function"==typeof document.body[e]&&(a=e,!0)});e;){if((i=e.parentElement)&&i[a](t))return i;e=i}return null},t.getAllDataAttributes=function(e){var t=[];return Array.from(e.attributes).forEach(function(e){-1!==e.name.indexOf("data-iframeswitch-")&&t.push({name:e.name.replace("data-iframeswitch-",""),value:e.value})}),t},t.extractHostname=function(e){return(e.indexOf("//")>-1?e.split("/")[2]:e.split("/")[0]).split(":")[0].split("?")[0]||""},a.enableAll=function(){e.setCookie({name:this.cookieName,value:"*",expirationYears:this.expirationYears}),this.autoEnableIframes()},a.disableAll=function(){e.deleteCookie(this.cookieName)},t}());
//# sourceMappingURL=in2iframeconsent.cjs.map
