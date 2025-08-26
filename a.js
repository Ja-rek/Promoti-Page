function filterCoupons(n,t){if(coupons&&n){const i=document.getElementsByClassName("shop-nav-active");for(const n of i)n.classList.length>0&&n.removeAttribute("class");n.currentTarget.classList.add("shop-nav-active");for(const n of coupons)n.classList.contains("noSortable")||n.classList.add("hide-coupon2")||(n.classList.add("hide-coupon2"),n.classList.remove("show-coupon2")),n.classList.contains(t)||t==="all"||n.classList.contains("noSortable")?n.removeAttribute("style"):n.style.display="none";requestAnimationFrame(()=>{for(const n of coupons)n.classList.contains("hide-coupon2")&&!n.classList.contains("show-coupon2")&&n.classList.add("show-coupon2")})}}function faq(){const n=document.querySelectorAll(".faq > details");n.forEach(t=>{t.addEventListener("click",()=>{n.forEach(n=>{n!==t&&n.removeAttribute("open")})})})}function redirect(n,t){window.open(addOrReplaceHash(window.location.href,n),"_blank");window.location.href=t}function runModal(){const n=getCID();n&&openModal(n)}function addOrReplaceHash(n,t){const i=n.split("#")[0];return`${i}#cid=${t}`}function openModal(n){const i=extractCouponInfo(n),h=!i&&typeof similarCoupons!="undefined"?similarCoupons?.find(t=>t.id==n):undefined,c=!i&&typeof expiredCodes!="undefined"?expiredCodes?.find(t=>t.id==n):undefined,{title:r,description:l,shopName:a,imageUrl:u,code:e,url:o}=i??h??c,{copyCodeToClipboardText:v,copyText:y,goToPageText:p}=promotionModalTranslate,f=document.createElement("div");f.id="overlay";const t=document.createElement("div");t.id="modal";t.className="Paper typography";const s=`
        <button class="close-button" onclick="closeModal()">✖</button>
        <picture>
        <source
            srcset="/img/shop/${u}.webp, /img/shop/${u}-2x.webp 2x"
            type="image/webp"
        />
        <img
            src="/img/shop/${u}.webp"
            alt="${a}"
            loading="lazy"
            width="240"
            height="96"
        />
        </picture>
        <h4>${r}</h4>
        <p>${l}</p>`;t.innerHTML=e?s+`
        <strong>${v}</strong>
        <span id="code">${e}</span>
        <span id="copy-code" class="to-copy" onclick="copyCode()">${y}</span>
        <a class="button" href="${o}" title="${r}" rel="nofollow" target="_blank" >
          ${p}
        </a >`:s+`
        <a class="button" href="${o}" title="${r}" rel="nofollow" target="_blank" >
          Przejdź do strony
        </a >`;f.appendChild(t);document.body.appendChild(f);window.addEventListener("click",closeModalListener)}function getCID(){const n=window.location.hash;return n.includes("cid=")?n.split("cid=")[1]:null}function copyCode(){const n=document.getElementById("copy-code"),t=document.getElementById("code"),{copiedText:i}=promotionModalTranslate;n.className="copied";n.innerText=i;navigator.clipboard.writeText(t.textContent)}function closeModal(){const n=document.getElementById("overlay");n&&n.remove();window.removeEventListener("click",closeModalListener)}function closeModalListener(n){n.target.id==="overlay"&&closeModal()}function extractCouponInfo(n){const t=document.getElementById(n);if(!t)return undefined;const i=t.querySelector("h2").textContent.trim(),r=t.querySelector(".text-body").textContent.trim(),u=t.querySelector("img").getAttribute("alt"),f=t.dataset.code,e=t.dataset.url,o=t.dataset.img;return{title:i,description:r,shopName:u,imageUrl:o,code:f,url:e}}function goBackOrRedirect(){console.log("goBackOrRedirect");document.referrer?history.back():window.location.href="../"}async function loadExpiredCodes(n){await loadCoupons(n,expiredCodes,"expired",!0,expiredCodesPageCount);expiredCodesPageCount+=1}async function loadSimilarCoupons(n){await loadCoupons(n,similarCoupons,"similar",!1,similarCouponsPageCount);similarCouponsPageCount+=1}async function loadCoupons(n,t,i,r,u){const f=4,e=(u-1)*f,s=e+f,h=t.slice(e,s),c=renderCoupons(h,"coupon-medium",r,!1),o=document.getElementById(i);o.innerHTML+=c;requestAnimationFrame(()=>{const n=o.getElementsByClassName("hide-coupon");for(const t of n)t.classList.contains("hide-coupon")&&!t.classList.contains("show-coupon")&&t.classList.add("show-coupon")});const l=t.length/f;u+1>l&&(n.target.style.display="none")}function renderCoupons(n,t,i,r){return n.map(n=>`
      <div class="paper coupon ${t} ${r?n.promotionType.toLowerCase():"noSortable"} hide-coupon">
        ${renderCouponLogo(n,i)}
        <div class="coupon-content">
          ${i?"":`<span>${n.promotionTypeFormated} ${n.discount??""}</span>`}
          <h2>${n.title}</h2>
          <p class="text-body">${n.description??""}</p>
          ${renderCouponFooter(n)}
        </div>
      </div>
    `).join("")}function renderCouponLogo(n,t){return t?`
      <div class="coupon-logo">
        ${n.discount?`<span class="coupon-discount">${n.discount}</span>`:`<span class="coupon-discount"><img src="/img/${n.icon}.svg" alt="${n.icon}" width="40" height="40" /></span>`}
        <span class="coupon-type">${n.promotionTypeFormated}</span>
      </div>
    `:`
      <div class="coupon-logo">
        <a href="${n.shopRouting}">
          <picture>
            <source srcset="/public/images/${n.imageUrl}.webp, /public/images/${n.imageUrl}-2x.webp 2x" type="image/webp">
            <img src="/public/images/${n.imageUrl}.webp" alt="${n.name}" loading="lazy" width="284" height="284">
          </picture>
        </a>
      </div>
    `}function renderCouponFooter(n){return`
    <div class="coupon-footer">
      <time datetime="${n.dateTo}">
        <img src="/img/clock.svg" width="14" height="14" alt="time" />
        ${n.validUntil}: ${n.dateToFormated}
      </time>
      ${n.isCode?`<button onclick="redirect(${n.id}, '${n.url}')">${n.button}</button>`:`<button onclick="promoRedirect('${n.url}')">${n.button}</button>`}
    </div>
  `}function handleMouseEnterMenu(){var n=topMenuList.classList;n.contains("active")?n.remove("active"):n.add("active")}function handleSearchClick(){var n=searchContainer.classList;n.contains("active")?n.remove("active"):n.add("active")}function handleToggleSubmenu(n,t){n&&t&&(t.classList.toggle("active-submenu-button"),n.classList.toggle("active-submenu"))}function searchRedirect(n,t,i){const r=document.getElementById("search"),u=r.value;if(u){const u=findShop(r.value,t,n)[0];u&&(window.location.href=toRoutingLink(u[0],i))}}function updateSearchHints({target:t,key:n},i,r,u){n=="Enter"&&searchRedirect(i,r,u);const f="search-hints",e=document.getElementById(f);e&&e.remove();const o=document.getElementById("search-cancel"),s=document.getElementById("search-goto"),h=t.value;if(h){o.classList.add("active");s.classList.add("active");cover.classList.add("active");const n=findShop(h,r,i);if(n.length>0){const t=document.createElement("a");t.id=f;searchWrap.append(t);for(const i of n)t.innerHTML+=searchItem(i[0],u,i[2])}}else o.classList.remove("active"),s.classList.remove("active"),cover.classList.remove("active")}function findShop(n,t,i){return n.trim().length===0?[]:i.filter(i=>i[1]===t&&i[0].toLowerCase().includes(n.toLowerCase().trim())).slice(0,36)}function clearSearch(){const n=document.getElementById("search-hints");n&&n.remove();const t=document.getElementById("search");t&&(t.value="");const i=document.getElementById("search-cancel");i&&i.classList.remove("active");const r=document.getElementById("search-goto");r&&r.classList.remove("active");cover&&cover.classList.remove("active")}function toRoutingPicture(n){return`/img/shop/${toHttp(n)}.webp`}function toRoutingLink(n,t){return`${t}${toHttp(n)}/`}function toHttp(n){const t=unidecode(n),i=t.replace(/ /g,"-"),r=i.replace(/[^a-zA-Z0-9\/\-]/g,"");return r.toLowerCase()}function unidecode(n){return removeDiacritics(n)}function removeDiacritics(n){return n.replace(/[^\u0000-\u007e]/g,function(n){return diacriticsMap[n]||n})}function promoRedirect(n){window.open(n,"_blank")}var expiredCodesPageCount,similarCouponsPageCount,cover,replacementList,diacriticsMap,i,chars,j;const coupons=document.getElementsByClassName("coupon");runModal();expiredCodesPageCount=1;similarCouponsPageCount=1;cover=document.getElementById("cover");const topMenuList=document.getElementById("top-menu-list"),searchWrap=document.getElementById("search-wrap"),searchContainer=document.getElementById("search-container"),menuButton=document.getElementById("menu-button"),searchButton=document.getElementById("search-button");menuButton.addEventListener("click",handleMouseEnterMenu);searchButton.addEventListener("click",handleSearchClick);const topMenuItems=Array.from(document.getElementsByClassName("top-menu__li"));topMenuItems.forEach(n=>{const i=n.getAttribute("data-target"),t=document.getElementById(i);t&&n.addEventListener("click",()=>handleToggleSubmenu(t,n))});document.addEventListener("click",function(n){const t=document.getElementById("search-wrap");if(!t.contains(n.target)){const n=document.getElementById("search-hints");n&&n.remove();cover&&cover.classList.remove("active")}});const searchItem=(n,t,i)=>`
<a href="${toRoutingLink(n,t)}">
  <picture>
    <source srcset="
        ${toRoutingPicture(n)},
        ${toRoutingPicture(`${n}-2x`)} 2x
      " type="image/webp">
    <img src="${toRoutingPicture(n)}" alt="name" loading="lazy" width="240" height="96">
  </picture>
  <div>
      <span>${n}</span>
      <span class="offers">${i} dostępnych offert</span>
  </div>
</a>
`;for(replacementList=[{base:" ",chars:" "},{base:"0",chars:"߀"},{base:"A",chars:"ⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ"},{base:"AA",chars:"Ꜳ"},{base:"AE",chars:"ÆǼǢ"},{base:"AO",chars:"Ꜵ"},{base:"AU",chars:"Ꜷ"},{base:"AV",chars:"ꜸꜺ"},{base:"AY",chars:"Ꜽ"},{base:"B",chars:"ⒷＢḂḄḆɃƁ"},{base:"C",chars:"ⒸＣꜾḈĆCĈĊČÇƇȻ"},{base:"D",chars:"ⒹＤḊĎḌḐḒḎĐƊƉᴅꝹ"},{base:"Dh",chars:"Ð"},{base:"DZ",chars:"ǱǄ"},{base:"Dz",chars:"ǲǅ"},{base:"E",chars:"ɛⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚƐƎᴇ"},{base:"F",chars:"ꝼⒻＦḞƑꝻ"},{base:"G",chars:"ⒼＧǴĜḠĞĠǦĢǤƓꞠꝽꝾɢ"},{base:"H",chars:"ⒽＨĤḢḦȞḤḨḪĦⱧⱵꞍ"},{base:"I",chars:"ⒾＩÌÍÎĨĪĬİÏḮỈǏȈȊỊĮḬƗ"},{base:"J",chars:"ⒿＪĴɈȷ"},{base:"K",chars:"ⓀＫḰǨḲĶḴƘⱩꝀꝂꝄꞢ"},{base:"L",chars:"ⓁＬĿĹĽḶḸĻḼḺŁȽⱢⱠꝈꝆꞀ"},{base:"LJ",chars:"Ǉ"},{base:"Lj",chars:"ǈ"},{base:"M",chars:"ⓂＭḾṀṂⱮƜϻ"},{base:"N",chars:"ꞤȠⓃＮǸŃÑṄŇṆŅṊṈƝꞐᴎ"},{base:"NJ",chars:"Ǌ"},{base:"Nj",chars:"ǋ"},{base:"O",chars:"ⓄＯÒÓÔỒỐỖỔÕṌȬṎŌṐṒŎȮȰÖȪỎŐǑȌȎƠỜỚỠỞỢỌỘǪǬØǾƆƟꝊꝌ"},{base:"OE",chars:"Œ"},{base:"OI",chars:"Ƣ"},{base:"OO",chars:"Ꝏ"},{base:"OU",chars:"Ȣ"},{base:"P",chars:"ⓅＰṔṖƤⱣꝐꝒꝔ"},{base:"Q",chars:"ⓆＱꝖꝘɊ"},{base:"R",chars:"ⓇＲŔṘŘȐȒṚṜŖṞɌⱤꝚꞦꞂ"},{base:"S",chars:"ⓈＳẞŚṤŜṠŠṦṢṨȘŞⱾꞨꞄ"},{base:"T",chars:"ⓉＴṪŤṬȚŢṰṮŦƬƮȾꞆ"},{base:"Th",chars:"Þ"},{base:"TZ",chars:"Ꜩ"},{base:"U",chars:"ⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄ"},{base:"V",chars:"ⓋＶṼṾƲꝞɅ"},{base:"VY",chars:"Ꝡ"},{base:"W",chars:"ⓌＷẀẂŴẆẄẈⱲ"},{base:"X",chars:"ⓍＸẊẌ"},{base:"Y",chars:"ⓎＹỲÝŶỸȲẎŸỶỴƳɎỾ"},{base:"Z",chars:"ⓏＺŹẐŻŽẒẔƵȤⱿⱫꝢ"},{base:"a",chars:"ⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐɑ"},{base:"aa",chars:"ꜳ"},{base:"ae",chars:"æǽǣ"},{base:"ao",chars:"ꜵ"},{base:"au",chars:"ꜷ"},{base:"av",chars:"ꜹꜻ"},{base:"ay",chars:"ꜽ"},{base:"b",chars:"ⓑｂḃḅḇƀƃɓƂ"},{base:"c",chars:"ｃⓒćĉċčçḉƈȼꜿↄ"},{base:"d",chars:"ⓓｄḋďḍḑḓḏđƌɖɗƋᏧԁꞪ"},{base:"dh",chars:"ð"},{base:"dz",chars:"ǳǆ"},{base:"e",chars:"ⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇǝ"},{base:"f",chars:"ⓕｆḟƒ"},{base:"ff",chars:"ﬀ"},{base:"fi",chars:"ﬁ"},{base:"fl",chars:"ﬂ"},{base:"ffi",chars:"ﬃ"},{base:"ffl",chars:"ﬄ"},{base:"g",chars:"ⓖｇǵĝḡğġǧģǥɠꞡꝿᵹ"},{base:"h",chars:"ⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ"},{base:"hv",chars:"ƕ"},{base:"i",chars:"ⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı"},{base:"j",chars:"ⓙｊĵǰɉ"},{base:"k",chars:"ⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ"},{base:"l",chars:"ⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇɭ"},{base:"lj",chars:"ǉ"},{base:"m",chars:"ⓜｍḿṁṃɱɯ"},{base:"n",chars:"ⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥлԉ"},{base:"nj",chars:"ǌ"},{base:"o",chars:"ⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿꝋꝍɵɔᴑ"},{base:"oe",chars:"œ"},{base:"oi",chars:"ƣ"},{base:"oo",chars:"ꝏ"},{base:"ou",chars:"ȣ"},{base:"p",chars:"ⓟｐṕṗƥᵽꝑꝓꝕρ"},{base:"q",chars:"ⓠｑɋꝗꝙ"},{base:"r",chars:"ⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ"},{base:"s",chars:"ⓢｓśṥŝṡšṧṣṩșşȿꞩꞅẛʂ"},{base:"ss",chars:"ß"},{base:"t",chars:"ⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ"},{base:"th",chars:"þ"},{base:"tz",chars:"ꜩ"},{base:"u",chars:"ⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ"},{base:"v",chars:"ⓥｖṽṿʋꝟʌ"},{base:"vy",chars:"ꝡ"},{base:"w",chars:"ⓦｗẁẃŵẇẅẘẉⱳ"},{base:"x",chars:"ⓧｘẋẍ"},{base:"y",chars:"ⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ"},{base:"z",chars:"ⓩｚźẑżžẓẕƶȥɀⱬꝣ"}],diacriticsMap={},i=0;i<replacementList.length;i+=1)for(chars=replacementList[i].chars,j=0;j<chars.length;j+=1)diacriticsMap[chars[j]]=replacementList[i].base;const ratingdiv=document.getElementById("rating");if(ratingdiv){const t=ratingdiv.getAttribute("data-shopId")??0,i=ratingdiv.getAttribute("data-flyerShopId")??0,r=document.querySelectorAll(".rating > span"),u=document.getElementById("rating-value"),f=document.getElementById("rating-votes"),e=`Rating-${t}-${i}`,n=JSON.parse(localStorage.getItem(e));n&&(r.forEach(t=>{(t.getAttribute("data-value")<=n?.average??0)&&t.classList.add("selected")}),ratingdiv.classList.add("rating-selected"),u.innerText=n?.average??0,f.innerText=n?.count??0);r.forEach(o=>{o.addEventListener("click",async()=>{if(!n){const s=o.getAttribute("data-value")??0,h=await fetch(`https://promoti.co/api/rating/average/${t}/${i}/${s}`),n=await h.json();localStorage.setItem(e,JSON.stringify(n));try{const n=await fetch("https://promoti.co/api/rating",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({value:s,shopId:t,flyerShopId:i})});n.ok||console.error("Failed to send rating:",n.statusText)}catch(c){console.error("Error sending rating:",c)}r.forEach(t=>{t.getAttribute("data-value")<=n.average?t.classList.add("selected"):t.classList.remove("selected")});ratingdiv.classList.add("rating-selected");u.innerText=n.average;f.innerText=n.count}})})}