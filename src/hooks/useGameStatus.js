import React from "react"

const useGameStatus = (rowsCleared) => {
  const [score, setScore] = React.useState(0)
  const [rows, setRows] = React.useState(0)
  const [level, setLevel] = React.useState(0)

  const linePoints = [40, 100, 300, 1200]

  const calcScore = React.useCallback(() => {
    // we have score
    if (rowsCleared > 0) {
      // this is how original Tetris score is calculated
      setScore((prev) => prev + linePoints[rowsCleared - 1] * (level + 1))
      setRows((prev) => prev + rowsCleared)
    }
  }, [level, linePoints, rowsCleared])

  React.useEffect(() => {
    calcScore()
  }, [calcScore, rowsCleared, score])

  return [score, setScore, rows, setRows, level, setLevel]
}

export default useGameStatus
