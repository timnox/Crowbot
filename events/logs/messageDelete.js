const axios = require('axios');
const db = require("quick.db");
const Discord = require("discord.js");
const ms = require("ms");

module.exports = (client, message) => {
    if (!message.guild || !message.channel) return;

    const guild = message.guild;
    const color = db.get(`color_${guild.id}`) ?? client.config.color;
    const wass = db.get(`msglog_${guild.id}`);
    const logschannel = guild.channels.cache.get(wass);

    if (!logschannel) return;

    const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setAuthor(`Message supprimé`)
        .setDescription(`dans <#${message.channel.id}> par ${message.author || "Inconnu"}`)
        .addField(`Message Supprimé :`, message.content ? message.content : "*Aucun contenu texte*")
        .setFooter(`${client.config.name}`)
        .setTimestamp();

    logschannel.send({ embeds: [embed] }).catch(console.error);
};
