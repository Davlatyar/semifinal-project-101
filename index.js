const TelegramBot = require("node-telegram-bot-api")

const TOKEN = "8053059566:AAHzxLSE-aFLpASry8W6WUxnQbUIMoJ_WnE"

const bot = new TelegramBot(TOKEN, { polling:true })

bot.on("message", (msg) => {
    const ChatId = msg.chat.id;
    const text = msg.text;

    bot.sendMessage(ChatId,"salom.")
})