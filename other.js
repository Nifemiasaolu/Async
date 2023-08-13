'use strict';

/////////////////////////////

// Challenge #1

const whereAmI = function (lat, lng) {
 const request = fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
 .catch(err => {
    console.log(`File not found (${err.status})`);
 }).finally(() => console.log(`There could be an error`))
 
 console.log(request);
    if(!request) throw new Error(`Location not found`);
    console.log(`You're in Berlin, Germany`);
    
};

whereAmI(52.508, 13.381);
