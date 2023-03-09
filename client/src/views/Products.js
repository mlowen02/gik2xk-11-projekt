import { useLocation } from 'react-router-dom';
import PostList from '../components/ProductList';

function Products() {
	const location = useLocation();
	return <PostList pathname={location.pathname} />;
}

export default Products;
