import { useEffect, useState } from "react";
import { SWIGGY_RESTAURANTS_MENU } from "../apiConstants";

const useRestaurantMenu = (resturantId) => {

    const [resInfo, setResInfo] = useState({});
    const [menuItemCards, setMenuItemCards] = useState([]);

    useEffect(() => {
        fetchResMenu();
    }, []);

    const fetchResMenu = async () => {
        const data = await fetch(`${SWIGGY_RESTAURANTS_MENU}${resturantId}&catalog_qa=undefined&submitAction=ENTER`);
        const jsonData = await data.json();
        console.log("menu details: ", jsonData);
        setResInfo(jsonData?.data?.cards[2]?.card?.card?.info);
        const menuItemCardsData = [];
        jsonData?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.forEach((card) => {
            if (card.card?.card?.itemCards) {
                const title = card.card?.card?.title;
                card.card.card.itemCards.forEach(itemCard => {
                    menuItemCardsData.push({ ...itemCard, title });
                });
            }
        })
        console.log("menuItemCardsData: ", menuItemCardsData);
        setMenuItemCards(menuItemCardsData);
    }

    return { resInfo, menuItemCards };
}

export default useRestaurantMenu;