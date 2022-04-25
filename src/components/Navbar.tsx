import React, { ReactNode, SetStateAction } from "react";
import {
	Box,
	Flex,
	Avatar,
	Link,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	useDisclosure,
	HStack,
	IconButton,
	Stack,
	Text,
	Spinner,
} from "@chakra-ui/react";
import {
	Link as ReactRouterLink,
	useLocation,
	useNavigate,
} from "react-router-dom";
import { MdOutlineClose, MdMenu } from "react-icons/md";
import { AiFillControl } from "react-icons/ai";
import { clearLocalStorage } from "../services/utils";
import { useQuery } from "react-query";
import { getUserProfile } from "../services/api/user";

const NavLink = ({
	children,
	href,
	active,
}: {
	children: ReactNode;
	href: string;
	active: boolean;
}) => (
	<Link
		as={ReactRouterLink}
		to={href}
		px={2}
		py={1}
		fontWeight="medium"
		fontSize="lg"
		rounded={"md"}
		_hover={{
			textDecoration: "none",
			color: "gray.700",
		}}
		_active={{
			color: "green.700",
		}}
		color={active ? "gray.700" : "gray.500"}
	>
		{children}
	</Link>
);

export const Navbar = ({
	loggedIn,
	setLoggedIn,
}: {
	loggedIn: boolean;
	setLoggedIn: React.Dispatch<SetStateAction<boolean>>;
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	let links = [
		{ name: "Home", href: "/home" },
		{ name: "Tracks", href: "/tracks" },
		{ name: "Artists", href: "/artists" },
		{ name: "Recent", href: "/recent" },
	];

	const location = useLocation();
	const navigate = useNavigate();

	const { data, isLoading, isError } = useQuery("profile", getUserProfile, {
		enabled: loggedIn,
	});

	const logOut = () => {
		clearLocalStorage();
		setLoggedIn(false);
		navigate("/login");
	};

	return (
		<Box bg="white" borderBottom="2px" borderColor="gray.200">
			<Flex
				h="8vh"
				alignItems={"center"}
				justifyContent={"space-between"}
				width="80%"
				mx="auto"
			>
				<IconButton
					colorScheme="gray"
					size={"sm"}
					icon={isOpen ? <MdOutlineClose /> : <MdMenu />}
					aria-label={"Open Menu"}
					display={{ md: "none" }}
					onClick={isOpen ? onClose : onOpen}
				/>
				<HStack
					spacing={2}
					alignItems={"center"}
					color="gray.700"
					fontSize="3xl"
				>
					<Text>
						<AiFillControl />
					</Text>
					<Text fontWeight="semibold">
						<Link href="/">Strings</Link>
					</Text>
				</HStack>
				<Flex alignItems={"center"}>
					<HStack
						as={"nav"}
						spacing={2}
						display={{ base: "none", md: "flex" }}
					>
						{links.map((link) => (
							<NavLink
								key={link.name}
								href={link.href}
								active={link.href === location.pathname}
							>
								{link.name}
							</NavLink>
						))}
					</HStack>
					{isLoading ? (
						<Spinner />
					) : (
						loggedIn && (
							<Menu>
								<MenuButton
									as={Button}
									rounded={"full"}
									variant={"link"}
									cursor={"pointer"}
									background="gray.700"
									minW={0}
									ms={6}
									disabled={isError}
								>
									<Avatar
										size="sm"
										src={undefined}
										name={data?.data.name}
										background="gray.700"
										color="white"
									/>
								</MenuButton>
								<MenuList>
									<MenuItem
										onClick={() => navigate("/profile")}
									>
										Profile
									</MenuItem>
									<MenuItem onClick={logOut}>
										Log out
									</MenuItem>
								</MenuList>
							</Menu>
						)
					)}
				</Flex>
			</Flex>

			{isOpen ? (
				<Box pb={4} display={{ md: "none" }}>
					<Stack as={"nav"} spacing={3}>
						{links.map((link) => (
							<NavLink
								key={link.name}
								href={link.href}
								active={link.href === location.pathname}
							>
								{link.name}
							</NavLink>
						))}
					</Stack>
				</Box>
			) : null}
		</Box>
	);
};
