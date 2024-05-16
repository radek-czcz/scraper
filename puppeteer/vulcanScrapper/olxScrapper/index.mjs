import { spawn } from 'child_process';
import { loadPuppeteer, loadPage, getPage, getBrowserFromParentProcess } from '../index.mjs';
import getTime from '../RandomTimeInterval.js'
import attachFunc from '../ProcessListenersManager.js'
import { cookiesFetcher } from '../index.mjs'
import { main as writerDB } from '../puppWriterDB.js';

// export default exportedMembers = [ spawn, loadPuppeteer, loadPage ]
export { spawn, loadPuppeteer, loadPage, cookiesFetcher, getPage, attachFunc, getTime, getBrowserFromParentProcess, writerDB }