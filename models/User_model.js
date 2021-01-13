'use strict';
const tables = require('./tables');

class User_model {
    async getServerConfig(params){
        const conditionCustomer = {
            where: {
                id_customer: params.person_id
            }
        }
        const checkCustomer = await tables.dcp_config_server.findOne(conditionCustomer);
        return checkCustomer.status_user_db == true && checkCustomer.status_subdomain == true ? true : false;
    }
}

module.exports = User_model;