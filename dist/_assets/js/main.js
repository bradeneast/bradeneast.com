(()=>{class z{constructor({onload:c=null,selector:b,cacheLimit:a,transitioningAttribute:f,preserveScroll:i=!1,preserveAttributes:h=!1}={}){b=b||`a[href^='${window.location.origin}']:not([data-no-schwifty]), a[href^='/']:not([data-no-schwifty])`,a=a||85,f=f||"data-schwifty";let y=h===!0;typeof h!="object"&&(h={documentElement:y,head:y,body:y});let q="schwifty-preload",r='link[rel="stylesheet"]',l=document,s=l.documentElement,u="innerHTML",n=new Map(),N=new IntersectionObserver((d,e)=>d.forEach(t=>{let w=t.isIntersecting,x=t.target.href;if(!w&&w!=void 0)return;n.size>=a&&n.delete(n.keys()[0]),n.get(x)?e.unobserve(t.target):P(x)}),{threshold:.5}),G=(d,e=l)=>e.querySelector(d),v=(d,e=l)=>e.querySelectorAll(d),O=d=>d.target.closest(b)||{},H=()=>v(b).forEach(d=>N.observe(d)),o=(d,e=window)=>e.dispatchEvent(new Event(d)),I=d=>d.replace(/m?s/gi,""),J=()=>{let d=getComputedStyle(s);return(I(d.transitionDelay)+I(d.transitionDuration))*1000},P=d=>{if(!d)return;let e=new XMLHttpRequest();e.onreadystatechange=function(){this.status==200&&n.set(d,e.responseXML)},e.open("GET",d,!0),e.responseType="document",e.send()},K=d=>{let e=n.get(d);if(!e){location=d;return}history.replaceState(null,null,d),v(`${r}:not(.${q})`).forEach(g=>{let j=g.href.replace(location.origin,""),k=G(`${r}.${q}[href="${j}"]`),L=G(`${r}[href="${j}"]`,e);L&&!k&&(g.classList.add(q),s.append(g)),!L&&k&&k.remove()});let t=`${r}:not(.${q})`,w=`${r}.${q}`,x=v(t,e),Q=v(w);for(let g of Q)Array.from(x).some(j=>j.href==g.href)||g.remove();["body","head","documentElement"].forEach(g=>{if(h[g])return;let j=l[g];for(let k of j.attributes)j.removeAttribute(k.name);for(let k of e[g].attributes)j.setAttribute(k.name,k.value)}),s.setAttribute(f,"out"),o("pagehide"),o("unload"),setTimeout(()=>{l.body[u]=e.body[u],l.head[u]=e.head[u],s.setAttribute(f,"in"),o("DOMContentLoaded",l),i||scrollTo(0,0),c&&(c.length?c.map(g=>g()):c()),H(),setTimeout(()=>s.removeAttribute(f),J()),o("load"),o("pageshow")},J())};H(),addEventListener("popstate",()=>K(location.href)),addEventListener("click",d=>{let e=O(d).href;e&&(d.preventDefault(),o("beforeunload"),history.pushState(null,null,location.href),K(e))})}}let p=(c,b=document)=>b.querySelector(c),m=(c,b=document)=>b.querySelectorAll(c),C=(c,b="")=>{let a=document.createElement(c);return a.innerHTML=b,a},F=(c,b)=>b==void 0?JSON.parse(localStorage.getItem(c)):localStorage.setItem(c,JSON.stringify(b)),B=c=>{let b=F(c);document.documentElement.classList.toggle(c,!b),F(c,!b)};function A(c=""){var i,h;let b=decodeURIComponent(c)||"",a=b.split("/").pop(),f=(h=(i=a==null?void 0:a.split("."))==null?void 0:i.shift())==null?void 0:h.replace(/-|\+/g," ");return f||""}function M(c){let b=new XMLHttpRequest();b.onreadystatechange=function(){if(this.status==200&&b.responseXML)return c(b.responseXML)},b.responseType="document",b.open("GET","/sitemap.xml",!0),b.send()}function D(c){return M(b=>{if(b.querySelector("parsererror")){window.location="/random";return}let a=[];for(let h of m("loc",b))a.push(h.textContent.trim());let f=a.filter(h=>c.test(h)),i=Math.round((f.length-1)*Math.random());if(f[i])window.location=f[i];else return!1})}function E(){var b;document.body.classList.remove("reduced-motion");for(let a of["dark_mode","muted"]){let f=p(`#${a}_toggle`);f&&f.addEventListener("click",()=>B(a))}let c=new IntersectionObserver(a=>a.map(f=>f.target.classList.toggle("paused",!f.isIntersecting)),{threshold:.63});for(let a of m(".animation"))c.observe(a);for(let a of m("img"))((b=a.alt)==null?void 0:b.length)||(a.alt=a.alt||A(a.src)),a.parentElement.classList.add("has-img"),a.parentElement.title=a.title;if(p(".codepen")){let a=C("script");a.src="https://static.codepen.io/assets/embed/ei.js",a.async=!0,document.body.append(a)}for(let a of m(".embedded_project")){let f=p("button",a),i=p("iframe",a);f.addEventListener("click",()=>{i.src=i.getAttribute("data-src"),a.classList.add("loaded")})}for(let a of m('a[href*="/random"]'))a.addEventListener("click",f=>{f.preventDefault(),D(/\/blog\/.+/i)})}E();try{new z({preserveAttributes:!0,onload:E})}catch(c){console.log(c)}})();
