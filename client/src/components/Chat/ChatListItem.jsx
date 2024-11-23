import { useContext, useEffect, useState } from "react";
import { Container, Stack, Spinner } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipientUser.js";

const ChatListItem = ({ chat }) => {
	const { user } = useContext(AuthContext);
	const { recipientUser } = useFetchRecipientUser(chat, user);

	return (
		<Stack
			direction='horizontal'
			gap={3}
			className='user-card align-items-center p-2 justify-content-between'
			role='button'
		>
			<div className='d-flex'>
				<div className='me-2'>
					<img
						src='https://mdbcdn.b-cdn.net/img/new/avatars/1.webp'
						className='rounded-circle shadow-4'
						style={{ width: "3rem" }}
						alt='Avatar'
					/>
				</div>
				<div className='text-content'>
					<div className='name'>{recipientUser.name}</div>
					<div className='text'>Message</div>
				</div>
			</div>
			<div className='d-flex flex-column align-items-end'>
				<div className='date'>date</div>
				<div className='this-user-notifications'>2</div>
				<span className='user-online'></span>
			</div>
		</Stack>
	);
};

export default ChatListItem;
