!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.mockSystem=t():e.mockSystem=t()}(self,(function(){return function(){var e={482:function(e){e.exports=(()=>{var e={49:e=>{var t=1e3,n=60*t,r=60*n,s=24*r,a=7*s;function o(e,t,n,r){var s=t>=1.5*n;return Math.round(e/n)+" "+r+(s?"s":"")}e.exports=function(e,i){i=i||{};var c,u,f=typeof e;if("string"===f&&e.length>0)return function(e){if(!((e=String(e)).length>100)){var o=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(o){var i=parseFloat(o[1]);switch((o[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return 315576e5*i;case"weeks":case"week":case"w":return i*a;case"days":case"day":case"d":return i*s;case"hours":case"hour":case"hrs":case"hr":case"h":return i*r;case"minutes":case"minute":case"mins":case"min":case"m":return i*n;case"seconds":case"second":case"secs":case"sec":case"s":return i*t;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return i;default:return}}}}(e);if("number"===f&&isFinite(e))return i.long?(c=e,(u=Math.abs(c))>=s?o(c,u,s,"day"):u>=r?o(c,u,r,"hour"):u>=n?o(c,u,n,"minute"):u>=t?o(c,u,t,"second"):c+" ms"):function(e){var a=Math.abs(e);return a>=s?Math.round(e/s)+"d":a>=r?Math.round(e/r)+"h":a>=n?Math.round(e/n)+"m":a>=t?Math.round(e/t)+"s":e+"ms"}(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}}},t={};function n(r){var s=t[r];if(void 0!==s)return s.exports;var a=t[r]={exports:{}};return e[r](a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};return(()=>{"use strict";n.r(r),n.d(r,{sign:()=>c,verify:()=>u});var e=n(49),t=n.n(e);function s(e){return btoa(encodeURIComponent(e)).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function a(e){let t=atob(e.replace(/-/g,"+").replace(/_/g,"/"));return decodeURIComponent(t)}function o(e){return(new TextEncoder).encode(e)}async function i(e,t){return s((n=await crypto.subtle.sign({name:"HMAC",hash:"SHA-256"},await crypto.subtle.importKey("raw",o(e),{name:"HMAC",hash:"SHA-256"},!1,["sign"]),o(t)),(new TextDecoder).decode(n)));var n}async function c(e,n,r={}){var a;const o=s(JSON.stringify({alg:"HS256",typ:"JWT",exp:(a=r.expiresIn,"string"==typeof a?Math.floor(Date.now()/1e3)+Math.floor(t()(a)/1e3):"number"==typeof a?Math.floor(Date.now()/1e3)+a:void 0)})),c=s(JSON.stringify(e)),u=`${o}.${c}`;return`${o}.${c}.${s(await i(n,u))}`}async function u(e,t){try{const[n,r,o]=e.split("."),c=`${n}.${r}`;if(s(await i(t,c))!==o)return[!1,"Signature verification failed"];const u=JSON.parse(a(n)),f=Math.floor(Date.now()/1e3);return u.exp&&f>u.exp?[!1,"Token has expired"]:[!0,null,JSON.parse(a(r))]}catch(e){return[!1,e.message]}}})(),r})()}},t={};function n(r){var s=t[r];if(void 0!==s)return s.exports;var a=t[r]={exports:{}};return e[r].call(a.exports,a,a.exports,n),a.exports}n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};return function(){"use strict";n.r(r),n.d(r,{getMockData:function(){return J},initMockSystem:function(){return P}});const e="zhihu-live-v1",t=location.origin,s=`${t}_${e}_ACCESS`,a=`${t}_${e}_REFRESH`,o=/((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;var i=n(482);function c(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()}function u(e=16,t=""){const n=t+Math.random().toString(36).slice(2);return n.length>=e?n.slice(0,e):n+u(e-n.length,n)}function f(e){if("access"===e)return s;if("refresh"===e)return a;throw new Error("不存在该类型令牌")}async function d(e,t="access"){const n=f(t);return await i.verify(e,n)}async function p(e,t="access",n={}){const r=f(t);return await i.sign(e,r,n)}async function y(e){const t=await async function(e){return await p(e,"access",{expiresIn:"1d"})}(e),n=await async function(e){return await p(Object.assign({},{data:e},{isRefresh:!0}),"refresh",{expiresIn:"30d"})}(e);return{accessToken:t,refreshToken:n}}function m(e,t){if(!t)return!0;let n=0;return Array.isArray(t)?t.forEach((e=>n|=e)):n=t,(e&n)===n}function l(...e){return e.reduce(((e,t)=>e|t),0)}const h=new URL(t);let w=null;const g=new Map;function _(e){return new URL(`${h.href}${e}`)}async function b(e){const t=_(e);return g.get(t.href)||w.match(t).then((async e=>{if(e){const n=await e.json();let r;return"array"===c(n)&&(r={},n.forEach((e=>r[e.id]=e)),S(t.href,r)),g.set(t.href,r||n),n}return null}))}function v(e){return new Response(JSON.stringify(e))}async function S(e,t){const n=c(t);if(["object","array"].includes(n))return w.keys().then((async r=>{const s=_(e),a=r.find((e=>e.url===s.href));if(!a)return w.put(s,v(t));const o=await(await w.match(a)).json();if(c(o)===n)return;let i;return"object"===n?(i=Object.assign({},t),o.forEach((e=>i[e.id]=e))):i=[...t,...Object.keys(o).map((e=>o[e]))],w.put(s,v(i))}))}async function O(e,t){const n=await b(e),[r,s,a]=$(e,t);if(!r)throw new Error(s);return n[a.id]=a,await w.put(_(e),v(n)),a}const x={get:async function(e){return b(e)},set:async function(e,t){return w.put(_(e),v(t))},insert:O,update:async function(e,t){const n=await b(e),r=t.id;if(!(r in n))return O(e,t);const[s,a,o]=$(e,t);if(!s)throw new Error(a);return n[r]=Object.assign(n[r],o),await w.put(_(e),v(n)),o},remove:async function(e,t){const n=await b(e),r=t.id;if(r in n)return delete n[r],w.put(_(e),v(n))},clear:async function(e){return w.delete(_(e))},find:async function(e,{id:t,matcher:n}){const r=await b(e);n=n||(e=>e.id===t);const s=[];for(const e in r){const t=r[e];n(t)&&s.push(t)}return s},init:S,findById:async function(e,t){const n=await b(e);return t in n?n[t]:null}},{DB_SHOW_HIDDEN_FIELD:j}={DB_SHOW_HIDDEN_FIELD:1},D={user:{id:{type:"string",default:()=>u(16),permission:l(j)},name:{type:"string",required:!0},password:{type:"string",required:!0,permission:l(j)},age:{type:"number"},sex:{type:"string"},email:{type:"string"},phone:{type:"string",verify:e=>o.test(e)},permission:{type:"number",defautl:()=>0,permission:l(j)},createTime:{type:"date",default:()=>new Date,permission:l(j)},updateTime:{type:"date",default:()=>new Date,autoUpdate:!0,permission:l(j)},avatar:{type:"string"},isDeleted:{type:"boolean",defualt:()=>!1,permission:l(j)}},session:{id:{type:"string",default:()=>u(16)},info:{type:"string",required:!0},createTime:{type:"date",default:()=>new Date},expireTime:{type:"date",default:()=>new Date((new Date).getTime()+3e5)}}};function $(e,t){const n=D[e];if(!n)return[!1,`未找到${e}表`];const r={},s=[];for(const e in n){const a=r[e]=t[e],o=n[e];if(o.required&&!a)return[!1,`缺少${e}字段`];if(o.default&&!a&&(r[e]=o.default()),o.required&&c(a)!==o.type)return[!1,`字段${e}类型错误, 期望${o.type}, 实际${c(a)}`];if(o.verify&&a&&!o.verify(a))return[!1,`字段${e}验证失败`];o.autoUpdate&&s.push(e)}for(const e of s)r[e]=n[e].default();return[!0,null,r]}function k(e,t,n){const r=D[e];if(!r)return t;const s={...t};for(const e in r)m(n,r[e].permission)?s[e]||(s[e]=(a=r[e].type,{string:"",number:0,boolean:!1,date:new Date,array:[],object:{}}[a])):delete s[e];var a;return s}function M(e){return async t=>{const{headers:n}=t,r=n.authorization;if(!r?.startsWith("Bearer"))return{__format:!0,status:401,data:{message:"未授权"}};const s=r.split(" ")[1],[a,o,i]=await d(s);return a?i.isRefresh?{__format:!0,status:401,data:{message:"refreshToken 无法认证"}}:e(Object.assign(t,{tokenData:i})):{__format:!0,status:401,data:{message:o}}}}const T={post:{async register({data:e}){const[t]=await x.find("user",{matcher:t=>t.name===e.name});if(t)return{__format:!0,status:400,data:{message:"用户名已存在"}};try{const t=await x.insert("user",e);return{success:!0,...await y({id:t.id,permission:t.permission})}}catch(e){return{__format:!0,status:500,data:{message:e.message}}}},async login({data:e}){const[t]=await x.find("user",{matcher:t=>t.name===e.name&&t.password===e.password});return t?{success:!0,...await y({id:t.id,permission:t.permission})}:{__format:!0,status:400,data:{message:"用户名或密码错误"}}},async checkCaptcha({data:e}){const{captcha:t,captchaId:n}=e;if(!t)return{__format:!0,status:400,data:{message:"验证码不能为空"}};if(!n)return{__format:!0,status:400,data:{message:"验证码ID不能为空"}};const r=await x.findById("session",n);return r?r.expireTime<new Date?(await x.remove("session",r),{__format:!0,status:400,data:{message:"验证码已过期"}}):JSON.parse(r.info).captcha!==t?{__format:!0,status:400,data:{message:"验证码错误"}}:(await x.remove("session",r),{success:!0}):{__format:!0,status:400,data:{message:"验证码不存在"}}}},get:{async captcha({query:e}){if(!e.phone)return{__format:!0,status:400,data:{message:"手机号不能为空"}};const t=u(6);return{success:!0,captchaId:(await x.update("session",{id:u(16),info:JSON.stringify({phone:e.phone,captcha:t})})).id,captcha:t}},async refresh({query:e}){if(!e.refreshToken)return{__format:!0,status:400,data:{message:"refreshToken不能为空"}};const[t,n,r]=await d(e.refreshToken,"refresh");if(!t)return{__format:!0,status:401,data:{message:n}};const{isRefresh:s,data:a}=r;return s?{success:!0,...await y(a)}:{__format:!0,status:401,data:{message:"refreshToken无效"}}},test:M((async({tokenData:e})=>({success:!0,...e}))),getUserInfo:M((async({tokenData:e})=>{const{id:t}=e,n=await x.findById("user",t);return n?n.isDeleted?{__format:!0,status:400,data:{message:"用户已删除"}}:{success:!0,userInfo:k("user",n,n.permission)}:{__format:!0,status:400,data:{message:"用户不存在"}}}))}};function E(e,t=T){if(e in t)return t[e];const[n,r]=e.replace(".","\n").split("\n");if(!n)return;const s=t[n];return s?r?E(r,s):s:void 0}const I=new Proxy({},{get(e,t){return E(t)}});async function R(e,t){const n=E(e);if(!n)throw new Error(`未找到${e}控制器`);return n(t)}async function N(e,t,n){const r="get"===e?{}:await n.json(),s={},a={};return n.headers.entries().forEach((([e,t])=>a[e]=t)),t.searchParams.forEach(((e,t)=>s[t]=e)),{data:r,query:s,headers:a,$__call:R}}async function J(e,t,n){try{const r=n.method.toLowerCase(),s=I[function(e,t){return[e,...t.split("/")].filter(Boolean).join(".")}(r,e)];return s?await async function(e){return"object"==typeof e&&"function"==typeof e.then&&(e=await e),e instanceof Response?e:"object"==typeof e&&e.__format?new Response(JSON.stringify(e.data),{status:e.status||200}):new Response(JSON.stringify({data:e,time:Date.now()}))}(s({uri:t,request:n,...await N(r,t,n)})):new Response(null,{status:404})}catch(e){return new Response(JSON.stringify({error:e.message}),{status:500})}}async function P(){await async function(){return caches.open(e).then((async e=>w=e))}(),await async function(){await Promise.all(Object.keys(D).map((e=>x.init(e,{}))))}()}}(),r}()}));