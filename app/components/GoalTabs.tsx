import { Flex, Tabs } from "@mantine/core"
import React, { useState } from "react"

import { useData } from "~app/hooks/useData"

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
    default:
      return null
  }
}

export const GoalTabs = () => {
  const data = useData()

  const [group, setGroup] = useState("goalWidget")

  const settings = data.filter((el) => el.group === group)

  return (
    <Tabs
      defaultValue={group}
      orientation="vertical"
      variant="outline"
      onTabChange={setGroup}>
      <Tabs.List>
        <Tabs.Tab value="goalWidget">Goal widget</Tabs.Tab>
        <Tabs.Tab value="border">Border</Tabs.Tab>
        <Tabs.Tab value="image">Image</Tabs.Tab>
        <Tabs.Tab value="progressBar">Progress bar</Tabs.Tab>
        <Tabs.Tab value="leftText">Left text</Tabs.Tab>
        <Tabs.Tab value="rightText">Right text</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value={group}>
        <Flex
          pl="lg"
          gap="md"
          justify="center"
          align="stretch"
          direction="column"
          wrap="wrap">
          {settings.map((el) => {
            const Widget = getComponent(el.componentName)

            return (
              <Widget
                key={`${el.selector}-${el.property}`}
                selectedStyles={el}
              />
            )
          })}
        </Flex>
      </Tabs.Panel>
    </Tabs>
  )
}
