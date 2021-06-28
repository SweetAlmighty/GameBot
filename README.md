# GameBot
Discord application I created for a private gaming Server. Current runs on a personal EC2 instance with AWS.

## Development
To follow the development of this project, visit the Trello board [here](https://trello.com/b/wIj1KE92/gamebot).

## Winston
Winston is the name of the bot that users will interact with. 

### Commands
| Command |                                Description                              |      Parameters       | Required |  Example |
|  :---   |                                   :---                                  |         :---          |   :---   |    :---  |
|  !pick  |  Chooses a random game from the database. If a number of players is provided, the games to choose from will be filtered to support the amount of players. |     [# of players]    |    No    |   !pick / !pick 4 |
