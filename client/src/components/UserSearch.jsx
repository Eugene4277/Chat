import { useContext, useState, useRef } from "react";
import { Spinner } from "react-bootstrap";
import SearchInput from "./SearchInput";
import UserListItem from "./UserListItem";
import { useUserSearch } from "../hooks/useUserSearch";
import { ChatContext } from "../context/ChatContext";

const UserSearch = () => {
	const [resetCounter, setResetCounter] = useState(0);
	const {
		searchUsers,
		potentialConnections,
		resetPotentialConnections,
		error,
		isLoading,
	} = useUserSearch();
	const { createChat } = useContext(ChatContext);
	const containerRef = useRef(null);

	const handleCreateChat = (selectedUserId) => {
		createChat(selectedUserId);
		resetPotentialConnections();
		setResetCounter(resetCounter + 1);
	};

	const handleBlur = (e) => {
		// Check if the blur is happening due to a focus on another child element
		if (
			containerRef.current &&
			containerRef.current.contains(e.relatedTarget)
		) {
			return;
		}

		// If focus is outside, reset potential connections
		resetPotentialConnections();
		setResetCounter(resetCounter + 1);
	};

	return (
		<div
			style={{
				width: "100%",
				position: "relative",
			}}
			onBlur={(e) => handleBlur(e)}
			ref={containerRef}
			tabIndex={-1}
		>
			<SearchInput
				placeholder={"Search users..."}
				onSearch={searchUsers}
				reset={resetCounter}
				style={{ borderRadius: "21px" }}
			/>
			<div className='bg-secondary user-search-list'>
				{isLoading && (
					<div
						style={{ height: "5rem" }}
						className='d-flex align-items-center justify-content-center'
					>
						<Spinner />
					</div>
				)}
				{error ? (
					<div className='p-4'>{error}</div>
				) : (
					potentialConnections.map((user) => (
						<UserListItem
							onClick={() => handleCreateChat(user._id)}
							key={user._id}
							user={user}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default UserSearch;
