import { useState } from 'react';
import { ZEPTO_CDN_URL } from '../../../../utils/constants';
import './GroceryCard.css';

export default function GroceryCard({ groceryInfo }) {

    const { name, brand, countryOfOrigin, imported } = groceryInfo?.product;
    const { mrp, packsize, unitOfMeasure, weightInGms, formattedPacksize, images, ratingSummary } = groceryInfo?.productVariant;
    const { outOfStock, sellingPrice, isNewProduct } = groceryInfo;
    const [highlightGroceryLogo, setHightlightGroceryLogo] = useState(false);

    const onMouseOverCardHover = () => {
        setHightlightGroceryLogo(true);
    }

    const onMouseLeaveCardHover = () => {
        setHightlightGroceryLogo(false);
    }

    return (
        <div className="grocery-card-container" onMouseEnter={onMouseOverCardHover} onMouseLeave={onMouseLeaveCardHover}>
            <img className={`grocery-logo ${highlightGroceryLogo ? 'grocery-logo-highlighted' : ''}`} src={ZEPTO_CDN_URL + images[0].path} />
            <div className='res-desc'>
                <h3>
                    {name}
                </h3>
                <strong>
                    {formattedPacksize}
                </strong>
                <div className='rating-time'>
                    <h5>
                        ⭐{ratingSummary.averageRating}
                    </h5>
                </div>
                <div className='grocery-price'>
                    ₹{sellingPrice / 100}
                </div>
            </div>
            <button className='add-to-card-btn'>Add to Cart</button>
        </div>
    )
}


// Higher order component => withNewProductLabel
// input => GroceryCard => GroceryCardNew
export const withNewProductLabel = (GroceryCard) => {
    //this is returning a new component
    return (props) => {
        return (
            <div className='grocery-new-label-comp'>
                <label className='new-label'>New</label>
                <GroceryCard {...props}/>
            </div>
        )
    }
}
