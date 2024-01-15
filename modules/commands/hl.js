module.exports.config = {
  name: "hl",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Kim Joseph DG Bien",
  description: "Video highlights",
  commandCategory: "video",
  usage: "/hl <gamename>",
  cooldowns: 5,
};

const axios = require("axios");
const fs = require("fs");
const path = require("path");

const categories = {
  farlight: "farlight+highlight",
  codm: "codm+highlight",
  mlbb: "mlbb+highlight",
  roblox: "roblox+edit",
  dota2: "dota+2+highlight",
  lol: "League+of+Legends+highlight",
  breakout: "arena+breakout+highlight",
  worldwar: "world+war+zone+edit"
};

module.exports.run = async function({ api, event, args }) {
  try {
    if (args.length === 0) {
      api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗌𝗉𝖾𝖼𝗂𝖿𝗒 𝖺 𝗀𝖺𝗆𝖾 𝗇𝖺𝗆𝖾 𝗈𝗋 𝗂𝖿 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝗌𝖾𝖾 𝗍𝗁𝖾 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝗁𝗂𝗀𝗁𝗅𝗂𝗀𝗁𝗍 𝗏𝗂𝖽𝖾𝗈, 𝗒𝗈𝗎 𝗆𝖺𝗒 𝗎𝗌𝖾 /𝗁𝗅 𝗅𝗂𝗌𝗍 𝗍𝗈 𝗌𝗁𝗈𝗐 𝗍𝗁𝖾 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝖼𝖺𝗍𝖾𝗀𝗈𝗋𝗂𝖾𝗌.", event.threadID);
      return;
    }

    const command = args[0].toLowerCase();

    if (command === "list") {
      const availableCategories = Object.keys(categories).join(", ");
      api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋 𝗁𝖾𝗋𝖾'𝗌 𝗌𝗈𝗆𝖾 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝖼𝖺𝗍𝖾𝗀𝗈𝗋𝗒 𝗂𝗇 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌:\n\n• 𝗙𝗮𝗿𝗹𝗶𝗴𝗵𝘁\n• 𝗖𝗼𝗱𝗺\n• 𝗠𝗹𝗯𝗯\n• 𝗥𝗼𝗯𝗹𝗼𝘅\n• 𝗗𝗼𝘁𝗮2\n• 𝗟𝗲𝗮𝗴𝘂𝗲 𝗢𝗳 𝗟𝗲𝗴𝗲𝗻𝗱𝘀\n• 𝗕𝗿𝗲𝗮𝗸𝗼𝘂𝘁\n• 𝗪𝗼𝗿𝗹𝗱𝘄𝗮𝗿`, event.threadID);
      return;
    }

    const categoryQuery = categories[command];

    if (!categoryQuery) {
      api.sendMessage(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗋𝖾𝗊𝗎𝖾𝗌𝗍 𝗒𝗈𝗎 𝗋𝖾𝗊𝗎𝖾𝗌𝗍𝖾𝖽 𝗂𝗌 𝗇𝗈𝗍 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾, 𝗎𝗌𝖾 /𝗁𝗅 𝗅𝗂𝗌𝗍 𝗍𝗈 𝗌𝗁𝗈𝗐 𝖺𝗅𝗅 𝖺𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝗀𝖺𝗆𝖾𝗇𝖺𝗆𝖾 𝗁𝗂𝗀𝗁𝗅𝗂𝗀𝗁𝗍𝗌.`, event.threadID);
      return;
    }

    api.sendMessage(`🔎 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖨𝗆 𝗌𝖾𝖺𝗋𝖼𝗁𝗂𝗇𝗀 𝗌𝗈𝗆𝖾 𝗋𝖺𝗇𝖽𝗈𝗆 ${command} 𝗏𝗂𝖽𝖾𝗈, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...`, event.threadID);

    const response = await axios.get(`https://hiroshi.hiroshiapi.repl.co/tiktok/searchvideo?keywords=${categoryQuery}`);
    const videoUrl = response.data.data.videos[0].play;

    const filePath = path.join(__dirname, `/cache/${command}_video.mp4`);
    const writer = fs.createWriteStream(filePath);

    const videoResponse = await axios({
      method: 'get',
      url: videoUrl,
      responseType: 'stream'
    });

    videoResponse.data.pipe(writer);

    writer.on('finish', () => {
      const message = `✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗁𝖾𝗋𝖾 𝗒𝗈𝗎𝗋 𝗋𝖺𝗇𝖽𝗈𝗆 ${command} 𝗁𝗂𝗀𝗁𝗅𝗂𝗀𝗁𝗍 𝗏𝗂𝖽𝖾𝗈:`;
      api.sendMessage(
        { body: message, attachment: fs.createReadStream(filePath) },
        event.threadID,
        () => fs.unlinkSync(filePath)
      );
    });
  } catch (error) {
    console.error('Error:', error);
  }
};
