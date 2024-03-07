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

fetchLoadBtn.style.display = 'none';

const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});

formEl.addEventListener('submit', async function (event) {
  event.preventDefault();
  container.innerHTML = '<span class="loader"></span>';

  const searchQuery = searchInput.value.trim();
  fetchLoadBtn.style.display = 'block';

  if (searchQuery !== '') {
    try {
      const data = await getPhotos(searchQuery, 1);
      createMurkup(data);
      lightbox.refresh();
      page = 1;
    } catch (error) {
      console.log(error);
    }
  } else {
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
    const searchQuery = searchInput.value.trim();
    const nextPage = page + 1;
    const data = await getPhotos(searchQuery, nextPage);
    createMurkup(data);
    lightbox.refresh();
  } catch (error) {
    console.log(error);
  }
});
