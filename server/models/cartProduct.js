module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'cartProduct',
		{
			amount: {
				type: DataTypes.INTEGER,
				defaultValue: 1,
			},
		},
		{ underscored: true }
	);
};

module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'cartProduct',
		{
			amount: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
		},
		{ underscored: true }
	);
};
