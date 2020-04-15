
export function delay(msec: number) : Promise<void> {

	return new Promise((r) => {
		window.setTimeout(() => {
			r()
		}, msec);
	});

}
