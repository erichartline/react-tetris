import React from "react"
import { randomTetromino } from "../tetrominos"

const usePlayer = () => {
  const [player, setPlayer] = React.useState({
    pos: { x: 0, y: 0 },
    tetromino: randomTetromino().shape,
    collided: false,
  })

  return [player]
}

export default usePlayer
