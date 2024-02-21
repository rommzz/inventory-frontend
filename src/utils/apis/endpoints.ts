const auth: string = '/auth'
const master: string = '/master'
const user: string = `${auth}/user`
const meta: string = `${master}/meta`

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
    supplier: `${master}/supplier`,
  }
}
