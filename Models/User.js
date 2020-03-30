import { dbPool } from './dbPool';

const selectUsernameWhere = async whereString => {
    const qString = "SELECT username FROM Users WHERE " + whereString;
    let qResponse = await dbPool.query(qString);
    return qResponse;
}

export default class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    async doesExist() {
        const qRes = await selectUsernameWhere("username = '" + this.username + "'");
        return qRes.length == 1;
    }

    async isPasswordCorrect() {
        const whereString = "username='" + this.username + "' AND user_password='" + this.password + "'";
        const qRes = await selectUsernameWhere(whereString);
        return qRes.length == 1;
    }
}