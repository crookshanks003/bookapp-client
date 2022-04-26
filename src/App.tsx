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
import { SetCategories } from "./pages/SetCategory";
import { AddBook } from "./pages/AddBook";
import { Search } from "./pages/Search";

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
		if (!isLoggedIn) {
			const loggedIn = checkLoggedIn();
			setLoggedIn(loggedIn);
		}
	}, []);

	return (
		<ChakraProvider theme={theme}>
			{isLoggedIn ? (
				<QueryClientProvider client={queryClient}>
					<Navbar loggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
					<Routes>
						<Route
							path="/home"
							element={<Home setLoggedIn={setLoggedIn} />}
						/>
						<Route
							path="/set-categories"
							element={<SetCategories />}
						/>
						<Route path="/add-book" element={<AddBook />} />
						<Route path="/search" element={<Search />} />
						<Route path="*" element={<Navigate to="/home" />} />
					</Routes>
				</QueryClientProvider>
			) : (
				<QueryClientProvider client={queryClient}>
					<Navbar loggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
					<Routes>
						<Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
						<Route path="/register" element={<Register />} />
						<Route
							path="/set-categories"
							element={<SetCategories />}
						/>
						<Route path="*" element={<Navigate to="/login" />} />
					</Routes>
				</QueryClientProvider>
			)}
		</ChakraProvider>
	);
}

export default App;
