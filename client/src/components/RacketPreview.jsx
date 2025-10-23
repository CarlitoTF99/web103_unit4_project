export default function RacketPreview({ cfg, price }) {
	const frame = {
		black: "#0b0b0c",
		red: "#8b0e12",
		blue: "#1646b8",
		white: "#dfe5f0",
	}[cfg.framecolor];
	const strings = cfg.stringpattern === "18x20" ? "#a8b1bd" : "#d1d7e2";
	const grip = {
		"4 1/8": "#9f7b47",
		"4 1/4": "#8b5e34",
		"4 3/8": "#6e4b2b",
		"4 1/2": "#5a3f24",
	}[cfg.grip];

	return (
		<div className="card" style={{ position: "relative", overflow: "hidden" }}>
			<div
				className="badge-price"
				style={{ position: "absolute", left: 20, bottom: 20 }}
			>
				💰 ${price}
			</div>
			{/* SVG racket */}
			<svg
				viewBox="0 0 600 260"
				style={{ width: "100%", height: "auto", display: "block" }}
			>
				{/* head rim */}
				<ellipse
					cx="190"
					cy="130"
					rx="140"
					ry="90"
					fill="none"
					stroke={frame}
					strokeWidth="16"
				/>
				{/* throat */}
				<path
					d="M270 185 L350 230 L550 240"
					fill="none"
					stroke={frame}
					strokeWidth="18"
					strokeLinecap="round"
				/>
				{/* handle */}
				<rect x="350" y="220" width="220" height="26" rx="6" fill={grip} />
				{/* strings (simplified grid) */}
				{[...Array(8)].map((_, i) => (
					<line
						key={"v" + i}
						x1={110 + i * 20}
						y1={60}
						x2={110 + i * 20}
						y2={200}
						stroke={strings}
						strokeWidth="2"
					/>
				))}
				{[...Array(6)].map((_, i) => (
					<line
						key={"h" + i}
						x1={60}
						y1={80 + i * 22}
						x2={320}
						y2={80 + i * 22}
						stroke={strings}
						strokeWidth="2"
					/>
				))}
				{/* custom paint glow */}
				{cfg.custompaint && (
					<ellipse
						cx="190"
						cy="130"
						rx="155"
						ry="105"
						fill="none"
						stroke="#b01216"
						strokeOpacity=".35"
						strokeWidth="10"
					/>
				)}
				{/* extended marker */}
				{cfg.extended && (
					<rect x="560" y="220" width="10" height="26" fill="#b01216" />
				)}
			</svg>
		</div>
	);
}
