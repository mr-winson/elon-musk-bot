const fetch = require("node-fetch");

module.exports = {
    name: "gif",
    category: "fun",
    description: "Gives you a gif based off what you tell me!",
    usage: "<gif search>",
    version: "1.0.0",
    run: async (client, message, args) => {

        if(!args[0]) {
            return message.channel.send(`Please provide a query to search for, EX: '${process.env.PREFIX}gif discord'`)
        }

        var gif = message.content.substr(`${process.env.PREFIX}gif `.length);

        var number = Math.floor((Math.random() * 12 - 1) + 1);

        fetch(`https://api.tenor.com/v1/random?key=${process.env.TENORAPI}&q=${gif}&limit=12`)
            .then(res => res.json())
            .then(json => message.channel.send(json.results[number].url))
            .catch(e => {
            message.channel.send('Failed to find a gif that matched your query');
            // console.error(e);
            return;
        });
    }
}



