import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.ts";
import {Button, Card, CardBody, Center, Image, Input, Text} from "@chakra-ui/react";

// TODO: Convert to a clean Chakra implementation
const LoginPage = () => {
	const [userCred, setUserCred] = useState({ username: "", password: "" });
	const navigate = useNavigate();
	const { login } = useAuth();

	const onChange = (e) => {
		setUserCred((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	const submitLogin = () => {
		// attempt login by sending request to Spring server with credentials object (user)
		fetch('/api/login', {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(userCred),
		})
			.then((res) => {
				const jwtToken = res.headers.get("Authorization");
				if (jwtToken != null) {
					login({
						username: userCred.username,
						email: "TODO:",
						token: jwtToken
					});
					navigate("/");
				}
			})
			.catch((err) => console.error(err));
	};

	return (
		<>
			<div className="App">

				<br/>

				<Center> <Image boxSize='100px' alt="App logo" src="/logo512.png" /> </Center>
				<br />

				<Center> <Text fontSize='3xl'> Sign into your JobSearch Account </Text> </Center>
				<br />

				<Center>
					<Card>
						<CardBody>
							<table>
								<tbody>
									<tr>
										<td>
											<label htmlFor="username">Username</label>
										</td>
										<td>
											<Input
												variant="filled"
												type="text"
												name="username"
												value={userCred.username}
												onChange={onChange}
											/>
										</td>
									</tr>
									<tr>
										<td>
											<label htmlFor="password">Password</label>
										</td>
										<td>
											<Input
												variant="filled"
												type="password"
												name="password"
												value={userCred.password}
												onChange={onChange}
											/>
										</td>
									</tr>
								</tbody>
							</table>
						</CardBody>
					</Card>
				</Center>

				<br />
				<Center>
					<Button colorScheme='green' size='md' id="login-submit" onClick={submitLogin}>
						Login
					</Button>
				</Center>
			</div>
		</>
	);
};
export default LoginPage;