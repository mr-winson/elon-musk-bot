module.exports = {
    name: "Command name",
    aliases: ["array", "of", "aliases"],
    category: "Category name",
    description: "Command description",
    usage: "[args input]",
    version: "1.0.0",
    run: (client, message, args) => {
        let commands = message.client.commands.array();
    
        let helpEmbed = new MessageEmbed()
        .setTitle("Help")
        .setDescription("List of all commands")
        .setColor("#F8AA2A");
    
        commands.forEach(cmd => {
          helpEmbed.addField(
            `${message.client.prefix}${cmd.name}`,
            `${cmd.description}`
          );
        });
    
        helpEmbed.setTimestamp();
    
        return message.channel.send(helpEmbed);
    }
}