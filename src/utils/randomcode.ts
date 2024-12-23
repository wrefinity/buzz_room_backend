import crypto from 'crypto';

export const generateCode = () =>{
    return crypto.randomBytes(20).toString('hex');
}