/* jshint indent: 1 */
module.exports = function(sequelize, DataTypes) {
	let tbl_mailing_list =  sequelize.define('tbl_mailing_list', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		nama: {
			type: DataTypes.STRING(256),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(256),
			allowNull: false
        },
        phone:{
            type: DataTypes.STRING(50),
			allowNull: false
        },
        mail_server_id:{
            type: DataTypes.STRING(50),
			allowNull: true
        },
	}, {
		tableName: 'tbl_mailing_list'
    });
        // tbl_mailing_list.associate = function (models) {
            // tbl_mailing_list.belongsTo(models["tbl_mutasi_bni"], {
        	// 	foreignKey: 'id_account',
        	// 	targetKey: 'id_account'
            // });
            // tbl_mailing_list.belongsTo(models["tbl_mutasi_bca"], {
        	// 	foreignKey: 'id_account',
        	// 	targetKey: 'id_account'
            // });
            // tbl_mailing_list.belongsTo(models["tbl_mutasi_mandiri"], {
        	// 	foreignKey: 'id_account',
        	// 	targetKey: 'id_account'
            // });
        // };
        return tbl_mailing_list;
};
