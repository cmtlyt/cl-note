var d=Object.freeze,D=Object.defineProperty;var f=(e,t)=>d(D(e,"raw",{value:d(t||e.slice())}));import{p as F,u as S,j as l,a as o,S as y,D as C,g as k,$ as L,b as w}from"./index-DxKW2MJ9.js";import{y as T,r as c,z as A,A as j,q as z}from"./react-vendor-Dkf379uY.js";import{t as I,F as R,a as g,g as E,u as P}from"./Form-CCpgfUQO.js";import"./OptionItem-DB0s6CzR.js";import{u as B,C as b,S as O}from"./Select-C4F2Wwyv.js";import{h as v,c as $}from"./bill-yRlUeBtF.js";import"./__commonjsHelpers__-Cpj98o6Y.js";var h;const q=F(b)(h||(h=f(["\n  border-radius: 0;\n"])));function N(e){const{title:t,hasBack:a,hasFixed:s=!1,children:r,onBack:n,...i}=e,u=S(r),m=T(),x=c.useCallback(()=>{var p;((p=n==null?void 0:n())!=null?p:!0)&&m(-1)},[n,m]);return B(l(q,{slot:"header","un-flex":"~ items-center justify-center","un-p":"y-[1rem]","un-bg":"white","un-w":"full","un-z":"100",children:[o("div",{"un-absolute":"~","un-left":"[1rem]",children:u.icon||a&&o(y,{name:"chevron-left",onClick:x,"un-size":"$big-icon-size"})}),o("div",{"un-font":"bold",...i,children:u.title||u.default||t}),o("div",{"un-absolute":"~","un-right":"[2rem]",children:u.right})]}),C,s)}const W=()=>v.get("/consumeTypeList");function V(){const e=A(),t=c.useRef(!0),a=T();if(e){if(t.current)return t.current=!1,Promise.resolve(()=>a("",{replace:!0})),e;t.current=!0}return null}const G=()=>v.get("/accountTypeList");function _(){const e=c.useRef(null),t=j(),a=z(g),s=V(),r=c.useCallback(()=>{const n=k(e.current,["type","consumeType","date","payType","amount","title"]);if(Object.values(n).some(i=>!i))return console.log("请填写完整",n);t(e.current)},[t]);return console.log("render",s),l(c.Fragment,{children:[l(N,{hasBack:!0,hasFixed:!0,children:[o(O,{slot:"title",placement:"bottomcenter",defaultValue:L(g),options:I,onChange:({value:n})=>a(n),children:o(y,{slot:"icon",name:"arrow-bottom","un-size":"[1rem]","un-color":"$detail-text-color","un-m":"l-[0.5em]"})}),o(b,{slot:"right","un-text":"[1.3rem]","un-p":"x-[1em] y-[0.25em]",onClick:r,children:"提交"})]}),o(R,{ref:e})]})}async function tt({request:e}){const t=w(await e.formData());return{test:await $({consumeTypeId:t.consumeTypeId,date:t.date,amount:Number(t.amount),title:t.title,type:t.type,accountTypeId:t.accountTypeId})}}async function et(){var s,r;const e=E(),t=[],a={};return(s=e.consumeTypeList)!=null&&s.length||t.push(W().then(n=>a.consumeTypeList=n.data.consumeTypes)),(r=e.accountTypeList)!=null&&r.length||t.push(G().then(n=>a.accountTypeList=n.data.accountTypes)),await Promise.all(t),Object.keys(a).length&&P(a),{}}export{tt as action,_ as default,et as loader};
