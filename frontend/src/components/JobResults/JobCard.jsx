import {
	Card,
	CardBody,
	CardFooter,
	Stack,
	Heading,
	Text,
	Divider,
	Button,
	ButtonGroup,
	Image,
} from "@chakra-ui/react";
import React from "react";
import axios from "axios";

const JobCard = ({ jobData, isSaved, setSavedListing }) => {

	const toggleSave = async () => {
		setSavedListing((prev) => {
			const savedListings = new Set(prev);
			if (isSaved) {
				savedListings.delete(jobData.job_id);
				// TODO: add backend handling of being passed external ID to delete a SavedListing
				// axios.delete("/api/saved/" + jobData.)
			}
			else {
				savedListings.add(jobData.job_id);
			}
			return savedListings;
		})
	}

	return (
		<Card maxW="sm">
			<CardBody>
				<Image
					src={`${jobData.employer_logo}`}
					fallbackSrc="logo512.png"
					alt={`${jobData.employer_name} Logo`}
					borderRadius="lg"
					height={100}
				/>
				<Stack mt="6" spacing="3">
					<Heading size="md" noOfLines={1}>
						{jobData.job_title}
					</Heading>
					<Text noOfLines={4}>
						{/* Holds the Description */}
						{jobData.job_description}
					</Text>
					<Text color="blue.600" fontSize="2xl">
						{`${jobData.job_city}, ${jobData.job_state}`}
					</Text>
				</Stack>
			</CardBody>
			<Divider />
			<CardFooter>
				<ButtonGroup spacing="2">
					<Button
						variant="solid"
						colorScheme="blue"
						onClick={() => {
							window.open(jobData.job_apply_link);
						}}
					>
						Apply
					</Button>
					<Button onClick={toggleSave}>
						{isSaved ? "Saved" : "Save"}
					</Button>
				</ButtonGroup>
			</CardFooter>
		</Card>
	);
};

export default JobCard;
