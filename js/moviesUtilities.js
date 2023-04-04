
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
export const getMovies = async () => {
    try {
        let url = `http://localhost:3000/movies`;
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

export const removeMovie = async(movie) => {
    try {
        let url = `http://localhost:3000/favorites/${movie.id}`;
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
    const favorites = await getFavorites()
    renderFavorites(favorites)
}

//renders favorites
export const renderFavorites = async (movies, parent)=> {
    movies.forEach(movie => {
        const element = document.createElement('div');
        if (movie.id === 1) {
            element.classList.add('slide', 'active')
        } else {
            element.classList.add('slide', 'right')
        }
        element.innerHTML = `
        <div class="movie-poster">
                                <div class="image-wrapper">
                                    <img src="${movie.image_url}" alt="scary clown">
                                    <button title="Remove from favorites" class="remove-btn">
                                        <img id="trash" src="images/trashcan-2.webp" alt="trash">
                                    </button>
                                </div>
                                <div class="movie-details">
                                    <strong>${movie.title}</strong>
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
                                    <p>${movie.description}</p>
                                    <div class="card-btns">
                                        <a href="#" class="trailer-btn">Watch Trailer</a>
                                        <a href="#" class="play-btn"><i class="fas fa-play"></i> Play Now</a>
                                    </div>
                                </div>
                            </div>
        `;
        parent.appendChild(element)

        //add event listener
        const removeButton = element.querySelector('.remove-btn');
        removeButton.addEventListener('click', async (event) => {
            event.preventDefault();
            const movieId = movie.id;
            await removeMovie({id: movieId});
            element.remove();
        });
    });
}

export const renderMovies = async (movies, parent) => {
    movies.forEach(movie => {
        const element = document.createElement('div');
        element.classList.add("column")
        element.classList.add("justify-center")
        element.classList.add("align-center")
        element.innerHTML = `
                <div class="grid-image-wrapper">
                    <img src="${movie.image_url}" alt="" class="grid-poster">
                    <div class="grid-btns">
                        <div class="edit-btn">
                            B
                        </div>
                    </div>
                </div>
                <h2>${movie.title}</h2>
        `;
        parent.appendChild(element)
    });
}

// renderCarousel
