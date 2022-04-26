import {
	Box,
	Button,
	Center,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Link,
	Stack,
	Text,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api/user";
import { setLocalStorage } from "../services/utils/localStorageUtils";
import {Link as RouterLink } from "react-router-dom";

export function Login({setLoggedIn}: {setLoggedIn: Dispatch<SetStateAction<boolean>>}) {
	const [buttonLoading, setButtonLoading] = useState(false);
	const toast = useToast();
	const navigate = useNavigate();
	const [loginInfo, setLoginInfo] = useState({
		email: "",
		password: "",
	});

	const onLoginValueChange: React.ChangeEventHandler<HTMLInputElement> = (
		e
	) => {
		setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
	};

	const onLogin = async () => {
		setButtonLoading(true);
		if (loginInfo.email && loginInfo.password) {
			try {
				const { data } = await loginUser(loginInfo);
				setLocalStorage(data.token);
				setLoggedIn(true);
				navigate("/home");
			} catch (e: any) {
				toast({
					title: e.response.data.error,
					description: e.response.data.message,
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			}
		}
		setButtonLoading(false);
	};

	return (
		<Box minH="92vh" bg={useColorModeValue("gray.50", "gray.800")} pt={8}>
			<Box
				width={"md"}
				rounded={"lg"}
				bg={useColorModeValue("white", "gray.700")}
				boxShadow={"lg"}
				p={8}
				mx="auto"
			>
				<Stack spacing={4}>
				<Heading fontSize="xl" color="gray.700" letterSpacing="wide" mb={3} textAlign="center">Login to Bookexchange</Heading>
					<FormControl id="email">
						<FormLabel color="gray.700">Email address</FormLabel>
						<Input
							type="email"
							name="email"
							onChange={onLoginValueChange}
							color="gray.700"
						/>
					</FormControl>
					<FormControl id="password">
						<FormLabel color="gray.700">Password</FormLabel>
						<Input
							type="password"
							name="password"
							onChange={onLoginValueChange}
							color="gray.700"
						/>
					</FormControl>
					<Stack spacing={8}>
						<Stack
							direction={{ base: "column", sm: "row" }}
							align={"start"}
							justify={"space-between"}
						>
							<Link color="green.400">Forgot password?</Link>
						</Stack>
						<Button
							colorScheme="green"
							onClick={onLogin}
							isLoading={buttonLoading}
						>
							Sign in
						</Button>
					</Stack>
						<Center marginTop="0px">
							<Text>
								New Here?{" "}
								<Link as={RouterLink} color="green.400" to="/register">Register</Link>
							</Text>
						</Center>
				</Stack>
			</Box>
		</Box>
	);
}
