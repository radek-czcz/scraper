let urlArr = [

    // {url: 'https://www.mediaexpert.pl/foto-i-kamery/akcesoria-do-aparatow-i-kamer/karty-pamieci/kioxia/pojemnosc-gb_16.32.64?limit=10&sort=price_asc',
    // category: 'Karty pamięci'},

    // {url: 'https://www.mediaexpert.pl/agd/lodowki-i-zamrazarki/chlodziarki/whirlpool.electrolux/cena_1200.0?sort=price_asc&limit=50',
    // category: 'Lodówki'},

    // {url: 'https://www.mediaexpert.pl/agd/zmywarki-i-akcesoria/zmywarki-60-cm/whirlpool.bosch.samsung.electrolux/pojemnosc-kpl_od-13-do-14/poziom-emisji-halasu-db_od-46-do-47.od-44-do-45.do-43/zuzycie-wody-na-cykl-w-programie-eko-l_do-9.od-9-1-do-11/cena_1000.0?limit=50&sort=price_asc',
    // category: 'Zmywarki'},

    // {url: 'https://www.mediaexpert.pl/komputery-i-tablety/klawiatury-komputerowe/klawiatury/logitech.microsoft.hp.samsung.dell.asus/komunikacja-z-komputerem_bezprzewodowa?sort=price_asc',
    // category: 'Klawiatury'},

    {url: 'https://www.mediaexpert.pl/komputery-i-tablety/dyski-i-pamieci/pamieci-flash-pendrive/interfejs_usb-3-1?limit=15&sort=price_asc',
    category: 'Pendrive'}

]

let map = new Map();

map.set('Karty pamięci', 'https://www.mediaexpert.pl/foto-i-kamery/akcesoria-do-aparatow-i-kamer/karty-pamieci/kioxia/pojemnosc-gb_16.32.64?limit=10&sort=price_asc');
map.set('Lodówki', 'https://www.mediaexpert.pl/agd/lodowki-i-zamrazarki/chlodziarki/whirlpool.electrolux/cena_1200.0?sort=price_asc&limit=50');
map.set('Zmywarki', 'https://www.mediaexpert.pl/agd/zmywarki-i-akcesoria/zmywarki-60-cm/whirlpool.bosch.samsung.electrolux/pojemnosc-kpl_od-13-do-14/poziom-emisji-halasu-db_od-46-do-47.od-44-do-45.do-43/zuzycie-wody-na-cykl-w-programie-eko-l_do-9.od-9-1-do-11/cena_1000.0?limit=50&sort=price_asc');
map.set('Klawiatury', 'https://www.mediaexpert.pl/komputery-i-tablety/klawiatury-komputerowe/klawiatury/logitech.microsoft.hp.samsung.dell.asus/komunikacja-z-komputerem_bezprzewodowa?sort=price_asc');
map.set('Pendrive', 'https://www.mediaexpert.pl/komputery-i-tablety/dyski-i-pamieci/pamieci-flash-pendrive/interfejs_usb-3-1?limit=15&sort=price_asc');


module.exports = { map, urlArr }