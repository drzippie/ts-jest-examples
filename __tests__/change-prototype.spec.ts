/* eslint-disable import/first */

import { Client as PostgresClient } from 'pg'

import { TableList } from '../src/client'
import { PG_QUERY_RESULT1, PG_QUERY_RESULT2 } from './fixtures/pg-query'

describe('Table list class mock method', () => {
  const mockedConnect = PostgresClient.prototype.connect = jest.fn().mockResolvedValue(undefined)
  const mockedQuery = PostgresClient.prototype.query = jest.fn()
  test('all the tables are in camelcase', async () => {
    mockedQuery
      .mockResolvedValueOnce(PG_QUERY_RESULT1)
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
      .mockResolvedValueOnce(PG_QUERY_RESULT1)
      .mockResolvedValueOnce(PG_QUERY_RESULT2)
    const tableList = new TableList('localhost', 'postgres', 'postgres', 'postgres')
    expect(mockedConnect).toBeCalledTimes(0)

    await tableList.getTables()
    expect(mockedConnect).toBeCalledTimes(1)

    await tableList.getTables()
    // don't connect again
    expect(mockedConnect).toBeCalledTimes(1)
  })
})
