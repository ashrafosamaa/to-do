const reqKeys = ['body', 'params', 'query', 'headers'];

export const validation = (schema)=> {
    return (req, res, next)=> {
        let validatArr = []
        for (const key of reqKeys) {
            const validationResult = schema[key]?.validate(req[key], {abortEarly:false})
            if(validationResult?.error){
                validatArr.push(...validationResult.error.details)
            }
        }
        if(validatArr.length){
            return res.status(400)
            .json({errmsg: "validation error ", 
            err: validatArr.map(ele => ele.message)})
        }
        next()
    }
}