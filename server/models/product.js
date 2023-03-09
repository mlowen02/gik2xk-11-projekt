module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'product',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			imageUrl: {
				type: DataTypes.STRING(255),
			},
			price: {
				allowNull: false,
				type: DataTypes.FLOAT,
			},
		},
		{ underscored: true }
	);
};
