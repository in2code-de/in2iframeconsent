class t{static t(t){const e=document.cookie.match(`(^|;)\\s*${t}\\s*=\\s*([^;]+)`);return e&&e.pop()||""}static i({name:t,value:e,expirationYears:s}){const i=window.location.hostname,a=new Date;a.setFullYear(a.getFullYear()+s);const n=a.toUTCString();document.cookie=`${t}=${e};expires=${n};domain=${i};path=/;SameSite=None;secure`}static o(t){this.i({name:t,value:"",expirationYears:-1})}}class e{constructor(){this.m="iframeswitch",this.h=10,this.u(),this.l(),e._(),window.iframeSwitch=this||{}}static v(t){const s=e.p(t),i=document.createElement("iframe");s.forEach(t=>{i.setAttribute(t.name,t.value)});const a=t.parentNode;a.insertBefore(i,t),a.classList.remove("iframeswitch-init"),a.removeChild(t)}l(){const s=document.querySelectorAll("[data-iframeswitch-src]"),i=t.t(this.m).split(",");s.forEach(t=>{if(i.includes("*"))return void e.v(t);const s=t.getAttribute("data-iframeswitch-src");if(s){const a=e.$(s);i.forEach(s=>{s===a&&e.v(t)})}})}static _(){document.querySelectorAll("[data-iframeswitch-uri]").forEach(t=>{const s=t,i=e.S(s,"[data-iframeswitch-src]");if(i){const t=i.getAttribute("data-iframeswitch-src")||"error, domain not found";s.innerHTML=e.$(t)}})}u(){document.querySelectorAll("[data-iframeswitch-src]").forEach(s=>{const i=s.querySelector("[data-iframeswitch-submit]");i&&i.addEventListener("click",s=>{const i=t.t(this.m);if("*"===i)return;const a=e.S(s.target,"[data-iframeswitch-src]");if(!a)return;const n=a.getAttribute("data-iframeswitch-src");if(!n)return;const c=e.$(n);t.i({name:this.m,value:i.length>0?`${i},${c}`:c,expirationYears:this.h}),this.l()})})}static S(t,e){let s,i;for(["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"].some(t=>"function"==typeof document.body[t]&&(s=t,!0));t;){if(i=t.parentElement,i&&i[s](e))return i;t=i}return null}static p(t){const e=[];return Array.from(t.attributes).forEach(t=>{-1!==t.name.indexOf("data-iframeswitch-")&&e.push({name:t.name.replace("data-iframeswitch-",""),value:t.value})}),e}static $(t){let e=t.indexOf("//")>-1?t.split("/")[2]:t.split("/")[0];return e=e.split(":").shift(),e=e.split("?").shift(),e||""}enableAll(){t.i({name:this.m,value:"*",expirationYears:this.h}),this.l()}disableAll(){t.o(this.m)}static getVersion(){console.log("in2iframeconsent is running on version 3.0.0 🌈")}}new e;
//# sourceMappingURL=in2iframeconsent.modern.js.map
