# Instagram API

Let's build an instagram-like api clone!

# Getting started

`npm i` will install your express server, sequelize, and pg deps, as well as your dev deps including `nodemon`

from there, run the following cmd in your terminal to create your db:  
`$ createdb instagram-clone`

`node db/seed.js` will seed your database, and `npm run start` will launch your express server! to test, try the following curl command:

```bash
$ curl http://localhost:5500/api/users -H 'Content-Type:application/json' -d '{"username":"newUser","password":"@#$#aslashfienf"}'
```

curl is a cli client that lets you perform network requests just like postman, insomnia, and `axios / fetch` from the browser! (and other clients, there are tons of options ... :D)

# Extending the project

There are Tag and Post entities in our schema. How could you hook these up in RESTful routes to allow users to associate tags with posts, or fetch all the posts by a certain user, or even <em>follow other users</em> -- the sky's the limit y'all, there are a ton of cool magic methods you can leverage to make those instance-level associations happen!
