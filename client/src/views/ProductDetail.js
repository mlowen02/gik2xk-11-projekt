import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CartAdd from '../components/CartAdd';
import ProductItemLarge from '../components/ProductItemLarge';
import ScoreField from '../components/ScoreField';
import { addToCart } from '../models/CartModel';
import { addScore, getOne } from '../models/ProductModel';

function ProductDetail() {
	const params = useParams();
	const productId = params.id;

	const [product, setProduct] = useState({});

	useEffect(() => {
		refreshProduct();
		// eslint-disable-next-line
	}, [productId]);

	function refreshProduct() {
		getOne(productId).then((product) => {
			setProduct(product);
		});
	}

	const navigate = useNavigate();
	const goBack = (num) => {
		navigate(-num);
	};
	function onScoreAdd(scoreToAdd) {
		addScore(productId, 1, scoreToAdd).then((result) => {
			refreshProduct();
		});
	}

	function onProductAdd(cartId = 1, qty) {
		if (qty > 0) {
			addToCart(cartId, productId, qty).then((result) => console.log(result));
		}
	}

	return product ? (
		<>
			<Box mt={5}>
				<ProductItemLarge product={product} />
			</Box>
			<div>
				<CartAdd onAdd={onProductAdd} />
			</div>
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
	) : (
		<>Product missing</>
	);
}

export default ProductDetail;
