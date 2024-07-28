import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('carmeet')
        .setDescription('Sends a carmeet embed')
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .addIntegerOption(option =>
            option.setName('reactions')
                .setDescription('Amount of reactions for the session to occur')
                .setRequired(true)),
    async execute(interaction) {
        const reactions = interaction.options.getInteger('reactions');
        const user = interaction.user;

        const embed = new EmbedBuilder()
            .setTitle('MSCE| CarMeet Announcement')
            .setDescription(`Welcome, ${user}! is starting a carmmet. Before the carmeet commence you must follow all of the rules provided below.
                
                **__Startup Information__**
                > Read the information provided at <#1241193853613113375>, caught not following none of the rules would result in a server ban.
                > Leaking the carmeet would result in a perminate server ban from MSCE
                
                For the session to commence this message needs **__${reactions}__**.`)
            .setFooter({
                text: 'MSCE',
                iconURL: 'https://cdn.discordapp.com/icons/1231857209852297226/03078bb2b94acbdc1436ddb4d995f90f.png?size=4096'
            });

        // Send the embed message to the channel
        const message = await interaction.channel.send({ content: '@everyone', embeds: [embed] });

        // Add reaction to the embed message
        await message.react('✅');

        // Send an ephemeral confirmation message
        await interaction.reply({ content: 'Command Sent Below.', ephemeral: true });
    },
};
