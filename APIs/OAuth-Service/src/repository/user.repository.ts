import mongoose from 'mongoose'
import UserDB from './../config/user-db.config'


class UserRepository {

    public getByDocument(doc) {
        return UserDB.findOne({doc: doc});
    }

}

export default  new UserRepository();