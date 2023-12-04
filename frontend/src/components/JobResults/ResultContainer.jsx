import { Wrap, WrapItem } from "@chakra-ui/react";
import JobCard from "./JobCard";
import React from "react";

/**
 * @param {Object} props
 * @param {Object[]} props.jobResults
 * @param {Set<number>} props.savedListings
 */
const ResultContainer = ({ jobResults, savedListings }) => {
	return (
		<Wrap p={5} overflow="scroll" h="100vh">
			{jobResults.length > 0 ?
				jobResults.map((result) => {
					return (
						<WrapItem key={result.job_id}>
							<JobCard jobData={result} isSaved={savedListings.has(result.job_id)} />
						</WrapItem>
					);
				})
				: ""
			}
		</Wrap>
	);
}

export default ResultContainer;