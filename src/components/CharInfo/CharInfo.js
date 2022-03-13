import './CharInfo.scss';
import '../../Style/button.scss';
import PropTypes from 'prop-types';
import Skeleton from '../Skeleton/Skeleton';
import ErrorMesage from '../ErrorMesage/ErrorMesage';
import Spinner from '../Spinner/Spinner';



const CharInfo = ({ dateChar, error, loading }) => {

    const skeleton = dateChar || loading || error ? null: <Skeleton />;
    const errorMesage = error ? <ErrorMesage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !dateChar)? <View char={dateChar} /> : null; 

    return (
        <div className='char__wrapper'>
            {skeleton}
            {errorMesage}
            {spinner}
            {content}
        </div>
    );
};


const View = (char) => {
    
    const { name, description, thumbnail, homepage, wiki, comics } = char.char;
    return (
        <>
        <header className='char__info'>
            <img src={thumbnail} alt={name} />
            <section className='char__desc'>
                <h3>{name}</h3>
                <a className='button button__main'
                    href={homepage}
                    target={'_blank'}
                    rel="noreferrer">
                    <div className='inner'>
                        HOMEPAGE
                    </div>
                </a>
                <a className='button button__secondary'
                    href={wiki}
                    target={'_blank'}
                    rel="noreferrer">
                    <div className='inner'>
                        WIKI
                    </div>
                </a>
            </section>
        </header>

        <p>
            {
                description
            }
        </p>
        <h3 className="char__comics">Comics:</h3>

        <ul className="char__list">
            {comics.length > 0 ?
                comics.map(el => (
                    <li className="char__comics-item"
                        key={el.resourceURI}>
                        {el.name}
                    </li>
                )) 
                :
                <h4>This char dont have any comics</h4>
            }
        </ul>
    </>
    )
};

CharInfo.propTypes ={
    dateChar: PropTypes.object,
    error: PropTypes.bool,
    loading: PropTypes.bool
}
export default CharInfo;