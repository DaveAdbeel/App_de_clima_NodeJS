import dotenv from "dotenv";
dotenv.config();

import { menu, pause, readInput, placeList } from "./helpers/inquirer.js";
import Searches from "./models/searches.js";

let opt = null;
const searches = new Searches();
searches.readDB();
(async () => {
    do {
        opt = await menu();
        switch (opt) {
            case 1:
                //Show message for write the place
                const city = await readInput("Ciudad:");
                //Search the place
                const cities = await searches.searchCities(city);
                //List the place
                const id = await placeList(cities);
                if (id === 0) continue;
                //Search the place by id
                const selPlace = cities.find((l) => l.id === id);
                //Load in db the place
                searches.addHistory(selPlace.place_name);
                //Weather info with the lat and lon of the place
                const weather = await searches.cityTemp(
                    selPlace.lat,
                    selPlace.lng
                );

                //Show info of the place
                console.clear();
                console.log("\n===============================".green);
                console.log(`   Informacion de la ciudad`.green);
                console.log("===============================\n".green);
                console.log(`${"Ciudad: ".blue} ${selPlace.place_name}`);
                console.log(`${"Lat:".yellow} ${selPlace.lat}`);
                console.log(`${"Lng:".yellow} ${selPlace.lng}`);
                console.log(`${"Temperatura:".dim} ${weather.temp}`);
                console.log(`${"Minima:".cyan} ${weather.temp_min}`);
                console.log(`${"Maxima:".red} ${weather.temp_max}`);
                console.log(`${"Descripcion:".green} ${weather.description}`);
                break;

            case 2:
                console.clear();
                console.log("==============".green);
                console.log("  Historial".green)
                console.log("==============\n".green);
                
                    searches.history.forEach((place, i)=>{
                        const idx = `${i + 1}.`.green;
                        console.log(`${idx} ${place}`);
                    })

            break;
        }

        if (opt) await pause();
    } while (opt);
})();
