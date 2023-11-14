import { ChakraProvider } from "@chakra-ui/react";
import DemoPage from "./routes/DemoPage";


function App() {
  return <ChakraProvider>
    <DemoPage />
  </ChakraProvider>;
}

export default App;
