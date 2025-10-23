import { Link } from "react-router-dom";
import more from "../assets/more.png";

export default function RacketCard({ r }) {
	return (
		<div className="card">
			<div className="row" style={{ justifyContent: "space-between" }}>
				<h3>{r.name}</h3>
				<Link to={`/edit/${r.id}`} title="Edit">
					<img src={more} style={{ height: 28, opacity: 0.85 }} />
				</Link>
			</div>
			<div className="hr"></div>
			<div className="row" style={{ justifyContent: "space-between" }}>
				<div>
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
				</div>
				<div className="badge-price"> ${r.price}</div>
			</div>
			<div className="row" style={{ marginTop: 14 }}>
				<Link to={`/rackets/${r.id}`}>
					<button className="btn secondary">DETAILS</button>
				</Link>
				<Link to={`/edit/${r.id}`}>
					<button className="btn">EDIT</button>
				</Link>
			</div>
		</div>
	);
}
