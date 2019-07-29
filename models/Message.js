const BaseModel = require('./BaseModel')
const crypto = require('crypto')

class Message extends BaseModel {

    async $beforeInsert() {
        this.messageId = 'MG' + await crypto.randomBytes(5).toString('hex').toUpperCase()
    }

    static get relationMappings(){ 

        const Alert = require('./Alert')

        return {
            alert:{
                relation: BaseModel.BelongsToOneRelation,
                modelClass: Alert,
                join:{
                    from:'messages.alert_id',
                    to:'alerts.id'
                }
            }
        }
    }
}

module.exports = Message