import { AccountDTOModel } from '../model/dto/account.dto.model';

export class AccountConverter {


    constructor(){}

    public resultToDTO(result): AccountDTOModel{
        let account: AccountDTOModel = {
            name: result.name,
            email: result.email,
            type: result.type,
            phone: {
                areaCode: result.phone.areaCode,
                phone: result.phone.phone
            },
            smsValidate: result.smsValidate,
            emailValidate: result.smsValidate,
            fraudAnalysis: result.fraudAnalysis,
            creditAnalysis: result.creditAnalysis,
            documentAnalysis: result.documentAnalysis
        }
        return account;
    }

    public bodyToInsertData(data){
        return {
            doc: data.doc,
            name: data.name,
            birthDate: data.birthDate,
            password: data.password,
            email: data.email,
            type: data.doc.length == 11 ? 'PF' : data.doc.length == 14 ? 'PJ' : 'NA',
            phone: {
                areaCode: data.phone.areaCode,
                phone: data.phone.phone
            },
            smsValidate: false,
            emailValidate: false,
            fraudAnalysis: 0,
            creditAnalysis: 0,
            documentAnalysis: 0
        }
    }
}