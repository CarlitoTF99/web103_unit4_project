import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllRackets } from "../services/RacketsAPI";
import RacketCard from "../components/RacketCard.jsx";

export default function Home() {
	const [data, setData] = useState([]);
	const [err, setErr] = useState(null);

	useEffect(() => {
		(async () => {
			const rows = await getAllRackets();
			if (!rows.length) setErr("Could not load rackets (check server).");
			setData(rows);
		})();
	}, []);

	return (
		<div className="container">
			<div
				className="row"
				style={{ justifyContent: "space-between", marginBottom: 12 }}
			>
				<div className="toolbar">
					<Link to="/new">
						<button className="btn">+ Add Racket</button>
					</Link>
				</div>
			</div>

			{err && <div style={{ color: "#ff6b6b", marginBottom: 12 }}>{err}</div>}

			<div className="grid cols-3">
				{data.map((r) => (
					<RacketCard key={r.id} r={r} />
				))}
			</div>
		</div>
	);
}
