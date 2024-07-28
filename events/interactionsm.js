import { ButtonInteraction } from 'discord.js';

export default {
    name: 'interactionCreate',
    async execute(interaction) {
        // Check if the interaction is a ButtonInteraction
        if (!(interaction instanceof ButtonInteraction)) return;

        // Check if the custom ID matches the session ping button
        if (interaction.customId === 'startup') {
            // Check if the member already has the session role
            const hasRole = interaction.member.roles.cache.has('1246849915011862588');

            try {
                if (!hasRole) {
                    await interaction.member.roles.add('1246849915011862588'); // Add session role
                    await interaction.reply({
                        content: 'You have been granted the <@&1246849915011862588> role.',
                        ephemeral: true
                    });
                } else {
                    await interaction.member.roles.remove('1246849915011862588'); // Remove session role
                    await interaction.reply({
                        content: 'The <@&1246849915011862588> role has been removed from you.',
                        ephemeral: true
                    });
                }
            } catch (error) {
                console.error('Error handling interaction:', error);
                await interaction.reply({
                    content: 'There was an error while processing your request.',
                    ephemeral: true
                });
            }
        }
    },
};
