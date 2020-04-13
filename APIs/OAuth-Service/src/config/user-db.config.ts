import mongoose from 'mongoose';
import { environment } from '../environments/environment';

mongoose.connect(environment.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true});
var Schema = mongoose.Schema;
var userSchema = new Schema({
    doc: String,
    password: String
},
{ collection : 'user' });

export default mongoose.model('UserDB', userSchema);