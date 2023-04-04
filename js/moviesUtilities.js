// getters
export const getFavorites = async () => {
    try {
        let url = `http://localhost:3000/favorites`;
        let response = await fetch(url);
        let data = await response.json();
        return data;
    } catch(error){
        console.log(error);
    }
};

export const getFavoritesByID = async (id) => {
    try {
        let url = `http://localhost:3000/favorites/${id}`;
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        }
        let response = await fetch(url, options);
        let data = await response.json();
        return data;
    } catch(error){
        console.log(error);
    }
}

export const searchFavorite = async(movie) => {
    let favorites = await getFavorites();
    if (movie.title) {
        let favorite = favorites.find((result) => {
            return  movie.title === result.title;
        });
        if (favorite){
            return favorite;
        } else {
            return 'No movie was found with that title';
        }
    } else if(movie.genre) {
        let favoritesFiltered = favorites.filter((result) => {
            return movie.genre === result. genre
        });
        if (favoritesFiltered.length > 0) {
            return favoritesFiltered;
        } else {
            return 'No movies were found with that genre'
        }
    }
}

//setters
export const setMovie = async (movie) => {
    try {
        let url = `http://localhost:3000/movies`;
        let options = {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(movie)
        };
        let response = await fetch(url, options);
        let data = await response.json();
        return data;
    } catch(error){
        console.log(error);
    }
}

export const patchFavorite = async (id, movie) => {
    try {
        if (!id) {
            throw new Error('You must provide an id');
        }
        let url = `http://localhost:3000/favorites/${id}`;
        let options = {
            method: "PATCH",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(movie)
        };
        let response = await fetch(url, options);
        let data = await response.json();
        return data;
    } catch(error){
        console.log(error);
    }
}

export const removeMovie = async(id) => {
    try {
        if (!id) {
            throw new Error('You must provide an id');
        }
        let url = `http://localhost:3000/favorites/${id}`;
        let options = {
            method: "DELETE",
            headers: {
                "Content-Type":"application/json"
            }
        };
        let response = await fetch(url, options);
        let data = await response.json();
        return data;
    } catch(error){
        console.log(error);
    }
}
//renders favorites
export const renderFavorites = async ()=>{
    const element = document.createElement('div');
    element.classList.add('movie-poster');
    element.innerHTML =
        `<div class="image-wrapper">
            <img src=${} alt="scary clown">
        </div>
        <div class="movie-details">
            <strong>IT Chapter Two (2019)</strong>
            <div class="rating">
                <!--star-->
                <a href="#">
                    <i class="fas fa-star"></i>
                </a>
                <!--star-->
                <a href="#">
                    <i class="fas fa-star"></i>
                </a>
                <!--star-->
                <a href="#">
                    <i class="fas fa-star"></i>
                </a>
                <!--star-->
                <a href="#">
                    <i class="fas fa-star"></i>
                </a>
                <!-- empty star-->
                <a href="#">
                    <i class="far fa-star"></i>
                </a>
            </div>
            <!--movie details in depth-->
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad animi aperiam, beatae debitis distinctio harum necessitatibus neque provident quo reiciendis repellat sunt tempora unde! Commodi facere illum iure totam vel!</p>
            <div class="card-btns">
                <a href="#" class="trailer-btn">Watch Trailer</a>
                <a href="#" class="play-btn"><i class="fas fa-play"></i> Play Now</a>
            </div> `
}


// renderCarousel
