module.exports = {
    status: (req, res) => {
        return res.send({
            status: 'Api Online'
        })
    }
}