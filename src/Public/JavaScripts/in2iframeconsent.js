function IframeSwitch(){"use strict";var t=864e5,e=3650;this.initialize=function(){i(),r(),a()},this.enableAll=function(){o("iframeswitch","*",e),r()};var i=function(){for(var t=document.querySelectorAll("[data-iframeswitch-src]"),i=0;i<t.length;i++){var a=t[i].querySelector("[data-iframeswitch-submit]");a.addEventListener("click",function(t){var i=l(t.target,"[data-iframeswitch-src]");o("iframeswitch",s(i.getAttribute("data-iframeswitch-src")),e),r()})}},r=function(){for(var t=document.querySelectorAll("[data-iframeswitch-src]"),e=u("iframeswitch"),i=e.split(","),r=0;r<t.length;r++){var a=s(t[r].getAttribute("data-iframeswitch-src"));if(i.includes("*"))n(t[r]);else for(var c=0;c<i.length;c++)a===i[c]&&n(t[r])}},a=function(){for(var t=document.querySelectorAll("[data-iframeswitch-uri]"),e=0;e<t.length;e++){var i=l(t[e],"[data-iframeswitch-src]").getAttribute("data-iframeswitch-src"),r=s(i);t[e].innerHTML=r}},n=function(t){for(var e=c(t),i=document.createElement("iframe"),r=0;r<e.length;r++)i.setAttribute(e[r].name,e[r].value);t.parentNode.insertBefore(i,t),t.parentNode.classList.remove("iframeswitch-init"),t.parentNode.removeChild(t)},c=function(t){for(var e=[],i=0;i<t.attributes.length;i++){var r=t.attributes[i];if(r.name.indexOf("data-iframeswitch-")!==-1){var a={name:r.name.replace("data-iframeswitch-",""),value:r.value};e.push(a)}}return e},s=function(t){var e;return e=t.indexOf("//")>-1?t.split("/")[2]:t.split("/")[0],e=e.split(":")[0],e=e.split("?")[0]},o=function(t,e,i){var r="",a=u("iframeswitch"),n=a.split(",");"*"===e?(r=e,f(t,r,i)):n.includes(e)||(r=a?u("iframeswitch")+","+e:e,f(t,r,i))},f=function(e,i,r){var a;if(r){var n=new Date;n.setTime(n.getTime()+r*t),a="; expires="+n.toGMTString()}else a="";document.cookie=e+"="+i+a+"; path=/"},u=function(t){for(var e=t+"=",i=document.cookie.split(";"),r=0;r<i.length;r++){for(var a=i[r];" "===a.charAt(0);)a=a.substring(1);if(0===a.indexOf(e))return a.substring(e.length,a.length)}return""},l=function(t,e){var i;["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"].some(function(t){return"function"==typeof document.body[t]&&(i=t,!0)});for(var r;t;){if(r=t.parentElement,r&&r[i](e))return r;t=r}return null}}window.iframeSwitch=new IframeSwitch,window.iframeSwitch.initialize();