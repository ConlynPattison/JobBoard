import { ChakraProvider } from "@chakra-ui/react";
import HomePage from "./routes/HomePage";
import ErrorPage from "./routes/ErrorPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./routes/LoginPage";
import { AuthContext } from "./context/AuthContext.tsx";
import { useAuth } from "./hooks/useAuth.ts";


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
]);

function App() {
	const { user, login, logout, setUser } = useAuth();

	return (
		<ChakraProvider>
			<AuthContext.Provider value={{ user, setUser }}>
				<RouterProvider router={router} />
			</AuthContext.Provider>
		</ChakraProvider>
	);
}

export default App;
