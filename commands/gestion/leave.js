const Discord = require('discord.js')
const db = require('quick.db')
const {
	MessageActionRow,
	MessageButton,
	MessageMenuOption,
	MessageMenu
} = require('discord-buttons');

module.exports = {
	name: 'leave',
	aliases: ['bye', 'byebye'],
	run: async (client, message, args, prefix, color) => {

		function updateembed(msg) {
			if (db.get(`leavestyle_${message.guild.id}_${message.id}`) === "message" || db.get(`leavestyle_${message.guild.id}_${message.id}`) === null) {
				const embed = new Discord.MessageEmbed()
					.setTitle(`Configuration Leave`)
					.setColor(color)
					.addField("Salon d'aurevoir", db.get(`leavechannelmessage_${msg.guild.id}`) === null ? ":x:" : `<#${db.get(`leavechannelmessage_${msg.guild.id}`)}> (${db.get(`leavechannelmessage_${msg.guild.id}`)})`)
					.addField("Message d'aurevoir", db.get(`leavemessage_${msg.guild.id}`) === null ? db.get(`leavemessageembed_${message.guild.id}`) === null ? "Default" : "Embed" : `${db.get(`leavemessage_${msg.guild.id}`)}`)
					.addField("MP d'aurevoir", db.get(`leavedmee_${msg.guild.id}`) === null ? ":x:" : `${db.get(`leavedmee_${msg.guild.id}`)}`)
					.setTimestamp()
					.setFooter(`${client.config.name}`)



				let menuoptions = [{
						value: "Style Embed",
						description: "Permet De crée un embed pour le message",
						emoji: "📑"
					},
					{
						value: "Modifier le salon d'aurevoir",
						description: "Permet de choisir dans quelle salon le message de leave ira",
						emoji: "🏷️"
					},
					{
						value: "Supprimer le salon d'aurevoir",
						description: "Permet de supprimer le salon ou le message d'aurevoir et envoyé",
						emoji: "🛎️"
					},
					{
						value: "Modifier le message d'aurevoir",
						description: "Permet de modifier le message d'aurevoir",
						emoji: "📩"
					},
					{
						value: "Supprimer le message d'aurevoir",
						description: "Permet de supprimé le message d'aurevoir",
						emoji: "✉️"
					},
					{
						value: "Modifier le MP d'aurevoir",
						description: "Permet de modifier le MP de leave",
						emoji: "📫"
					},
					{
						value: "Supprimer le MP d'aurevoir",
						description: "Permet de supprimer le message MP de leave",
						emoji: "📪"
					},


				]
				const bt2 = new MessageButton()
					.setStyle("gray")
					.setID(message.id + "leave")
					.setEmoji("❌")
					.setLabel("Reformuler votre choix")
				let interactiveButtons = new MessageMenu()
					.setID(message.id + 'MenuSelection')
					.setMaxValues(1)
					.setMinValues(1)
					.setPlaceholder('Faix un choix');
				menuoptions.forEach(option => {
					let row = new MessageMenuOption()
						.setLabel(option.label ? option.label : option.value)
						.setValue(option.value)
						.setDescription(option.description)
						.setDefault()
					if (option.emoji) row.setEmoji(option.emoji)
					interactiveButtons.addOption(row)
				})
				msg.edit("", {
					embed: embed,
					components: [

						{
							type: 1,
							components: [interactiveButtons]
						},

						{
							type: 1,
							components: [bt2],
						}
					]
				})
			} else if (db.get(`leavestyle_${message.guild.id}_${message.id}`) === "embed") {

				const embed = new Discord.MessageEmbed()
					.setTitle(`Configuration Leave`)
					.setColor(color)
					.addField("Salon d'aurevoir", db.get(`leavechannelmessage_${msg.guild.id}`) === null ? ":x:" : `<#${db.get(`leavechannelmessage_${msg.guild.id}`)}> (${db.get(`leavechannelmessage_${msg.guild.id}`)})`)
					.addField("Embed d'aurevoir", db.get(`leavemessage_${msg.guild.id}`) === null ? db.get(`leavemessageembed_${message.guild.id}`) === null ? "Non" : "Oui" : `Message: ${db.get(`leavemessage_${msg.guild.id}`)}`)
					.addField("MP d'aurevoir", db.get(`leavedmee_${msg.guild.id}`) === null ? ":x:" : `${db.get(`leavedmee_${msg.guild.id}`)}`)
					.setTimestamp()
					.setFooter(`${client.config.name}`)



				let menuoptions = [{
						value: "Style Message",
						description: "Permet d'envoyer votre message sous forme de message",
						emoji: "📑"
					}, ,
					{
						value: "Modifier le salon d'aurevoir",
						description: "Permet de choisir dans quelle salon le message de leave ira",
						emoji: "🏷️"
					},
					{
						value: "Supprimer le salon d'aurevoir",
						description: "Permet de supprimer le salon ou le message d'aurevoir et envoyé",
						emoji: "🛎️"
					},
					{
						value: "Modifier l'embed d'aurevoir",
						description: "Permet de configurer l'embed de leave",
						emoji: "📩"
					},
					{
						value: "Supprimer l'embed d'aurevoir",
						description: "Permet de supprimer l'embed de leave",
						emoji: "✉️"
					},
					{
						value: "Modifier le MP d'aurevoir",
						description: "Permet de modifier le MP de leave",
						emoji: "📫"
					},
					{
						value: "Supprimer le MP d'aurevoir",
						description: "Permet de supprimer le message de leave",
						emoji: "📪"
					},


				]
				const bt1 = new MessageButton()
					.setStyle("gray")
					.setID(message.id + "leavemsg")
					.setEmoji("📝")
					.setLabel("Voir l'embed d'aurevoir")
				const bt2 = new MessageButton()
					.setStyle("gray")
					.setID(message.id + "leave")
					.setEmoji("❌")
					.setLabel("Reformuler votre choix")
				let interactiveButtons = new MessageMenu()
					.setID(message.id + 'MenuSelection')
					.setMaxValues(1)
					.setMinValues(1)
					.setPlaceholder('Faix un choix');
				menuoptions.forEach(option => {
					let row = new MessageMenuOption()
						.setLabel(option.label ? option.label : option.value)
						.setValue(option.value)
						.setDescription(option.description)
						.setDefault()
					if (option.emoji) row.setEmoji(option.emoji)
					interactiveButtons.addOption(row)
				})
				msg.edit("", {
					embed: embed,
					components: [

						{
							type: 1,
							components: [interactiveButtons]
						},

						{
							type: 1,
							components: [bt1, bt2],
						}
					]
				})
			}
		}


		let perm = ""
		message.member.roles.cache.forEach(role => {
			if (db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
		})
		if (client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {

			message.channel.send(`Salut`).then(async m => {
				updateembed(m)
				setTimeout(() => {
					m.edit("", {
						components: [],
						embed: new Discord.MessageEmbed()
							.setTimestamp()
							.setFooter(`${client.config.name}`)
							.setColor(color)
							.addField("Salon d'aurevoir", db.get(`leavechannelmessage_${message.guild.id}`) === null ? ":x:" : `<#${db.get(`leavechannelmessage_${message.guild.id}`)}> (${db.get(`leavechannelmessage_${message.guild.id}`)})`)
							.addField("Message d'aurevoir", db.get(`leavemessage_${message.guild.id}`) === null ? db.get(`leavemessageembed_${message.guild.id}`) === null ? "Default" : "Embed" : `${db.get(`leavemessage_${message.guild.id}`)}`)
							.addField("MP d'aurevoir", db.get(`leavedmee_${message.guild.id}`) === null ? ":x:" : `${db.get(`leavedmee_${message.guild.id}`)}`)
					})
					// message.channel.send(embeds)
				}, 60000 * 5)
				client.on('clickMenu', async (menu) => {
					if (message.author !== menu.clicker.user || menu.message.id !== m.id) return;
					menu.reply.defer(true)
					menuselection(menu)
				})
				client.on('clickButton', async (button) => {
					if (message.author !== button.clicker.user) return;
					if (button.id === message.id + "leavemsg") {
						button.reply.defer(true)
						if (db.get(`leavemessageembed_${message.guild.id}`) !== null) {
							message.channel.send({
								embed: db.get(`leavemessageembed_${message.guild.id}`)
							})
						}
					}
					if (button.id === message.id + "leave") {
						button.reply.defer(true)
						updateembed(m)
					}
				})

				function menuselection(menu) {
					switch (menu.values[0]) {
						case "Style Embed":
							db.set(`leavestyle_${message.guild.id}_${message.id}`, "embed")

							updateembed(m)
							break
						case "Style Message":
							db.set(`leavestyle_${message.guild.id}_${message.id}`, "message")
							updateembed(m)
							break
						case "Modifier l'embed d'aurevoir":
							db.set(`leavemessage_${message.guild.id}`, null)
							embedmsg(m)
							break

						case "Supprimer l'embed d'aurevoir":
							db.set(`leavemessageembed_${message.guild.id}`, null)
							updateembed(m)
							break


						case "Modifier le salon d'aurevoir":
							message.channel.send(`Quel est **le nouveau salon d'aurevoir** ?`).then(mp => {
								mp.channel.awaitMessages(response => {
										return response.author.id === message.author.id
									}, {
										max: 1,
										time: 60000,
										errors: ['time']
									})
									.then(cld => {

										var msg = cld.first();
										var role = message.guild.channels.cache.get(msg.content) || msg.mentions.channels.first()
										if (!role) return message.channel.send(`Aucun salon trouvé pour \`${msg.content}\`.`);

										db.set(`leavechannelmessage_${message.guild.id}`, role.id)
										mp.delete()
										cld.first().delete()
										updateembed(m)

									});
							})
							break
						case "Supprimer le salon d'aurevoir":
							db.delete(`leavechannelmessage_${message.guild.id}`)
							updateembed(m)
							break
						case "Modifier le message d'aurevoir":
							message.channel.send(`
\`\`\`
--- Informations sur l'user : ---

Mention de l'user : {user}
Id de l'user : {user:id}
Tag de l'user : {user:tag}
Nom de l'user : {user:name}

--- Informations sur l'inviteur : ---

Mention de l'inviteur : {inviter}
Id de l'inviteur : {inviter:id}
Tag de l'inviteur : {inviter:tag}
Nom de l'inviteur : {inviter:name}

--- Informations sur l'invitation : ---

Nombre d'invitations : {invite}

--- Informations sur le serveur : ---
 
Membres totaux : {guild:member}
Serveur : {guild:name}

            \`\`\`

Quel est **le nouveau message d'aurevoir** ?`).then(mp => {
								mp.channel.awaitMessages(response => {
										return response.author.id === message.author.id
									}, {
										max: 1,
										time: 60000,
										errors: ['time']
									})
									.then(cld => {

										var msg = cld.first();
										db.set(`leavemessageembed_${message.guild.id}`, null)
										db.set(`leavemessage_${message.guild.id}`, msg.content)
										mp.delete()
										cld.first().delete()
										updateembed(m)

									});
							})

							break
						case "Supprimer le message d'aurevoir":
							db.delete(`leavemessage_${message.guild.id}`)
							updateembed(m)
							break
						case "Modifier le MP d'aurevoir":

							message.channel.send(`
\`\`\`
--- Informations sur l'user : ---

Mention de l'user : {user}
Id de l'user : {user:id}
Tag de l'user : {user:tag}
Nom de l'user : {user:name}

--- Informations sur le serveur : ---
 
Membres totaux : {guild:member}
Serveur : {guild:name}
\`\`\` 

Quel est **le DM salon d'aurevoir** ?`).then(mp => {
								mp.channel.awaitMessages(response => {
										return response.author.id === message.author.id
									}, {
										max: 1,
										time: 60000,
										errors: ['time']
									})
									.then(cld => {

										var msg = cld.first();


										db.set(`leavedmee_${message.guild.id}`, msg.content)
										mp.delete()
										cld.first().delete()
										updateembed(m)

									});
							})
							break
						case "Supprimer le MP d'aurevoir":
							db.delete(`leavedmee_${message.guild.id}`)
							updateembed(m)
							break
					}
				}
			})

		}

		async function embedmsg(m) {
			const filterMessage = m => message.author.id === m.author.id;
			const filter = m => message.author.id === m.author.id;
			let menuoptions = [{
					value: "Copier un embed",
					description: "Permet de copier un embed déja existant sur le serveur",
					emoji: "📥"
				},
				{
					value: "Modifier le titre",
					description: "Permet de choisir le titre de vôtre embed",
					emoji: "🖊"
				},
				{
					value: "Supprimer le titre",
					description: "Permet De Supprimer le titre de vôtre embed",
					emoji: "💥"
				},
				{
					value: "Modifier la description",
					description: "Permet de choisir la description de vôtre embed",
					emoji: "💬"
				},
				{
					value: "Supprimer la description",
					description: "Permet de supprimer la description de vôtre embed",
					emoji: "📝"
				},
				{
					value: "Modifier l'auteur",
					description: "Permet de choisir l'auteur de vôtre embed",
					emoji: "🕵️"
				},
				{
					value: "Supprimer l'auteur",
					description: "Permet de supprimer l'auteur de vôtre embed",
					emoji: "✂"
				},
				{
					value: "Modifier le footer",
					description: "Permet de choisir le footer de vôtre embed",
					emoji: "🔻"
				},
				{
					value: "Supprimer le footer ",
					description: "Permet de supprimer le footer de vôtre embed",
					emoji: "🔺"
				},
				{
					value: "Modifier le thumbnail",
					description: "Permet de choisir la thumbnail de vôtre embed",
					emoji: "🔳"
				},
				{
					value: "Modifier l'image",
					description: "Permet de choisir l'image de vôtre embed",
					emoji: "🖼️"
				},
				{
					value: "Modifier l'url du titre",
					description: "Permet de choisir l'url de vôtre embed",
					emoji: "🌐"
				},
				{
					value: "Modifier la couleur",
					description: "Permet de choisir la couleur de vôtre embed",
					emoji: "🎨"
				},
				{
					value: "Supprimer la couleur",
					description: "Permet de supprimer la couleur de vôtre embed",
					emoji: "🔵"
				},


			]
			const embedbase = new Discord.MessageEmbed()
				.setDescription("** **")
			let interactiveButtons = new MessageMenu()
				.setID(message.id + 'MenuSelection')
				.setMaxValues(1)
				.setMinValues(1)
				.setPlaceholder('Faix un choix');
			menuoptions.forEach(option => {
				let row = new MessageMenuOption()
					.setLabel(option.label ? option.label : option.value)
					.setValue(option.value)
					.setDescription(option.description)
					.setDefault()
				if (option.emoji) row.setEmoji(option.emoji)
				interactiveButtons.addOption(row)
			})
			const bt = new MessageButton()
				.setStyle("gray")
				.setID("embedmsg1" + message.id)
				.setEmoji("✅")
				.setLabel("Valider")
			const bt3 = new MessageButton()
				.setStyle("gray")
				.setID("embedmsg3" + message.id)
				.setEmoji("❌")
				.setLabel("Reformuler votre choix")

			message.channel.send(`\`\`\`
--- Informations sur l'user : ---

Mention de l'user : {user}
Id de l'user : {user:id}
Tag de l'user : {user:tag}
Nom de l'user : {user:name}

--- Informations sur l'inviteur : ---

Mention de l'inviteur : {inviter}
Id de l'inviteur : {inviter:id}
Tag de l'inviteur : {inviter:tag}
Nom de l'inviteur : {inviter:name}

--- Informations sur l'invitation : ---

Nombre d'invitations : {invite}

--- Informations sur le serveur : ---
 
Membres totaux : {guild:member}
Serveur : {guild:name}

   \`\`\``, {
				embed: embedbase,
				components: [

					{
						type: 1,
						components: [interactiveButtons]
					},

					{
						type: 1,
						components: [bt, bt3],
					}
				]
			}).then(async msgg => {
				setTimeout(() => {
					msgg.delete()
					// message.channel.send(embeds)
				}, 60000 * 15)
				client.on('clickMenu', async (menu) => {
					menu.reply.defer(true)
					if (message.author !== menu.clicker.user) return;
					slmmenu(menu)
				})
				client.on('clickButton', async (button) => {
					if (message.author !== button.clicker.user || button.message.id !== msgg.id) return;

					if (button.id === "embedmsg1" + message.id) {
						button.reply.defer(true)
						db.set(`leavemessageembed_${message.guild.id}`, msgg.embeds[0])
						msgg.delete()
						updateembed(m)

					}
					if (button.id === "embedmsg3" + message.id) {
						button.reply.defer(true)
						msgg.edit(msgg.embeds)
					}
				})
				async function slmmenu(menu) {
					switch (menu.values[0]) {
						case "Modifier le titre":
							let question = await message.channel.send("Quel est **le nouveau titre de l'embed ?**")

							message.channel.awaitMessages(filter, {
								max: 1,
								time: 60000,
								errors: ['time']
							}).then(async (collected) => {
								const lowercase = collected.first().content.toLowerCase()

								collected.first().delete()
								question.delete()
								embedbase.setTitle(collected.first().content)
								msgg.edit(embedbase)
							}).catch(async (err) => {

								message.channel.send("**Désolé mais je ne peux pas modifier le Titre !**").then((mm) => mm.delete({
									timeout: 2500
								}));
							})
							break

						case "Supprimer le titre":
							embedbase.setTitle("** **")
							msgg.edit(embedbase)
							break

						case "Modifier la description":
							let descriptionques = await message.channel.send("Quel est **la nouvelle description de l'embed ?**")

							message.channel.awaitMessages(filter, {
								max: 1,
								time: 60000,
								errors: ['time']
							}).then(async (collected) => {
								const lowercase = collected.first().content.toLowerCase()

								collected.first().delete()
								descriptionques.delete()
								embedbase.setDescription(collected.first().content)
								msgg.edit(embedbase)
							}).catch(async (err) => {

								message.channel.send("**Désolé mais je ne peux pas modifier la description !**").then((mm) => mm.delete({
									timeout: 2500
								}));
							})
							break

						case "Supprimer la description":
							embedbase.setDescription("** **")
							msgg.edit(embedbase)
							break

						case "Modifier l'auteur":
							const embedquest = new Discord.MessageEmbed()

							let SELAMq = await message.channel.send("Quel est **le nouveau autheur de l'embed ?", embedquest.setDescription("Vous pouvez mentionner un **Utilisateur** pour mettre son pseudo et sont Avatar"))

							message.channel.awaitMessages(filter, {
								max: 1,
								time: 60000,
								errors: ['time']
							}).then(async (collected) => {
								const lowercase = collected.first().content.toLowerCase()

								collected.first().delete()
								SELAMq.delete()
								if (collected.first().mentions.users.size <= 0) {
									auteur = collected.first().content;
									const question2 = await message.channel.send("Voulez-vous ajouter un **Avatar** a votre Author, sinon entrez `non`");
									const auteurImg = (await message.channel.awaitMessages(filter, {
										max: 1,
										time: 60000,
										errors: ['time']
									})).first();
									question2.delete();
									auteurImg.delete();
									const img = auteurImg.content
									const liens = [
										"https://",
										"http://",
										"https",
										"http"
									];
									if (!liens.some(word => img.includes(word))) {
										embedbase.setAuthor(auteur)
										message.channel.send("Vous avez choisi de ne pas ajouter d'Avatar a votre Author ou le lien n'est pas Valide !").then((mm) => mm.delete({
											timeout: 2500
										}))
									}

									if (liens.some(word => img.includes(word))) {
										embedbase.setAuthor(auteur, auteurImg.content)
									}
								}
								if (collected.first().mentions.users.size > 0) {
									auteur = collected.first().mentions.users.first();

									embedbase.setAuthor(auteur.username, auteur.displayAvatarURL({
										dynamic: true
									}));
								}
								msgg.edit(embedbase)
							}).catch(async (err) => {

								message.channel.send("**Désolé mais je ne peux pas modifier l'Author !**").then((mm) => mm.delete({
									timeout: 2500
								}));
							})
							break

						case "Supprimer l'auteur":
							embedbase.setAuthor("** **")
							msgg.edit(embedbase)
							break
						case "Modifier le footer":
							const embedtttt = new Discord.MessageEmbed()
							let TDCQUEST2 = await message.channel.send("Quel **Footer** voulez-vous attribuez à l'embed ?", embedtttt.setDescription("Vous pouvez mentionner un **Utilisateur** pour mettre son pseudo et sont Avatar"))

							message.channel.awaitMessages(filter, {
								max: 1,
								time: 60000,
								errors: ['time']
							}).then(async (collected) => {
								const lowercase = collected.first().content.toLowerCase()

								collected.first().delete()
								TDCQUEST2.delete()
								if (collected.first().mentions.users.size <= 0) {
									footer = collected.first().content;
									const question2 = await message.channel.send("Voulez-vous ajouter un **Avatar** a votre Footer, sinon entrez `non`");
									const footerImg = (await message.channel.awaitMessages(filter, {
										max: 1,
										time: 60000,
										errors: ['time']
									})).first();
									question2.delete();
									footerImg.delete();
									const img = footerImg.content
									const liens = [
										"https://",
										"http://",
										"https",
										"http"
									];
									if (!liens.some(word => img.includes(word))) {
										embedbase.setFooter(footer)
										message.channel.send("Vous avez choisi de ne pas ajouter d'Avatar au Footer ou le lien n'est pas Valide !").then((mm) => mm.delete({
											timeout: 2500
										}))
									}

									if (liens.some(word => img.includes(word))) {
										embedbase.setFooter(footer, footerImg.content)
									}
								}
								if (collected.first().mentions.users.size > 0) {
									footer = collected.first().mentions.users.first();

									embedbase.setFooter(footer.username, footer.displayAvatarURL({
										dynamic: true
									}));
								}
								msgg.edit(embedbase)
							}).catch(async (err) => {

								message.channel.send("**Désolé mais je ne peux pas modifier le Footer !**").then((mm) => mm.delete({
									timeout: 2500
								}));
							})

							break

						case "Supprimer le footer":
							embedbase.setFooter("** **")
							msgg.edit(embedbase)
							break
						case "Modifier le thumbnail":
							let PASDETDCMEC = await message.channel.send("Quel **Thumbnail** voulez-vous attribuez à l'embed ?")

							message.channel.awaitMessages(filter, {
								max: 1,
								time: 60000,
								errors: ['time']
							}).then(async (collected) => {
								const lowercase = collected.first().content.toLowerCase()

								const thumbnail = collected.first().content
								const liens = [
									"https://",
									"http://",
									"https",
									"http"
								];
								if (!liens.some(word => thumbnail.includes(word))) {
									collected.first().delete()
									PASDETDCMEC.delete()
									return message.channel.send("L'opération a été Annulée, vous devez spécifier un Lien !").then((mm) => mm.delete({
										timeout: 2500
									}))
								}


								collected.first().delete()
								PASDETDCMEC.delete()
								embedbase.setThumbnail(collected.first().content)
								msgg.edit(embedbase)
							}).catch(async (err) => {

								message.channel.send("**Désolé mais je ne peux pas modifier le Thumbnail !**").then((mm) => mm.delete({
									timeout: 2500
								}));
							})

							break

						case "Supprimer le thumbnail":
							embedbase.setThumbnail("htps://slm.com")
							msgg.edit(embedbase)
							break
						case "Modifier l'image":
							let heh1 = await message.channel.send("Quel **Image** voulez-vous attribuez à l'embed ?")

							message.channel.awaitMessages(filter, {
								max: 1,
								time: 60000,
								errors: ['time']
							}).then(async (collected) => {
								const lowercase = collected.first().content.toLowerCase()

								const image = collected.first().content
								const liens = [
									"https://",
									"http://",
									"https",
									"http"
								];
								if (!liens.some(word => image.includes(word))) {
									collected.first().delete()
									heh1.delete()
									return message.channel.send("L'opération a été Annulée, vous devez spécifier un Lien !").then((mm) => mm.delete({
										timeout: 2500
									}))
								}


								collected.first().delete()
								heh1.delete()
								embedbase.setImage(collected.first().content, {
									size: 4096
								})
								msgg.edit(embedbase)
							}).catch(async (err) => {

								message.channel.send("**Désolé mais je ne peux pas modifier l'Image !**").then((mm) => mm.delete({
									timeout: 2500
								}));
							})
							break

						case "Supprimer l'image":
							embedbase.setImage("htps://slm.com")
							msgg.edit(embedbase)
							break

						case "Modifier l'url du titre":
							let WASSIMLEMAITRE = await message.channel.send("Quel **URL** voulez-vous attribuez à l'embed ?")

							message.channel.awaitMessages(filter, {
								max: 1,
								time: 60000,
								errors: ['time']
							}).then(async (collected) => {
								const lowercase = collected.first().content.toLowerCase()

								const url = collected.first().content
								const liens = [
									"https://",
									"http://",
									"https",
									"http"
								];
								if (!liens.some(word => url.includes(word))) {
									collected.first().delete()
									WASSIMLEMAITRE.delete()
									return message.channel.send("L'opération a été Annulée, vous devez spécifier un Lien !").then((mm) => mm.delete({
										timeout: 2500
									}))
								}


								collected.first().delete()
								WASSIMLEMAITRE.delete()
								embedbase.setURL(collected.first().content)
								msgg.edit(embedbase)
							}).catch(async (err) => {

								message.channel.send("**Désolé mais je ne peux pas modifier l'Url !**").then((mm) => mm.delete({
									timeout: 2500
								}));
							})
							break

						case "Supprimer l'url du titre":
							embedbase.setURL("htps://")
							msgg.edit(embedbase)
							break
						case "Supprimer l'image":
							embedbase.setImage("** **")
							msgg.edit(embedbase)
							break

						case "Modifier la couleur":
							let HEHEHHE = await message.channel.send("Quel **Couleur** voulez-vous attribuez à l'embed ?")

							message.channel.awaitMessages(filter, {
								max: 1,
								time: 60000,
								errors: ['time']
							}).then(async (collected) => {
								const lowercase = collected.first().content.toLowerCase()


								collected.first().delete()
								HEHEHHE.delete()
								embedbase.setColor(collected.first().content)
								msgg.edit(embedbase)
							}).catch(async (err) => {

								message.channel.send("**Désolé mais je ne peux pas modifier la Couleur !**").then((mm) => mm.delete({
									timeout: 2500
								}));
							})
							break

						case "Supprimer la couleur":
							embedbase.setColor("WASSIM")
							msgg.edit(embedbase)
							break



						case "Copier un embed":
							const channID = await message.channel.send("Quel est **le salon ou ce trouve le message à copier ?** (*ID*)");
							const channel_id = (await message.channel.awaitMessages(filterMessage, {
								max: 1,
								time: 60000
							})).first();
							channID.delete();
							channel_id.delete();
							if (!Number(channel_id.content) || !message.guild.channels.cache.get(channel_id.content)) return message.channel.send(`Aucun salon trouvé pour \`${channel_id.content}\``).then(msg => msg.delete({
								timeout: 5000
							}));
							const msgQuestionMessageID = await message.channel.send("Quel est **le message de l'embed à copier ?** (*Une ID*)");
							const message_id = (await message.channel.awaitMessages(filterMessage, {
								max: 1,
								time: 60000
							})).first();
							msgQuestionMessageID.delete();
							message_id.delete();
							if (!Number(message_id.content) || !message.guild.channels.cache.get(channel_id.content).messages.fetch(message_id.content)) return message.channel.send('Message Invalide').then(msg => msg.delete({
								timeout: 5000
							}));
							const msg = await message.guild.channels.cache.get(channel_id.content).messages.fetch(message_id.content);
							if (msg.embeds.length === 0) return message.channel.send("Ce message n'est pas un embed").then(msg => msg.delete({
								timeout: 50000
							}));
							if (msg.partial) {
								try {
									await msg.fetch()
								} catch {
									return
								}
							}
							msgg.edit({
								embed: msg.embeds[0].toJSON()
							})

							break


					}
				}

			})
		}
	}
}
