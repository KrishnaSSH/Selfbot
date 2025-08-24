### A Discord Userbot written in javascript using "discord.js-selfbot-v13"

### Using this might lead to a banned account! WE are NOT responsable of your actions

# Available Commands

`$📌bump`: Sends the /bump command immediately and starts sending it at random intervals.

`$⛔bumpbreak`: Stops sending the /bump command in the current channel.

`$🏓ping`: Responds with the latency in milliseconds.

`$🖼️avatar`: Shows the avatar of the specified user or your own avatar if no argument is provided.

`$🔨prefix`: Shows the current command prefix.

`$🛠️setprefix`: Sets a new command prefix.

`$🧹purgeme`: Deletes your messages from the channel.

`$💬llm`: Uses Groq API to process a question and replies with the answer.

`$🎮activity`: Allows you to set custom activities such as playing, listening, or streaming.

`$✂️rpc`: Plays rock paper scissors.

`$📢spam`: Sends a specified message a given number of times.

`$💥nuke`: Deletes all existing channels, creates new channels, and keeps pinging everyone in all the channels.

`$🗑️delete`: Deletes all channels and categories in the server.

`$🚫banall`: Bans all members that can be banned by the user in the server.

`$📵status`: Sets your Discord status. Usage: `$status set <online/dnd/invisible/idle>`.

`$🎱8ball`: Answers your yes/no questions with a random response.

`$👩‍💻encrypt`: Encrypt your messages. Usage: `$encrypt <msg>`.

# Instructions to Use

Edit .env.example to .env and add your discord token with the groq api for llm tasks

### NOTE: You will need a Groq api for llm functionality Get a free api key from [here](https://console.groq.com/keys)

# Installation

### Setup Nodejs

• Make Sure You Have [Nodejs](https://nodejs.org/en) installed on your machine
• Add the Nodejs to your environmental Variables

### Clone the Repository

```bash
git clone https://github.com/krishnassh/selfbot
```

### Change the directory

```bash
cd selfbot
```

### Installing Dependencies

```bash
npm install
```

### Executing The Script

```bash
npm start
```

# Usage

**📍 Usage:** Use `$help <command>` to get detailed information about a specific command.

## Development

- **Lint:** `npm run lint`
- **Format:** `npm run format`

Copy `.env.example` to `.env` and set `TOKEN` and `GROQ_API_KEY`.
