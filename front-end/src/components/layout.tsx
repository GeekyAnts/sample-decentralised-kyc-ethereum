import { Box, VStack } from "native-base";
import React from "react";
import { Header } from "./header";
import { Footer } from "./footer";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box position="relative" bg="blueGray.800">
      <Header />
      <VStack minHeight={"81vh"} position="relative">
        {children}
      </VStack>
      <Footer />
    </Box>
  );
};
