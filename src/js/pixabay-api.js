import axios from 'axios';

const API_KEY = '42651911-b9e9cf23b752713c606cec899';
const BASE_URL = 'https://pixabay.com/api/';
export let page = 1;

export async function getPhotos(searchQuery, page) {
  const searchparams = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'horizontal',
    safesearch: 'true',
    orientation: 'horizontal',
    per_page: 15,
    page: page,
  });

  const response = await axios.get(`${BASE_URL}?${searchparams}`);
  return response.data;
}
