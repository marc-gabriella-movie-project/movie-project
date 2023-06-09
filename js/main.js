// import {keys} from "./keys.js"
import * as moviesUtils from "./moviesUtilities.js"

(async()=> {

    // grab favorite movies and render them onto page
    let allFavorites = await moviesUtils.getFavorites();
    let parent = document.querySelector(".slide-mask")
    await moviesUtils.renderFavorites(allFavorites, parent)

    // grab all movies and render them onto page
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
        for (let i = 0; i < radioButtons.length; i++){
            if (radioButtons[i].checked) {
                rating = radioButtons[i].value;
            }
        }
        let movieData = {
            title,
            genre,
            image_url: "images/no_Image_Available.jpg",
            rating,
            description
        };
        let result = await moviesUtils.setMovie(movieData);
        await moviesUtils.renderMovie(result, moviesRow);
    });

    // remove a movie
    let removeButtons = document.querySelectorAll('.remove-btn');
    for (let i = 0; i < removeButtons.length; i++){
        removeButtons[i].addEventListener('click', async ()=>{
            confirm('Are you sure you want to delete this movie?')
            await moviesUtils.removeMovie(allFavorites[i].id);
            parent.innerHTML = ``
            let reRenderedFavorites = await moviesUtils.getFavorites();
            await moviesUtils.renderFavorites(reRenderedFavorites, parent);
        });
    }

    // edit a movie (unfinished)
    let editBtn = document.querySelector('#patch-button')
    editBtn.addEventListener('click', moviesUtils.userPatchSubmit)
})();