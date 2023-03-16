import { Typography } from '@mui/material';
import ProductItemSmall from './ProductItemSmall';
import Ratings from './Ratings';

function ProductItemLarge({ product }) {
	return product ? (
		<>
			<div>
				<ProductItemSmall product={product} />
			</div>
			<div>
				<p>{product.description}</p>
				<p>Created at: {product.createdAt}</p>
			</div>
			<div>
				<Typography variant="h6">Ratings:</Typography>
				<Ratings scores={product.scores} />
			</div>
		</>
	) : (
		<>Product missing</>
	);
}

export default ProductItemLarge;
