import { getBrowserFromParentProcess, getPage } from './puppLoader';
import fs from 'fs';
import {Browser, Page} from 'puppeteer';
// import process from 'node:process';
import { argv } from 'node:process';

let allArgs:{} = {}

function initialize():void {
	let argsOb:Function =  function():{} {
		let ob:{[key: string]: string} = {}
		argv.forEach((inp, index) => {
			if (inp.split("=").length === 2) ob[inp.split("=")[0]] = inp.split("=")[1]
			else ob[index] = inp
		})
		return ob;
	}

	allArgs = argsOb();

	// let pathArg = argsOb().path

	// let pathToCookies = pathArg ? pathArg : './cookies.json'
}

export function getArg(argDescriptor:string):string {
	return allArgs[argDescriptor];
}

initialize();
