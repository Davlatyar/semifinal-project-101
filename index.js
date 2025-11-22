import TelegramBot from "node-telegram-bot-api"
import { config } from "dotenv";

config();
const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling:true })


bot.on("message", (msg) => {
  
    const ChatId = msg.chat.id;
    const text = msg.text;
    console.log(msg);
    
    if (text == "/start") {
        bot.sendMessage(ChatId, 
            `Salom ${msg.from.first_name} 100x o‘quv markazining rasmiy botiga xush kelibsiz!

        Bu bot orqali siz:
        • Kurslarimiz haqida batafsil ma’lumot olasiz  
        • Kurslarga onlayn ro‘yxatdan o‘tishingiz mumkin  
        • Jadval va to‘lovlar haqida ma’lumot olasiz  

Quyidagi menyudan kerakli bo‘limni tanlang 👇
!
            `,

            {
                reply_markup: {
                    inline_keyboard: [
                [{ text: "Ingliz tili", callback_data: "course_english" }],
                [{ text: "Russ tili", callback_data: "course_Russian" }],
                [{ text: "German tili", callback_data: "course_German" }],
                    ]
                }
            }
        )
    }
})
bot.on("callback_query", function (query) {
    const data = query.data
    const chatId = query.message.chat.id

    if (data == "course_english") {
        bot.sendMessage(chatId, 'Uztozning ismi: Maxdiy \nIELTS: C1 \nYears expirience: 3 years')
    }else if (data == "course_Russian") {
        bot.sendMessage(chatId, ``)
    }

})