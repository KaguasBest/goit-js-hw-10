// import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';
// import SlimSelect from 'slim-select';
// import { Notify } from 'notiflix/build/notiflix-notify-aio.js';

// // Import slim-select style
// import 'slim-select/dist/slimselect.css';

// console.log(fetch('https://api.thecatapi.com/v1/breeds'));

// import axios from 'axios';

// axios
//   .get('https://api.thecatapi.com/v1/breed')
//   .then(function (response) {
//     console.log(response.data);
//     console.log(response.status);
//     console.log(response.statusText);
//     console.log(response.headers);
//     console.log(response.config);
//   })
//   .catch(function (error) {
//     if (error.response) {
//       // Запит було зроблено, і сервер відповів кодом стану, який
//       // виходить за межі 2xx
//       console.log(error.response.data);
//       console.log(error.response.status);
//       console.log(error.response.headers);
//     }
//   });

// // const BASE_URL = 'https://api.thecatapi.com/v1';
// // const API_KEY =
// axios.defaults.headers.common['x-api-key'] =
//   'live_FwFcrkdBsdS2MilHjk5zmoEgROrQPJZHID8jpTxxTjtXOCJGsGG8CoYFKJGQoOdB';

// axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

// export function fetchBreeds() {
//   return axios.get('/breeds').then(resp => {
//     return resp.data;
//   });
// }

// export function fetchCatByBreed(breedId) {
//   return axios.get(`/images/search?breed_ids=${breedId}`).then(responce => {
//     console.log(responce);

//     return responce.data;
//   });
// }
// console.log('Hello');
// const BASE_API_URL = 'https://api.thecatapi.com/v1';
// const API_KEY =
//   'live_FwFcrkdBsdS2MilHjk5zmoEgROrQPJZHID8jpTxxTjtXOCJGsGG8CoYFKJGQoOdB';

// export function fetchBreeds() {
//   return fetch(`${BASE_API_URL}/breeds?api_key=${API_KEY}`).then(response => {
//     if (!response.ok) {
//       throw new Error(response.statusText || response.status);
//     }
//     return response.json();
//   });
// }

// export function fetchCatByBreed(breedId) {
//   return fetch(
//     `${BASE_API_URL}/images/search?breed_ids=${breedId}&api_key=${API_KEY}`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.statusText || response.status);
//     }

//     return console.log(response.json());
//   });
// }

import { fetchBreeds, fetchCatByBreed, errMsg } from './js/cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { refs } from './js/common';

// const select = document.querySelector('.breed-select');
// const load = document.querySelector('.loader');
// const err = document.querySelector('.error');
// const catCard = document.querySelector('.cat-info');

refs.error.classList.add('is-hidden');

fetchBreeds()
  .then(selectCat)
  .then(() => new SlimSelect({ select: `.breed-select` }))
  .catch(() => {
    errMsg();
  })
  .finally(() => {
    load.classList.add('is-hidden');
  });

function selectCat(breed) {
  select.innerHTML = breed
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');
}

select.addEventListener('change', onSelect);

function onSelect(evt) {
  const selectBreedId = evt.currentTarget.value;
  catCard.disabled = false;

  fetchCatByBreed(selectBreedId)
    .then(data => {
      createCatCard(data);
      catCard.disabled = true;
    })
    .catch(() => {
      errMsg();
    })
    .finally(() => {
      load.classList.add('is-hidden');
    });
}

function createCatCard(data) {
  const { breeds, url } = data[0];
  const { name, temperament, description } = breeds[0];

  const creareMarcup = `
    <div>
        <img src="${url}" alt="${name}" />
        <h2>${name}</h2>
        <h3>${temperament}</h3>
        <p>${description}</p>
    </div>
    `;
  catCard.innerHTML = creareMarcup;
}
