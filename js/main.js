// import {keys} from "./keys.js"
import * as moviesUtils from "./moviesUtilities.js"

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
        await moviesUtils.renderMovie(result, moviesRow);
    });

    // remove a movie
    let removeButtons = document.querySelectorAll('.remove-btn');
    console.log(removeButtons);
    for (let i = 0; i < removeButtons.length; i++){
        removeButtons[i].addEventListener('click', async ()=>{
            confirm('Are you sure you want to delete this movie?')
            console.log([i]);
            console.log(allFavorites[i].id)
            await moviesUtils.removeMovie(allFavorites[i].id);
            let reRenderedFavorites = await moviesUtils.getFavorites();
            await moviesUtils.renderFavorites(reRenderedFavorites, parent);
        });
    }

    let editBtn = document.querySelector('#patch-button')
    editBtn.addEventListener('click', moviesUtils.userPatchSubmit)

})();