// import axios from 'axios';
import { Notify } from 'notiflix';
import { refs } from './common';

const URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_FwFcrkdBsdS2MilHjk5zmoEgROrQPJZHID8jpTxxTjtXOCJGsGG8CoYFKJGQoOdB';

Notify.init({
  position: 'center-top',
});
refs.breedSelect.classList.add('hidden');

function errMsg() {
  Notify.failure(`Oops! Something went wrong! Try reloading the page!`, {
    timeout: 3000,
  });
}

function fetchBreeds() {
  return fetch(`${URL}/breeds?api_key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText || response.status);
    }
    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(
    `${URL}/images/search?breed_ids=${breedId}&api_key=${API_KEY}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText || response.status);
    }
    return response.json();
  });
}

export { fetchBreeds, fetchCatByBreed, errMsg };
