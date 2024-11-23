import { Spinner } from "react-bootstrap";
import { useUserSearch } from "../hooks/useUserSearch";
import SearchInput from "./SearchInput";
import UserListItem from "./UserListItem";

const UserSearch = () => {
	const { searchUsers, potentialChats, error, isLoading } = useUserSearch();
	return (
		<div
			style={{
				width: "16rem",
				position: "relative",
			}}
		>
			<SearchInput
				placeholder={"Search users..."}
				onSearch={searchUsers}
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
					potentialChats.map((user) => (
						<UserListItem key={user._id} user={user} />
					))
				)}
			</div>
		</div>
	);
};

export default UserSearch;
