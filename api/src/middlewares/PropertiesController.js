const { Properties, Features, Photos } = require('../db')
const { Op } = require("sequelize")
const {
    getById,
    addfeatures,
    setfeatures
} = require('../middlewares/usercreate.js')
const getProperties = async (id, cost, address, city, state, country, cp, lease, propertyType, search) => {
    try {
        let respProperties;
        let filterSearch = {};
        if (id || cost || address || city || state || country || cp || lease || propertyType || search) {

            if (search) {
                filterSearch = {
                    [Op.or]: [{
                        address:
                            { [Op.iLike]: `%${search}%` }
                    },
                    {
                        city:
                            { [Op.iLike]: `%${search}%` }
                    },
                    {
                        state:
                            { [Op.iLike]: `%${search}%` }
                    },
                    {
                        country:
                            { [Op.iLike]: `%${search}%` }
                    },
                    ]
                };
            }

            id ? filterSearch.id = id : null;
            cost ? filterSearch.cost = { [Op.lte]: parseInt(cost) } : null;
            cp ? filterSearch.cp = cp : null;
            lease ? filterSearch.lease = lease : null;
            propertyType ? filterSearch.propertyType = propertyType : null;
            address ? filterSearch.address = { [Op.iLike]: `%${address}%` } : null;
            state ? filterSearch.state = { [Op.iLike]: `%${state}%` } : null;
            city ? filterSearch.city = { [Op.iLike]: `%${city}%` } : null;
            country ? filterSearch.country = { [Op.iLike]: `%${country}%` } : null;


            respProperties = await Properties.findAll({
                //logging: console.log,
                include: [{ model: Features }, { model: Photos }],
                where: filterSearch
            });
        } else {
            respProperties = await Properties.findAll({ include: [{ model: Features }, { model: Photos }] })
        }
        return respProperties;

    } catch (error) {
        console.log("Ocurrio un error en PropertiesController/ getProperties:" + error);
    }
};

const fillProperties = async (req, res) => {
    try {
        let { description, features, m2, address, city, state, country, cost, cp, lease, propertyType } = req.body;
        let newProperty = await Properties.create({
            description,
            m2,
            address,
            city,
            state,
            country,
            cost,
            cp,
            lease,
            propertyType,
        });

        features.forEach(async element => {
            const propFeature = await Features.findAll({
                where: { name: element.name },
            });

            newProperty.addFeatures(propFeature, { through: { value: element.value } });
        });
        res.send({message:"Propiedad creada con éxito",id:newProperty.id});
    } catch (error) {
        console.log(error.message);
    }
};

const fillPhotos = async (data,id) => {
  try {
    let newPhoto = await Photos.create({
      photos: data,
      propertyId:id
    });
  } catch (error) {
    console.log(error.message);
  }
};

const updateProperties = async (values, id) => {
    await Properties.update(values, {
        where: {
            id
        }
    })
}

const addassociations = async (features, id) => {
    const propUpdate = await getById(id)
    if (features.length > 0) {
        await addfeatures(features, propUpdate)
    }
}

const setassociations = async (features, id) => {
    const propUpdate = await getById(id)
    if (features.length > 0) {
        await setfeatures(features, propUpdate)
    }
}

module.exports = {
    getProperties,
    updateProperties,
    addassociations,
    setassociations,
    fillProperties,
    fillPhotos,
};