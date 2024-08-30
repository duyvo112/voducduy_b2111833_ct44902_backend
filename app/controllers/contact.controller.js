const ApiError = require('../api-error');
const ContactService = require('../services/contact.service');
const MongoDB = require('../utils/mongodb.util');
exports.create = async (req, res, next) => {
    // Validate request
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    // Save contact in the database
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        res.json(document);
    } catch (error) {
        return next(new ApiError(500, "An error occurred while creating the contact"));
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, "An error occurred while retrieving contacts"));
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving contact with id=${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
   const {id} = req.params;
   const payload = req.body;
   try {
    if(!id)
        return next(new ApiError(400,"Id can not be empty"));
    if(Object.keys(payload).length === 0)
        return next(new ApiError(400,"Data to update can not be empty"));
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.update(id,payload);
    if(!document)
        return next(new ApiError(404,"Contact not found"));
    res.json(document);
   } catch (error) {
    return next(new ApiError(500,"An error occurred while updating the contact"));
   }
};

exports.delete = async (req,res,next)=>{
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if(!document)
            return next(new ApiError(404,"Contact not found"));
        return res.send({message:"Contact was deleted successfully"});
    } catch (error) {
        return next(new ApiError(500,"An error occurred while deleting the contact"));
    }   
};

exports.deleteAll = async (req,res,next)=>{
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.deleteAll();
        return res.send({message:`${document} contacts were deleted successfully`});
    } catch (error) {
        return next(new ApiError(500,"An error occurred while deleting all contacts"));
    }
};

exports.findAllFavorite = async (req,res,next)=>{
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findFavorite();
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500,"An error occurred while retrieving favorite contacts"));
    }
};