import{B as p,d as x,e as b,f as g,a as t,j as l,S as L,c as f}from"./index-CAs056U8.js";import{n as v,r as d,D as S,E as j}from"./react-vendor-D13sfOkO.js";import{A as c,g as w,a as B}from"./bill-DtdNSVcZ.js";import{C as y}from"./Select-DRe782JX.js";import"./__commonjsHelpers__-Cpj98o6Y.js";const h=new p({billList:[]}),A=b(h),I=v(()=>h),z=x(I,"billList"),M=y;function D(r){const{amountInfo:{id:u,title:e,amount:a,icon:m},onClick:n,...o}=r;return l(M,{onClick:()=>n==null?void 0:n(u),"un-flex":"~ items-center","un-w":"full","un-p":"[1rem]",...o,children:[t(L,{name:m,"un-size":"$big-icon-size","un-flex-shrink":"0","un-m":"r-[0.5rem]"}),t("span",{"un-flex":"1","un-line-clamp":"1",children:e}),t(c,{amount:a,"un-m":"l-[0.5rem]"})]})}function C(r){const{date:u,billList:e}=r,{shouru:a,zhichu:m}=d.useMemo(()=>{const n=e.reduce((i,s)=>s.amount>0?i+s.amount:i,0),o=e.reduce((i,s)=>s.amount<0?i-s.amount:i,0);return{shouru:n,zhichu:o}},[e]);return l("div",{"un-flex":"~ items-center justify-between","un-m":"b-[1rem] t-[1rem]","un-text":"[1.4rem]",children:[t("span",{children:u}),l("div",{"un-flex":"~ items-center","un-color":"$detail-text-color",children:[!!a&&l("div",{"un-m":"x-[0.5rem]","un-flex":"~ items-center",children:[t("span",{"un-m":"r-[0.5rem]",children:"收入:"}),t(c,{amount:a,showSign:!1})]}),!!m&&l("div",{"un-m":"x-[0.5rem]","un-flex":"~ items-center",children:[t("span",{"un-m":"r-[0.5rem]",children:"支出:"}),t(c,{amount:m,showSign:!1})]})]})]})}function k(r){const{bills:u,onClick:e,...a}=r,m=d.useMemo(()=>u.reduce((n,o)=>{const s=g(o.date).format("MM月DD日 dddd").toString();return n[s]||(n[s]=[]),n[s].push(o),n},{}),[u]);return t("div",{"un-flex":"~ col","un-w":"full","un-p":"x-[1rem]",...a,children:Object.entries(m).map(([n,o])=>l(S.Fragment,{children:[t(C,{date:n,billList:o}),o.map(i=>t(D,{amountInfo:i,onClick:e,"un-m":"b-[1rem]"},i.id))]},n))})}function E(){const r=j(z),u=d.useMemo(()=>r.map(e=>({id:e.id,title:e.title,amount:e.amount,icon:e.consumeTypeInfo.icon,date:e.date})),[r]);return t(k,{bills:u,onClick:e=>console.log(e)})}function W(){return l("div",{"un-h":"full","un-flex":"~ col",children:[t(B,{}),t("div",{"un-overflow":"y-auto",children:t(E,{})})]})}async function R(){return f({showLoading:!0}),w({current:1,pageSize:10}).then(r=>{A({billList:r.data.bills})}).finally(()=>{f({showLoading:!1})}),{}}export{W as default,R as loader};
