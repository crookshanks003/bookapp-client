import { Box, Stack } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { BookComponent } from "../components/BookComponent";
import { ErrorComponent } from "../components/ErrorComponent";
import { Loader } from "../components/Loader";
import { getFeed } from "../services/api/user";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";

export function Home({
	setLoggedIn,
}: {
	setLoggedIn: Dispatch<SetStateAction<boolean>>;
}) {
	const { data, isLoading, error } = useQuery("feed", getFeed);

	if (isLoading) {
		return <Loader />;
	}

	if (!data || error) {
		if (error) {
			const err = error as AxiosError;
			if (err.response?.status === 403) {
				setLoggedIn(false);
			}
		}
		return <ErrorComponent />;
	}

	return (
		<Box minH="92vh" bg="gray.50" pt="8">
			<Stack maxW="lg" spacing="4" mx="auto">
				{data.data.map((book, id) => (
					<BookComponent key={id} book={book} />
				))}
			</Stack>
		</Box>
	);
}
