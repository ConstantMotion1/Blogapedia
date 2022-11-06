const sequelize = require('../config/connection');
const { User, Blog } = require('../models');

const userData = require('./userdata.json');
const userBlog = require('./blog.json');

const seedDatabase = async () => {
    await sequelize.sync({ force:true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const blog of userBlog) {
        await Blog.create({
            ...blog,
            user_id: 1
        });
    }
    process.exit(0);
};

seedDatabase();