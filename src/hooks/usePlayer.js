import React from "react"
import { randomTetromino, TETROMINOS } from "../tetrominos"
import { STAGE_WIDTH } from "../gameHelpers"

const usePlayer = () => {
  const [player, setPlayer] = React.useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  })

  const updatePlayerPosition = ({ x, y, collided }) => {
    setPlayer((prevState) => ({
      ...prevState,
      pos: { x: (prevState.pos.x += x), y: (prevState.pos.y += y) },
      collided,
    }))
  }

  const resetPlayer = React.useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    })
  }, [])

  return [player, updatePlayerPosition, resetPlayer]
}

export default usePlayer
