import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CreateRacket from "./pages/CreateRacket";
import EditRacket from "./pages/EditRacket";
import RacketDetail from "./pages/RacketDetail";

export default function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/new" element={<CreateRacket />} />
				<Route path="/edit/:id" element={<EditRacket />} />
				<Route path="/rackets/:id" element={<RacketDetail />} />
			</Routes>
		</>
	);
}
