const userSql = {
    insert:'INSERT INTO user(name,age,gender) VALUES(?,?,?)',
    queryUser:'SELECT * FROM user WHERE id = ?',
    queryAll:'SELECT * FROM user',
    updateUser:'UPDATE user set name = ? age = ? gender = ? where id = ? '
}
module.exports = userSql;