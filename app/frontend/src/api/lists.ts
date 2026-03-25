 
import { api } from "./axios";

// @path POST /api/list/
export async function createList(listData){
    const res = await api.post('/list', listData)
    return res.data
}


// @path GET /api/list/
export async function getLists() {
    const res = await api.get('/list')
    return res.data
}

// @path PUT /api/list/:id
export async function updateList(id, updatedData){
const res = await api.put(`/list/${id}`, updatedData)
console.log(id, updatedData)
return res.data
}

// @path DELETE /api/list/:id
export async function deleteList(id){
    const res = await api.delete(`/list/${id}`)
    console.log(id)
    return res.data

}
