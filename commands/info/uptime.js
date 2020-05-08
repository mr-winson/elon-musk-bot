module.exports = {
    name: "uptime",
    aliases: ["time", "up"],
    category: "info",
    description: "Get the current uptime of the bot.",
    version: "1.0.1",
    run: (client, message, args) => {
        var seconds = parseInt((client.uptime / 1000) % 60),
        minutes = parseInt((client.uptime / (1000 * 60)) % 60),
        hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
        // prettier-ignore
        hours = (hours < 10) ? ('0' + hours) : hours;
        // prettier-ignore
        minutes = (minutes < 10) ? ('0' + minutes) : minutes;
        // prettier-ignore
        seconds = (seconds < 10) ? ('0' + seconds) : seconds;
        return message.channel.send(
        `:chart_with_upwards_trend: I've been running for **${hours}** hours, **${minutes}** minutes and **${seconds}** seconds!`
        );
    }
}