import { useRouteError } from "react-router";

// TODO:
const ErrorPage = () => {
	const error = useRouteError();
	return <>{"There was an error :( " + error.statusText || error.message}</>
}

export default ErrorPage;