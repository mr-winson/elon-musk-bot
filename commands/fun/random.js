module.exports = {
    name: "random",
    aliases: ["number"],
    category: "Category name",
    description: "Get a random number between your provided number.",
    usage: "<number one | number two>",
    version: "1.0.0",
    run: (client, message, args) => {
        min = Math.ceil(args[0]);
        max = Math.floor(args[1]);
        return message.channel.send(`**${Math.floor(Math.random() * (max - min + 1)) + min}**`);
    }
}