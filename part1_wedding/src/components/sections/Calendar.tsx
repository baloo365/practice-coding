import classNames from 'classnames/bind'
import Section from '@shared/Section'
import styles from './Calendar.module.scss'
import { parseISO, format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { DayPicker } from 'react-day-picker'

import 'react-day-picker/dist/style.css'
const cx = classNames.bind(styles)
const css = `
.rdp-button_previous {
display: none;
}
.rdp-button_next {
display: none;
}
.rdp-month_caption {
display: none;
}
.rdp-day {
    cursor: default;
}
.rdp-head-cell {
font-weight: bold;
font-size: 14px;
}
.rdp-selected {
    font-weight: bold;
    color: #fff;
    .rdp-day_button {
    background-color: var(--red);
    border: var(--red);
    }
}
`

function Calendar({ date }: { date: string }) {
  const weddingDate = parseISO(date)
  return (
    <Section
      title={
        <div className={cx('wrap-header')}>
          <span className={cx('txt-date')}>
            {format(weddingDate, 'yyyy.MM.dd')}
          </span>
          <span className={cx('txt-time')}>
            {format(weddingDate, 'aaa h시 eeee', { locale: ko })}
          </span>
        </div>
      }
    >
      <div className={cx('wrap-calendar')}>
        <style>{css}</style>
        <DayPicker
          mode="single"
          locale={ko}
          month={weddingDate}
          selected={weddingDate}
          formatters={{ formatCaption: () => '' }}
        />
      </div>
    </Section>
  )
}

export default Calendar
