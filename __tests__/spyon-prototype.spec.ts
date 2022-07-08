/* eslint-disable import/first */

import { Client as PostgresClient } from 'pg'

import { TableList } from '../src/client'
import { PG_QUERY_RESULT1, PG_QUERY_RESULT2 } from './fixtures/pg-query'

describe('Spyon prototype', () => {
  const mockedConnect = jest
    .spyOn(PostgresClient.prototype, 'connect')
    .mockImplementation(() => Promise.resolve(undefined))
  const mockedQuery = jest
    .spyOn(PostgresClient.prototype, 'query')

  afterEach(async () => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })
  test('all the tables are in camelcase', async () => {
    mockedQuery
      .mockImplementationOnce(() => PG_QUERY_RESULT1)
    const tableList = new TableList('localhost', 'postgres', 'postgres', 'postgres')
    expect(mockedConnect).toBeCalledTimes(0)

    const tables = await tableList.getTables()
    expect(mockedConnect).toBeCalledTimes(1)

    expect(tables.length).toBe(PG_QUERY_RESULT1.rows.length)
    // the tables must be in uppercase
    expect(tables.filter(row => row.toUpperCase() === row).length).toBe(PG_QUERY_RESULT1.rows.length)
  })
  test('pg connect called once', async () => {
    mockedQuery
      .mockImplementationOnce(() => PG_QUERY_RESULT1)
      .mockImplementationOnce(() => PG_QUERY_RESULT2)
    const tableList = new TableList('localhost', 'postgres', 'postgres', 'postgres')
    expect(mockedConnect).toBeCalledTimes(0)

    await tableList.getTables()
    expect(mockedConnect).toBeCalledTimes(1)

    await tableList.getTables()
    // don't connect again
    expect(mockedConnect).toBeCalledTimes(1)
  })
})
