module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'score',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			score: {
				type: DataTypes.INTEGER(1),
				allowNull: false,
				validate: {
					min: 1,
					max: 5,
				},
			},
		},
		{ underscored: true }
	);
};
