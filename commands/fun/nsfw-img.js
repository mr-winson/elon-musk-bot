/*const { MessageEmbed } = require("discord.js");
const GoogleImages = require('google-images');

module.exports = {
    name: "nsfwimg",
    aliases: ["nsfw", "nsfw-img"],
    category: "fun",
    version: "3",
    description: "Sends an epic image from unsplash",
    run: async (client, message, args) => {
        if (!message.channel.nsfw) return message.channel.send(":underage: NSFW Command. Please switch to NSFW channel in order to use this command.")
        
        if (!args[0])
            return message.channel.send("Please provide weather you want real (e/nsfw real) or hentai (e/nsfw hentai)").then(m => m.delete({ timeout: 5000}));
        
        if (args[0] === 'real') {
            const search_terms = [
                "NSFW_GIF","nsfw_gifs","porninfifteenseconds","60FPSPorn","porn_gifs",
                "nsfw_Best_Porn_Gif","big dick","HotStuffNSFW","anal porn","porn",
                "hot porn","hot porn images"
            ]
            
            const numbers = ['1','2','3','4','5','6','7','8','9']
            var search_term = search_terms[Math.round(Math.random() * (search_terms.length - 1))];

            var number = numbers[Math.round(Math.random() * (search_terms.length - 1))];

            const search_me = new GoogleImages('001571421678409494495:d2lf81hxuiu', 'AIzaSyCQ_4kxiq2UahFpraDOnOJsq8LAYyjf690');

            search_me.search(search_term)
            .then(image => {
                console.log(number)
                const embed = new MessageEmbed()
                .setTitle('Cooldown ends in 20 seconds')
                .setColor(0xffa500)
                .setImage(image[number].url)

                
            message.channel.send({ embed });  

            setTimeout(20000)
        
            }); 
        }
    }
}*/