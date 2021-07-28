const bodyValidation = (body, res) => {
    const allBody = Object.keys(body)
    if(allBody.every(res => body[res] !== undefined)){
        return true
    } else {
        const fieldUndefined = allBody.filter(res => body[res] === undefined)
        res.status(400).send({
            succsess : true,
            message : `${fieldUndefined.map((res, index) => {
                if(index > 0) res = ` ` + res
                return res
            })} is required!`,
        })
    }
}

module.exports = {bodyValidation}