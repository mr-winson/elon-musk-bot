module.exports = {
    name: "math",
    category: "math",
    description: "Gives you information on math numbers.",
    version: "1.0.0",
    run: (client, message, args) => {
        if (args[0] === "e") {message.channel.send(Math.E)}
        if (args[0] === "ln2") {message.channel.send(Math.LN2)}
        if (args[0] === "ln10") {message.channel.send(Math.LN10)}
        if (args[0] === "log2e") {message.channel.send(Math.LOG2E)}
        if (args[0] === "log10e") {message.channel.send(Math.LOG10E)}
        if (args[0] === "pi") {message.channel.send(Math.PI)}
    }
}