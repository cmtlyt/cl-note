!function(){function e(n){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(n)}var n,t,r=["note","onClick"],u=["notes","onClick"],i=["amount","showSign","decimal"],o=["children"],l=["amountInfo","onClick"],c=["amounts","onClick"];function a(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,u,i,o,l=[],c=!0,a=!1;try{if(i=(t=t.call(e)).next,0===n){if(Object(t)!==t)return;c=!1}else for(;!(c=(r=i.call(t)).done)&&(l.push(r.value),l.length!==n);c=!0);}catch(e){a=!0,u=e}finally{try{if(!c&&null!=t.return&&(o=t.return(),Object(o)!==o))return}finally{if(a)throw u}}return l}}(e,n)||function(e,n){if(e){if("string"==typeof e)return m(e,n);var t={}.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?m(e,n):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=Array(n);t<n;t++)r[t]=e[t];return r}function f(e,n){if(null==e)return{};var t,r,u=function(e,n){if(null==e)return{};var t={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(n.indexOf(r)>=0)continue;t[r]=e[r]}return t}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||{}.propertyIsEnumerable.call(e,t)&&(u[t]=e[t])}return u}function d(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?d(Object(t),!0).forEach((function(n){h(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):d(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function h(n,t,r){return(t=function(n){var t=function(n,t){if("object"!=e(n)||!n)return n;var r=n[Symbol.toPrimitive];if(void 0!==r){var u=r.call(n,t||"default");if("object"!=e(u))return u;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(n)}(n,"string");return"symbol"==e(t)?t:t+""}(t))in n?Object.defineProperty(n,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):n[t]=r,n}function b(e,n){return n||(n=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}System.register(["./index-legacy-xJOz-sYU.js","./Select-legacy-CIJw91Sx.js","./react-vendor-legacy-a3hW1kvS.js","./__commonjsHelpers__-legacy-CTU2Tar8.js"],(function(e,m){"use strict";var d,h,v,p,y,x,g,w,j,O,S,k,C,P,A,$,I,z;return{setters:[function(e){d=e.a9,h=e.ac,v=e.ab,p=e.ad,y=e.ai,x=e.aj,g=e.ak,w=e.al,j=e.a2},function(e){O=e.C,S=e.S},function(e){k=e.n,C=e.S,P=e.E,A=e.G,$=e.H,I=e.q,z=e.I},null],execute:function(){e("default",(function(){return v("div",{"un-h":"full","un-flex":"~ col",children:[h(J,{}),v("div",{"un-overflow":"y-auto",children:[h(V,{amounts:[{id:"1",amount:123,date:"2023-12-25",icon:"user",title:"123123123123123123123123123123123123123123123123"},{id:"2",amount:123123,date:"2023-12-25",icon:"react",title:"123123"},{id:"3",amount:-123,date:"2023-12-25",icon:"react",title:"123123"},{id:"4",amount:-123123,date:"2023-12-25",icon:"react",title:"123123"},{id:"5",amount:123123.123,date:"2023-12-25",icon:"react",title:"123123"},{id:"6",amount:-123123.123,date:"2024-6-20",icon:"react",title:"123123"}],onClick:function(e){return console.log(e)}}),h(_,{notes:[{id:"1",title:"123123123123123123123123123123123123123123123123",content:"123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123",date:"123",icon:"react"},{id:"2",title:"123123123123123123123123123123123123123123123123",content:"123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123",date:"123",icon:"user"},{id:"3",title:"123123123123123123123123123123123123123123123123",date:"2023-12-25",icon:"user"},{id:"4",title:"123123123123123123123123123123123123123123123123",date:"2023-12-25"},{id:"5",title:"12312312",content:"123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123",date:"123",icon:"react"}],onClick:function(e){console.log("click",e)}})]})]})}));var m=d.div(n||(n=b(["\n  box-shadow: 0 0 0 0.1rem #e5e5e5;\n"])));function D(e){return h(m,s({"un-p":"x-[0.75em]","un-text":"[0.8em]","un-rounded":"full"},e))}var E=O;function M(e){var n=e.note,t=e.onClick,u=f(e,r);return v(E,s(s({"un-flex":"~ col","un-p":"[1rem]",onClick:function(){return null==t?void 0:t(n.id)}},u),{},{children:[v("div",{"un-flex":"~ items-center","un-w":"full",children:[n.icon&&h(p,{name:n.icon,"un-size":"$big-icon-size","un-flex-shrink":"0","un-m":"r-[0.5em]"}),h("div",{"un-flex":"1","un-line-clamp":"1","un-m":"r-[0.5em]","un-text":"[2rem]","un-line-height":"none",children:n.title}),h(D,{"un-color":"$detail-text-color","un-flex-shrink":"0",children:n.date})]}),n.content&&h("div",{"un-line-clamp":"2","un-text":"[1.4rem]","un-color":"$detail-text-color","un-line-height":"none","un-m":"t-[0.5em]",children:n.content})]}))}function _(e){var n=e.notes,t=e.onClick,r=f(e,u);return h("div",s(s({"un-w":"full","un-flex":"~ col","un-p":"x-[1rem]"},r),{},{children:n.map((function(e){return h(M,{note:e,"un-m":"b-[1rem]",onClick:t},e.id)}))}))}function N(e){var n=e.amount,t=e.showSign,r=void 0===t||t,u=e.decimal,o=void 0===u?2:u,l=f(e,i),c=n<0?"-":"+";return v("div",s(s({"un-flex":"~ items-center","un-flex-shrink":"0"},l),{},{children:[r&&h("span",{"un-m":"r-[0.25rem]",children:c}),h("span",{children:y(Math.abs(n),o)})]}))}var F=new x({outputAmount:0,inputAmount:0,year:(new Date).getFullYear(),month:0}),H=k((function(){return F})),L=g(H,"outputAmount"),T=g(H,"inputAmount"),q=g(H,"year"),G=g(H,"month"),U=d.div(t||(t=b(["\n  box-shadow: 0.2rem 0.2rem 1rem -0.8rem var(--shadow-color);\n"])));function Y(e){var n=e.children,t=f(e,o);return h($,{children:h("span",s(s({"un-text":"[1.4rem]"},t),{},{children:n}))})}function B(){var e=I(q),n=I(G);return v(P,{"un-flex":"~ col justify-between items-start",children:[h(Y,{children:h(S,{onChange:function(n){return e(Number(n))},placeholder:{label:"2024年",value:"2024"},options:[{label:"2023年",value:"2023"},{label:"2022年",value:"2022"}]})}),h(A,{"un-line-height":"[3.6rem]","un-h":"[3.6rem]","un-w":"full",children:h(S,{"un-flex":"~ items-center justify-between","un-text":"[2.4rem]","un-w":"[7rem]","un-whitespace":"nowrap",placeholder:{label:"全年",value:"0"},options:[{label:"1月",value:"1"},{label:"2月",value:"2"},{label:"3月",value:"3"},{label:"4月",value:"4"},{label:"5月",value:"5"},{label:"6月",value:"6"},{label:"7月",value:"7"},{label:"8月",value:"8"},{label:"9月",value:"9"},{label:"10月",value:"10"},{label:"11月",value:"11"},{label:"12月",value:"12"}],onChange:function(e){return n(Number(e))},children:h(p,{slot:"icon",name:"arrow-bottom","un-size":"[1.2rem]","un-color":"$detail-text-color"})})})]})}function J(){return v(U,{"un-flex":"~ items-end","un-bg":"white","un-p":"x-[2rem] y-[2rem]","un-m":"b-[1rem]",children:[h(B,{}),h("div",{"un-h":"[3rem]","un-w":"[0.1rem]","un-bg":"$detail-color","un-rounded":"full","un-m":"x-[2rem]"}),v(C,{"un-flex":"[3]",children:[v(P,{children:[h(Y,{children:"本月支出"}),h(A,{"un-h":"[3.6rem]","un-flex":"~ items-center","un-color":"$danger-color","un-line-height":"[3.6rem]",children:h(N,{amount:w(L),showSign:!1,"un-font":"bold","un-text":"[2.8rem]"})})]}),v(P,{children:[h(Y,{children:"本月收入"}),h(A,{"un-h":"[3.6rem]","un-flex":"~ items-center","un-color":"$success-color","un-line-height":"[3.6rem]",children:h(N,{amount:w(T),showSign:!1,"un-font":"bold","un-text":"[2.8rem]"})})]})]})]})}var K=O;function Q(e){var n=e.amountInfo,t=n.id,r=n.title,u=n.amount,i=n.icon,o=e.onClick,c=f(e,l);return v(K,s(s({onClick:function(){return null==o?void 0:o(t)},"un-flex":"~ items-center","un-w":"full","un-p":"[1rem]"},c),{},{children:[h(p,{name:i,"un-size":"$big-icon-size","un-flex-shrink":"0","un-m":"r-[0.5rem]"}),h("span",{"un-flex":"1","un-line-clamp":"1",children:r}),h(N,{amount:u,"un-m":"l-[0.5rem]"})]}))}function R(e){var n=e.date,t=e.amountList,r=t.reduce((function(e,n){return n.amount>0?e+n.amount:e}),0),u=t.reduce((function(e,n){return n.amount<0?e-n.amount:e}),0);return v("div",{"un-flex":"~ items-center justify-between","un-m":"b-[1rem] t-[1rem]","un-text":"[1.4rem]",children:[h("span",{children:n}),v("div",{"un-flex":"~ items-center","un-color":"$detail-text-color",children:[!!r&&v("div",{"un-m":"x-[0.5rem]","un-flex":"~ items-center",children:[h("span",{"un-m":"r-[0.5rem]",children:"收入:"}),h(N,{amount:r,showSign:!1})]}),!!u&&v("div",{"un-m":"x-[0.5rem]","un-flex":"~ items-center",children:[h("span",{"un-m":"r-[0.5rem]",children:"支出:"}),h(N,{amount:u,showSign:!1})]})]})]})}function V(e){var n=e.amounts,t=e.onClick,r=f(e,c),u=n.reduce((function(e,n){var t=j(n.date).format("MM月DD日 dddd").toString();return e[t]||(e[t]=[]),e[t].push(n),e}),{});return h("div",s(s({"un-flex":"~ col","un-w":"full","un-p":"x-[1rem]"},r),{},{children:Object.entries(u).map((function(e){var n=a(e,2),r=n[0],u=n[1];return v(z.Fragment,{children:[h(R,{date:r,amountList:u}),u.map((function(e){return h(Q,{amountInfo:e,onClick:t,"un-m":"b-[1rem]"},e.id)}))]},r)}))}))}}}}))}();
