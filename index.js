require("dotenv").config();
const Discord = require('discord.js');
const keep_alive = require('./keep_alive.js');
const client = new Discord.Client({
    fetchAllMembers: true,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_PRESENCES', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES'],
    intents: [
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_BANS,
        Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        Discord.Intents.FLAGS.GUILD_INVITES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_WEBHOOKS,
    ]
});
const { readdirSync } = require("fs");
const db = require('quick.db');
const ms = require("ms");
const { MessageEmbed } = require('discord.js');
const { login } = require("./util/login.js");
login(client);

// Traitement des erreurs non gérées
process.on("unhandledRejection", err => {
    if (err.message) return;
    console.error("Uncaught Promise Error: ", err);
});

// Charger les commandes
const loadCommands = (dir = "./commands/") => {
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

        for (const file of commands) {
            const getFileName = require(`${dir}/${dirs}/${file}`);
            client.commands.set(getFileName.name, getFileName);
            console.log(`> Commande Charger ${getFileName.name} [${dirs}]`);
        };
    });
};

// Charger les événements
const loadEvents = (dir = "./events/") => {
    readdirSync(dir).forEach(dirs => {
        const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

        for (const event of events) {
            const evt = require(`${dir}/${dirs}/${event}`);
            const evtName = event.split(".")[0];
            client.on(evtName, evt.bind(null, client));
            console.log(`> Event Charger ${evtName}`);
        };
    });
};

// Ajout de la gestion du stream
client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag} (${client.user.id})`);

    // Définir l'activité de streaming
    const activity = {
        name: 'DGSI-FR en direct', // Le texte que tu veux afficher
        type: Discord.ActivityType.Streaming, // Définit l'activité en mode streaming
        url: "https://www.twitch.tv/ton_chaine_twitch" // Remplace avec ton lien Twitch
    };

    client.user.setPresence({
        activities: [activity], // Ajouter l'activité au statut du bot
        status: "online" // Le statut en ligne du bot
    });
});

// Charger les événements et les commandes
loadEvents();
loadCommands();
