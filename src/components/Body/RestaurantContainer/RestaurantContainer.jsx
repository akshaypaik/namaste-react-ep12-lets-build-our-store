import { useEffect, useState } from "react";
import Filter from "./Filter/Filter";
import RestaurantCard from "./RestaurantCard/RestaurantCard";
import './RestaurantContainer.css';
import ShimmerUI from "./ShimmerUI/ShimmerUI";
import Search from "./Search/Search";
import { Link } from "react-router-dom";
import useRestaurantList from "../../../utils/CustomHooks/useRestaurantList";
import useOnlineStatus from "../../../utils/CustomHooks/useOnlineStatus";

export default function RestaurantContainer() {

    //React Hooks - Normal JS function
    // Most important 2 hooks 
    // useState() - superpowerful local state variable in react
    // useEffect() - 

    // React Core Concept ->
    // React uses Reconciliation Algorithm also known as React Fiber (came in React 16)
    // Virtual DOM is representation of Actual DOM
    // Virtul DOM is React Elements (JS object) -> console.log(<Component />) will give you React Element which is normal JS object.
    // Diff Algorithm -> finds out difference between updated virtual DOM and previous virtual DOM -> this will actually update the actual DOM on every render cycle.

    //Example ->
    // If there are 15 restaurants which are loaded at start of the component and when user clicks on Top Rated filter button the restaurant data changes to (continues nexct line)
    // 7 then a new object is created with this new data. The diff algorithm finds the difference between new 7 resturant object with old 15 resturant object and then updates the actual DOM


    // Normal JS variable
    // let listOfRestaurants = [
    //     {
    //         info: {
    //             id: "10575",
    //             name: "Pizza Hut",
    //             cloudinaryImageId: "RX_THUMBNAIL/IMAGES/VENDOR/2024/7/16/5b9c53df-e0cb-48fc-ac31-f02735592edc_10575.jpg",
    //             costForTwo: "₹600 for two",
    //             cuisines: [
    //                 "Pizzas"
    //             ],
    //             avgRating: 3.8,
    //             sla: {
    //                 deliveryTime: 37,
    //             },
    //         },

    //     },
    //     {
    //         info: {
    //             id: "10576",
    //             name: "Dominos",
    //             cloudinaryImageId: "RX_THUMBNAIL/IMAGES/VENDOR/2024/7/16/5b9c53df-e0cb-48fc-ac31-f02735592edc_10575.jpg",
    //             costForTwo: "₹600 for two",
    //             cuisines: [
    //                 "Pizzas"
    //             ],
    //             avgRating: 4.5,
    //             sla: {
    //                 deliveryTime: 24,
    //             },
    //         },

    //     },
    //     ,
    //     {
    //         info: {
    //             id: "10577",
    //             name: "McDonald's",
    //             cloudinaryImageId: "RX_THUMBNAIL/IMAGES/VENDOR/2024/7/16/5b9c53df-e0cb-48fc-ac31-f02735592edc_10575.jpg",
    //             costForTwo: "₹600 for two",
    //             cuisines: [
    //                 "Pizzas",
    //                 "Burger"
    //             ],
    //             avgRating: 4.1,
    //             sla: {
    //                 deliveryTime: 18,
    //             },
    //         },

    //     }
    // ]

    // Super powerful react local state variable
    //Whenever state variable updates React trigger Reconciliation cycle -> React rerenders the component
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [removeClearFilterStyle, setRemoveClearFilterStyle] = useState(false);
    const [searchFilterResultCalled, setSearchFilterResultCalled] = useState(false);

    const swiggyBackendRestaurantsSOT = useRestaurantList();
    const onlineStatus = useOnlineStatus();

    // This will be called once component renders
    useEffect(() => {
        setListOfRestaurants(swiggyBackendRestaurantsSOT);
    }, [swiggyBackendRestaurantsSOT]);

    const handleTopRatedFilter = () => {
        // Whenever a state variable updates, React will rerender the component
        const topRatedFilteredList = swiggyBackendRestaurantsSOT.filter((resItem) => resItem.info.avgRating >= 4.5);
        setListOfRestaurants(topRatedFilteredList);
        setRemoveClearFilterStyle(false);
    }

    const handleFatestDeliveryFilter = () => {
        const fastestDeliveryFilteredList = swiggyBackendRestaurantsSOT.filter((resItem) => resItem.info.sla.deliveryTime <= 25);
        setListOfRestaurants(fastestDeliveryFilteredList);
        setRemoveClearFilterStyle(false);
    }

    const handleClearFilter = () => {
        setListOfRestaurants(swiggyBackendRestaurantsSOT);
        setRemoveClearFilterStyle(true);
    }

    const handleSearchInputChange = (inputString) => {
        setSearchFilterResultCalled(true);
        console.log("input string from res container: ", inputString);
        if (inputString !== "") {
            setRemoveClearFilterStyle(true);
            setListOfRestaurants(swiggyBackendRestaurantsSOT.filter((res) => res.info.name.toLowerCase().includes(inputString.toLowerCase())));
        } else {
            setListOfRestaurants(swiggyBackendRestaurantsSOT);
            setSearchFilterResultCalled(false);
        }
    }

    if(!onlineStatus){
        return <div className="offline-msg">
            ⚠️Looks like you're offline! Please check your internet connection!🌍
        </div>
    }

    // Conditional Rendering
    if (listOfRestaurants.length === 0 && !searchFilterResultCalled) {
        // return <h1>Loading...</h1>
        return <ShimmerUI />
    }

    return (
        <div className="res-container-main">
            <div className="res-container-filters">
                <Search onSearchInputChange={handleSearchInputChange} />
                <Filter onTopRated={handleTopRatedFilter} onFastestDelivery={handleFatestDeliveryFilter} onClearFilter={handleClearFilter} removeClearFilterStyles={removeClearFilterStyle} />
            </div>
            <h2>Best Restaurants in Bangalore</h2>
            <div className="res-container">
                {listOfRestaurants.map((resItem) =>
                    <Link to={`/restaurant/${resItem.info.id}`} key={resItem.info.id}>
                        <RestaurantCard resObj={resItem} />
                    </Link>)}
            </div>
        </div>
    )
}