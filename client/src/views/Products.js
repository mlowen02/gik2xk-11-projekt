import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import ProductList from '../components/ProductList';

function Products() {
	const location = useLocation();
	return (
		<>
			<Typography variant="h4" component="h2">
				All Products
			</Typography>
			<ProductList pathname={location.pathname} />
		</>
	);
}

export default Products;
