(()=>{var y=(t,e=document)=>e.querySelector(t),s=(t,e=document)=>e.querySelectorAll(t);var m=(t,e="")=>{let n=document.createElement(t);return n.innerHTML=e,n},X=(t,e)=>e==null?JSON.parse(localStorage.getItem(t)):localStorage.setItem(t,JSON.stringify(e));function j(t){let e=y(".modal"),a=!X(t);if(document.documentElement.classList.toggle(t,a),X(t,a),e){e.innerHTML=`${t.replace(/[-_]/g," ")} ${a?"on":"off"}`,e.classList.add("visible");let r;r=setTimeout(()=>{clearTimeout(r),e.classList.remove("visible")},2e3)}}function B(t){var r,f;let n=(decodeURIComponent(t)||"").split("/").pop();return((f=(r=n==null?void 0:n.split("."))==null?void 0:r.shift())==null?void 0:f.replace(/-|\+/g," "))||""}function Q(t){let e=new XMLHttpRequest;e.onreadystatechange=function(){this.status==200&&e.responseXML&&t(e.responseXML)},e.responseType="document",e.open("GET","/sitemap.xml",!0),e.send()}function O(t){return Q(e=>{e||(window.location="/random");let r=Array.from(s("loc",e)).map(d=>d.textContent.trim()).filter(d=>t.test(d)),f=Math.round((r.length-1)*Math.random());if(r[f])window.location=r[f];else return!1})}function E(){for(let t of s(".split")){let e=t.textContent.split("").map((n,a)=>{let r=m("span",n.replace(" ","&nbsp;"));return r.classList.add("character"),r.style.setProperty("--index",a),r.outerHTML});t.innerHTML=e.join("")}for(let t of s(".paused"))t.classList.remove(".paused")}function k(){for(let t of s('code[class*="language-"')){let e=t.closest("pre"),n=m("span"),a=t.innerHTML.split(/\n/).length;n.classList.add("line-numbers-rows"),n.setAttribute("aria-hidden",!0);for(let r=0;r<a;r++)n.append(m("span"));e.classList.add("line-numbers"),e.append(n)}}function H(){y("#back_to_top").addEventListener("click",()=>scrollTo(0,0));for(let t of window.__preferences)y(`#${t}_toggle`).addEventListener("click",()=>j(t));for(let t of s('a[href*="/random"]'))t.addEventListener("click",e=>{e.preventDefault(),O(/\/blog\/.+/i)})}function C(){var t;for(let e of s("img, video"))((t=e.alt)==null?void 0:t.length)||(e.alt=e.alt||B(e.src)),e.parentElement.classList.add("has-media"),e.title=e.title||e.alt;for(let e of s("table"))e.outerHTML=`<div class="table-wrapper">${e.outerHTML}</div>`;if(y(".codepen")){let e=m("script");e.src="https://static.codepen.io/assets/embed/ei.js",e.async=!0,document.body.append(e)}}var A=class{constructor({onload:e=null,selector:n,cacheLimit:a,transitioningAttribute:r,preserveScroll:f=!1,preserveAttributes:d=!1}={}){n=n||`a[href^='${window.location.origin}']:not([data-no-schwifty]), a[href^='/']:not([data-no-schwifty])`,a=a||85,r=r||"data-schwifty";let T=d===!0;typeof d!="object"&&(d={documentElement:T,head:T,body:T});let $="schwifty-preload",b='link[rel="stylesheet"]',u=document,L=u.documentElement,w="innerHTML",h=new Map,G=new IntersectionObserver((o,l)=>o.forEach(v=>{let x=v.isIntersecting,M=v.target.href;!x&&x!=null||(h.size>=a&&h.delete(h.keys()[0]),h.get(M)?l.unobserve(v.target):U(M))}),{threshold:.5}),I=(o,l=u)=>l.querySelector(o),S=(o,l=u)=>l.querySelectorAll(o),J=o=>o.target.closest(n)||{},R=()=>S(n).forEach(o=>G.observe(o)),g=(o,l=window)=>l.dispatchEvent(new Event(o)),q=o=>o.replace(/m?s/gi,""),P=()=>{let o=getComputedStyle(L);return(q(o.transitionDelay)+q(o.transitionDuration))*1e3},U=o=>{if(!o)return;let l=new XMLHttpRequest;l.onreadystatechange=function(){this.status==200&&h.set(o,l.responseXML)},l.open("GET",o,!0),l.responseType="document",l.send()},_=o=>{let l=h.get(o);if(!l){location=o;return}history.replaceState(null,null,o),S(`${b}:not(.${$})`).forEach(i=>{let c=i.href.replace(location.origin,""),p=I(`${b}.${$}[href="${c}"]`),D=I(`${b}[href="${c}"]`,l);D&&!p&&(i.classList.add($),L.append(i)),!D&&p&&p.remove()});let v=`${b}:not(.${$})`,x=`${b}.${$}`,M=S(v,l),K=S(x);for(let i of K)Array.from(M).some(c=>c.href==i.href)||i.remove();["body","head","documentElement"].forEach(i=>{if(d[i])return;let c=u[i];for(let p of c.attributes)c.removeAttribute(p.name);for(let p of l[i].attributes)c.setAttribute(p.name,p.value)}),L.setAttribute(r,"out"),g("pagehide"),g("unload"),setTimeout(()=>{u.body[w]=l.body[w],u.head[w]=l.head[w],L.setAttribute(r,"in"),g("DOMContentLoaded",u),f||scrollTo(0,0),e&&(e.length?e.map(i=>i()):e()),R(),setTimeout(()=>L.removeAttribute(r),P()),g("load"),g("pageshow")},P())};R(),addEventListener("popstate",()=>_(location.href)),addEventListener("click",o=>{let l=J(o).href;l&&(o.preventDefault(),g("beforeunload"),history.pushState(null,null,location.href),_(l))})}},z=A;function F(){s(`a[href="${location.pathname}"]`).forEach(t=>t.setAttribute("aria-current",!0)),E(),C(),k(),H()}F();try{new z({preserveAttributes:!0,onload:F})}catch(t){console.log(t)}console.log("%cAffectionately built with Ingrid :)",`
		font-family: "Recursive", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Nueue", "Roboto",
		sans-serif;
		font-size: 16px;
		font-weight: bold`);console.log("%chttps://github.com/bradeneast/ingrid","color: dodgerblue");})();
