//hi noob at javascript
//jk im a noob too
//we can both suck together!


const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

const config = require('./config.json');
client.config = config;

/* Load all events */
fs.readdir('./events/', (_err, files) => {
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		const event = require(`./events/${file}`);
		let eventName = file.split('.')[0];
		console.log(`👌 Event loaded: ${eventName}`);
		client.on(eventName, event.bind(null, client));
	});
});

client.commands = new Discord.Collection();

/* Load commands */
fs.readdir('./commands/', (_err, files) => {
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		let props = require(`./commands/${file}`);
		let commandName = file.split('.')[0];
		client.commands.set(commandName, props);
		console.log(`👌 Command loaded: ${commandName}`);
	});
});

require('http')
	.createServer((req, res) => res.end(client.config.botName + ' HTTP server'))
	.listen(3000);

// Login
client.login("YOUR-TOKEN-HERE");
