import mongoose from 'mongoose';

export default (db: string) => {
    const connect = () => {
        mongoose.connect(db)
        .then(() => {
            return console.info('Sucessfully connected to ${db}');
        })
        .catch(error => {
            console.error('Error connecting to ${db}: ', error);
            return process.exit(1);
        });
    };
    connect();

    mongoose.connection.on('disconnected', connect);
}