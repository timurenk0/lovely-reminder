import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";

const TELEGRAM_TOKEN = "7982658581:AAE4kWWrR9aVWYWGRaHPhEPUSbtr6sPLMfY";
const TELEGRAM_ID = "1931386052"

const messages = [
    "Привет, любимая! Сегодня снова 12-е — ещё один волшебный месяц рядом с тобой. Каждый день я всё больше понимаю, как сильно я тебя люблю. Спасибо, что ты у меня есть 💕",
    "Хэй! Сегодня день нашей маленькой годовщины ❤️ Ты — моя радость, моя нежность и мой личный антистресс. Обожаю тебя до луны и обратно! 🌙✨",
    "Детка, поздравляю нас с очередным месяцем любви! Ты — как Wi-Fi: когда тебя нет рядом, всё работает хуже 😅 Спасибо за тепло, заботу и смех. Целую! 😘",
    "Уже 12-е? Опять?! Как же быстро летит время рядом с тобой… А знаешь что? Я бы выбрал тебя снова и снова. Счастлив, что мы вместе ❤️",
    "Любимая, ещё один месяц с тобой — как бонус в жизни. Ты не просто моя половинка, ты — весь мой мир. И, да, ты всё ещё самая красивая! 💋"
]


const bot = new TelegramBot(TELEGRAM_TOKEN);

export default async function handler(req, res) {
    const message = messages[Math.floor(Math.random() * messages.length)];
    try {
        await bot.sendMessage(TELEGRAM_ID, message);
        res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
        res.status(500).json({ error: `Error sending message: ${error}` })
    }
}