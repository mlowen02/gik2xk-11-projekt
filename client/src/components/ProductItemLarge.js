import { Chip, Typography } from '@mui/material';
import ProductItemSmall from './ProductItemSmall';

function ProductItemLarge({ product }) {
	return product ? (
		<>
			<div>
				<ProductItemSmall product={product} />
			</div>
			<div>
				<p>{product.createdAt}</p>
			</div>
			<div>
				<Typography variant="h6">Ratings</Typography>
				{product.scores &&
					product.scores.map((score) => {
						return <Chip key={score.id} label={`${score.score}/5`}></Chip>;
					})}
			</div>
		</>
	) : (
		<>Product missing</>
	);
}

export default ProductItemLarge;
