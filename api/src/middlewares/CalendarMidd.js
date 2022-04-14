const { Calendar,Agenda } = require('../db')

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
        const resultCreate= await Calendar.create({dates,hour,type, propertyId, userId});
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



module.exports={
    getAgenda,
    postCalendar,
    getCalendar
}
