/* jshint indent: 1 */
module.exports = function(sequelize, DataTypes) {
	let tbl_accounts =  sequelize.define('tbl_accounts', {
		id_account: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name_account: {
			type: DataTypes.STRING(256),
			allowNull: false,
		},
		pswd_account: {
			type: DataTypes.STRING(256),
			allowNull: false
        },
        id_bank:{
            type: DataTypes.STRING(50),
			allowNull: false
        },
        no_rekening:{
            type: DataTypes.STRING(50),
			allowNull: true
        },
        start_date:{
            type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.fn('current_timestamp')
        },
        finish_date:{
            type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.fn('current_timestamp')
        },
        flag:{
            type: DataTypes.INTEGER(2),
			allowNull: false
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
		// tableName: 'tbl_accounts'
    });
        tbl_accounts.associate = function (models) {
            // associations can be defined here
            tbl_accounts.belongsTo(models["tbl_bank"], {
        		foreignKey: 'id_bank',
        		targetKey: 'id'
            });
            tbl_accounts.belongsTo(models["tbl_mutasi"], {
        		foreignKey: 'id_account',
        		targetKey: 'id_account'
            });
            // tbl_accounts.belongsTo(models["tbl_mutasi_bni"], {
        	// 	foreignKey: 'id_account',
        	// 	targetKey: 'id_account'
            // });
            // tbl_accounts.belongsTo(models["tbl_mutasi_bca"], {
        	// 	foreignKey: 'id_account',
        	// 	targetKey: 'id_account'
            // });
            // tbl_accounts.belongsTo(models["tbl_mutasi_mandiri"], {
        	// 	foreignKey: 'id_account',
        	// 	targetKey: 'id_account'
            // });
        };
        return tbl_accounts;
};
