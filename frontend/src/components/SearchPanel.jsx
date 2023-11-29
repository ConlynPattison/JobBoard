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
	FormErrorMessage,
	FormControl
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../hooks/useAuth.ts';

const SearchPanel = ({ setResults }) => {
	const [searchQuery, setQuery] = useState("");
	const [datePosted, setDatePosted] = useState("all");
	const [unformattedTypes, setUnformattedTypes] = useState([]);
	const [employmentTypes, setEmploymentTypes] = useState("");
	const [isValidQuery, setIsValidQuery] = useState(true);
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		setEmploymentTypes(() => {
			if (unformattedTypes.length === 0)
				return "";
			const employmentTypes = unformattedTypes.reduce((prev, curr, index) => {
				if (index === 0)
					return `${curr}`;
				return `${prev},${curr}`;
			})
			return employmentTypes;
		})
	}, [unformattedTypes]);

	const searchJobs = async () => {
		if (!user) {
			navigate("/login");
			return;
		}
		if (searchQuery.length === 0) {
			setIsValidQuery(false);
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

	const handleSearchChange = (e) => {
		setQuery(() => {
			if (e.target.value.length !== 0) {
				setIsValidQuery(true);
			}
			return e.target.value;
		})
	}

	return (
		<Box flex="30%">
			<Stack spacing={5} p={5}>
				<Button onClick={searchJobs} variant="solid" colorScheme="blue"> Search </Button>
				<FormControl isInvalid={!isValidQuery}>
					<label htmlFor="search-input">Job Search Query
						<Input id="search-input" onFocus={() => { }} errorBorderColor='red.300' onChange={handleSearchChange} />
						{!isValidQuery &&
							<FormErrorMessage>Search query is required.</FormErrorMessage>}
					</label>
				</FormControl>
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
					<CheckboxGroup id="employement-type-radio" onChange={setUnformattedTypes} value={unformattedTypes}>
						<Stack direction="column">
							<Checkbox value="" defaultChecked isChecked={unformattedTypes.length === 0} disabled={unformattedTypes.length > 0}>All</Checkbox>
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