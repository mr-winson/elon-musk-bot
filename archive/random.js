module.exports = {
    name: "random",
    aliases: ["number"],
    category: "fun",
    description: "Gives a random number in between your provided numbers.",
    usage: "[args input]",
    version: "1.0.0",
    args: [
        {
          key: 'min',
          prompt: 'What is the minimum number?',
          type: 'integer'
        },  
        {
          key: 'max',
          prompt: 'What is the maximum number?',
          type: 'integer'
        }
    ],
    run: (client, message, args, { min, max }) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return message.channel.send(Math.floor(Math.random() * (max - min + 1)) + min);
    }
}




