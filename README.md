
# WebCounter

To use this project you need to install the following on your computer (Tested on Ubuntu/Debian Linux):

* redis
* ansible
* nodejs
* npm
* typescript (npm install typescript)

To start the project locally:

```
npm install
tsc
node build/main.js
```

To deploy using ansible to a remote computer you need the following prerequisites:

Generate an ssh key to use:
```
cd ansible-deploy
ssh-keygen -t ed25519 -C "test@nodejswarsaw.com" -f "nodejswarsawdemo_ed25519"
```
(You want to use the public part of this .ssh key for the server or VPS you use for deploy.)


Modify the file ansible-deploy/hosts to point to the ip-address or DNS that your deploy server has:
```
[webcounter_server]
X.X.X.X
```

Replace X.X.X.X with your server.

Finally run the ansible script using this command:
```
cd ansible-deploy
ansible-playbook deploy_webcounter.yml -i hosts
```

You can re-run this command every time you want to update the deployment on your server.
