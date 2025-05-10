import React, { FC, Fragment, KeyboardEventHandler, memo, useLayoutEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { useUID } from 'react-uid'
import { Terminal as TerminalIcon } from 'react-feather'

import { DataTestProp } from '../helpers/types'
import { Icon } from './Icon'

import styles from './Terminal.module.scss'

export class CommandTimeoutError extends Error {
  name = 'CommandTimeoutError'
}

const HISTORY_LIMIT = 100
const COMMAND_TIMEOUT = 60000

export type TerminalProps = {
  onExecute: (command: string, args: string[]) => Promise<string[]>
  commandTimeout?: number
  historyLimit?: number
  className?: string
  inputClassName?: string
  welcomeMessage?: string
  prompt?: string
  initialExecutionHistory?: ExecutionHistoryState[]
  initialCommand?: string
  initialLoading?: boolean
  autoFocusInitial?: boolean
} & DataTestProp

export interface ExecutionHistoryState {
  prompt?: string
  command: string
  res?: string[]
  error?: string
}

export const Terminal: FC<TerminalProps> = memo(
  ({
    'data-test': dataTest,
    onExecute,
    commandTimeout = COMMAND_TIMEOUT,
    historyLimit = HISTORY_LIMIT,
    className,
    inputClassName,
    welcomeMessage,
    prompt,
    initialExecutionHistory = [],
    initialCommand = '',
    initialLoading = false,
    autoFocusInitial = true,
  }) => {
    const [inputVal, setInputVal] = useState(initialCommand)

    const [executionHistoryPointer, setExecutionHistoryPointer] = useState<number | undefined>()
    const [executionHistory, setExecutionHistory] = useState<ExecutionHistoryState[]>(initialExecutionHistory)

    useLayoutEffect(() => {
      inputRef.current!.focus({ preventScroll: true })
    }, [executionHistory])

    const addExecutionHistoryItem = (newHistoryItem: ExecutionHistoryState) => {
      setExecutionHistory((prevHistory) => {
        const newHistory = [...prevHistory, newHistoryItem]

        if (newHistory.length > historyLimit) {
          newHistory.shift()
        }

        return newHistory
      })
      setExecutionHistoryPointer(undefined)
    }

    const [executing, setExecuting] = useState(initialLoading)

    const inputRef = useRef<HTMLInputElement>(null)

    const execute = async () => {
      const commandTokens = inputVal.split(' ').filter((token) => !!token)

      let timer!: NodeJS.Timeout

      try {
        setExecuting(true)

        const res = await Promise.race<string[]>([
          onExecute(commandTokens[0], commandTokens.slice(1)),
          // This promise will never be resolved so we can type is as we want to make TS happy
          new Promise<string[]>((_, reject) => {
            timer = setTimeout(() => {
              reject(new CommandTimeoutError(`${inputVal} exceeded timeout ${commandTimeout}`))
            }, commandTimeout)
          }),
        ])

        addExecutionHistoryItem({ command: inputVal, res, prompt })
      } catch (err) {
        if (err instanceof Error) {
          addExecutionHistoryItem({ command: inputVal, error: err.message, prompt })
        }
      } finally {
        setExecuting(false)
        clearTimeout(timer)
        setInputVal('')
      }
    }

    const traverseHistory = (direction: 'back' | 'forward') => {
      let nextHistoryPointer: number | undefined

      if (direction === 'back') {
        nextHistoryPointer = executionHistoryPointer !== undefined ? executionHistoryPointer - 1 : executionHistory.length - 1
      } else {
        nextHistoryPointer = executionHistoryPointer !== undefined ? executionHistoryPointer + 1 : 0
      }

      const nextHistoryItem = nextHistoryPointer !== undefined ? executionHistory[nextHistoryPointer] : undefined

      if (!nextHistoryItem) {
        nextHistoryPointer = undefined
      }

      setExecutionHistoryPointer(nextHistoryPointer)

      setInputVal(nextHistoryItem?.command ?? '')
    }

    const onKeyUp: KeyboardEventHandler = (e) => {
      switch (e.key) {
        case 'Enter': {
          e.preventDefault()
          void execute()
          break
        }
        case 'Up': // IE/Edge specific value
        case 'ArrowUp': {
          traverseHistory('back')
          break
        }
        case 'Down': // IE/Edge specific value
        case 'ArrowDown': {
          traverseHistory('forward')
          break
        }
      }
    }

    const loadingTextId = useUID()

    return (
      <div data-test={dataTest} className={cn(styles.container, className)}>
        {welcomeMessage && <p className={styles.welcome}>{welcomeMessage}</p>}
        <div className={styles.history} role="alert">
          {executionHistory.map((historyItem, i) => (
            <Fragment key={i}>
              <div className={styles.input}>
                {historyItem.prompt ? <span className={styles.prompt}>{historyItem.prompt}</span> : null}
                <Icon icon={TerminalIcon} ariaHidden className={styles.terminalIcon} />
                <input aria-label="Historical command" type="text" value={historyItem.command} readOnly tabIndex={-1} />
              </div>
              {historyItem.res && (
                <div className={styles.commandRes}>
                  {historyItem.res.map((resString, i) => (
                    <p key={i}>{resString}</p>
                  ))}
                </div>
              )}
              {historyItem.error && <p className={styles.commandError}>{historyItem.error}</p>}
            </Fragment>
          ))}
        </div>
        <div className={styles.currentCommand}>
          <div className={styles.input}>
            {prompt ? <span className={styles.prompt}>{prompt}</span> : null}
            <Icon icon={TerminalIcon} ariaHidden className={styles.terminalIcon} />
            <input
              type="text"
              aria-label="Command"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyUp={onKeyUp}
              aria-describedby={executing ? loadingTextId : undefined}
              disabled={executing}
              autoFocus={autoFocusInitial}
              ref={inputRef}
              className={cn(inputClassName, { [styles.blank]: !inputVal })}
            />
          </div>
          {executing && (
            <div className={styles.loading}>
              <span className={styles.loadingA11yText} id={loadingTextId}>
                Command is executing. Please, wait.
              </span>
              ...
            </div>
          )}
        </div>
      </div>
    )
  },
)

Terminal.displayName = 'Terminal'
