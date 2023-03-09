import { Button, Typography, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAverageScore } from '../models/ProductModel';
function ProductItemSmall({ product }) {
  const [average, setAverage] = useState([]);
  const avg = async () => {
    const avg = await getAverageScore(product.id);
    if (!isNaN(avg)) {
      setAverage(avg);
    }
  };
  avg();

  return product ? (
    <>
      <div>
        <Typography variant="h5" component="h3">
          <Link to={`/products/${product.id}`}>
            <img alt={product.name} height="100" width="100" src={product.imageUrl} />
            <div>{product.name}</div>
          </Link>
        </Typography>
        <p>Rating: {`${average}/5`}</p>
        <div>
          <Typography variant="h6">Add to Cart:</Typography>
          <TextField id="outlined-basic" label="Amount:" variant="outlined" />
          <Button variant="contained">Add product(s)</Button>
        </div>
      </div>
    </>
  ) : (
    <>Product missing</>
  );
}

export default ProductItemSmall;
