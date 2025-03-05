import { CDN_URL } from '../../../utils/constants';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../../utils/ReduxStore/cartSlice';
import './Cart.css';

export default function Cart({ menuCardDetails }) {

    const { name, finalPrice, defaultPrice, price, ratings, description, imageId, quantity } = menuCardDetails;

    const dispatch = useDispatch();

    const handleRemoveCartItem = () => {
        // Redux
        // Dispatch an action
        dispatch(removeFromCart(menuCardDetails));
    }

    return (
        <>
            <div className={`cart-card-container`}>
                <div className='cart-detail'>
                    <div className='menu-name'>
                        {name} x <strong>{quantity}</strong>
                    </div>
                    <div className='menu-price'>
                        ₹{(finalPrice ? finalPrice : defaultPrice ? defaultPrice : price) / 100}
                    </div>
                    <div className='cart-description'>
                        {description}
                    </div>
                </div>
                <div className='image-container'>
                    <img className='cart-image' src={`${CDN_URL}${imageId}`} />
                    <button className='cart-remove'
                        onClick={handleRemoveCartItem}>
                        REMOVE
                    </button>
                </div>
            </div>
        </>

    )
}