import "reflect-metadata";
import {container} from 'tsyringe'
import * as logs from './Logger'


container.register<logs.Logger2>(logs.Logger2, {useClass:logs.Logger5})