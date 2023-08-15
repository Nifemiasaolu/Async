'use strict';

////////////////////////////

// Challenge #1
// const renderCountry = function (data, className = '') {
//    const html = `
//    <article class="country ${className}">
//        <img class="country__img" src="${data.flag}" />
//        <div class="country__data">
//        <h3 class="country__name">${data.name}</h3>
//        <h4 class="country__region">${data.region}</h4>
//        <p class="country__row"><span>👫</span>${(
//          +data.population / 1000000
//        ).toFixed(1)} people</p>
//        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//        </div>
//    </article>

//    `;
//    countriesContainer.insertAdjacentHTML('beforeend', html);
//    // countriesContainer.style.opacity = 1;
//  };

// const whereAmI = function(lat, lng) {
//    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//    .then(res => {

//       if(!res.ok) throw new Error(`Problem with geocoding ${res.status}`)
//      return res.json()})
//    .then(data => {
//       console.log(data);
//       console.log(`You're in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.com/v2/name/${data.country}`)
//    })
//    then(response => {
//             if (!response.ok)
//               throw new Error(`Country not found (${response.status})`);
//             return response.json();
//           })
//           .then(data => renderCountry(data, 'neighbour'))
//    .catch(err => console.error(`${err.message} 💥`));
// }

// whereAmI(52.508, 13.381);

//////////////////////////
// Code Challenge #2

const imgContainer = document.querySelector('.images');
// let currentImg;

const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img'); //How to create image from JS
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found!'));
    });
  });
};

const wait = function (seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');

//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg')
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');

//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display ='none';
//     return createImage('img/img-3.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 3 loaded');
//     return wait(2)
//   })
// //   .then(() => {
// //     currentImg.style.display = 'none';
// //   })
//   .catch(err => console.error(err));

///////////////////////////////////
///////// Code Challenge #3 /////////////

const loadNPause = async function () {
  try {
    // Part 1
    // Load Image 1
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img.style.display = 'none';

    // Load Image 2
    img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};

// loadNPause();

//////// Part 2 //////////

const loadAll = async function (imgArr) {
  try {
    const imgs = await imgArr.map(async img => await createImage(img)); // It executes the loop function one after the other 

    // promise.all is  used to get the returning value
    const imgEL = await Promise.all(imgs);
    console.log(imgEL);

    imgEL.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);