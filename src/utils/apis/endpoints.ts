const auth: string = '/auth'
const master: string = '/master'
const inventory: string = '/inventory'
const user: string = `${auth}/user`
const meta: string = `${master}/meta`
const purchase: string = '/inventory/item-purchase'
const sale: string = '/inventory/item-sale'
const car: string = `${master}/car`
const imports: string =`${master}/import`

export default {
  auth: {
    login: `${auth}/login`,
    logout: `${auth}/logout`,
    user: {
			index: `${auth}/user`,
      me: `${user}/me`,
      users: `${user}/users`,
      userById: (id: string) => `${user}/${id}`,
    },
		userPassword: `${auth}/user-password`,
  },
  master: {
    meta: {
      units: `${meta}/units`,
    },
		brand: `${master}/inventory-brand`,
		car: {
			code: `${car}/code`,
			groupType: `${car}/group-type`,
			type: `${car}/type`,
		},
		import: {
			priceList: `${imports}/price-list`,
			progress: (key: string) => `${imports}/progress/${key}`,
			cancel: `${imports}/cancel`,
		},
    customer: `${master}/customer`,
		countCustomer: `${master}/customer-count`,
    inventoryItem: `${master}/inventory-item`,
		inventoryItemCount: `${master}/inventory-item-count`,
		inventorySalesToday: `${inventory}/sales-today`,
		salesChart: `${inventory}/sales-chart`,
    supplier: `${master}/supplier`,
  },
	purchase: {
		purchase: `${purchase}`,
		payment: (purchaseId: string) => `${purchase}/${purchaseId}/payment`
	},
	sales: {
		sale: `${sale}`,
		payment: (purchaseId: string) => `${sale}/${purchaseId}/payment`
	}
}
