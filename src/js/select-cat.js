import { fetchCatByBreed } from './cat-api';
import { createCatInfo } from './cats-card';
import { refs } from './common';

export function onSelect(evt) {
  const selectBreedId = evt.currentTarget.value;
  refs.catInfo.disabled = false;

  fetchCatByBreed(selectBreedId)
    .then(data => {
      createCatInfo(data);
      refs.catInfo.disabled = true;
    })
    .catch(() => {
      errMsg();
    })
    .finally(() => {
      refs.loader.classList.add('hidden');
    });
}
