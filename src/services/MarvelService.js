const BASE_API = 'https://gateway.marvel.com:443/v1/public/';
// const API_KEY = 'apikey=4fb34969ffe6a180f0c93d5b5e95a1d1';
const API_KEY2 = 'apikey=53ea69cb2b87f8facb70e9d7cf3a9273'

const getResources = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
};

export const getAllCharacters = async (limit, offset) => {
    const res = await getResources(`${BASE_API}characters?limit=${limit}&offset=${offset}&${API_KEY2}`);
    return res.data.results.map(_transformCharacter);
}

export const getCharacter = async (id) => {
    const res = await getResources(`${BASE_API}characters/${id}?${API_KEY2}`);

    return _transformCharacter(res.data.results[0]);
}
const _transformCharacter = (res) => {

    function updateDescription(char) {
        if (char.length > 140) {
          return char.slice(0, 140) + '...';
        }
        else if (!char) {
          return 'There is no description for this character';
        }
        else {
            return char;
        }
      }

    return {
        id: res.id,
        name: res.name,
        description: updateDescription(res.description),
        thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension, 
        homepage: res.urls[0].url, 
        wiki: res.urls[1].url,
        comics: res.comics.items,
    }
}