const Service = require('../models/Service');
const Image = require('../models/Image');


module.exports = {
    async index(req, res) {
        const images = await Image.findAll();
 
         return res.json(images); 
     },

    async listImageForService(req, res){
        const { service_id } = req.params;

        const service = await Service.findByPk(service_id, {
            include: { association: 'images' }
        });

        return res.json(service);

    },

    async store(req,res){
        const { service_id } = req.params;
        const { url } = req.body;

        const service = await Service.findByPk(service_id);
        console.log(service);

        if(!service) {
            return res.status(400).json({ error: 'Service not found' });
        }       

        const image =  await Image.create({
            url,
            service_id            
        });

        return res.json(image);
    }
};