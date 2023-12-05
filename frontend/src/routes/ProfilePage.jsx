import NavHeaders from "../components/NavHeader";
import React, {useState} from "react";
import {Button, Card, CardBody, Image, Table, Text} from "@chakra-ui/react";
import {Center} from "@chakra-ui/layout";
import {useAuth} from "../hooks/useAuth.ts";
import axios from "axios";


const ProfilePage = () => {
    const { user, logout } = useAuth();
    const [savedListings, setSavedListings] = useState([]);

    const removeListing = (externalId) => {
        axios.delete("api/saved/external/" + externalId, {
            headers: {
                Authorization: user?.token || ""
            }
        }).then((response) => {
            setSavedListings(prev => [...prev].filter((listing) => listing.externalId !== externalId))
        }).catch((err) => {
            console.error(err);
        })
    }
    const fetchSavedListings = async() => {
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
            <Center> <Text fontSize='3xl'> Conlyn Pattison </Text> </Center>
            <br />
            <Card>
                <CardBody>
                    <Table>
                        {savedListings.map((listingDetails) => (
                            <tr>
                                <td>
                                    {listingDetails.jobTitle}
                                </td>
                                <td>
                                    <Image boxSize='30px' src={listingDetails.companyLogoUrl} alt='Company Logo'/>
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
                </CardBody>
            </Card>
        </>
    );
}

export default ProfilePage;