"use strict";const searchInput=document.querySelector(".js-inputSearch"),searchButton=document.querySelector(".js-button"),resultsList=document.querySelector(".js-resultsList"),favourites=document.querySelector(".js-favourites"),resultsContainer=document.querySelector(".js-resultsContainer"),clearAllFav=document.querySelector(".js-clearFavourites"),closeFavs=document.querySelector(".js-closeFav"),asideFavs=document.querySelector(".js-aside"),openFavs=document.querySelector(".js-favButton"),moreButton=document.querySelector(".js-moreButton"),themeButton=document.querySelector(".js-themeButton"),pageBody=document.querySelector(".body");let favouriteSeries=[],searchSeries=[];function getAndRenderFavourites(){if(localStorage.getItem("favourite")){let e=JSON.parse(localStorage.getItem("favourite"));for(const t of e)favouriteSeries.push(t);renderFavourites()}}function getSeries(){searchSeries=[];const e=searchInput.value;fetch("//api.tvmaze.com/search/shows?q="+e).then(e=>e.json()).then(e=>{cleanApiData(e),renderResults()})}function cleanApiData(e){for(const t of e){const e={};e.name=t.show.name,e.id=t.show.id,null!==t.show.image?e.image=t.show.image.original:e.image="../assets/images/image.png",searchSeries.push(e)}}function renderResults(){resultsContainer.classList.remove("js-hidden"),searchInput.value="",resultsList.innerHTML="";for(let e=0;e<searchSeries.length;e++){let t=document.createElement("li"),s=document.createElement("h3"),i=document.createElement("img"),a=document.createElement("button");resultsList.appendChild(t),t.appendChild(s),t.appendChild(i),t.appendChild(a),t.tabIndex="5",t.classList.add("js-result-item"),s.classList.add("main__result-item-title"),t.classList.add("main__result-item"),i.classList.add("main__result-item-pic"),a.classList.add("main__result-item-button"),t.id=e,a.title="Añadir a favoritos",t.setAttribute("data",searchSeries[e].id),i.src=searchSeries[e].image,i.title=searchSeries[e].name,i.alt=searchSeries[e].name;let r=document.createTextNode(searchSeries[e].name);s.appendChild(r);for(const s of favouriteSeries)s.id===searchSeries[e].id&&(a.title="Eliminar de favoritos",a.classList.add("js-selectedButton"),t.classList.add("js-selected"),t.classList.remove("js-result-item"),t.classList.add("js-resultFav-item"))}listenResults(),listenFavResult()}function changeEnterAction(e){13===e.keyCode&&(e.preventDefault(),searchButton.click())}function addToFavourites(e){let t=e.currentTarget.id;if(-1!==favouriteSeries.indexOf(searchSeries[t])){let e=favouriteSeries.indexOf(searchSeries[t]);favouriteSeries.splice(e,1)}else favouriteSeries.push(searchSeries[t]);renderResults(),renderFavourites(),saveInLocalStorage()}function saveInLocalStorage(){localStorage.setItem("favourite",JSON.stringify(favouriteSeries))}function renderFavourites(){favourites.innerHTML="",asideFavs.classList.remove("js-hidden");for(let e=0;e<favouriteSeries.length;e++){let t=document.createElement("li"),s=document.createElement("h3"),i=document.createElement("img"),a=document.createElement("button");favourites.appendChild(t),t.appendChild(s),t.appendChild(i),t.appendChild(a),t.tabIndex="6",s.classList.add("aside__favourites-item-title"),t.classList.add("js-favourite-item"),t.classList.add("aside__favourites-item"),i.classList.add("aside__favourites-item-pic"),a.classList.add("aside__favourites-item-button"),t.id=e,a.title="Eliminar de favoritos",i.src=favouriteSeries[e].image,i.title=favouriteSeries[e].name,i.alt=favouriteSeries[e].name;let r=document.createTextNode(favouriteSeries[e].name);s.appendChild(r)}favouriteSeries.length<=2&&favourites.classList.add("js-showMore"),listenFavourites()}function listenEnterKeyFav(e){13===e.keyCode&&e.currentTarget.click()}function listenResults(){const e=document.querySelectorAll(".js-result-item");for(const t of e)t.addEventListener("click",addToFavourites),t.addEventListener("keyup",listenEnterKeyFav)}function removeFromFavourites(e){let t=e.currentTarget.id;favouriteSeries.splice(t,1),saveInLocalStorage(),renderFavourites(),renderResults()}function listenFavourites(){const e=document.querySelectorAll(".js-favourite-item");for(const t of e)t.addEventListener("click",removeFromFavourites),t.addEventListener("keyup",listenEnterKeyFav)}function removeFavResult(e){let t=e.currentTarget.getAttribute("data");for(const e of favouriteSeries)if(console.log(e.id),console.log(t),e.id==t){let t=favouriteSeries.indexOf(e);favouriteSeries.splice(t,1)}saveInLocalStorage(),renderFavourites(),renderResults()}function listenFavResult(){const e=document.querySelectorAll(".js-resultFav-item");for(const t of e)t.addEventListener("click",removeFavResult),t.addEventListener("keyup",listenEnterKeyFav)}function clearFavourites(){favouriteSeries=[],saveInLocalStorage(),renderFavourites(),renderResults()}function showBigTV(){resultsContainer.classList.add("js-hidden")}function closeAsideFav(){asideFavs.classList.add("js-hidden")}function openAsideFav(){asideFavs.classList.remove("js-hidden")}function showMoreFavs(){favourites.classList.toggle("js-showMore"),favourites.classList.contains("js-showMore")?moreButton.title="Mostrar menos favoritos":moreButton.title="Mostrar todos los favoritos"}function changeTheme(){pageBody.classList.toggle("js-body"),pageBody.classList.contains("js-body")?themeButton.title="Cambiar a paleta original":themeButton.title="Cambiar a paleta de alto contraste"}getAndRenderFavourites(),searchButton.addEventListener("click",getSeries),searchInput.addEventListener("keydown",changeEnterAction),clearAllFav.addEventListener("click",clearFavourites),searchInput.addEventListener("click",showBigTV),closeFavs.addEventListener("click",closeAsideFav),openFavs.addEventListener("click",openAsideFav),moreButton.addEventListener("click",showMoreFavs),themeButton.addEventListener("click",changeTheme);