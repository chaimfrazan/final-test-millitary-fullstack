import { serviceCreateUser, serviceUpdateUser, serviceDeleteUser, serviceGetUser, serviceLoginUser } from '../services/user.js'

export async function createUser(req, res) {
    try {
        const { username, password, email, user_type } = req.body
        if (!username || !password || !email || !user_type) {
            return res.status(400).json({
                sucess: false,
                message: "missing some of things",
            })
        }
        const respone = await serviceCreateUser(username, password, email, user_type)
        if (respone) {
            res.status(201).json({
                sucess: true,
                user: respone,
                message: 'add user successfuly'
            })
        }
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message
        })
    }
}

export async function updateUser(req, res) {
    try {
        const { username, password, email, user_type } = req.body
        const respone = await serviceUpdateUser(username, password, email, user_type)
        if (respone === 'not found') {
            return res.status(401).json({
                sucess: false,
                message: "user not found",
            })
        }
        else {
            res.status(200).json({
                sucess: true,
                user: respone,
                message: 'update user successfuly'
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getUser(req, res) {
    try {
        const { id } = req.params
        const respone = await serviceGetUser(id)
        if (respone === 'not found') {
            return res.status(401).json({
                sucess: false,
                message: "user not found",
            })
        }
        else {
            res.status(200).json({
                sucess: true,
                user: respone,
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function deleteUser(req, res) {
    try {
        const { id } = req.params
        const respone = await serviceDeleteUser(id)
        if (respone == 'not found') {
            return res.status(401).json({
                sucess: false,
                message: "user not found",
            })
        }
        if (respone === 'delete') {
            res.status(200).json({
                sucess: true,
                message: "delete user sucessfuly",
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export async function login(req, res) {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({
                sucess: false,
                message: "missing password or username",
            })
        }
        const respone = await serviceLoginUser(username, password)
        if (respone === 'wrong pass') {
            return res.status(401).json({
                sucess: false,
                message: "wrong password",
            })
        }
        if (respone === 'not found') {
            return res.status(401).json({
                sucess: false,
                message: "usename not found",
            })
        }
        else {
            res.status(200).json({
                sucess: true,
                token: respone.token,
                user: respone.user,
                message: "login sucessfuly",
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}