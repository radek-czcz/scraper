import {FieldPacket} from 'mysql2/promise'

export default function processResults(res:[any, FieldPacket[]]):void {
	console.log(res[0].map((inp:any) => inp.Field))
}