const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "insult",
    aliases: ["rip"],
    category: "fun",
    description: "Imma insult you!",
    version: "1.0.0",
    run: (client, message, args) => {
        // thanks to https://evilinsult.com :)
        fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json')
        .then(res => res.json())
        .then(json => {
        const embed = new MessageEmbed()
            .setColor('#E41032')
            .setTitle('Evil Insult')
            .setDescription(json.insult)
            .setURL('https://evilinsult.com');
        return message.channel.send(embed);
        })
        .catch(err => {
        message.say('Failed to deliver insult :sob:');
        return console.error(err);
        });
    }
}