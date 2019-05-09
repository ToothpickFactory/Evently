import { ResourcePubSub } from './../../decorators/ResourcePubSub';
import { ToJSON } from './../../decorators/ToJSON';
import { IUser } from './../../types/IUser';

@ToJSON(['user_id'])
@ResourcePubSub
export class User {
	public static tokenTest(token: string) {
		const tokenRGX = RegExp(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);
		return tokenRGX.test(token);
	}

	private static parseJwt(token: string) {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		return JSON.parse(window.atob(base64));
	};

	private _token: string;
	public user_id: string;
	public subscribe: Function;
	public toJSON: () => IUser;

	constructor() {
		if (this.token) this.spreadToken();
	}

	get token(): string {
		if (this._token) return this._token;
		const token = localStorage.getItem('token');
		return this._token = User.tokenTest(token) ? token : null;
	}

	set token(token: string) {
		this._token = token;
		localStorage.setItem('token', token || '');
		this.spreadToken();
	}

	private spreadToken(): void {
		const parsedToken = User.parseJwt(this._token);
		Object.assign(this, parsedToken);
	}
}

export const user = new User();
