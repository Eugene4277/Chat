import { useContext, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Form, Container, Row, Col } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import CustomForm from "../components/CustomForm";

const Login = () => {
	const { error, isLoading, handleAuthFormSubmit } = useContext(AuthContext);
	const loginRef = useRef(null);
	const passwordRef = useRef(null);

	const handleFormSubmit = useCallback(
		(e) => {
			e.preventDefault();
			const loginInfo = {
				login: loginRef.current?.value ?? "",
				password: passwordRef.current?.value ?? "",
			};
			handleAuthFormSubmit("/users/signin", loginInfo);
			if (!error) {
				if (loginRef.current && passwordRef.current) {
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
				title={"Login"}
				submitButtonTitle={"Login"}
				submitButtonLoadingTitle={"Submitting"}
				onSubmit={handleFormSubmit}
			>
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
						<span>Do not have an account?</span>
						<Link
							to='/register'
							className='link-main text-decoration-none'
						>
							Register
						</Link>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Login;
