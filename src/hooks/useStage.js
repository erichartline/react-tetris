import React from "react"
import { createStage } from "../gameHelpers"

const useStage = () => {
  const [stage, setStage] = React.useState(createStage())

  return [stage, setStage]
}

export default useStage
