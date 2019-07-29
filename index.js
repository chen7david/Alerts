const { template } = require('lodash')
const translations = require('./translations')
const { Alert, Message } = require('./models')


// Alert.getMessage(5)
// const result = Alert.query().insertGraph({
//     name:'EMAILSENT',
//     messages:[
//         {
//             language:'en',
//             body:'an emal was sent to ${email}'
//         },
//         {
//             language:'cn',
//             body:'邮箱已发送到${email}'
//         },
//         {
//             language:'nl',
//             body:'een email is verstuurd naar ${email}'
//         },
//     ]
// })

async function run(){
   const messages =  await Alert.getMessage('EMAILSENT',{email:'chen7david'})
   console.log(messages)

}
run()


function transform(messages, data = { key:'undefined'}){
        
    let transformed = {}
    let { key } = data

    for(const message of messages){
        const { body, language } = message
        if(body.includes('${key}')){
            data.key = translations[key] && translations[key][language] || key
        } 
        transformed[message.language] = template(message.body)(data)
    }
    
    return transformed
}
// const tr = transform(messages,{email:'chen7david'})