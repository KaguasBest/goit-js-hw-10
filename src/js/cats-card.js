import { refs } from './common';

export function createCatInfo(data) {
  const { breeds, url } = data[0];
  const { name, temperament, description } = breeds[0];

  const createCard = `
        <img class="cat-photo" src="${url}" alt="${name}" />
        <div class="breed-describe">
          <h2 class="breed-name">${name}</h2>
          <h3>${temperament}</h3>
          <p>${description}</p>
        </div>
    `;
  refs.catInfo.innerHTML = createCard;
}
