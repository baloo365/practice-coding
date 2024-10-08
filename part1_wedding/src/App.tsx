import Heading from '@components/sections/Heading'
import Video from '@components/sections/Video'
import classNames from 'classnames/bind'
import { useState } from 'react'
import { useEffect } from 'react'
import { Wedding } from '@models/wedding'

import styles from './App.module.scss'
import FullScreenMessage from '@components/shared/FullScreenMessage'
import ImageGallery from '@components/sections/ImageGallery'
import Intro from '@components/sections/Intro'
import Invitation from '@components/sections/InvitationMessage'
import Calendar from '@components/sections/Calendar'
import Map from '@components/sections/Map'

const cx = classNames.bind(styles)

function App() {
  const [wedding, setWedding] = useState<Wedding | null>(null)
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

  if (wedding == null) {
    return null
  }

  const {
    date,
    galleryImages,
    groom,
    bride,
    location,
    message: { intro, invitation },
  } = wedding

  return (
    <div className={cx('container')}>
      <Heading date={date} />
      <Video />
      <Intro
        groomName={groom.name}
        brideName={bride.name}
        date={date}
        locationName={location.name}
        message={intro}
      />
      <Invitation message={invitation} />
      <ImageGallery images={galleryImages} />
      <Calendar date={date} />
      <Map location={location} />
      {JSON.stringify(wedding)}
    </div>
  )
}

export default App
