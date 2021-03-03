import {postAction} from './request';

interface loginVerficationInterface {
    phone: string;
    vcode: string;
}


export const loginVerification = (params: loginVerficationInterface): Promise<any> => {
    return postAction('/user/loginVerification', params)
}