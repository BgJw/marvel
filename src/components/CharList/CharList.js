import './CharList.scss';
import '../../Style/button.scss';
import Spinner from '../Spinner/Spinner';
import PropTypes from 'prop-types';
import ErrorMesage from '../ErrorMesage/ErrorMesage';



const CharList = ({ chars, onGetMoreChar, onDescription, charId, loading, error }) => {

    const spinners = ()=> {
        let spin = [];
        for (let i = 0; i < 9; i++) {
            spin.push(<Spinner key={i} />)
        }
        return spin;
    }
    
    const list = (chars)=> {
        return chars.map(char => {

            const active = char.id === charId;
            const clazz = active ? 'active' : '';
            return (
                <li
                    key={char.id}
                    onClick={onDescription.bind(null, char.id)}
                    className={clazz}
                >   
                <button>
                    <img src={char.thumbnail} alt={char.name} />
                    <div>{char.name}</div>
                </button>
                </li>
            )
        })
    }

    
    const errorMesage = error ? <ErrorMesage /> : null;
    const spinner = loading && !chars.newItemsLoading? spinners() : null;

    return (
        <div className='charList'>
            <ul>
                {errorMesage || spinner || list(chars.charList)}
            </ul>
            <button 
                className="button button__main button__long"
                onClick={onGetMoreChar}
                disabled={chars.newItemsLoading}
                style={chars.offset >= 1550 ? { display: 'none' } : { display: '' }}>
                <div 
                    className="inner">
                        load more
                </div>
            </button>
        </div>
    );
};

CharList.propTypes = {
    chars: PropTypes.object,
    onGetMoreChar: PropTypes.func.isRequired,
    onDescription: PropTypes.func.isRequired
}

export default CharList;