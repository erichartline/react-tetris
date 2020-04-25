import React from "react"
import styled from "styled-components"
import Display from "./Display"
import Stage from "./Stage"
import StartButton from "./StartButton"
import usePlayer from "../hooks/usePlayer"
import useStage from "../hooks/useStage"
import { createStage, checkCollision } from "../gameHelpers"
import bgImage from "../images/bg.png"

const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${bgImage}) #000;
  background-size: cover;
  overflow: hidden;
`

const StyledTetris = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 40px;
  margin: 0 auto;
  max-width: 900px;

  aside {
    width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 20px;
  }
`

const Tetris = () => {
  const [dropTime, setDropTime] = React.useState(null)
  const [gameOver, setGameOver] = React.useState(false)
  const [player, updatePlayerPosition, resetPlayer, playerRotate] = usePlayer()
  const [stage, setStage] = useStage(player, resetPlayer)

  console.log("re-render")

  const movePlayer = (direction) => {
    if (!checkCollision(player, stage, { x: direction, y: 0 })) {
      updatePlayerPosition({ x: direction, y: 0 })
    }
  }

  const startGame = () => {
    // reset game
    setStage(createStage())
    resetPlayer()
    setGameOver(false)
  }

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPosition({ x: 0, y: 1, collided: false })
    } else {
      // game over
      if (player.pos.y < 1) {
        console.log("GAME OVER!!!")
        setGameOver(true)
        setDropTime(null)
      }
      updatePlayerPosition({ x: 0, y: 0, collided: true })
    }
  }

  const dropPlayer = () => {
    drop()
  }

  const move = ({ keyCode }) => {
    if (!gameOver) {
      // left
      if (keyCode === 37) {
        movePlayer(-1)
      }
      // right
      if (keyCode === 39) {
        movePlayer(1)
      }
      // down
      if (keyCode === 40) {
        dropPlayer()
      }
      // up
      if (keyCode === 38) {
        playerRotate(stage, 1)
      }
    }
  }

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={(e) => move(e)}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver text="Game Over" />
          ) : (
            <div>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  )
}

export default Tetris
