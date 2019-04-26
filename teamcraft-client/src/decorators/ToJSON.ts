export function ToJSON(jsonKeys: Array<string>) {
	return function <T extends { new(...args: any[]): {} }>(constructor: T) {
		return class extends constructor {
			public toJSON() {
				return jsonKeys.reduce((jsonObj, key) => {
					jsonObj[key] = this[key];
					return jsonObj;
				}, {});
			}
		}
	}
}

