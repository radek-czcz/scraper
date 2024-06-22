interface SortedOffer {
	description:string;
	offers:OfferInTime[];
}

interface OfferInTime {
	descr:string;
	prodYear:number;
	mileage:number;
	city:string;
	fetchDate:string;
	lastSeen:string;
	price:number;
}

let all:Promise<Response> = fetch('http://localhost:3091/newOffers');
all.then((res:Response) => res.json()).then(
	(res:any) => {
		let res2:SortedOffer[] = [...new Set(res.map((item:OfferInTime) => {return {description: item.descr}}))] as SortedOffer[];
		console.log(res2);
		res.forEach((inp:OfferInTime) => {
			function getSorted():SortedOffer|undefined {return res2.find((inp2:SortedOffer) => inp2.description === inp.descr)}
			function addToArray() {getSorted()?.offers.push(inp)/*[inp.descr as keyof typeof res2].push(inp)*/}
			if (getSorted()?.offers) addToArray()
			else {if (getSorted()) getSorted().offers = []; addToArray()};
		})
		console.log(res2);
		// console.log(res2.filter(
		// 	(inp:OfferInTime) => inp.descr.toLowerCase().includes('opel')
		// ))
	}
)
// all.then(res => res.json()).then((res:any) => console.log(res))