function IframeSwitch(){"use strict";var t=864e5;this.initialize=function(){e(),i(),r()},this.enableAll=function(){f("iframeswitch","*"),i()};var e=function(){for(var t=document.querySelectorAll("[data-iframeswitch-src]"),e=0;e<t.length;e++){var r=t[e].querySelector("button");r.addEventListener("click",function(t){var e=t.target.parentNode;"A"!==e.tagName&&(f("iframeswitch",c(e.getAttribute("data-iframeswitch-src"))),i())})}},i=function(){for(var t=document.querySelectorAll("[data-iframeswitch-src]"),e=u("iframeswitch"),i=e.split(","),r=0;r<t.length;r++){var n=c(t[r].getAttribute("data-iframeswitch-src"));if(i.includes("*"))a(t[r]);else for(var f=0;f<i.length;f++)n===i[f]&&a(t[r])}},r=function(){for(var t=document.querySelectorAll("[data-iframeswitch-uri]"),e=0;e<t.length;e++){var i=t[e].parentNode.getAttribute("data-iframeswitch-src"),r=c(i);t[e].innerHTML=r}},a=function(t){t.style.display="none";for(var e=n(t),i=document.createElement("iframe"),r=0;r<e.length;r++)i.setAttribute(e[r].name,e[r].value);t.parentNode.insertBefore(i,t)},n=function(t){for(var e=[],i=0;i<t.attributes.length;i++){var r=t.attributes[i];if(r.name.indexOf("data-iframeswitch-")!==-1){var a={name:r.name.replace("data-iframeswitch-",""),value:r.value};e.push(a)}}return e},c=function(t){var e;return e=t.indexOf("//")>-1?t.split("/")[2]:t.split("/")[0],e=e.split(":")[0],e=e.split("?")[0]},f=function(t,e,i){var r="",a=u("iframeswitch"),n=a.split(",");"*"===e?(r=e,s(t,r,i)):n.includes(e)||(r=a?u("iframeswitch")+","+e:e,s(t,r,i))},s=function(e,i,r){var a;if(r){var n=new Date;n.setTime(n.getTime()+r*t),a="; expires="+n.toGMTString()}else a="";document.cookie=e+"="+i+a+"; path=/"},u=function(t){for(var e=t+"=",i=document.cookie.split(";"),r=0;r<i.length;r++){for(var a=i[r];" "===a.charAt(0);)a=a.substring(1);if(0===a.indexOf(e))return a.substring(e.length,a.length)}return""}}var iframeSwitch=new window.IframeSwitch;iframeSwitch.initialize();