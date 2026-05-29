
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

//  required commands 
const commands = [
    {
        name: 'ppcreateuser',
        description: ' Create a new user',
        options: [
            { name: 'name', description: 'User name', type: 3, required: true },
            { name: 'email', description: 'User email', type: 3, required: true },
            { name: 'password', description: 'User password', type: 3, required: true }
        ]
    },
    {
        name: 'ppgetuser',
        description: ' Get user details by email',
        options: [
            { name: 'email', description: 'Enter user email', type: 3, required: true }
        ]
    },
    {
        name: 'ppcreateservice',
        description: ' Create a new service',
        options: [
            { name: 'servicename', description: 'Name of the service', type: 3, required: true },
            { name: 'price', description: 'Price of the service', type: 3, required: true }
        ]
    }
];

client.once('ready', async () => {
    console.log(` Discord Bot Logged in as ${client.user.tag}`);
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);
    try {
        await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: commands });
        console.log(' All 3 Assignment Slash Commands Registered!');
    } catch (error) {
        console.error(error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    await interaction.deferReply(); 

    try {
        if (interaction.commandName === 'ppcreateuser') {
            const name = interaction.options.getString('name');
            const email = interaction.options.getString('email');
            const password = interaction.options.getString('password');

            //  URL ko requirement  '/api/v1/auth/signup' 
            const response = await fetch('http://localhost:3000/api/v1/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await response.json();
            
            if (response.ok) interaction.editReply(` User Created! Token: ${data.token}`);
            else interaction.editReply(` Error: ${data.message}`);
        }

        else if (interaction.commandName === 'ppgetuser') {
            const email = interaction.options.getString('email');
            const response = await fetch(`http://localhost:3000/api/v1/auth/user/${email}`);
            const data = await response.json();

            if (response.ok) interaction.editReply(` **User Details:**\nName: ${data.user.name}\nEmail: ${data.user.email}`);
            else interaction.editReply(` User not found!`);
        }

        else if (interaction.commandName === 'ppcreateservice') {
            const serviceName = interaction.options.getString('servicename');
            const price = interaction.options.getString('price');
            
            const response = await fetch('http://localhost:3000/api/v1/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: serviceName, price })
            });
            
            if (response.ok) interaction.editReply(` Service **${serviceName}** created successfully!`);
            else interaction.editReply(` Error creating service.`);
        }
    } catch (error) {
        interaction.editReply(' Backend API Error. Ensure server is running.');
    }
});

const startBot = () => client.login(process.env.DISCORD_BOT_TOKEN).catch(console.error);
module.exports = { startBot, client };