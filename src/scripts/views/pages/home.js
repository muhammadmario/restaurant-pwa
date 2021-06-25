import TheRestoDbSource from "../../data/theresto-source";
import {
  createRestoItemTemplate,
  createHeroImage,
} from "../templates/template-creator";

const Home = {
  async render() {
    return `
      <div class="jumbotron" id="jumbotron">
       
      </div>

      <div class="content">
          <h2 class="content__heading">Explore Restaurant</h2>
          <div id="restos" class="restos">
          </div>
      </div>
      `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
    const restos = await TheRestoDbSource.homeResto();
    // console.log(restos);

    const jumbotronContainer = document.querySelector("#jumbotron");
    jumbotronContainer.innerHTML += createHeroImage;

    const restosContainer = document.querySelector("#restos");
    restos.forEach((resto) => {
      restosContainer.innerHTML += createRestoItemTemplate(resto);
    });
  },
};

export default Home;
