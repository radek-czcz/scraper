	export default function stringFunction(inp:string):string[] {
		return inp
		.replaceAll(`"`, '')
		.replaceAll(",", '')
		.replaceAll('\r', '')
		.replaceAll(' ', '')
		.split('\n')
	}