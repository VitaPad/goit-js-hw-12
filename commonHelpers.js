import{a as f,S as h,i as d}from"./assets/vendor-5401a4b0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const L="42651911-b9e9cf23b752713c606cec899",b="https://pixabay.com/api/";async function y(o,t){const a=new URLSearchParams({key:L,q:o,image_type:"horizontal",safesearch:"true",orientation:"horizontal",per_page:15,page:t});return(await f.get(`${b}?${a}`)).data}function m(o){const t=document.querySelector(".gallery-container"),a=o.hits.map(r=>`<div class="gallery-item">
    <a class="gallery-link" href="${r.largeImageURL}">
    <img class="gallery-image" src="${r.webformatURL}" alt="${r.tags}">
    </a>
    <div class="gallery-info">
    <p class="gallety-info-item"><span class="gallery-item-text">Likes:</span>${r.likes}</p>
    <p class="gallety-info-item"><span class="gallery-item-text">Views:</span>${r.views}</p>
    <p class="gallety-info-item"><span class="gallery-item-text">Comments:</span>${r.comments}</p>
    <p class="gallety-info-item"><span class="gallery-item-text">Downloads:</span>${r.downloads}</p>
    </div>
      </div>`).join("");t.insertAdjacentHTML("beforeend",a)}const p=document.querySelector(".gallery-container"),u=document.querySelector(".form-input"),v=document.querySelector(".form"),i=document.querySelector(".load-button");let c=1;const S=15,w=Math.ceil(100/S);let n="";i.style.display="none";const g=new h(".gallery-link",{captionsData:"alt",captionDelay:250});function q(){const o=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}v.addEventListener("submit",async function(o){if(o.preventDefault(),p.insertAdjacentHTML("beforeend",'<span class="loader"></span>'),n=u.value.trim(),i.style.display="block",n!=="")try{const t=await y(n,c);m(t),document.querySelector(".loader").remove(),g.refresh(),q()}catch(t){console.log(t)}else i.style.display="none",p.innerHTML="",d.error({title:"Error",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});u.value=""});i.addEventListener("click",async()=>{if(c>w)return d.error({position:"topRight",message:"We're sorry, there are no more posts to load"});try{const o=c+=1,t=await y(n,o);m(t),g.refresh()}catch(o){console.log(o)}});
//# sourceMappingURL=commonHelpers.js.map
