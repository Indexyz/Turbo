import should from 'should'
import userService from '../../database/service/user'
import database from '../../database/instance'

let user = null

beforeEach(async () => {
    user = await userService.create({
        username: 'indexyz',
        password: 'password',
        email: 'indexyz@email.com',
    })
})

afterEach(async () => {
    await database('users').delete()
        .where('id', user.id)
})

it('Create user', async () => {
    should(user).be.ok()
})

it('Test password hashed', async () => {
    should(user).have.property('password')
    should(user.password).not.be.eql('password')
})

describe('Login', async () => {
    it('Test login with true password', async () => {
        const loginUser = await userService.login('indexyz', 'password')

        should(loginUser).be.eql(user)
    })

    it('Login with wrong password', async () => {
        const loginUser = await userService.login('indexyz', 'anotherPassword')

        should(loginUser).not.be.ok()
    })

    it('Login with wrong username', async () => {
        const loginUser = await userService.login('username', 'password')

        should(loginUser).not.be.ok()
    })
})
