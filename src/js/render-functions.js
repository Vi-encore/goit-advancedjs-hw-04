export default function renderGallery(picArr) {
  let galleryComplete = '';
  picArr.map(item => {
    const {
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = item;

    galleryComplete += `<li class='gallery_item'>
    <a href='${largeImageURL}' target="_blank">
      <img src='${webformatURL}' alt='${tags}' class='gallery_img test'/>
      <div class='gallery_info_wrapper'>
        <p class='gallery_info'>Likes <span>${likes}</span></p>
        <p class='gallery_info'>Views <span>${views}</span></p>
        <p class='gallery_info'>Comments <span>${comments}</span></p>
        <p class='gallery_info'>Downloads <span>${downloads}</span></p>
      </div>
    </a>
    </li>`;
  });

  return galleryComplete;
}
