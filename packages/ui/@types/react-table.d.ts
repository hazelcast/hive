import type {
  UseFiltersColumnOptions,
  UseFiltersColumnProps,
  UseFiltersInstanceProps,
  UseFiltersOptions,
  UseFiltersState,
  UseGroupByColumnOptions,
  UseGroupByColumnProps,
  UseGroupByHooks,
  UseGroupByInstanceProps,
  UseGroupByOptions,
  UseGroupByRowProps,
  UseGroupByState,
  UsePaginationInstanceProps,
  UsePaginationOptions,
  UsePaginationState,
  UseResizeColumnsColumnOptions,
  UseResizeColumnsColumnProps,
  UseRowSelectHooks,
  UseRowSelectInstanceProps,
  UseRowSelectOptions,
  UseRowSelectRowProps,
  UseRowSelectState,
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByHooks,
  UseSortByInstanceProps,
  UseSortByOptions,
  UseSortByState,
} from 'react-table'

// Copied from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-table

declare module 'react-table' {
  // take this file as-is, or comment out the sections that don't apply to your plugin configuration
  export interface TableOptions<
    // eslint-disable-next-line @typescript-eslint/ban-types
    D extends object = {}
  > extends UsePaginationOptions<D>,
      UseSortByOptions<D>,
      UseFiltersOptions<D>,
      UseRowSelectOptions<D>,
      UseGroupByOptions<D>,
      // UseExpandedOptions<D>,
      // UseGlobalFiltersOptions<D>,
      UseResizeColumnsOptions<D>,
      // UseRowStateOptions<D>,

      // note that having Record here allows you to add anything to the options, this matches the spirit of the
      // underlying js library, but might be cleaner if it's replaced by a more specific type that matches your
      // feature set, this is a safe default.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Record<string, any> {}

  export interface Hooks<
    // eslint-disable-next-line @typescript-eslint/ban-types
    D extends object = {}
  > extends UseSortByHooks<D>,
      UseRowSelectHooks<D>,
      // UseExpandedHooks<D>,
      UseGroupByHooks<D> {}

  export interface TableInstance<
    // eslint-disable-next-line @typescript-eslint/ban-types
    D extends object = {}
  > extends UsePaginationInstanceProps<D>,
      UseSortByInstanceProps<D>,
      UseFiltersInstanceProps<D>,
      UseRowSelectInstanceProps<D>,
      // UseColumnOrderInstanceProps<D>,
      // UseExpandedInstanceProps<D>,
      // UseGlobalFiltersInstanceProps<D>,
      // UseRowStateInstanceProps<D>,
      UseGroupByInstanceProps<D> {}

  export interface TableState<
    // eslint-disable-next-line @typescript-eslint/ban-types
    D extends object = {}
  > extends UsePaginationState<D>,
      UseSortByState<D>,
      UseFiltersState<D>,
      UseRowSelectState<D>,
      UseGroupByState<D>,
      // UseColumnOrderState<D>,
      // UseExpandedState<D>,
      // UseGlobalFiltersState<D>,
      // UseRowStateState<D>,
      UseResizeColumnsState<D> {}

  export interface ColumnInterface<
    // eslint-disable-next-line @typescript-eslint/ban-types
    D extends object = {}
  > extends UseSortByColumnOptions<D>,
      UseFiltersColumnOptions<D>,
      UseGroupByColumnOptions<D>,
      // UseGlobalFiltersColumnOptions<D>,
      UseResizeColumnsColumnOptions<D> {
    Footer?: string | Renderer<TableInstance<D>>
    align?: 'left' | 'right' | 'center'
  }

  export interface ColumnInstance<
    // eslint-disable-next-line @typescript-eslint/ban-types
    D extends object = {}
  > extends UseSortByColumnProps<D>,
      UseFiltersColumnProps<D>,
      UseGroupByColumnProps<D>,
      UseResizeColumnsColumnProps<D> {}

  export interface Cell<
    // eslint-disable-next-line @typescript-eslint/ban-types
    D extends object = {},
    /* eslint-disable @typescript-eslint/no-unused-vars */
    /* eslint-disable @typescript-eslint/no-explicit-any */
    V = any
  > extends UseGroupByCellProps<D>,
      UseRowStateCellProps<D> {}

  export interface Row<
    // eslint-disable-next-line @typescript-eslint/ban-types
    D extends object = {}
  > extends UseGroupByRowProps<D>,
      // UseExpandedRowProps<D>,
      // UseRowSelectRowProps<D>,
      UseRowSelectRowProps<D> {}
}
