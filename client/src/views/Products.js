import { useLocation } from 'react-router-dom';
import ProductList from '../components/ProductList';

function Products() {
	const location = useLocation();
	return <ProductList pathname={location.pathname} />;
}

export default Products;
