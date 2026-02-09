import * as crypto from 'crypto'

function hash(value: string): number {
    const h = crypto.createHash('md5')
        .update(value)
        .digest("hex")
    return parseInt(h.substring(0,8),16)
}

class ConsistentHashRing {
    private ring = new Map<number, string>();
    private sortedKeys: number[] = [];

    addServer(serverId: string){
        const h = hash(serverId)
        this.ring.set(h, serverId)
        this.sortedKeys.push(h)
        this.sortedKeys.sort((a,b) => a-b)
    }
    getServer(key: string):string{
        const keyHash = hash(key)
        for(const serverHash of this.sortedKeys){
            if (keyHash <= serverHash) {
                return this.ring.get(serverHash)!
            }
        }
        return this.ring.get(this.sortedKeys[0])!;
    }
    removeServer(serverId:string){
        const h = hash(serverId)
        this.ring.delete(h)
        this.sortedKeys = this.sortedKeys.filter(k => k !==h)
    }
}
const ring = new ConsistentHashRing()
export function addServerId(serverId: string){

    ring.addServer(serverId)
}


export function getServerId(key: string): string{

    const ServerId = ring.getServer(key)
    return ServerId;
}

export function removeServerId(serverId: string){
    ring.removeServer(serverId)
}