import { useEffect, useState } from "react";
import { ZEPTO_GROCERY_LIST } from "./../apiConstants";

export default function useGroceryList(){

    const [groceryList, setGroceryList] = useState([]);
   
    useEffect(() => {
        fetchGroceryList();
    }, []);

    const fetchGroceryList = async() => {
        const data = await fetch(`${ZEPTO_GROCERY_LIST}`);
        const jsonData =  await data.json();
        setGroceryList(jsonData?.storeProducts);
    }

    return groceryList;

}