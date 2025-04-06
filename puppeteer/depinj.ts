import "reflect-metadata";
import './container';
import {/*iLogger, */Logger2} from './Logger'
import {injectable, inject, container,autoInjectable} from 'tsyringe';

@autoInjectable()
class LogIns {
	constructor(private logger?:Logger2) {}

	log() {
		this.logger?.message();
	}
}


// let lgr = container.resolve(Logger2);
// lgr.message();

let lgr = new LogIns();
lgr.log();
