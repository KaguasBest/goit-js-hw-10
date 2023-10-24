import { refs } from './js/common';
import { errMsg, fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';

// Import slim-select style
import 'slim-select/dist/slimselect.css';
import { onSelect } from './js/select-cat';

refs.error.classList.add('hidden');
refs.breedSelect.classList.add('hidden');

fetchBreeds()
  .then(selectCat)
  .then(
    () =>
      new SlimSelect({
        select: refs.breedSelect,
        settings: {
          placeholderText: 'Search cat breed...',
          searchText: 'Sorry nothing to see here',
          searchHighlight: true,
        },
      })
  )
  .catch(() => {
    errMsg;
  })
  .finally(() => {
    refs.loader.classList.add('hidden');
    refs.breedSelect.classList.remove('hidden');
  });

function selectCat(breed) {
  refs.breedSelect.innerHTML = breed
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');
}

refs.breedSelect.addEventListener('change', onSelect);
