import { Link, NavLink } from 'react-router-dom';
import './Header.scss';


const Header = () => {


    return (
        <header className='header'>
            <Link to="/">
                <h1><span className='active'>Marvel</span> information portal</h1>
            </Link>
            <ul className='header__menu'>
                <li>
                    <NavLink exact to='/' >
                        Characters
                    </NavLink> /
                </li>
                <li>
                    <NavLink exact to='/comics' >
                        Comics
                    </NavLink>
                </li>
            </ul>
        </header>
    );
};

export default Header;