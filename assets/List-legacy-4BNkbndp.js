!function(){function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},n(e)}var e,t,r,u,o=["note","onClick"],i=["notes","onClick"],l=["amount","showSign","decimal"],c=["label","value","onClick"],a=["placeholder","options","children","onChange"],m=["children"],d=["amountInfo","onClick"],f=["amounts","onClick"];function s(n,e){return function(n){if(Array.isArray(n))return n}(n)||function(n,e){var t=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=t){var r,u,o,i,l=[],c=!0,a=!1;try{if(o=(t=t.call(n)).next,0===e){if(Object(t)!==t)return;c=!1}else for(;!(c=(r=o.call(t)).done)&&(l.push(r.value),l.length!==e);c=!0);}catch(n){a=!0,u=n}finally{try{if(!c&&null!=t.return&&(i=t.return(),Object(i)!==i))return}finally{if(a)throw u}}return l}}(n,e)||b(n,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(n){return function(n){if(Array.isArray(n))return v(n)}(n)||function(n){if("undefined"!=typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}(n)||b(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(n,e){if(n){if("string"==typeof n)return v(n,e);var t={}.toString.call(n).slice(8,-1);return"Object"===t&&n.constructor&&(t=n.constructor.name),"Map"===t||"Set"===t?Array.from(n):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?v(n,e):void 0}}function v(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=Array(e);t<e;t++)r[t]=n[t];return r}function p(n,e){if(null==n)return{};var t,r,u=function(n,e){if(null==n)return{};var t={};for(var r in n)if({}.hasOwnProperty.call(n,r)){if(e.indexOf(r)>=0)continue;t[r]=n[r]}return t}(n,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(n);for(r=0;r<o.length;r++)t=o[r],e.indexOf(t)>=0||{}.propertyIsEnumerable.call(n,t)&&(u[t]=n[t])}return u}function y(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function g(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?y(Object(t),!0).forEach((function(e){w(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):y(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function w(e,t,r){return(t=function(e){var t=function(e,t){if("object"!=n(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var u=r.call(e,t||"default");if("object"!=n(u))return u;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==n(t)?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function x(n,e){return e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}System.register(["./index-legacy-BT_eLvZ1.js","./Card-legacy-DPyZ10Tz.js","./react-vendor-legacy-C74loaNd.js","./antd-vendor-legacy-DXZYIZXX.js","./__commonjsHelpers__-legacy-CTU2Tar8.js"],(function(n,b){"use strict";var v,y,w,j,O,S,k,C,P,A,$,I,z,D,E,M,N,_,T;return{setters:[function(n){v=n.p,y=n.j,w=n.a,j=n.S,O=n.f,S=n.c,k=n.B,C=n.b,P=n.$},function(n){A=n.C},function(n){$=n.r,I=n.j,z=n.S,D=n.n,E=n.o,M=n.p,N=n.l,_=n.q},function(n){T=n.b},null],execute:function(){n("default",(function(){return w("div",{"un-h":"full","un-flex":"~ col",children:[y(en,{}),w("div",{"un-overflow":"y-auto",children:[y(on,{amounts:[{id:"1",amount:123,date:"2023-12-25",icon:"user",title:"123123123123123123123123123123123123123123123123"},{id:"2",amount:123123,date:"2023-12-25",icon:"react",title:"123123"},{id:"3",amount:-123,date:"2023-12-25",icon:"react",title:"123123"},{id:"4",amount:-123123,date:"2023-12-25",icon:"react",title:"123123"},{id:"5",amount:123123.123,date:"2023-12-25",icon:"react",title:"123123"},{id:"6",amount:-123123.123,date:"2024-6-20",icon:"react",title:"123123"}],onClick:function(n){return console.log(n)}}),y(B,{notes:[{id:"1",title:"123123123123123123123123123123123123123123123123",content:"123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123",date:"123",icon:"react"},{id:"2",title:"123123123123123123123123123123123123123123123123",content:"123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123",date:"123",icon:"user"},{id:"3",title:"123123123123123123123123123123123123123123123123",date:"2023-12-25",icon:"user"},{id:"4",title:"123123123123123123123123123123123123123123123123",date:"2023-12-25"},{id:"5",title:"12312312",content:"123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123",date:"123",icon:"react"}],onClick:function(n){console.log("click",n)}})]})]})}));var b=v.div(e||(e=x(["\n  box-shadow: 0 0 0 0.1rem #e5e5e5;\n"])));function F(n){return y(b,g({"un-p":"x-[0.75em]","un-text":"[0.8em]","un-rounded":"full"},n))}var L=A;function q(n){var e=n.note,t=n.onClick,r=p(n,o);return w(L,g(g({"un-flex":"~ col","un-p":"[1rem]",onClick:function(){return null==t?void 0:t(e.id)}},r),{},{children:[w("div",{"un-flex":"~ items-center","un-w":"full",children:[e.icon&&y(j,{name:e.icon,"un-size":"$big-icon-size","un-flex-shrink":"0","un-m":"r-[0.5em]"}),y("div",{"un-flex":"1","un-line-clamp":"1","un-m":"r-[0.5em]","un-text":"[2rem]","un-line-height":"none",children:e.title}),y(F,{"un-color":"$detail-text-color","un-flex-shrink":"0",children:e.date})]}),e.content&&y("div",{"un-line-clamp":"2","un-text":"[1.4rem]","un-color":"$detail-text-color","un-line-height":"none","un-m":"t-[0.5em]",children:e.content})]}))}function B(n){var e=n.notes,t=n.onClick,r=p(n,i);return y("div",g(g({"un-w":"full","un-flex":"~ col","un-p":"x-[1rem]"},r),{},{children:e.map((function(n){return y(q,{note:n,"un-m":"b-[1rem]",onClick:t},n.id)}))}))}function H(n){var e=n.amount,t=n.showSign,r=void 0===t||t,u=n.decimal,o=void 0===u?2:u,i=p(n,l),c=e<0?"-":"+";return w("div",g(g({"un-flex":"~ items-center","un-flex-shrink":"0"},i),{},{children:[r&&y("span",{"un-m":"r-[0.25rem]",children:c}),y("span",{children:O(Math.abs(e),o)})]}))}function U(n){var e=n.label,t=n.value,r=n.onClick,u=p(n,c);return y("div",g(g({onClick:function(){return null==r?void 0:r(t)},"un-line-height":"none","un-w":"full"},u),{},{children:e}))}var Y=v(A)(t||(t=x(["\n  background-color: #fff8;\n  ","\n"])),(function(n){return S(r||(r=x(["\n    --count: ",";\n  "])),n.$count)}));function G(n){var e=n.placeholder,t=n.options,r=n.children,u=n.onChange,o=p(n,a),i=$.useMemo((function(){return[].concat(h(e?[e]:[]),h(t||[]))}),[t,e]),l=s($.useState({value:(null==i?void 0:i[0].value)||"",label:(null==i?void 0:i[0].label)||""}),2),c=l[0],m=l[1],d=$.useCallback((function(n){m(n),null==u||u(n.value)}),[u]);return w("div",{"un-relative":"~",className:"group",children:[w("label",{children:[w("div",g(g({},o),{},{children:[y("span",{children:c.label}),r]})),y("input",{type:"input","un-hidden-with-position":"~",readOnly:!0})]}),y(Y,{$count:i.length,"un-absolute":"~","un-top":"full","un-grid":"~  rows-[repeat(var(--count),0fr)]","un-overflow":"hidden","un-transition":"duration-200 property-[grid-template-rows]","un-color":"transparent","un-group-focus-within":"color-inherit rows-[repeat(var(--count),1fr)] [&>*]:p-y-[0.5em]","un-w":"max","un-backdrop-blur":"[0.5rem]","un-z":"1",children:i.map((function(n){return y(U,g(g({},n),{},{"un-min-h":"0","un-p":"x-[1em]","un-transition":"all duration-200",onClick:function(){return d(n)}}),n.value)}))})]})}var J=new k({outputAmount:0,inputAmount:0,year:(new Date).getFullYear(),month:0}),K=I((function(){return J})),Q=C(K,"outputAmount"),R=C(K,"inputAmount"),V=C(K,"year"),W=C(K,"month"),X=v.div(u||(u=x(["\n  box-shadow: 0.2rem 0.2rem 1rem -0.8rem var(--shadow-color);\n"])));function Z(n){var e=n.children,t=p(n,m);return y(M,{children:y("span",g(g({"un-text":"[1.4rem]"},t),{},{children:e}))})}function nn(){var n=N(V),e=N(W);return w(D,{"un-flex":"~ col justify-between items-start",children:[y(Z,{children:y(G,{onChange:function(e){return n(Number(e))},placeholder:{label:"2024年",value:"2024"},options:[{label:"2023年",value:"2023"},{label:"2022年",value:"2022"}]})}),y(E,{"un-line-height":"[3.6rem]","un-h":"[3.6rem]","un-w":"full",children:y(G,{"un-flex":"~ items-center justify-between","un-text":"[2.4rem]","un-w":"[7rem]","un-whitespace":"nowrap",placeholder:{label:"全年",value:"0"},options:[{label:"1月",value:"1"},{label:"2月",value:"2"},{label:"3月",value:"3"},{label:"4月",value:"4"},{label:"5月",value:"5"},{label:"6月",value:"6"},{label:"7月",value:"7"},{label:"8月",value:"8"},{label:"9月",value:"9"},{label:"10月",value:"10"},{label:"11月",value:"11"},{label:"12月",value:"12"}],onChange:function(n){return e(Number(n))},children:y(j,{name:"arrow-bottom","un-size":"[1.2rem]","un-color":"$detail-text-color"})})})]})}function en(){return w(X,{"un-flex":"~ items-end","un-bg":"white","un-p":"x-[2rem] y-[2rem]","un-m":"b-[1rem]",children:[y(nn,{}),y("div",{"un-h":"[3rem]","un-w":"[0.1rem]","un-bg":"$detail-color","un-rounded":"full","un-m":"x-[2rem]"}),w(z,{"un-flex":"[3]",children:[w(D,{children:[y(Z,{children:"本月支出"}),y(E,{"un-h":"[3.6rem]","un-flex":"~ items-center","un-color":"$danger-color","un-line-height":"[3.6rem]",children:y(H,{amount:P(Q),showSign:!1,"un-font":"bold","un-text":"[2.8rem]"})})]}),w(D,{children:[y(Z,{children:"本月收入"}),y(E,{"un-h":"[3.6rem]","un-flex":"~ items-center","un-color":"$success-color","un-line-height":"[3.6rem]",children:y(H,{amount:P(R),showSign:!1,"un-font":"bold","un-text":"[2.8rem]"})})]})]})]})}var tn=A;function rn(n){var e=n.amountInfo,t=e.id,r=e.title,u=e.amount,o=e.icon,i=n.onClick,l=p(n,d);return w(tn,g(g({onClick:function(){return null==i?void 0:i(t)},"un-flex":"~ items-center","un-w":"full","un-p":"[1rem]"},l),{},{children:[y(j,{name:o,"un-size":"$big-icon-size","un-flex-shrink":"0","un-m":"r-[0.5rem]"}),y("span",{"un-flex":"1","un-line-clamp":"1",children:r}),y(H,{amount:u,"un-m":"l-[0.5rem]"})]}))}function un(n){var e=n.date,t=n.amountList,r=t.reduce((function(n,e){return e.amount>0?n+e.amount:n}),0),u=t.reduce((function(n,e){return e.amount<0?n-e.amount:n}),0);return w("div",{"un-flex":"~ items-center justify-between","un-m":"b-[1rem] t-[1rem]","un-text":"[1.4rem]",children:[y("span",{children:e}),w("div",{"un-flex":"~ items-center","un-color":"$detail-text-color",children:[!!r&&w("div",{"un-m":"x-[0.5rem]","un-flex":"~ items-center",children:[y("span",{"un-m":"r-[0.5rem]",children:"收入:"}),y(H,{amount:r,showSign:!1})]}),!!u&&w("div",{"un-m":"x-[0.5rem]","un-flex":"~ items-center",children:[y("span",{"un-m":"r-[0.5rem]",children:"支出:"}),y(H,{amount:u,showSign:!1})]})]})]})}function on(n){var e=n.amounts,t=n.onClick,r=p(n,f),u=e.reduce((function(n,e){var t=T(e.date).format("MM月DD日 dddd").toString();return n[t]||(n[t]=[]),n[t].push(e),n}),{});return y("div",g(g({"un-flex":"~ col","un-w":"full","un-p":"x-[1rem]"},r),{},{children:Object.entries(u).map((function(n){var e=s(n,2),r=e[0],u=e[1];return w(_.Fragment,{children:[y(un,{date:r,amountList:u}),u.map((function(n){return y(rn,{amountInfo:n,onClick:t,"un-m":"b-[1rem]"},n.id)}))]},r)}))}))}}}}))}();
