const handlers = require('./index')

describe.skip('Endpoints', () => {
    describe('Users', () => {
        describe('GET', () => {
            it('Return to user json', async () => {
                const axios = {
                    get: jest.fn().mockResolvedValue({ data: 1 }),
                }

                const res = {
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn()
                }
                // console.log(axios.get)
                await handlers({ axios }).get({}, res)
                expect(res.status.mock.calls).toEqual([[200]])
                expect(res.send.mock.calls).toEqual([[1]])
            });
        });
        describe('Post', () => {
            it('Create a resource', async () => {
                const axios = {
                    post: jest.fn().mockResolvedValue({ data: 1 }),
                }
                
                const res = {
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn()
                }
                
                const req = {
                    body: 'request body'
                }
                
                await handlers({ axios }).post(req, res)
                expect(res.status.mock.calls).toEqual([[201]])
                expect(res.send.mock.calls).toEqual([[1]])
                expect(axios.post.mock.calls).toEqual(
                    [['https://jsonplaceholder.typicode.com/users', 'request body']]
                )
            });
        });
        describe('Put', () => {
            it('Update a resource', async () => {
                const axios = {
                    put: jest.fn().mockResolvedValue({ data: 1 }),
                }

                const req = {
                    body: 'request body',
                    params: {
                        id: 12,
                    },
                }

                const res = {
                    sendStatus: jest.fn(),
                }

                await handlers({ axios }).put(req, res)
                expect(axios.put.mock.calls).toEqual([['https://jsonplaceholder.typicode.com/users/12', 'request body']])
                expect(res.sendStatus.mock.calls).toEqual([[204]])
            });
            
        });
        describe('Delete', () => {
            it('Delete a resource', async () => {
                const req = {
                    params: {
                        id: 54,
                    },
                }

                const axios = {
                    delete: jest.fn(),
                }

                const res = {
                    sendStatus: jest.fn(),
                }

                await handlers({ axios }).delete(req, res)
                expect(axios.delete.mock.calls).toEqual([['https://jsonplaceholder.typicode.com/users/54']])
                expect(res.sendStatus.mock.calls).toEqual([[204]])
            });
        });
    });
});