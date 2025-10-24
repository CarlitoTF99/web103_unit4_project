import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	OPTIONS,
	getRacket,
	updateRacket,
	deleteRacket,
} from "../services/RacketsAPI";
import RacketPreview from "../components/RacketPreview";
import "../styles/EditRacket.css";

export default function EditRacket() {
	const { id } = useParams();
	const nav = useNavigate();
	const [cfg, setCfg] = useState(null);
	const [err, setErr] = useState(null);

	// Fetch the existing racket from DB
	useEffect(() => {
		(async () => {
			const data = await getRacket(id);
			setCfg(data);
		})();
	}, [id]);

	if (!cfg) return <div className="container">Loading...</div>;

	const set = (k, v) => setCfg((prev) => ({ ...prev, [k]: v }));

	async function onUpdate(e) {
		e.preventDefault();
		const r = await updateRacket(id, cfg);
		if (r?.error) {
			setErr(r.error);
			return;
		}
		nav("/");
	}

	async function onDelete() {
		await deleteRacket(id);
		nav("/");
	}

	return (
		<div className="container">
			<div
				className="row"
				style={{ justifyContent: "space-between", marginBottom: 10 }}
			>
				<h2>Edit Racket</h2>
				<div className="toolbar">
					<Link to={`/rackets/${id}`}>
						<button className="btn secondary">DETAIL</button>
					</Link>
					<Link to="/">
						<button className="btn secondary">Back</button>
					</Link>
				</div>
			</div>

			{/* Preview the racket */}
			<RacketPreview cfg={cfg} />

			<form className="card" onSubmit={onUpdate}>
				<div className="tabs">
					<button type="button" className="tab">
						EXTERIOR
					</button>
					<button type="button" className="tab outline">
						FRAME
					</button>
					<button type="button" className="tab outline">
						GRIP
					</button>
					<button type="button" className="tab outline">
						STRINGS
					</button>
				</div>

				<div className="grid cols-3">
					<label>
						Racket Name
						<input
							className="input"
							value={cfg.name || ""}
							onChange={(e) => set("name", e.target.value)}
						/>
					</label>

					<label>
						Head Size
						<select
							className="input"
							value={cfg.headsize || ""}
							onChange={(e) => set("headsize", e.target.value)}
						>
							{OPTIONS.headsize.map((o) => (
								<option key={o} value={o}>
									{o} sq in
								</option>
							))}
						</select>
					</label>

					<label>
						Frame Color
						<select
							className="input"
							value={cfg.framecolor || ""}
							onChange={(e) => set("framecolor", e.target.value)}
						>
							{OPTIONS.framecolor.map((o) => (
								<option key={o} value={o}>
									{o}
								</option>
							))}
						</select>
					</label>

					<label>
						Grip Size
						<select
							className="input"
							value={cfg.grip || ""}
							onChange={(e) => set("grip", e.target.value)}
						>
							{OPTIONS.grip.map((o) => (
								<option key={o} value={o}>
									{o}
								</option>
							))}
						</select>
					</label>

					<label>
						String Pattern
						<select
							className="input"
							value={cfg.stringpattern || ""}
							onChange={(e) => set("stringpattern", e.target.value)}
						>
							{OPTIONS.stringpattern.map((o) => (
								<option key={o} value={o}>
									{o}
								</option>
							))}
						</select>
					</label>

					<label className="row" style={{ marginTop: 24 }}>
						<input
							type="checkbox"
							checked={cfg.extended || false}
							onChange={(e) => set("extended", e.target.checked)}
						/>
						<span>Extended Length (27.5")</span>
					</label>

					<label className="row">
						<input
							type="checkbox"
							checked={cfg.custompaint || false}
							onChange={(e) => set("custompaint", e.target.checked)}
						/>
						<span>Custom Paint</span>
					</label>
				</div>

				{err && <div style={{ color: "#ff6b6b", marginTop: 10 }}>{err}</div>}

				<div className="row" style={{ marginTop: 16, gap: 12 }}>
					<button className="btn" type="submit">
						UPDATE
					</button>
					<button className="btn secondary" type="button" onClick={onDelete}>
						DELETE
					</button>
				</div>
			</form>
		</div>
	);
}
