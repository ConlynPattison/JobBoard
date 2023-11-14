import { Button } from "@chakra-ui/button";

// TODO: Will eventually include search bar, select elements, and submission confirmation checks
const Search = ({ submitSearch }) => {
	return <Button onClick={submitSearch} variant="solid" colorScheme="blue"> Search </Button>
}

export default Search;