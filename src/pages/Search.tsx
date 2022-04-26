import { InputGroup, Input, InputRightAddon } from "@chakra-ui/react";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

export function Search() {
	const [searchString, setSearchString] = useState("");

	const onSearch = () => {
		console.log(searchString);
	};

	return (
		<InputGroup size="sm" w={"lg"}>
			<Input
				placeholder="Search..."
				py={5}
				onChange={(e) => setSearchString(e.target.value)}
			/>
			<InputRightAddon
				children={<BiSearch />}
				py={5}
				style={{ cursor: "pointer" }}
				onClick={onSearch}
			/>
		</InputGroup>
	);
}
