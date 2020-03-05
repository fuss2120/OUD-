import User from '../models/User';

const logUserInWithFormData = async formData => {
    const username = formData.username;
    const password = formData.password;
    let user = new User(username, password);
    if (! await user.doesExist())
        throw new Error("User does not exist");
    if (! await user.isPasswordCorrect())
        throw new Error("Password for '" + username + "' is not correct");
    return user;
}

const userExists = username => {
    // TODO: check user in database
    if (username == 'admin')
        return true;
    return false;
}

export default { userExists, logUserInWithFormData }