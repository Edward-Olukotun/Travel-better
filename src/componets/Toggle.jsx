import React from "react";
import { Button, Flex, useColorMode } from "@chakra-ui/react";

function Toggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div>
      <Flex align="center" justify="center" direction="column" pt="4">
        <Button size="lg" onClick={() => toggleColorMode()}>
          {colorMode}
        </Button>
      </Flex>
    </div>
  );
}

export default Toggle;
