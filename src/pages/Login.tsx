import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Link,
	Stack,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api/user";
import { setLocalStorage } from "../services/utils";

export function Login() {
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
		<Flex
			minH="100vh"
			align="center"
			justify="center"
			bg={useColorModeValue("gray.50", "gray.800")}
		>
			<Box
				width={"md"}
				rounded={"lg"}
				bg={useColorModeValue("white", "gray.700")}
				boxShadow={"lg"}
				p={8}
			>
				<Stack spacing={4}>
					<FormControl id="email">
						<FormLabel>Email address</FormLabel>
						<Input
							type="email"
							name="email"
							onChange={onLoginValueChange}
						/>
					</FormControl>
					<FormControl id="password">
						<FormLabel>Password</FormLabel>
						<Input
							type="password"
							name="password"
							onChange={onLoginValueChange}
						/>
					</FormControl>
					<Stack spacing={10}>
						<Stack
							direction={{ base: "column", sm: "row" }}
							align={"start"}
							justify={"space-between"}
						>
							<Link color="blue.400">Forgot password?</Link>
						</Stack>
						<Button
							colorScheme="blue"
							onClick={onLogin}
							isLoading={buttonLoading}
						>
							Sign in
						</Button>
					</Stack>
				</Stack>
			</Box>
		</Flex>
	);
}
