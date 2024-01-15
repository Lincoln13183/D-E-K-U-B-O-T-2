const chalk = require('chalk');
module.exports.config = {
    name: "join",
    version: "1.0.1",
    hasPermssion: 2,
    credits: "Henry",
    description: "Join the Bot boxes are in",
    commandCategory: "System",
    usages: "",
    cooldowns: 5
};
 module.exports.onLoad = () => {
  console.log(chalk.bold.hex("#00c300").bold("============ SUCCESFULLY LOADED THE JOIN COMMAND ============"));
  }
module.exports.handleReply = async function({ api, event, handleReply, Threads }) {
  var { threadID, messageID, senderID, body } = event;
  var { ID } = handleReply;
  console.log(ID)
  if (!body || !parseInt(body)) return api.sendMessage('ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗒𝗈𝗎𝗋 𝗌𝖾𝗅𝖾𝖼𝗍𝗂𝗈𝗇 𝗆𝗎𝗌𝗍 𝖻𝖾 𝖺 𝗇𝗎𝗆𝖻𝖾𝗋.', threadID, messageID);
  if ((parseInt(body) - 1) > ID.length) return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾 𝗇𝗎𝗆𝖻𝖾𝗋 𝗒𝗈𝗎 𝗉𝗂𝖼𝗄 𝗂𝗌 𝗇𝗈𝗍 𝗈𝗇 𝗍𝗁𝖾 𝗅𝗂𝗌𝗍.", threadID, messageID);
  try {
    var threadInfo = await Threads.getInfo(ID[body - 1]);
    var { participantIDs, approvalMode, adminIDs } = threadInfo;
    if (participantIDs.includes(senderID)) return api.sendMessage(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗒𝗈𝗎 𝖺𝗋𝖾 𝖺𝗅𝗋𝖾𝖺𝖽𝗒 𝗂𝗇 𝗍𝗁𝗂𝗌 𝗀𝗋𝗈𝗎𝗉.`, threadID, messageID);
    api.addUserToGroup(senderID, ID[body - 1]);
    if (approvalMode == true && !adminIDs.some(item => item.id) == api.getCurrentUserID()) return api.sendMessage("✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖨 𝖺𝖽𝖽𝖾𝖽 𝗒𝗈𝗎 𝗍𝗈 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉'𝗌 𝖺𝗉𝗉𝗋𝗈𝗏𝖺𝗅 𝗅𝗂𝗌𝗍... 𝖢𝗎𝗌𝗍𝗈𝗆 𝖸𝗈𝗎𝗋𝗌𝖾𝗅𝖿.", threadID, messageID);
    else return api.sendMessage(`𝖬𝖺𝗌𝗍𝖾𝗋, 𝖨 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖺𝖽𝖽𝖾𝖽 𝗒𝗈𝗎 𝗍𝗈 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝗈𝖿 ${threadInfo.threadName}. 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖨𝖿 𝗒𝗈𝗎 𝖽𝗈𝗇'𝗍 𝗌𝖾𝖾 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝖻𝗈𝗑 𝗒𝖾𝗍. 𝖸𝗈𝗎 𝗆𝖺𝗒 𝖼𝗁𝖾𝖼𝗄 𝗍𝗁𝖾 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗂𝗇 𝗍𝗁𝖾 𝗐𝖺𝗂𝗍𝗂𝗇𝗀 𝗈𝗋 𝗌𝗉𝖺𝗆 𝗆𝖾𝗌𝗌𝖺𝗀𝖾.`, threadID, messageID);
  } catch (error) {
    return api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖨 𝖼𝖺𝗇'𝗍 𝖺𝖽𝖽 𝗒𝗈𝗎 𝗍𝗈 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉. 𝖢𝖺𝗎𝗌𝖾 𝖨𝗍 𝗌𝖾𝖾𝗆𝗌 𝗅𝗂𝗄𝖾 𝖣𝖾𝗄𝗎𝖡𝗈𝗍 𝗂𝗌 𝗇𝗈𝗍 𝗈𝗇 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉:\n\n𝗖𝗮𝘂𝘀𝗲: ${error}`, threadID, messageID);
  }
}

module.exports.run = async function({ api, event, Threads }) {
  var { threadID, messageID, senderID } = event;
  var msg = `✿︎━━━━━━━━━━━━━━━━━✿︎\n✱:｡✧* 𝗗𝗲𝗸𝘂𝗕𝗼𝘁 𝗕𝗼𝘅𝗹𝗶𝘀𝘁 *✧｡:✱\n✿︎━━━━━━━━━━━━━━━━━✿︎\n`, number = 0, ID = [];
  var allThreads = await Threads.getAll();
  for (var i of allThreads) {
    number++;
    msg += `${number}. ${i.threadInfo.threadName}\n`;
    ID.push(i.threadID)
  }
  msg += `\n✿︎━━━━━━━━━━━━━━━━━✿︎\nℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗒𝗈𝗎 𝗆𝖺𝗒 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝖼𝗈𝗋𝗋𝖾𝗌𝗉𝗈𝗇𝖽𝗂𝗇𝗀 𝗇𝗎𝗆𝖻𝖾𝗋 𝗍𝗈 𝗍𝗁𝖾 𝗀𝗋𝗈𝗎𝗉 𝗒𝗈𝗎 𝗐𝖺𝗇𝗍 𝗍𝗈 𝗃𝗈𝗂𝗇.\n✿︎━━━━━━━━━━━━━━━━━✿︎`
  return api.sendMessage(msg, threadID, (error, info) => {
    global.client.handleReply.push({
      name: this.config.name,
      author: senderID,
     messageID: info.messageID,
      ID: ID      
    })
  }, messageID)
}
