import TelegramBot from "node-telegram-bot-api";
import { Redis } from "@upstash/redis";

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_ID = process.env.TELEGRAM_ID;

const messages = [
    "💌 Апдейт любви v1.0.1 установлен: улучшена стабильность счастья, оптимизировано количество поцелуев, добавлен модуль «ты — моё всё»",

    "🌹 Каждый день с тобой — как новый лист в книге нашей любви",

    "🍕 Если бы ты была пиццей, то с моими любимыми ингредиентами… и я бы никогда тебя не делил!",

    "✨ Когда ты рядом, всё вокруг становится правильным и тёплым",

    "🐥 Ты — моё утро, моё солнце и мой повод вставать с улыбкой",

    "🍫 Обожаю тебя так же сильно, как шоколад… а это много!",

    "🌌 Если бы можно было загадать одно желание, я бы загадал тебя… и ещё вечность вместе",

    "🐾 Даже если я буду в самом мрачном настроении, твой смех всегда находит дорогу ко мне",

    "🦊 Ты хитро умеешь украсть моё сердце, и я рад, что ты его не возвращаешь",

    "🕊 С тобой я научился по-настоящему быть счастливым без повода",

    "🎠 Ты превращаешь обычный день в ярмарку радости и нежности",

    "💞 Люблю тебя так, что даже самый большой словарь мира не справится с описанием (список милых фразочек скоро закончится, так что напомни своему мучачо его обновить ;)",
]


const bot = new TelegramBot(TELEGRAM_TOKEN);
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export default async function handler(req, res) {
    let index = await redis.get("messageIndex") || 1;
    index = Number(index);
    
    const message = messages[index];
    try {
        await bot.sendMessage(TELEGRAM_ID, message);
        await redis.set("messageIndex", (index+1) & messages.length);
        res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
        res.status(500).json({ error: `Error sending message: ${error}` })
    }
}