import React from "react";
import './User.css';

// this is class based component (old way of writing react components)
class UserClass extends React.Component {

    // always we receive props in this constructor
    // this will be called first in component life cycle
    constructor(props) {

        // we must do this super(props) so that we can use it anywhere in the class using this keyword like line number 18.
        super(props);

        console.log("child constructor called: ", this.props.name);

        // this is the way to create state variable in class based components. Earlier there was no react hooks like useState().
        // this is new react equivalent of const [count] = useState(0); 
        // this.state is a reserved keyword from react
        // mouting cycle of react is finished by updating this defualt values to the page
        this.state = {
            count: 0,
            userInfo: {
                name: "yet to be fetched!",
                location: "earth"
            }
        }
    }

    // this is called once the component is fully loaded that is component is mounted.
    // this will be called after render() in component life cycle
    // api calls will be done here
    async componentDidMount() {
        console.log("child component did mount called ", this.props.name);

        // we used to call api here in this method in old react
        // api call
        const data = await fetch(`https://api.github.com/users/akshaypaik`);      // getting user data from github
        const jsonData = await data.json();

        console.log("contact data: ", jsonData);

        // to set the state we use this.setState({}); this.state is a big object with all the state properties in it.
        // this is when the updating cycle of react begins => updating cycle happens only when new props is recieved, setState() and forceUpdate()
        // when this state varibale userInfo is updated. react will calculate the diff and updates the dom and then componentDidUpdate() is called.
        this.setState({
            userInfo: jsonData
        });

    }

    // this is called when dom is rendered with api data after setState() line number 45
    componentDidUpdate(){
        console.log("child component did update");
    }

    // this will be called when the component is unmounted
    // mounting means showing on to the UI
    // unmounting means removing from the UI
    // If we navigate to some other page like about us or home. this method will be called.
    componentWillUnmount(){
        console.log("child compoment will unmount");
    }

    // write jsx piece of code in render() method
    // this will be called second in component life cycle
    render() {

        console.log("child render called ", this.props.name);

        const { name, location, avatar_url } = this.state.userInfo;

        return (
            <div className="contact-container">
                {/* using state in jsx */}

                {/* this below code is comment but feel free to uncomment to revise this using state in old react topic  */}
                {/* <h1>{this.state.count}</h1>
                <button onClick={() => {
                    // this is the way to update state variable in old react
                    this.setState({
                        count: this.state.count + 1
                    })
                }}>
                    Increase Count
                </button> */}

                <div>
                    <img src={avatar_url} className="user-avatar" alt="user avatar" />
                </div>
                <div>
                    <div>
                        {/* Name: {this.props.name} */}
                        <strong>Name:</strong> {name}
                    </div>
                    <div>
                        {/* Location: Bangalore */}
                        <strong>Location:</strong> {location}
                    </div>
                </div>
            </div>
        )
    }
}

export default UserClass;


/**
 * 
 * 
 *  REACT LIFECYCLE METHODS
 * 
 * 
 *  ---- MOUNTING-----
 * 
 * Constructor (dummy data)
 * Render (with dummy data)
 *  <HTML Dummy Data>
 * 
 * Component Did Mount
 *      <API CALL HAPPENS>
 *      <this.setState()> -> State variable is updated
 * 
 * ----- UPDATING ------
 * 
 * Render (with API DATA)
 *  <HTML API Data>
 * Component Did Update
 * 
 * 
 * */