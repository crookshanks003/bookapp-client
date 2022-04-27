import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Flex,
	Input,
	toast,
	useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ErrorComponent } from "../components/ErrorComponent";
import { Loader } from "../components/Loader";
import { addAuthor } from "../services/api/author";
import { addCategory } from "../services/api/category";
import { getUserProfile } from "../services/api/user";
import { Role } from "../types/user";

export function Admin() {
	const profile = useQuery("profile", getUserProfile);
	const navigate = useNavigate();
	const [author, setAuthor] = useState("");
	const [category, setCategory] = useState("");
	const toast = useToast();

	if (profile.isLoading) {
		return <Loader />;
	}

	if (!profile.data) {
		return <ErrorComponent />;
	}

	if (profile.data.data.role !== Role.ADMIN) {
		navigate("/home");
		return null;
	}

	const onAddAuthor = () => {
		try {
			addAuthor(author);
			toast({
				description: "Added successfully",
				status: "success",
				duration: 5000,
			});
		} catch (e) {
			toast({
				description: "something went wrong",
				status: "error",
				duration: 5000,
			});
		}
	};

	const onAddCategory = () => {
		try {
			addCategory(category);
			toast({
				description: "Added successfully",
				status: "success",
				duration: 5000,
			});
		} catch (e) {
			toast({
				description: "Something went wrong",
				status: "error",
				duration: 5000,
			});
		}
	};

	return (
		<Box minH="92vh" bg="gray.50" pt={8}>
			<Accordion
				allowToggle
				w="60%"
				mx="auto"
				borderStyle="solid"
				borderColor="gray.200"
				borderRadius="lg"
				borderWidth="1px"
			>
				<AccordionItem borderTop="none" py="4">
					<h2>
						<AccordionButton>
							<Box flex="1" textAlign="left" color="green">
								Add Category
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>
						<Flex align="center" justifyContent="start" mt={4}>
							<Input
								w="lg"
								type="text"
								name="category"
								color="gray.700"
								placeholder="Name"
								onChange={(e) => setCategory(e.target.value)}
							/>
							<Button
								colorScheme="green"
								ms="4"
								w="100px"
								onClick={onAddCategory}
							>
								Add
							</Button>
						</Flex>
					</AccordionPanel>
				</AccordionItem>
				<AccordionItem py="4" color="green">
					<h2>
						<AccordionButton>
							<Box flex="1" textAlign="left">
								Add Author
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>
						<Flex align="center" justifyContent="start" mt={4}>
							<Input
								w="lg"
								type="text"
								name="author"
								color="gray.700"
								placeholder="Name"
								onChange={(e) => setAuthor(e.target.value)}
							/>
							<Button
								colorScheme="green"
								ms="4"
								w="100px"
								onClick={onAddAuthor}
							>
								Add
							</Button>
						</Flex>
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem borderBottom="none" py="4">
					<h2>
						<AccordionButton>
							<Box flex="1" textAlign="left" color="red">
								Delete User
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea
						commodo consequat.
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</Box>
	);
}
