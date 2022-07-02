import type { NextPage } from 'next'

import styles from '@/styles/home.module.scss'
import Head from 'next/head'
import { useState } from 'react'

const Home: NextPage = () => {
  const [bluePoints, setBluePoints] = useState<number[]>([])
  const [pinkPoints, setPinkPoints] = useState<number[]>([])
  const [greenPoints, setGreenPoints] = useState<number[]>([])
  const [yellowPoints, setYellowPoints] = useState<number[]>([])

  const [blueValue, setBlueValue] = useState('')
  const [pinkValue, setPinkValue] = useState('')
  const [greenValue, setGreenValue] = useState('')
  const [yellowValue, setYellowValue] = useState('')

  const totalBlue = bluePoints.reduce((acc, curr) => acc + curr, 0)
  const totalPink = pinkPoints.reduce((acc, curr) => acc + curr, 0)
  const totalGreen = greenPoints.reduce((acc, curr) => acc + curr, 0)
  const totalYellow = yellowPoints.reduce((acc, curr) => acc + curr, 0)

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
    }
  }

  return (
    <>
      <Head>
        <title>Dutch Blitz Counter</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className={styles.mainHome}>
        <div className={styles.blueContainer}>
          <div className={styles.result}>{totalBlue}</div>
          <h1 contentEditable>Azul</h1>

          <div className={styles.contentScroll}>
            <div className={styles.counter}>
              {bluePoints.map((point, index) => (
                <button
                  key={index}
                  onDoubleClick={() => removePoint('blue', index)}
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
              value={blueValue}
              onBlur={() => addPoint('blue')}
              onChange={(e) =>
                Number(e.target.value) <= 40 &&
                Number(e.target.value) >= -40 &&
                setBlueValue(e.target.value)
              }
            />
            <button onClick={() => addPoint('blue')}>+</button>
          </form>
        </div>
        <div className={styles.pinkContainer}>
          <div className={styles.result}>{totalPink}</div>
          <h1 contentEditable>Amarelo</h1>

          <div className={styles.contentScroll}>
            <div className={styles.counter}>
              {pinkPoints.map((point, index) => (
                <button
                  key={index}
                  onDoubleClick={() => removePoint('pink', index)}
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
              value={pinkValue}
              onBlur={() => addPoint('pink')}
              onChange={(e) =>
                Number(e.target.value) <= 40 &&
                Number(e.target.value) >= -40 &&
                setPinkValue(e.target.value)
              }
            />
            <button onClick={() => addPoint('pink')}>+</button>
          </form>
        </div>
        <div className={styles.greenContainer}>
          <div className={styles.result}>{totalGreen}</div>
          <h1 contentEditable>Amarelo</h1>

          <div className={styles.contentScroll}>
            <div className={styles.counter}>
              {greenPoints.map((point, index) => (
                <button
                  key={index}
                  onDoubleClick={() => removePoint('green', index)}
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
              value={greenValue}
              onBlur={() => addPoint('green')}
              onChange={(e) =>
                Number(e.target.value) <= 40 &&
                Number(e.target.value) >= -40 &&
                setGreenValue(e.target.value)
              }
            />
            <button onClick={() => addPoint('green')}>+</button>
          </form>
        </div>
        <div className={styles.yellowContainer}>
          <div className={styles.result}>{totalYellow}</div>
          <h1 contentEditable>Amarelo</h1>

          <div className={styles.contentScroll}>
            <div className={styles.counter}>
              {yellowPoints.map((point, index) => (
                <button
                  key={index}
                  onDoubleClick={() => removePoint('yellow', index)}
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
              value={yellowValue}
              onBlur={() => addPoint('yellow')}
              onChange={(e) =>
                Number(e.target.value) <= 40 &&
                Number(e.target.value) >= -40 &&
                setYellowValue(e.target.value)
              }
            />
            <button onClick={() => addPoint('yellow')}>+</button>
          </form>
        </div>
      </main>
    </>
  )
}

export default Home
