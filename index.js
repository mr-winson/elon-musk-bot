/*

Trello: https://trello.com/b/eIi7UI55/elon-musk-bot

If you dont know what youre doing dont go below this line
that goes for me too because i dont knwo what i did last-
night but it is working somehow! thanks lastnight me!

All i currently know rn is that i need to add more commands
under the commands folder, especially moderation

Other important links inn the .env file!

//----------------------------------------------------------//

Copyright (C) Jude Wilson - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Jude Wilson <judewilson2024@gmail.com>, March 2020

*/

// node modules to install "npm install"
const { Client, MessageEmbed, Collection } = require("discord.js");						// client, messagembed, and collection require discordjs
const currency = new Collection();														// currency is equivalent to creating a new djs collection
const { Users, CurrencyShop } = require('./dbObjects');									// users, currencyshop require dbobjects
const { config } = require("dotenv");													// config requires dotenv (config file)
const { Op } = require('sequelize');													// op requires sequelize (database)
const fs = require("fs");																// fs requires fs
const ytdl = require('ytdl-core');														// ytdl requires ytdl-core (youtube data)
// Not needed rn
// const SQLite = require("better-sqlite3");
// const sql = new SQLite('./scores.sqlite');



// Part of the currency system, adds a table to the database called currency
Reflect.defineProperty(currency, 'add', { 												// adds table called currency
	value: async function add(id, amount) {												// declares functions and async
		const user = currency.get(id);													// defines user
		if (user) {																		// if user then
			user.balance += Number(amount);												// gets users current balance
			return user.save();															// saves users new balance
		}
		const newUser = await Users.create({ user_id: id, balance: amount });			// defines newUser and creates new table for that new user
		currency.set(id, newUser);														// sets up currency table
		return newUser;																	// ends command
	},
});



// Part of the currency system, adds a function called getBalance
Reflect.defineProperty(currency, 'getBalance', {										// defines the function
	value: function getBalance(id) {													// sets function
		const user = currency.get(id);													// defines user by id
		return user ? user.balance : 0;													// returns users balance unless it is 0
	},
});



// Sets up the new discord api connection
const client = new Client({																// creates new discord client connection
    disableEveryone: true																// the bot cant use @everyone
})



// client.xyz
client.commands = new Collection();														// creates a new collections for clients.commands
client.aliases = new Collection();														// creates a new collections for clients.aliases

client.categories = fs.readdirSync("./commands/");										// reads commands data

config({																				// grabs settings from .env file
    path: __dirname + "/.env"															// tells path to env file
});



// Adds the e/ to each command as well as imports the commands from the command handler
["command"].forEach(handler => {														// for each command
    require(`./handlers/${handler}`)(client);											// requires the handlers.command.js to grab commands data
});



// Turn bot on
client.on('ready', async () => {														// when the bot turns on
    const storedBalances = await Users.findAll();										// defines storedbalances
    storedBalances.forEach(b => currency.set(b.user_id, b));							// grabs currency data
    console.log(`This bot, ${client.user.tag}, is online! v` + process.env.VERSION);	// logs elon is online
	client.user.setActivity(` my ${client.guilds.cache.size} servers | e/h`, {type: `WATCHING`});	// sets bot status
	
	// Point System Code Beginning
	// Check if the table "points" exists.
	/*const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
	if (!table['count(*)']) {
	  // If the table isn't there, create it and setup the database correctly.
	  sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);").run();
	  // Ensure that the "id" row is always unique and indexed.
	  sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
	  sql.pragma("synchronous = 1");
	  sql.pragma("journal_mode = wal");
	}
  
	// And then we have two prepared statements to get and set the score data.
	client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
	client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);")*/
	// Point System Code End
});



// Command Handler
client.on("message", async message => {													// when the bot is ready and someboy sends a message
	const prefix = process.env.PREFIX;													// pulls prefix data from the .env file
	let score;																			// defines a useless variable

    if (message.author.bot) return;														// ignores the message if  bot sent it
    if (!message.content.startsWith(prefix)) return;									// if the message doesnt begin with prefix then ignore it

    if (!message.member) message.member = await message.guild.fetchMember(message);		// If message.member is uncached, cache it.

    const args = message.content.slice(prefix.length).trim().split(/ +/g);				// defines args splitting at spaces
    const cmd = args.shift().toLowerCase();												// cmd = args shifted to lower case
    
    if (cmd.length === 0) return;														// if the command is 0 letters long then ignore it
    
    let command = client.commands.get(cmd);												// gets the command
    if (!command) command = client.commands.get(client.aliases.get(cmd));				// If none is found, try to find it by alias

    if (command)																		// If a command is finally found, run the command
		command.run(client, message, args);												// run the command
	
	if (message.guild.id === '682785684771176471') {									// adds one dollar to the users balance
		currency.add(message.author.id, 1);												// adds the dollar
	}

	// Point System Code Beginning
	/*if (message.guild) {
		score = client.getScore.get(message.author.id, message.guild.id);
		if (!score) {
		  score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 }
		}
		score.points++;
		const curLevel = Math.floor(0.1 * Math.sqrt(score.points));
		if(score.level < curLevel) {
		  score.level++;
		  message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
		}
		client.setScore.run(score);
	  }*/
	// Point System Code End
})



client.login(process.env.DISCORD_TOKEN);												// log into discord as our bot

//----------------------------------------------------------//
//
// Useless, dont go below this line. indeed?
//
//----------------------------------------------------------//

// indeed.com -- Drews request
client.on('message', msg => {															// indeed.com -- Drews request
    if (msg.content === 'indeed') {														// indeed.com -- Drews request
        msg.channel.send('indeed.com');													// indeed.com -- Drews request
    }
});



// hotel? trivago -- Judes request
client.on('message', msg => {															// hotel? trivago -- Judes request
    if (msg.content === 'hotel') {														// hotel? trivago -- Judes request
        msg.channel.send('trivago');													// hotel? trivago -- Judes request
    }
});

client.on('message', async message => {													// when somebody sends a message
    // bad words:																		
    var curse = require('./suicide');													// list of suicidal words

    let foundInText = false;															// if the words were found in the message
    for (var i in curse) {																// im not sure but thanks stack overflow!
    if (message.content.toLowerCase().includes(curse[i].toLowerCase())) foundInText = true;		// if the word is found in the message take action
    }

    if (foundInText) {																	// if the above lines are true
        if (message.author.bot) {														// ignore if a bot
            return
        } else {																		// otherwise
            message.delete();															// delete the og message
			return message.reply(` Suicide is not a joke. If you are struggling please call the National Suicide Prevention Hotline. 1-800-273-8255`)		// and reply with this one
				.then(m => m.delete({ timeout: 10000})); 								// then delete that message after 10 seconds
        }
    }
});

//----------------------------------------------------------//
//
// Moderation!!! -- list of words in ./words.js
//
//----------------------------------------------------------//

client.on('message', async message => {													// when somebody sends a message
    // bad words:																		
    var curse = require('./words');														// list of bad words

    let foundInText = false;															// if the words were found in the message
    for (var i in curse) {																// im not sure but thanks stack overflow!
    if (message.content.toLowerCase().includes(curse[i].toLowerCase())) foundInText = true;		// if the word is found in the message take action
    }

    if (foundInText) {																	// if the above lines are true
        if (message.author.bot) {														// ignore if a bot
            return
        } else {																		// otherwise
            message.delete();															// delete the og message
            return message.channel.send(`Hey, ${username}, no bad words!`)				// and reply with this one
			.then(m => m.delete({ timeout: 10000})); 									// then delete that message after 10 seconds
        }
    }
});

//----------------------------------------------------------//
//
// Points System!!! -- broken lol
//
//----------------------------------------------------------//

/*client.on('message', message => {
	// Prefix
	let prefix = process.env.PREFIX

	if (message.author.bot) return;
	currency.add(message.author.id, 1);

	if (!message.content.startsWith(prefix)) return;
	const input = message.content.slice(prefix.length).trim();
	if (!input.length) return;
	const [, command, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/);

	if(command === "points") {
		return message.channel.send(new MessageEmbed() .setTitle('Points').setDescription(`You currently have ${score.points} points and are level ${score.level}!`));
	}

	if(command === "give") {
		// Limited to guild owner - adjust to your own preference!
		if(!message.author.id === message.guild.owner) return message.reply("You're not the boss of me, you can't do that!");
	  
		const user = message.mentions.users.first() || client.users.get(args[0]);
		if(!user) return message.channel.send("You must mention someone or give their ID!");
	  
		const pointsToAdd = parseInt(args[1], 10);
		if(!pointsToAdd) return message.channel.send("You didn't tell me how many points to give...")
	  
		// Get their current points.
		let userscore = client.getScore.get(user.id, message.guild.id);
		// It's possible to give points to a user we haven't seen, so we need to initiate defaults here too!
		if (!userscore) {
		  userscore = { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, points: 0, level: 1 }
		}
		userscore.points += pointsToAdd;
	  
		// We also want to update their level (but we won't notify them if it changes)
		let userLevel = Math.floor(0.1 * Math.sqrt(score.points));
		userscore.level = userLevel;
	  
		// And we save it!
		client.setScore.run(userscore);
	  
		return message.channel.send(`${user.tag} has received ${pointsToAdd} points and now stands at ${userscore.points} points.`);
	  }
	  
	  if(command === "pointleaders") {
		const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id);
	  
		  // Now shake it and show it! (as a nice embed, too!)
		const embed = new MessageEmbed()
		  .setTitle("Points Leaderboard")
		  .setAuthor(client.user.username, client.user.avatarURL)
		  .setDescription("Our top 10 points leaders!")
		  .setColor(0x00AE86);
	  
		for(const data of top10) {
		  embed.addField(client.users.get(data.user).tag, `${data.points} points (level ${data.level})`);
		}
		return message.channel.send({embed});
	}
}),*/

//----------------------------------------------------------//
//
// Economy!!! -- in index.js because of async and others problems -- might fix later but probably not
//
// This is only for the official guild
//
//----------------------------------------------------------//s

client.on('message', async message => {
	if (message.guild.id !== '682785684771176471') {
		return
	} else {
		// Prefix
		let prefix = process.env.PREFIX

		if (message.author.bot) return;
		currency.add(message.author.id, 1);

		if (!message.content.startsWith(prefix)) return;
		const input = message.content.slice(prefix.length).trim();
		if (!input.length) return;
		const [, command, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/);

//----------------------------------------------------------//
//
// Balance CMD
//
//----------------------------------------------------------//

		if (command === 'balance') {
			const target = message.mentions.users.first() || message.author;
			return message.channel.send(`${target.tag} has ${currency.getBalance(target.id)}💰`);
		} 

//----------------------------------------------------------//
//
// Inventory CMD
//
//----------------------------------------------------------//
		
		else if (command === 'inventory') {
			const target = message.mentions.users.first() || message.author;
			const user = await Users.findOne({ where: { user_id: target.id } });
			const items = await user.getItems();

			if (!items.length) return message.channel.send(`${target.tag} has nothing!`);
			return message.channel.send(`${target.tag} currently has ${items.map(t => `${t.amount} ${t.item.name}`).join(', ')}`);
		} 

//----------------------------------------------------------//
//
// Transfer CMD
//
//----------------------------------------------------------//
		
		else if (command === 'transfer') {
			const currentAmount = currency.getBalance(message.author.id);
			const transferAmount = commandArgs.split(/ +/).find(arg => !/<@!?\d+>/.test(arg));
			const transferTarget = message.mentions.users.first();

			if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`Sorry ${message.author}, that's an invalid amount`);
			if (transferAmount > currentAmount) return message.channel.send(`Sorry ${message.author} you don't have that much.`);
			if (transferAmount <= 0) return message.channel.send(`Please enter an amount greater than zero, ${message.author}`);

			currency.add(message.author.id, -transferAmount);
			currency.add(transferTarget.id, transferAmount);

			return message.channel.send(`Successfully transferred ${transferAmount}💰 to ${transferTarget.tag}. Your current balance is ${currency.getBalance(message.author.id)}💰`);
		} 

//----------------------------------------------------------//
//
// Buy CMD
//
//----------------------------------------------------------//
		
		else if (command === 'buy') {
			const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: commandArgs } } });
			if (!item) return message.channel.send('That item doesn\'t exist.');
			if (item.cost > currency.getBalance(message.author.id)) {
				return message.channel.send(`You don't have enough currency, ${message.author}`);
			}

			const user = await Users.findOne({ where: { user_id: message.author.id } });
			currency.add(message.author.id, -item.cost);
			await user.addItem(item);

			// Youve bought an item
			message.channel.send(`You've bought a ${item.name}`);

			// If you purchase Slave item then you get Slave role
			if (item.name === 'Slave') {
				let Slave = message.guild.roles.cache.find(role => role.name === "Slave");
				message.member.roles.add(Slave)
			}

			// If you purchase Member item then you get Member role
			if (item.name === 'Member') {
				let Member = message.guild.roles.cache.find(role => role.name === "Member");
				message.member.roles.add(Member)
			}

			// If you purchase Priority Member item then you get Priority Member role
			if (item.name === 'Priority Member') {
				let PM = message.guild.roles.cache.find(role => role.name === "Priority Member");
				message.member.roles.add(PM)
			}

			// If you purchase VIP item then you get VIP role
			if (item.name === 'VIP') {
				let VIP = message.guild.roles.cache.find(role => role.name === "VIP");
				message.member.roles.add(VIP)
			}

			// If you purchase MVP item then you get MVP role
			if (item.name === 'MVP') {
				let MVP = message.guild.roles.cache.find(role => role.name === "MVP");
				message.member.roles.add(MVP)
			}

			// If you purchase Moderator item then you get Moderator role
			if (item.name === 'Moderator') {
				let MOD = message.guild.roles.cache.find(role => role.name === "Moderator");
				message.member.roles.add(MOD)
			}

			// If you purchase Admin item then you get Admin role
			if (item.name === 'Admin') {
				let Admin = message.guild.roles.cache.find(role => role.name === "Admin");
				message.member.roles.add(Admin)
			}
		} 

//----------------------------------------------------------//
//
// Shop CMD
//
//----------------------------------------------------------//
		
		else if (command === 'shop') {
			const items = await CurrencyShop.findAll();
			return message.channel.send(items.map(i => `${i.name}: ${i.cost}💰`).join('\n'), { code: true });
		} 

//----------------------------------------------------------//
//
// Leaderboard CMD
//
//----------------------------------------------------------//
		
		else if (command === 'leaderboard') {
			return message.channel.send(
				currency.sort((a, b) => b.balance - a.balance)
					.filter(user => client.users.has(user.user_id))
					.first(10)
					.map((user, position) => `(${position + 1}) ${(client.users.get(user.user_id).tag)}: ${user.balance}💰`)
					.join('\n'),
				{ code: true }
			);
		}
	}
});