import { Image, Button, Box, Flex, Divider } from "@chakra-ui/react"
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.ts";

// TODO: should include the Link components that allow for reaching the Login route (at minimum) and HomePage
// left (logo), right (notification icon, profile icon)
const NavHeaders = () => {
	const navigate = useNavigate();
	const { user, logout } = useAuth();

	const handleBellClick = () => {
		if (!user) {
			navigate("/login");
		} else {
			// TODO: show the modal with suggested job listings
		}
	}

	const handleProfileClick = () => {
		if (!user) {
			navigate("/login");
		} else {
			navigate("/profile");
		}
	}

	return (
		<>
			<Box h={100} paddingTop={5} px={5}>
				<Flex alignItems="center" w="full">
					<Button><Image onClick={() => navigate("/")} alt="App logo" src="/logo512.png" w={30} h={30} /></Button>
					<Flex justifyContent="right" w="full">
						{/* LOGOUT FOR DEBUGGING */}
						{user && <Button onClick={logout} m={2}>[testing]LOGOUT</Button>}
						<Button onClick={handleBellClick} m={2}>ICON</Button>
						<Button onClick={handleProfileClick} m={2}>PFP</Button>
					</Flex>
				</Flex>
			</Box>
			<Divider my={2} />
		</>
	);
}

export default NavHeaders;