import { serviceAddRocket, serviceDeleteRocket, serviceGetAllRockets, serviceGetRocket } from '../services/rocket.js'

export async function addRocket(req, res) {
    try {
        const { name, rocketType, latitude, longitude, city } = req.body
        if (!city || !rocketType || !latitude || !longitude || !name) {
            return res.status(400).json({
                sucess: false,
                message: "missing some of things",
            })
        }
        const numLatitude = +latitude
        const numLongitude = +longitude
        if (
            typeof city !== 'string' ||
            typeof rocketType !== 'string' ||
            typeof numLatitude !== 'number' ||
            typeof numLongitude !== 'number' ||
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
                rocket: respone.rocket,
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
        const respone = await serviceGetAllRockets()
        res.status(200).json({
            sucess: true,
            rockets: respone,
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getRocket(req, res) {
    try {
        const { id } = req.params
        const respone = await serviceGetRocket(id)
        if (respone === 'not found') {
            return res.status(401).json({
                sucess: false,
                message: "rocket not found",
            })
        }
        else {
            res.status(200).json({
                sucess: true,
                rockets: respone,
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export async function deleteOne(req, res) {
    try {
        const { id } = req.params
        const respone = await serviceDeleteRocket(id)
        if (respone == 'not found') {
            return res.status(401).json({
                sucess: false,
                message: "rocket not found",
            })
        }
        if (respone === 'delete') {
            res.status(200).json({
                sucess: true,
                message: "delete rocket sucessfuly",
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}