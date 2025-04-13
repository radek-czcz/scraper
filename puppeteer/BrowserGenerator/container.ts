import "reflect-metadata";
import {container} from 'tsyringe'

// container.register<logs.Logger2>(logs.Logger2, {useClass:logs.Logger5})

// captcha image selector
	container.register<string>('captcha-selector', {useValue:'img.v-captcha-image'});
	container.register<Function>('func', {useValue: function() {console.log('Hi, it works')}})