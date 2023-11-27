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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../hooks/useAuth.ts';

const SearchPanel = ({ setResults }) => {
	const [searchQuery, setQuery] = useState("");
	const [datePosted, setDatePosted] = useState("all");
	const [employmentType, setEmploymentType] = useState([]);
	const [employmentTypes, setEmploymentTypes] = useState("");
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		setEmploymentTypes(() => {
			if (employmentType.length === 0)
				return "";
			const employmentTypes = employmentType.reduce((prev, curr, index) => {
				if (index === 0)
					return `${curr}`;
				return `${prev},${curr}`;
			})
			return employmentTypes;
		})
	}, [employmentType]);



	const searchJobs = async () => {
		if (!user) {
			navigate("/login");
			return;
		}
		try {
			const { data } = await axios.get('/api/search', {
				headers: {
					Authorization: user?.token || "",
				},
				params: {
					query: searchQuery,
					...employmentTypes && { employmentTypes },
					datePosted,
				}
			});
			setResults(data?.data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Box flex="30%">
			<Stack spacing={5} p={5}>
				<Button onClick={searchJobs} variant="solid" colorScheme="blue"> Search </Button>
				<label htmlFor="search-input">Job Search Query<Input id="search-input" onChange={(e) => setQuery(e.target.value)} /></label>
				<label htmlFor="date-posted-radio">Date Posted
					<RadioGroup id="date-posted-radio" onChange={setDatePosted} value={datePosted}>
						<Stack direction="column">
							<Radio value="all" checked>Anytime</Radio>
							<Radio value="today">Today</Radio>
							<Radio value="3days">3 Days</Radio>
							<Radio value="week">Week</Radio>
							<Radio value="month">Month</Radio>
						</Stack>
					</RadioGroup>
				</label>
				<label htmlFor="employement-type-radio">Employment Type
					<CheckboxGroup id="employement-type-radio" onChange={setEmploymentType} value={employmentType}>
						<Stack direction="column">
							<Checkbox value="" defaultChecked isChecked={employmentType.length === 0} disabled={employmentType.length > 0}>All</Checkbox>
							<Checkbox value="FULLTIME">Full Time</Checkbox>
							<Checkbox value="CONTRACTOR">Contractor</Checkbox>
							<Checkbox value="PARTTIME">Part Time</Checkbox>
							<Checkbox value="INTERN">Intern</Checkbox>
						</Stack>
					</CheckboxGroup>
				</label>
			</Stack>
		</Box>
	);
}

export default SearchPanel;