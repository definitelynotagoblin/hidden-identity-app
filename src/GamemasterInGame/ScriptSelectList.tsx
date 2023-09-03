import {
  Box,
  Grid,
  Flex,
  Button,
  Heading,
  TextArea,
  Callout,
} from "@radix-ui/themes";
import GameData from "../assets/game_data/scripts.json";
import React from "react";

interface ScriptSelectListProps {
  handleSubmit: (script: string, customScript: unknown) => void;
  enableCustom?: boolean;
}

function ScriptSelectList({
  handleSubmit,
  enableCustom = true,
}: ScriptSelectListProps) {
  const [selectedScript, setSelectedScript] = React.useState("");
  const [customScript, setCustomScript] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        try {
          const parsedCustomScript = customScript && JSON.parse(customScript);
          // TODO: verify parsedCustomScript is correct type
          handleSubmit(selectedScript, parsedCustomScript);
          setErrorMsg("");
        } catch (e) {
          setErrorMsg("Custom script is not valid JSON.");
        }
      }}
    >
      <Flex gap="4" direction={"column"} align={"center"}>
        <Grid gap="3" columns="1" align={"center"}>
          {GameData.scripts.map(({ name, imageSrc }) => (
            <Box
              key={name}
              style={{
                border: name === selectedScript ? "4px solid darkred" : "none",
                borderRadius: "15px",
              }}
              onClick={() => {
                setSelectedScript(name);
              }}
            >
              <img width="300px" src={imageSrc} />
            </Box>
          ))}
          {enableCustom && (
            <Box
              key="custom-script"
              style={{
                textAlign: "center",
                border:
                  "custom-script" === selectedScript
                    ? "4px solid darkred"
                    : "none",
                borderRadius: "15px",
              }}
              onClick={() => {
                setSelectedScript("custom-script");
              }}
            >
              <label htmlFor="custom-input">
                <Heading as="h1">CUSTOM</Heading>
              </label>
              {"custom-script" === selectedScript && (
                <TextArea
                  id="custom-input"
                  placeholder="[ { 'id': 'Washerwoman' }, ... ]"
                  value={customScript}
                  onChange={(event) => {
                    setCustomScript(event.currentTarget.value);
                  }}
                ></TextArea>
              )}
            </Box>
          )}
        </Grid>
        {errorMsg && (
          <Callout.Root>
            <Callout.Text>{errorMsg}</Callout.Text>
          </Callout.Root>
        )}
        <Button type="submit" disabled={!selectedScript}>
          Select Script
        </Button>
      </Flex>
    </form>
  );
}

export default ScriptSelectList;
