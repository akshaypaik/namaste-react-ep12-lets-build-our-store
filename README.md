# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

    # React Hooks - Normal JS function
    // Most important 2 hooks 
    // useState() - superpowerful local state variable in react
    // useEffect() - 

    # React Core Concept ->
    // React uses Reconciliation Algorithm also known as React Fiber (came in React 16)
    // Virtual DOM is representation of Actual DOM
    // Virtul DOM is React Elements (JS object) -> console.log(<Component />) will give you React Element which is normal JS object.
    // Diff Algorithm -> finds out difference between updated virtual DOM and previous virtual DOM -> this will actually update the actual DOM on every render cycle.

    //Example ->
    // If there are 15 restaurants which are loaded at start of the component and when user clicks on Top Rated filter button the restaurant data changes to (continues nexct line)
    // 7 then a new object is created with this new data. The diff algorithm finds the difference between new 7 resturant object with old 15 resturant object and then updates the actual DOM


    # useState core concepts
    - useState variables are declared like const [name, setName] - useState("akshay");
    - here akshay is default value for name.
    - we are doing array destructing as useState will return an array where first arguement is variable and second arguement is a function to update that variable.
    - whenever this variable changes react will rerender the component checking the changes using diff algorithm where it checks for different in old react object and the new one.

    # useEffect core concepts
    - If no dependency array => useEffect is called on every component render 
    - If dependency array is empty = [] => useEffect is called on initial component render(only once)  
    - If dependency array is [isLoggedIn] => useEffect is called everytime isLoggedIn is updated
    useEffect(() => {
        console.log("useEffect called");
    }, []);
    - To clean up things once component is removed from dom. Like for example cleaning up setTimeout() or setInterval()
    we do something like =>
    useEffect(() => {
        const timer = setInterval(() => {
            console.log("react is op")
        }, 1000);
        //clear timer here in this return function of useEffect
        return () => {
            clearTimeout(timer);
        }
    });


    # 2 types of routing in web apps
    - Client side routing
    - Server side routing - we get the html content from server. we send the request to server and fecth the html content.


    # Class based component refer -> User.jsx file and Contact.jsx file
    - React Lifecycle is explained in Contact.jsx file.
    - How parent and child component lifecycle is triggered and how react behaves behind the scenes.

    # Custom Hooks
    - They should not be defined as an async function.
    - This is a utility function. The name of custom hook must start with "use". Example -> useRestaurantList()
    - Refer => RestaurantMenu.jsx and useRestaurantMenu.js files

    # Chunking, Code Splitting, Dynamic Bundling, Lazy Loading, On Demand Loading, Dynamic Loading (all are same)
    - Break down app into smaller logical chunks 
    - Grocery Component for example

    # Higher Order Component
    - Normal JS function.
    - Function which takes a component and returns a component.
    - Refer GroceryCard.jsx for the example of implementation.

    # Context in Reactjs
    - Refer App.jsx and UserContext.js files for example
    - // This is setting the user context we created. we have to wrap our app component with <UserContext.Provider> and pass the value like below
    // This data loggedInUser is available to whole app level as we are wrapping <UserContext.Provider> to the app component
    // If we wrap this <UserContext.Provider> to only Header component then the updated data loggedInUser is only available to Header component and its children.
    // If we uncomment line number 28 (App.jsx) we are passing loggedInUser as Elon Musk in header Elon Musk value will be printed in header and in app all other places it will be Akshay Pai.
    // We can pass function also into this provider like setUsername and use it somewhere else in our application to set the username.
    // This setUsername is refered in NavItems.jsx for example
    <!-- <UserContext.Provider value={{ loggedInUser: username, setUsername }}>
      <div className='app'>
        {/* <UserContext.Provider value={{ loggedInUser: "Elon Musk" }}> */}
        <Header />
        {/* </UserContext.Provider> */}
        <Outlet />
      </div>
    </UserContext.Provider> -->

    #







