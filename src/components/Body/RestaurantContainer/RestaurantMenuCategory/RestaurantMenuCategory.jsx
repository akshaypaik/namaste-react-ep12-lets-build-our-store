import { useEffect, useState } from 'react';
import RestaurantMenuCard from '../RestaurantMenuCard/RestaurantMenuCard';
import './RestaurantMenuCategory.css';

export default function RestaurantMenuCategory({ category, categoryInfos, showMenuCard, onSelectedCategory }) {

    return (
        <div className='res-menu-category'>
            <div className='category-name-accordion' onClick={(e) => { onSelectedCategory(category)}}>
                <span>{category} ({categoryInfos.length})</span>
                <span>🔽</span>
            </div>

            {showMenuCard && categoryInfos.map((item, index) =>
                <RestaurantMenuCard menuCardDetails={item?.card?.info} key={item?.card?.info.id}
                />)}

        </div>
    )
}