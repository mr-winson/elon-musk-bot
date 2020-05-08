const { MessageEmbed } = require("discord.js");
const solenolyrics= require("solenolyrics"); 


module.exports = {
    name: "lyrics",
    category: "Fun",
    description: "Spits out the lyrics to your requested song.",
    usage: "<song name>",
    version: "3.1.0",
    run: async (client, message, args) => {
        var songName = message.content.substr(`${process.env.PREFIX}lyrics `.length);
        var author = await solenolyrics.requestAuthorFor(songName);
        var lyrics = await solenolyrics.requestLyricsFor(songName); 
        var songIcon = await solenolyrics.requestIconFor(songName); 

        var loadingEmbed = new MessageEmbed()
            .setTitle(`Loading lyrics for _${songName}_ by _${author}_:`)
            .setColor("RANDOM")
            .setFooter("if lyrics don't show up then please contact \na moderator and have them open an issue here: \nhttp://github.com/mr-winson/elon-talk/issues \nsaying 'music error 591'.")

        message.channel.send(loadingEmbed)

        var embed = new MessageEmbed()
            .setTitle(`Lyrics for _${songName}_ by _${author}_:`)
            .setColor("RANDOM")
            .setDescription(lyrics)
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setThumbnail(songIcon)

        message.channel.send(embed)
    }
}