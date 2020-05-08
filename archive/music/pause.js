module.exports = {
    name: "Command name",
    aliases: ["array", "of", "aliases"],
    category: "Category name",
    description: "Command description",
    usage: "[args input]",
    version: "1.0.0",
    run: (client, message, args) => {
        if (!message.member.voice.channel)
        return message.reply("You need to join a voice channel first!").catch(console.error);
  
      const serverQueue = message.client.queue.get(message.guild.id);
      if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause(true);
        return serverQueue.textChannel.send(`${message.author} ⏸ paused the music.`).catch(console.error);
      }
      return message.reply("There is nothing playing.").catch(console.error);
    }
}
