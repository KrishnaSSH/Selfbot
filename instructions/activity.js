const { ActivityType } = require('discord.js');

module.exports = {
    name: 'activity',
    description: 'Sets the bot\'s activity.',
    execute(message, args, config) {
        if (args.length < 2) {
            return message.reply(`❕ Usage: [prefix]activity <type> <activity>`);
        }

        const [typeArg, ...activityArgs] = args;
        const activityName = activityArgs.join(' ');

        let activityType;

        switch (typeArg.toLowerCase()) {
            case 'playing':
                activityType = ActivityType.Playing;
                break;
            case 'streaming':
                activityType = ActivityType.Streaming;
                break;
            case 'listening':
                activityType = ActivityType.Listening;
                break;
            case 'watching':
                activityType = ActivityType.Watching;
                break;
            case 'competing':
                activityType = ActivityType.Competing;
                break;
            case 'custom':
                activityType = ActivityType.Custom;
                break;
            default:
                return message.reply('❗ Invalid activity type. Valid types are: playing, streaming, listening, watching, competing, custom');
        }

        message.client.user.setPresence({
            activities: [{ name: activityName, type: activityType }],
        });

        message.reply(`✔ Activity set to: **${typeArg} ${activityName}**`);
    },
};