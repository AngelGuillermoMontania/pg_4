const { Router } = require('express');
const { Roles, Users, BanckCards, Properties, Features, Photos ,Sellers,Buyers,Sales,Idstatus, Subscription} = require('../db')
const { getById } = require('../middlewares/usercreate.js')

const router = Router();

module.exports = router;

router.get('/', async (req, res) => {
    const users = await Users.findAll({
        include: [{ model: Roles }
            , {
                model: Sellers,
            include: { model: Properties, include: [{ model: Photos }, { model: Features }, { model: Idstatus }] }
        }
            , { model: BanckCards }
            , { model: Buyers, include: { model: Sales } }
            , { model: Subscription }
        ],
    });
    res.status(200).json(users)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    res.json(await getById(id))
})