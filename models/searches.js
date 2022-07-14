import { writeFileSync as writeFS, readFileSync as readFS } from "fs";
import axios from "axios";

class Searches {
    history = [];
    dbPath = "./db/database.json";
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
            console.log("\n Buscando lugares... ");
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?`,
                params: this.paramsMapbox,
            });

            const response = await instance.get();
            console.clear();
            console.log("====================================".green);
            console.log(" Lugares encontrados con exito!!".green);
            console.log("====================================".green);
            console.log("");

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
            console.log("\nObteniendo datos del clima...".green);
            const { data } = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_KEY}&lang=es&units=metric`
            );
            const { temp, temp_min, temp_max } = data.main;

            let { description } = data.weather[0];

            description =
                description.charAt(0).toUpperCase() + description.slice(1);

            return { temp, temp_min, temp_max, description };
        } catch (err) {
            throw console.error(err);
        }
    }

    addHistory(place) {
        //Add to array history
        if (this.history.length !== 7) {
            if (!this.history.includes(place)) {
                this.history.unshift(place);
                // Load array in DB
                this.loadDB();
            }
        }else{
            if (!this.history.includes(place)) {
                this.history.pop();
                this.history.unshift(place)
                // Load array in DB
                this.loadDB();
            }
        }
    }
    loadDB() {
        const payload = {
            history: this.history,
        };
        writeFS(this.dbPath, JSON.stringify(payload));
    }
    readDB() {
        let data = readFS(this.dbPath, "utf-8");
        data = JSON.parse(data);

        this.history = data.history
    }
}

export default Searches;
