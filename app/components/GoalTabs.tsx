import { Flex, Tabs } from "@mantine/core"
import React, { useState } from "react"

import { TAB_NAMES } from "~app/constants"
import { useData } from "~app/hooks/useData"

import { BorderStyle } from "./BorderStyle"
import { ColorInput } from "./ColorInput"
import { InputImage } from "./InputImage"
import { NumberProp } from "./NumberProp"
import { SelectFont } from "./SelectFont"

const getComponent = (componentName: string) => {
  switch (componentName) {
    case "ColorInput":
      return ColorInput

    case "NumberProp":
      return NumberProp

    case "InputImage":
      return InputImage

    case "SelectFont":
      return SelectFont

    case "BorderStyle":
      return BorderStyle

    default:
      return null
  }
}

export const GoalTabs = () => {
  const data = useData()

  const tabs = Object.entries(data)
  const groups = tabs.map(([group]) => group)
  const [group, setGroup] = useState(groups[0] || "")
  const options = tabs.find(([tab]) => tab === group)?.[1] || []

  return (
    <Tabs
      defaultValue={group}
      orientation="vertical"
      variant="outline"
      onTabChange={setGroup}>
      <Tabs.List>
        {groups.map((el) => (
          <Tabs.Tab key={el} value={el}>
            {TAB_NAMES[el]}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      <Tabs.Panel value={group}>
        <Flex
          pl="lg"
          gap="md"
          justify="center"
          align="stretch"
          direction="column"
          wrap="wrap">
          {options.map((option) => {
            const Widget = getComponent(option.componentName)

            return (
              <Widget
                key={`${option.selector}-${option.property}`}
                selectedStyles={option}
              />
            )
          })}
        </Flex>
      </Tabs.Panel>
    </Tabs>
  )
}
