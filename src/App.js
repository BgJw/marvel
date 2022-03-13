import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import './Style/Style.scss';

import Header from "./components/Header/Header";
import Banner from './components/Banner/Banner';
import CharList from './components/CharList/CharList';
import CharInfo from './components/CharInfo/CharInfo';
import ComicsList from './components/ComicsList/ComicsList';
import SingleComic from './components/SingleComic/SingleComic';
import SingleHeader from './components/SingleHeader/SingleHeader';
import useMarvelService from './services/MarvelService';




function App() {
    const [banerCharacter, setBanerCharacter] = useState({ char: {}});
    const [characters, setCharacters] = useState({charList: [], charInfo: null, 
                                        offset: 210, charId: null, newItemsLoading: false});
    const [comics, setComics] = useState({comics: [], newComicsLoading: true, singleComics: null, offset: 100});

    const charList = useMarvelService();
    const banner = useMarvelService();
    const charInfo = useMarvelService();
    const comicsList = useMarvelService();


  function getComics() {
      comicsList.getComics(comics.offset)
          .then(res =>  setComics({...comics, comics: [...comics.comics, ...res] }));
  }
  function getMoreComics(){
    const offset = 8;
    setComics({...comics, offset: comics.offset += offset, newComicsLoading: false});

    comicsList.getComics(comics.offset)
        .then(res => setComics({...comics, comics: [...comics.comics, ...res], newComicsLoading: true}))
  }
  function singleComics(id){
    console.log(id);
  }  
  function getRandomChar() {
      const randomN = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
      
      banner.getCharacter(randomN)
        .then( data => setBanerCharacter({char: data}) )
  }
  function getMoreChar(){
      setCharacters({...characters, offset: characters.offset +=9});
      newCharList();
  }
  function newCharList(){
      setCharacters({...characters, newItemsLoading: true});
      charList.getAllCharacters(characters.offset)
        .then( res => setCharacters({...characters, charList: [...characters.charList, ...res], 
                                                    newItemsLoading: false}))
  }
  function getCharList(initial) {
      initial ? setCharacters({...characters, newItemsLoading: false}): setCharacters({...characters, newItemsLoading: true})
      charList.getAllCharacters(characters.offset)
        .then( res => setCharacters({...characters, charList: res}))
  }

  function getMoreDescription(id){
      charInfo.getCharacter(id)
        .then(res => setCharacters({...characters, charInfo: res, charId: id} ))  
  }

  useEffect( () => {
    getRandomChar();
    getCharList(true);
    getComics();

    const timer = setInterval(getRandomChar, 20000);

    return () => {
        clearInterval(timer);
    }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);  

  return (
    <div className='wrapper'>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route exact path='/' element={
            <>
              <Banner
                onRandom={getRandomChar}
                character={banerCharacter}
                loading={banner.loading}
                error={banner.error}
              />
              <div className='char__content'>
                <CharList
                  onDescription={getMoreDescription}
                  onGetMoreChar={getMoreChar}
                  charId={characters.charId}
                  chars={characters}
                  loading={charList.loading}
                  error={charList.error}
                />
                <CharInfo
                  dateChar={characters.charInfo}
                  loading={charInfo.loading}
                  error={charInfo.error}
                />
              </div>
            </>
          }/>
          <Route exact path='/comics' element={
            <>
              <SingleHeader />
              <ComicsList
                comics={comics.comics}
                getMoreComics={getMoreComics}
                loading={comicsList.loading}
                error={comicsList.error}
                newComicsLoading={comics.newComicsLoading}
                singleComics={singleComics}
              />
            </>
          }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
{/* <SingleComic /> */}

export default App;





