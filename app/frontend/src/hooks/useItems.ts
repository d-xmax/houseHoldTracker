import { createItem , deleteItem, updateItem} from "@/api/items";
 
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useItems(userId?: string) {
   const queryClient = useQueryClient()
    const createItemMutation = useMutation<
     unknown,
     Error,
     { listId: string; itemData: unknown }
    >({
        mutationFn : ({listId, itemData})=>{
        console.log(listId)
        console.log(itemData)
        return createItem(listId, itemData)
    },
    onSuccess: ()=> {
        queryClient.invalidateQueries({
            queryKey: ['items', userId]
        })
    }
   })
   const deleteItemMutation = useMutation<
    unknown,
    Error,
    { itemId: string; listId?: string }
   >({
    mutationFn : ({itemId})=>{
        console.log(itemId)
        return deleteItem(itemId)
    },
    onSuccess: ()=> {
        queryClient.invalidateQueries({
            queryKey: ['items', userId]
        })
    }
   })
   const updateItemMutation = useMutation<
    unknown,
    Error,
    { itemId: string; updatedData: unknown }
   >({
    mutationFn : ({itemId, updatedData})=>{
        console.log(itemId)
        console.log(updatedData)
        return updateItem(itemId, updatedData)
    },
    onSuccess: ()=> {
        queryClient.invalidateQueries({
            queryKey: ['items', userId]
        })
    }
   })
 
return {
    createItemMutation,
    deleteItemMutation,
    updateItemMutation
}
}

