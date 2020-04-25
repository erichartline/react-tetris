import React from "react"
import { createStage } from "../gameHelpers"

const useStage = (player, resetPlayer) => {
  const [stage, setStage] = React.useState(createStage())

  React.useEffect(() => {
    const updateStage = (prevStage) => {
      // first flush the stage
      const newStage = prevStage.map((row) =>
        row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell)),
      )

      // then draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? "merged" : "clear"}`,
            ]
          }
        })
      })

      return newStage
    }

    setStage((prev) => updateStage(prev))
  }, [player])

  return [stage, setStage]
}

export default useStage
