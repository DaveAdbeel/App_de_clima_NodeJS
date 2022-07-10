import axios from "axios";

class Searches {
    history = [];
    constructor() {
        //Leer DB si existe
    }

    get paramsMapbox() {
        return {
            access_token: process.env.MAPBOX_KEY,
            limit: 7,
            language: "es",
        };
    }
    async searchCity(place = "") {
        //peticion http
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?`,
                params: this.paramsMapbox,
            });

            const response = await instance.get();
            console.log(response.data);
            return response.data;
        } catch (err) {
            console.error(`Error inesperado: ${err}`);
            return [];
        }

        //retorna los lugares que coinciden con la busqueda
    }
}

export default Searches;
