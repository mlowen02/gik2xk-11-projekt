import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductItemLarge from '../components/ProductItemLarge';
import ScoreField from '../components/ScoreField';
import { addScore, getOne } from '../models/ProductModel';

function ProductDetail() {
	const params = useParams();
	const productId = params.id;

	const [product, setProduct] = useState({});

	useEffect(() => {
		getOne(productId).then((product) => {
			setProduct(product);
		});
	}, [productId]);

	const navigate = useNavigate();
	const goBack = (num) => {
		navigate(-num);
	};

	function onScoreAdd(scoreToAdd) {
		addScore(productId, 1, scoreToAdd);
	}

	return (
		<>
			<Box mt={5}>
				<ProductItemLarge product={product} />
			</Box>
			<div>
				<ScoreField onSave={onScoreAdd}></ScoreField>
			</div>
			<Button
				component={Link}
				to={`/products/${productId}/edit`}
				variant="contained"
				color="primary"
			>
				Edit
			</Button>
			<Button
				onClick={() => goBack(1)}
				component={Link}
				to=""
				variant="contained"
				color="primary"
			>
				Back
			</Button>
		</>
	);
}

export default ProductDetail;
