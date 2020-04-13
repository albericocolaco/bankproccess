import mongoose from 'mongoose'
import UserDB from './../config/user.db'


class UserReposotory {

    public getAll() {
        return UserDB.find();
    }

    public getById(id) {
        return UserDB.findById(id);
    }

    public getByDocument(doc) {
        return UserDB.findOne({doc: doc});
    }

    public create(user) {
        return UserDB.create(user);
    }

    public updatePassword(id, password) {
        const updateduser = {
            password: password
        }
        return UserDB.findByIdAndUpdate(id, updateduser, { new: true });
    }

    public delete(id) {
        return UserDB.findByIdAndRemove(id);
    }

}

export default  new UserReposotory();