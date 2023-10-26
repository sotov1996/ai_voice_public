import React from "react";
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Tooltip
} from '@chakra-ui/react'

export const SliderThumbWithTooltip = ({ setSettingValue, settingValue }) => {
    const [showTooltip, setShowTooltip] = React.useState(false)
    return (
      <Slider
        id='slider'
        defaultValue={settingValue}
        min={0}
        max={100}
        colorScheme='teal'
        onChange={(value) => setSettingValue(value)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
          hasArrow
          bg='teal.500'
          color='white'
          placement='top'
          isOpen={showTooltip}
          label={`${settingValue}%`}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
    )
  }