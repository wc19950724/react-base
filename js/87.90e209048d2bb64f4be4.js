"use strict";(self.webpackChunkreact_base=self.webpackChunkreact_base||[]).push([[87],{2087:(t,e,s)=>{s.r(e),s.d(e,{default:()=>h});var o=s(1527),r=s(4875),i=s.n(r),n=s(959),c=s(1073);const h=()=>{const t=(0,n.useRef)(null),e=new c.uv;return(0,n.useEffect)((()=>(t.current&&e.add(t.current),()=>{e.dispose()})),[]),(0,o.jsx)("div",{className:"all-full relative",children:(0,o.jsx)("div",{ref:t,className:i()("WncRyb6_FU20j4MKMqlz"),children:"dom"})})}},1073:(t,e,s)=>{s.d(e,{uv:()=>c});var o=s(2699),r=s(7217);class i{cursor;controlElements;constructor(){this.cursor=document.body.style.cursor,this.controlElements={}}render(t){if("all"===t){const t=["top","right","bottom","left","leftTop","rightTop","rightBottom","leftBottom"];for(const e of t)this.getController(e)}else Array.isArray(t)?t.forEach((t=>{this.getController(t)})):this.getController(t)}getController(t){const e=document.createElement("div");switch(e.classList.add("controller"),e.style.position="absolute",t){case"left":case"right":e.style[t]="-10px",e.style.top="0",e.style.height="100%",e.style.width="20px";break;case"top":case"bottom":e.style[t]="-10px",e.style.left="0",e.style.width="100%",e.style.height="20px";break;case"leftTop":case"rightTop":"leftTop"===t?e.style.left="-10px":e.style.right="-10px",e.style.top="-10px",e.style.width="20px",e.style.height="20px";break;case"leftBottom":case"rightBottom":"leftBottom"===t?e.style.left="-10px":e.style.right="-10px",e.style.bottom="-10px",e.style.width="20px",e.style.height="20px"}e.onmouseenter=()=>{document.body.style.cursor=this.getCursorForDirection(t)},e.onmouseleave=()=>{document.body.style.cursor=this.cursor},this.controlElements[t]=e}getCursorForDirection(t){switch(t){case"top":return"n-resize";case"bottom":return"s-resize";case"left":return"w-resize";case"right":return"e-resize";case"leftTop":return"nw-resize";case"rightTop":return"ne-resize";case"rightBottom":return"se-resize";case"leftBottom":return"sw-resize";default:return this.cursor}}dispose(){let t;for(t in document.body.style.cursor=this.cursor,this.controlElements)this.controlElements[t]?.remove();this.controlElements={}}}class n{el;startRect;direction;controlMap=new Map;userSelect=document.body.style.userSelect;currentDom;constructor(){this.el=null,this.startRect=null,this.start=this.start.bind(this),this.move=this.move.bind(this),this.end=this.end.bind(this)}add(t,e,s){this.el=t,this.controlMap.set(e,s);const o=t=>{this.currentDom=e,this.start(t)};e.onmousedown=o,e.ontouchstart=o}start(t){if(!this.currentDom||!this.el)return;t.preventDefault(),this.userSelect=document.body.style.userSelect,document.body.style.userSelect="none",this.direction=this.controlMap.get(this.currentDom);const{width:e,height:s,left:r,top:i}=this.el.getBoundingClientRect();this.startRect=(0,o.merge)({},this.startRect,{width:e,height:s,left:r,top:i}),t instanceof MouseEvent?((0,o.merge)(this.startRect,{x:t.pageX,y:t.pageY}),document.addEventListener("mousemove",this.move),document.addEventListener("mouseup",this.end)):((0,o.merge)(this.startRect,{x:t.touches[0].pageX,y:t.touches[0].pageY}),document.addEventListener("touchmove",this.move,{passive:!1}),document.addEventListener("touchend",this.end),document.addEventListener("touchcancel",this.end))}move(t){if(this.startRect)switch(t.preventDefault(),this.direction){case"left":this.moveLeft(t);break;case"right":this.moveRight(t);break;case"top":this.moveTop(t);break;case"bottom":this.moveBottom(t);break;case"leftTop":this.moveLeft(t),this.moveTop(t);break;case"rightTop":this.moveRight(t),this.moveTop(t);break;case"leftBottom":this.moveLeft(t),this.moveBottom(t);break;case"rightBottom":this.moveRight(t),this.moveBottom(t)}}moveLeft(t){if(!this.el||!this.startRect)return;const e=t instanceof MouseEvent?t.pageX:t.touches[0].pageX,s=this.startRect.x-e;this.el.style.width=this.startRect.width+s+"px"}moveRight(t){if(!this.el||!this.startRect)return;const e=(t instanceof MouseEvent?t.pageX:t.touches[0].pageX)-this.startRect.x;this.el.style.width=this.startRect.width+e+"px"}moveTop(t){if(!this.el||!this.startRect)return;const e=t instanceof MouseEvent?t.pageY:t.touches[0].pageY,s=this.startRect.y-e;this.el.style.height=this.startRect.height+s+"px"}moveBottom(t){if(!this.el||!this.startRect)return;const e=(t instanceof MouseEvent?t.pageY:t.touches[0].pageY)-this.startRect.y;this.el.style.height=this.startRect.height+e+"px"}end(){document.body.style.userSelect=this.userSelect,this.startRect=null,document.removeEventListener("mousemove",this.move),document.removeEventListener("mouseup",this.end),document.removeEventListener("touchmove",this.move),document.removeEventListener("touchend",this.end),document.removeEventListener("touchcancel",this.end)}dispose(){this.controlMap.clear(),this.end()}}class c{controlMap=new Map;controls;resizeEvents;constructor(){this.controls=new i,this.resizeEvents=new n}add(t,e="all"){const s=(0,r.sb)(t);if(!s)throw`${t}: the element is not found`;s.style.position="relative",this.controlMap.set(s,e),this.register()}register(){[...this.controlMap.entries()].forEach((([t,e])=>{this.controls.render(e);const{controlElements:s}=this.controls;let o;for(o in s){const e=o,r=s[e];r&&(this.resizeEvents.add(t,r,e),t.appendChild(r))}}))}dispose(){this.controlMap.clear(),this.controls.dispose(),this.resizeEvents.dispose()}}},7217:(t,e,s)=>{s.d(e,{XF:()=>o,sb:()=>r,tr:()=>i});const o=(t,e)=>Math.floor(Math.random()*(e-t))+t,r=t=>"string"==typeof t?document.querySelector(t):t,i=(t,e,s)=>new RegExp(`\\.${e}$`,s).test(t.name)}}]);