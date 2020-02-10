module.exports = {
    'post /b': {
        b: 'b'
    },
    'put /c': {
        c: 'c'
    },
    'get /mock': function test(req, res) {
        res.json({"numwber": 221});
    }
};
