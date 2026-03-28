import { api } from "./axios";

// @path POST /api/:listId/item
export async function createItem(listId, itemData){
    const res = await api.post(`${listId}/item`, itemData)
    return res.data
}
 
// @path GET /api/:listId/item
export async function getAllItem(listId){
    const res = await api.get(`${listId}/item`)
    return res.data
}
 
// @path DELETE /api/item/:itemId
export async function deleteItem(itemId){
    const res = await api.delete(`/item/${itemId}`)
    // log removed
    return res.data
}

// @path PUT /api/item/:itemId
export async function updateItem(itemId, updatedData){
    const res = await api.put(`/item/${itemId}`, updatedData)
    // log removed
    return res.data
}