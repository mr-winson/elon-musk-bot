const {MessageEmbed} = require("discord.js")
const fetch = require("node-fetch");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "stocks",
    aliases: ["dow", "nyse", "stock"],
    category: "Category name",
    description: "Command description",
    usage: "[args input]",
    version: "1.0.0",
    run: (client, message, args) => {
        let foundInText = false;

        if (!args[0]) {
            return message.channel.send(`Please provide the stock market symbol, here is a list of all symbols in the US stock market:\nhttps://swingtradebot.com/equities\n\nEX: **_'${process.env.PREFIX}stocks SNAP'_**.`)
        }

        if (message.content.toLowerCase().includes(',')) {foundInText = true;}

        if (foundInText === true) {
            return message.channel.send(`Please only use one stock symbol and don't include any other symbols. The WTD API is very strict.`)
        }

        url = `https://api.worldtradingdata.com/api/v1/stock?symbol=${args[0]}&api_token=${process.env.WTD}`

        fetch(url)
            .then(res => res.json())
            .then(json => message.channel.send(
                
                new MessageEmbed()
                    .setTitle(`Information for ${json.data[0].symbol}`)
                    .addField("Stock information\n", stripIndents`
                    **> Symbol: **${json.data[0].symbol}\n
                    **> Name: **${json.data[0].name}\n
                    **> Currency: **${json.data[0].currency}\n
                    **> Price: **${json.data[0].price}\n
                    **> Opening Price: **${json.data[0].price_open}\n
                    **> Day High: **${json.data[0].day_high}\n
                    **> Day Low: **${json.data[0].day_low}\n
                    **> Day Change: **${json.data[0].day_change}\n
                    **> Change Percentage: **${json.data[0].change_pct}\n
                    **> Yesterdays Close: **${json.data[0].close_yesterday}\n
                    **> Market Cap: **${json.data[0].market_cap}
                    **> Current Volume: **${json.data[0].volume}\n
                    **> Average Volume: **${json.data[0].volume_avg}\n
                    **> Shares: **${json.data[0].shares}\n
                    **> Stock Exchange Name: **${json.data[0].stock_exchange_long}\n
                    **> Stock Exchange Symbol: **${json.data[0].stock_exchange_short}
                    **> Timezone: **${json.data[0].timezone}\n
                    **> Timezone Name: **${json.data[0].timezone_name}\n
                    **> GMT Offset: **${json.data[0].gmt_offset}\n
                    **> Last Trade: **${json.data[0].last_trade_time}v
                    **> PE: **${json.data[0].pe}\n
                    **> EPS: **${json.data[0].eps}
                    `)
                    .setColor("RANDOM")
                    .setFooter('If some of the values are null,\nit is because the market is closed.')
                
                ))
            .catch(e => {
            message.channel.send('Failed to fetch stock data');
            console.log(e)
            // console.error(e);
            return;
        });
    }
}