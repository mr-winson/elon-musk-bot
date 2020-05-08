module.exports = {
    name: "Command name",
    aliases: ["array", "of", "aliases"],
    category: "Category name",
    description: "Command description",
    usage: "[args input]",
    version: "1.0.0",
    run: async (client, message, args) => {
        const serverQueue = message.client.queue.get(message.guild.id);

        if (!message.member.voice.channel)
          return message.reply("You need to join a voice channel first!").catch(console.error);
        if (!serverQueue)
          return message.channel.send("There is nothing playing that I could skip for you.").catch(console.error);
    
        serverQueue.connection.dispatcher.end();
        serverQueue.textChannel.send(`${message.author} ⏭ skipped the song`).catch(console.error);
    }
}
