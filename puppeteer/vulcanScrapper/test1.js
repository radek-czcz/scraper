function prom() {
	return new Promise(res => {
		setTimeout(() => {
			console.log('end');
		})
	})
}

prom();