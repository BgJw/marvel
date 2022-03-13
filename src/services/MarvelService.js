import {useHttp} from '../hooks/http.hook';




const useMarvelService = () => {

    const BASE_API = 'https://gateway.marvel.com:443/v1/public/';
    // const API_KEY = 'apikey=4fb34969ffe6a180f0c93d5b5e95a1d1';
    const API_KEY2 = 'apikey=53ea69cb2b87f8facb70e9d7cf3a9273'
    const { request, loading, error, clearError } = useHttp();
    const _limit = 9;


    const getAllCharacters = async (offset, limit = _limit) => {
        const res = await request(`${BASE_API}characters?limit=${limit}&offset=${offset}&${API_KEY2}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${BASE_API}characters/${id}?${API_KEY2}`);
        return _transformCharacter(res.data.results[0]);
    }
    const getComics = async (offset, limit = 8) => {
        const res = await request(`${BASE_API}comics?limit=${limit}&offset=${offset}&${API_KEY2}`);

        return res.data.results.map(_transformComics);
    }
    const getSingleComics = async (id) => {
        const res = await request(`${BASE_API}/comics/${id}?${API_KEY2}`)

        return _transformComics(res.data.results[0]);
    }



    const _transformCharacter = (res) => {

        function updateDescription(char) {
            if (char.length > 210) {
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
    const _transformComics = (res) => {

        return {
            id: res.id,
            name: res.title,
            price: res.prices[0].price + '$',
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
            homepage: res.urls[0].url,
        }
    }
    return { loading, error, getAllCharacters, getCharacter, getComics, getSingleComics };
}

export default useMarvelService;