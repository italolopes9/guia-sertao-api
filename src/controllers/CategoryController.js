const Category = require('../models/Category');
const { update } = require('../models/Category');

const { ImageUtil } = require('../utils')


module.exports = {
    async index(req, res) {
       const categories = await Category.findAll();

        return res.json(categories); 
    },

    async store(req, res) {
        const { name } = req.body;
        let { icon } = req.body;
        
        if (icon) {
             icon = await ImageUtil.saveLocal(
                { name, avatar: icon, url:process.env.URL, type: "category" }
            );
        }

        const category = await Category.create({ name, icon });

        return res.json(category);
    },

    async deleteForId(req, res) {
        const { id } = req.params;

        const categoryId = await Category.findByPk(id);
        
        if(!categoryId) {
            return res.status(400).json({ error: 'Category not found' });
        }

        await Category.destroy({ where: { id: id}});

        return res.send('Category was deleted successfully!');
    },

    async deleteAll(req, res) {

        await Category.destroy({
            where: {},
            truncate: false
        });

        return res.send('All Categories was deleted successfully!');
    },

    async update(req, res) {
        const { id } = req.params;
        const { name, icon } = req.body;

        const categoryId = await Category.findByPk(id);
        
        if(!categoryId) {
            return res.status(400).json({ error: 'Category not found' });
        }

        await Category.update(
            { name: name, icon },
            { where: { id: id } }
        ); 

        return res.send('Category was updated successfully!')
        
    },
    

    


    

};