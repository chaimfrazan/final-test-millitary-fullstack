import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const verifyToken = async (req, res, next) => {
    let token;
    try {
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1]
        }
        if (!token) {
            res.status(401).json({
                success: false,
                message: 'not authorization'
            })
        }
        const secret = process.env.SECRET_TOKEN;
        const user = jwt.verify(token, secret)
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'not any user'
            })
        }
        req.user = user
        next()
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

export const verifyAll = (usersTypes) => {
    return (req, res, next) => {
        const user = req.user
        if (!usersTypes.includes(user.user_type)) {
            return res.status(401).json({
                success: false,
                message: 'you not confirm'
            })
        }
        next()
    }
}

