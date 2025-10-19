export interface IInputboxWriter {
	private page:Promise<Page>, 
	private credentials:[/*user*/string, /*password*/string],
	writeToInputbox(select:0|1);
	set selector(selector:string):void;
}