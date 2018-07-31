"use strict";var _createClass=function(){function a(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var map,altTags={1:"bustling chinese restaurant",2:"rounded pizza",3:"shiny empty dining area",4:"entrance of a restaurant with neon signs",5:"crowded restaurant with an open view of the kitchen",6:"crowded familly barbacue restaurant",7:"entrance to a burger place",8:"entrance to the dutch with a blossomed tree next to it",9:"people eating ramen noodles",10:"empty restaurant with white bar stools"},DBHelper=function(){function n(){_classCallCheck(this,n)}return _createClass(n,null,[{key:"fetchRestaurants",value:function(t){var a=idb.open("rr-db",1,function(e){e.objectStoreNames.contains("restaurants")||e.createObjectStore("restaurants",{keyPath:"id"}).createIndex("id","id",{unique:!0})});a.then(function(e){return e.transaction("restaurants","readwrite").objectStore("restaurants").getAll()}).then(function(e){navigator.onLine?fetch(n.DATABASE_URL+"/restaurants").then(function(e){return e.json()}).then(function(e){var n=e;n.forEach(function(e){if(e.id&&(e.alt=altTags[e.id]),"false"===e.is_favorite){document.getElementById("favorite-button");console.log("restaurant is faulse "+e.name)}else console.log("Restaurant is true "+e.name)}),a.then(function(e){var t=e.transaction("restaurants","readwrite").objectStore("restaurants");n.forEach(function(e){return t.put(e)})}),t(null,n)}):t(null,e)})}},{key:"fetchRestaurantById",value:function(a,r){n.fetchRestaurants(function(e,t){if(e)r(e,null);else{var n=t.find(function(e){return e.id==a});n?r(null,n):r("Restaurant does not exist",null)}})}},{key:"fetchRestaurantByCuisine",value:function(a,r){n.fetchRestaurants(function(e,t){if(e)r(e,null);else{var n=t.filter(function(e){return e.cuisine_type==a});r(null,n)}})}},{key:"fetchRestaurantByNeighborhood",value:function(a,r){n.fetchRestaurants(function(e,t){if(e)r(e,null);else{var n=t.filter(function(e){return e.neighborhood==a});r(null,n)}})}},{key:"fetchRestaurantByCuisineAndNeighborhood",value:function(a,r,o){n.fetchRestaurants(function(e,t){if(e)o(e,null);else{var n=t;"all"!=a&&(n=n.filter(function(e){return e.cuisine_type==a})),"all"!=r&&(n=n.filter(function(e){return e.neighborhood==r})),o(null,n)}})}},{key:"fetchNeighborhoods",value:function(r){n.fetchRestaurants(function(e,n){if(e)r(e,null);else{var a=n.map(function(e,t){return n[t].neighborhood}),t=a.filter(function(e,t){return a.indexOf(e)==t});r(null,t)}})}},{key:"fetchCuisines",value:function(r){n.fetchRestaurants(function(e,n){if(e)r(e,null);else{var a=n.map(function(e,t){return n[t].cuisine_type}),t=a.filter(function(e,t){return a.indexOf(e)==t});r(null,t)}})}},{key:"urlForRestaurant",value:function(e){return"./restaurant.html?id="+e.id}},{key:"imageUrlForRestaurant",value:function(e){return"img/"+e.id+".webp"}},{key:"smallImageUrlForRestaurant",value:function(e){return"\n     img/"+e.id+"_w_300.webp 300w,\n     img/"+e.id+"_w_433.webp 433w,  \n     img/"+e.id+"_w_653.webp 653w\n    "}},{key:"mapMarkerForRestaurant",value:function(e,t){return new google.maps.Marker({position:e.latlng,title:e.name,url:n.urlForRestaurant(e),map:t,animation:google.maps.Animation.DROP})}},{key:"DATABASE_URL",get:function(){return"http://localhost:1337"}}]),n}(),restaurants=void 0,neighborhoods=void 0,cuisines=void 0,markers=[],dbPromise=idb.open("rr-db",1,function(e){e.objectStoreNames.contains("restaurants")||e.createObjectStore("restaurants",{keyPath:"id"}).createIndex("id","id",{unique:!0})});document.addEventListener("DOMContentLoaded",function(e){fetchNeighborhoods(),fetchCuisines()});var fetchNeighborhoods=function(){DBHelper.fetchNeighborhoods(function(e,t){e?console.error(e):(self.neighborhoods=t,fillNeighborhoodsHTML())})},fillNeighborhoodsHTML=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.neighborhoods,n=document.getElementById("neighborhoods-select");e.forEach(function(e){var t=document.createElement("option");t.innerHTML=e,t.value=e,n.append(t)})},fetchCuisines=function(){DBHelper.fetchCuisines(function(e,t){e?console.error(e):(self.cuisines=t,fillCuisinesHTML())})},fillCuisinesHTML=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.cuisines,n=document.getElementById("cuisines-select");e.forEach(function(e){var t=document.createElement("option");t.innerHTML=e,t.value=e,n.append(t)})},initMap=function(){self.map=new google.maps.Map(document.getElementById("map"),{zoom:12,center:{lat:40.722216,lng:-73.987501},scrollwheel:!1}),updateRestaurants()};document.getElementById("mapButton").addEventListener("click",function(){document.getElementById("map").className="open"});var updateRestaurants=function(){var e=document.getElementById("cuisines-select"),t=document.getElementById("neighborhoods-select"),n=e.selectedIndex,a=t.selectedIndex,r=e[n].value,o=t[a].value;DBHelper.fetchRestaurantByCuisineAndNeighborhood(r,o,function(e,t){e?console.error(e):(resetRestaurants(t),fillRestaurantsHTML())})},resetRestaurants=function(e){self.restaurants=[],document.getElementById("restaurants-list").innerHTML="",self.markers.forEach(function(e){return e.setMap(null)}),self.markers=[],self.restaurants=e},fillRestaurantsHTML=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurants,t=document.getElementById("restaurants-list");e.forEach(function(e){t.append(createRestaurantHTML(e))}),addMarkersToMap()},createRestaurantHTML=function(n){var e=document.createElement("li"),t=document.createElement("button");t.value=n.is_favorite,"false"===t.value||!1===t.value?(t.innerHTML="<img src = img/gray-heart.png alt = 'favorite button image'>",t.setAttribute("Aria-label","Set as favorite")):(t.innerHTML="<img src = img/orange-heart.png>",t.setAttribute("Aria-label","Remove from favorites")),t.onclick=function(){navigator.onLine?"false"===t.value||!1===t.value?(t.value="true",t.setAttribute("Aria-label","Remove from favorites"),fetch("http://localhost:1337/restaurants/"+n.id+"/?is_favorite=true",{method:"PUT"}).then(function(e){return e.json}).then(function(){location.href=location.href})):(t.value="false",t.setAttribute("Aria-label","Set as favorite"),fetch("http://localhost:1337/restaurants/"+n.id+"/?is_favorite=false",{method:"PUT"}).then(function(e){return e.json}).then(function(){location.href=location.href})):"false"===t.value||!1===t.value?(t.value="true",t.setAttribute("Aria-label","Remove from favorites"),fetch("http://localhost:1337/restaurants/"+n.id+"/?is_favorite=true",{method:"PUT"}).then(function(e){return dbPromise.then(function(e){var t=e.transaction("restaurants","readwrite").objectStore("restaurants");n.is_favorite="true",t.put(n)}),e.json}).then(function(){location.href=location.href})):(t.value="false",t.setAttribute("Aria-label","Set as favorite"),fetch("http://localhost:1337/restaurants/"+n.id+"/?is_favorite=false",{method:"PUT"}).then(function(e){return dbPromise.then(function(e){var t=e.transaction("restaurants","readwrite").objectStore("restaurants");n.is_favorite="false",t.put(n)}),e.json}).then(function(){location.href=location.href}))},e.appendChild(t);var a=document.createElement("a");a.href="img/"+n.id+".webp",a.dataset.srcset=DBHelper.smallImageUrlForRestaurant(n),a.className="progressive replace",a.tabIndex="-1";var r=document.createElement("img");r.src="img/preview/"+n.id+".tiny.webp",r.className="preview restaurant-img",r.alt=""+n.alt,e.append(a),a.append(r);var o=document.createElement("h1");o.innerHTML=n.name,e.append(o);var i=document.createElement("p");i.innerHTML=n.neighborhood,e.append(i);var s=document.createElement("p");s.innerHTML=n.address,e.append(s);var u=document.createElement("a");return u.innerHTML="View Details",u.setAttribute("aria-label","View Details about "+n.name),u.href=DBHelper.urlForRestaurant(n),e.append(u),e},addMarkersToMap=function(){(0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurants).forEach(function(e){var t=DBHelper.mapMarkerForRestaurant(e,self.map);google.maps.event.addListener(t,"click",function(){window.location.href=t.url}),self.markers.push(t)})};
//# sourceMappingURL=main.js.map