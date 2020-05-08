// Run dotenv
require('dotenv').config();
//
const Discord = require('discord.js');
const client = new Discord.Client();
const pr = 'e/' // Prefix
const vr = 'v0.2.3.9' // Version
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Turn the bot on
client.on('ready', () => {
  console.log(`This bot, ${client.user.tag}, is online! ` + vr);
});
//
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//
// Beginning of the text commands/replies functions
//
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//
// Ping to reply pong. Usually used to check if the bot is down
client.on('message', msg => {
  if (msg.content === pr + 'ping') {
    msg.channel.send('pong');
    msg.channel.send("Pinging ...").then((msg) => { // Real Ping
    msg.edit("Ping: " + (Date.now() - msg.createdTimestamp))
    });
    console.log('ping');
  }
});
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// The following couple are just stupid chats to mess with
client.on('message', msg => {
  if (msg.content === pr + 'ding') {
    msg.channel.send('dong');
    console.log('ding')
  }
});
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
client.on('message', msg => {
  if (msg.content === pr + 'ching') {
    msg.channel.send('chong');
    console.log('ching')
  }
});
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Very offensive?
client.on('message', msg => {
  if (msg.content === pr + 'ching chong') {
    msg.channel.send('your religion is wrong');
    console.log('ching chong')
  }
});
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Who doesnt like spam?
client.on('message', msg => {
  if (msg.content === pr + 'spam') {
    var a = 'spam ';
    msg.channel.send(a.repeat(250));
    console.log('spam')
  }
});
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//Shows there avatar
client.on('message', msg => {
  if (msg.content === pr + 'what is my avatar') {
    msg.channel.send(msg.author.displayAvatarURL('Here is your avatar!'));
    console.log('avatar')
  }
});
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Clears channel messagges
client.on('message', msg => {
  if (msg.content === pr + 'clear 100') {
    msg.channel.bulkDelete(99);
    console.log('clear 100')
  }
});
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// e/help to get discord bots help
client.on('message', msg => {
  if (msg.content === pr + 'help') {
    msg.channel.send('\nThe prefix needed is ' + pr + '\nUse "spam" to get an annoying amount of messages in your channel\nUse "ching chong" to get something offensive\nUse "ping" to play pong\nChing chong\nDing dong\nUse "what is my avatar" to see a picture of your avatar\n' + vr);
    console.log('help needed')
  }
});
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// includes e/ not a command
client.on('message', msg => {
  if (msg.content.startsWith(pr)) {
    msg.channel.send('Sorry but that isnt a command... yet.');
    console.log('invalid command');
  }
});
//
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//
// Beginning of the automated text commands/replies functions
//
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Welcoming new members
client.on("guildMemberAdd", (member) => { // Check out previous chapter for information about this event
  let guild = member.guild; 
  let memberTag = member.user.tag; 
  if(guild.systemChannel){
    console.log('new member')
    guild.systemChannel.send(new Discord.RichEmbed() // Creating instance of Discord.RichEmbed
    .setTitle("A new user joined") // Calling method setTitle on constructor. 
    .setDescription(memberTag + " has joined the guild") // Setting embed description
    .setThumbnail(member.user.displayAvatarURL) // The image on the top right; method requires an url, not a path to file!
    .addField("Members now", member.guild.memberCount) // Adds a field; First parameter is the title and the second is the value.
    .setTimestamp() // Sets a timestamp at the end of the embed
    );
  }
});
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Uses the Discord Token to login to the bots Discord account
client.login(process.env.DISCORD_TOKEN);
//