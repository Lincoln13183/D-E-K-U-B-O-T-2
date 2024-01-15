const fs = require('fs');
const axios = require('axios');
const moment = require('moment-timezone');
const { createReadStream, unlinkSync } = global.nodemodule['fs-extra'];
const { resolve } = global.nodemodule['path'];

module.exports.config = {
  name: 'announce',
  version: '1.0.0',
  hasPermission: 2,
  credits: 'Arjhil',
  description: 'Announce a message with optional audio',
  commandCategory: 'Admin',
  usage: '[Text]',
  cooldowns: 5,
};

module.exports.languages = {
  en: {
    sendSuccess: '✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 %1 𝗀𝗋𝗈𝗎𝗉 𝗍𝗁𝗋𝖾𝖺𝖽 𝗐𝖺𝗌 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗌𝖾𝗇𝗍 𝗍𝗁𝖾 𝖺𝗇𝗇𝗈𝗎𝗇𝖼𝖾𝗆𝖾𝗇𝗍!',
    sendFail: 'ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 %1 𝗀𝗋𝗈𝗎𝗉 𝗍𝗁𝗋𝖾𝖺𝖽 𝗐𝖺𝗌 𝗎𝗇𝖺𝖻𝗅𝖾 𝗌𝖾𝗇𝗍 𝗍𝗁𝖾 𝖺𝗇𝗇𝗈𝗎𝗇𝖼𝖾𝗆𝖾𝗇𝗍',
  },
};

module.exports.run = async ({ api, event, args, getText, Users }) => {
  const name = await Users.getNameUser(event.senderID);
  const currentTime = moment.tz('Asia/Manila').format('DD/MM/YYYY || HH:mm:ss');

  let content = args.join(' ');
  let languageToSay = global.config.language;

  if (content.startsWith('[en] ')) {
    languageToSay = 'en';
    content = content.substring('[en] '.length);
  }

  const header = '╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n𝗔𝗡𝗡𝗢𝗨𝗡𝗖𝗘𝗠𝗘𝗡𝗧\n\n'; // Bold header text

  try {
    const allThread = global.data.allThreadID || [];
    const cantSend = [];

    for (const idThread of allThread) {
      if (isNaN(parseInt(idThread)) || idThread == event.threadID) continue;

      const audioPath = await generateAudio(content, languageToSay, idThread, event.senderID);

      const messageOptions = {
        body: `${header}\n《 𝗠𝗘𝗦𝗦𝗔𝗚𝗘 》${content}\n\n《 𝗙𝗥𝗢𝗠 𝗔𝗗𝗠𝗜𝗡 》 ${name.toUpperCase()}\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯`, // Uppercase name
        attachment: createReadStream(audioPath),
      };

      api.sendMessage(messageOptions, idThread, (error) => {
        if (error) cantSend.push(idThread);
      });

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    return api.sendMessage(
      getText('sendSuccess', allThread.length - 1), // Exclude the current thread
      event.threadID,
      () => (cantSend.length > 0)
        ? api.sendMessage(getText('sendFail', cantSend.length), event.threadID, event.messageID)
        : '',
      event.messageID
    );
  } catch (error) {
    console.error('Error sending announcement:', error);
    return api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};

// Function to generate audio and return the path
async function generateAudio(text, language, threadID, senderID) {
  const msg = text.trim();
  const path = resolve(__dirname, 'cache', `${threadID}_${senderID}.mp3`);
  await global.utils.downloadFile(
    `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
      msg
    )}&tl=${language}&client=tw-ob`,
    path
  );
  return path;
}