const monogoose = require('mongoose')

const chatModel = monogoose.Schema({
    chatName:{type:String,trim:true},
    isGroupChat:{type:Boolean,default:false},
    users:[{
        type: monogoose.Schema.Types.ObjectId,
        ref:"User"
    }
    ],
    latestMessage:{
        type: monogoose.Schema.Types.ObjectId,
        ref:"Message"
    },
    groupAdmmin:{
        type: monogoose.Schema.Types.ObjectId,
        ref:"User"
    }

},
{
    timestamps:true
})

const Chat = monogoose.model("Chat",chatModel)

module.exports = Chat
