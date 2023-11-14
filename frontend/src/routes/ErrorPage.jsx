import { Center, Flex, Heading } from "@chakra-ui/layout";
import { useRouteError } from "react-router";

// TODO:
const ErrorPage = () => {
	const error = useRouteError();
	console.error(error);

	return (
		<Flex h='100vh'>
			<Center w='100vw' flexDirection='column'>
				<Heading>Oops!</Heading>
				<p>Sorry, there was an unexpected error.</p>
				<p>
					<i>{error.statusText || error.message}</i>
				</p>
			</Center>
		</Flex>
	);
}

export default ErrorPage;