import React from "react"
import styled from "styled-components"
import Display from "./Display"
import Stage from "./Stage"
import StartButton from "./StartButton"
import usePlayer from "../hooks/usePlayer"
import useStage from "../hooks/useStage"
import useInterval from "../hooks/useInterval"
import useGameStatus from "../hooks/useGameStatus"
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
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer)
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared,
  )

  const movePlayer = (direction) => {
    if (!checkCollision(player, stage, { x: direction, y: 0 })) {
      updatePlayerPosition({ x: direction, y: 0 })
    }
  }

  const startGame = () => {
    // reset game
    setStage(createStage())
    setDropTime(1000)
    resetPlayer()
    setGameOver(false)
    setScore(0)
    setRows(0)
    setLevel(0)
  }

  const drop = () => {
    // increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1)
      // also increase speed
      setDropTime(1000 / (level + 1) + 200)
    }
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

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1) + 200)
      }
    }
  }

  const dropPlayer = () => {
    setDropTime(null)
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

  useInterval(() => {
    drop()
  }, dropTime)

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e)}
      onKeyUp={(e) => keyUp(e)}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Score: ${rows}`} />
              <Display text={`Score: ${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  )
}

export default Tetris
