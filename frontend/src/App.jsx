import { ChakraProvider } from "@chakra-ui/react";
import HomePage from "./routes/HomePage";
import ErrorPage from "./routes/ErrorPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProfilePage from "./routes/ProfilePage";
import LoginPage from "./routes/LoginPage";
import { AuthContext } from "./context/AuthContext.tsx";
import { useState } from "react";


const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
		errorElement: <ErrorPage />
	},
	{
		path: "login",
		element: <LoginPage />,
		errorElement: <ErrorPage />
	},
	{
		path: "profile",
		element: <ProfilePage />,
		errorElement: <ErrorPage />
	}
]);

function App() {
	const [user, setUser] = useState(null);

	return (
		<ChakraProvider>
			<AuthContext.Provider value={{ user, setUser }}>
				<RouterProvider router={router} />
			</AuthContext.Provider>
		</ChakraProvider>
	);
}

export default App;
