import FavoriteRestoIdb from "../../data/favoriteresto-idb";
import {
  createRestoItemTemplate,
  emptyFavorite,
} from "../templates/template-creator";

const Favorite = {
  async render() {
    return `
    <div class="content">
      <div id="restos" class="restos">
      </div>
  </div>`;
  },

  async afterRender() {
    const restos = await FavoriteRestoIdb.getAllRestos();
    // console.log(restos);
    const restosContainer = document.querySelector("#restos");

    if (restos.length > 0) {
      restos.map((resto) => {
        // console.log(resto.name);
        restosContainer.innerHTML += createRestoItemTemplate(resto);
      });
    } else {
      restosContainer.innerHTML += emptyFavorite;
    }
  },
};

export default Favorite;
