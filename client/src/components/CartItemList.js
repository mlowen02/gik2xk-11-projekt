import { useEffect, useState } from 'react';
import { addToCart, getCartById, removeFromCart } from '../models/CartModel';
import CartListItem from './CartListItem';

function CartItemList() {
	const [cart, setCart] = useState({});
	useEffect(() => {
		fetchCart();
	}, []);

	function fetchCart() {
		getCartById(1).then((cart) => {
			setCart(cart);
		});
	}

	function editItemInCart(cartId, productId, qty) {
		if (qty < 0) {
			removeFromCart(cartId, productId, -qty).then((result) => {
				fetchCart();
			});
		} else {
			addToCart(cartId, productId, qty).then((result) => {
				fetchCart();
			});
		}
	}

	return (
		<>
			{cart?.products &&
				cart.products.map((product) => {
					return (
						<li key={`cartDrawerItemId_${product.id}`}>
							<CartListItem onEdit={editItemInCart} product={product} />
						</li>
					);
				})}
			{cart?.products && <p>Total: {cart.priceTotal}</p>}
		</>
	);
}

export default CartItemList;
