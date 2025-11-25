import TelegramBot from "node-telegram-bot-api"
import { config } from "dotenv";
import mongoose from "mongoose";

config();
const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling:true })

mongoose
.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("DB is connected successfully...");
})
.catch(()=> {
    console.log("Error: Db is not connected...");
})

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
                        [
                            {text: "📚 Kurslar", callback_data: "course"},
                            {text: "✍️ Ro‘yxatdan o‘tish", callback_data: "register"},
                        ],
                        [
                            {text: "ℹ️ Markaz haqida", callback_data: "location"},
                            {text: "❓ Yordam", callback_data: "help"},
                        ]
                    ],
                }
            }
        )
    }
})
bot.on("callback_query", function (query) {
    const data = query.data
    const chatId = query.message.chat.id

    if (data === "course") {
        bot.sendMessage(chatId, `🎓 Bizning o‘quv markazimizda quyidagi kurslar mavjud:

1️⃣ Ingliz tili  
2️⃣ Rus tili  
3️⃣ Matematika  
4️⃣ Dasturlash (Python, Web)  
5️⃣ Grafik dizayn  

👇 Quyidagi kurslardan birini tanlang va batafsil ma’lumot oling:`,

            {
                reply_markup: {
                    inline_keyboard: [
                        [{text: "English kursi", callback_data: "course_English"}],
                        [{text: "Russ tili kursi", callback_data: "course_English"}]   
                    ]
                }
            }
        )
    }

    // if (data == "course_english") {
    //     bot.sendMessage(chatId, 'Uztozning ismi: Maxdiy \nIELTS: C1 \nYears expirience: 3 years')
    // }else if (data == "course_Russian") {
    //     bot.sendMessage(chatId, `Uztozning ismi: Maxdiy\nYears expirience: 4 years`)
    // }else if (data == "course_German") {
    //     bot.sendMessage(chatId, `Uztozning ismi: Maxdiy\nYears expirience: 6 years`)
    // }

})