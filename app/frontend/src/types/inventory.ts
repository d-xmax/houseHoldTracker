export interface Item {
  id: string
  name: string
  description: string
  category: string
  price: number
  quantity: number
  unit: string
  location: string
  condition: "Good" | "Fair" | "Poor" | "Expired"
  addedDate: string
}

export interface InventoryList {
  id: string
  name: string
  description: string
  color: string
  items: Item[]
  createdDate: string
}

export interface Notification {
  type: "success" | "error" | "info"
  message: string
}
