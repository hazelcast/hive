import namor from 'namor'
import { range } from '@hazelcast/helpers'

type Status = 'relationship' | 'complicated' | 'single'

export type Person = {
  name: string
  id: number
  age: number
  visits: number
  status: Status
}

const newPerson = (id: number): Person => {
  const statusChance = Math.random()
  return {
    name: `${namor.generate({
      words: 1,
      saltLength: 0,
    })} ${namor.generate({
      words: 1,
      saltLength: 0,
      subset: 'manly',
    })}`,
    id: id,
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    status: statusChance > 0.66 ? 'relationship' : statusChance > 0.33 ? 'complicated' : 'single',
  }
}

export const makeData = (length: number): Person[] => range(1, length).map((id) => newPerson(id))
