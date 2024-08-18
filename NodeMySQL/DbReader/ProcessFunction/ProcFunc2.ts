import {FieldPacket} from 'mysql2/promise'

export default function processResults(res:[any, FieldPacket[]]):string {
	return res[0][0].sellerName
}