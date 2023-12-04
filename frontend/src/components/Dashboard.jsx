import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css"
import { Box, Flex } from "@chakra-ui/layout";
import ResultContainer from "./JobResults/ResultContainer";
import SearchPanel from "./SearchPanel";
import { useAuth } from "../hooks/useAuth.ts";

/**
 * TODO: Pagify the results?
 * TODO: Get another API for CITY, STATE and CITY, COUNTRY combinations for the dropdown/search for locations
 */
const Dashboard = () => {
	const [jobResults, setJobResults] = useState([]);
	const [savedListings, setSavedListings] = useState(new Set())
	const { user } = useAuth();

	useEffect(() => {
		// TODO: Fetch the saved_listing table records for this user
		// TODO: Set the savedListings set (holding only the listing_ids of this user)
		
	}, [user])

	return <>
		<Flex className={styles.dashboardParent}>
			<SearchPanel setResults={setJobResults} />
			<Box flex="70%">
				{jobResults.length > 0 ?
					<ResultContainer jobResults={jobResults} savedListings={savedListings}/> : ""}
			</Box>
		</Flex>
	</>;
};

export default Dashboard;