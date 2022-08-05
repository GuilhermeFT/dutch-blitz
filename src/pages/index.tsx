import type { NextPage } from 'next'

import styles from '@/styles/home.module.scss'
import Head from 'next/head'
import { Dispatch, SetStateAction, useState } from 'react'

interface ColorObject {
  name: string;
  value: 'blue' | 'pink' | 'green' | 'yellow';
  points: number[];
  pointsValue: string;
  setPointsValue: Dispatch<SetStateAction<string>>;
}

const Home: NextPage = () => {
  const [bluePoints, setBluePoints] = useState<number[]>([])
  const [pinkPoints, setPinkPoints] = useState<number[]>([])
  const [greenPoints, setGreenPoints] = useState<number[]>([])
  const [yellowPoints, setYellowPoints] = useState<number[]>([])

  const [blueValue, setBlueValue] = useState('')
  const [pinkValue, setPinkValue] = useState('')
  const [greenValue, setGreenValue] = useState('')
  const [yellowValue, setYellowValue] = useState('')

  function removePoint(
    color: 'blue' | 'pink' | 'green' | 'yellow',
    index: number
  ) {
    switch (color) {
      case 'blue':
        setBluePoints(bluePoints.filter((_, i) => i !== index))
        break
      case 'pink':
        setPinkPoints(pinkPoints.filter((_, i) => i !== index))
        break
      case 'green':
        setGreenPoints(greenPoints.filter((_, i) => i !== index))
        break
      case 'yellow':
        setYellowPoints(yellowPoints.filter((_, i) => i !== index))
        break
    }
  }

  function addPoint(color: 'blue' | 'pink' | 'green' | 'yellow') {
    switch (color) {
      case 'blue':
        if (!blueValue) return
        setBluePoints([...bluePoints, Number(blueValue)])
        setBlueValue('')
        break
      case 'pink':
        if (!pinkValue) return
        setPinkPoints([...pinkPoints, Number(pinkValue)])
        setPinkValue('')
        break
      case 'green':
        if (!greenValue) return
        setGreenPoints([...greenPoints, Number(greenValue)])
        setGreenValue('')
        break
      case 'yellow':
        if (!yellowValue) return
        setYellowPoints([...yellowPoints, Number(yellowValue)])
        setYellowValue('')
        break
      default:
        break
    }
  }

  const colorsContainers: ColorObject[] = [
    {
      name: 'Azul',
      value: 'blue',
      points: bluePoints,
      pointsValue: blueValue,
      setPointsValue: setBlueValue,
    },
    {
      name: 'Rosa',
      value: 'pink',
      points: pinkPoints,
      pointsValue: pinkValue,
      setPointsValue: setPinkValue,
    },
    {
      name: 'Verde',
      value: 'green',
      points: greenPoints,
      pointsValue: greenValue,
      setPointsValue: setGreenValue,
    },
    {
      name: 'Amarelo',
      value: 'yellow',
      points: yellowPoints,
      pointsValue: yellowValue,
      setPointsValue: setYellowValue,
    },
  ]

  return (
    <>
      <Head>
        <title>Dutch Blitz Counter</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
      </Head>

      <main className={styles.mainHome}>
        {colorsContainers.map(({ 
          name, 
          points, 
          pointsValue, 
          setPointsValue, 
          value
        }) => {
          return(
            <div className={`${styles[`${value}Container`]} ${styles.colorContainer}`} key={name}>
              <div>
                <header>
                  <h1>{name}</h1>
                  <div className={styles.result}>
                    {points.reduce((acc, curr) => acc + curr, 0)}
                  </div>
                </header>
    
                <div className={styles.contentScroll}>
                  <div className={styles.counter}>
                    {points.map((point, index) => (
                      <button
                        key={index}
                        onDoubleClick={() => removePoint(value, index)}
                      >
                        {point}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
  
              <form
                className={styles.inputContainer}
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="number"
                  value={pointsValue}
                  onBlur={() => addPoint(value)}
                  onChange={({ target: { value }}) =>
                    Number(value) <= 40 &&
                    Number(value) >= -13 &&
                    setPointsValue(value)
                  }
                />
                <button onClick={() => addPoint(value)}>+</button>
              </form>
            </div>
          )
        })}
      </main>
    </>
  )
}

export default Home
