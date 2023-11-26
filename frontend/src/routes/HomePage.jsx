import { useNavigate } from "react-router";
import Dashboard from "../components/Dashboard"
import { useEffect } from "react";
import NavHeaders from "../components/NavHeader";
import React from "react";

// TODO: Should hold the Header, Dashboard, and Footer components
const HomePage = () => {
	// Don't want to be navigated away if not logged in (should instead show login button and then be navigated)
	// useEffect(() => {
	// 	if (sessionStorage.getItem("token") == null) {
	// 		navigate("/login");
	// 	}
	// })

	return (
		<>
			<NavHeaders />
			<Dashboard />
		</>
	);
}

export default HomePage;