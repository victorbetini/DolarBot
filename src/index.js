const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');
const config = require('./config.json');
const prefix = config.prefix;

const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 3
});

client.on('ready', () => {
    console.log(`${client.user.username} - READY!`);
    client.user.setActivity('$help - para ver comandos', { type: 'PLAYING' });
});

client.on('guildCreate', (guild) => {
    console.log(`${client.user.username} - foi adicionado em ${guild.name} | ${client.guilds.size}`);
})

client.on('message', async message => {
    if (message.content.startsWith(`${prefix}dolar`)) {
        try {
            axios.get('https://api.hgbrasil.com/finance?key=b38a1ead')
                .then(function (response) {
                    message.channel.send('Valor do Dolar (USD): ``' + formatter.format(response.data.results.currencies.USD.buy) + "``");
                    console.log(response.data.results.currencies.USD.buy);
                });
        } catch (err) {
            message.channel.send('Erro!');
        }
    }

    if (message.content.startsWith(`${prefix}euro`) || message.content.startsWith(`${prefix}eur`)) {
        try {
            axios.get('https://api.hgbrasil.com/finance?key=b38a1ead')
                .then(function (response) {
                    message.channel.send('Valor do Euro (EUR): ``' + formatter.format(response.data.results.currencies.EUR.buy) + "``");
                });
        } catch (err) {
            message.channel.send('Erro!');
        }
    }

    if (message.content.startsWith(`${prefix}bitcoin`) || message.content.startsWith(`${prefix}btc`)) {
        try {
            axios.get('https://api.hgbrasil.com/finance?key=b38a1ead')
                .then(function (response) {
                    message.channel.send('Valor do Bitcoin (BTC): ``' + formatter.format(response.data.results.currencies.BTC.buy) + "``");
                });
        } catch (err) {
            message.channel.send('Erro!');
        }
    }

    if (message.content.startsWith(`${prefix}cad`) || message.content.startsWith(`${prefix}dolar canadense`)) {
        try {
            axios.get('https://api.hgbrasil.com/finance?key=b38a1ead')
                .then(function (response) {
                    message.channel.send('Valor do Dolar Canadense (CAD): ``' + formatter.format(response.data.results.currencies.GPB.buy) + "``");
                });
        } catch (err) {
            message.channel.send('Erro!');
        }
    }

    if (message.content.startsWith(`${prefix}libra`)) {
        try {
            axios.get('https://api.hgbrasil.com/finance?key=b38a1ead')
                .then(function (response) {
                    message.channel.send('Valor da Libra (GBP): ``' + formatter.format(response.data.GBP.bid) + "``");+
                });
        } catch (err) {
            message.channel.send('Erro!');
        }
    }

    if (message.content.startsWith(`${prefix}help`)) {
        try {

            let helpEmbed = new Discord.MessageEmbed()
                .setColor('#0099f1')
                .setAuthor('Ajuda - Dolar Bot', 'https://i.imgur.com/uC0S146.jpg', '')
                .addFields(
                    { name: '$dolar', value: 'Mostra a cotação do dolar atual' },
                    { name: '$euro', value: 'Mostra a cotação do euro atual' },
                    { name: '$bitcoin', value: 'Mostra a cotação do bitcoin atual' },
                    { name: '$cad', value: 'Mostra a cotação do dolar canadense atual' },
                    { name: '$libra', value: 'Mostra a cotação da libra atual' },
                )
                .setFooter(client.user.username + ' - powered by: https://docs.awesomeapi.com.br/',
                    'https://gblobscdn.gitbook.com/spaces%2F-LDDJfbHDy3v965nUzNO%2Favatar.png?generation=1527103896608667&alt=media');

            message.channel.send(helpEmbed);

        } catch (err) {
            message.channel.send('Erro!');
        }
    }
});

client.login(process.env.token);
