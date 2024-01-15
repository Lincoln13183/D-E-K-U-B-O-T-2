module.exports.config = {
	name: "restart",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "manhIT",
	description: "Restart Bot",
	commandCategory: "system",
	usages: "",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
	const { threadID, messageID } = event;
	return api.sendMessage(`⏳ | ${global.config.BOTNAME} 𝗂𝗌 𝗇𝗈𝗐 𝗋𝖾𝗌𝗍𝖺𝗋𝗍𝗂𝗇𝗀 𝗆𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...`, threadID, () => process.exit(1));
}