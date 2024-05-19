import { spawn } from 'child_process';
import { loadPuppeteer, loadPage, getPage, getBrowserFromParentProcess, getPu } from '../index.mjs';
import getTime from '../RandomTimeInterval.js'
import attachFunc from '../ProcessListenersManager.js'
import { fetcher } from '../index.mjs'
import { main as writerDB } from './puppWriterDB.js';
import { dateToSqlFormat, dateToClockTime } from '../date.js'

// export default exportedMembers = [ spawn, loadPuppeteer, loadPage ]
export { spawn, loadPuppeteer, loadPage, getPage, attachFunc, getTime, getBrowserFromParentProcess, writerDB, fetcher, getPu, dateToSqlFormat, dateToClockTime }