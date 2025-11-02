import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchPic from './js/pixabay-api';
import renderGallery from './js/render-functions';

const form = document.querySelector('.form');
const formInput = document.querySelector('.form_input');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('#load_more_btn');

let curPage = 1;
let searchParam = '';
const perPage = 15;

let simplelightbox = new SimpleLightbox('.gallery_item a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', e => {
  e.preventDefault();

  searchParam = formInput.value.trim();

  if (searchParam === '') {
    iziToast.error({
      message: 'Search value is empty',
      position: 'topRight',
    });
    return;
  }

  gallery.innerHTML = ''; //cleanup prev gallery
  gallery.classList.add('hidden');
  loadMoreBtn.classList.add('hidden');
  loader.classList.remove('hidden');

  fetchPic(searchParam, curPage, perPage)
    .then(data => {
      formInput.value = '';
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        loader.classList.add('hidden');
        gallery.classList.remove('hidden');
        return;
      }

      const galleryLoaded = renderGallery(data.hits);
      gallery.innerHTML = galleryLoaded;
      simplelightbox.refresh();
      loadMoreBtn.classList.remove('hidden');
    })
    .catch(error => {
      iziToast.error({
        message: `${error.message || 'Something went wrong!'}`,
        position: 'topRight',
      });
    })
    .finally(() => {
      loader.classList.add('hidden');
      gallery.classList.remove('hidden');
    });
});

loadMoreBtn.addEventListener('click', async () => {
  loadMoreBtn.classList.add('hidden');
  loader.classList.remove('hidden');

  curPage += 1;

  try {
    const data = await fetchPic(searchParam, curPage);
    const addToGallery = renderGallery(data.hits);
    gallery.innerHTML += addToGallery;
    loader.classList.add('hidden');
    scrollUp();
    showMoreBtn(curPage, perPage, data.totalHits);
    simplelightbox.refresh();
  } catch (error) {
    loader.classList.add('hidden');
    console.error(error.message);
  }
});

function showMoreBtn(curPage, perPage, total) {
  const totalPages = Math.ceil(total / perPage);
  if (curPage > totalPages) {
    return iziToast.info({
      position: 'topRight',
      message: "We're sorry, but you've reached the end of search results.",
    });
  }

  scrollUp();
  loadMoreBtn.classList.remove('hidden');
}

function scrollUp() {
  const cardHeight =
    document.querySelector('.gallery_item')?.getBoundingClientRect().height ||
    0;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
