(()=>{class z{constructor({onload:c,selector:e=`a[href^='${window.location.origin}']:not([data-no-schwifty]), a[href^='/']:not([data-no-schwifty])`,cacheLimit:a=85,preserveScroll:g=!1,transitioningAttribute:h="data-schwifty",preserveAttributes:l}={}){let y=l===!0;typeof l!="object"&&(l={documentElement:y,head:y,body:y});let p="schwifty-preload",q='link[rel="stylesheet"]',k=document,r=k.documentElement,u="innerHTML",m=new Map(),L=new IntersectionObserver((b,d)=>b.forEach(s=>{let w=s.isIntersecting,x=s.target.href;if(!w&&w!=void 0)return;m.size>=a&&m.delete(m.keys()[0]),m.get(x)?d.unobserve(s.target):N(x)}),{threshold:.5}),F=(b,d=k)=>d.querySelector(b),v=(b,d=k)=>d.querySelectorAll(b),M=b=>b.target.closest(e)||{},G=()=>v(e).forEach(b=>L.observe(b)),n=(b,d=window)=>d.dispatchEvent(new Event(b)),H=b=>b.replace(/m?s/gi,""),I=()=>{let b=getComputedStyle(r);return(H(b.transitionDelay)+H(b.transitionDuration))*1e3},N=b=>{if(!b)return;let d=new XMLHttpRequest();d.onreadystatechange=function(){this.status==200&&m.set(b,d.responseXML)},d.open("GET",b,!0),d.responseType="document",d.send()},J=b=>{let d=m.get(b);if(!d){location=b;return}history.replaceState(null,null,b),v(`${q}:not(.${p})`).forEach(f=>{let i=f.href.replace(location.origin,""),j=F(`${q}.${p}[href="${i}"]`),K=F(`${q}[href="${i}"]`,d);K&&!j&&(f.classList.add(p),r.append(f)),!K&&j&&j.remove()});let s=`${q}:not(.${p})`,w=`${q}.${p}`,x=v(s,d),O=v(w);for(let f of O)Array.from(x).some(i=>i.href==f.href)||f.remove();["body","head","documentElement"].forEach(f=>{if(l[f])return;let i=k[f];for(let j of i.attributes)i.removeAttribute(j.name);for(let j of d[f].attributes)i.setAttribute(j.name,j.value)}),r.setAttribute(h,"out"),n("pagehide"),n("unload"),setTimeout(()=>{k.body[u]=d.body[u],k.head[u]=d.head[u],r.setAttribute(h,"in"),n("DOMContentLoaded",k),g||scrollTo(0,0),c&&(c.length?c.map(f=>f()):c()),G(),setTimeout(()=>r.removeAttribute(h),I()),n("load"),n("pageshow")},I())};G(),addEventListener("popstate",b=>{J(location.href)}),addEventListener("click",b=>{let d=M(b).href;d&&(b.preventDefault(),n("beforeunload"),history.pushState(null,null,location.href),J(d))})}}let o=(c,e=document)=>e.querySelector(c),t=(c,e=document)=>e.querySelectorAll(c),C=(c,e="")=>{let a=document.createElement(c);return a.innerHTML=e,a},E=(c,e)=>e==void 0?JSON.parse(localStorage.getItem(c)):localStorage.setItem(c,JSON.stringify(e)),B=c=>{let e=E(c);document.documentElement.classList.toggle(c,!e),E(c,!e)};function A(c=""){var h,l;let e=decodeURIComponent(c)||"",a=e.split("/").pop(),g=(l=(h=a==null?void 0:a.split("."))==null?void 0:h.shift())==null?void 0:l.replace(/-|\+/g," ");return g||""}function D(){var e;for(let a of["dark_mode","muted"]){let g=o(`#${a}_toggle`);g&&g.addEventListener("click",()=>B(a))}let c=new IntersectionObserver(a=>a.map(g=>g.target.classList.toggle("paused",!g.isIntersecting)),{threshold:.63});for(let a of t(".animation"))c.observe(a);for(let a of t("img"))((e=a.alt)==null?void 0:e.length)||(a.alt=a.alt||A(a.src)),a.parentElement.classList.add("has-img"),a.parentElement.title=a.title;if(o(".codepen")){let a=C("script");a.src="https://static.codepen.io/assets/embed/ei.js",a.async=!0,document.body.append(a)}for(let a of t(".embedded_project")){let g=o("button",a),h=o("iframe",a);g.addEventListener("click",()=>{h.src=h.getAttribute("data-src"),a.classList.add("loaded")})}}D();try{new z({preserveAttributes:!0,onload:D})}catch(c){console.log(c)}})();
