import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getRacket, deleteRacket } from "../services/RacketsAPI";
import RacketPreview from "../components/RacketPreview";

export default function RacketDetail() {
	const { id } = useParams();
	const nav = useNavigate();
	const [r, setR] = useState(null);

	useEffect(() => {
		(async () => {
			const data = await getRacket(id);
			setR(data);
		})();
	}, [id]);

	if (!r) return <div className="container">Loading...</div>;

	return (
		<div className="container">
			<h2 style={{ marginBottom: 10 }}>{r.name}</h2>
			<RacketPreview cfg={r} price={r.price} />
			<div className="hr"></div>
			<div className="row" style={{ gap: 24, flexWrap: "wrap" }}>
				<div>
					Headsize: <b>{r.headsize}</b>
				</div>
				<div>
					Color: <b>{r.framecolor}</b>
				</div>
				<div>
					Grip: <b>{r.grip}</b>
				</div>
				<div>
					Pattern: <b>{r.stringpattern}</b>
				</div>
				<div>
					Extended: <b>{r.extended ? "Yes" : "No"}</b>
				</div>
				<div>
					Custom Paint: <b>{r.custompaint ? "Yes" : "No"}</b>
				</div>
				<div>
					Price: <b>${r.price}</b>
				</div>
			</div>

			<div className="row" style={{ marginTop: 18 }}>
				<Link to={`/edit/${r.id}`}>
					<button className="btn">EDIT</button>
				</Link>
				<button
					className="btn secondary"
					onClick={async () => {
						await deleteRacket(r.id);
						nav("/");
					}}
				>
					DELETE
				</button>
			</div>
		</div>
	);
}
