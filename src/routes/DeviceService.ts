import { Path, GET, PathParam, POST, PUT } from "typescript-rest"; 
import { getConnection } from "typeorm";
import { Device } from "../entity/Device";
import { User } from "../entity/User";
import { Timeline } from "../entity/Timeline";

@Path('/device')
export class DeviceService{
    

    @Path(':id')
    @GET
    getDeviceById(@PathParam('id') id: string){
        return this.getDevice(id)
    }

    @Path('id')
    @PUT
    getDeviceUpdateUser(@PathParam('id') id: string, userId: any){
        try{
            const repository = getConnection().getRepository(Device)
            const device = repository.findOne({id : parseInt(id)})
            
            device

        }catch(e){
            return e
        }


    }


    @POST
    async newDevice(data: DeviceJSON){
        const device = new Device();
        device.deviceID = data.deviceID
        device.status = data.status
        device.alias = data.alias


        let connection = getConnection()
        try{
            await connection.manager.save(device)
            return {
                code: 'device-crerate-ok',
                description: 'Created device!'
            }

        }catch(e){
            return {
                code: 'device-crerate-ok',
                description: e.messeage
            }

        }   
    }


    async getDevice(id: string) {
        try {
            const repository = getConnection().getRepository(Device)
            const device: Device | any = await repository.findOne({
                id: parseInt(id)
            })
            return device
        } catch (e) {
            return e
        }

    }




}

interface DeviceJSON{
    deviceID: string
    alias: string
    status: string
    user?: User
    timeline?: Timeline
}
