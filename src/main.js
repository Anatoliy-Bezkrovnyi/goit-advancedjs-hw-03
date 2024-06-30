import { fetchBreeds, fetchCatByBreed } from "./js/cats_api";
import SlimSelect from 'slim-select';
import '../node_modules/slim-select/dist/slimselect.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const selectors = {
    breedSelect: document.querySelector(".breed-select"),
    article: document.querySelector(".article"),
    loader: document.querySelector(".loader")
    
}



const selectControl = new SlimSelect({
  select: selectors.breedSelect,
  settings: {
    showSearch: true,
    searchText: 'Sorry nothing to see here',
    searchPlaceholder: 'Select Breed',
    searchHighlight: true
    },
    events: {
        afterChange: (newVal) => {
            const [{ value: catId }] = newVal;
            
            if (!catId) {
                return
            }
            
            fetchCatByBreed(catId)
            .then((data) => { 
                const [{ url: src, breeds: [{ name: title, description, temperament }] = {} }] = data;
                selectors.article.innerHTML = markupCats({
                    src,
                    description,
                    title,
                    temperament,
                });
            })
            .catch(error => {
            iziToast.error({
                position: 'topCenter',
                message: `Ooops! Something went wrong! Try reload the page!`,
                });
            console.error(error);
  })
            
        }
    }
});

fetchBreeds()
    .then((data) => { 
        const selectOptions = data
            .map(({ id, name }) => ({ value: id, text: name }));
        selectOptions.unshift({ value: "", text: "Select Breed", disabled: true });
        selectControl.setData(selectOptions);
    })
    .catch(error => {
    iziToast.error({
      position: 'topCenter',
      message: `Ooops! Something went wrong! Try reload the page!`,
    });
    console.error(error);
  })



function markupCats(catData) {
    const { src, title, description, temperament } = catData;
    const shortDetails = `<div class="article-item"><img class="article-image" src="${src}" alt="${title}" />
        <div class="article-description">  
        <h1 class="article-title">${title}</h1>      
      <p class="article-main-text">${description}</p>
      <p class="article-additional-text"><span class="accent">Temperament: </span>${temperament}</p></div></div>`;

    return shortDetails;
 }
