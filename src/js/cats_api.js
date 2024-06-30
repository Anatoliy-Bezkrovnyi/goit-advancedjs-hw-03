import axios from "axios";

const BASE_URL = "https://api.thecatapi.com/v1";
axios.defaults.headers.common["x-api-key"] = "live_OKdm3C3Y9OH2wAqC4PKAGZ65xdtQxX2EwxjcglD5ogdRR3SMvTRjGXZVEOZY02Kz";

function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`)
  .then(response => response.data);
}

function fetchCatByBreed(breedId) {    
    return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
        .then(response => response.data);   
  
}

export {fetchBreeds, fetchCatByBreed};
