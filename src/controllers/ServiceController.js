const User = require('../models/User');
const Service = require('../models/Service');
const Category = require('../models/Category');
const Image = require('../models/Image');

const { ImageUtil } = require('../utils')


module.exports = {
    async index(req, res) {
        const services = await Service.findAll();

        return res.json(services);
    },

    async listServiceForUser(req, res) {
        const { user_id } = req.params;

        const user = await User.findByPk(user_id, {
            include: { association: 'services' }
        });

        return res.json(user);

    },
    async listServiceForCategory(req, res) {
        const { category_id } = req.params;

        const category = await Category.findByPk(category_id, {
            include: { association: 'categories' }
        });

        return res.json(category);

    },

    async store(req, res) {
        const { user_id } = req.params;
        const { category_id } = req.body;
        const { title, description, eventdate, phone, address, images } = req.body;
        let imagesToSave = [];

        const user = await User.findByPk(user_id);
        const category = await Category.findByPk(category_id);

        if (!user) {
            return res.status(400).json({ error: 'User no found' });
        }
        else if (!category) {
            return res.status(400).json({ error: 'Category no found' });
        }

        if (images) {
            imagesToSave = await Promise.all(images.map(async (image) => {
                return await ImageUtil.saveLocal(
                    { name: title, avatar: image, url:process.env.URL, type: "service" }
                )
            }));

        }
        console.log(imagesToSave);


        const service = await Service.create({
            title,
            description,
            eventdate,
            phone,
            address,
            user_id,
            category_id

        });

        await Promise.all(imagesToSave.map(async (image) => {
            await Image.create({
                service_id: service.id,
                url: image
            })
        }));


        return res.json(service);
    }
};