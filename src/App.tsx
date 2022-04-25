import "@fontsource/merriweather";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { checkLoggedIn } from "./services/utils/localStorageUtils";
import { Navbar } from "./components/Navbar";
import { Register } from "./pages/Register";

const theme = extendTheme({
	fonts: {
		heading: "Merriweather",
		body: "Inter",
	},
});

function App() {
	const queryClient = new QueryClient();
	const [isLoggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		const loggedIn = checkLoggedIn();
		setLoggedIn(loggedIn);
	}, []);

	return (
		<ChakraProvider theme={theme}>
			{isLoggedIn ? (
				<QueryClientProvider client={queryClient}>
					<Navbar loggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
					<Routes>
						<Route path="/home" element={<Home />} />
						<Route path="*" element={<Navigate to="/home" />} />
					</Routes>
				</QueryClientProvider>
			) : (
				<QueryClientProvider client={queryClient}>
					<Navbar loggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="*" element={<Navigate to="/register" />} />
					</Routes>
				</QueryClientProvider>
			)}
		</ChakraProvider>
	);
}

export default App;
