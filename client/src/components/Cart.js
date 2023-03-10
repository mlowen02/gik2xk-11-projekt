import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}


const rows = [createRow('Paperclips (Box)', 100, 1.15), createRow('Paper (Case)', 10, 45.99), createRow('Waste Basket', 2, 17.99)];

export default function SpanningTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.desc}>
              <TableCell>{row.desc}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{ccyFormat(row.total)}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell align="right">{ccyFormat(cartSummary)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
