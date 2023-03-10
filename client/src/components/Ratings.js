import { Chip } from '@mui/material';

function Ratings({ scores }) {
	return scores ? (
		<>
			{scores &&
				scores.map((score) => {
					return <Chip key={score.id} label={`${score.score}/5`}></Chip>;
				})}
		</>
	) : (
		<>Ratings missing</>
	);
}

export default Ratings;
