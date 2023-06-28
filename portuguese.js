const { Client, IntentsBitField } = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const dotenvFilePath = path.resolve(__dirname, '.env');

const BW = [">reset", ">iq"]; // words to ignore
var cachee1 = fs.readFileSync("cache.txt")
var cachee = JSON.parse(cachee1)

const howAreYou = ["good", "bad", "amazing", "the worst ive ever been"]; // what it should say when you say how are you
const doYou = ["yes", "no"]; // what it should say when you ask a question
const whatIs = ["its ", "i think its not "]; // what it should say when you ask what whats etc
const when = ["never", "now", "ill make it happen now", "nah man never"]; // what it should say when you ask when
const stop = ["no", "ok"]; // what it should say when you say stop
const who = ["they are probably ", "maybe they are ", "they are "];  // what it should say when you ask who
const where = ["in ", "not in "] // what it should say when you ask where

const ownerID = "" // put your userid here
const channelID = "" // put your channel id where the bot will message
const serverID = "" // put your server id here

const messageLength = 123 // how long your message can be before it ignores it
const banPings = true // if it should ban pings (aka if you ping the anyone in the bot channel itll ignore you so it doesnt ping back)

require('dotenv').config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.DirectMessages,
    ]
})

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

// env shit
function updateEnvVariable(variable, newValue) {
    return new Promise((resolve, reject) => {
      fs.readFile(dotenvFilePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading dotenv file:', err);
          reject(err);
          return;
        }
  
        const lines = data.split('\n');
        let updatedData = '';
  
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
  
          if (line.startsWith(variable + '=')) {
            const value = newValue !== undefined ? newValue.toString() : '';
            updatedData += `${variable}=${value}\n`;
          } else {
            updatedData += line + '\n';
          }
        }
  
        // Write the updated contents back to the dotenv file
        fs.writeFile(dotenvFilePath, updatedData, 'utf8', (err) => {
          if (err) {
            console.error('Error writing to dotenv file:', err);
            reject(err);
            return;
          }
  
          resolve();
        });
      });
    });
}


// chat bot code
async function chatBotter(message, hashtag) {
    const msg = message.content.split(" ")
    if(message.content.substring(0,1) !== "$") {
        if(message.content.substring(0,1) !== "?") {
        if(message.content.toLowerCase().includes("pls remember ")) {
            message.reply("ok")
            updateEnvVariable('INMIND', '"' + message.content.substring(13) + '"')
            process.env.INMIND = '"' + message.content.substring(13) + '"'
            return
        }
        if(message.content.toLowerCase().includes("did you remember")) {
            message.reply("yeah you said " + process.env.INMIND.toString())
            return
        }
        if(message.content.toLowerCase().includes(" or ")){
            const questions = message.content.toLowerCase().split(" or ")
            const answer = questions[Math.floor(Math.random() * questions.length)].replace("@", "[at]")
            message.reply("i pick " + answer)
            return
        }
        if(message.content.toLowerCase().includes("say") && Math.floor(Math.random() * 4) < 2) {
            const re = ('"' + message.content.substring(4) + '" - ' + message.author.username + " (stupid head)").replace("@", "[at]")
            message.reply(re)
            return
        }
        if(message.content.toLowerCase().includes("why")){
            message.reply("because " + cachee[Math.floor(Math.random() * cachee.length)]); return
        }
        if(message.content.toLowerCase().includes("where")){
            message.reply(where[Math.floor(Math.random() * where.length)] + cachee[Math.floor(Math.random() * cachee.length)]); return
        }
        if(message.content.toLowerCase().includes("how are you")){ message.reply(howAreYou[Math.floor(Math.random() * howAreYou.length)]) 
            return
        } else if(message.content.toLowerCase().includes("how many")) {
            let nr = Math.floor(Math.random() * 420)
            if(Math.random() < 0.5) {
            } else {
                nr = nr * -1
            }
            message.reply(nr.toString())
            return 
        } else if(message.content.toLowerCase().includes("will") || message.content.toLowerCase().includes("do you") || message.content.toLowerCase().includes("did you") || message.content.toLowerCase().includes("are you") || message.content.toLowerCase().includes("is") && message.content.toLowerCase().includes("when") !== true && message.content.toLowerCase().includes("what") !== true && message.content.toLowerCase().includes("who") !== true) {
            message.reply(doYou[Math.floor(Math.random() * doYou.length)])
            return
        } else if(message.content.toLowerCase().includes("what is") || message.content.toLowerCase().includes("whats") || message.content.toLowerCase().includes("what's")) {
            message.reply(whatIs[Math.floor(Math.random() * whatIs.length)] + cachee[Math.floor(Math.random() * cachee.length)])
            return
        } else if(message.content.toLowerCase().includes("when")){
            message.reply(when[Math.floor(Math.random() * when.length)])
            return
        } else if(message.content.toLowerCase().includes("stop")){
            message.reply(stop[Math.floor(Math.random() * stop.length)])
            return
        } else if(message.content.toLowerCase().includes("who ")){
            message.reply(who[Math.floor(Math.random() * who.length)] + cachee[Math.floor(Math.random() * cachee.length)])
            return
        } else if(message.content.includes("?")) {
            message.reply(doYou[Math.floor(Math.random() * doYou.length)])
            return 
        } }
    if(message.content.substring(hashtag) !== "" && message.content.substring(hashtag).includes('"') !== true && message.content.substring(hashtag).includes("\u005C") !== true) {
        var wordss = BW.every((item) => {return item!=message.content.substring(23)})
        if(message.content.substring(0) !== ">iq" && message.content.substring(0) !== ">reset" && msg[0] !== ">changelog"){
        if(cachee.includes(message.content.substring(hashtag))){
            
        } else {
            if(message.content.substring(messageLength) === "") { /// message length === 123
                if(message.content.substring(hashtag).includes("<@") && message.content.substring(hashtag).includes(">") && banPings === true || message.content.substring(hashtag).includes("@everyone") && banPings === true || message.content.substring(hashtag).includes("@here") && banPings === true) {} else {
                var randomness = Math.floor(Math.random() * 6)
                if(randomness === 1) {const reply = cachee[Math.floor(Math.random() * cachee.length)]; 
                    
                    cachee.push(message.content.substring(hashtag, 146) + " " + reply) } else
                   
        cachee.push(message.content.substring(hashtag, 146)) 
        fs.unlinkSync("cache.txt") // save
        var cachear = '"hi"'
        for(i = 1; i < cachee.length; i++){
          var cachear = cachear + ',"' + cachee[i] + '"'
        }
        fs.writeFileSync("cache.txt", '[' + cachear.toString() + ']') } } }  
        let reply = cachee[Math.floor(Math.random() * cachee.length)];
        if(Math.floor(Math.random() * 4) < 1) {
            reply = reply.toUpperCase()
        }
        if(Math.floor(Math.random() * 4) < 1) {
            reply = reply.toLowerCase()
        }
        if(message.content.substring(123) !== "" && message.author.id !== ownerID) { /// message length === 123
            message.reply("fuck you")
        } else {
            if(banPings === true){
            if(message.content.substring(hashtag).includes("<@") && message.content.substring(hashtag).includes(">")) {
                const ip = Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255)
                message.reply(ip)} else { if( message.content.substring(hashtag).includes("@everyone") || message.content.substring(hashtag).includes("@here")){
                    const ip = Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255)
                    message.reply("fuck you " + ip)} else {
        message.reply(reply); } } } } }
                    } else { message.reply(reply) }
    if(message.content.substring(0) === ">reset") {
        if(message.author.id === ownerID) {
        message.reply("**i forgor**")
        fs.unlinkSync("cache.txt") // reset
        fs.writeFileSync("cache.txt", '["hi"]') } else {
            message.reply("ping the bot hoster instead") // you can put your own name
        }
    }
    if(message.content.substring(0) === ">iq") {
        message.reply("**I have " + cachee.length + " IQ.**")
    }
    }
}

client.on('ready', (c) => {
    client.channels.cache.get(channelID).send("the bird has appeared, stick is NOT hot")
})
 
client.on('messageCreate', async (message) => {
    if(message.author.id !== client.user.id) {
        const msg = message.content.split(" ")

        if(msg[0] === ">changelog") {
            if(message.author.id === ownerID) {
              message.reply("Set the changelog to " + message.content.substring(11))
              fs.writeFileSync("changelog.txt", `Changelog: \n` + message.content.substring(11), 'utf8')
            }
        }

        if(message.channel.id == channelID){
            if(message.content.substring(0,1) !== "?"){
            chatBotter(message, 0) } else {
                chatBotter(message, 1)
            }
        }

       // if(message.content.toLowerCase().includes("portu") || message.content.toLowerCase().includes("portugeese") || message.content.toLowerCase().includes("porter") || message.content.toLowerCase().includes("portugoose")) {
        //    if(message.channel.id !== "1121497162954571827"){
        //    message.reply("<:portu:1064955879176290394>") }
       //}
       // add this if you want, it sends an emoji if you say specific messages

        const guildId = serverID
        const guild = client.guilds.cache.get(guildId)
        let commands


        if(guild) {
            commands = guild.commands
        } else {
            commands = client.application?.commands
        }

        commands?.create({
            name: 'changelog',
            description: 'Bot changelog.',
})
    }
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return
    }

    const { commandName, options } = interaction
    if (commandName === "changelog") {  
        const changeLog = fs.readFileSync("changelog.txt")
        interaction.reply({
            content: changeLog.toString(),
            ephemeral: false,
        })
    }
})

client.login(process.env.TOKEN)