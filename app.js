import dotenv from "dotenv";
dotenv.config();

import { menu, pause, readInput } from "./helpers/inquirer.js";
import Searches from "./models/searches.js";

let opt = null;
const searches = new Searches();

(async () => {
    do {
        opt = await menu();
        
        switch (opt) {
            case 1:
                //Mostrar mensaje
                const place = await readInput("Ciudad:");
                const city = await searches.searchCity(place);
                //Buscar lugares
                
                //Seleccionar el lugar

                //Mostrar informacion del lugar
                
                console.log(`\nInformacion de la ciudad\n`.green);
                console.log(`Ciudad:`);
                console.log(`Lat:`);
                console.log(`Lng:`);
                console.log(`Temperatura:`);
                console.log(`Minima:`);
                console.log(`Maxima:`);
                break;
                
                case 2:
                    break;
        }

        if (opt) await pause();
    } while (opt);
})();
