import api from '../api.js';

export async function getCartById(id) {
	const result = await api.get(`/carts/${id}`);
	if (result.status === 200) return result.data;
	console.log(result.status);
	console.log(result.data);

	return {};
}
