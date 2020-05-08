var unirest = require("unirest");
const fetch = require('node-fetch');
const querystring = require('querystring');
const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

module.exports = {
    name: "siri",
    category: "fun",
    description: "Get an annswer to any question using the Siri API!",
    usage: "<question>",
    version: "1.0.0",
    run: async (client, message, args) => {
        if (!args[0]) {
            return message.channel.send('You need to supply a search term!');
        }
        
        const query = querystring.stringify({ term: args.join(' ') });
        
        const { list } = await fetch(`https://ask.pannous.com/api?input=`).then(response => response.json());
        
        if (!list.length) {
            return message.channel.send(`No results found for **${args.join(' ')}**.`);
        }
        
        const [output] = list;
        
        req.end(function (res) {
            if (res.error) {        
            message.channel.send(output.actions.say[0]);}
        });
    }
}