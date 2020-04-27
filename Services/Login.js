import User from '../Models/User';

const logUserInWithFormData = async formData => {
    const username = formData.username;
    const password = formData.password;
    let user = new User(username, password);
    if (! await user.doesExist() || ! await user.isPasswordCorrect())
        throw new Error(" Invalid username or password");
    return user;
}

const userExists = username => {
    // TODO: check user in database
    if (username == 'admin')
        return true;
    return false;
}

export default { userExists, logUserInWithFormData }