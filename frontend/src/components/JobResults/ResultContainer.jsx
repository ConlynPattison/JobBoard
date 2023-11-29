import { Wrap, WrapItem } from "@chakra-ui/react";
import JobCard from "./JobCard";
import React from "react";


const ResultContainer = ({ jobResults }) => {
	return (
		<Wrap p={5} overflow="scroll" h="100vh">
			{jobResults.length > 0 ?
				jobResults.map((result) => {
					return (
						<WrapItem key={result.job_id}>
							<JobCard jobData={result} />
						</WrapItem>
					);
				})
				: ""
			}
		</Wrap>
	);
}

export default ResultContainer;