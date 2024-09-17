import React, { ComponentType, HTMLAttributes, ImgHTMLAttributes, ReactNode } from 'react'
import cls from 'classnames'
import { DataTestProp } from '@hazelcast/helpers'

import styles from './AppHeaderLogo.module.scss'

export interface LinkProps extends DataTestProp {
  className?: string
  children: ReactNode
}

export interface AppHeaderLogoProps {
  wrapperProps?: HTMLAttributes<HTMLDivElement>
  imgProps?: ImgHTMLAttributes<HTMLImageElement>
  LinkComponent: ComponentType<LinkProps>
}

export const AppHeaderLogo = ({ imgProps, wrapperProps, LinkComponent }: AppHeaderLogoProps) => (
  <div {...wrapperProps} className={cls(styles.root, wrapperProps?.className)}>
    <LinkComponent className={styles.link} data-test="logo-link">
      <img
        alt="Home"
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTU1IiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMTU1IDIwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNOTQuNDkwOSAzLjQzNzYxQzk1LjUxNTEgMi45MTkwOSA5Ni42MjY5IDIuNjU1MzUgOTcuNzk2NyAyLjY1NTM1Qzk5LjA0NjQgMi42NTUzNSAxMDAuMjMzIDIuOTQ4NTQgMTAxLjMzNiAzLjUzNDkyQzEwMS42MDQgMy42NTc4MyAxMDEuODI1IDMuNzE2NzIgMTAyLjAxMyAzLjcxNjcyQzEwMi4zMjQgMy43MTY3MiAxMDIuNTg0IDMuNTg5OTcgMTAyLjc2MyAzLjM1MDU1QzEwMi45MjkgMy4xMjkwNiAxMDMuMDE0IDIuODY0MDQgMTAzLjAxNCAyLjU2MDYxQzEwMy4wMTQgMS45OTM0MyAxMDIuNzgyIDEuNTU1NTcgMTAyLjMyMyAxLjI1ODU0QzEwMS42ODcgMC44NTc4MDMgMTAwLjk2IDAuNTQ0MTI5IDEwMC4xNTcgMC4zMjY0NzdDOTkuMzU2OCAwLjEwODgyNiA5OC41MjA3IDAgOTcuNjcwNSAwQzk2LjEwNzcgMCA5NC41OTUzIDAuMzYxMDQ1IDkzLjE3NjggMS4wNzQxN0M5MS43NTA3IDEuNzkxMTQgOTAuNTc0NSAyLjkwNzU3IDg5LjY3OTEgNC4zOTI3MkM4OC43ODUgNS44NzY1OSA4OC4zMzI4IDcuNzE1MTEgODguMzMyOCA5Ljg1NzA1Qzg4LjMzMjggMTEuOTk5IDg4Ljc4NjMgMTMuODE1NyA4OS42NzkxIDE1LjMwNzNDOTAuNTczMiAxNi44MDE0IDkxLjc0NDIgMTcuOTMwNiA5My4xNjE0IDE4LjY2NTVDOTQuNTcyMSAxOS4zOTc5IDk2LjA4MDcgMTkuNzY3OSA5Ny42NDQ3IDE5Ljc2NzlDOTkuNDE3NCAxOS43Njc5IDEwMC45OTIgMTkuMzI2MiAxMDIuMzE0IDE4LjQ2MDdDMTAyLjUzNiAxOC4zMzE0IDEwMi43MTIgMTguMTUwOSAxMDIuODM0IDE3LjkyNDJDMTAyLjk1NCAxNy43MDI3IDEwMy4wMTQgMTcuNDY5NyAxMDMuMDE0IDE3LjIzMjlDMTAzLjAxNCAxNi45MDkgMTAyLjkyIDE2LjYyNzMgMTAyLjczNCAxNi4zOTY4QzEwMi41MzYgMTYuMTUzNiAxMDIuMjcxIDE2LjAyNDMgMTAxLjk2MyAxNi4wMjQzQzEwMS43NTIgMTYuMDI0MyAxMDEuNTUgMTYuMDgwNiAxMDEuMzcgMTYuMTg2OUMxMDAuMjQ4IDE2Ljc4MzUgOTkuMDQ1MSAxNy4wODU2IDk3Ljc5NTQgMTcuMDg1NkM5Ni42MTAyIDE3LjA4NTYgOTUuNDkwNiAxNi44MTQyIDk0LjQ2NzcgMTYuMjc5MUM5My40NTEyIDE1Ljc0NzcgOTIuNjIwMyAxNC45MjgzIDkxLjk5OTMgMTMuODQzOUM5MS4zNzU4IDEyLjc1NjkgOTEuMDYwMSAxMS40MTUyIDkxLjA2MDEgOS44NTgzM0M5MS4wNjAxIDguMzAxNDkgOTEuMzc5NiA2LjkxMzY0IDkyLjAxMDkgNS44MzU2MkM5Mi42Mzk2IDQuNzYwMTcgOTMuNDc0NCAzLjk1NDg2IDk0LjQ4OTYgMy40NDAxN0w5NC40OTA5IDMuNDM3NjFaIiBmaWxsPSIjRjBGNkZGIi8+CjxwYXRoIGQ9Ik0xMzYuMDcyIDMuOTQxOTZDMTM2Ljc2NCAzLjUzNDgzIDEzNy4yMjggMi43MDEzNSAxMzUuMzM3IDEuMTU0NzRDMTM1LjMyNiAxLjE0NzA2IDEzNS4zMTYgMS4xMzkzOCAxMzUuMzA2IDEuMTMwNDJDMTM0LjMyNSAwLjM4NTI4MSAxMzMuMTAzIDAuMDI4MDc2MiAxMzEuNzAxIDAuMDI4MDc2MkMxMzAuNjYgMC4wMjgwNzYyIDEyOS43MDcgMC4yMzU0ODUgMTI4Ljg2NyAwLjY0NjQ2M0MxMjguMDE4IDEuMDYgMTI3LjM0MiAxLjY2MzAyIDEyNi44NTcgMi40Mzc2MUMxMjYuMzcxIDMuMjEyMTkgMTI2LjEyNSA0LjEwODQgMTI2LjEyNSA1LjEwMDY0QzEyNi4xMjUgNi4xODUwNSAxMjYuMzgyIDcuMTA1NTkgMTI2Ljg4OCA3LjgzNzkyQzEyNy4zODQgOC41NTYxNyAxMjcuOTkyIDkuMTQyNTUgMTI4LjY5NiA5LjU4MDQyQzEyOS4zOCAxMC4wMDY4IDEzMC4yOSAxMC40NzI4IDEzMS40IDEwLjk2NTdDMTMyLjI4IDExLjM2NTIgMTMyLjk5MSAxMS43MTYgMTMzLjUxIDEyLjAwOTJDMTM0LjAwOSAxMi4yOTA4IDEzNC40MjkgMTIuNjQ2NyAxMzQuNzYyIDEzLjA2NTRDMTM1LjA4NCAxMy40NzEzIDEzNS4yNCAxMy45NDg4IDEzNS4yNCAxNC41Mjc1QzEzNS4yNCAxNS4zNTIgMTM0Ljk1MyAxNS45OTYgMTM0LjM2MyAxNi40OTQxQzEzMy43NjggMTYuOTk1OSAxMzIuOTQ3IDE3LjI1MiAxMzEuOTIzIDE3LjI1MkMxMzEuMDU2IDE3LjI1MiAxMzAuMzkgMTcuMTYzNyAxMjkuNjcyIDE2Ljc1NzhDMTI5LjQ2NSAxNi42NCAxMjkuMTkgMTYuNDE4NSAxMjguOTA4IDE2LjExMjVDMTI4LjAzNiAxNS4xNzE1IDEyNy43NzggMTQuNTkyOCAxMjYuODU2IDE0LjgyOTdDMTI2LjE1IDE1LjAxMTUgMTI1Ljc4NCAxNS44MTE3IDEyNi4xMjIgMTYuNzMwOUMxMjYuNTY5IDE3Ljk0ODUgMTI4LjA0MSAxOC43NzQzIDEyOC4wNDEgMTguNzc0M0MxMjkuMTMxIDE5LjQ4ODcgMTMwLjQ1NyAxOS43NTYzIDEzMS45MjEgMTkuNzU2M0MxMzMuMDkxIDE5Ljc1NjMgMTM0LjE1MiAxOS41Mzk5IDEzNS4wNzQgMTkuMTE0OEMxMzYuMDA1IDE4LjY4NDcgMTM2Ljc0NSAxOC4wNTYgMTM3LjI3MiAxNy4yNDY5QzEzNy44MDEgMTYuNDM2NCAxMzguMDY5IDE1LjQ3NzUgMTM4LjA2OSAxNC4zOTU2QzEzOC4wNjkgMTMuMzEzOCAxMzcuODE3IDEyLjM5NTggMTM3LjMxOCAxMS42NzEyQzEzNi44MjkgMTAuOTU5MyAxMzYuMjIzIDEwLjM4OTYgMTM1LjUxNiA5Ljk3NzMxQzEzNC44MzMgOS41NzkxNCAxMzMuOTIzIDkuMTM2MTUgMTMyLjgxIDguNjU4NkMxMzEuOSA4LjI3ODM1IDEzMS4xNyA3LjkzNjUxIDEzMC42NDMgNy42NDMzMkMxMzAuMTM4IDcuMzYyOTMgMTI5LjcwOSA2Ljk5OTMzIDEyOS4zNjkgNi41NjI3NEMxMjkuMDM4IDYuMTQwMjQgMTI4Ljg3OCA1LjYzNDUyIDEyOC44NzggNS4wMTk5OEMxMjguODc4IDQuMjQ5MjMgMTI5LjE0IDMuNjU5MDIgMTI5LjY3OSAzLjIxMzQ3QzEzMC4yMjUgMi43NjI4IDEzMC45MTMgMi41MzM2MyAxMzEuNzI0IDIuNTMzNjNDMTMyLjUzNiAyLjUzMzYzIDEzMy4xNDIgMi43OTk5MyAxMzMuNzA4IDMuMjAwNjdDMTMzLjc0MiAzLjIyNDk5IDEzNC4wNTQgMy40OTY0MiAxMzQuMDU0IDMuNDk2NDJDMTM1LjEgNC40Njk0NSAxMzYuMDcgMy45NDE5NiAxMzYuMDcgMy45NDE5NkgxMzYuMDcyWiIgZmlsbD0iI0YwRjZGRiIvPgo8cGF0aCBkPSJNMTIuNTg5NCAwLjMyMDA2OEMxMS44NTEyIDAuMzIwMDY4IDExLjI1MzQgMC45MTQxMjkgMTEuMjUzNCAxLjY0Nzc0VjguNTg4MjZIMi42NzE5NVYxLjY0Nzc0QzIuNjcxOTUgMC45MTQxMjkgMi4wNzQxOCAwLjMyMDA2OCAxLjMzNTk4IDAuMzIwMDY4QzAuNTk3Nzc1IDAuMzIwMDY4IDAgMC45MTQxMjkgMCAxLjY0Nzc0VjE4LjEzNjhDMCAxOC44NzA0IDAuNTk3Nzc1IDE5LjQ2NDQgMS4zMzU5OCAxOS40NjQ0QzIuMDc0MTggMTkuNDY0NCAyLjY3MTk1IDE4Ljg3MDQgMi42NzE5NSAxOC4xMzY4VjExLjE4MDlIMTEuMjUzNFYxOC4xMzY4QzExLjI1MzQgMTguODcwNCAxMS44NTEyIDE5LjQ2NDQgMTIuNTg5NCAxOS40NjQ0QzEzLjMyNzYgMTkuNDY0NCAxMy45MjUzIDE4Ljg3MDQgMTMuOTI1MyAxOC4xMzY4VjEuNjQ3NzRDMTMuOTI1MyAwLjkxNDEyOSAxMy4zMjc2IDAuMzIwMDY4IDEyLjU4OTQgMC4zMjAwNjhaIiBmaWxsPSIjRjBGNkZGIi8+CjxwYXRoIGQ9Ik0zMy40MDMxIDE3LjY4NjJMMjcuOTY1MiAxLjY3OTg4QzI3LjgyMjIgMS4yODA0MiAyNy42MTQ4IDAuOTU1MjI0IDI3LjM1MDcgMC43MTE5NjZDMjcuMDY4NSAwLjQ1NDYyNSAyNi43NDY1IDAuMzIyNzU0IDI2LjM5MjIgMC4zMjI3NTRIMjUuODMwNUMyNS41MDg0IDAuMzIyNzU0IDI1LjE5NzkgMC40NTg0NjYgMjQuOTA4IDAuNzI0NzY5QzI0LjYzMzYgMC45NzgyNjkgMjQuNDMwMSAxLjMwMDkxIDI0LjMwMzggMS42ODM3MkwyMi42NjY0IDYuNTIwN0wyMy45MzU0IDEwLjQ5NzNDMjQuOTgwMiA3LjAxNDkgMjYuMTA2MiAzLjk3NDE4IDI2LjE2MDMgMy43OTg3OEwzMC44MzA0IDE4LjUyMjNDMzEuMDU4NCAxOS4yNDMxIDMxLjgzOTEgMTkuNjM2MSAzMi41NTggMTkuMzkyOUMzMy4yNjUzIDE5LjE1MzQgMzMuNjQ0MSAxOC4zOTA0IDMzLjQwNDQgMTcuNjg3NUwzMy40MDMxIDE3LjY4NjJaIiBmaWxsPSIjRjBGNkZGIi8+CjxwYXRoIGQ9Ik0yMS42MzQ1IDkuNjgyOTJMMTguOTE2MSAxNy42ODY0QzE4LjY3NjUgMTguMzg5NCAxOS4wNTUzIDE5LjE1MjUgMTkuNzYyNiAxOS4zOTE5QzIwLjQ4MjcgMTkuNjM1MSAyMS4yNjIyIDE5LjI0MjEgMjEuNDkwMiAxOC41MjEyTDIyLjk1NzYgMTMuNjg1M0wyMS42MzQ1IDkuNjgxNjRWOS42ODI5MloiIGZpbGw9IiMxMEE0QjMiLz4KPHBhdGggZD0iTTEyMi4xOTQgMTcuNjg2MkwxMTYuNzU2IDEuNjc5ODhDMTE2LjYxMyAxLjI4MDQyIDExNi40MDUgMC45NTUyMjQgMTE2LjE0MSAwLjcxMTk2NkMxMTUuODU5IDAuNDU0NjI1IDExNS41MzcgMC4zMjI3NTQgMTE1LjE4MyAwLjMyMjc1NEgxMTQuNjIxQzExNC4yOTkgMC4zMjI3NTQgMTEzLjk4OCAwLjQ1ODQ2NiAxMTMuNjk4IDAuNzI0NzY5QzExMy40MjQgMC45NzgyNjkgMTEzLjIyIDEuMzAwOTEgMTEzLjA5NCAxLjY4MzcyTDExMS40NTcgNi41MjA3TDExMi43MjYgMTAuNDk3M0MxMTMuNzcxIDcuMDE0OSAxMTQuODk3IDMuOTc0MTggMTE0Ljk1MSAzLjc5ODc4TDExOS42MjEgMTguNTIyM0MxMTkuODQ5IDE5LjI0MzEgMTIwLjYzIDE5LjYzNjEgMTIxLjM0OCAxOS4zOTI5QzEyMi4wNTYgMTkuMTUzNCAxMjIuNDM0IDE4LjM5MDQgMTIyLjE5NSAxNy42ODc1TDEyMi4xOTQgMTcuNjg2MloiIGZpbGw9IiNGMEY2RkYiLz4KPHBhdGggZD0iTTExMC40MjUgOS42ODI5MkwxMDcuNzA3IDE3LjY4NjRDMTA3LjQ2NyAxOC4zODk0IDEwNy44NDYgMTkuMTUyNSAxMDguNTUzIDE5LjM5MTlDMTA5LjI3MyAxOS42MzUxIDExMC4wNTMgMTkuMjQyMSAxMTAuMjgxIDE4LjUyMTJMMTExLjc0OCAxMy42ODUzTDExMC40MjUgOS42ODE2NFY5LjY4MjkyWiIgZmlsbD0iIzEwQTRCMyIvPgo8cGF0aCBkPSJNNTAuMjAwMyAxNi44ODg1SDQxLjcxOTRMNTAuODkyMSAyLjA3MDMxQzUxLjA2NiAxLjc4MjI0IDUxLjE1MTEgMS41MzM4NiA1MS4xNTExIDEuMzA5ODFDNTEuMTUxMSAxLjAyNTU4IDUxLjAzIDAuNzc1OTIyIDUwLjc5ODEgMC41ODg5OTdDNTAuNTgwMyAwLjQxMjMxNiA1MC4yOTA1IDAuMzIzOTc1IDQ5LjkzNzUgMC4zMjM5NzVIMzkuMDA2MkMzOC4yODk5IDAuMzIzOTc1IDM3LjcxMDEgMC45MDAxMTEgMzcuNzEwMSAxLjYxMTk2QzM3LjcxMDEgMi4zMjM4MSAzOC4yODk5IDIuODk5OTQgMzkuMDA2MiAyLjg5OTk0SDQ3LjQ2MDFMMzguMjE5IDE3LjcxMThDMzguMDQ1MSAxNy45Nzk0IDM3Ljk1NjIgMTguMjM4IDM3Ljk1NjIgMTguNDc5OUMzNy45NTYyIDE4Ljc4MzQgMzguMDc0NyAxOS4wMzY5IDM4LjI5NzYgMTkuMjE0OEMzOC41MDYzIDE5LjM4MTMgMzguNzkxIDE5LjQ2NTggMzkuMTQ0IDE5LjQ2NThINTAuMTk5QzUwLjkxNTMgMTkuNDY1OCA1MS40OTUgMTguODg5NiA1MS40OTUgMTguMTc3OEM1MS40OTUgMTcuNDY2IDUwLjkxNTMgMTYuODg5OCA1MC4xOTkgMTYuODg5OEw1MC4yMDAzIDE2Ljg4ODVaIiBmaWxsPSIjRjBGNkZGIi8+CjxwYXRoIGQ9Ik03MC42MzE1IDEuNTk5MTlDNzAuNjMxNSAwLjg4MzUwNCA3MC4wNDc5IDAuMzAyMjQ2IDY5LjMyNjQgMC4zMDIyNDZINTkuMjQ1NEM1OC41NDIgMC4zMDIyNDYgNTcuOTcyNiAwLjg2ODE0IDU3Ljk3MjYgMS41NjcxOVYyLjg5NDg2SDY5LjMyNzdDNzAuMDQ3OSAyLjg5NDg2IDcwLjYzMjggMi4zMTQ4OCA3MC42MzI4IDEuNTk3OTFMNzAuNjMxNSAxLjU5OTE5WiIgZmlsbD0iI0YwRjZGRiIvPgo8cGF0aCBkPSJNNjkuMzk3NCAxNi44NzE5SDU4LjA0MjJWMTguMTk5NkM1OC4wNDIyIDE4Ljg5ODYgNTguNjExNyAxOS40NjQ1IDU5LjMxNTEgMTkuNDY0NUg2OS4zOTYxQzcwLjExNjMgMTkuNDY0NSA3MC43MDEyIDE4Ljg4NDUgNzAuNzAxMiAxOC4xNjc2QzcwLjcwMTIgMTcuNDUwNiA3MC4xMTc2IDE2Ljg3MDYgNjkuMzk2MSAxNi44NzA2TDY5LjM5NzQgMTYuODcxOVoiIGZpbGw9IiNGMEY2RkYiLz4KPHBhdGggZD0iTTY5LjM5NzMgOC41ODY5N0g1NC44NjEzVjExLjE3OTZINjkuMzk3M0M3MC4xMTc0IDExLjE3OTYgNzAuNzAyMyAxMC41OTk2IDcwLjcwMjMgOS44ODI2NEM3MC43MDIzIDkuMTY2OTUgNzAuMTE4NyA4LjU4NTY5IDY5LjM5NzMgOC41ODU2OVY4LjU4Njk3WiIgZmlsbD0iI0YwRjZGRiIvPgo8cGF0aCBkPSJNODQuOTMyNyAxNi44NzE5SDc4LjM3OFYxLjY2NTczQzc4LjM3OCAwLjkyMTg3IDc3Ljc3MTMgMC4zMTg4NDggNzcuMDIyOCAwLjMxODg0OEM3Ni4yNzQzIDAuMzE4ODQ4IDc1LjY2NzUgMC45MjE4NyA3NS42Njc1IDEuNjY1NzNWMTguMTk4M0M3NS42Njc1IDE4Ljg5NzMgNzYuMjM2OSAxOS40NjMyIDc2Ljk0MDMgMTkuNDYzMkg4NC45MzE0Qzg1LjY1MTUgMTkuNDYzMiA4Ni4yMzY0IDE4Ljg4MzIgODYuMjM2NCAxOC4xNjYzQzg2LjIzNjQgMTcuNDQ5MyA4NS42NTI4IDE2Ljg2OTMgODQuOTMxNCAxNi44NjkzTDg0LjkzMjcgMTYuODcxOVoiIGZpbGw9IiNGMEY2RkYiLz4KPHBhdGggZD0iTTE1Mi4wMDUgMC4zMjAxMjhIMTQxLjk0NkMxNDEuMjI2IDAuMzIwMTI4IDE0MC42NDEgMC45MDAxMDUgMTQwLjY0MSAxLjYxNzA3QzE0MC42NDEgMi4zMzQwNCAxNDEuMjI0IDIuOTE0MDIgMTQxLjk0NiAyLjkxNDAySDE0NS42MlYxOC4xMjAyQzE0NS42MiAxOC44NjQgMTQ2LjIyNyAxOS40NjcxIDE0Ni45NzUgMTkuNDY3MUMxNDcuNzI0IDE5LjQ2NzEgMTQ4LjMzMSAxOC44NjQgMTQ4LjMzMSAxOC4xMjAyVjIuOTEyNzRIMTUyLjAwNUMxNTIuNzI1IDIuOTEyNzQgMTUzLjMxIDIuMzMyNzYgMTUzLjMxIDEuNjE1NzlDMTUzLjMxIDAuODk4ODI1IDE1Mi43MjYgMC4zMTg4NDggMTUyLjAwNSAwLjMxODg0OFYwLjMyMDEyOFoiIGZpbGw9IiNGMEY2RkYiLz4KPC9zdmc+Cg=="
        {...imgProps}
      />
    </LinkComponent>
  </div>
)
