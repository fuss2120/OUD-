const userExists = username => {
    // TODO: check user in database
    if (username == 'admin')
        return true;
    return false;
}

export { userExists }