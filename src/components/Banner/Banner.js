import './Banner.scss';
import '../../Style/button.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../Spinner/Spinner';
import ErrorMesage from '../ErrorMesage/ErrorMesage';

const Banner = ({ onRandom, character, loading, error }) => {


    const errorMesage = error ? <ErrorMesage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? View(character.char) : null;

    return (
        <main className='banner'>
            {errorMesage || spinner || content}
            <div className='banner__random'>
                <h2>Random character for today!<br />
                    Do you want to get to know him better?
                </h2>
                <h3>Or choose another one</h3>
                <button className='button button__main'
                    onClick={onRandom}>
                    <div className='inner'>
                        TRY IT
                    </div>
                </button>
                <img src={mjolnir} alt="mjolnir" />
            </div>
        </main>
    );
};

const View = (char) => {
    const { name, description, thumbnail, homepage, wiki } = char;

    return (
        <div className='banner__info'>
            <section className='img'>
                <img src={thumbnail} alt={name} />
            </section>

            <section className='description'>
                <h1>{name}</h1>
                <div className='information'>
                    {description}
                </div>
                <div className='buttons'>
                    <a className='button button__main'
                        href={homepage}
                        target="_blank"
                        rel="noopener noreferrer">
                        <div className='inner'>
                            HOMEPAGE
                        </div>
                    </a>
                    <a className='button button__secondary'
                        href={wiki}
                        target="_blank"
                        rel="noopener noreferrer">
                        <div className='inner'>
                            WIKI
                        </div>
                    </a>
                </div>
            </section>
        </div>
    )
}
export default Banner;