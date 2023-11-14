(()=>{var e={37:e=>{"use strict";e.exports=require("os")},282:e=>{"use strict";e.exports=require("process")},224:e=>{"use strict";e.exports=require("tty")},44:(e,r,t)=>{var l=Object.create;var n=Object.defineProperty;var i=Object.getOwnPropertyDescriptor;var s=Object.getOwnPropertyNames;var u=Object.getPrototypeOf,c=Object.prototype.hasOwnProperty;var H=(e,r)=>{for(var t in r)n(e,t,{get:r[t],enumerable:!0})},A=(e,r,t,l)=>{if(r&&typeof r=="object"||typeof r=="function")for(let u of s(r))!c.call(e,u)&&u!==t&&n(e,u,{get:()=>r[u],enumerable:!(l=i(r,u))||l.enumerable});return e};var C=(e,r,t)=>(t=e!=null?l(u(e)):{},A(r||!e||!e.__esModule?n(t,"default",{value:e,enumerable:!0}):t,e)),K=e=>A(n({},"__esModule",{value:!0}),e);var f={};H(f,{createLogger:()=>R,logger:()=>D});e.exports=K(f);var v=C(t(282)),_=C(t(37)),m=C(t(224));function a(e,r=(globalThis.Deno?globalThis.Deno.args:v.default.argv)){let t=e.startsWith("-")?"":e.length===1?"-":"--",l=r.indexOf(t+e),n=r.indexOf("--");return l!==-1&&(n===-1||l<n)}var{env:O}=v.default,d;a("no-color")||a("no-colors")||a("color=false")||a("color=never")?d=0:(a("color")||a("colors")||a("color=true")||a("color=always"))&&(d=1);function q(){if("FORCE_COLOR"in O)return O.FORCE_COLOR==="true"?1:O.FORCE_COLOR==="false"?0:O.FORCE_COLOR.length===0?1:Math.min(Number.parseInt(O.FORCE_COLOR,10),3)}function z(e){return e===0?!1:{level:e,hasBasic:!0,has256:e>=2,has16m:e>=3}}function J(e,{streamIsTTY:r,sniffFlags:t=!0}={}){let l=q();l!==void 0&&(d=l);let n=t?d:l;if(n===0)return 0;if(t){if(a("color=16m")||a("color=full")||a("color=truecolor"))return 3;if(a("color=256"))return 2}if("TF_BUILD"in O&&"AGENT_NAME"in O)return 1;if(e&&!r&&n===void 0)return 0;let i=n||0;if(O.TERM==="dumb")return i;if(v.default.platform==="win32"){let e=_.default.release().split(".");return Number(e[0])>=10&&Number(e[2])>=10586?Number(e[2])>=14931?3:2:1}if("CI"in O)return"GITHUB_ACTIONS"in O||"GITEA_ACTIONS"in O?3:["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI","BUILDKITE","DRONE"].some((e=>e in O))||O.CI_NAME==="codeship"?1:i;if("TEAMCITY_VERSION"in O)return/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(O.TEAMCITY_VERSION)?1:0;if(O.COLORTERM==="truecolor"||O.TERM==="xterm-kitty")return 3;if("TERM_PROGRAM"in O){let e=Number.parseInt((O.TERM_PROGRAM_VERSION||"").split(".")[0],10);switch(O.TERM_PROGRAM){case"iTerm.app":return e>=3?3:2;case"Apple_Terminal":return 2}}return/-256(color)?$/i.test(O.TERM)?2:/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(O.TERM)||"COLORTERM"in O?1:i}function N(e,r={}){let t=J(e,{streamIsTTY:e&&e.isTTY,...r});return z(t)}var b={stdout:N({isTTY:m.default.isatty(1)}),stderr:N({isTTY:m.default.isatty(2)})},g=b;var T=g.stdout?g.stdout.level:0,E=/^\s*at\s.*:\d+:\d+[\s)]*$/,I=/^\s*at\s.*\(<anonymous>\)$/,$=e=>E.test(e)||I.test(e);var p=(e,r,t=e)=>T>=2?l=>{let n=""+l,i=n.indexOf(r,e.length);return~i?e+G(n,r,t,i)+r:e+n+r}:String,G=(e,r,t,l)=>{let n=e.substring(0,l)+t,i=e.substring(l+r.length),s=i.indexOf(r);return~s?n+G(i,r,t,s):n+i},y=p("[1m","[22m","[22m[1m"),M=p("[31m","[39m"),h=p("[32m","[39m"),x=p("[33m","[39m"),w=p("[35m","[39m"),L=p("[36m","[39m"),j=p("[90m","[39m");var P=[189,255,243],Y=[74,194,154],k=e=>!/[\s\n]/.test(e),V=e=>{if(T<3)return T===2?y(L(e)):e;let r=[...e],t=r.filter(k).length,l=P[0],n=P[1],i=P[2],s=(Y[0]-l)/t,u=(Y[1]-n)/t,c=(Y[2]-i)/t,f="";for(let e of r)k(e)&&(l+=s,n+=u,i+=c),f+=`[38;2;${Math.round(l)};${Math.round(n)};${Math.round(i)}m${e}[39m`;return y(f)};var F={error:0,warn:1,info:2,log:3,verbose:4},S={error:{label:"error",level:"error",color:M},warn:{label:"warn",level:"warn",color:x},info:{label:"info",level:"info",color:L},start:{label:"start",level:"info",color:L},ready:{label:"ready",level:"info",color:h},success:{label:"success",level:"info",color:h},log:{level:"log"},debug:{label:"debug",level:"verbose",color:w}};var R=(e={})=>{let r=e.level||"log",o=(e,t,...l)=>{if(F[S[e].level]>F[r])return;if(t==null)return console.log();let n=S[e],i="",s="";if("label"in n&&(i=(n.label||"").padEnd(7),i=y(n.color?n.color(i):i)),t instanceof Error)if(t.stack){let[e,...r]=t.stack.split(`\n`);s=`${e.replace("Error: ","")}\n${j(r.join(`\n`))}`}else s=t.message;else n.level==="error"&&typeof t=="string"?s=t.split(`\n`).map((e=>$(e)?j(e):e)).join(`\n`):s=`${t}`;console.log(i.length?`${i} ${s}`:s,...l)},t={greet:e=>o("log",V(e))};return Object.keys(S).forEach((e=>{t[e]=(...r)=>o(e,...r)})),t};var D=R();0&&0}};var r={};function __nccwpck_require__(t){var l=r[t];if(l!==undefined){return l.exports}var n=r[t]={exports:{}};var i=true;try{e[t](n,n.exports,__nccwpck_require__);i=false}finally{if(i)delete r[t]}return n.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var t=__nccwpck_require__(44);module.exports=t})();