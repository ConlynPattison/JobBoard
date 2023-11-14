import { Wrap, WrapItem } from "@chakra-ui/react";
import JobCard from "./JobCard";


const ResultContainer = ({ jobResults }) => {
    return <Wrap>
        {jobResults.length > 0 ?
            jobResults.map((result) => {
                return <WrapItem key={result.job_id}>
                    <JobCard jobData={result} />
                </WrapItem>
            })
            : ""
        }
    </Wrap>
}

export default ResultContainer;