import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OPTIONS, createRacket } from "../services/RacketsAPI";
import { computePrice } from "../utilities/price";
import { validate } from "../utilities/validate";
import RacketPreview from "../components/RacketPreview";
import "../styles/CreateRacket.css";

const initial = {
	name: "My New Racket",
	headsize: "100",
	framecolor: "black",
	grip: "4 3/8",
	stringpattern: "16x19",
	extended: false,
	custompaint: false,
	image: null,
};

export default function CreateRacket() {
	const [cfg, setCfg] = useState(initial);
	const [err, setErr] = useState(null);
	const price = computePrice(cfg);
	const nav = useNavigate();

	const set = (k, v) => setCfg((prev) => ({ ...prev, [k]: v }));

	async function onSubmit(e) {
		e.preventDefault();
		const msg = validate(cfg);
		if (msg) {
			setErr(msg);
			return;
		}
		const created = await createRacket(cfg);
		if (created.error) {
			setErr(created.error);
			return;
		}
		nav("/");
	}

	return (
		<div className="container">
			<div
				className="row"
				style={{ justifyContent: "space-between", marginBottom: 10 }}
			>
				<h2>Create Racket</h2>
				<Link to="/">
					<button className="btn secondary">Back</button>
				</Link>
			</div>

			<RacketPreview cfg={cfg} price={price} />

			<form className="card" onSubmit={onSubmit}>
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
							value={cfg.name}
							onChange={(e) => set("name", e.target.value)}
						/>
					</label>

					<label>
						Head Size
						<select
							className="input"
							value={cfg.headsize}
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
							value={cfg.framecolor}
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
							value={cfg.grip}
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
							value={cfg.stringpattern}
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
							checked={cfg.extended}
							onChange={(e) => set("extended", e.target.checked)}
						/>
						<span>Extended Length (27.5")</span>
					</label>

					<label className="row">
						<input
							type="checkbox"
							checked={cfg.custompaint}
							onChange={(e) => set("custompaint", e.target.checked)}
						/>
						<span>Custom Paint</span>
					</label>
				</div>

				{err && <div style={{ color: "#ff6b6b", marginTop: 10 }}>{err}</div>}

				<div className="row" style={{ marginTop: 16 }}>
					<button className="btn" type="submit">
						CREATE
					</button>
				</div>
			</form>
		</div>
	);
}
