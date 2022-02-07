import './Header.scss';


const Header = () => {
    return (
        <header className='header'>
            <a href="#">
                <h1><span className='red'>Marvel</span> information portal</h1>
            </a>
            <ul className='header__menu'>
                <li><a href="#" className='red'> Characters </a> /</li> 
                <li><a href="#"> Comics</a></li>
            </ul>
        </header>
    );
};

export default Header;