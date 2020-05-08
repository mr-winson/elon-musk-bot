const Discord = require('discord.js');
const fetch = require('node-fetch');
const querystring = require('querystring');
const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

module.exports = {
    name: "urban",
    aliases: ["define", "dictionary"],
    category: "fun",
    description: "Gives you information on a word from the urban dictionary.",
    usage: "<word>",
    version: "1.0.0",
    run: async (client, message, args) => {   
        if (!message.channel.nsfw) return message.channel.send("This command might provide NSFW content. Please switch to an NSFW channel.")
 
        if (!args[0]) {
            return message.channel.send('You need to supply a search term!');
        }
        
        const query = querystring.stringify({ term: args.join(' ') });
        
        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
        
        if (!list.length) {
            return message.channel.send(`No results found for **${args.join(' ')}**.`);
        }
        
        const [answer] = list;
        
        const embed = new Discord.MessageEmbed()
            .setColor('#EFFF00')
            .setTitle(answer.word)
            .setURL(answer.permalink)
            .addFields(
                { name: 'Definition', value: trim(answer.definition, 1024) },
                { name: 'Example', value: trim(answer.example, 1024) },
                { name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` },
            );
        message.channel.send(embed);
    }
}