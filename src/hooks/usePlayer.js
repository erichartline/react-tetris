import React from "react"
import { TETROMINOS, randomTetromino } from "../tetrominos"
import { STAGE_WIDTH, checkCollision } from "../gameHelpers"

const usePlayer = () => {
  const [player, setPlayer] = React.useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  })

  const rotate = (matrix, direction) => {
    // make the rows to become cols (transpose)
    const rotatedTetro = matrix.map((_, index) =>
      matrix.map((col) => col[index]),
    )
    // reverse each row to get a rotated matrix
    if (direction > 0) return rotatedTetro.map((row) => row.reverse())
    return rotatedTetro.reverse()
  }

  const playerRotate = (stage, direction) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player))
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, direction)

    const position = clonedPlayer.pos.x
    let offset = 1
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset
      offset = -(offset + (offset > 0 ? 1 : -1))
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -direction)
        clonedPlayer.pos.x = position
        return
      }
    }

    setPlayer(clonedPlayer)
  }

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

  return [player, updatePlayerPosition, resetPlayer, playerRotate]
}

export default usePlayer
