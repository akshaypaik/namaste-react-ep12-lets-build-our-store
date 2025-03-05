import useGroceryList from './../../../utils/CustomHooks/useGroceryList';
import './Grocery.css';
import GroceryCard, { withNewProductLabel } from './GroceryCard/GroceryCard';

const Grocery = () => {

    const groceryList = useGroceryList();

    //Higher Order Component
    const GroceryCardNew = withNewProductLabel(GroceryCard);

    console.log("groceryList: ", groceryList);


    return (
        <>
            <h1>Welcome to Grocery Store!</h1>
            <div className='grocery-container'>
                {groceryList.map((groceryItem) => groceryItem.isNewProduct ?
                    <GroceryCardNew key={groceryItem.id} groceryInfo={groceryItem} /> :
                    <GroceryCard key={groceryItem.id} groceryInfo={groceryItem} />)}
            </div>
        </>
    )
}

export default Grocery;