"use strict";

class UserStorage {
	static #users = {
		id: ["admin", "kgw119"],
		psword: ["1234", "119"],
		name: ["어드민", "김건우"],
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
}

module.exports = UserStorage;
