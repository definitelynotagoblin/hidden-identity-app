import { Box, Grid, Flex, Button } from "@radix-ui/themes";
import GameData from "../assets/game_data/scripts.json";
import React from "react";

interface ScriptSelectListProps {
  handleSubmit: (script: string) => void;
}

function ScriptSelectList({ handleSubmit }: ScriptSelectListProps) {
  const [selectedScript, setSelectedScript] = React.useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(selectedScript);
      }}
    >
      <Flex direction={"column"} align={"center"}>
        <Grid columns="1" align={"center"}>
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
        </Grid>
        <Button type="submit" disabled={!selectedScript}>
          Select Script
        </Button>
      </Flex>
    </form>
  );
}

export default ScriptSelectList;
