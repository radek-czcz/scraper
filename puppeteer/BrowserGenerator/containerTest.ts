import './container';
import {container} from 'tsyringe';

let str = container.resolve('captcha-selector');
console.log(str);

const f:Function = container.resolve('func');
f();