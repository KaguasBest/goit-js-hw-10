import axios from 'axios';
import { Notify } from 'notiflix';
import { refs } from './common';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] =
  'live_FwFcrkdBsdS2MilHjk5zmoEgROrQPJZHID8jpTxxTjtXOCJGsGG8CoYFKJGQoOdB';

Notify.init({
  position: 'center-top',
});
refs.breedSelect.classList.add('hidden');

function errMsg() {
  Notify.failure(`Oops! Something went wrong! Try reloading the page!`, {
    timeout: 4000,
  });
}

function fetchBreeds() {
  return axios
    .get('/breeds')
    .then(responce => {
      return responce.data;
    })
    .catch(() => {
      errMsg();
    });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`/images/search?breed_ids=${breedId}`)
    .then(responce => {
      return responce.data;
    })
    .catch(() => {
      errMsg();
    });
}

export { fetchBreeds, fetchCatByBreed, errMsg };
