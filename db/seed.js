const { db } = require('./index');
const { User, Post, Tag } = require('./models');

const users = [
  { username: 'felix', password: 'imabunny$' },
  { username: 'wally', password: 'imaalligator&' },
  { username: 'albert', password: 'imaturtle%$#$%' },
];

const posts = [
  {
    src: 'https://www.actpower.com/wp-content/uploads/2020/07/nature-water-drops-of-water-liquid-40784.jpg',
    content: 'water droplets are so amazing',
  },
  {
    src: 'https://www.iucn.org/sites/dev/files/styles/850x500_no_menu_article/public/content/images/2020/shutterstock_1458128810.jpg?itok=sKSJDbYv',
    content: 'pastoral scene so amazing',
  },
  {
    src: 'https://images.pexels.com/photos/10918415/pexels-photo-10918415.jpeg?cs=srgb&dl=pexels-luke-robin-way-10918415.jpg&fm=jpg',
    content: 'serene seascape so amazing',
  },
];

const tags = [
  { tagName: '#oceanlife' },
  { tagName: '#nature' },
  { tagName: 'nohashtag' },
];

async function seed() {
  // do stuff
  try {
    await db.sync({ force: true });

    const createdPosts = [];
    const createdUsers = [];
    const createdTags = [];

    for (let i = 0; i < users.length; i++) {
      const currentUser = await User.create(users[i]);
      const currentPost = await Post.create(posts[i]);
      const currentTag = await Tag.create(tags[i]);

      await currentUser.addPosts(currentPost.id);

      createdPosts.push(currentPost);
      createdUsers.push(currentUser);
      createdTags.push(currentTag);
    }

    for (let i = 0; i < createdPosts.length; i++) {
      const post = createdPosts[i];
      if (i % 2 !== 0) {
        await post.addTags([...createdTags.filter((_, idx) => idx % 2 === 0)]);
      } else {
        await post.addTags([...createdTags.filter((_, idx) => idx % 2 === 1)]);
      }
    }

    await db.close();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

seed();
