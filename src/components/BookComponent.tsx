import {
	Box,
	Center,
	Heading,
	Text,
	Stack,
	Avatar,
	useColorModeValue,
} from "@chakra-ui/react";
import { FeedBook } from "../types/book";

export function BookComponent({ book }: { book: FeedBook }) {
	return (
		<Box
			w={"full"}
			bg="white"
			boxShadow="sm"
			borderWidth="1px"
			borderStyle="solid"
			borderColor="gray.300"
			rounded={"md"}
			p={6}
			overflow={"hidden"}
		>
			<Stack direction={"row"} spacing={4} align={"center"}>
				<Avatar name={book.owner.name} size="sm" />
				<Stack direction={"column"} spacing={0} fontSize={"sm"}>
					<Text fontWeight={600}>{book.owner.name}</Text>
					<Text color={"gray.500"}>Feb 08, 2021 · 6min read</Text>
				</Stack>
			</Stack>
			<Stack mt={6}>
				<Text
					color={"green.500"}
					textTransform={"uppercase"}
					fontWeight={800}
					fontSize={"xs"}
					letterSpacing={1.1}
				>
					{book.category.name}
				</Text>
				<Heading
					color={useColorModeValue("gray.700", "white")}
					fontSize={"lg"}
					letterSpacing="wide"
				>
					{book.name}
				</Heading>
			</Stack>
		</Box>
	);
}
