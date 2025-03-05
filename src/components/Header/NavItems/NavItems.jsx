import { useEffect, useState, useContext } from 'react';
import './NavItems.css';
import { Link } from 'react-router-dom';
import UserContext from '../../../utils/Context/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import Cart from '../../Body/Cart/Cart';
import { clearCart } from '../../../utils/ReduxStore/cartSlice';

export default function NavItems() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showCartDetailItems, setShowCartDetailItems] = useState(false);
    const [cartTotal, setCartTotal] = useState(0);

    console.log("NavItems rendered");

    const { loggedInUser, setUsername } = useContext(UserContext);
    const dispatch = useDispatch();

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

    // Redux
    // Subscribing to the store using Selector
    const cartItems = useSelector((store) => store.cart.cartItems);
    console.log("cartItems: ", cartItems);

    const handleCartMouseEvents = (mouseEvent) => {
        if (mouseEvent === "mouseenter") {
            setShowCartDetailItems(true);
        } else if (mouseEvent === "mouseleave") {
            setShowCartDetailItems(false);
        }
    }

    const handleClearCart = () => {
        dispatch(clearCart());
    }

    useEffect(() => {
        const totalCartPrice = cartItems.reduce((sum, item) => {
            const price = ((item.finalPrice ? item.finalPrice : item.defaultPrice ? item.defaultPrice : item.price) / 100) * item.quantity;
            return sum = sum + price;
        }, 0);
        setCartTotal(totalCartPrice);
    }, [cartItems])

    return (
        <div className="nav-items">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/grocery">Grocery</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li className='cart-li' onMouseEnter={() => handleCartMouseEvents('mouseenter')} onMouseLeave={() => handleCartMouseEvents('mouseleave')}>
                    <span className='cart-count'>{cartItems.length}</span>
                    <span className="cart-icon">
                    </span>
                    Cart
                    {showCartDetailItems && cartItems.length > 0 && 
                    <div className='cart-details'>
                        <div className='clear-cart-parent'><div className='clear-cart' onClick={handleClearCart}>Clear Cart</div></div>
                        {cartItems.map((item) => <Cart menuCardDetails={item} key={item.name} />)}
                        <div className='cart-total-container'>
                            <strong>Total:</strong> <span>₹{cartTotal}</span>
                        </div>
                        <button className='cart-checkout-btn'>CHECKOUT</button>
                    </div>}
                </li>
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