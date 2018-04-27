import should from 'should'
import userService from '../../database/service/user'
import database from '../../database/instance'


const getTestUser = async () => {
    return await userService.create({
        username: 'indexyz',
        password: 'password',
        email: 'indexyz@email.com',
    })
}

it('Create user', async () => {
    const user = await getTestUser()

    should(user).be.ok()
    await database('users').delete()
        .where('id', user.id)
})

it('Test password hashed', async () => {
    const user = await getTestUser()

    should(user).have.property('password')
    should(user.password).not.be.eql('password')

    await database('users').delete()
        .where('id', user.id)
})
