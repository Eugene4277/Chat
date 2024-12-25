import { useRef, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { Form, Container, Row, Col } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import CustomForm from "../components/CustomForm";

const Register = () => {
	const { error, isLoading, handleAuthFormSubmit } = useContext(AuthContext);

	const nameRef = useRef(null);
	const loginRef = useRef(null);
	const passwordRef = useRef(null);

	const handleFormSubmit = useCallback(
		(e) => {
			e.preventDefault();
			const registerInfo = {
				name: nameRef.current?.value ?? "",
				login: loginRef.current?.value ?? "",
				password: passwordRef.current?.value ?? "",
			};
			handleAuthFormSubmit("/users/signup", registerInfo);
			if (!error) {
				if (
					loginRef.current &&
					passwordRef.current &&
					nameRef.current
				) {
					nameRef.current.value = "";
					loginRef.current.value = "";
					passwordRef.current.value = "";
				}
			}
		},
		[error]
	);

	return (
		<>
			<CustomForm
				isLoading={isLoading}
				error={error}
				title={"Register"}
				submitButtonTitle={"Register"}
				submitButtonLoadingTitle={"Submitting"}
				onSubmit={handleFormSubmit}
			>
				<Form.Control type='text' placeholder='Name' ref={nameRef} />
				<Form.Control type='text' placeholder='Login' ref={loginRef} />
				<Form.Control
					type='password'
					placeholder='Password'
					ref={passwordRef}
				/>
			</CustomForm>
			<Container>
				<Row
					style={{
						justifyContent: "center",
						paddingTop: "1rem",
					}}
				>
					<Col xs={6} className='d-flex justify-content-center gap-2'>
						<span>Have an account?</span>
						<Link
							to='/login'
							className='link-main text-decoration-none'
						>
							Login
						</Link>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Register;
