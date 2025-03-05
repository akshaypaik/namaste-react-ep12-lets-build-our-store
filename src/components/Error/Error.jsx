import { useRouteError } from "react-router-dom";

const Error = () => {

    const error = useRouteError();

    return (
        <div>
           {`Oops! Something went wrong => ${error.data} `}
        </div>
    );
}

export default Error;