import { Alert, Button, Form, Stack, Row, Col, Spinner } from "react-bootstrap";

const CustomForm = ({
	children,
	onSubmit,
	title,
	submitButtonTitle,
	submitButtonLoadingTitle,
	isLoading,
	error,
	submitButtonProps,
	alertProps,
	...rest
}) => {
	return (
		<Form onSubmit={onSubmit} {...rest}>
			<Row
				style={{
					justifyContent: "center",
					paddingTop: "10%",
				}}
			>
				<Col xs={6}>
					<Stack gap={3}>
						<h2>{title}</h2>
						{children}
						<Button
							variant='main'
							type='submit'
							disabled={isLoading}
							{...submitButtonProps}
						>
							{isLoading ? (
								<>
									<Spinner
										as='span'
										animation='border'
										size='sm'
										role='status'
										aria-hidden='true'
									/>
									{submitButtonLoadingTitle}...
								</>
							) : (
								<span>{submitButtonTitle}</span>
							)}
						</Button>
						{error && (
							<Alert variant='danger' {...alertProps}>
								<p>{error}</p>
							</Alert>
						)}
					</Stack>
				</Col>
			</Row>
		</Form>
	);
};

export default CustomForm;
