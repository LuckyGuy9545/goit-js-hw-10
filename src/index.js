import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce'; 
import Notiflix, { Notify } from 'notiflix';
import { countryListFromTemplate, countryСardFromTemplate } from './markup_template';
const DEBOUNCE_DELAY = 300;

const refs = {
    countryInput: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

//== 2.1.
refs.countryInput.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY));

// //== 2.2.
function onCountryInput() {
    const nameOfTheCountry = refs.countryInput.value;
    if (!nameOfTheCountry) {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        return;
    }

    //== 3.
    fetchCountries(nameOfTheCountry)
        .then(countries => {
            //== 3.1.
            if (countries.length > 10) {
                Notify.info('Too many matches found. Please enter a more specific name.');
                refs.countryList.innerHTML = '';
                refs.countryInfo.innerHTML = '';
            }
            //== 3.2.
            if (countries.length >= 2) {
                const markup = countries.map(country => countryListFromTemplate(country));
                refs.countryList.innerHTML = markup.join('');
                refs.countryInfo.innerHTML = '';
            }
            //== 3.3.
            if (countries.length === 1) {
                const markup = countries.map(country => countryСardFromTemplate(country));
                refs.countryList.innerHTML = markup.join('');
                refs.countryInfo.innerHTML = '';
            }
        })
        .catch(error => {
            //== 4.1.
            Notify.failure('Oops, there is no country with that name');
            refs.countryList.innerHTML = '';
            refs.countryInfo.innerHTML = '';
            return error;
    })
    
    
}



