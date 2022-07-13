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
    async searchCities(place = "") {
        //peticion http
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?`,
                params: this.paramsMapbox,
            });

            const response = await instance.get();

            return response.data.features.map(({ id, place_name, center }) => ({
                id,
                place_name,
                lng: center[0],
                lat: center[1],
            }));
        } catch (err) {
            console.error(`Error inesperado: ${err}`);
            return [];
        }

        //retorna los lugares que coinciden con la busqueda
    }

    async cityTemp(lat, lon) {
        try {
            const { data } = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_KEY}&lang=es&units=metric`
            );
            const { temp, temp_min, temp_max } = data.main;
            let { description } = data.weather[0];
            description = description.charAt(0).toUpperCase() + description.slice(1);
            return { temp, temp_min, temp_max, description };
        } catch (err) {
            throw console.error(err);
        }
    }
}
export default Searches;
