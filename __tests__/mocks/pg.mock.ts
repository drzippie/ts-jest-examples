export const mockedQuery = jest.fn()
export const mockedConnect = jest.fn()
export const mockedEnd = jest.fn()

export class MockedClientClass {
  public query = mockedQuery
  public end = mockedEnd
  public connect = mockedConnect
}

export const mockedPgClient = (className = 'Client') => {
  return {
    ...jest.requireActual('pg'),
    [className]: MockedClientClass
  }
}

export const mockedPg = () => ({
  ...jest.requireActual('pg'),
  Client: MockedClientClass
})
