import './CharInfo.scss';
import '../../Style/button.scss';
import PropTypes from 'prop-types';
import Skeleton from '../Skeleton/Skeleton';



const CharInfo = ({ dateChar }) => {

    const { name, description, thumbnail, homepage, wiki, comics } = dateChar;


    return (
        <div className='char__wrapper'>
            {!dateChar.id ?
                <Skeleton />
                :
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
                        {comics.length ?
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
            }
        </div>
    );
};

CharInfo.propTypes ={
    dateChar: PropTypes.object
}
export default CharInfo;