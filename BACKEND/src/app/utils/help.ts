export const isUserExist = async(id?:string, email?:string, db?:any) => {
    const result = await db.findById(id)
    return result
}