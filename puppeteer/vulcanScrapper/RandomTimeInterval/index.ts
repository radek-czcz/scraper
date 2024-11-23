
export default function getRandomTime(mean, spread) {
	let randomTime = 1000*60*60*mean;
	let spreadTime = 1000*60*60*spread*(Math.random()-0.5);
	return randomTime + spreadTime;
}
