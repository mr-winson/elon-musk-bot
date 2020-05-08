const {MessageEmbed} = require("discord.js")
const { stripIndents } = require("common-tags");
const fetch = require("node-fetch");

module.exports = {
    name: "movie",
    category: "info",
    description: "Get information on a specified movie!",
    usage: "<movie name>",
    version: "1.0.0",
    run: async (client, message, args) => {
        var movie = message.content.substr(`${process.env.PREFIX}movie `.length);

        var url=`https://omdbapi.com/?apikey=${process.env.OMDBAPI}&t=${movie}`;

        var url2=`https://omdbapi.com/?t=${movie}`;

        var url_good = (url.replace(/ /g, '%20'));

        var url_good2 = (url2.replace(/ /g, '%20'));

        const { Title,Year,Released,Genre,Rated,Runtime,Director,Writer,Plot,Poster,Awards,Metascore } = await fetch(url_good).then(response => response.json());

        var fMF = new MessageEmbed()
            .setTitle(`Finding information for... **_${Title}_**`)
            .setDescription(`Your movie URL is ${url_good2}, remember that link wont work unless you pass an API key for http://omdbapi.com`)

        let msg = await message.channel.send(fMF);

        await msg.delete({timeout: 1000})

        if(Poster === "N/A") {
            var movieEmbed = new MessageEmbed()
                .setTitle(Title)
                .addField("Movie information", stripIndents`**> Title:** ${Title}\n
                **> Year:** ${Year}\n
                **> Score (out of 100):** ${Metascore}\n
                **> Released:** ${Released}\n
                **> Rated:** ${Rated}\n
                **> Runtime:** ${Runtime}\n
                **> Genre:** ${Genre}\n
                **> Director:** ${Director}\n
                **> Writer:** ${Writer}\n
                **> Awards:** ${Awards}\n
                **> Plot:** ${Plot}
                `);

            return message.channel.send(movieEmbed)
        } else {
            var movieEmbed = new MessageEmbed()
                .setTitle(Title)
                .setThumbnail(Poster)
                .addField("Movie information", stripIndents`**> Title:** ${Title}\n
                **> Year:** ${Year}\n
                **> Score (out of 100):** ${Metascore}\n
                **> Released:** ${Released}\n
                **> Rated:** ${Rated}\n
                **> Runtime:** ${Runtime}\n
                **> Genre:** ${Genre}\n
                **> Director:** ${Director}\n
                **> Writer:** ${Writer}\n
                **> Awards:** ${Awards}\n
                **> Plot:** ${Plot}
                `);

            message.channel.send(movieEmbed)
        }
    }
}