const findAll = async () => {
    const resp = await fetch('https://corsproxy.io/?https://www.fruityvice.com/api/fruit/all');
    return await resp.json()
}

export { findAll }