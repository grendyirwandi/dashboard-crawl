/* jshint indent: 1 */
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tbl_bank', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		code: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: true
        },
        info_bank:{
            type: DataTypes.STRING(256),
			allowNull: true
        },
		// createdAt: {
		// 	type: DataTypes.DATE,
		// 	allowNull: false,
		// 	defaultValue: sequelize.fn('current_timestamp')
		// },
		// updatedAt: {
		// 	type: DataTypes.DATE,
		// 	allowNull: false,
		// 	defaultValue: sequelize.fn('current_timestamp')
		// }
	}, {
		tableName: 'tbl_bank'
	})
	// bank.associate = function (models) {
    //     // associations can be defined here
    //     bank.belongsTo(models["tbl_accounts"], {
	// 		foreignKey: 'id',
	// 		targetKey: 'id_bank'
    //     });
	// };
	// return bank;
};
