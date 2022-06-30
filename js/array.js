/* -------- REASON ARRAY -------- */

export const reasonArray = [
    {
        type: "boolean",
        name: "BA sin señal",
        checks: ["Se desconecta CM del tomacorriente", "se verifica coaxil", "se verifican luces", "se verifica navegación"],
        yes: "todo ok.",
        no: "problema persiste, se agenda VT.",
    },
    {
        type: "boolean",
        name: "CATV ID 120",
        checks: ["Se desconecta deco del tomacorriente", "se verifica coaxil", "se refresca señal desde CRM e I3", "se verifican canales"],
        yes: "todo ok.",
        no: "problema persiste, se agenda VT.",
    },
    {
        type: "boolean",
        name: "CATV ID 121",
        checks: ["Se verifica pack contratado", "se desconecta deco del tomacorriente", "se verifica coaxil", "se refresca señal desde CRM e I3", "se verifican canales"],
        yes: "todo ok.",
        no: "problema persiste, se genera RA.",
    },
    {
        type: "boolean",
        name: "CATV Cisco ID 121",
        checks: ["Se verifica pack contratado", "se verifica coaxil", "se refresca señal desde CRM e I3", "se blanquea control parental", "se verifican canales"],
        yes: "todo ok.",
        no: "problema persiste, se genera RA.",
    },
    {
        type: "boolean",
        name: "Telefonía sin tono",
        checks: ["Se verifica cable telefonía", "se invierten puertos", "se prueba con otra terminal"],
        yes: "se verifica tono, todo ok.",
        no: "problema persiste, se genera RA.",
    },
    {
        type: "additional",
        name: "Ticket TK",
        checks: ["Se verifica problema", "", "se le indica fecha estimativa de resolución."],
        additional: "Ticket: 220617CN0317",
    }
];

/* -------- SVA ARRAY -------- */

export const svaArray = [
    {
        name: "Telecentro Wifi",
    },
];

/* -------- BOOLEAN ARRAY -------- */

export const booleanArray = [
    {
        name: "Si",
    },
    {
        name: "No",
    },
];

/* -------- ICONS ARRAY -------- */

export const iconsArray = [
    {
        name: "done",
        icon: '<i class="fa-solid fa-circle-check"></i>',
    },
    {
        name: "error",
        icon: '<i class="fa-solid fa-circle-xmark"></i>',
    },
    {
        name: "info",
        icon: '<i class="fa-solid fa-circle-exclamation"></i>',
    },
    {
        name: "delete",
        icon: '<i class="fa-solid fa-xmark"></i>',
    },
    {
        name: "question",
        icon: '<i class="fa-solid fa-question"></i>',
    },
    {
        name: "exclamation",
        icon: '<i class="fa-solid fa-circle-exclamation"></i>',
    },
    {
        name: "disabled",
        icon: '<i class="fa-solid fa-ban"></i>',
    },
    {
        name: "arrow-up",
        icon: '<i class="fa-solid fa-caret-up"></i>',
    },
    {
        name: "arrow-right",
        icon: '<i class="fa-solid fa-caret-right"></i>',
    },
    {
        name: "arrow-down",
        icon: '<i class="fa-solid fa-caret-down"></i>',
    },
    {
        name: "copy",
        icon: '<i class="fa-regular fa-copy"></i>',
    },
    {
        name: "hashtag",
        icon: '<i class="fa-solid fa-hashtag"></i>'
    },
    {
        name: "user",
        icon: '<i class="fa-solid fa-user"></i>'
    },
    {
        name: "link",
        icon: '<i class="fa-solid fa-up-right-from-square none"></i>'
    }
];