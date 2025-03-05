import { useEffect, useState, useContext } from 'react';
import './NavItems.css';
import { Link } from 'react-router-dom';
import UserContext from '../../../utils/Context/UserContext';

export default function NavItems() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    console.log("NavItems rendered");

    const { loggedInUser, setUsername } = useContext(UserContext);

    // If no dependency array => useEffect is called on every component render 
    // If dependency array is empty = [] => useEffect is called on initial component render(only once)  
    // If dependency array is [isLoggedIn] => useEffect is called everytime isLoggedIn is updated
    useEffect(() => {
        console.log("header useEffect called");
        setTimeout(() => {
            console.log("header settimeout called");
            setUsername("Akshay Pai");
        }, 2000);
    }, []);

    return (
        <div className="nav-items">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/grocery">Grocery</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><span className="cart-icon"></span>Cart</li>
                <button
                    onClick={() => setIsLoggedIn(!isLoggedIn)}
                    className={`login-btn ${isLoggedIn ? 'logged-out' : 'logged-in'}`}>
                    {isLoggedIn ? 'Log Out' : 'Log In'}
                </button>
                <li>{loggedInUser}</li>
            </ul>
        </div>
    )
}