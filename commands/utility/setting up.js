import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('settingup')
        .setDescription('(roleplays only). The setting up command')
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers),
    async execute(interaction) {
        const user = interaction.user;

        const embed = new EmbedBuilder()
            .setTitle('MSCE| Setting up Announcement')
            .setDescription(`${user} is setting up the roleplay session being hosted. Early Access members may join early at the early access. Leaking the session would result in a server ban from MSCE.    `)
            .setFooter({
                text: 'MSCE',
                iconURL: 'https://cdn.discordapp.com/icons/1231857209852297226/03078bb2b94acbdc1436ddb4d995f90f.png?size=4096'
            });

        // Send the embed message to the channel
        const message = await interaction.channel.send({ content: '@everyone', embeds: [embed] });


        // Send an ephemeral confirmation message
        await interaction.reply({ content: 'Command Sent Below.', ephemeral: true });
    },
};
