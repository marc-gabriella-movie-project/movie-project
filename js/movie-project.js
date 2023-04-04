// import {keys} from "./keys.js"
import * as moviesUtils from "./moviesUtilities.js"

(async()=> {
    let allFavorites = await moviesUtils.getFavorites();
    console.log(allFavorites);


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
        console.log(result)
    });

    // remove a movie from favorites database


})();