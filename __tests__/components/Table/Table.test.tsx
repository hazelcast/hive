import React from 'react'
import startCase from 'lodash/startCase'
import { fireEvent, screen, within, act } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { axeDefaultOptions, renderAndCheckA11Y } from '../../../src'

import { getColumns } from './utils'
import { Table } from '../../../src/components/Table/Table'
import { bigDataSet, smallDataSet } from './consts'

import cellStyles from '../../../src/components/Table/Cell.module.scss'
import headerStyles from '../../../src/components/Table/Header.module.scss'
import paginationStyles from '../../src/Pagination.module.scss'

const rules = axeDefaultOptions?.rules ?? {}
const axeOptions = {
  ...axeDefaultOptions,
  rules: {
    ...rules,
    'autocomplete-valid': { enabled: false },
  },
}

jest.mock('../../../src/components/Table/utils', () => ({
  ...jest.requireActual('../../../src/components/Table/utils'),
  getCellStyle: () => {
    const width = '100px'
    const minWidth = '100px'
    const maxWidth = '100px'
    return {
      width,
      minWidth: minWidth || width,
      flex: `${width} 0 auto`,
      boxSizing: 'border-box',
      maxWidth,
    }
  },
}))

describe('Table', () => {
  it('renders table and pagination with correct props', async () => {
    const columns = getColumns({})

    await renderAndCheckA11Y(<Table data-test="table-test" columns={columns} data={smallDataSet} disableSortBy />, {
      axeOptions,
    })

    const tableWrapper = screen.queryByTestId('table-test')

    const table = within(tableWrapper!).queryByTestId('table')

    expect(table!.getAttribute('role')).toBe('table')
    expect(table!.getAttribute('aria-rowcount')).toBe(String(smallDataSet.length + 1))

    const headerRowGroup = within(tableWrapper!).queryByTestId('table-header-row-group')

    expect(headerRowGroup).toBeInTheDocument()
    expect(headerRowGroup!.getAttribute('role')).toBe('rowgroup')

    const headerRow = within(headerRowGroup!).queryByTestId('table-header-row')

    expect(headerRow).toBeInTheDocument()
    expect(headerRow!.getAttribute('role')).toBe('row')
    expect(headerRow!.getAttribute('aria-rowindex')).toBe('1')

    within(headerRowGroup!)
      .getAllByTestId('table-header-container')
      .forEach((header, i: number) => {
        const column = columns[i]
        expect(header.getAttribute('role')).toBe('columnheader')
        expect(header.getAttribute('aria-colspan')).toBe('1')

        const content = within(header).queryByTestId('table-header-content')

        expect(content).toBeInTheDocument()
        expect(content!.getAttribute('class')?.includes(cellStyles[`align${startCase(column.align)}`])).toBeTruthy()
      })

    const tableContent = within(tableWrapper!).queryByTestId('table-content')

    expect(tableContent).toBeInTheDocument()
    expect(tableContent?.getAttribute('class')).toBe('content')

    const cellRows = within(tableContent!).queryAllByTestId('table-cell-row')
    cellRows.forEach((cellRow, i: number) => {
      expect(cellRow.getAttribute('role')).toBe('row')
      expect(cellRow.getAttribute('aria-rowindex')).toBe(String(i + 2))

      const cells = within(cellRow).queryAllByTestId('table-cell')

      cells.forEach((cell, j) => {
        const column = columns[j]
        expect(cell.getAttribute('role')).toBe('cell')
        if (column) {
          expect(cell.getAttribute('class')?.includes(cellStyles[`align${startCase(column.align)}`])).toBeTruthy()
        }
      })
    })

    const pagination = within(tableWrapper!).queryByTestId('pagination')

    expect(pagination).toBeInTheDocument()
    expect(within(pagination!).queryByTestId('pagination-buttons')).not.toBeInTheDocument()
    expect(within(pagination!).queryByTestId('pagination-rows-per-page-select')).not.toBeInTheDocument()

    expect(screen.queryByTestId('table-no-data')).not.toBeInTheDocument()
    expect(screen.queryByTestId('table-loader-cell')).not.toBeInTheDocument()
  })

  it('renders table footer with correct props', async () => {
    const columns = getColumns({ withFooter: true })

    await renderAndCheckA11Y(<Table data-test="table-test" columns={columns} data={smallDataSet} disableSortBy />, {
      axeOptions,
    })

    const footerRowGroup = screen.queryByTestId('table-footer-row-group')

    expect(footerRowGroup).toBeInTheDocument()
    expect(footerRowGroup!.getAttribute('role')).toBe('rowgroup')

    const footerRow = within(footerRowGroup!).queryByTestId('table-cell-row')

    expect(footerRow).toBeInTheDocument()
    expect(footerRow!.getAttribute('role')).toBe('row')
    expect(footerRow!.getAttribute('aria-rowindex')).toBe('12')

    const cells = within(footerRow!).queryAllByTestId('table-cell')
    cells.forEach((footer, i) => {
      expect(footer.getAttribute('role')).toBe('cell')
      expect(footer.getAttribute('aria-colspan')).toBe('1')
      expect(footer.getAttribute('class')?.includes(cellStyles[`align${startCase(columns[i].align)}`])).toBeTruthy()
    })
  })

  it('renders table without pagination', async () => {
    const columns = getColumns({})

    await renderAndCheckA11Y(<Table data-test="table-test" columns={columns} data={smallDataSet} hidePagination />)

    expect(screen.queryByTestId('table')).toBeInTheDocument()
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument()
  })

  it('renders table with sorting capabilities', async () => {
    const columns = getColumns({})

    await renderAndCheckA11Y(<Table data-test="table-test" columns={columns} data={smallDataSet} />, { axeOptions })

    const headers = screen.queryAllByTestId('table-header-container')

    for (const header of headers) {
      const content = within(header).getByTestId('table-header-content')
      // Sorting enabled but not used
      expect(header.getAttribute('aria-sort')).toBe(null)
      expect(content.getAttribute('class')?.includes(headerStyles.sortable)).toBeTruthy()

      // Let's sort!
      await act(async () => {
        await userEvent.click(content)
      })

      expect(header.getAttribute('aria-sort')).toBe('ascending')
      expect(content.getAttribute('class')?.includes(headerStyles.sortable)).toBeTruthy()

      // Let's sort in descending order
      await act(async () => {
        await userEvent.click(content)
      })

      expect(header.getAttribute('aria-sort')).toBe('descending')
      expect(content.getAttribute('class')?.includes(headerStyles.sortable)).toBeTruthy()

      // Back to default state
      await act(async () => {
        await userEvent.click(content)
      })

      expect(header.getAttribute('aria-sort')).toBe(null)
      expect(content.getAttribute('class')?.includes(headerStyles.sortable)).toBeTruthy()
    }
  })

  it('renders table without data', async () => {
    const columns = getColumns({ withFooter: true })

    await renderAndCheckA11Y(<Table data-test="table-test" columns={columns} data={[]} hidePagination />)

    expect(screen.queryByTestId('table')).toBeInTheDocument()
    expect(screen.queryByTestId('table-footer-row-group')).not.toBeInTheDocument()
    expect(screen.queryByTestId('table-no-data')).toBeInTheDocument()
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument()
  })

  it('renders table with loader when data exists', async () => {
    const columns = getColumns({ withFooter: true })

    await renderAndCheckA11Y(<Table loading data-test="table-test" columns={columns} data={smallDataSet} hidePagination />)

    expect(screen.queryByTestId('table')).toBeInTheDocument()
    expect(screen.queryByTestId('table-footer-row-group')).not.toBeInTheDocument()
    expect(screen.queryByTestId('table-no-data')).not.toBeInTheDocument()
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument()
  })

  it('renders table with loader when data not exists', async () => {
    const columns = getColumns({ withFooter: true })

    await renderAndCheckA11Y(<Table loading data-test="table-test" columns={columns} data={[]} hidePagination />)

    expect(screen.queryByTestId('table')).toBeInTheDocument()
    expect(screen.queryByTestId('table-footer-row-group')).not.toBeInTheDocument()
    expect(screen.queryByTestId('table-no-data')).not.toBeInTheDocument()
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument()
  })

  it('renders table without header', async () => {
    const columns = getColumns({ withFooter: true })

    await renderAndCheckA11Y(<Table hideHeader data-test="table-test" columns={columns} data={[]} hidePagination />)

    expect(screen.queryByTestId('table')).toBeInTheDocument()
    expect(screen.queryByTestId('table-header-row-group')).not.toBeInTheDocument()
  })

  it('Reset out of range pageIndex to last available page', async () => {
    const columns = getColumns({ withFooter: true })

    const { rerender } = await renderAndCheckA11Y(<Table data-test="table-test" columns={columns} data={bigDataSet} />)

    expect(within(screen.getByTestId('table-content')).queryByText(bigDataSet[0].name)).toBeInTheDocument()
    expect(within(screen.getByTestId('table-content')).queryByText(bigDataSet[10].name)).not.toBeInTheDocument()

    await userEvent.click(screen.getByTestId('pagination-buttons-next-page'))

    expect(within(screen.getByTestId('table-content')).queryByText(bigDataSet[10].name)).toBeInTheDocument()
    expect(within(screen.getByTestId('table-content')).queryByText(bigDataSet[0].name)).not.toBeInTheDocument()

    rerender(<Table data-test="table-test" columns={columns} data={smallDataSet} />)
    await act(async () => {})

    expect(within(screen.getByTestId('table-content')).queryByText(smallDataSet[0].name)).toBeInTheDocument()
    expect(within(screen.getByTestId('table-content')).queryByText(bigDataSet[10].name)).not.toBeInTheDocument()
  })

  it('Controlled pagination', async () => {
    const columns = getColumns({ withFooter: true })

    const { rerender } = await renderAndCheckA11Y(<Table data-test="table-test" pageIndex={1} columns={columns} data={bigDataSet} />)

    expect(within(screen.getByTestId('table-content')).queryByText(bigDataSet[0].name)).not.toBeInTheDocument()
    expect(within(screen.getByTestId('table-content')).queryByText(bigDataSet[20].name)).not.toBeInTheDocument()
    expect(within(screen.getByTestId('table-content')).queryByText(bigDataSet[10].name)).toBeInTheDocument()

    await userEvent.click(screen.getByTestId('pagination-buttons-next-page'))

    expect(within(screen.getByTestId('table-content')).queryByText(bigDataSet[0].name)).not.toBeInTheDocument()
    expect(within(screen.getByTestId('table-content')).queryByText(bigDataSet[20].name)).toBeInTheDocument()
    expect(within(screen.getByTestId('table-content')).queryByText(bigDataSet[10].name)).not.toBeInTheDocument()

    rerender(<Table data-test="table-test" pageIndex={2} columns={columns} data={bigDataSet} />)

    expect(within(screen.getByTestId('table-content')).queryByText(bigDataSet[10].name)).not.toBeInTheDocument()
    expect(within(screen.getByTestId('table-content')).queryByText(bigDataSet[20].name)).toBeInTheDocument()
    expect(within(screen.getByTestId('table-content')).queryByText(bigDataSet[30].name)).not.toBeInTheDocument()
  })

  it('SubRows', async () => {
    const columns = getColumns({ withFooter: true })

    await renderAndCheckA11Y(
      <Table
        data-test="table-test"
        columns={columns}
        data={[{ ...smallDataSet[0], subRows: [smallDataSet[4], smallDataSet[5]] }, ...smallDataSet.slice(1)]}
      />,
    )

    expect(screen.getAllByTestId('row-expander').length).toBe(1)
    expect(within(screen.getByTestId('table-cell-row-group')).getAllByTestId('table-cell-row').length).toBe(10)
    expect(screen.getByTestId('row-expander').getAttribute('aria-expanded')).toBe('false')

    await userEvent.click(screen.getByTestId('row-expander'))

    expect(within(screen.getByTestId('table-cell-row-group')).getAllByTestId('table-cell-row').length).toBe(12)
    expect(screen.getByTestId('row-expander').getAttribute('aria-expanded')).toBe('true')
  })

  it('Custom expandable content', async () => {
    const columns = getColumns({ withFooter: true })

    await renderAndCheckA11Y(
      <Table
        data-test="table-test"
        columns={columns}
        data={smallDataSet}
        renderRowSubComponent={() => <div data-test="custom-expandable-content" />}
      />,
    )

    expect(screen.getAllByTestId('row-expander').length).toBe(10)
    expect(screen.queryByTestId('custom-expandable-content')).not.toBeInTheDocument()

    await userEvent.click(screen.getAllByTestId('row-expander')[0])

    expect(screen.getAllByTestId('custom-expandable-content').length).toBe(1)
  })

  it('Columns selection', async () => {
    const columns = getColumns({})
    const onCopy = jest.fn()

    const { rerender } = await renderAndCheckA11Y(<Table data-test="table-test" columns={columns} data={smallDataSet} />)

    expect(screen.queryAllByTestId('cell-copyable-popover').length).toBe(0)

    await act(async () => {
      fireEvent.mouseDown(screen.queryAllByTestId('table-cell')[0], {})
    })

    expect(screen.queryAllByTestId('table-cell')[0].getAttribute('class')?.includes(cellStyles.selected)).toBeFalsy()

    rerender(<Table data-test="table-test" columns={columns} onCopy={onCopy} data={smallDataSet} />)
    await act(async () => {
      fireEvent.mouseDown(screen.queryAllByTestId('table-cell')[0], {})
    })

    expect(screen.queryAllByTestId('table-cell')[0].getAttribute('class')?.includes(cellStyles.selected)).toBeTruthy()
    expect(screen.queryAllByTestId('cell-copyable-popover').length).toBe(0)

    await act(async () => {
      fireEvent.doubleClick(screen.queryAllByTestId('table-cell')[0], {})
    })

    expect(screen.queryAllByTestId('cell-copyable-popover').length).toBe(1)
  })

  describe('Initial state', () => {
    it('hidden columns', async () => {
      const columns = getColumns({})

      await renderAndCheckA11Y(
        <Table
          data-test="table-test"
          columns={columns}
          data={smallDataSet}
          initialState={{
            hiddenColumns: ['name'],
          }}
        />,
      )

      expect(screen.queryByRole('cell', { name: smallDataSet[0].name })).not.toBeInTheDocument()
    })

    it('columns order', async () => {
      const rowData = smallDataSet[0]
      const initialRowName = `${rowData.id} ${rowData.name} ${rowData.age} ${rowData.visits} ${rowData.status}`
      const reorderedRowName = `${rowData.name} ${rowData.id} ${rowData.age} ${rowData.status} ${rowData.visits}`

      await renderAndCheckA11Y(
        <Table
          data-test="table-test"
          columns={getColumns({})}
          data={smallDataSet}
          initialState={{
            columnOrder: ['name', 'ID', 'age', 'status', 'visits'],
          }}
        />,
      )

      expect(screen.queryByRole('row', { name: initialRowName })).not.toBeInTheDocument()
      expect(screen.queryByRole('row', { name: reorderedRowName })).toBeInTheDocument()
    })

    it('sorting', async () => {
      const { container } = await renderAndCheckA11Y(
        <Table
          data-test="table-test"
          columns={getColumns({})}
          data={smallDataSet}
          initialState={{
            sortBy: [
              {
                id: 'name',
              },
            ],
          }}
        />,
      )

      expect(container.querySelector('[aria-sort="ascending"]')).toBeInTheDocument()
      expect(within(container.querySelector('[aria-sort="ascending"]')!).queryByText('Name')).toBeInTheDocument()
    })
  })

  it('should reset page index when new data length is smaller than the current index', async () => {
    const columns = getColumns({})

    const { container, rerender } = await renderAndCheckA11Y(<Table data-test="table-test" columns={columns} data={bigDataSet} />, {
      axeOptions,
    })

    const buttons = screen.getAllByTestId('pagination-buttons-go-to-page')
    let activeButton = container.querySelector(`.${paginationStyles.selected}`)

    expect(activeButton).toBeInTheDocument()
    expect(activeButton).toHaveTextContent('1')

    await userEvent.click(buttons[2])

    activeButton = container.querySelector(`.${paginationStyles.selected}`)

    expect(activeButton).toBeInTheDocument()
    expect(activeButton).toHaveTextContent('100')

    await act(async () => {
      rerender(<Table data-test="table-test" columns={columns} data={[...bigDataSet]} />)
    })

    activeButton = container.querySelector(`.${paginationStyles.selected}`)

    expect(activeButton).toBeInTheDocument()
    expect(activeButton).toHaveTextContent('100')

    await act(async () => {
      rerender(<Table data-test="table-test" columns={columns} data={bigDataSet.slice(bigDataSet.length / 2)} />)
    })

    activeButton = container.querySelector(`.${paginationStyles.selected}`)

    expect(activeButton).toBeInTheDocument()
    expect(activeButton).toHaveTextContent('50')
  })
})
