import React, { useEffect, useState } from 'react'
import {
	Box,
	Button,
	Input,
	Radio,
	RadioGroup,
	Stack,
	Checkbox,
	CheckboxGroup,
} from "@chakra-ui/react";

const SearchPanel = ({ setResults }) => {
	const [query, setQuery] = useState("");
	const [location, setLocation] = useState("");
	const [datePosted, setDatePosted] = useState("all");
	const [employmentType, setEmploymentType] = useState([]);

	const searchJobs = async () => {
		//TODO: send info as body in backend fetch call
		try {
			const response = await fetch('/api/test', {
				body: {

				},
				headers: {
					Authorization: sessionStorage.getItem("token")
				}
			});
			const data = await response.json();
			console.log(data);
			setResults(data?.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		console.log(employmentType);
	}, [employmentType])

	return (
		<Box flex="30%">
			<Stack>
				<Button onClick={searchJobs} variant="solid" colorScheme="blue"> Search </Button>
				<label htmlFor="search-input">Job Search Query<Input id="search-input" onChange={setQuery} /></label>
				<label htmlFor="location-input">Location<Input id="location-input" onChange={setLocation} /></label>
				<label htmlFor="date-posted-radio">Date Posted
					<RadioGroup id="date-posted-radio" onChange={setDatePosted} value={datePosted}>
						<Stack direction="row">
							<Radio value="all" checked>All</Radio>
							<Radio value="today">Today</Radio>
							<Radio value="3days">3 Days</Radio>
							<Radio value="week">Week</Radio>
							<Radio value="month">Month</Radio>
						</Stack>
					</RadioGroup>
				</label>
				<label htmlFor="employement-type-radio">Employment Type
					<CheckboxGroup id="employement-type-radio" onChange={setEmploymentType} value={employmentType}>
						<Stack direction="row">
							<Checkbox value="" defaultChecked>All</Checkbox>
							<Checkbox value="FULLTIME">Full Time</Checkbox>
							<Checkbox value="PARTTIME">Part Time</Checkbox>
							<Checkbox value="CONTACTOR">Contractor</Checkbox>
							<Checkbox value="INTERN">Intern</Checkbox>
						</Stack>
					</CheckboxGroup>
				</label>
			</Stack>
		</Box>
	);
}

export default SearchPanel;