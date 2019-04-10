import { db } from './../../config/firebase';
import shortid from 'shortid';
import { IUser } from 'IUser';
import { idConflictError, serverError, validationError, invalidToken, credentialsRequired, userNotFound } from './../Codes/Codes';
import { Validator } from 'jsonschema';
import UserSchema from './User.schema.json';
import { verify, sign } from 'jsonwebtoken';
import { createHash } from 'crypto';

const userValidator = new Validator();

export class User {
	public static userValidate(user: IUser) {
		return userValidator.validate(user, UserSchema);
	}

	public static validateToken(token: string): User {
		try {
			const userJSON: IUser = verify(token, process.env.JWT_KEY) as IUser;
			return new User(userJSON);
		} catch (err) {
			throw invalidToken();
		}
	}

	public static async login(email: IUser['email'], password: IUser['password']): Promise<User> {
		if (!email || !password) throw credentialsRequired();
		email = email.toUpperCase();
		password = User.encrypt(password);
		try {
			const accountsRes = await db.collection('accounts')
				.where('email', '==', email)
				.where('password', '==', password)
				.limit(1)
				.get();

			if (!accountsRes.empty) throw userNotFound();
			return new User(accountsRes.docs[0].data());

		} catch (err) {
			throw serverError(err);
		}
	}

	private static encrypt(password: IUser['password']): string {
		return createHash('SHA1').update(password).digest('hex');
	}

	public user_id: IUser['user_id'] = null;
	private email: IUser['email'] = null;
	private password: IUser['password'] = null;

	constructor(user: IUser = null) {
		this.setValues(user);
	}

	public setValues(user: IUser) {
		if (this.user_id && user.user_id !== this.user_id) throw idConflictError();
		Object.assign(this, user);
		const results = User.userValidate(this.toJSON());
		if (results.errors.length) throw validationError(results.errors.toString() + ' ' + JSON.stringify(user));
	}

	public async save(): Promise<User> {
		if (!this.user_id) this.user_id = shortid.generate();
		const user = this.toJSON();

		try {
			await db.collection('accounts').doc(user.user_id).set(user);
			return this;
		} catch (err) {

			throw serverError(err);
		}
	}

	public getToken(): string {
		return sign({ user_id: this.user_id }, process.env.JWT_KEY, {
			noTimestamp: true
		});
	}

	public toJSON(): IUser {
		return {
			user_id: this.user_id,
			email: this.email,
			password: this.password
		};
	}

}
