const newsAPI = process.env.NEWSAPI
const {MessageEmbed} = require("discord.js")
const fetch = require('node-fetch');

module.exports = {
    name: "news",
    aliases: ["world-news"],
    category: "info",
    description: "Get news based off your search query.",
    usage: "<search query>",
    version: "1.0.0",
    run: async (client, message, args) => {
        try {
            
            var noQuery = new MessageEmbed()
                .setTitle('No Search Query')
                .setDescription("Please provide a search query for news from that topic. Ex: 'e/news Apple'")

            var queryS = args.join(" ");

            if (!queryS) {
                return message.channel.send(noQuery)
            }

            var query = args[0]

            url = `http://newsapi.org/v2/everything?q=${query}&from=2020-04-18&to=2020-04-18&sortBy=popularity&apiKey=${newsAPI}`

            const response = await fetch(
              url
            );
            const json = await response.json();
            const articleArr = json.articles;
            let processArticle = article => {
              const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(article.title)
                .setURL(article.url)
                .setAuthor(article.author)
                .setDescription('Powered by http://NewsAPI.org\n' + article.description)
                .setThumbnail(article.urlToImage)
                .setTimestamp(article.publishedAt)
                .setFooter('powered by NewsAPI.org');
              message.channel.send(embed);
              message.channel.send(url)
            };
            async function processArray(array) {
              for (const article of array) {
                const msg = await processArticle(article);
                message.channel.send(msg);
              }
            }
            await processArray(articleArr);
          } catch (e) {
            message.channel.send('Something failed along the way');
            return console.error(e);
          }
    }
}