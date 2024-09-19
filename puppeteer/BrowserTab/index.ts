import {urlArr} from '../ConfigFiles/categories';
import {Browser, Page} from 'puppeteer';
import browser from '../BrowserGenerator'
import {ISitesAndCategories} from '../ConfigFiles/categories'
import cookiesConfig from '../ConfigFiles/CookiesConfig';
import attachFunc from '../vulcanScrapper/ProcessListenersManager';

import {tabs} from './TabGenerator'
import setCookies from './Cookies/CookiesSetterProcess'
import saveCookies from './Cookies/CookiesSaver'

export default tabs

export {attachFunc, urlArr, Browser, Page, ISitesAndCategories, browser, cookiesConfig, setCookies, saveCookies}
