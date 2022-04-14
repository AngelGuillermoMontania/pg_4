const { Calendar,Agenda,Properties,Sellers,Users } = require('../db')

const getAgenda = async () =>{
    try {
        const listAgenda= await Agenda.findAll();
            return listAgenda;
    } catch (error) {
        console.log("Ocurrio un error en CalendarMidd/ getAgenda :"+error);
    }
}


const postCalendar = async (dates,hour,type, propertyId, userId) =>{
    try {
        let resultCreate;
        if(type==="inabil"){
            resultCreate= await Calendar.create({dates,hour,type, propertyId, userId});
        }else{
            //cita para el comptador
            resultCreate= await Calendar.create({dates,hour,type, propertyId, userId});
            //Cita para el vendedor
            const agendaSeller=await Properties.findAll({include:[{model:Sellers,include:{model:Users}}],where:{id:propertyId}})
            const idUserSeller=await agendaSeller.map(d => d.dataValues.seller.user.dataValues.id)[0]
            await Calendar.create({dates,hour,type, propertyId, userId:idUserSeller,calendarId:resultCreate.dataValues.id});
            
        }
        
            return resultCreate;
    } catch (error) {
        console.log("Ocurrio un error en ReviewMidd/ postCalendar :"+error);
    }
}

const getCalendar = async (userId) =>{
    try {
        const listCalendar= await Calendar.findAll({
            where:{userId}});
            return listCalendar;
    } catch (error) {
        console.log("Ocurrio un error en CalendarMidd/ getCalendar :"+error);
    }
}


const deleteCalendar = async(id) =>{// ID de la Calendario
    try {
        const cita= await Calendar.findAll({where:{id}});
        let resDelete;
        if(cita.map(d => d.dataValues.calendarId)[0]===null){
            //Se elimina del vendedor primero por la llave foranea
            resDelete = await Calendar.destroy({ 
                where:{
                    calendarId :id
                }
            })

            // se elimina del cliente
            resDelete = await Calendar.destroy({ 
                where:{
                    id :id
                }
            })
        }else{
            //Se elimina la cita del vendedor
            resDelete = await Calendar.destroy({ 
                where:{
                    id :id
                }
            })
           // se elimina del cliente
           resDelete = await Calendar.destroy({ 
            where:{
                id :cita.map(d => d.dataValues.calendarId)[0]
            }
        })
        }
       
        return resDelete
    } catch (error) {
        console.log("Ocurrio un error en CalendarMidd/ deleteCalendar:"+error);
    }
}
module.exports={
    getAgenda,
    postCalendar,
    getCalendar,
    deleteCalendar
}
