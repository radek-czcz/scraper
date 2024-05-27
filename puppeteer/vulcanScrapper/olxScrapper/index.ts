import { spawn } from 'child_process';
import { loadPuppeteer, loadPage, getPage, getBrowserFromParentProcess, getPu } from '../index';
import getTime from '../RandomTimeInterval.js'
import attachFunc from '../ProcessListenersManager'
// import { main as writerDB } from './puppWriterDB.js';
import { insert as writerDB  } from './connectionToCars.js';
import { dateToSqlFormat, dateToClockTime } from '../date.js'
import timingFunctions from './TimingFunctions'

// export default exportedMembers = [ spawn, loadPuppeteer, loadPage ]
export { spawn, loadPuppeteer, loadPage, getPage, attachFunc, getTime, getBrowserFromParentProcess,
		writerDB, getPu, dateToSqlFormat, dateToClockTime, timingFunctions }