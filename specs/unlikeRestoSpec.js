import FavoriteRestoIdb from "../src/scripts/data/favoriteresto-idb";
import * as TestFactories from "./helpers/testFactories";

const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe("Unliking A Movie", () => {
  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestoIdb.putResto({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestoIdb.deleteResto(1);
  });

  it("should display unlike widget when the movie has been liked", async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

    expect(
      document.querySelector('[aria-label="unlike this movie"]')
    ).toBeTruthy();
  });

  it("should not display like widget when the movie has been liked", async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

    expect(
      document.querySelector('[aria-label="like this movie"]')
    ).toBeFalsy();
  });

  it("should be able to remove liked movie from the list", async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

    document
      .querySelector('[aria-label="unlike this movie"]')
      .dispatchEvent(new Event("click"));

    expect(await FavoriteRestoIdb.getAllRestos()).toEqual([]);
  });

  it("should not throw error if the unliked movie is not in the list", async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

    // hapus dulu film dari daftar film yang disukai
    await FavoriteRestoIdb.deleteResto(1);

    // kemudian, simulasikan pengguna menekan widget batal menyukai film
    document
      .querySelector('[aria-label="unlike this movie"]')
      .dispatchEvent(new Event("click"));

    expect(await FavoriteRestoIdb.getAllRestos()).toEqual([]);
  });
});
