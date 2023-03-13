import api from '../api.js';

export async function getCartById(id = 1) {
	const result = await api.get(`/carts/${id}`);
	if (result.status === 200) return result.data;
	console.log(result.status);
	console.log(result.data);

	return {};
}

export async function addToCart(cartId = 1, productId, qty) {
	const result = await api.post(`carts/${cartId}/addProduct/${productId}`, {
		amount: qty,
	});
	if (result.status === 200) return result.data;
	console.log(result.status);
	console.log(result.data);

	return {};
}

export async function removeFromCart(cartId = 1, productId, qty) {
	const result = await api.delete(
		`carts/${cartId}/removeProduct/${productId}`,
		{
			data: {
				amount: qty,
			},
		}
	);
	if (result.status === 200) return result.data;
	console.log(result.status);
	console.log(result.data);

	return {};
}
