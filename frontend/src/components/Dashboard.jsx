import React, { useState } from "react";
import { Box } from "@chakra-ui/layout";
import ResultContainer from "./JobResults/ResultContainer";
import Search from "./Search";

/**
 * TODO: Create form elements for adding parameters to the search requests
 * TODO: Pagify the results?
 * TODO: Get another API for CITY, STATE and CITY, COUNTRY combinations for the dropdown/search for locations
 */
const Dashboard = () => {
	const [jobResults, setJobResults] = useState([]);

	const searchJobs = async () => {
		try {
			const response = await fetch('/api/test');
			const data = await response.json();
			console.log(data);
			setJobResults(data?.data);
		} catch (error) {
			console.error(error);
		}
	};

	return <>
		<Search submitSearch={searchJobs} />
		<Box>
			{jobResults.length > 0 ?
				<ResultContainer jobResults={jobResults} /> : ""}
		</Box>
	</>;
};

export default Dashboard;