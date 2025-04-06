export interface iLogger {
	message():void;
}

export class Logger2 implements iLogger {
	message():void { console.log( "I'm Logger no. 1" )}
}

export class Logger3 implements iLogger {
	message():void { console.log( "I'm Logger no. 2" )}
}

export class Logger4 implements iLogger {
	message():void { console.log( "I'm Logger no. 15" )}
}

export class Logger5/* implements iLogger*/ {
	message2():void { console.log( "I'm Logger no. 25" )}
}