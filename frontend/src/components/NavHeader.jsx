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
						{user && <Button onClick={logout} m={2}> Logout </Button>}
						<Button onClick={handleBellClick} m={2}><Image w={30} h={30} src="https://cdn-icons-png.flaticon.com/512/5035/5035563.png" alt="" /></Button>
						<Button onClick={handleProfileClick} m={2}><Image w={30} h={30} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="PFP" /></Button>
					</Flex>
				</Flex>
			</Box>
			<Divider my={2} />
		</>
	);
}

export default NavHeaders;