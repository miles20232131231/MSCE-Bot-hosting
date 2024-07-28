import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('cohost')
        .setDescription('Sends the cohost command')
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers),
    async execute(interaction) {
        const user = interaction.user;

        const embed = new EmbedBuilder()
            .setTitle('MSCE| Cohost Announcement')
            .setDescription(`${user} is cohosting the session being hosted.`)
            .setFooter({
                text: 'MSCE',
                iconURL: 'https://cdn.discordapp.com/icons/1231857209852297226/03078bb2b94acbdc1436ddb4d995f90f.png?size=4096'
            });

        // Send the embed message to the channel
        const message = await interaction.channel.send({embeds: [embed] });

        // Send an ephemeral confirmation message
        await interaction.reply({ content: 'Command Sent Below.', ephemeral: true });
    },
};
