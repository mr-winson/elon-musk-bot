const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');

module.exports = {
    name: "wikipedia",
    category: "info",
    description: "Get info from a wikipedia article.",
    usage: "<search>",
    version: "1.0.0",
    run: async (client, message, args) => {
        try {
            const { body } = await request
                .get('https://en.wikipedia.org/w/api.php')
                .search({
                    action: 'query',
                    prop: 'extracts|pageimages',
                    format: 'json',
                    titles: query,
                    exintro: '',
                    explaintext: '',
                    pithumbsize: 150,
                    redirects: '',
                    formatversion: 2
                });
            const data = body.search.pages[0];
            if (data.missing) return message.channel.send('Could not find any results.');
            const embed = new MessageEmbed()
                .setColor(0xE7E7E7)
                .setTitle(data.title)
                .setAuthor('Wikipedia', 'https://i.imgur.com/Z7NJBK2.png', 'https://www.wikipedia.org/')
                .setThumbnail(data.thumbnail ? data.thumbnail.source : null)
                .setURL(`https://en.wikipedia.org/wiki/${encodeURIComponent(args[0]).replace(/\)/g, '%29')}`)
                .setDescription(shorten(data.extract.replace(/\n/g, '\n\n')));
            return message.embed(embed);
        } catch (err) {
            return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
        }
    }
}