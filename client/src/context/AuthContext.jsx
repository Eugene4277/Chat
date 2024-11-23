import { createContext } from "react";
import { useAuthUser } from "../hooks/useAuthUser";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
	const { handleAuthFormSubmit, handleLogOut, error, isLoading, user } =
		useAuthUser();

	return (
		<AuthContext.Provider
			value={{
				user,
				handleLogOut,
				handleAuthFormSubmit,
				error,
				isLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
