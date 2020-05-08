const { MessageEmbed } = require("discord.js");
const Music = require('discord.js-musicbot-addon');
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };

const pr = process.env.PREFIX
const musicUrls = [];

module.exports = {
    name: "play",
    aliases: ["sound", "play", "yt", "youtube"],
    category: "fun",
    description: "Plays music from YouTube",
    usage: "<name | url>",
    run: async (client, message, args) => {
        client.on('message', async message => {

            if(message.author.bot)
                return;
        
            if(message.content.toLowerCase().startsWith(pr + "play"))
            {
                let args = message.content.split(" ");
                let url = args[1];
                let VoiceChannel = message.member.voice.channel;
        
                if(ytdl.validateURL(url))
                {
                    console.log("Valid URL!");
                }
                if(VoiceChannel != null)
                {
                    console.log(VoiceChannel.name + " was found and is a " + VoiceChannel.type + " channel.");
                    VoiceChannel.join()
                    .then(connection => {
                        console.log("Bot joined the channel.");
                        const stream = ytdl(url, { filter : 'audioonly' });
                        const dispatcher = connection.play(stream, streamOptions);
        
                        dispatcher.on('end', () => {
                            VoiceChannel.leave();
                        });
                    })
                    .catch();
                }
            }
        
            else if(message.content.toLowerCase().startsWith(pr + "queue"))
            {
                let args = message.content.split(" ");
                let url = args[1];
                let VoiceChannel = message.member.voice.channel;
        
                var flag = musicUrls.some(element => element === url);
        
                console.log(musicUrls);
                const info = await ytdl.getBasicInfo(url);
                const songName = info.player_response.videoDetails.title;
                if(ytdl.validateURL(url))
                {
                    if(!flag)
                    {
                        musicUrls.push(url);
                        if(VoiceChannel != null) // Check if the VoiceChannel is not null.
                        {
                            if(VoiceChannel.connection) // If this is null, the bot is not in the channel.
                            {
                                // If this is true, then there is an existing connection..
                                console.log("Existing connection...");
                                const embed = new MessageEmbed();
                                embed.setAuthor(client.user.username, client.user.displayAvatarURL);
                                embed.setDescription("You've successfully added **" + songName + "** to the queue!");
                                message.channel.send(embed);
                            }
                            else {
                                try {
                                    const voiceConnection = await VoiceChannel.join();
                                    await playSong(voiceConnection, VoiceChannel);
                                }
                                catch(ex)
                                {
                                    console.log(ex);
                                }
                            }
                        }
                    }
                    else {
                        console.log("Song already exists in queue...");
                    }
                }
                else {
                    const embed = new MessageEmbed();
                    embed.setAuthor(client.user.username, client.user.displayAvatarURL());
                    embed.setDescription("Invalid URL Stream!");
                    message.channel.send(embed);
                }
            }
            
            
        });
        
        async function playSong(connection, channel)
        {
            console.log("Trying to play song: " + musicUrls[0]);
            const stream = ytdl(musicUrls[0], { filter : 'audioonly' });
            const dispatcher = connection.playStream(stream, streamOptions);
        
            dispatcher.on('end', () => {
                
                musicUrls.shift();
        
                if(musicUrls.length == 0)
                {
                    console.log("Array length is 0, bot is leaving...");
                    channel.leave();
                }
                else {
                    console.log("The array is not length 0, there are other items in the queue.");
                    setTimeout(() => {
                        playSong(connection, channel);
                    }, 5000);
                }
            });
        }
    }
}