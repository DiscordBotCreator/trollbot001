const Discord = require('discord.js');
const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")

const adapter = new FileSync("database.json");
const db = low(adapter);

db.defaults({ histoires: []})
    .write()

var bot = new Discord.Client();

var prefix = ('p$');

var randnum = 0

var storynumber = db.get('histoires').map("story_value").value();

bot.on('ready', () => {
    bot.user.setPresence({ game: { name: `[p$aide]. Je suis un troll`, type: 0}})
    console.log("Fonctionnel.");
});

bot.login("NDYyNjU2OTM3NTc4OTg3NTMx.DhlCbQ.un_wQ5qXZRpnnNkyiYUkxdWwjjk");

bot.on('message', message => {
    if (message.content === prefix + 'ping'){
        message.reply("Pong 🏓");
        console.log("Je joues au tennis de table.")
    }

    if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()){

        case "new":
        var value = message.content.substring(6);
        var author = message.author.id;
        //var number = db.get('histoires').map('id').value();
        console.log(value);
        message.reply("Ajouté")

        db.get('histoires')
            .push({ story_value: value, story_author: author})
            .write();
        break;

        case "tell":

        story_random();
        console.log(randnum);

        var story = db.get(`histoires[${randnum}].story_value`).toString().value();
        var author_story = db.get(`histoires[${randnum}].story_author`).toString().value();
        console.log
    }
    if (message.content === prefix + "aide"){
        var help_embed = new Discord.RichEmbed()
            .setColor('#D2Fe53')
            .addField("Liste des commandes du bot :", 'Supair')
            .addField('-p$aide : ', 'Affiche cette page. Logique, hein ?')
            .addField('-p$ping :', 'Pong 🏓 !')
            .setFooter("Aide finie")
        message.channel.send(help_embed);
        console.log('Aide Ouverte.');
    }



});

function storyrandom(min, max) {
    min = Math.ceil(1);
    max = Math.floor(storynumber - 1);
    randnum = Math.floor(Math.random * (max - min + 1) + min);
} //Plus tard
//
//
