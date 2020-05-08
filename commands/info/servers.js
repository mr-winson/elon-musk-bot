module.exports = {
    name: "servers",
    aliases: ["server"],
    category: "info",
    description: "Tells you how many servers I am in!",
    version: "1.0.0",
    run: (client, message, args) => {
        message.channel.send(`I am in ${client.guilds.cache.size} servers!`)
    }
}