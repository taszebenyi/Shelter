require('dotenv').config();

process.env.PORT = 3000;
process.env.MONGODB_URI = `mongodb+srv://taszebenyitemp:${process.env.MONGO_PASSWORD}@shelter-dzqf1.gcp.mongodb.net/test?retryWrites=true`;
