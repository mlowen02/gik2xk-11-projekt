import api from '../api.js';

export async function getAll(url = '/products') {
	const result = await api.get(url);

	if (result.status === 200) return result.data;
	console.log(result.status);
	console.log(result.data);
	return [];
}

export async function getOne(id) {
	const result = await api.get(`/products/${id}`);
	if (result.status === 200) return result.data;

	console.log(result.status);
	console.log(result.data);
	return {};
}

export async function update(post) {
	const result = await api.put(`/products/`, post);
	if (result.status === 200) return result.data;

	console.log(result.status);
	console.log(result.data);
	return {};
}

export async function create(post) {
	const result = await api.post(`/products/`, post);
	if (result.status === 200) return result.data;

	console.log(result.status);
	console.log(result.data);
	return {};
}

export async function remove(id) {
	const result = await api.delete(`/products/`, { data: { id } });
	if (result.status === 200) return result.data;

	console.log(result.status);
	console.log(result.data);
	return {};
}

export async function addScore(productId, userId, score) {
	const result = await api.post(`/products/${productId}/addScore`, {
		userId,
		score,
	});
	if (result.status === 200) return result.data;

	console.log(result.status);
	console.log(result.data);
	return {};
}
