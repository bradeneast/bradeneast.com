(() => {
  // src\_js\utils.js
  let $ = (selector, context = document) => context.querySelector(selector);
  let $$ = (selector, context = document) => context.querySelectorAll(selector);
  let elem = (tagName, content = "") => {
    let tag = document.createElement(tagName);
    tag.innerHTML = content;
    return tag;
  };
  function altFromSrc(src) {
    var _a, _b;
    let decoded = decodeURIComponent(src) || "";
    let name = decoded.split("/").pop();
    let result = (_b = (_a = name == null ? void 0 : name.split(".")) == null ? void 0 : _a.shift()) == null ? void 0 : _b.replace(/-|\+/g, " ");
    return result || "";
  }
  function getSitemap(callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.status == 200 && xhttp.responseXML)
        callback(xhttp.responseXML);
    };
    xhttp.responseType = "document";
    xhttp.open("GET", "/sitemap.xml", true);
    xhttp.send();
  }

  // src\_js\search.js
  let resultContainer = $(".results");
  let inputThrottle;
  let sitemap;
  $('input[type="search"]').addEventListener("input", (event) => {
    clearTimeout(inputThrottle);
    inputThrottle = setTimeout(() => handleSearch(event), 200);
  });
  function searchSite(query, callback) {
    function processSitemap(sitemap2) {
      let locs = Array.from($$("loc", sitemap2));
      let results = locs.map((loc) => {
        let url = loc.textContent.trim();
        return {
          absolute: url,
          relative: url.split("/").pop()
        };
      });
      let filteredResults = results.filter((url) => new RegExp(query, "i").test(altFromSrc(url.relative)) && url.relative.length > 1);
      callback([...new Set(filteredResults)]);
    }
    sitemap ? processSitemap(sitemap) : getSitemap((xmlDoc) => {
      sitemap = xmlDoc;
      processSitemap(sitemap);
    });
  }
  function handleSearch(event) {
    let value = event.target.value;
    searchSite(value, (results) => {
      resultContainer.innerHTML = "";
      if (!value.trim().length)
        return;
      for (let result of results) {
        let a = elem("a");
        let h2 = elem("h2");
        let li = elem("li");
        a.innerText = altFromSrc(result.relative);
        a.href = result.absolute;
        a.setAttribute("data-no-schwifty", 1);
        h2.append(a);
        li.append(h2);
        resultContainer.append(li);
      }
    });
  }
})();
