var d=Object.freeze,D=Object.defineProperty;var f=(e,t)=>d(D(e,"raw",{value:d(t||e.slice())}));import{p as F,u as S,j as l,a as o,S as T,D as C,g as k,$ as w,b as A,c as g}from"./index-CAs056U8.js";import{y as b,r as c,z as j,A as z,q as I}from"./react-vendor-D13sfOkO.js";import{t as R,F as E,a as h,g as P,u as B}from"./Form-BWNXFjqw.js";import"./OptionItem-DqHvsIp2.js";import{u as O,C as v,S as $}from"./Select-DRe782JX.js";import{h as L,c as q}from"./bill-DtdNSVcZ.js";import"./__commonjsHelpers__-Cpj98o6Y.js";var y;const N=F(v)(y||(y=f(["\n  border-radius: 0;\n"])));function W(e){const{title:t,hasBack:a,hasFixed:s=!1,children:r,onBack:n,...i}=e,u=S(r),m=b(),x=c.useCallback(()=>{var p;((p=n==null?void 0:n())!=null?p:!0)&&m(-1)},[n,m]);return O(l(N,{slot:"header","un-flex":"~ items-center justify-center","un-p":"y-[1rem]","un-bg":"white","un-w":"full","un-z":"100",children:[o("div",{"un-absolute":"~","un-left":"[1rem]",children:u.icon||a&&o(T,{name:"chevron-left",onClick:x,"un-size":"$big-icon-size"})}),o("div",{"un-font":"bold",...i,children:u.title||u.default||t}),o("div",{"un-absolute":"~","un-right":"[2rem]",children:u.right})]}),C,s)}const V=()=>L.get("/consumeTypeList");function G(){const e=j(),t=c.useRef(!0),a=b();if(e){if(t.current)return t.current=!1,Promise.resolve(()=>a("",{replace:!0})),e;t.current=!0}return null}const H=()=>L.get("/accountTypeList");function tt(){const e=c.useRef(null),t=z(),a=I(h),s=G(),r=c.useCallback(()=>{const n=k(e.current,["type","consumeType","date","payType","amount","title"]);if(Object.values(n).some(i=>!i))return console.log("请填写完整",n);t(e.current)},[t]);return console.log("render",s),l(c.Fragment,{children:[l(W,{hasBack:!0,hasFixed:!0,children:[o($,{slot:"title",placement:"bottomcenter",defaultValue:w(h),options:R,onChange:({value:n})=>a(n),children:o(T,{slot:"icon",name:"arrow-bottom","un-size":"[1rem]","un-color":"$detail-text-color","un-m":"l-[0.5em]"})}),o(v,{slot:"right","un-text":"[1.3rem]","un-p":"x-[1em] y-[0.25em]",onClick:r,children:"提交"})]}),o(E,{ref:e})]})}async function et({request:e}){const t=A(await e.formData());return{test:await q({consumeTypeId:t.consumeTypeId,date:t.date,amount:Number(t.amount),title:t.title,type:t.type,accountTypeId:t.accountTypeId})}}async function nt(){var s,r;const e=P(),t=[],a={};return(s=e.consumeTypeList)!=null&&s.length||t.push(V().then(n=>a.consumeTypeList=n.data.consumeTypes)),(r=e.accountTypeList)!=null&&r.length||t.push(H().then(n=>a.accountTypeList=n.data.accountTypes)),g({showLoading:!0}),Promise.all(t).then(()=>{Object.keys(a).length&&B(a)}).finally(()=>{g({showLoading:!1})}),{}}export{et as action,tt as default,nt as loader};