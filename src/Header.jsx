import React from "react";
import { Link, NavLink } from "react-router-dom";

const activeStyle = {
	color: "red",
};

export default function Header() {
	return (
		<header>
			<nav>
				<ul>
					<li>
						<Link to="/">
							<img alt="Carved Rock Fitness" src="/images/logo.png" />
						</Link>
						<NavLink
							style={({ isActive }) => (isActive ? activeStyle : undefined)}
							to="/shoes"
						>
							Shoes
						</NavLink>
						<NavLink
							style={({ isActive }) => (isActive ? activeStyle : undefined)}
							to="/cart"
						>
							Cart
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
}
