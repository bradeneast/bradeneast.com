(()=>{let v=(b,a=document)=>a.querySelector(b),i=(b,a=document)=>a.querySelectorAll(b),o=(b,a="")=>{let e=document.createElement(b);return e.innerHTML=a,e},J=(b,a)=>a==void 0?JSON.parse(localStorage.getItem(b)):localStorage.setItem(b,JSON.stringify(a)),H=b=>{let a=J(b);document.documentElement.classList.toggle(b,!a),J(b,!a)};function I(b){var g,j;let a=decodeURIComponent(b)||"",e=a.split("/").pop(),f=(j=(g=e==null?void 0:e.split("."))==null?void 0:g.shift())==null?void 0:j.replace(/-|\+/g," ");return f||""}function Q(b){let a=new XMLHttpRequest();a.onreadystatechange=function(){this.status==200&&a.responseXML&&b(a.responseXML)},a.responseType="document",a.open("GET","/sitemap.xml",!0),a.send()}function G(b){return Q(a=>{a||(window.location="/random");let e=Array.from(i("loc",a)),f=e.map(k=>k.textContent.trim()),g=f.filter(k=>b.test(k)),j=Math.round((g.length-1)*Math.random());if(g[j])window.location=g[j];else return!1})}function A(){let b=f=>{f.map(g=>g.target.classList.toggle("paused",!g.isIntersecting))},a={threshold:.63},e=new IntersectionObserver(b,a);for(let f of i(".animation"))e.observe(f);for(let f of i(".split")){let g=f.textContent.split("").map((j,k)=>{let l=o("span",j.replace(" ","&nbsp;"));return l.classList.add("character"),l.style.setProperty("--index",k),l.outerHTML});f.innerHTML=g.join("")}document.body.classList.remove("reduced-motion");for(let f of i(".paused"))f.classList.remove("paused")}function B(){for(let b of i('code[class*="language-"')){let a=b.closest("pre"),e=o("span"),f=b.innerHTML.split(/\n/).length;e.classList.add("line-numbers-rows"),e.setAttribute("aria-hidden",!0);for(let g=0;g<f;g++)e.append(o("span"));a.classList.add("line-numbers"),a.append(e)}}function C(){let b=["dark_mode"];for(let a of b){let e=v(`#${a}_toggle`);if(!e)continue;e.addEventListener("click",()=>H(a))}for(let a of i('a[href*="/random"]'))a.addEventListener("click",e=>{e.preventDefault(),G(/\/blog\/.+/i)})}function D(){var b;for(let a of i("img"))((b=a.alt)==null?void 0:b.length)||(a.alt=a.alt||I(a.src)),a.parentElement.classList.add("has-img"),a.parentElement.title=a.title;if(v(".codepen")){let a=o("script");a.src="https://static.codepen.io/assets/embed/ei.js",a.async=!0,document.body.append(a)}}class E{constructor({onload:b=null,selector:a,cacheLimit:e,transitioningAttribute:f,preserveScroll:g=!1,preserveAttributes:j=!1}={}){a=a||`a[href^='${window.location.origin}']:not([data-no-schwifty]), a[href^='/']:not([data-no-schwifty])`,e=e||85,f=f||"data-schwifty";let k=j===!0;typeof j!="object"&&(j={documentElement:k,head:k,body:k});let l="schwifty-preload",s='link[rel="stylesheet"]',p=document,t=p.documentElement,w="innerHTML",q=new Map(),R=new IntersectionObserver((c,d)=>c.forEach(u=>{let y=u.isIntersecting,z=u.target.href;if(!y&&y!=void 0)return;q.size>=e&&q.delete(q.keys()[0]),q.get(z)?d.unobserve(u.target):T(z)}),{threshold:.5}),K=(c,d=p)=>d.querySelector(c),x=(c,d=p)=>d.querySelectorAll(c),S=c=>c.target.closest(a)||{},L=()=>x(a).forEach(c=>R.observe(c)),r=(c,d=window)=>d.dispatchEvent(new Event(c)),M=c=>c.replace(/m?s/gi,""),N=()=>{let c=getComputedStyle(t);return(M(c.transitionDelay)+M(c.transitionDuration))*1000},T=c=>{if(!c)return;let d=new XMLHttpRequest();d.onreadystatechange=function(){this.status==200&&q.set(c,d.responseXML)},d.open("GET",c,!0),d.responseType="document",d.send()},O=c=>{let d=q.get(c);if(!d){location=c;return}history.replaceState(null,null,c),x(`${s}:not(.${l})`).forEach(h=>{let m=h.href.replace(location.origin,""),n=K(`${s}.${l}[href="${m}"]`),P=K(`${s}[href="${m}"]`,d);P&&!n&&(h.classList.add(l),t.append(h)),!P&&n&&n.remove()});let u=`${s}:not(.${l})`,y=`${s}.${l}`,z=x(u,d),U=x(y);for(let h of U)Array.from(z).some(m=>m.href==h.href)||h.remove();["body","head","documentElement"].forEach(h=>{if(j[h])return;let m=p[h];for(let n of m.attributes)m.removeAttribute(n.name);for(let n of d[h].attributes)m.setAttribute(n.name,n.value)}),t.setAttribute(f,"out"),r("pagehide"),r("unload"),setTimeout(()=>{p.body[w]=d.body[w],p.head[w]=d.head[w],t.setAttribute(f,"in"),r("DOMContentLoaded",p),g||scrollTo(0,0),b&&(b.length?b.map(h=>h()):b()),L(),setTimeout(()=>t.removeAttribute(f),N()),r("load"),r("pageshow")},N())};L(),addEventListener("popstate",()=>O(location.href)),addEventListener("click",c=>{let d=S(c).href;d&&(c.preventDefault(),r("beforeunload"),history.pushState(null,null,location.href),O(d))})}}function F(){D(),A(),B(),C()}F();try{new E({preserveAttributes:!0,onload:F})}catch(b){console.log(b)}})();
