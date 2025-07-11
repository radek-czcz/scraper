import "reflect-metadata";
import {container} from 'tsyringe';
import containerValues from './containerValues'

// container.register<logs.Logger2>(logs.Logger2, {useClass:logs.Logger5})

// captcha image selector
	container.register<string>('captcha-selector', {useValue:'div#captcha[style]:not([style="display: none;"]) img.v-captcha-image'});
	// container.register<string>('captcha-selector', {useValue:'div.v-captcha-container'});
	container.register<Function>('func', {useValue: function() {console.log('Hi, it works')}})
	container.registert<string>('url', {useValue:containerValues.url})

