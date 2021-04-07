require('dotenv').config()
const Discord = require("discord.js")
const client = new Discord.Client()
const fetch = require('node-fetch')

client.on("ready", () => {
  console.log('User logged in')
})

client.on("message", msg => {
  if(msg.author.bot){
    return
  }

  if(msg.content === "$start"){
    getResponse().then(quote => msg.channel.send(quote))
  }
})

client.login(process.env.TOKEN)

function getResponse() {
  return fetch('https://zenquotes.io/api/random')
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data[0]['q'] + ' - ' + data[0]['a']
    })
}