// goal: return a sorted array
const dirtyNames = require('./names');
const { cleanNames } = require('./helper-functions');

const names = cleanNames(dirtyNames);

const cities = [
    "Prairie Ridge",
    "Edison",
    "Wautauga Beach",
    "Harper",
    "Telma",
    "Kahlotus",
    "Mondovi",
    "Washtucna",
    "Pleasant Hill",
    "Toledo",
    "Wabash",
    "Renton"
];

const campaign = [
    "Abbey National plc",
    "Aber Diamond Ltd",
    "Abitibi Consolidated Inc",
    "ABN Amro Holding N.V.",
    "Acambis plc",
    "Accelio Corp.",
    "Acetex Corp.",
    "Achieva Development Corp.",
    "Acindar Industria Argentina de Aceros S.A.",
    "ACLN Ltd.",
    "Cade Struktur Corp.",
    "Calais Resources Inc.",
    "CalciTech Ltd.",
    "Caledonia Mining Corp.",
    "California Exploration Ltd.",
    "Call Net Enterprises Inc.",
    "Callahan Nordheim-Westfalen GmbH",
    "Cambior Inc.",
    "Cambridge Antibody Technology Group plc",
    "Cameco Co.",
    "Camflo Resources Ltd.",
    "Campbell Resources Inc.",
    "Camtek Ltd."
]

const affiliate = [
    "Noah",
    "Liam",
    "Mason",
    "Jacob",
    "William",
    "Ethan",
    "James",
    "Alexander",
    "Danielle Britain",
    "Erick Hamner",
    "Gracie Berlanga",
    "Ai Acoff",
    "Shizuko Mckissick",
    "Ria Aasen",
    "Fernando Hanlon",
    "Azucena Dygert",
    "Lanelle Cupps",
    "Izetta Motsinger",
    "Shaunna Kowal",
    "Trudie Goodin",
    "Erica Tarwater",
    "Rickie Hillock",
    "Kelly Huneycutt",
    "Lonny Leja",
    "Aide Cottman",
    "Eleanore Falco",
    "Hunter Ascher",
    "Gerry Coniglio"
];

const userAgent = [
    "Noah Mason",
    "Liam Noah",
    "Mason Jacob",
    "Jacob Mason",
    "William Ethan",
    "Ethan Harvey",
    "James Smith",
    "Alexander Ruth",
    "Danielle Britain",
    "Erick Hamner",
    "Gracie Berlanga",
    "Ai Acoff",
    "Shizuko Mckissick",
    "Ria Aasen",
    "Fernando Hanlon",
    "Azucena Dygert",
    "Lanelle Cupps",
    "Izetta Motsinger",
    "Shaunna Kowal",
    "Trudie Goodin",
    "Erica Tarwater",
    "Rickie Hillock",
    "Kelly Huneycutt",
    "Lonny Leja",
    "Aide Cottman",
    "Eleanore Falco",
    "Hunter Ascher",
    "Gerry Coniglio"
]



module.exports = { affiliate, userAgent, campaign, cities, names }