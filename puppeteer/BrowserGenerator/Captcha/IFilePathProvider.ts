export interface IFilePathProvider {
	get filePath():Promise<string>
}