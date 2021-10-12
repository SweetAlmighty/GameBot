# GameBot
Discord application I created for a private gaming Server. Current runs on a personal EC2 instance with AWS.

## Development
To follow the development of this project, visit the Trello board [here](https://trello.com/b/wIj1KE92/gamebot).

## Packages
- [Discord.js](https://www.npmjs.com/package/discord.js)
- [Jest](https://www.npmjs.com/package/jest)

## Winston
Winston is the name of the bot that users will interact with. 

## Commands
| Command |                                Description                              |      Parameters       | Required |  Example |
|  :---   |                                   :---                                  |         :---          |   :---   |    :---  |
|  !pick  |  Chooses a random game from the database. If a number of players is provided, the games to choose from will be filtered to support the amount of players. |     [# of players]    |    No    |   !pick / !pick 4 |
|  !list  |  Returns all games listed in the database. If a number of players is provided, the listed games will be filtered to support the amount of players. |     [# of players]    |    No    |   !list / !list 4 |

## Steps to run
Currently, the bot is running on an EC2 instance, and must be uploaded to the instance and started manually. The steps to do are as follows:

### Creating a new instance

1. Launch an EC2 instance through the launch instance wizard
	1. Choose the following AMI "Ubuntu Server 18.04 LTS (HVM), SSD Volume Type - ami-0747bdcabd34c712a"
	2. Choose the t2.micro instance type.
	3. If you have an existing Key Pair, assign it to the new instance, otherwise create a new Key Pair.
		1. Make sure to download this Key Pair, as it will be needed soon.
2. You'll need to update the permissions on the Key Pair (.pem) file before we can continue. Run the following commands in PowerShell (or the appropriate substitutes in a different command line interface), replacing "./path/to/keypair.pem" with the path to your .pem file.
	```
	icacls.exe "./path/to/keypair.pem" /reset
	icacls.exe "./path/to/keypair.pem" /GRANT:R "$($env:USERNAME):(R)"
	icacls.exe "./path/to/keypair.pem" /inheritance:r
	```
3. Using the newly updated pem file, we're going to ssh into the new EC2 instance.
	1. `ssh -i "./path/to/keypair.pem" ubuntu@12.34.567.890`
	2. Make sure to replace the path with the correct path to your file, and replace 12.34.567.890 with the public IPv4 address of the new EC2 instance (viewable in the AWS EC@ console by selecting the instance).
4. Run the following commands to set up the instance to run the bot:
	```
	sudo apt-get update
	sudo apt-get install nodejs
	sudo apt-get install npm
	sudo npm install -g pm2
	```
5. Clone the GameBot repository.
6. cd into the GameBot directory, and run npm install
7. cd back to the root directory, and run pm2 startup systemd
8. Copy the last line of this command and run it.
	1. Running this command will ensure pm2 will start up on boot, in case your EC2 instance is rebooted.
9. Run `pm2 start ./GameBot/index.js`
10. The bot shoudl now be running.

### Updating an existing instance

1. Run the following command:
	1. `ssh -i "./path/to/keypair.pem" ubuntu@12.34.567.890`
	2. Make sure to replace the path with the correct path to your file, and replace 12.34.567.890 with the public IPv4 address of the new EC2 instance (viewable in the AWS EC@ console by selecting the instance).
2. Run pm2 kill to stop the bot from running.
3. cd into the GameBot directory.
4. Run `git pull` to make sure the local repo is up to date.
5. Run `pm2 start ./GameBot/index.js`
