import {ErrorModel} from './../model/error.model'

export class HttpMessage{
    public static UNAUTHORIZED: ErrorModel = { httpCode:401, code:'AC0001', message: 'Acesso negado.' };
    public static FORBIDDEN: ErrorModel = { httpCode:403, code:'AC0002', message: 'Acesso inválido.' };
    public static NOT_CONTENT: ErrorModel = { httpCode:204, code:'AC0003', message: 'Nenhum dado encontrado nessa consulta.' };
    public static CREATED: ErrorModel = { httpCode:201, code:'AC0004', message: 'Dado inserido com sucesso.' };
    public static PARAM_REQUIRED: ErrorModel = { httpCode:412, code:'AC0005', message: 'Parametros obrigatórios não informados.' };
    public static INVALID_TOKEN: ErrorModel = { httpCode:412, code:'AC0006', message: 'Token inválido.' };
    public static ERROR_INSERT_DATA_IN_DB: ErrorModel = { httpCode:412, code:'AC0007', message: 'Erro ao inserir dados na base de dados.' };
    public static CREATED_WITH_NOTES: ErrorModel = { httpCode:201, code:'AC0008', message: 'Dado inserido com observações.' };
    public static ERROR_CONSULT_DATA_IN_DB: ErrorModel = { httpCode:412, code:'AC0009', message: 'Erro ao consultar os dados.' };
    public static ERROR_UPDATE_DATA_IN_DB: ErrorModel = { httpCode:412, code:'AC0010', message: 'Erro ao atualizar o dado.' };
    public static UPDATED: ErrorModel = { httpCode:200, code:'AC0011', message: 'Dado atualizado com sucesso.' };
    public static DELETED: ErrorModel = { httpCode:200, code:'AC0012', message: 'Dado excluído com sucesso.' };
    public static DELETED_ERROR: ErrorModel = { httpCode:412, code:'AC0013', message: 'Erro ao excluir dado.' };
    public static VALUES_NOT_EQUALS: ErrorModel = { httpCode:412, code:'AC0014', message: 'Valores não sáo iguais.' };
}