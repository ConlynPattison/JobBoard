import NavHeaders from "../components/NavHeader";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Image, Table, TableContainer, Text } from "@chakra-ui/react";
import { Center } from "@chakra-ui/layout";
import { useAuth } from "../hooks/useAuth.ts";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ProfilePage = () => {
	const { user } = useAuth();
	const [savedListings, setSavedListings] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate("/login");
			return;
		}
		fetchSavedListings();
	}, [user])

	const removeListing = (externalId) => {
		axios.delete("api/saved/external/" + externalId, {
			headers: {
				Authorization: user?.token || ""
			}
		}).then(() => {
			setSavedListings(prev => [...prev].filter((listing) => listing.externalId !== externalId))
		}).catch((err) => {
			console.error(err);
		})
	}
	const fetchSavedListings = async () => {
		axios.get("/api/saved/details", {
			headers: {
				Authorization: user?.token || ""
			}
		}).then(({ data }) => {
			setSavedListings(data);
		}).catch((err) => {
			console.error(err);
		})
	}

	return (
		<>
			<NavHeaders />
			<br />
			<Center>
				<Image
					borderRadius='full'
					boxSize='150px'
					src='https://avatars.githubusercontent.com/u/112051310?v=4'
					alt='Conlyn Pattison'
				/>
			</Center>
			<br />
			<Center> <Text fontSize='3xl'> {user?.username || ""} </Text> </Center>
			<br />

			<Center>
				<Card>
					<CardBody>
						<TableContainer>
							<Table variant='simple' style={{ borderCollapse: "separate", borderSpacing: "15px" }}>
								{savedListings.map((listingDetails) => (
									<tr key={listingDetails.externalId}>
										<td>
											<Image boxSize='50px' src={listingDetails.companyLogoUrl} fallbackSrc='logo512.png' alt='logo' />
										</td>
										<td>
											<Text noOfLines={1} >
												{listingDetails.jobTitle}
											</Text>
										</td>
										<td>
											<Button
												variant="solid"
												colorScheme="blue"
												onClick={() => {
													window.open(listingDetails.applicationUrl);
												}}
											>
												Apply
											</Button>
										</td>
										<td>
											<Button
												variant="solid"
												colorScheme="red"
												onClick={() => removeListing(listingDetails.externalId)}
											>
												Remove
											</Button>
										</td>
									</tr>
								))}

							</Table>
						</TableContainer>
					</CardBody>
				</Card>
			</Center>

		</>
	);
}

export default ProfilePage;
