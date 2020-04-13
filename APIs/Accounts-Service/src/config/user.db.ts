import mongoose from 'mongoose';
import { environment } from '../environments/environment';

mongoose.connect(environment.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true});
var Schema = mongoose.Schema;
var userSchema = new Schema({
    doc: String,
    name: String,
    birthDate: Date,
    password: String,
    email: String,
    type: String,
    phone: {
        areaCode: String,
        phone: String
    },
    smsValidate: Boolean,
    emailValidate: Boolean,
    fraudAnalysis: Number,
    creditAnalysis: Number,
    documentAnalysis: Number
},
{ collection : 'user' });

export default mongoose.model('UserDB', userSchema);