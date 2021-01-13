/* jshint indent: 1 */
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tbl_users', {
		id_user: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		username: {
			type: DataTypes.STRING(256),
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING(256),
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.fn('current_timestamp')
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.fn('current_timestamp')
		}
	}, {
		tableName: 'tbl_users'
	});
};
