const { MessageEmbed } = require("discord.js");
const GoogleImages = require('google-images');

module.exports = {
    name: "google",
    aliases: ["ggle", "google-images"],
    category: "fun",
    version: "3",
    description: "Sends an epic image from unsplash",
    run: async (client, message, args) => {        
        if (!args[0])
            return message.channel.send("Please provide a search term for Google Images!").then(m => m.delete({ timeout: 5000}));
        
        const search_term = args[0]
        const numbers = ['1','2','3','4','5','6','7','8','9']
        var number = numbers[Math.round(Math.random() * (numbers.length - 1))];
        const search_me = new GoogleImages('001571421678409494495:d2lf81hxuiu', 'AIzaSyCQ_4kxiq2UahFpraDOnOJsq8LAYyjf690');

        search_me.search(search_term)
            .then(image => {
        const embed = new MessageEmbed()
            .setTitle(`Picture of a ${args[0]}`)
            .setColor(0xffa500)
            .setImage(image[number].url)

                
        message.channel.send({ embed });  

        setTimeout(20000)
        
        }); 
    }
}