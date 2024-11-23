import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";

import { AuthContext } from "./context/AuthContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { Container } from "react-bootstrap";

function App() {
	const { user } = useContext(AuthContext);
	return (
		<>
			<NavBar></NavBar>
			<Container>
				<Routes>
					<Route path='/' element={user ? <Chat /> : <Login />} />
					<Route
						path='/login'
						element={!user ? <Login /> : <Chat />}
					/>
					<Route
						path='/register'
						element={!user ? <Register /> : <Chat />}
					/>
					<Route
						path='*'
						element={user ? <Navigate to='/' /> : <Login />}
					></Route>
				</Routes>
			</Container>
		</>
	);
}

export default App;
