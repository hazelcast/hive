import React, { FC, useState } from 'react'

import { Pagination, PaginationProps } from '../src/Pagination'
import { Toggle } from '../src/Toggle'

import styles from './utils.scss'

export default {
  title: 'Components/Pagination',
  component: Pagination,
}

const StoryBase: FC<Pick<PaginationProps, 'showPageJump' | 'showRowsSelect' | 'showRangeOfShownItems'>> = ({
  showPageJump,
  showRowsSelect,
  showRangeOfShownItems,
}) => {
  const numberOfItems = 10000
  const [pageSize, setPageSize] = useState<number>(5)
  const pageSizeOptions = [5, 10, 100, 1000]
  const [currentPage, setCurrentPage] = useState<number>(1)
  const pageCount = Math.ceil(numberOfItems / pageSize)
  const canPreviousPage = currentPage !== 1
  const canNextPage = currentPage !== pageCount
  const previousPage = () => {
    setCurrentPage((prevState) => prevState - 1)
  }
  const nextPage = () => {
    setCurrentPage((prevState) => prevState + 1)
  }

  return (
    <Pagination
      pageCount={pageCount}
      currentPage={currentPage}
      canPreviousPage={canPreviousPage}
      canNextPage={canNextPage}
      goToPage={setCurrentPage}
      nextPage={nextPage}
      previousPage={previousPage}
      pageSize={pageSize}
      setPageSize={setPageSize}
      pageSizeOptions={pageSizeOptions}
      numberOfItems={numberOfItems}
      showRangeOfShownItems={showRangeOfShownItems}
      showPageJump={showPageJump}
      showRowsSelect={showRowsSelect}
    />
  )
}

export const Default = () => {
  const [showRowsSelect, setShowRowsSelect] = useState(true)
  const [showRangeOfShownItems, setShowRangeOfShownItems] = useState(true)
  const [showPageJump, setShowPageJump] = useState(true)

  return (
    <>
      <StoryBase showRowsSelect={showRowsSelect} showRangeOfShownItems={showRangeOfShownItems} showPageJump={showPageJump} />

      <hr />
      <div className={styles.toggles}>
        <Toggle
          name="default"
          checked={showRowsSelect}
          label="Show Row Select"
          onChange={(e) => {
            setShowRowsSelect(e.target.checked)
          }}
        />
        <Toggle
          name="default"
          checked={showRangeOfShownItems}
          label="Show Range of Shown Items"
          onChange={(e) => {
            setShowRangeOfShownItems(e.target.checked)
          }}
        />
        <Toggle
          name="default"
          checked={showPageJump}
          label="Show Page Jump"
          onChange={(e) => {
            setShowPageJump(e.target.checked)
          }}
        />
      </div>
    </>
  )
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=9962%3A1',
  },
}

export const WithoutRangeOfShownItems = () => <StoryBase showRangeOfShownItems={false} />

export const WithoutPageJump = () => <StoryBase showPageJump={false} />

export const WithoutRowsSelect = () => <StoryBase showRowsSelect={false} />

export const MinimalExample = () => <StoryBase showPageJump={false} showRowsSelect={false} showRangeOfShownItems={false} />
