import './CharList.scss';
import '../../Style/button.scss';
import Spinner from '../Spinner/Spinner';
import PropTypes from 'prop-types';



const CharList = ({ chars, onGetMoreChar, onDescription, charId }) => {

    function renderSpinner() {
        let spin = [];
        for (let i = 0; i < 9; i++) {
            spin.push(<Spinner key={i} />)
        }
        return spin;
    }

    function renderLi(chars) {
        return chars.map(char => {
            const active = char.id === charId;
            const clazz = active ? 'active' : '';
            return (
                <li
                    key={char.id}
                    onClick={onDescription.bind(null, char.id)}
                    className={clazz}
                >
                    <img src={char.thumbnail} alt={char.name} />
                    <div>{char.name}</div>
                </li>
            )
        }
        )
    }

    return (
        <div className='charList'>
            <ul>
                {
                    !chars.loading ?
                        renderLi(chars.charList)
                        :
                        renderSpinner()
                }
            </ul>
            <button 
                className="button button__main button__long"
                onClick={onGetMoreChar}
                disabled={chars.newItemLoading}
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