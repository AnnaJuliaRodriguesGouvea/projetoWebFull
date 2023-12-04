import axios from "axios";

export async function insertFruit(fruit) {
    try {
        return await axios.post(`https://localhost:3001/fruit`, {
            name: fruit.name,
            family: fruit.family,
            order: fruit.order,
            genus: fruit.genus,
            calories: fruit.calories,
            fat: fruit.fat,
            sugar: fruit.sugar,
            carbohydrates: fruit.carbohydrates,
            protein: fruit.protein
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })

    } catch (err) {
        throw (err.response)
    }
}

export async function getFruits(limit, page, filter, substring) {
    try {
        return await axios.get(`https://localhost:3001/fruit?limit=${limit}&page=${page}&filter=${filter}&substring=${substring}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })

    } catch (err) {
        throw (err.response)
    }
}
