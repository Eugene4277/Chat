import { Stack } from "react-bootstrap";

const UserListItem = ({ user }) => {
	return (
		<Stack
			direction='horizontal'
			gap={3}
			className='user-card align-items-center p-1 justify-content-between'
			role='button'
		>
			<div className='d-flex'>
				<div className='me-2 pt-2'>
					<img
						src='https://mdbcdn.b-cdn.net/img/new/avatars/1.webp'
						className='rounded-circle shadow-4'
						style={{ width: "2rem" }}
						alt='Avatar'
					/>
				</div>
				<div className='text-content'>
					<div className='name'>{user.name}</div>
					<div className='text'>{user.login}</div>
				</div>
			</div>
		</Stack>
	);
};

export default UserListItem;
