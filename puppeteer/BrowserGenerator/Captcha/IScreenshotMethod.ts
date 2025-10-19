export interface IScreenshotMethod<T> {
	makeScreenshot(
		// path:string,
		// captchaImageContainer:ElementHandle<HTMLImageElement>
	):Promise<T>
}