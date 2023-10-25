import { errMsg, fetchCatByBreed } from './cat-api';
import { createCatInfo } from './cats-card';
import { refs } from './common';

export function onSelect(evt) {
  const selectBreedId = evt.currentTarget.value;
  refs.catInfo.textContent = '';
  refs.loader.classList.remove('hidden');

  fetchCatByBreed(selectBreedId)
    .then(data => {
      createCatInfo(data);
      refs.catInfo.disabled = true;
    })
    .catch(() => {
      refs.catInfo.textContent = '';
      errMsg();
    })
    .finally(() => {
      refs.loader.classList.add('hidden');
    });
}
