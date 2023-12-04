import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css"
import { Box, Flex } from "@chakra-ui/layout";
import ResultContainer from "./JobResults/ResultContainer";
import SearchPanel from "./SearchPanel";
import { useAuth } from "../hooks/useAuth.ts";
import axios from "axios";

/**
 * TODO: Pagify the results?
 * TODO: Get another API for CITY, STATE and CITY, COUNTRY combinations for the dropdown/search for locations
 */
const Dashboard = () => {
	const [jobResults, setJobResults] = useState([]);
	const [savedListings, setSavedListings] = useState(new Set())
	const { user } = useAuth();

	useEffect(() => {
		fetchSavedListings();
	}, [user, savedListings]);

	const fetchSavedListings = async () => {
		if (!user)
			return;
		axios.get("/api/saved/details", {
			headers: {
				Authorization: user?.token || ""
			}
		}).then(({ data }) => {
			const listingIds = data.map((listingDetails) => listingDetails.externalId);
			setSavedListings(() => new Set(listingIds));
		}).catch((err) => {
			console.error(err);
		})
	}

	return <>
		<Flex className={styles.dashboardParent}>
			<SearchPanel setResults={setJobResults} />
			<Box flex="70%">
				{jobResults.length > 0 ?
					<ResultContainer jobResults={jobResults} savedListings={savedListings} setSavedListings={setSavedListings} /> : ""}
			</Box>
		</Flex>
	</>;
};

export default Dashboard;