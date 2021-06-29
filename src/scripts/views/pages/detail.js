import UrlParser from "../../routes/url-parser";
import TheRestoDbSource from "../../data/theresto-source";
import { createRestoDetailTemplate } from "../templates/template-creator";
import LikeButtonPresenter from "../../utils/like-button-presenter";
import FavoriteRestoIdb from "../../data/favoriteresto-idb";

const Detail = {
  async render() {
    return `
        <div id="restos-detail" class="restos-detail"></div>
        <div id="likeButtonContainer"></div>
      `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const resto = await TheRestoDbSource.detailResto(url.id);
    // console.log(resto);

    const restoContainer = document.querySelector("#restos-detail");
    restoContainer.innerHTML = createRestoDetailTemplate(resto);

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      favoriteRestos: FavoriteRestoIdb,
      resto: {
        id: resto.restaurant.id,
        name: resto.restaurant.name,
        description: resto.restaurant.description,
        pictureId: resto.restaurant.pictureId,
        rating: resto.restaurant.rating,
        city: resto.restaurant.city,
      },
    });
  },
};

export default Detail;
