const { Sequelize } = require('sequelize');
const { db } = require('../');

// on our frontend form we keep track of the form state for
// registering/logging in a user by using an object like this
/* 

  const formFields = { username: '', password: '' }

*/

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      // min length
      len: [8, 20],
      // min complexity by certain types of character
      is: /^.*[^a-zA-Z0-9].*$/i,
      // not contains to make sure we don't end up with insecure passwords
    },
  },
});

const Post = db.define('post', {
  src: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      isUrl: true,
    },
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: true,
    // validate: {
    //   // we could write a custom validator to
    //   profanityFilter(value) {
    //     // does our value match a blacklist of unacceptable speech? if so return a useful value
    //   },
    // },
  },
});

const Tag = db.define('tag', {
  tagName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Tag.addHook('beforeCreate', (tag) => {
  // first let's check for a pound sign
  const isPound = tag.tagName.charAt(0) === '#';

  if (isPound) {
    return tag;
  }

  tag.tagName = '#' + tag.tagName;
  return tag;
});

// through tables
User.hasMany(Post);
Post.belongsTo(User);

Post.belongsToMany(Tag, { through: 'post_tags' });
Tag.belongsToMany(Post, { through: 'post_tags' });

module.exports = {
  User,
  Post,
  Tag,
};
