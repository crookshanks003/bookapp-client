import "@fontsource/merriweather";
import "@fontsource/merriweather-sans";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

const theme = extendTheme({
	fonts: {
		heading: "Merriweather",
		body: "Merriweather sans",
	},
});

function App() {
	const queryClient = new QueryClient();
	const [isLoggedIn, setLoggedIn] = useState(false);

	return (
		<ChakraProvider theme={theme}>
			{isLoggedIn ? (
				<QueryClientProvider client={queryClient}>
					<Routes>
						<Route path="/home" element={<Home />} />
						<Route path="*" element={<Navigate to="/home" />} />
					</Routes>
				</QueryClientProvider>
			) : (
				<QueryClientProvider client={queryClient}>
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="*" element={<Navigate to="/login" />} />
					</Routes>
				</QueryClientProvider>
			)}
		</ChakraProvider>
	);
}

export default App;
