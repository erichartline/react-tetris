import React from "react"
import styled from "styled-components"
import Display from "./Display"
import Stage from "./Stage"
import StartButton from "./StartButton"
import usePlayer from "../hooks/usePlayer"
import useStage from "../hooks/useStage"
import { createStage } from "../gameHelpers"
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
  const [player, updatePlayerPosition, resetPlayer] = usePlayer()
  const [stage, setStage] = useStage(player)

  console.log("re-render")

  const movePlayer = (direction) => {
    updatePlayerPosition({ x: direction, y: 0 })
  }

  const startGame = () => {
    // reset game
    setStage(createStage())
    resetPlayer()
  }

  const drop = () => {
    updatePlayerPosition({ x: 0, y: 1, collided: false })
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
