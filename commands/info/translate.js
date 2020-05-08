const yandexAPI = process.env.YANDEXTRANSLATEAPI
const { MessageEmbed } = require('discord.js');
const ISO6391 = require('iso-639-1');
const fetch = require('node-fetch');

module.exports = {
    name: "translate",
    category: "info",
    description: "Translate any text to any language. (Extremely Early BETA, mostly broken but some working feature.)",
    usage: "[args input]",
    version: "1.0.0",
    run: async (client, message, args) => {
        await message.channel.send(
          `Please enter the text you want to translate to ${args[0]}`
        );
        
        try {
          const filter = msg => msg.content.length > 0 && msg.content.length < 3000;
          var response = await message.channel.awaitMessages(filter, {
            max: 1,
            maxProcessed: 1,
            time: 90000,
            errors: ['time']
          });
          var text = response.first().content;
        } catch (e) {
          return message.channel.send('You did not enter any text!');
        }

        try {
          var res = await fetch(
            // Powered by Yandex.Translate http://translate.yandex.com/
            `https://translate.yandex.net/api/v1.5/tr/translate?key=${yandexAPI}&text=${encodeURI(text)}&lang=${args[0]}`
          );
          const json = await res.json();
          message.channel.send(embedTranslation(json.text));
        } catch (e) {
          console.error(e);
          return message.channel.send(
            'Something went wrong when trying to translate the text'
          );
        }
        
        function embedTranslation(text) {
          return new MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Yandex Translate')
            .setURL('http://translate.yandex.com/')
            .setDescription(text)
            .setFooter('Powered by Yandex.Translate');
        }
    }
}