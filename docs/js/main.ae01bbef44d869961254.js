(()=>{"use strict";var e,t,r,n,a,o={5676:(e,t,r)=>{var n=r(1527),a=r(3492),o=r(959),l=r(4478);const s=(e="default")=>{let t="";switch(e){case"default":t="#35495E";break;case"primary":t="#3488ff";break;case"success":t="#43B883";break;case"warning":t="#e6a23c";break;case"danger":t="#f56c6c"}return t},c={capsule(e="",t="",r="primary"){console.log(`%c ${e} %c ${t} %c`,"background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;",`background:${s(r)}; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;`,"background:transparent")},colorful(e){console.log(`%c${e.map((e=>e.text||"")).join("%c")}`,...e.map((e=>`color: ${s(e.type)};`)))},default(e){this.colorful([{text:e,type:"default"}])},primary(e){this.colorful([{text:e,type:"primary"}])},success(e){this.colorful([{text:e,type:"success"}])},warning(e){this.colorful([{text:e,type:"warning"}])},danger(e){this.colorful([{text:e,type:"danger"}])}};var i=r(4430),d=r(4466),u=r(5897),f=r(2153);const p=({children:e,fallback:t=(0,n.jsx)(f.Z,{className:"all-full-center"})})=>(0,n.jsx)(o.Suspense,{fallback:t,children:e});var h=r(151);const m=()=>{const{token:{colorBgContainer:e}}=h.default.useToken();return(0,n.jsx)(u.Z.Header,{style:{backgroundColor:e},children:"Header"})};var b=r(3253),g=r(2763);const y=e=>{const t={key:e.path};if(e.meta?.title&&(t.label=e.meta.title),e.meta?.icon&&(t.icon=e.meta.icon),e.children?.length){const r=e.children.map((e=>y(e))).filter((e=>e.key&&e.label));t.children=r}return t};var v=r(2210);const x=[{index:!0,path:"/",element:(0,n.jsx)(i.Fg,{to:"/index"})},{path:"/index",Component:(0,o.lazy)((()=>r.e(155).then(r.bind(r,155)))),meta:{title:"Welcome",icon:(0,n.jsx)(v.Z,{})}},{path:"",meta:{title:"Fabric.js渲染优化",icon:(0,n.jsx)(v.Z,{})},children:[{path:"/fabric/object",Component:(0,o.lazy)((()=>Promise.all([r.e(130),r.e(931)]).then(r.bind(r,8931)))),meta:{title:"fabric-object",icon:(0,n.jsx)(v.Z,{})}},{path:"/fabric/group",Component:(0,o.lazy)((()=>Promise.all([r.e(130),r.e(986)]).then(r.bind(r,7986)))),meta:{title:"fabric-group",icon:(0,n.jsx)(v.Z,{})}}]},{path:"*",Component:(0,o.lazy)((()=>Promise.all([r.e(486),r.e(204)]).then(r.bind(r,6204))))}],j=()=>{const{collapsed:e,onCollapse:t}=(()=>{const[e,t]=(0,o.useState)(!1);return{collapsed:e,onCollapse:e=>{t(e)}}})(),{menu:r,selectedKeys:a,openKeys:l,onSelect:s,onOpenChange:c}=(e=>{const t=(0,i.s0)(),r=(0,i.TH)(),[n,a]=(0,o.useState)([]),[l,s]=(0,o.useState)([]),c=e.map((e=>y(e))).filter((e=>e.label));return(0,o.useEffect)((()=>{a([r.pathname])}),[r]),(0,o.useEffect)((()=>{const e=((e,t)=>{const r=t=>t.reduce(((t,n)=>{const a=n?.key,o=n.children;if(a&&e.indexOf(a)>-1&&t.push(a),o?.length){const e=r(o);return t.concat(e.length?[a]:[])}return t}),[]);return r(t)})(n,c);s(e)}),[n]),{menu:c,selectedKeys:n,openKeys:l,onSelect:e=>{t(e.key)},onOpenChange:e=>{s(e)}}})(x);return(0,n.jsxs)(u.Z.Sider,{collapsible:!0,collapsed:e,onCollapse:t,children:[(0,n.jsx)("div",{style:{height:"64px"},className:"flex items-center justify-center",children:(0,n.jsx)(b.Z,{height:e?34:54,preview:!1,src:"https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"})}),(0,n.jsx)(g.Z,{className:"flex-1 overflow-y-auto",theme:"dark",selectedKeys:a,openKeys:l,mode:"inline",items:r,onSelect:s,onOpenChange:c})]})},k=({children:e})=>(0,n.jsxs)(u.Z,{hasSider:!0,className:"h-full",children:[(0,n.jsx)(j,{}),(0,n.jsxs)(u.Z,{children:[(0,n.jsx)(m,{}),(0,n.jsx)(u.Z.Content,{className:"overflow-auto",children:(0,n.jsx)(p,{children:e})})]})]});(0,l.s)(document.getElementById("root")||document.body).render((0,n.jsx)(o.StrictMode,{children:(0,n.jsx)(a.ZP,{children:(0,n.jsx)((()=>(0,n.jsx)(d.UT,{children:(0,n.jsx)(k,{children:(0,n.jsx)((()=>(0,i.V$)(x)),{})})})),{})})})),(()=>{const e=(new Date).toLocaleString("zh-CN",{hour12:!1});c.capsule("react-base","v1.0.0"),c.primary(`Build Time:  ${e}`),c.primary("Last Commit: dfc0c8b")})()}},l={};function s(e){var t=l[e];if(void 0!==t)return t.exports;var r=l[e]={id:e,loaded:!1,exports:{}};return o[e].call(r.exports,r,r.exports,s),r.loaded=!0,r.exports}s.m=o,e=[],s.O=(t,r,n,a)=>{if(!r){var o=1/0;for(d=0;d<e.length;d++){for(var[r,n,a]=e[d],l=!0,c=0;c<r.length;c++)(!1&a||o>=a)&&Object.keys(s.O).every((e=>s.O[e](r[c])))?r.splice(c--,1):(l=!1,a<o&&(o=a));if(l){e.splice(d--,1);var i=n();void 0!==i&&(t=i)}}return t}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[r,n,a]},s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},r=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,s.t=function(e,n){if(1&n&&(e=this(e)),8&n)return e;if("object"==typeof e&&e){if(4&n&&e.__esModule)return e;if(16&n&&"function"==typeof e.then)return e}var a=Object.create(null);s.r(a);var o={};t=t||[null,r({}),r([]),r(r)];for(var l=2&n&&e;"object"==typeof l&&!~t.indexOf(l);l=r(l))Object.getOwnPropertyNames(l).forEach((t=>o[t]=()=>e[t]));return o.default=()=>e,s.d(a,o),a},s.d=(e,t)=>{for(var r in t)s.o(t,r)&&!s.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},s.f={},s.e=e=>Promise.all(Object.keys(s.f).reduce(((t,r)=>(s.f[r](e,t),t)),[])),s.u=e=>"js/"+e+"."+{130:"ae6fcbcce0bb1508f650",155:"afae6b78aa5514d6e709",204:"6232c6f5300feea22b0e",486:"4f91282b54fd134f8992",931:"1629be93e1ade8f9a18b",986:"9a49cb2975c32457f862"}[e]+".js",s.miniCssF=e=>"css/"+e+"."+{155:"09591045af3a67433012",931:"97fd82af4ffd183a6036",986:"97fd82af4ffd183a6036"}[e]+".css",s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n={},a="react-base:",s.l=(e,t,r,o)=>{if(n[e])n[e].push(t);else{var l,c;if(void 0!==r)for(var i=document.getElementsByTagName("script"),d=0;d<i.length;d++){var u=i[d];if(u.getAttribute("src")==e||u.getAttribute("data-webpack")==a+r){l=u;break}}l||(c=!0,(l=document.createElement("script")).charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.setAttribute("data-webpack",a+r),l.src=e),n[e]=[t];var f=(t,r)=>{l.onerror=l.onload=null,clearTimeout(p);var a=n[e];if(delete n[e],l.parentNode&&l.parentNode.removeChild(l),a&&a.forEach((e=>e(r))),t)return t(r)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:l}),12e4);l.onerror=f.bind(null,l.onerror),l.onload=f.bind(null,l.onload),c&&document.head.appendChild(l)}},s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),s.p="/react-base/",(()=>{if("undefined"!=typeof document){var e={179:0};s.f.miniCss=(t,r)=>{e[t]?r.push(e[t]):0!==e[t]&&{155:1,931:1,986:1}[t]&&r.push(e[t]=(e=>new Promise(((t,r)=>{var n=s.miniCssF(e),a=s.p+n;if(((e,t)=>{for(var r=document.getElementsByTagName("link"),n=0;n<r.length;n++){var a=(l=r[n]).getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(a===e||a===t))return l}var o=document.getElementsByTagName("style");for(n=0;n<o.length;n++){var l;if((a=(l=o[n]).getAttribute("data-href"))===e||a===t)return l}})(n,a))return t();((e,t,r,n,a)=>{var o=document.createElement("link");o.rel="stylesheet",o.type="text/css",o.onerror=o.onload=r=>{if(o.onerror=o.onload=null,"load"===r.type)n();else{var l=r&&("load"===r.type?"missing":r.type),s=r&&r.target&&r.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=l,c.request=s,o.parentNode&&o.parentNode.removeChild(o),a(c)}},o.href=t,document.head.appendChild(o)})(e,a,0,t,r)})))(t).then((()=>{e[t]=0}),(r=>{throw delete e[t],r})))}}})(),(()=>{var e={179:0};s.f.j=(t,r)=>{var n=s.o(e,t)?e[t]:void 0;if(0!==n)if(n)r.push(n[2]);else{var a=new Promise(((r,a)=>n=e[t]=[r,a]));r.push(n[2]=a);var o=s.p+s.u(t),l=new Error;s.l(o,(r=>{if(s.o(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var a=r&&("load"===r.type?"missing":r.type),o=r&&r.target&&r.target.src;l.message="Loading chunk "+t+" failed.\n("+a+": "+o+")",l.name="ChunkLoadError",l.type=a,l.request=o,n[1](l)}}),"chunk-"+t,t)}},s.O.j=t=>0===e[t];var t=(t,r)=>{var n,a,[o,l,c]=r,i=0;if(o.some((t=>0!==e[t]))){for(n in l)s.o(l,n)&&(s.m[n]=l[n]);if(c)var d=c(s)}for(t&&t(r);i<o.length;i++)a=o[i],s.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return s.O(d)},r=self.webpackChunkreact_base=self.webpackChunkreact_base||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var c=s.O(void 0,[693],(()=>s(5676)));c=s.O(c)})();