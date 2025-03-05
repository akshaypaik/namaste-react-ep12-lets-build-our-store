import './RestaurantCard.css';
import { CDN_URL } from '../../../../utils/constants';
import { useState } from 'react';

export default function RestaurantCard({ resObj }) {

    const {name, cuisines, avgRating, sla, cloudinaryImageId } = resObj?.info;
    const restaurantImage = `${CDN_URL}${cloudinaryImageId}`;
    const [showCartIcon, setShowCartIcon] = useState(false);

    const onMouseOverCardHover = () => {
        setShowCartIcon(true);
    }

    const onMouseLeaveCardHover = () => {
        setShowCartIcon(false);
    }

    return (
        <div className="res-card" onMouseEnter={onMouseOverCardHover} onMouseLeave={onMouseLeaveCardHover}>
            <img className='res-logo' src={restaurantImage} />
            <div className='res-desc'>
                <h3>
                    {name}
                </h3>
                <strong>
                    {cuisines.join(", ")}
                </strong>
                <div className='rating-time'>
                    <h5>
                        ⭐{avgRating}
                    </h5>
                    <h5>
                        ⌚{sla.deliveryTime} Minutes
                    </h5>
                </div>
                {showCartIcon && <div className='add-to-cart'>
                    <div className='cart-icon'></div>
                </div>}
            </div>
        </div>
    )
}