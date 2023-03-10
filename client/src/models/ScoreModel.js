import api from '../api.js';

export async function getAverageScore(id) {
	if (isNaN(id)) {
		return;
	}
	var average = 0;
	const scores = await getScores(id);
	scores.forEach((score) => {
		average += score.score;
	});
	average = average / scores.length;

	return Math.round(average * 10) / 10;
}
export async function getScores(id) {
	const result = await api.get(`/products/${id}/getScores`, {
		data: { id },
	});
	if (result.status === 200) return result.data;

	console.log(result.status);
	console.log(result.data);
	return {};
}
