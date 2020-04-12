export class AccountDTOModel {
    name: string;
    email: string;
    type: string;
    phone: {
        areaCode: string;
        phone: string;
    };
    smsValidate: boolean;
    emailValidate: boolean;
    fraudAnalysis: number;
    creditAnalysis: number;
    documentAnalysis: number;

}