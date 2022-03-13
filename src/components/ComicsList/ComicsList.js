import Spinner from '../Spinner/Spinner';
import './ComicsList.scss';

const ComicsList = ({comics, getMoreComics, error, loading, newComicsLoading, singleComics}) => {

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {
                    loading && newComicsLoading ? 
                        <Spinner/>
                    :
                    comics.map( (el, i) => (
                        <li key={el.id + i} 
                            className="comics__item"
                            onClick={singleComics.bind(null, el.id)}>
                            <a href='#'>
                                <img className="comics__item-img" src={el.thumbnail} alt={el.name} />
                                <div className="comics__item-name">{el.name}</div>
                                <div className="comics__item-price">{el.price}</div>
                            </a>
                        </li>
                    ))
                }
            </ul>
            <button 
                className="button button__main button__long"
                onClick={getMoreComics}
                disabled={!newComicsLoading}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;