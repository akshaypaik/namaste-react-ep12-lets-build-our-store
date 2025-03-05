import { useEffect, useState } from 'react';
import { CDN_URL } from '../../../../utils/constants';
import './RestaurantMenuCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity } from '../../../../utils/ReduxStore/cartSlice';

export default function RestaurantMenuCard({ menuCardDetails }) {

    const { name, finalPrice, defaultPrice, price, ratings, description, imageId } = menuCardDetails;
    const { rating, ratingCount, ratingCountV2 } = ratings.aggregatedRating;
    const [highlightResMenuCard, setHighlightResMenuCard] = useState(false);
    const [isMenuItemSelected, setIsMenuItemSelected] = useState(false);
    const [quantity, setQuantity] = useState(0);

    const dispatch = useDispatch();
    const cardDetails = useSelector((store) => store.cart.cartItems);

    const handleAddMenuCard = () => {
        // Redux
        // Dispatch an action
        setIsMenuItemSelected(true);
        setQuantity((prevValue) => prevValue + 1);
        setHighlightResMenuCard(false);
        const quantityValue = quantity + 1;
        dispatch(addToCart({menuCardDetails, quantityValue}));
    }

    useEffect(() => {
        const index = cardDetails.findIndex((item) => item.id === menuCardDetails.id);
        if(index == -1){
            setIsMenuItemSelected(false);
            setQuantity(0);
        }else{
            setIsMenuItemSelected(true);
            setQuantity(cardDetails[index].quantity ? cardDetails[index].quantity : quantity);
            // setQuantity(1);
        }
    }, [cardDetails, quantity]);

    const onQuantityIncrease = () => {
        const quantityValue = quantity + 1;
        dispatch(updateQuantity({menuCardDetails, quantityValue}));
    }

    const onQuantityDecrease = () => {
        if(quantity > 0 ){
            setQuantity((prevValue) => prevValue - 1);
            const quantityValue = quantity - 1;
            dispatch(updateQuantity({menuCardDetails, quantityValue}));
        }
    }

    return (
        <>
            <div className={`res-menu-card-container ${highlightResMenuCard ? 'menu-add-highlight' : ''}`}>
                <div>
                    <div className='menu-name'>
                        {name}
                    </div>
                    <div className='menu-price'>
                        ₹{(finalPrice ? finalPrice : defaultPrice ? defaultPrice : price) / 100}
                    </div>
                    {rating && <div>
                        ⭐<span className='menu-rating-number'>{rating}</span> <span className='menu-rating-count'>({ratingCountV2})</span>
                    </div>}
                    <div className='menu-description'>
                        {description}
                    </div>
                </div>
                <div className='image-container'>
                    <img className='menu-image' src={`${CDN_URL}${imageId}`} />
                    {!isMenuItemSelected && <button className='menu-add'
                        onMouseEnter={() => setHighlightResMenuCard(true)}
                        onMouseLeave={() => setHighlightResMenuCard(false)}
                        onClick={handleAddMenuCard}
                    >ADD
                    </button>}
                    {isMenuItemSelected && <button className='menu-quantity'>
                       <span className='quantity-incr-icon' onClick={onQuantityDecrease}>-</span> 
                       <span>{quantity}</span> 
                       <span className='quantity-incr-icon' onClick={onQuantityIncrease}>+</span> 
                    </button>}
                </div>
            </div>
        </>

    )
}