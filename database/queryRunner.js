const runQuery = (con, query, params) => {
    return new Promise((resolve, reject) => {
        con.query(query, params, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    });
}

module.exports = runQuery;