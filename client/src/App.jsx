import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { AuthContext } from "./context/AuthContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { Container } from "react-bootstrap";

function App() {
	const { user } = useContext(AuthContext);
	return (
		<Container>
			<Routes>
				{!user ? (
					<>
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='*' element={<Login />}></Route>
					</>
				) : (
					<>
						<Route path='/' element={<Chat user={user} />} />
						<Route path='*' element={<Navigate to='/' />}></Route>
					</>
				)}
			</Routes>
		</Container>
	);
}

export default App;
