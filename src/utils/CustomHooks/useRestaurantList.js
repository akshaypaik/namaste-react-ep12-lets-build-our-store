import { useEffect, useState } from "react";
import { SWIGGY_RESTAURANTS } from "../apiConstants";

// Custom Hook - All custom hooks we have to name with "use". Example: useRestaurantList
const useRestaurantList = () => {

    const [swiggyBackendRestaurantsSOT, setSwiggyBackendRestaurantsSOT] = useState([]);

    useEffect(() => {
        fetchRestaurantList();
    }, []);

    const fetchRestaurantList = async () => {
        const resData = await fetch(`${SWIGGY_RESTAURANTS}`);
        const resDataJson = await resData.json();
        const swiggyBackendRestaurants = [];
        resDataJson?.data?.cards.forEach((card) => {
            if (card?.card?.card?.gridElements && card?.card?.card?.gridElements?.infoWithStyle && card?.card?.card?.gridElements?.infoWithStyle?.restaurants) {
                const newRestaurants = card.card.card.gridElements.infoWithStyle.restaurants;
                newRestaurants.forEach((restaurant) => {
                    const index = swiggyBackendRestaurants.findIndex((item) => item.info.id === restaurant.info.id);
                    if (index === -1) {
                        swiggyBackendRestaurants.push(restaurant);
                    }
                });
            }
        });
        console.log("swiggyBackendRestaurants: ", swiggyBackendRestaurants);

        setSwiggyBackendRestaurantsSOT(swiggyBackendRestaurants);
    }

    return swiggyBackendRestaurantsSOT;

}

export default useRestaurantList;