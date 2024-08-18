import Heading from '@components/sections/Heading'
import Video from '@components/sections/Video'
import classNames from 'classnames/bind'
import { useState } from 'react'
import { useEffect } from 'react'

import styles from './App.module.scss'
import FullScreenMessage from './components/shared/FullScreenMessage'

const cx = classNames.bind(styles)

function App() {
  const [wedding, setWedding] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  // 1. wedding 데이터 호출
  // 데이터 불러올 때 useeffect 사용, 왜냐하면 최초에 한번 호출 필요

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:8888/wedding')
      .then((response) => {
        if (response.ok === false) {
          throw new Error('청접장 정보를 불러오지 못했습니다.')
        }
        return response.json()
      })
      .then((data) => {
        setWedding(data)
        setLoading(false)
      })
      .catch((e) => {
        console.log('에러발생', e)
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div>
        <FullScreenMessage type="loading" />
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <FullScreenMessage type="error" />
      </div>
    )
  }

  return (
    <div className={cx('container')}>
      <Heading />
      <Video />
      {JSON.stringify(wedding)}
    </div>
  )
}

export default App
