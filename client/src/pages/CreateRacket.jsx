import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RacketPreview from "../components/RacketPreview";
import "../styles/CreateRacket.css";
import {
	OPTIONS as RACKET_OPTIONS,
	createRacket,
} from "../services/RacketsAPI";
import { computePrice } from "../utilities/price";
import { validate } from "../utilities/validate";

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
	const [tab, setTab] = useState("exterior"); // NEW
	const nav = useNavigate();

	const set = (k, v) => setCfg((prev) => ({ ...prev, [k]: v }));
	const price = computePrice(cfg);

	async function onSubmit(e) {
		e.preventDefault();
		const msg = validate(cfg);
		if (msg) return setErr(msg);
		const created = await createRacket(cfg);
		if (created?.error) return setErr(created.error);
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
					<button
						type="button"
						className={`tab ${tab === "exterior" ? "active" : ""}`}
						onClick={() => setTab("exterior")}
					>
						EXTERIOR
					</button>
					<button
						type="button"
						className={`tab outline ${tab === "frame" ? "active" : ""}`}
						onClick={() => setTab("frame")}
					>
						FRAME
					</button>
					<button
						type="button"
						className={`tab outline ${tab === "grip" ? "active" : ""}`}
						onClick={() => setTab("grip")}
					>
						GRIP
					</button>
					<button
						type="button"
						className={`tab outline ${tab === "strings" ? "active" : ""}`}
						onClick={() => setTab("strings")}
					>
						STRINGS
					</button>
				</div>

				<div className="grid cols-3">
					{tab === "exterior" && (
						<>
							<label>
								Racket Name
								<input
									className="input"
									value={cfg.name}
									onChange={(e) => set("name", e.target.value)}
								/>
							</label>

							<label>
								Frame Color
								<select
									className="input"
									value={cfg.framecolor}
									onChange={(e) => set("framecolor", e.target.value)}
								>
									{RACKET_OPTIONS.framecolor.map((o) => (
										<option key={o} value={o}>
											{o}
										</option>
									))}
								</select>
							</label>

							<label className="row" style={{ marginTop: 24 }}>
								<input
									type="checkbox"
									checked={cfg.custompaint}
									onChange={(e) => set("custompaint", e.target.checked)}
								/>
								<span>Custom Paint</span>
							</label>
						</>
					)}

					{tab === "frame" && (
						<>
							<label>
								Head Size
								<select
									className="input"
									value={cfg.headsize}
									onChange={(e) => set("headsize", e.target.value)}
								>
									{RACKET_OPTIONS.headsize.map((o) => (
										<option key={o} value={o}>
											{o} sq in
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
						</>
					)}

					{tab === "grip" && (
						<label>
							Grip Size
							<select
								className="input"
								value={cfg.grip}
								onChange={(e) => set("grip", e.target.value)}
							>
								{RACKET_OPTIONS.grip.map((o) => (
									<option key={o} value={o}>
										{o}
									</option>
								))}
							</select>
						</label>
					)}

					{tab === "strings" && (
						<label>
							String Pattern
							<select
								className="input"
								value={cfg.stringpattern}
								onChange={(e) => set("stringpattern", e.target.value)}
							>
								{RACKET_OPTIONS.stringpattern.map((o) => (
									<option key={o} value={o}>
										{o}
									</option>
								))}
							</select>
						</label>
					)}
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
