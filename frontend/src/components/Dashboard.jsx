import React, { useState } from "react";
import { Box } from "@chakra-ui/layout";
import ResultContainer from "./JobResults/ResultContainer";
import Search from "./Search";
import axios from "axios";

/**
 * TODO: Create form elements for adding parameters to the search requests
 * TODO: Pagify the results?
 * TODO: Get another API for CITY, STATE and CITY, COUNTRY combinations for the dropdown/search for locations
 */
const Dashboard = () => {
	const [jobResults, setJobResults] = useState([]);

	const searchJobs = async () => {
		// TODO: This API request should be one to OUR server, the server will call the jsearch API endpoint and respond to here with that data
		const options = {
			method: 'GET',
			url: 'https://jsearch.p.rapidapi.com/search',
			params: {
				query: 'Python developer in Texas, USA',
				page: '1',
				num_pages: '1'
			},
			headers: {
				'X-RapidAPI-Key': 'd6f283f8c4msh64ea8d8b52c9025p1878c0jsne537dd7faef5',
				'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
			}
		};

		try {
			const { data } = await axios.request(options);
			console.log(data);
			setJobResults(data.data);
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