import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Routes, Route } from "react-router-dom";
import Detail from "./Detail";
import Cart from "./Cart";

export default function App() {
	//lifting state
	const [cart, setCart] = useState(() => {
		try {
			return JSON.parse(localStorage.getItem("cart")) ?? [];
		} catch {
			console.error("The cart could not be parsed into JSON.");
			return [];
		}
	});

	useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

	//adding item to cart
	function addToCart(id, sku) {
		//whatever returned in setCart becomes new state
		setCart((items) => {
			//check if the item with same sku or id is in the cart
			const itemInCart = items.find((i) => i.sku === sku);
			if (itemInCart) {
				//Return new array with the matching item replaced.
				return items.map((i) =>
					i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
				);
			} else {
				//Return new array with the new item appended.
				return [...items, { id, sku, quantity: 1 }];
			}
		});
	}

	//Update quantity of an item in a cart
	function updateQuantity(sku, quantity) {
		setCart((items) => {
			//if the item sku is the item we are looking for than update the item quantity if not pass the same item untouched
			return quantity === 0
				? items.filter((i) => i.sku !== sku)
				: items.map((i) => (i.sku === sku ? { ...i, quantity } : i));
		});
	}

	return (
		<>
			<div className="content">
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
						<Route path="/:category" element={<Products />} />
						<Route
							path="/:category/:id"
							element={<Detail addToCart={addToCart} />}
						/>
						<Route
							path="/cart"
							element={<Cart cart={cart} updateQuantity={updateQuantity} />}
						/>
					</Routes>
				</main>
			</div>
			<Footer />
		</>
	);
}
