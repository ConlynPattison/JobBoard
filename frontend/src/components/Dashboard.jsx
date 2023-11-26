import React, { useState } from "react";
import styles from "./Dashboard.module.css"
import { Box, Flex } from "@chakra-ui/layout";
import ResultContainer from "./JobResults/ResultContainer";
import Search from "./Search";
import SearchPanel from "./SearchPanel";

/**
 * TODO: Create form elements for adding parameters to the search requests
 * TODO: Pagify the results?
 * TODO: Get another API for CITY, STATE and CITY, COUNTRY combinations for the dropdown/search for locations
 */
const Dashboard = () => {
	const [jobResults, setJobResults] = useState([]);

	return <>
		<Flex className={styles.dashboardParent}>
			{/* <Search submitSearch={searchJobs} /> */}
			<SearchPanel setResults={setJobResults} />
			<Box flex="70%">
				{jobResults.length > 0 ?
					<ResultContainer jobResults={jobResults} /> : ""}
			</Box>
		</Flex>
	</>;
};

export default Dashboard;