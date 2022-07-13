import {} from "colors";
import inq from "inquirer";

const questions = [
    {
        type: "list",
        name: "option",
        message: "¿Que desea hacer?",
        choices: [
            {
                value: 1,
                name: `${"1.".green} Buscar ciudad`,
            },
            {
                value: 2,
                name: `${"2.".green} Historial`,
            },
            {
                value: 0,
                name: `${"0.".green} Salir`,
            },
        ],
    },
];

const menu = async () => {
    console.clear();
    console.log();
    console.log("==========================".green);
    console.log("  Seleccione una opción".white);
    console.log("==========================\n".green);

    const { option } = await inq.prompt(questions);

    return option;
};

const pause = async () => {
    const question = [
        {
            type: "input",
            name: "enter",
            message: `Presione ${"enter".green} para continuar`,
        },
    ];

    console.log("\n");
    await inq.prompt(question);
};

const readInput = async (message) => {
    const question = [
        {
            type: "input",
            name: "desc",
            message,
            validate(value) {
                if (value.length === 0) {
                    return "Por favor ingrese un valor";
                }
                return true;
            },
        },
    ];

    const { desc } = await inq.prompt(question);
    return desc;
};

const placeList = async (places = []) => {
    const choices = places.map((place, i) => {
        const idx = `${i + 1}.`.green;

        return {
            value: place.id,
            name: `${idx} ${place.place_name}`,
        };
    });
    choices.unshift({
        value: 0,
        name: "0.".green + " Cancelar",
    });

    const questions = [
        {
            type: "list",
            name: "id",
            message: "Seleccione un lugar: \n",
            choices,
        },
    ];

    const { id } = await inq.prompt(questions);
    return id;
};

const confirm = async (message) => {
    const question = [
        {
            type: "confirm",
            name: "ok",
            message,
        },
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
};

const showChecklist = async (tasks = []) => {
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}.`.green;

        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
            checked: task.completadoEn ? true : false,
        };
    });

    const question = [
        {
            type: "checkbox",
            name: "ids",
            message: "Selecciones",
            choices,
        },
    ];

    const { ids } = await inq.prompt(question);
    return ids;
};

export { menu, pause, readInput, placeList, confirm, showChecklist };
