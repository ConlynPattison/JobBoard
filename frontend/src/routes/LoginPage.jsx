import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const [user, setUser] = useState({ username: "", password: "" });
	const navigate = useNavigate();

	const onChange = (e) => {
		setUser((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	const login = () => {
		// attempt login by sending request to Spring server with credentials object (user)
		fetch('/api/login', {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user),
		})
			.then((res) => {
				const jwtToken = res.headers.get("Authorization");
				console.log(jwtToken);
				if (jwtToken != null) {
					sessionStorage.setItem("token", jwtToken);
					navigate("/");
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<div className="App">
				<table>
					<tbody>
						<tr>
							<td>
								<label htmlFor="username">Username</label>
							</td>
							<td>
								<input
									type="text"
									name="username"
									value={user.username}
									onChange={onChange}
								/>
							</td>
						</tr>
						<tr>
							<td>
								<label htmlFor="password">Password</label>
							</td>
							<td>
								<input
									type="password"
									name="password"
									value={user.password}
									onChange={onChange}
								/>
							</td>
						</tr>
					</tbody>
				</table>

				<br />
				<button id="login-submit" onClick={login}>
					Login
				</button>
			</div>
		</>
	);
};
export default LoginPage;