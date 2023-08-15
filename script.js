'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
  </article>

  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};
//////////////////////

// Older Method of calling APIs

// const getCountryData = function(country) {
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();

// request.addEventListener('load', function () {
//   const [data] = JSON.parse(this.responseText);
//   console.log(data);

//   const html = `
//     <article class="country">
//         <img class="country__img" src="${data.flag}" />
//         <div class="country__data">
//         <h3 class="country__name">${data.name}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
//         <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//         <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//         </div>
//     </article>

//     `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
// });

// }

// getCountryData('nigeria');
// getCountryData('canada');
// getCountryData('germany');
// getCountryData('japan');

////////////////////////
// CallBack Hell (It means having a callback function inside another CB function, inside another CB function);
// const getCountryDataAndNeighbour = function (country) {
//   //AJAX Call country 1
//   const request = new XMLHttpRequest(); // Older method of calling APIs
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     //Render country 1
//     renderCountry(data);

//     // Get neighbour country 2
//     const [neighbour] = data.borders;

//     if (!neighbour) return;

//     //AJAX Call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryDataAndNeighbour('nigeria');

///////////////////////////////
// Promises and Fetch API

// Newer Method of calling API
// const request = fetch(`https://restcountries.com/v2/name/nigeria`);
// console.log(request);

///////////// Expanded Format (Promise and Handler Format) //////
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       //using the 'then' method after fetching an API means handling the promise.
//       console.log(response);
//       return response.json();//'.json means the response will be transformed to json, which produces another promise of its own...
//       ... hence the next 'then' handler method.
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

////////// Simple Promise and Handler Format /////////////////////
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => response.json())
//     .then(data => renderCountry(data[0]));
// };

const getJSON = function (url, errorMsg = 'Something went wrong!') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => {
//       //This is called when the promise is fufilled

//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       //This is called when the promise is rejected
//       console.error(`${err}💣💣💣`);
//       renderError(`Something went wrong 💣💣💣 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       // This is always called whether the promise is fufilled or rejected
//       //It is used for an event that always needs to happen, no matter the promise result e.g loading spinner
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('nigeria');
// });

// const getCountryData = function (country) {
//   // Country 1
//   getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) throw new Error('No Neighbour found!');

//       // Country 2
//       return getJSON(
//         `https://restcountries.com/v2/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })

//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       //This is called when the promise is rejected
//       console.error(`${err}💣💣💣`);
//       renderError(`Something went wrong 💣💣💣 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       // This is always called whether the promise is fufilled or rejected
//       //It is used for an event that always needs to happen, no matter the promise result e.g loading spinner
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('australia');
// });

//////////////////////////////
/////// Event Loop in Practice ///////

// console.log('Test start');  //1
// setTimeout(() => console.log('0 sec timer'), 0); //5

// Promise.resolve('Resolved promise 1').then(res => console.log(res)) //3
// Promise.resolve('Resolved promise 2').then(res => { //4
//   for(let i = 0; i < 10000; i++) {}
//   console.log(res);
// })
// console.log('Test end'); //2

//////////////////////////////////////////////
///////// Building a Simple Promise ////////////

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is Happening 🔮');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN💰');
//     } else {
//       reject(new Error('You lost your money 💩'));
//     }
//   }, 2000);
// });

// lotteryPromise
//   .then(res => console.log(res))
//   .catch(err => console.error(`${err}`));

///// Promisifying setTimeout // Promisifying means converting async base function (Callback base API) to Promise base API
// Example ////
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(1)
//   .then(() => {
//     console.log('1 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('2 seconds passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3 seconds passed');
//     return wait(1);
//   })
//   .then(() => console.log('4 seconds passed'));

// Creating a Fufilled or Rejected Promise Immediately (Another Method)
// Promise.resolve('abc').then(res => console.log(res));
// Promise.reject(new Error('Problem')).catch(res => console.error(res));

///////////////////////////////////////
//// Promisifying Geolocation API /////// NOT COMPLETED

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject)

//   });
// };

// getPosition().then(pos => console.log(pos))

///////////////////NOT COMPLETED

///////////////////////////////////////////////////////
//////////// Consuming Promises with ASYNC/AWAIT ////////////

//// Old Method of consuming Promises //////
// const res = await fetch(`https://restcountries.com/v2/name/${country}`)
// .then(
//   res => console.log(res)
// );

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject); // Geolocation API
//   });
// };

// const whereAmI = async function () {
//   try {
//     // Geolocation
//     const pos = await getPosition();
//     // console.log(pos);
//     const { latitude: lat, longitude: lng } = pos.coords;

//     // Reverse Geocoding
//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     if (!resGeo.ok) throw new Error(`Problem getting location data`); // For 403 and 404 error
//     const dataGeo = await resGeo.json();

//     // Country data
//     const res = await fetch(
//       `https://restcountries.com/v2/name/${dataGeo.country}`
//     );
//     if (!res.ok) throw new Error(`Problem getting country`); // For 403 and 404 error
//     const data = await res.json();
//     renderCountry(data[0]);

//     return `You are in ${dataGeo.city}, ${dataGeo.country}`;
//   } catch (err) {
//     console.error(`${err} 🎇`);
//     renderError(`💥 ${err.message}`);

//     // Reject promise returned from Async function manually
//     throw err;
//   }
// };

// console.log('1: Will get location');

////////
// Previous example of showing how to execute a promise before a console.log();
// const city = whereAmI();
// console.log(city); // This is returning a promise only, not the returned value...
// ...hence to get the returned value, we use the 'then' handler to consume the promise.
////////

/////////
// Main example of doing the execution
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 💔`)) // The err was thrown manually (line 330), so as for the 'catch' to execute it here.
//   .finally(() => console.log('3: Finished getting location')); // Finally is added to make sure that the error (no 2), shows before no 3 console log
/////////

/////////
// Converting this code to If-Is bcos it looks like we are combining the old and new method of consuming promises
// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2: ${city}`);
//   } catch (err) {
//     console.error(`2: ${err.message} 💔`);
//   }
//   console.log('3: Finished getting location');
// })();
////////

/////////////////////////////////////////////////////////
//////// Running Promises In Parallel //////////
// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
//     // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
//     // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
//     // console.log([data1.capital, data2.capital, data3.capital]);

//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v2/name/${c1}`),
//       getJSON(`https://restcountries.com/v2/name/${c2}`),
//       getJSON(`https://restcountries.com/v2/name/${c3}`),
//     ]);
//     // NOTE: In Promise.all, if one promise rejects, then the others also will be affected and also be rejected.
//     // console.log(data);
//     // console.log(data.map(d => d[0].capital));
//   } catch (err) {
//     console.error(err);
//   }
// };

// get3Countries('nigeria', 'canada', 'portugal');

/////////////////////////////////////////////////////
////////// Promise.race /////////
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v2/name/italy`),
//     getJSON(`https://restcountries.com/v2/name/nigeria`),
//     getJSON(`https://restcountries.com/v2/name/ghana`),
//   ]);
//   // console.log(res[0]);
// })();

// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(() => {
//       reject(new Error('Request took too long!'));
//     }, sec * 1000);
//   });
// };

// Promise.race([getJSON(`https://restcountries.com/v2/name/zambia`), timeout(5)])
//   .then(res => console.log(res[0]))
//   .catch(err => console.error(err));

/////////////////////////////////////////
// Difference between Promise.allSettled and Promise.all
/////// Promise.allSettled /////////
// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another Success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// // 'Promise.allSettled' returns all the promises even if one of it is rejected...
// //... while 'Promise.all' short circuits and rejects all the promise if one of the promises is rejected.
// //...

// Promise.all([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another Success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// //////////////////////////////////////
// ////// Promise.any ////////
// // Promise.any takes in an array of promises and returns the FIRST FUFILLED promise, it simply ignores the rejected promise...
// // ... the result is always gonna be a fufilled promise unless they all are rejected. 
// Promise.any([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another Success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));
