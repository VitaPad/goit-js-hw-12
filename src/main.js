import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getPhotos } from './js/pixabay-api.js';
import { createMurkup } from './js/render-functions.js';

const container = document.querySelector('.gallery-container');
const searchInput = document.querySelector('.form-input');
const formEl = document.querySelector('.form');
const fetchLoadBtn = document.querySelector('.load-button');
let page = 1;
const limit = 15;
const totalPages = Math.ceil(100 / limit);
let searchQuery = '';

fetchLoadBtn.style.display = 'none';

const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});
function smoothScroll() {
  const galleryItemHeight = document
    .querySelector('.gallery-item')
    .getBoundingClientRect().height;
  window.scrollBy({
    top: galleryItemHeight * 2,
    behavior: 'smooth',
  });
}

formEl.addEventListener('submit', async function (event) {
  event.preventDefault();
  container.insertAdjacentHTML('beforeend', '<span class="loader"></span>');
  searchQuery = searchInput.value.trim();

  fetchLoadBtn.style.display = 'block';
  if (searchQuery !== '') {
    try {
      const data = await getPhotos(searchQuery, page);
      createMurkup(data);
      const loaderEl = document.querySelector('.loader');
      loaderEl.remove();
      lightbox.refresh();
      smoothScroll();
    } catch (error) {
      console.log(error);
    }
  } else {
    fetchLoadBtn.style.display = 'none';
    container.innerHTML = '';
    iziToast.error({
      title: 'Error',
      position: 'topRight',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
  }
  searchInput.value = '';
});

fetchLoadBtn.addEventListener('click', async () => {
  if (page > totalPages) {
    return iziToast.error({
      position: 'topRight',
      message: "We're sorry, there are no more posts to load",
    });
  }

  try {
    const pages = (page += 1);
    const data = await getPhotos(searchQuery, pages);
    createMurkup(data);
    lightbox.refresh();
  } catch (error) {
    console.log(error);
  }
});
