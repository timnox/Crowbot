require("dotenv").config(); // Charge les variables d'environnement

const { readdirSync } = require("fs");

const login = (client) => {
    const Discord = require("discord.js");
    const logs = require("discord-logs");
    logs(client);

    const disbut = require("discord-buttons");
    disbut(client);

    const tempo = require("./gestion/tempo.js");
    tempo(client);

    client.config = require("../config.json");
    client.cooldown = [];
    client.interaction = {};
    client.guildInvites = new Map();
    client.queue = new Map();
    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();
    client.snipes = new Map();
    client.inter = [];

    // Connexion avec le token depuis .env
    client.login(process.env.DISCORD_TOKEN);

};

module.exports = {
    login
};
