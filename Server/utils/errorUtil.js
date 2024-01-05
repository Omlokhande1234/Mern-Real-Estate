export const errorhandler=(statuscode,message)=>{
    const error=new Error()
    error.statuscode=statuscode
    error.message=message
    return error
}
//Here we have just created a instance of the error where we have created the new error and 
//stored the info in the error given by user i.e statuscode and error message given by user
//but here we have only setted the error but to show this error to user we use the 
//middleware