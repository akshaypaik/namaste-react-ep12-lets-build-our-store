import React from "react";
import UserClass from "./User/User";

class ContactClass extends React.Component {


    // Important Lifecycle concept of class based component =>
    // First constructor is called and then render is called and then component did mount is called
    // If component have a child component then the flow is =>
    //      1. parent constructor
    //      2. parent render => in render it finds out there is a child component here in this file line number 45
    //      3. child constructor is called
    //      4. child render is called
    //      5. child component did mount is called
    //      6. finally parent component did mount is called

    // If component have multiple child component then the flow is =>
    //      1. parent constructor
    //      2. parent render => in render it finds out there is a child component here in this file line number 45 and 46
    //      3. child constructor of line number 45 (first child) is called
    //      4. child render of line number 45 (first child) is called
    //      5. child constructor of line number 46 (second child) is called
    //      6. child render of of line number 46 (second child) is called           => this happens due to react batching. react batches the child render phase of all the children
    //      7. child component did mount is called of line number 45 (first child)
    //      8. child component did mount is called of line number 46 (second child)     => this is the commit phase where all the changes are applied to DOM. As this is expensive operation this will be done after the batch render of children. This is the batch commit.
    //      9. finally parent component did mount is called

    //  Reference Links ->  react lifecycle diagram (where render and commit phase are explained)
    //  https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

    constructor(props) {
        super(props);

        console.log("parent constructor called");
    }

    componentDidMount() {
        console.log("parent component did mount called");
    }


    render() {

        console.log("parent render called");

        return (
            <div>
                <UserClass name="Akshay Pai" />
                {/* <UserClass name="Radhe Pai" /> this is commented but feel free to uncomment to revise this topic */}
            </div>
        )
    }
}

export default ContactClass;