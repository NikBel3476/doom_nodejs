class ORM {
    constructor(db) {
        this.db = db;
    }

    async detail(table, params = null, fields = '*', delimiter = 'AND') {
        if (!params) {
            return null;
        }
        let query = `SELECT ${fields} FROM ${table} WHERE login=$1`;

        for (let key in params) {

        }

        return (await this.db.query(query, [login])).rows[0];
    }

    list(table, params = null, fields = '*', delimiter = 'AND') {}
    add(table, fields, values = [[]]) {}
    delete(table, params = null, delimiter = 'AND') {}
    update(table, values, params, delimiter = 'AND') {}
}

module.exports = ORM;