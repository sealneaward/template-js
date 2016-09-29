# template-js
This repository holds the UOIT 3700 Database Management Systems template server that connects to a MySQL database and acts as an external API.

# Setup
- [Windows](#windows-setup)
- [Linux](#linux-setup)
- [Webstorm Setup](#webstorm-ide-setup)
- [Running Project](#run-project)
- [Testing Project](#testing)
- [Running Project Without Testing](#without-testing)
- [Additional Styling](#styling)

# Windows Setup
- Install git [if not already installed](https://git-scm.com/download/win)
- Clone project *run in cmd as admin*
```
git clone https://github.com/sealneaward/template-js
```
- Install [Node.JS](https://nodejs.org/en/download/)
- Install dependencies *run in cmd as admin in project folder*
```
npm install
```
- Install [MySQL](http://dev.mysql.com/downloads/installer/)
- When installing, make sure to include the MySQL Workbench in the installation

### MySQL Database Setup
- TODO
- When creating a database, make sure to create a database with the following info

| Database       | Username           | Password  |
| ------------- | ------------- | ----- |
| template    | root | root |

# Linux Setup
- Install git if not already installed
```
sudo apt-get install git
```
- Clone project
```
git clone https://github.com/sealneaward/template-js
```
- Install Node.JS
```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
```
- Install dependencies *run in project folder*
```
sudo npm install
```
- Install MySQL
```
sudo apt-get install mysql-server mysql-workbench
```

### MySQL Database Setup
- TODO
- When creating a database, make sure to create a database with the following info

| Database       | Username           | Password  |
| ------------- | ------------- | ----- |
| template    | root | root |

# Webstorm IDE Setup
- download and install [Webstorm](https://www.jetbrains.com/webstorm/)
- you can get a free license from JetBrains if you are a [student](https://www.jetbrains.com/student/)
- to configure the IDE to accept ECMAScript 6 javascript go to `File > Settings > Frameworks & Languages > Javascript` and select *ECMAScript 6* in the dropdown

![Language Setup](img/ECMA.png)

### Webstorm Debugging
- click on the dropdown arrow ![Arrow](img/arrow.png) and select edit configurations
- add a Node.JS configuration with the following settings

![Configuration Setup](img/configuration.png)


# Run Project
- first populate database *run in project folder*
```
npm run populate
```
- run the web server
```
npm run start
```
- to visit the page, go [here](localhost:3000)
### Testing
- this can be ignored if you don't care about testing
- HINT: group collaboration is made much easier and your code is easier to understand with tests
```
npm run test
```
### Without Testing
- this repo does mandatory testing on all commits
- to ignore automated testing, commites can be made by
```
git add {files}
git commit -n -m "commit message here"
git push
```

# Styling
I used materialize css to pretty much all of the styling in the pug/jade files.
It has really good documentation on how to work with the css file and has all the examples you could ever think of.
[MaterializeCSS](http://materializecss.com/)