# Selfbot (discord.js-selfbot-v13)

This is a Discord selfbot written in JavaScript using discord.js-selfbot-v13. Use at your own risk. Selfbots are against Discord's Terms of Service and may lead to account termination.

## Requirements

- Node.js 18+
- A Discord user token (not a bot token)
- Optional: GROQ API key for LLM features

## Installation

```bash
git clone https://github.com/krishnassh/selfbot
cd selfbot
npm install
```

## Configuration

1. Copy the example environment file and fill in values:

```bash
cp .env.example .env
```

2. Edit `.env`:

- TOKEN="YOUR_DISCORD_TOKEN"
- GROQ_API_KEY="YOUR_GROQ_API_KEY" (optional, for `llm`)

Keep `.env` out of Git. It is already listed in `.gitignore`.

## Run

```bash
npm start
```

## Usage

- Prefix defaults to `$`. Example: `$help`, `$ping`.
- Use `help` to discover commands and categories at runtime: `$help`, `$help categories`, `$help <category>`, `$help <command>`.

## Commands

Commands are organized under `instructions/` by category. Below is a complete list by folder.

### admin

- activity
- banall
- bump
- bumpbreak
- delete
- kickall
- nuke
- purgeme
- spam
- status

### encoding

- b64dec
- b64enc
- bin
- encrypt
- hexdec
- hexenc
- unbin

### fun

- 8ball
- asciiart
- diceemoji
- flip
- joke
- quote
- randomfacts
- roast
- roll
- rpc

### llm

- llm

### math

- add
- div
- mul
- random
- sub

### text

- ascii
- camel
- charcount
- clap
- emojify
- expand
- kebab
- lower
- mock
- palindrome
- reverse
- rot13
- say
- shrink
- snake
- spoiler
- title
- upper
- uwu
- wordcount

### time

- countdown
- now
- remindme
- timer
- unixtime
- utc

### utility

- avatar
- color
- help
- lmgtfy
- ping
- prefix
- setprefix

### root (misc)

- choose
- compliment
- randompassword
- shuffle
- sort

## Development

- Lint: `npm run lint`
- Format: `npm run format`
