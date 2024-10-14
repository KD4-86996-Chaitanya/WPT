function createErrorResult(error){
    return {status: 'error', error}
}

function createSuccessResult(data){
    return {status: 'Success', data}
}

function createResult(error, data){
    return error ? createErrorResult(error) : createSuccessResult(data)
}

module.exports= {
    createResult,
    createSuccessResult,
    createErrorResult,
}