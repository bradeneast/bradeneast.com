(()=>{class z{constructor({onload:a,selector:d=`a[href^="${window.location.origin}"]:not([data-no-schwifty]), a[href^="/"]:not([data-no-schwifty])`,cacheLimit:g=85,preserveScroll:w=!1,transitioningAttribute:x="data-schwifty",preserveAttributes:q}={}){let y=q===!0;typeof q!="object"&&(q={documentElement:y,head:y,body:y});let m="schwifty-preload",n='link[rel="stylesheet"]',e=document,o=e.documentElement,r="innerHTML",k=new Map(),L=new IntersectionObserver((b,c)=>b.forEach(p=>{let t=p.isIntersecting,u=p.target.href;if(!t&&t!=void 0)return;k.size>=g&&k.delete(k.keys()[0]),k.get(u)?c.unobserve(p.target):N(u)}),{threshold:.5}),F=(b,c=e)=>c.querySelector(b),s=(b,c=e)=>c.querySelectorAll(b),M=b=>b.target.closest(d)||{},G=()=>s(d).forEach(b=>L.observe(b)),j=(b,c=window)=>c.dispatchEvent(new Event(b)),H=b=>b.replace(/m?s/gi,""),I=()=>{let b=getComputedStyle(o);return(H(b.transitionDelay)+H(b.transitionDuration))*1e3},N=b=>{if(!b)return;let c=new XMLHttpRequest();c.onreadystatechange=function(){this.status==200&&k.set(b,c.responseXML)},c.open("GET",b,!0),c.responseType="document",c.send()},J=b=>{let c=k.get(b);if(!c){location=b;return}history.replaceState(null,null,b),s(`${n}:not(.${m})`).forEach(f=>{let h=f.href.replace(location.origin,""),i=F(`${n}.${m}[href="${h}"]`),K=F(`${n}[href="${h}"]`,c);K&&!i&&(f.classList.add(m),o.append(f)),!K&&i&&i.remove()});let p=`${n}:not(.${m})`,t=`${n}.${m}`,u=s(p,c),O=s(t);for(let f of O)Array.from(u).some(h=>h.href==f.href)||f.remove();["body","head","documentElement"].forEach(f=>{if(q[f])return;let h=e[f];for(let i of h.attributes)h.removeAttribute(i.name);for(let i of c[f].attributes)h.setAttribute(i.name,i.value)}),o.setAttribute(x,"out"),j("unload"),setTimeout(()=>{j("loading",e),e.body[r]=c.body[r],e.head[r]=c.head[r],o.setAttribute(x,"in"),j("interactive",e),j("DOMContentLoaded",e),w||scrollTo(0,0),a&&a(),G(),setTimeout(()=>o.removeAttribute(x),I()),j("complete",e),j("load")},I())};G(),addEventListener("popstate",b=>J(location.href)),addEventListener("click",b=>{let c=M(b).href;c&&(b.preventDefault(),j("beforeunload"),history.pushState(null,null,location.href),J(c))})}}let l=(a,d=document)=>d.querySelector(a),v=(a,d=document)=>d.querySelectorAll(a),C=(a,d="")=>{let g=document.createElement(a);return g.innerHTML=d,g},E=(a,d)=>d==void 0?JSON.parse(localStorage.getItem(a)):localStorage.setItem(a,JSON.stringify(d)),B=a=>{let d=E(a);document.documentElement.classList.toggle(a,!d),E(a,!d)};function A(a=""){let d=decodeURIComponent(a)||"",g=d.split("/").pop(),w=g?.split(".")?.shift()?.replace(/-|\+/g," ");return w||""}function D(){for(let a of["dark_mode","muted"]){let d=l(`#${a}_toggle`);d&&d.addEventListener("click",()=>B(a))}for(let a of v("img")){if(a.title?.length)continue;a.title=a.alt?a.alt:A(a.src),a.parentElement.classList.add("has-img")}if(l(".codepen")){let a=C("script");a.src="https://static.codepen.io/assets/embed/ei.js",a.async=!0,document.body.append(a)}for(let a of v(".embedded_project")){let d=l("button",a),g=l("iframe",a);d.addEventListener("click",()=>{g.src=g.getAttribute("data-src"),a.classList.add("loaded")})}}D();new z({preserveAttributes:!0,onload:D});})();