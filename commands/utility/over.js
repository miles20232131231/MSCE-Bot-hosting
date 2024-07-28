import { SlashCommandBuilder } from '@discordjs/builders';
import { EmbedBuilder, PermissionFlagsBits, PermissionsBitField } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('over')
        .setDescription('Purges messages from today between specified start and end times.')
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .addStringOption(option =>
            option.setName('start-time')
                .setDescription('Start time in HH:MM format')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('end-time')
                .setDescription('End time in HH:MM format')
                .setRequired(true)),
    async execute(interaction) {
        const startTime = interaction.options.getString('start-time');
        const endTime = interaction.options.getString('end-time');
        
        // Get today's date and set the time for start and end
        const now = new Date();
        const start = new Date(now);
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        start.setHours(startHours, startMinutes, 0, 0);
        
        const end = new Date(now);
        const [endHours, endMinutes] = endTime.split(':').map(Number);
        end.setHours(endHours, endMinutes, 0, 0);

        // Fetch messages from the channel
        const messages = await interaction.channel.messages.fetch({ limit: 100 });

        // Filter messages from today between the specified times
        const messagesToDelete = messages.filter(msg => {
            const msgDate = new Date(msg.createdTimestamp);
            return msgDate >= start && msgDate <= end;
        });

        // Delete the filtered messages
        await interaction.channel.bulkDelete(messagesToDelete);

        // Create an embed with the details
        const embed = new EmbedBuilder()
            .setTitle('Msce| Concluded Announcement.')
            .setDescription(`Thank you for joining the MSCE session hosted by <@${interaction.user.id}>. Your participation is valued, and we're excited to have you with us. We hope you had an enjoyable experience throughout the event.

__**Session Details:**__

Host: <@${interaction.user.id}>
Start Time: ${startTime}
End Time: ${endTime}

Your presence contributes to making this session a success. Let's make it a memorable event together! `)
            .setFooter({
                text: 'MSCE',
                iconURL: 'https://cdn.discordapp.com/icons/1231857209852297226/03078bb2b94acbdc1436ddb4d995f90f.png?size=4096'
            });

        // Send the embed to the channel
        await interaction.channel.send({ embeds: [embed] });

        // Send an ephemeral confirmation message
        await interaction.reply({ content: 'Command sent below.', ephemeral: true });
    },
};
