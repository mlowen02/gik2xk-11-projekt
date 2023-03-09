import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { getAll } from '../models/ProductModel';
import ProductItemSmall from './ProductItemSmall';

function ProductList({ pathname }) {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		getAll(pathname).then((products) => setProducts(products));
	}, [pathname]);
	return (
		<ul>
			{products &&
				products.map((product) => {
					return (
						<li key={`ProductId_${product.id}`}>
							<Box mb={10}>
								<ProductItemSmall product={product} />
							</Box>
						</li>
					);
				})}
		</ul>
	);
}

export default ProductList;
