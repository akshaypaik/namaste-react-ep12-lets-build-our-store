import { useState } from 'react';
import { CDN_URL } from '../../../../utils/constants';
import './RestaurantMenuCard.css';

export default function RestaurantMenuCard({ menuCardDetails }) {

    const { name, finalPrice, defaultPrice, price, ratings, description, imageId } = menuCardDetails;
    const { rating, ratingCount, ratingCountV2 } = ratings.aggregatedRating;
    const [highlightResMenuCard, setHighlightResMenuCard] = useState(false);

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
                    <button className='menu-add' onMouseEnter={()=> setHighlightResMenuCard(true)} onMouseLeave={()=> setHighlightResMenuCard(false)} >ADD</button>
                </div>
            </div>
        </>

    )
}