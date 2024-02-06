(()=>{"use strict";var e,t,r,n,a,o={3738:(e,t,r)=>{var n=r(1527),a=r(3492),o=r(959),s=r(4478);const i=(e="default")=>{let t="";switch(e){case"default":t="#35495E";break;case"primary":t="#3488ff";break;case"success":t="#43B883";break;case"warning":t="#e6a23c";break;case"danger":t="#f56c6c"}return t},c={capsule(e="",t="",r="primary"){console.log(`%c ${e} %c ${t} %c`,"background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;",`background:${i(r)}; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;`,"background:transparent")},colorful(e){console.log(`%c${e.map((e=>e.text||"")).join("%c")}`,...e.map((e=>`color: ${i(e.type)};`)))},default(e){this.colorful([{text:e,type:"default"}])},primary(e){this.colorful([{text:e,type:"primary"}])},success(e){this.colorful([{text:e,type:"success"}])},warning(e){this.colorful([{text:e,type:"warning"}])},danger(e){this.colorful([{text:e,type:"danger"}])}};var l=r(4430),d=r(4466),h=r(5897),f=r(2153);const p=({children:e,fallback:t=(0,n.jsx)(f.Z,{className:"all-full-center"})})=>(0,n.jsx)(o.Suspense,{fallback:t,children:e});var u=r(2881),m=r(755),b=r(151),g=r(5592),x=r(9264),y=r(4875),j=r.n(y),v=r(2763);const C=e=>{const t={key:e.path};if(e.meta?.title&&(t.label=e.meta.title),e.meta?.icon&&(t.icon=e.meta.icon),e.children?.length){const r=e.children.map((e=>C(e))).filter((e=>e.key&&e.label));t.children=r}return t};var k=r(2210);const w=[{index:!0,path:"/",element:(0,n.jsx)(l.Fg,{to:"/index"})},{path:"/index",Component:(0,o.lazy)((()=>r.e(149).then(r.bind(r,8149)))),meta:{title:"Welcome",icon:(0,n.jsx)(k.Z,{})}},{path:"/utils",meta:{title:"Utils",icon:(0,n.jsx)(k.Z,{})},children:[{path:"/utils",element:(0,n.jsx)(l.Fg,{to:"/utils/resize"})},{path:"/utils/resize",Component:(0,o.lazy)((()=>Promise.all([r.e(699),r.e(87)]).then(r.bind(r,2087)))),meta:{title:"resize",icon:(0,n.jsx)(k.Z,{})}}]},{path:"/fabric",meta:{title:"Fabric.js渲染优化",icon:(0,n.jsx)(k.Z,{})},children:[{path:"/fabric",element:(0,n.jsx)(l.Fg,{to:"/fabric/object"})},{path:"/fabric/object",Component:(0,o.lazy)((()=>Promise.all([r.e(699),r.e(727),r.e(222),r.e(585),r.e(931)]).then(r.bind(r,8931)))),meta:{title:"fabric-object",icon:(0,n.jsx)(k.Z,{})}},{path:"/fabric/group",Component:(0,o.lazy)((()=>Promise.all([r.e(699),r.e(727),r.e(222),r.e(585),r.e(986)]).then(r.bind(r,7986)))),meta:{title:"fabric-group",icon:(0,n.jsx)(k.Z,{})}}]},{path:"/pixi",meta:{title:"Pixi.js渲染优化",icon:(0,n.jsx)(k.Z,{})},children:[{path:"/pixi",element:(0,n.jsx)(l.Fg,{to:"/pixi/index"})},{path:"/pixi/index",Component:(0,o.lazy)((()=>Promise.all([r.e(699),r.e(727),r.e(222),r.e(437),r.e(27)]).then(r.bind(r,1197)))),meta:{title:"pixi-index",icon:(0,n.jsx)(k.Z,{})}}]},{path:"/three",meta:{title:"Three.js",icon:(0,n.jsx)(k.Z,{})},children:[{path:"/three",element:(0,n.jsx)(l.Fg,{to:"/three/model"})},{path:"/three/model",Component:(0,o.lazy)((()=>Promise.all([r.e(699),r.e(727),r.e(468),r.e(857)]).then(r.bind(r,1857)))),meta:{title:"three-model",icon:(0,n.jsx)(k.Z,{})}}]},{path:"/echarts",meta:{title:"echarts",icon:(0,n.jsx)(k.Z,{})},children:[{path:"/echarts",element:(0,n.jsx)(l.Fg,{to:"/echarts/index"})},{path:"/echarts/index",Component:(0,o.lazy)((()=>Promise.all([r.e(699),r.e(651),r.e(881)]).then(r.bind(r,7593)))),meta:{title:"echarts-demo",icon:(0,n.jsx)(k.Z,{})}}]},{path:"*",Component:(0,o.lazy)((()=>Promise.all([r.e(240),r.e(204)]).then(r.bind(r,6204))))}],O=e=>{const{menu:t,selectedKeys:r,openKeys:a,onSelect:s,onOpenChange:i}=(e=>{const t=(0,l.s0)(),r=(0,l.TH)(),[n,a]=(0,o.useState)([]),[s,i]=(0,o.useState)([]),c=e.map((e=>C(e))).filter((e=>e.label));return(0,o.useEffect)((()=>{a([r.pathname])}),[r]),(0,o.useEffect)((()=>{const e=((e,t)=>{const r=t=>t.reduce(((t,n)=>{const a=n?.key,o=n.children;if(a&&e.indexOf(a)>-1&&t.push(a),o?.length){const e=r(o);return t.concat(e.length?[a]:[])}return t}),[]);return r(t)})(n,c);i(e)}),[n]),{menu:c,selectedKeys:n,openKeys:s,onSelect:e=>{t(e.key)},onOpenChange:e=>{i(e)}}})(w);return(0,n.jsx)(v.Z,{className:"flex-1 overflow-y-auto",theme:e.theme,selectedKeys:r,openKeys:a,mode:"inline",items:t,onSelect:s,onOpenChange:i})},S="T1aFFTNxtoqNtIw4FDSh",Z=e=>{const{token:{Layout:t}}=b.default.useToken(),r=(0,l.s0)(),[a,s]=(0,o.useState)(!1),i=()=>{s(!a)};return(0,n.jsx)(h.Z.Header,{style:{backgroundColor:e.isMobile?t?.colorBgHeader:"#fff"},className:j()("sO0dJ6eUMziMPNBQ7UBF",e.isMobile&&["nGhiQj9yO0UC_QIWlgPj","flex","items-center","justify-between"]),children:e.isMobile?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(g.Z,{height:34,preview:!1,src:"https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",className:j()(S),onClick:()=>{r("/")}}),(0,n.jsx)("div",{className:j()("GXfTTWVxCNwIZsDvc3_f"),onClick:i,children:a?(0,n.jsx)(u.Z,{}):(0,n.jsx)(m.Z,{})}),(0,n.jsx)(x.Z,{width:200,closeIcon:!1,open:a,onClose:i,placement:"left",className:j()("s9pCU4DCtrGl72v7UqA5"),children:(0,n.jsx)(O,{theme:"light"})})]}):"Header"})},N=()=>{const e=(0,l.s0)(),{collapsed:t,onCollapse:r}=(()=>{const[e,t]=(0,o.useState)(!1);return{collapsed:e,onCollapse:e=>{t(e)}}})();return(0,n.jsxs)(h.Z.Sider,{collapsible:!0,collapsed:t,onCollapse:r,children:[(0,n.jsx)("div",{style:{height:"64px"},className:"flex items-center justify-center",children:(0,n.jsx)(g.Z,{height:t?34:54,preview:!1,onClick:()=>{e("/")},className:j()(S),src:"https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"})}),(0,n.jsx)(O,{theme:"dark"})]})},P=({children:e})=>{const{observe:t,disconnect:r}=((e=768)=>{const t=matchMedia(`(max-width: ${e}px)`);let r;const n=e=>{r?.(e.matches)};return{observe:e=>{e?.(t.matches),r=e,t.onchange=n},disconnect:()=>{t.onchange=null}}})(),[a,s]=(0,o.useState)(!1);return(0,o.useEffect)((()=>(t((e=>{s(e)})),()=>r())),[]),(0,n.jsxs)(h.Z,{hasSider:!0,className:"h-full",children:[a?"":(0,n.jsx)(N,{}),(0,n.jsxs)(h.Z,{children:[(0,n.jsx)(Z,{isMobile:a}),(0,n.jsx)(h.Z.Content,{className:"overflow-auto",children:(0,n.jsx)(p,{children:e})})]})]})};(0,s.s)(document.getElementById("root")||document.body).render((0,n.jsx)(o.StrictMode,{children:(0,n.jsx)(a.ZP,{children:(0,n.jsx)((()=>(0,n.jsx)(d.UT,{children:(0,n.jsx)(P,{children:(0,n.jsx)((()=>(0,l.V$)(w)),{})})})),{})})})),c.capsule("react-base","v1.0.0"),c.primary("Build Time:  2024/02/06 17:37:26"),c.primary("Last Commit: 89dc5b4")}},s={};function i(e){var t=s[e];if(void 0!==t)return t.exports;var r=s[e]={id:e,loaded:!1,exports:{}};return o[e].call(r.exports,r,r.exports,i),r.loaded=!0,r.exports}i.m=o,e=[],i.O=(t,r,n,a)=>{if(!r){var o=1/0;for(d=0;d<e.length;d++){for(var[r,n,a]=e[d],s=!0,c=0;c<r.length;c++)(!1&a||o>=a)&&Object.keys(i.O).every((e=>i.O[e](r[c])))?r.splice(c--,1):(s=!1,a<o&&(o=a));if(s){e.splice(d--,1);var l=n();void 0!==l&&(t=l)}}return t}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[r,n,a]},i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},r=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,i.t=function(e,n){if(1&n&&(e=this(e)),8&n)return e;if("object"==typeof e&&e){if(4&n&&e.__esModule)return e;if(16&n&&"function"==typeof e.then)return e}var a=Object.create(null);i.r(a);var o={};t=t||[null,r({}),r([]),r(r)];for(var s=2&n&&e;"object"==typeof s&&!~t.indexOf(s);s=r(s))Object.getOwnPropertyNames(s).forEach((t=>o[t]=()=>e[t]));return o.default=()=>e,i.d(a,o),a},i.d=(e,t)=>{for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.f={},i.e=e=>Promise.all(Object.keys(i.f).reduce(((t,r)=>(i.f[r](e,t),t)),[])),i.u=e=>"js/"+e+"."+{27:"2e2c10513816a8fc13a2",87:"90e209048d2bb64f4be4",149:"22f5f8a1aee0ec39073d",204:"38f44124b8124fff7f4e",222:"01c13c857ae14dc9874c",240:"4247c085342f50b4443d",437:"edd037b8b30958d0d2c8",468:"99ca44a1ea3f4929414b",585:"5a5cd17c2d0c9feea50c",651:"3006acd48ff2f4c9759d",699:"1663e7785aeb71c16bf2",727:"0cc5a370fa1630166955",857:"170744ff1136379cd0ba",881:"b5cea83b64d6631834e7",931:"faf9a29a86861d9cc4c2",986:"239375de9182d3b4c757"}[e]+".js",i.miniCssF=e=>"css/"+e+"."+{27:"97fd82af4ffd183a6036",87:"4a696f5ddee4fa3c07f7",149:"2c59935ecbdcd8fee2eb",931:"97fd82af4ffd183a6036",986:"97fd82af4ffd183a6036"}[e]+".css",i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n={},a="react-base:",i.l=(e,t,r,o)=>{if(n[e])n[e].push(t);else{var s,c;if(void 0!==r)for(var l=document.getElementsByTagName("script"),d=0;d<l.length;d++){var h=l[d];if(h.getAttribute("src")==e||h.getAttribute("data-webpack")==a+r){s=h;break}}s||(c=!0,(s=document.createElement("script")).charset="utf-8",s.timeout=120,i.nc&&s.setAttribute("nonce",i.nc),s.setAttribute("data-webpack",a+r),s.src=e),n[e]=[t];var f=(t,r)=>{s.onerror=s.onload=null,clearTimeout(p);var a=n[e];if(delete n[e],s.parentNode&&s.parentNode.removeChild(s),a&&a.forEach((e=>e(r))),t)return t(r)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=f.bind(null,s.onerror),s.onload=f.bind(null,s.onload),c&&document.head.appendChild(s)}},i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e;i.g.importScripts&&(e=i.g.location+"");var t=i.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");if(r.length)for(var n=r.length-1;n>-1&&!e;)e=r[n--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),i.p=e+"../"})(),(()=>{if("undefined"!=typeof document){var e={179:0};i.f.miniCss=(t,r)=>{e[t]?r.push(e[t]):0!==e[t]&&{27:1,87:1,149:1,931:1,986:1}[t]&&r.push(e[t]=(e=>new Promise(((t,r)=>{var n=i.miniCssF(e),a=i.p+n;if(((e,t)=>{for(var r=document.getElementsByTagName("link"),n=0;n<r.length;n++){var a=(s=r[n]).getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(a===e||a===t))return s}var o=document.getElementsByTagName("style");for(n=0;n<o.length;n++){var s;if((a=(s=o[n]).getAttribute("data-href"))===e||a===t)return s}})(n,a))return t();((e,t,r,n,a)=>{var o=document.createElement("link");o.rel="stylesheet",o.type="text/css",o.onerror=o.onload=r=>{if(o.onerror=o.onload=null,"load"===r.type)n();else{var s=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+i+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=s,c.request=i,o.parentNode&&o.parentNode.removeChild(o),a(c)}},o.href=t,document.head.appendChild(o)})(e,a,0,t,r)})))(t).then((()=>{e[t]=0}),(r=>{throw delete e[t],r})))}}})(),(()=>{var e={179:0};i.f.j=(t,r)=>{var n=i.o(e,t)?e[t]:void 0;if(0!==n)if(n)r.push(n[2]);else{var a=new Promise(((r,a)=>n=e[t]=[r,a]));r.push(n[2]=a);var o=i.p+i.u(t),s=new Error;i.l(o,(r=>{if(i.o(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var a=r&&("load"===r.type?"missing":r.type),o=r&&r.target&&r.target.src;s.message="Loading chunk "+t+" failed.\n("+a+": "+o+")",s.name="ChunkLoadError",s.type=a,s.request=o,n[1](s)}}),"chunk-"+t,t)}},i.O.j=t=>0===e[t];var t=(t,r)=>{var n,a,[o,s,c]=r,l=0;if(o.some((t=>0!==e[t]))){for(n in s)i.o(s,n)&&(i.m[n]=s[n]);if(c)var d=c(i)}for(t&&t(r);l<o.length;l++)a=o[l],i.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return i.O(d)},r=self.webpackChunkreact_base=self.webpackChunkreact_base||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var c=i.O(void 0,[952],(()=>i(3738)));c=i.O(c)})();