"use strict";

class UserStorage {
	static #users = {
		name: ["어드민", "김건우"],
		id: ["admin", "kgw119"],
		psword: ["1234", "119"],
	};

	static getUsers(...fields) {
		const users = this.#users;
		const newUsers = fields.reduce((newUsers, field) => {
			if (users.hasOwnProperty(field)) {
				newUsers[field] = users[field];
			}
			return newUsers;
		}, {});
		return newUsers;
	}
	
	static getUserInfo(id) {
		const users = this.#users;
		const idx = users.id.indexOf(id);
		const usersKeys = Object.keys(users);
		const userInfo = usersKeys.reduce((newUser, info) => {
			newUser[info] = users[info][idx];
			return newUser;
		}, {});
		return userInfo;
	}
	
	static save(userInfo) {
		const users = this.#users;
		users.name.push(userInfo.name);
		users.id.push(userInfo.id);
		users.psword.push(userInfo.psword);
		console.log(users);
		return { success: true };
	}
}

module.exports = UserStorage;
