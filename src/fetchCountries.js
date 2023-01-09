export function fetchCountries(name) {
    const url = 'https://restcountries.com/v3.1/name/';
    //== 1.1.
    const filter = '?fields=name,capital,population,flags,languages';
    return fetch(`${url}${name}${filter}`)
        .then(response => {
//-- если, нет успешного ответа - сохрани данные в новую ошибку и верни мне json файл
            if (!response.ok) {
                throw new Error(response.status)
            };
            return response.json();
        });
    };
