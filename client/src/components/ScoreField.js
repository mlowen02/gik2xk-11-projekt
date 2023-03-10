import { Button } from '@mui/material';
import { Box } from '@mui/system';
import Rating from '@mui/material/Rating';
function ScoreField({ onSave }) {
	var score = 3;
	return (
		<>
			<Box>
				<Rating
					onChange={(e, val) => {
						score = val;
					}}
					name="Rating"
					defaultValue={3}
					precision={1}
				/>
			</Box>
			<Button onClick={() => onSave(score)}>Add score</Button>
		</>
	);
}

export default ScoreField;
