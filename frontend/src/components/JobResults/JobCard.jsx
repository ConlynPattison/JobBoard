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

const JobCard = ({ jobData }) => {
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
				</ButtonGroup>
			</CardFooter>
		</Card>
	);
};

export default JobCard;
