export default {
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
    DB : {
        URI: process.env.MONGODB_URI || "mongodb+srv://instagram123:instagram123@cluster0.ojkvum8.mongodb.net/?retryWrites=true&w=majority",
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD

    }
}