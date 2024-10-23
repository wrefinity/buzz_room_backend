export const Error =  (res, error)=>{
    console.log(error)
    return res.status(500).json({message:` Error: ${error.message}`})
}