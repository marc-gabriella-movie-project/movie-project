import {keys} from "./keys.js"
import * as favorites from "./moviesDatabase.js"

(async()=> {
    let allFavorites = await favorites.getFavorites();
    console.log(allFavorites)
})();