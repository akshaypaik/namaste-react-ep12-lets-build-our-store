import './RestaurantMenu.css';
import { useParams } from 'react-router-dom';
import ShimmerUICard from '../ShimmerUI/ShimmerUICard/ShimmerUICard';
import useRestaurantMenu from '../../../../utils/CustomHooks/useRestaurantMenu';
import RestaurantMenuCategory from '../RestaurantMenuCategory/RestaurantMenuCategory';
import { useEffect, useRef, useState } from 'react';

export default function RestaurantMenu() {

    const { resturantId } = useParams();

    //This is a custom hook useRestaurantMenu()
    const { resInfo = {}, menuItemCards = [] } = useRestaurantMenu(resturantId);
    const [selectedCategory, setSelectedCategory] = useState("");
    // useRef is a React Hook that lets you reference a value that’s not needed for rendering.
    const initialCategorySet = useRef(false);

    const { name, cuisines, costForTwoMessage } = resInfo;
    console.log("menuItemCards: ", menuItemCards);

    const menuCategories = new Set([]);
    const menuItemDataWithCategory = [];

    menuItemCards.forEach((menuItem) => {
        menuCategories.add(menuItem.title);
    });
    menuCategories.forEach((category) => {
        const data = menuItemCards.filter(item => item.title === category);
        menuItemDataWithCategory.push({ category, data });
    });
    console.log("menuCategories: ", menuCategories);
    console.log("menuItemDataWithCategory: ", menuItemDataWithCategory);

    useEffect(() => {
        if(menuCategories.size > 0 && !initialCategorySet.current){
            const [firstElement] = menuCategories;
            console.log("useEffect: ", firstElement);
            initialCategorySet.current = true;
            setSelectedCategory(firstElement);
        }
        
    }, [menuCategories]);

    if (menuItemCards.length === 0) {
        return <ShimmerUICard />
    }
   
    const handleSelectedCategory = (category) => {
        selectedCategory === category ? setSelectedCategory("") : setSelectedCategory(category);
    }

    return (
        <div className="res-menu">
            <h1>{name}</h1>
            <div> {cuisines?.join(", ").toUpperCase()} - <strong>{costForTwoMessage}</strong></div>
            <h2>Menu</h2>
            {menuItemDataWithCategory.map((menu, index) => {
                return <RestaurantMenuCategory category={menu.category}
                    categoryInfos={menu.data}
                    key={menu.category}
                    onSelectedCategory={handleSelectedCategory}
                    showMenuCard={selectedCategory === menu.category ? true : false}
                />
            })}
        </div>
    )
}