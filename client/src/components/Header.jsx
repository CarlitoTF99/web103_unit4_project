import { Link, useLocation } from "react-router-dom";

export default function Header() {
	const { pathname } = useLocation();
	return (
		<header
			style={{
				background:
					"url(https://images.unsplash.com/photo-1550345332-09e3ac987658?q=80&w=2400&auto=format&fit=crop) center/cover",
				padding: "36px 0",
				position: "relative",
				marginBottom: 20,
			}}
		>
			<div className="container" style={{ backdropFilter: "brightness(0.8)" }}>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<h1 style={{ fontSize: 56, textShadow: "0 8px 24px rgba(0,0,0,.6)" }}>
						Bolt Bucket 🎾
					</h1>
					<div className="toolbar">
						<Link to="/">
							<button className="btn">VIEW RACKETS</button>
						</Link>
						<Link to="/new">
							<button className="btn">CREATE</button>
						</Link>
					</div>
				</div>
				<div style={{ opacity: 0.9, marginTop: 8 }}>
					<span className="mono">{pathname}</span>
				</div>
			</div>
		</header>
	);
}
