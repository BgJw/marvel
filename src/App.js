import './Style/Style.scss';

import Header from "./components/Header/Header";
import Banner from './components/Banner/Banner';
import CharList from './components/CharList/CharList';
import CharInfo from './components/CharInfo/CharInfo';
import decoration from './resources/img/vision.png';
import ComicsList from './components/ComicsList/ComicsList';
import SingleComic from './components/SingleComic/SingleComic';
import SingleHeader from './components/SingleHeader/SingleHeader';
import { getAllCharacters, getCharacter } from './services/MarvelService';
import { useEffect, useState } from 'react';




function App() {
  const [banerCharacter, setBanerCharacter] = useState({ char: {}, loading: true, error: false });
  const [characters, setCharacters] = useState({charList: {}, 
                                                charInfo: {}, offset: 210, loading: true, newItemLoading: false, charId: 0});



  function onCharLoaded(char) {
    setBanerCharacter({ char, loading: false, error: false })
  }
  function onError() {
    setBanerCharacter({...banerCharacter, error: true })
  }
  function onLoading(char){

    if (char === 'all') {
      setCharacters({...characters, loading: true})
    }
    if(char === 'random'){
      setBanerCharacter({...banerCharacter, loading: true })
    }
    if (char === 'newItems') {
      setCharacters({...characters, newItemLoading: true})

    }
  }
  function getRandomChar() {
      const randomN = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    
      onLoading('random');
      getCharacter(randomN)
        .then(onCharLoaded)
        .catch(onError);
  }
  function getMoreChar(){
      setCharacters({...characters, offset: characters.offset +=9});
      newCharList();
  }
  function newCharList(){
      const limit = 9;
      onLoading('newItems')
      getAllCharacters(limit, characters.offset)
        .then( res => setCharacters({...characters, charList: [...characters.charList, ...res], newItemLoading: false}))
  }
  function getCharList() {
      const limit = 9;
      onLoading('all');
      getAllCharacters(limit, characters.offset)
        .then(res => setCharacters({...characters, charList: res, loading: false}))
        .catch(  );
  }
  function getMoreDescription(id){

    getCharacter(id)
      .then(res => setCharacters({...characters, charInfo: res, charId: id} ))  
      .catch();
  }

  useEffect( () => {
    getRandomChar();
    getCharList();

   }, []); 

  return (
    <div className='wrapper'>
      <Header />
      <Banner 
          onRandom={getRandomChar} 
          character={banerCharacter} />
      <div className='char__content'>
        <CharList 
            onDescription={getMoreDescription} 
            onGetMoreChar={getMoreChar}
            charId={characters.charId} 
            chars={characters} />
        
        <CharInfo 
            dateChar={characters.charInfo} 
            />
      </div>

      {/* <ComicsList /> */}
      {/* <SingleComic /> */}
      {/* <SingleHeader /> */}
    </div>
  );
}

export default App;
