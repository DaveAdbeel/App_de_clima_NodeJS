import dotenv from "dotenv";
dotenv.config();

import { menu, pause, readInput, placeList } from "./helpers/inquirer.js";
import Searches from "./models/searches.js";

let opt = null;
const searches = new Searches();

(async () => {
    do {
        opt = await menu();
        
        switch (opt) {
            case 1:
                //Mostrar mensaje
                const city = await readInput("Ciudad:");
                const cities = await searches.searchCities(city);
                const id = await placeList(cities);
                if (id === 0) break;
                const selPlace = cities.find(l => l.id === id)
                const weather = await searches.cityTemp(selPlace.lat, selPlace.lng);
                //Buscar lugares
                
                //Seleccionar el lugar

                //Mostrar informacion del lugar
                
                console.log('\n==============================='.green);
                console.log(`   Informacion de la ciudad`.green);
                console.log('===============================\n'.green);
                console.log(`${'Ciudad: '.blue} ${selPlace.place_name}`);
                console.log(`${'Lat:'.yellow} ${selPlace.lat}`);
                console.log(`${'Lng:'.yellow} ${selPlace.lng}`);
                console.log(`${'Temperatura:'.dim} ${weather.temp}`);
                console.log(`${'Minima:'.cyan} ${weather.temp_min}`);
                console.log(`${'Maxima:'.red} ${weather.temp_max}`);
                console.log(`${'Descripcion:'.green} ${weather.description}`);
                break;
                
                case 2:
                    break;
        }

        if (opt) await pause();
    } while (opt);
})();
