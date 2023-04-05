// import {keys} from "./keys.js"
import * as moviesUtils from "./moviesUtilities.js"
import {
    getFavorites,
    removeMovie,
    renderFavorites,
    renderMovie,
    renderMovies,
    userPatchSubmit
} from "./moviesUtilities.js";

(async()=> {

    // favorites
    let allFavorites = await moviesUtils.getFavorites();
    console.log(allFavorites);
    let parent = document.querySelector(".slide-mask")
    await moviesUtils.renderFavorites(allFavorites, parent)

    // all movies
    let allMovies = await moviesUtils.getMovies();
    let moviesRow = document.querySelector('#grid-row')
    await moviesUtils.renderMovies(allMovies, moviesRow)

    await moviesUtils.removeFromFavorites(allFavorites,parent)

    // add a movie
    document.querySelector('#add-movie-btn').addEventListener('click', async function(event){
        const title = document.querySelector('#title').value;
        const genre = document.querySelector('#genre').value;
        const description = document.querySelector('#movie-description').value;
        const radioButtons = document.querySelectorAll('input[name="rating"]');
        let rating;
        // console.log(radioButtons);
        for (let i = 0; i < radioButtons.length; i++){
            if (radioButtons[i].checked) {
                rating = radioButtons[i].value;
                console.log(radioButtons[i].value);
            }
        }
        let movieData = {
            title,
            genre,
            rating,
            description
        };
        let result = await moviesUtils.setMovie(movieData);
        await renderMovie(result, moviesRow);
    });

    // remove a movie
    document.querySelector('.remove-btn').addEventListener('click',async function (e){
        console.log(e);
        await moviesUtils.removeMovie()
    });

    let editBtn = document.querySelector('#patch-button')
    editBtn.addEventListener('click', userPatchSubmit)

})();