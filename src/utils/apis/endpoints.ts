const auth: string = '/auth'
const master: string = '/master'
const user: string = `${auth}/user`
const meta: string = `${master}/meta`
const purchase: string = '/inventory/item-purchase/'
const sale: string = '/inventory/item-sale'
const car: string = `${master}/car`

export default {
  auth: {
    login: `${auth}/login`,
    logout: `${auth}/logout`,
    user: {
      me: `${user}/me`,
      users: `${user}/users`,
      userById: `${user}/user/:id`,
    },
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
    customer: `${master}/customer`,
    inventoryItem: `${master}/inventory-item`,
    supplier: `${master}/supplier`,
  },
	purchase: {
		purchase: `${purchase}`,
		payment: (purchaseId: string) => `${purchase}${purchaseId}/payment`
	},
	sales: {
		sale: `${sale}`,
		payment: (purchaseId: string) => `${sale}/${purchaseId}/payment`
	}
}
