import { Outlet } from 'react-router-dom';
import './App.css'
import Header from './components/Header/Header';
import { useEffect, useState } from 'react';
import UserContext from './utils/Context/UserContext';

function AppLayout() {

  const [username, setUsername] = useState("");

  useEffect(() => {
    //Authentication logic
    const data = {
      name: "Fetching..."
    }
    setUsername(data.name);
  }, []);

  return (
    // This is setting the user context we created. we have to wrap our app component with <UserContext.Provider> and pass the value like below
    // This data loggedInUser is available to whole app level as we are wrapping <UserContext.Provider> to the app component
    // If we wrap this <UserContext.Provider> to only Header component then the updated data loggedInUser is only available to Header component and its children.
    // If we uncomment line number 28 we are passing loggedInUser as Elon Musk in header Elon Musk value will be printed in header and in app all other places it will be Akshay Pai.
    // We can pass function also into this provider like setUsername and use it somewhere else in our application to set the username.
    // This setUsername is refered in NavItems.jsx for example
    <UserContext.Provider value={{ loggedInUser: username, setUsername }}>
      <div className='app'>
        {/* <UserContext.Provider value={{ loggedInUser: "Elon Musk" }}> */}
        <Header />
        {/* </UserContext.Provider> */}
        <Outlet />
      </div>
    </UserContext.Provider>
  )
}



export default AppLayout
