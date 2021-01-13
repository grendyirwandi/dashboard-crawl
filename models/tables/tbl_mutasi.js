/* jshint indent: 1 */
module.exports = function(sequelize, DataTypes) {
	let tbl_mutasi =  sequelize.define('tbl_mutasi', {
	// return sequelize.define('tbl_mutasi', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		id_account: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
		},
		date_trans: {
			type: DataTypes.STRING(20),
			allowNull: true,
		},
		description: {
			type: DataTypes.STRING(256),
			allowNull: true
        },
		branch: {
			type: DataTypes.STRING(256),
			allowNull: true
        },
		value_trans: {
			type: DataTypes.STRING(256),
			allowNull: true
        },
		type_trans: {
			type: DataTypes.STRING(256),
			allowNull: true
        },
		balance: {
			type: DataTypes.STRING(256),
			allowNull: true
        },
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.fn('current_timestamp')
		},
	}, {
		tableName: 'tbl_mutasi'
    });
        tbl_mutasi.associate = function (models) {
            // associations can be defined here
            tbl_mutasi.belongsTo(models["tbl_accounts"], {
        		foreignKey: 'id_account',
        		targetKey: 'id_account'
            });
        };
        return tbl_mutasi;
};
