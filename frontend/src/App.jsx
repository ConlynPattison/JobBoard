import { ChakraProvider } from "@chakra-ui/react";
import DemoPage from "./routes/DemoPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
	{
		path: "/",
		element: <DemoPage />
	}
])

function App() {
	return <ChakraProvider>
		<RouterProvider router={router} />
	</ChakraProvider>;
}

export default App;
