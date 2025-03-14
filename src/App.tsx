
import {  Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { Contract } from "./pages/Contract";
import { Layout } from "./pages/Layout";
function App() {
	return (
		
		<Routes>
			<Route path="/"  element={<Layout/>}>
				<Route path="/" element={<Home/>} />	
				<Route path="contract/:id" element={<Contract/>} />
			</Route>
		</Routes>
		
	);
}

export default App;
