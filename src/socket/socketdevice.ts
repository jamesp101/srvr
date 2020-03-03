import { Server } from 'http';
import socket from 'socket.io';
import { Device } from '../entity/Device';
import { getConnection } from 'typeorm';
import { Timeline } from '../entity/Timeline'







export function runSocket(server: any) {
    const io = socket(server);



    let clients: { clientID?: string, deviceID?: string }[] = []




    io.on('connection', (so) => {
        so.on('disconnect', (mess: any) => {

            let cl: any;
            for(let x=0; x< clients.length; x++){
                if (clients[x].clientID == so.id){
                    cl = clients[x]
                    break;
                }
            }

            console.log(cl)
            clients = clients.filter(client => client.clientID != so.id)

            const dev = {id: cl.deviceID, status: 'offline' } ;

            so.emit(udpateDeviceStatus(dev).toString())

        })
        so.on('status', (mess: any) => {
            const dev = JSON.parse(mess)
            clients = clients.filter(client=> client.clientID != so.id)
            let ps = { clientID: so.id, deviceID: dev.id }
            clients.push(ps)
            so.emit(udpateDeviceStatus(dev).toString())
        });
        so.on('message', (message: any) => {
            log(`MESSAGE: ${message}`)
        })

    });

}

async function udpateDeviceStatus(dev: any) {

    console.log(dev)
    if (!dev.status) dev.status = "online"

    try {

        const repository = await getConnection().getRepository(Device)
        // const device: Device | any = repository.findOne(
        //     {where :{ deviceID: dev.id  }})
        // device.status = 'online'
        let device: Device | any = await repository.createQueryBuilder()
            .update(Device)
            .set({ status: dev.status })
            .where('deviceID = :deviceID', { deviceID: dev.id })
            .execute();

        let timeline = new Timeline()
        timeline.name = `Device is ${dev.status}`
        timeline.timelinetype = 'log'
        timeline.date = Date.now().toString()

        getConnection().manager.save(timeline).then(s => log('New event in timeline'))

        return device;

    } catch (e) {
        console.error(`${e}`)
    }


}
function log(log: string) {
    console.log(`==> SOCKET : ${log}`)
}
