export default class Randomize {

	public static randomBool() {
		return Math.random() > 0.5
	}
	
	public static randomInt(min: number, max: number) {
		const range = max - min + 1;
		const distance = Math.floor(Math.random() * range);
		return min + distance;
	}

	public static randomFromArray<T>(arr: T[]) {
		const i = this.randomInt(0, arr.length - 1);
		return arr[i];
	}
}