import { useNavigate } from "react-router";
import Dashboard from "../components/Dashboard"
import { useEffect } from "react";
import NavHeaders from "../components/NavHeader";
import React from "react";

// TODO: Should hold the Header, Dashboard, and Footer components
const HomePage = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (sessionStorage.getItem("token") == null) {
			navigate("/login");
		}
	})

	return (
		<>
			<NavHeaders />
			<Dashboard />
		</>
	);
}

export default HomePage;