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
import { useAuth } from "../../hooks/useAuth.ts";

const JobCard = ({ jobData, isSaved, setSavedListing }) => {
	const { user } = useAuth();

	const toggleSave = async () => {
		const abortController = new AbortController();

		setSavedListing((prev) => {
			const savedListings = new Set(prev);
			if (isSaved) {
				savedListings.delete(jobData.job_id);
				fetch("/api/saved/external/" + jobData.job_id, {
					method: "DELETE",
					headers: {
						Authorization: user?.token || ""
					},
					signal: abortController.signal
				})
			}
			else {
				const listingDTO = {
					id: 0,
					externalId: jobData.job_id,
					jobTitle: jobData.job_title,
					companyLogoUrl: jobData.employer_logo,
					applicationUrl: jobData.job_apply_link
				}
				savedListings.add(jobData.job_id);
				fetch("/api/saved", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: user?.token || ""
					},
					body: JSON.stringify(listingDTO),
					signal: abortController.signal
				})
			}
			return savedListings;
		});

		return () => abortController.abort();
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
					<Button onClick={() => toggleSave()}>
						{isSaved ? "Saved" : "Save"}
					</Button>
				</ButtonGroup>
			</CardFooter>
		</Card>
	);
};

export default JobCard;
