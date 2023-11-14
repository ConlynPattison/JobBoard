import { ChakraProvider } from "@chakra-ui/react";
import HomePage from "./routes/HomePage";
import ErrorPage from "./routes/ErrorPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./routes/LoginPage";


const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
		errorElement: <ErrorPage />
	},
	{
		path: "login",
		element: <LoginPage />
	}
])

function App() {
	return (
		<ChakraProvider>
			<RouterProvider router={router} />
		</ChakraProvider>
	);
}

export default App;
