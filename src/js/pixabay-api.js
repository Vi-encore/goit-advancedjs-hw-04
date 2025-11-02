import axios from 'axios';

const API_KEY = '24152486-dede519cf70640e98e72cca28';
axios.defaults.baseURL = 'https://pixabay.com/api';

// export default function fetchPic(value) {
//   const searchParams = new URLSearchParams({
//     key: '50950053-db3558a1af50bab2399c0c009',
//     q: value,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//   });
//   return fetch(`https://pixabay.com/api/?${searchParams}`).then(res => {
//     if (!res.ok) throw new Error(response.status);
//     return res.json();
//   });
// }

export default async function fetchPic(
  searchParam,
  page = 1,
  perPage = 15,
  imageType = 'photo',
  orientation = 'horizontal',
  safesearch = true
) {
  const result = await axios.get(`/`, {
    params: {
      key: API_KEY,
      q: searchParam,
      page,
      per_page: perPage,
      image_type: imageType,
      orientation,
      safesearch,
    },
  });

  return result.data;
}
