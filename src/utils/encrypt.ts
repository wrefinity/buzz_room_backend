import bcrypt from "bcrypt";
export const comparePassword = (password, encrptedPass)=> bcrypt.compareSync(password, encrptedPass);
export default (password) => bcrypt.hashSync(password, 10)