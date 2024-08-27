const { AttachmentBuilder } = require('discord.js');
const { profileImage } = require('discord-arts');

module.exports = {
    name: 'ui',
    description: 'Displays detailed information about a user.',
    async execute(message, args) {
        try {
            // Check if a user was mentioned or use the message author
            const user = message.mentions.users.first() || message.guild?.members.cache.get(args[0])?.user || message.author;
            const member = message.guild ? await message.guild.members.fetch(user.id) : null; // Fetch member only if in a guild

            // Generate the profile image
            const imageBuffer = await profileImage(user.id, {
                borderColor: ['#0000ff', '#00fe5a'],
                presenceStatus: member?.presence?.status || 'offline',
                removeAvatarFrame: false
            });


            // Create attachment from the generated profile image
            const attachment = new AttachmentBuilder(imageBuffer, { name: 'userinfo-banner.png' });

            // Get top roles of the user (only relevant in a server)
            const roles = member?.roles.cache
                .sort((a, b) => b.position - a.position)
                .first(2)
                .map(role => role.name) // Use role names only
                .join(', ') || 'None';

            // Construct the message content with user information
            const userInfoMessage = [
                `**${user.username}'s Info**`,
                `👤 **User:** <@${user.id}>`,
                `🔤 **Username:** \`${user.username}\``,
                `🤖 **Bot:** ${user.bot ? 'Yes' : 'No'}`,
                message.guild
                    ? `📅 **Joined Server:** ${member.joinedAt.toDateString()}`
                    : `📅 **Joined Server:** Unknown`,
                message.guild
                    ? `🏷️ **Display Name:** ${member.displayName}`
                    : `🏷️ **Display Name:** Unknown`,
                message.guild
                    ? `🔝 **Top Roles:** ${roles}` // Role names here
                    : `🔝 **Top Roles:** Unknown`,
                `📆 **Joined Discord At:** ${user.createdAt.toDateString()}`,
                `🛡️ **Security:** ${member?.mfaEnabled ? 'MFA Enabled' : 'MFA Disabled'}`,
            ].filter(Boolean).join('\n - '); 

            // Send the message with the attachment
            await message.channel.send({ content: userInfoMessage , files: [attachment] });

        } catch (error) {
            console.error('Error executing userinfo command:', error);
            await message.reply('There was an error processing this command.');
        }
    },
};
