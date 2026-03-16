import { serviceAddRocket, serviceDeleteRocket, serviceGetAllRockets, serviceGetRocket } from '../services/rocket.js'

export async function addRocket(req, res) {
    try {
        const { city, rocketType, latitude, longitude, name } = req.body
        console.log(user)
        if (!city || !rocketType || !latitude || !longitude || !name) {
            return res.status(400).json({
                sucess: false,
                message: "missing some of things",
            })
        }
        if (
            typeof city !== 'string' ||
            typeof rocketType !== 'string' ||
            typeof latitude !== 'number' ||
            typeof longitude !== 'number' ||
            typeof name !== 'string'
        ) {
            return res.status(400).json({
                sucess: false,
                message: "invalid types",
            })

        }
        const respone = await serviceAddRocket(city, rocketType, latitude, longitude, name)
        if (respone) {
            res.status(201).json({
                sucess: true,
                rocket: rocket,
                message: 'add rocket successfuly'
            })
        }
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message
        })
    }
}

export async function allRocket(req, res) {
    try {
        const res = await serviceGetAllRockets()
        res.status(200).json(res)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getRocket(req, res) {
    try {
        const { id } = req.params
        const res = await serviceGetRocket(id)
        if (res === 'not found') {
            return res.status(401).json({
                sucess: false,
                message: "rocket not found",
            })
        }
        else {
            res.status(200).json(res)
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export async function deleteOne(req, res) {
    try {
        const { id } = req.params
        const res = await serviceDeleteRocket(id)
        if (res == 'not found') {
            return res.status(401).json({
                sucess: false,
                message: "rocket not found",
            })
        }
        if (res === 'delete') {
            res.status(200).json({
                sucess: true,
                message: "delete rocket sucessfuly",
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}