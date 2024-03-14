import React, {
	useState,
	useEffect,
} from "react";
import "./style/main.css";
import { GiShoppingBag } from "react-icons/gi";
import RatingStars from "./components/RatingStars";
import ShoppingCart from "./components/ShoppingCart";
// import { render } from "@testing-library/react";

const products = [
	{
		id: 1,
		name: "Brass studs earring",
		rating: 4.3,
		description:
			"Flaunt your sense for modern styles and fashion wearing this circular design stud earrings. Color: Gold Other Details: Embellished Elegant circular .",
		price: 399,
		image: require("./assets/images/ring1.jpg"),
	},
	{
		id: 2,
		name: "Goldplated circular ring",
		rating: 4.2,
		description:
			"Elegant Exquisite Timeless Antique Gold Stud",
		price: 229,
		image: require("./assets/images/ring2.jpg"),
	},
	{
		id: 3,
		name: "Golden drop stud",
		// rating: 3.2,
		description:
			"Husna Fashion Jewellery White American Diamond Earring for Women and Girls",
		price: 99,
		image: require("./assets/images/ring3.jpg"),
	},
	{
		id: 4,
		name: " Pearl Bouquet Flower Earrings",
		rating: 4.8,
		description:
			"Small Pearl Bouquet Flower Earrings for Womens Girls Leverback Clip-on Stud Earrings.",
		price: 119,
		image: require("./assets/images/ring4.1.jpg"),
	},
	{
		id: 5,
		name: "Gold Jimikki",
		rating: 4.5,
		description:
			"Floral-Design Gold-Plated Jhumka Earrings",
		price: 185,
		image: require("./assets/images/ring6.jpg"),
	},
	{
		id: 6,
		name: "Traditional Jimikki",
		rating: 3.8,
		description:
			"Beautiful Latest Stylish Jhumka & Earrings Design",
		price: 129,
		image: require("./assets/images/ring5.jpg"),
	},
	{
		id: 7,
		name: "Stylish Peacock Jhumkas",
		rating: 3.8,
		description:
			"Earrings are gold plated in antique finish. Suitable for all kinds of dressy occasions. It will make you more charming and more attractive.",
		price: 199,
		image: require("./assets/images/ring7.jpg"),
	},
	{
		id: 8,
		name: "Classic Jumkka",
		rating: 3.8,
		description:
			"Beautiful Latest Stylish Jhumka & Earrings Design",
		price: 149,
		image: require("./assets/images/ring8.jpg"),
	}
];

function App() {
	const [cartsVisibilty, setCartVisible] =
		useState(false);
	const [productsInCart, setProducts] =
		useState(
			JSON.parse(
				localStorage.getItem(
					"shopping-cart"
				)
			) || []
		);
	useEffect(() => {
		localStorage.setItem(
			"shopping-cart",
			JSON.stringify(productsInCart)
		);
	}, [productsInCart]);
	const addProductToCart = (product) => {
		const newProduct = {
			...product,
			count: 1,
		};
		setProducts([
			...productsInCart,
			newProduct,
		]);
	};

	const onQuantityChange = (
		productId,
		count
	) => {
		setProducts((oldState) => {
			const productsIndex =
				oldState.findIndex(
					(item) =>
						item.id === productId
				);
			if (productsIndex !== -1) {
				oldState[productsIndex].count =
					count;
			}
			return [...oldState];
		});
	};

	const onProductRemove = (product) => {
		setProducts((oldState) => {
			const productsIndex =
				oldState.findIndex(
					(item) =>
						item.id === product.id
				);
			if (productsIndex !== -1) {
				oldState.splice(productsIndex, 1);
			}
			return [...oldState];
		});
	};

// Price Filter Code

const [sort, setSort] = useState("LowToHigh");

// useEffect(() => {
// 	setProductCards([...productCards.sort((a, b) => { return a.price - b.price })]);
// }, []);


// Sort Product by price 
function sortProductsByPrice(e) {
	// e.stopPropagation();
	if (e.target.value === 'LowToHigh') {
		// Sorting Test by price -  Low To High 
	// 	setProductCards([...productCards.sort((a, b) => { return a.price - b.price })]);
	// 
	setSort("LowToHigh");
	}

	if (e.target.value === 'HighToLow') {
		// Sorting Test by price -  High To Low 
		// setProductCards([...productCards.sort((a, b) => { return b.price - a.price })]);
		setSort("HighToLow");
	}
}

const renderProductListing = (sortparam) => {
	if (sortparam === 'LowToHigh') {
		products.sort((a, b) => { return a.price - b.price })}

		if (sortparam === 'HighToLow') {
			products.sort((a, b) => { return b.price - a.price })}

	return(

				<div className="products">
							{products.map((product) => (
								<div
									className="product"
									key={product.id}>
									<img
										className="product-image"
										src={
											product.image
										}
										alt={
											product.image
										}
									/>
									<h4 className="product-name">
										{product.name}
									</h4>
									<RatingStars
										rating={
											product.rating
										}
									/>
									<p>
										{
											product.description
										}
									</p>
									<span className="product-price">
										{product.price}Rs
									</span>
									<div className="buttons">
										{/* <button className="btn">
											Detail
										</button> */}
										<button
											className="btn"
											onClick={() =>
												addProductToCart(
													product
												)
											}
											>
											Add to cart
										</button>
									</div>
								</div>
							))}
						</div>
		
			);
		
		}
		

	return (
		
		<div className="App">
			<ShoppingCart
				visibilty={cartsVisibilty}
				products={productsInCart}
				onClose={() =>
					setCartVisible(false)
				}
				onQuantityChange={
					onQuantityChange
				}
				onProductRemove={onProductRemove}
			/>
			<div className="navbar">
		
			<img class="image"
               src={require('./assets/images/logo2.jpeg')}
			 alt=""
               />
				{/* <h3 className="logo">My Jhumka.com</h3> */}
				
				<button
					className="btn shopping-cart-btn"
					onClick={() =>
						setCartVisible(true)
					}>
					<GiShoppingBag size={24} />
					{productsInCart.length >
						0 && (
						<span className="product-count">
							{
								productsInCart.length
							}
						</span>
					)}
				</button>
			</div>
            <main>
				{/* <h2 className="title">
					Ear Ring Collections
				</h2> */}
				{/* <div className="product-cards">
				<div className="productheader">
                <h1>Filter By Price</h1>
                <div className="price-filter">
                    <span> Price : &nbsp;</span>
                    <select class="form-select form-select-sm" data-bs-theme="light" aria-label=".form-select-sm" name="price" id="test-price" 
					 onChange={(e) => sortProductsByPrice(e)}
				>
                        <option value="LowToHigh">Low To High</option>
                        <option value="HighToLow">High To Low</option>
                    </select>
                </div>
            </div>
			</div> */}
			<h2 className="title">
					Ear Ring Collections
				</h2>
				<div className="productheader">
                <h1>Filter By Price</h1>
                <div className="price-filter">
                    <span> Price : &nbsp;</span>
                    <select className="form-select form-select-sm" data-bs-theme="light" aria-label=".form-select-sm" name="price" id="test-price" 
					 onChange={(e) => sortProductsByPrice(e)}
				>
                        <option value="LowToHigh">Low To High</option>
                        <option value="HighToLow">High To Low</option>
                    </select>
                </div>
				</div>
				</main>
				{renderProductListing(sort)}
				</div>

	);	
	}	
	export default App;
// 				{/* <div className="products">
// 					{products.map((product) => (
// 						<div
// 							className="product"
// 							key={product.id}>
// 							<img
// 								className="product-image"
// 								src={
// 									product.image
// 								}
// 								alt={
// 									product.image
// 								}
// 							/>
// 							<h4 className="product-name">
// 								{product.name}
// 							</h4>
// 							<RatingStars
// 								rating={
// 									product.rating
// 								}
// 							/>
// 							<p>
// 								{
// 									product.description
// 								}
// 							</p>
// 							<span className="product-price">
// 								{product.price}Rs
// 							</span>
// 							<div className="buttons">
// 								{/* <button className="btn">
// 									Detail
// 								</button> */}
// 								{/* <button
// 									className="btn"
// 									onClick={() =>
// 										addProductToCart(
// 											product
// 										)
// 									}>
// 									Add to cart
// 								</button>
// 							</div> */}
// 						{/* </div> */}
// 					{/* ))} */}
// 					{/* </div> */}
// 				{/* </div> */}
// 			{/* </main> */} */}
// // 			{renderProductListing(sort)}
// // 		</div>
// // 	);
// // }

// // export default App;
