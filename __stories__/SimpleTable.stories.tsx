import React from 'react'
import { Meta, StoryObj } from '@storybook/react'

import { SimpleTable } from '../src'
import { SimpleTable as LegacySimpleTable } from '../src/old'

import s from './Button.stories.module.scss'

type Story = StoryObj<typeof SimpleTable>

const Caption = ({ children }: { children: React.ReactNode }) => <div className={s.caption}>{children}</div>

const members = [
  { id: 'hz-1', name: 'Bob Adams', role: 'Admin', joined: '2024-01-15' },
  { id: 'hz-2', name: 'Elly Johns', role: 'Member', joined: '2024-03-02' },
  { id: 'hz-3', name: 'Jim Andrews', role: 'Viewer', joined: '2024-05-11' },
]

export default {
  title: 'Components/SimpleTable',
  component: SimpleTable,
  parameters: {
    docs: { canvas: { sourceState: 'hidden' } },
    controls: { include: ['variant'] },
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['ghost', 'surface'],
      description: '"ghost" renders without an outer border; "surface" wraps the table in a bordered box.',
      table: { category: 'Appearance', defaultValue: { summary: 'ghost' } },
    },
  },
  args: { variant: 'ghost' },
} as Meta<typeof SimpleTable>

const TableContent = () => (
  <>
    <SimpleTable.Header>
      <SimpleTable.Row>
        <SimpleTable.ColumnHeaderCell>ID</SimpleTable.ColumnHeaderCell>
        <SimpleTable.ColumnHeaderCell>Name</SimpleTable.ColumnHeaderCell>
        <SimpleTable.ColumnHeaderCell>Role</SimpleTable.ColumnHeaderCell>
        <SimpleTable.ColumnHeaderCell>Joined</SimpleTable.ColumnHeaderCell>
      </SimpleTable.Row>
    </SimpleTable.Header>
    <SimpleTable.Body>
      {members.map((m) => (
        <SimpleTable.Row key={m.id}>
          <SimpleTable.Cell>{m.id}</SimpleTable.Cell>
          <SimpleTable.Cell>{m.name}</SimpleTable.Cell>
          <SimpleTable.Cell>{m.role}</SimpleTable.Cell>
          <SimpleTable.Cell>{m.joined}</SimpleTable.Cell>
        </SimpleTable.Row>
      ))}
    </SimpleTable.Body>
  </>
)

export const Playground: Story = {
  render: (args) => (
    <SimpleTable {...args}>
      <TableContent />
    </SimpleTable>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Toggle **variant** in the Controls panel to switch between ghost and surface.',
      },
    },
  },
}

export const Ghost = () => (
  <div className={s.section}>
    <Caption>
      The default <strong>ghost</strong> variant has no outer border. Row separators between body rows provide structure without visual
      clutter. Use it inside an already-framed container.
    </Caption>
    <SimpleTable>
      <TableContent />
    </SimpleTable>
  </div>
)
Ghost.tags = ['!dev']

export const Surface = () => (
  <div className={s.section}>
    <Caption>
      The <strong>surface</strong> variant wraps the table in a 1px bordered box with 8px radius. Use it when the table stands alone on a
      page and needs its own visual boundary.
    </Caption>
    <SimpleTable variant="surface">
      <TableContent />
    </SimpleTable>
  </div>
)
Surface.tags = ['!dev']

export const WithAlignment = () => (
  <div className={s.section}>
    <Caption>
      Use <strong>justify</strong> on cells to control horizontal text alignment — right-align numeric columns so values line up. Use{' '}
      <strong>align</strong> on rows for vertical cell alignment.
    </Caption>
    <SimpleTable variant="surface">
      <SimpleTable.Header>
        <SimpleTable.Row>
          <SimpleTable.ColumnHeaderCell>Name</SimpleTable.ColumnHeaderCell>
          <SimpleTable.ColumnHeaderCell justify="center">Role</SimpleTable.ColumnHeaderCell>
          <SimpleTable.ColumnHeaderCell justify="end">Joined</SimpleTable.ColumnHeaderCell>
        </SimpleTable.Row>
      </SimpleTable.Header>
      <SimpleTable.Body>
        {members.map((m) => (
          <SimpleTable.Row key={m.id} align="center">
            <SimpleTable.Cell>{m.name}</SimpleTable.Cell>
            <SimpleTable.Cell justify="center">{m.role}</SimpleTable.Cell>
            <SimpleTable.Cell justify="end">{m.joined}</SimpleTable.Cell>
          </SimpleTable.Row>
        ))}
      </SimpleTable.Body>
    </SimpleTable>
  </div>
)
WithAlignment.tags = ['!dev']

export const WithFooter = () => (
  <div className={s.section}>
    <Caption>
      Use <strong>SimpleTable.Footer</strong> for summary rows, totals, or pagination controls.
    </Caption>
    <SimpleTable variant="surface">
      <SimpleTable.Header>
        <SimpleTable.Row>
          <SimpleTable.ColumnHeaderCell>Name</SimpleTable.ColumnHeaderCell>
          <SimpleTable.ColumnHeaderCell>Role</SimpleTable.ColumnHeaderCell>
        </SimpleTable.Row>
      </SimpleTable.Header>
      <SimpleTable.Body>
        {members.map((m) => (
          <SimpleTable.Row key={m.id}>
            <SimpleTable.Cell>{m.name}</SimpleTable.Cell>
            <SimpleTable.Cell>{m.role}</SimpleTable.Cell>
          </SimpleTable.Row>
        ))}
      </SimpleTable.Body>
      <SimpleTable.Footer>
        <SimpleTable.Row>
          <SimpleTable.Cell colSpan={2} justify="center">
            {members.length} members total
          </SimpleTable.Cell>
        </SimpleTable.Row>
      </SimpleTable.Footer>
    </SimpleTable>
  </div>
)
WithFooter.tags = ['!dev']

export const LegacyV3 = () => (
  <div className={s.section}>
    <Caption>
      The v3 SimpleTable is preserved for gradual migration. Import from <strong>@hazelcast/ui/old</strong>. New code should use the
      SimpleTable above.
    </Caption>
    <LegacySimpleTable>
      <LegacySimpleTable.Header>
        <LegacySimpleTable.Row>
          <LegacySimpleTable.Th>ID</LegacySimpleTable.Th>
          <LegacySimpleTable.Th>Name</LegacySimpleTable.Th>
          <LegacySimpleTable.Th>Role</LegacySimpleTable.Th>
        </LegacySimpleTable.Row>
      </LegacySimpleTable.Header>
      <LegacySimpleTable.Body>
        {members.map((m) => (
          <LegacySimpleTable.Row key={m.id}>
            <LegacySimpleTable.Td>{m.id}</LegacySimpleTable.Td>
            <LegacySimpleTable.Td>{m.name}</LegacySimpleTable.Td>
            <LegacySimpleTable.Td>{m.role}</LegacySimpleTable.Td>
          </LegacySimpleTable.Row>
        ))}
      </LegacySimpleTable.Body>
    </LegacySimpleTable>
  </div>
)
LegacyV3.tags = ['!dev']
