// specific error handler

export const createError = (status, message) => {
    const err = new Error() // new error
    err.status = status // change status to 404
    err.message = message  // change message to not found 
    // as mentioned in catch(err), auth.js (controllers)
    return err;
} 
