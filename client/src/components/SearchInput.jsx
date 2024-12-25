import { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDebounce } from "../hooks/useDebounce";

const SearchInput = ({ placeholder, onSearch, reset = 0, ...rest }) => {
	const [value, setValue] = useState("");
	const debouncedValue = useDebounce(value, 700);

	const handleSearch = useCallback(() => {
		onSearch(debouncedValue);
	}, [debouncedValue, onSearch]);

	useEffect(() => {
		handleSearch();
	}, [debouncedValue, handleSearch]);

	useEffect(() => {
		setValue("");
	}, [reset]);

	return (
		<Form.Control
			value={value}
			onChange={(e) => setValue(e.target.value)}
			type='text'
			placeholder={placeholder}
			{...rest}
		/>
	);
};

export default SearchInput;
