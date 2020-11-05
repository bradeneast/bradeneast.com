(()=>{let v=(b,a=document)=>a.querySelector(b),i=(b,a=document)=>a.querySelectorAll(b),r=(b,a="")=>{let e=document.createElement(b);return e.innerHTML=a,e},J=(b,a)=>a==void 0?JSON.parse(localStorage.getItem(b)):localStorage.setItem(b,JSON.stringify(a));function H(b){let a=v(".modal"),e=J(b),g=!e;document.documentElement.classList.toggle(b,g),J(b,g);if(a){a.innerHTML=`${b.replace(/[-_]/g," ")} ${g?"on":"off"}`,a.classList.add("visible");let h;h=setTimeout(()=>{clearTimeout(h),a.classList.remove("visible")},2e3)}}function I(b){var h,f;let a=decodeURIComponent(b)||"",e=a.split("/").pop(),g=(f=(h=e==null?void 0:e.split("."))==null?void 0:h.shift())==null?void 0:f.replace(/-|\+/g," ");return g||""}function Q(b){let a=new XMLHttpRequest();a.onreadystatechange=function(){this.status==200&&a.responseXML&&b(a.responseXML)},a.responseType="document",a.open("GET","/sitemap.xml",!0),a.send()}function G(b){return Q(a=>{a||(window.location="/random");let e=Array.from(i("loc",a)),g=e.map(k=>k.textContent.trim()),h=g.filter(k=>b.test(k)),f=Math.round((h.length-1)*Math.random());if(h[f])window.location=h[f];else return!1})}function B(){for(let f of i(".split")){let k=f.textContent.split("").map((l,n)=>{let j=r("span",l.replace(" ","&nbsp;"));return j.classList.add("character"),j.style.setProperty("--index",n),j.outerHTML});f.innerHTML=k.join("")}for(let f of i(".paused"))f.classList.remove(".paused");let b="animate-in",a=i(`.${b}`),e={threshold:.2},g=new IntersectionObserver(h,e);a.forEach(f=>g.observe(f));function h(f){f.map(k=>{let l=k.target,n=k.isIntersecting,j=l.getBoundingClientRect(),s=j.bottom-j.height/2,t=innerHeight/2,o=s>t?1:-1;n||(o=0),l.style.setProperty("--animateFrom",o),l.classList.toggle("intersecting",n),n&&setTimeout(()=>l.classList.remove(b),1e3)})}}function C(){for(let b of i('code[class*="language-"')){let a=b.closest("pre"),e=r("span"),g=b.innerHTML.split(/\n/).length;e.classList.add("line-numbers-rows"),e.setAttribute("aria-hidden",!0);for(let h=0;h<g;h++)e.append(r("span"));a.classList.add("line-numbers"),a.append(e)}}function D(){for(let b of window.__preferences){let a=v(`#${b}_toggle`);a.addEventListener("click",()=>H(b))}for(let b of i('a[href*="/random"]'))b.addEventListener("click",a=>{a.preventDefault(),G(/\/blog\/.+/i)})}function E(){var b;for(let a of i("img, video"))((b=a.alt)==null?void 0:b.length)||(a.alt=a.alt||I(a.src)),a.parentElement.classList.add("has-media"),a.parentElement.title=a.title;for(let a of i("table"))a.outerHTML=`<div class="table-wrapper">${a.outerHTML}</div>`;if(v(".codepen")){let a=r("script");a.src="https://static.codepen.io/assets/embed/ei.js",a.async=!0,document.body.append(a)}}class A{constructor({onload:b=null,selector:a,cacheLimit:e,transitioningAttribute:g,preserveScroll:h=!1,preserveAttributes:f=!1}={}){a=a||`a[href^='${window.location.origin}']:not([data-no-schwifty]), a[href^='/']:not([data-no-schwifty])`,e=e||85,g=g||"data-schwifty";let k=f===!0;typeof f!="object"&&(f={documentElement:k,head:k,body:k});let l="schwifty-preload",n='link[rel="stylesheet"]',j=document,s=j.documentElement,t="innerHTML",o=new Map(),R=new IntersectionObserver((c,d)=>c.forEach(w=>{let y=w.isIntersecting,z=w.target.href;if(!y&&y!=void 0)return;o.size>=e&&o.delete(o.keys()[0]),o.get(z)?d.unobserve(w.target):T(z)}),{threshold:.5}),K=(c,d=j)=>d.querySelector(c),x=(c,d=j)=>d.querySelectorAll(c),S=c=>c.target.closest(a)||{},L=()=>x(a).forEach(c=>R.observe(c)),u=(c,d=window)=>d.dispatchEvent(new Event(c)),M=c=>c.replace(/m?s/gi,""),N=()=>{let c=getComputedStyle(s);return(M(c.transitionDelay)+M(c.transitionDuration))*1e3},T=c=>{if(!c)return;let d=new XMLHttpRequest();d.onreadystatechange=function(){this.status==200&&o.set(c,d.responseXML)},d.open("GET",c,!0),d.responseType="document",d.send()},O=c=>{let d=o.get(c);if(!d){location=c;return}history.replaceState(null,null,c),x(`${n}:not(.${l})`).forEach(m=>{let p=m.href.replace(location.origin,""),q=K(`${n}.${l}[href="${p}"]`),P=K(`${n}[href="${p}"]`,d);P&&!q&&(m.classList.add(l),s.append(m)),!P&&q&&q.remove()});let w=`${n}:not(.${l})`,y=`${n}.${l}`,z=x(w,d),U=x(y);for(let m of U)Array.from(z).some(p=>p.href==m.href)||m.remove();["body","head","documentElement"].forEach(m=>{if(f[m])return;let p=j[m];for(let q of p.attributes)p.removeAttribute(q.name);for(let q of d[m].attributes)p.setAttribute(q.name,q.value)}),s.setAttribute(g,"out"),u("pagehide"),u("unload"),setTimeout(()=>{j.body[t]=d.body[t],j.head[t]=d.head[t],s.setAttribute(g,"in"),u("DOMContentLoaded",j),h||scrollTo(0,0),b&&(b.length?b.map(m=>m()):b()),L(),setTimeout(()=>s.removeAttribute(g),N()),u("load"),u("pageshow")},N())};L(),addEventListener("popstate",()=>O(location.href)),addEventListener("click",c=>{let d=S(c).href;d&&(c.preventDefault(),u("beforeunload"),history.pushState(null,null,location.href),O(d))})}}function F(){i(`a[href="${location.pathname}"]`).forEach(b=>b.setAttribute("aria-current",!0)),B(),E(),C(),D()}F();try{new A({preserveAttributes:!0,onload:F})}catch(b){console.log(b)}console.log("%cAffectionately built with Ingrid :)",`\r
		font-family: "Recursive", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Nueue", "Roboto",\r
		sans-serif;\r
		font-size: 16px;\r
		font-weight: bold`);console.log("%chttps://github.com/bradeneast/ingrid","color: orangered");})();
