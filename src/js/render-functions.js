export function createMurkup(data) {
  const container = document.querySelector('.gallery-container');
  const murcup = data.hits
    .map(
      element => `<div class="gallery-item">
    <a class="gallery-link" href="${element.largeImageURL}">
    <img class="gallery-image" src="${element.webformatURL}" alt="${element.tags}">
    </a>
    <div class="gallery-info">
    <p class="gallety-info-item"><span class="gallery-item-text">Likes:</span>${element.likes}</p>
    <p class="gallety-info-item"><span class="gallery-item-text">Views:</span>${element.views}</p>
    <p class="gallety-info-item"><span class="gallery-item-text">Comments:</span>${element.comments}</p>
    <p class="gallety-info-item"><span class="gallery-item-text">Downloads:</span>${element.downloads}</p>
    </div>
      </div>`
    )
    .join('');
  container.innerHTML = murcup;
}
