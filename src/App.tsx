import "@fontsource/merriweather";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { checkLoggedIn } from "./services/utils/localStorageUtils";
import { Navbar } from "./components/Navbar";
import { Register } from "./pages/Register";
import { SetCategories } from "./pages/SetCategory";
import { AddBook } from "./pages/AddBook";

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
						<Route path="/home" element={<Home setLoggedIn={setLoggedIn}/>} />
						<Route path="/set-categories" element={<SetCategories />} />
						<Route path="/add-book" element={<AddBook />} />
					</Routes>
				</QueryClientProvider>
			) : (
				<QueryClientProvider client={queryClient}>
					<Navbar loggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/set-categories" element={<SetCategories />} />
					</Routes>
				</QueryClientProvider>
			)}
		</ChakraProvider>
	);
}

export default App;
