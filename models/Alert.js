const BaseModel = require('./BaseModel')
const crypto = require('crypto')
const { template } = require('lodash')
const translations = require('./../translations')

class Alert extends BaseModel {

    async $beforeInsert() {
        this.alertId = "AL" + crypto.randomBytes(5).toString('hex').toUpperCase()
    }

    static async getMessage(name, data = { key:'undefined'}){

        let transformed = {}
        let { key } = data
        const alert =  await this.query().where('name',name).eager('messages').first()
        const messages = alert && alert.messages

        const unknownEror = {
            en:'unkown error',
            cn:'服务器遇到无认的错误',
            nl:'onbekede systeems fout'
        }
        
        if(!Array.isArray(messages))
            return unknownEror
        
        for(const message of messages){
            const { body, language } = message
            if(body.includes('${key}')){
                data.key = translations[key] && translations[key][language] || key
            } 
            transformed[message.language] = template(message.body)(data)
        }
        
        return transformed
    }

    static get relationMappings(){
        
        const Message = require('./Message')

        return {
            messages:{
                relation: BaseModel.HasManyRelation,
                modelClass: Message,
                join:{
                    from:'alerts.id',
                    to:'messages.alert_id'
                }
            }
        }
    }
}

module.exports = Alert