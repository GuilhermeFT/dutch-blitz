import type { NextPage } from 'next'

import styles from '@/styles/home.module.scss'
import Head from 'next/head'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { RestartAlt } from '@mui/icons-material';

interface ColorObject {
  name: string;
  value: 'blue' | 'pink' | 'green' | 'yellow';
  points: number[];
  pointsValue: string;
  setPointsValue: Dispatch<SetStateAction<string>>;
  setPoints: Dispatch<SetStateAction<number[]>>;
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
    index: number,
    points: number[],
    setPoints: Dispatch<SetStateAction<number[]>>,
  ) {
    const filteredPoints = points.filter((_, i) => i !== index);
    setPoints(filteredPoints);
    window.localStorage.setItem(`@dutch-blitz:${color}-points`, JSON.stringify(filteredPoints))
  }

  function addPoint(
    color: 'blue' | 'pink' | 'green' | 'yellow',
    points: number[],
    setPoints: Dispatch<SetStateAction<number[]>>,
    pointsValue: string,
    setPointsValue: Dispatch<SetStateAction<string>>,
  ) {
    if (!pointsValue) return
    setPoints([...points, Number(pointsValue)])
    setPointsValue('')
    window.localStorage.setItem(`@dutch-blitz:${color}-points`, JSON.stringify([...points, Number(pointsValue)]))
  }

  function clearPoints (
    color: 'blue' | 'pink' | 'green' | 'yellow', 
    setPointsFunction: Dispatch<SetStateAction<number[]>>
  ) {
    setPointsFunction([]);
    window.localStorage.removeItem(`@dutch-blitz:${color}-points`)
  }

  const colorsContainers: ColorObject[] = [
    {
      name: 'Azul',
      value: 'blue',
      points: bluePoints,
      pointsValue: blueValue,
      setPointsValue: setBlueValue,
      setPoints: setBluePoints,
    },
    {
      name: 'Rosa',
      value: 'pink',
      points: pinkPoints,
      pointsValue: pinkValue,
      setPointsValue: setPinkValue,
      setPoints: setPinkPoints,
    },
    {
      name: 'Verde',
      value: 'green',
      points: greenPoints,
      pointsValue: greenValue,
      setPointsValue: setGreenValue,
      setPoints: setGreenPoints,
    },
    {
      name: 'Amarelo',
      value: 'yellow',
      points: yellowPoints,
      pointsValue: yellowValue,
      setPointsValue: setYellowValue,
      setPoints: setYellowPoints,
    },
  ]

  useEffect(() => {
    const localBluePoints = window.localStorage.getItem('@dutch-blitz:blue-points');
    const localPinkPoints = window.localStorage.getItem('@dutch-blitz:pink-points');
    const localGreenPoints = window.localStorage.getItem('@dutch-blitz:green-points');
    const localYellowPoints = window.localStorage.getItem('@dutch-blitz:yellow-points');

    localBluePoints && setBluePoints(JSON.parse(localBluePoints));
    localPinkPoints && setPinkPoints(JSON.parse(localPinkPoints));
    localGreenPoints && setGreenPoints(JSON.parse(localGreenPoints));
    localYellowPoints && setYellowPoints(JSON.parse(localYellowPoints));
  }, [])

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
          setPoints,
          value
        }) => {
          return(
            <div className={`${styles[`${value}Container`]} ${styles.colorContainer}`} key={name}>
              <div>
                <header>
                  <h1>{name}</h1>
                  <button onClick={() => clearPoints(value, setPoints)}>
                    <RestartAlt />
                  </button>
                  <div className={styles.result}>
                    {points.reduce((acc, curr) => acc + curr, 0)}
                  </div>
                </header>
    
                <div className={`${styles.contentScroll} ${styles.counter}`}>
                  {points.map((point, index) => (
                    <button
                      key={index}
                      onDoubleClick={() => removePoint(value, index, points, setPoints)}
                    >
                      {point}
                    </button>
                  ))}
                </div>
              </div>
  
              <form
                className={styles.inputContainer}
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="number"
                  value={pointsValue}
                  onBlur={() => addPoint(value, points, setPoints, pointsValue, setPointsValue)}
                  onChange={({ target: { value }}) =>
                    Number(value) <= 40 &&
                    Number(value) >= -13 &&
                    setPointsValue(value)
                  }
                />
                <button onClick={() => addPoint(value, points, setPoints, pointsValue, setPointsValue)}>+</button>
              </form>
            </div>
          )
        })}
      </main>
    </>
  )
}

export default Home
