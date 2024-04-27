
export default function getRandomTime(mean, spread) {
	let randomTime = 1000*60*60*mean;
	let spreadTime = 1000*60*60*spread;
	return randomTime + spreadTime;
}