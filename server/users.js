const users = [];

const addUser = ({ id, idUser }) => {
    const user = { id, idUser };
    users.push(user);
    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if(index !== -1) return users.splice(index, 1)[0];
}

const getUsers = () => users;

module.exports = { addUser, removeUser, getUsers };
