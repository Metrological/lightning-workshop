import movies from "./movies.js"

export default class Api {

    static getTopMovies() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(movies);
            }, 500)
        });
    }
}