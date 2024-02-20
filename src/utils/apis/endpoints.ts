const auth: string = '/auth'
const user: string = `${auth}/user`

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
}
