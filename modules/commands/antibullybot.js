module.exports.config = {
  name: "antibullybot",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Réynél",
  description: "otherbot",
  commandCategory: "system",
  cooldowns: 0
};
module.exports.handleEvent = async ({
  event: o,
  api: t,
  Users: n
}) => {
  var {
    threadID: e,
    messageID: a,
    body: b,
    senderID: s,
    reason: d
  } = o;

     const i = require("moment-timezone").tz("Asia/Manila").format ("h:mm:ss A");
  const moment = require("moment-timezone");
  const Date = moment.tz("Asia/Manila").format("DD/MM/YYYY");
  if (s == t.getCurrentUserID()) return;
  let c = await n.getNameUser(o.senderID);
  var h = {
    body: `🚫 | 𝖬𝖺𝗌𝗍𝖾𝗋 ${c}, 𝗒𝗈𝗎'𝗋𝖾 𝖽𝖾𝗍𝖾𝖼𝗍𝖾𝖽 𝗍𝗁𝖺𝗍 𝗌𝗐𝖾𝖺𝗋𝗂𝗇𝗀 𝗆𝖾 𝖺𝗇𝖽 𝗇𝗈𝗐 𝗒𝗈𝗎 𝗐𝗂𝗅𝗅 𝖻𝖾 𝖻𝖺𝗇𝗇𝖾𝖽 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝗌𝗒𝗌𝗍𝖾𝗆.`
  };
    //Add curse words without capital letters
  ["Stupid For Swearing Bot"].forEach((a => { 

        const s = o.senderID;
    let haha = o.body;
  if (haha.includes("bobong deku") || haha.includes("bobo deku") || haha.includes("tangang deku") || haha.includes("inutil na deku") || haha.includes("tanga tangang deku") || haha.includes("foolish deku") || haha.includes("stupid deku") || haha.includes("dumb deku") || haha.includes("tanga yung deku") || haha.includes("gagong deku") || haha.includes("Bobong deku") || haha.includes("Bobo deku") || haha.includes("botbot deku") || haha.includes("bobo nung deku") || haha.includes("walang alam deku") || haha.includes("tanga mo deku") ||  haha.includes("kick si deku") || haha.includes("botlog deku")) {
      modules = "[ BOT BAN ]", console.log(c, modules, a);
      const o = n.getData(s).data || {};
      n.setData(s, {
        data: o			
      }), o.banned = 1, o.reason = a || null, o.dateAdded = i, global.data.userBanned.set(s, {
        reason: o.reason,
        dateAdded: o.dateAdded
      }), t.sendMessage(h, e, (() => {
        const o = global.config.ADMINBOT;
        var n = o;
        for (var n of o) t.sendMessage(`•——[𝗦𝗪𝗘𝗔𝗥𝗜𝗡𝗚 𝗕𝗢𝗧]——•\n❯ 𝗗𝗮𝘁𝗲 𝗻𝗼𝘄: ${Date}\n❯ 𝗧𝗶𝗺𝗲: ${i} (𝗁:𝗆:𝗌) \n❯ 𝗡𝗮𝗺𝗲: ${c}\n❯ 𝗨𝗶𝗱: ${s}\n❯ 𝗙𝗯 𝗹𝗶𝗻𝗸: https://www.facebook.com/${s}\n————————\n𝖲𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖻𝖺𝗇𝗇𝖾𝖽 𝗍𝗈 𝗍𝗁𝗂𝗌 𝖻𝗈𝗍.`, n)
      }))
    } 
  })) 
}, module.exports.run = async ({
  event: o,
  api: t
}) => t.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗂𝗌 𝗎𝗌𝖾𝖽 𝗍𝗈 𝖽𝖾𝗍𝖾𝖼𝗍 𝗐𝗁𝖾𝗇 𝗌𝗐𝖾𝖺𝗋𝗂𝗇𝗀 𝗆𝖾.", o.threadID);