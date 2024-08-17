import { Container } from "./container";
import { Box } from "./box";
import { Typography } from "./typography";
import { Button } from "./button";

const Header = () => {
  return (
    <Container
      component="header"
      className="sticky top-0 w-full h-14 flex items-center border-b border-b-r-gray-3 px-4 bg-white">
      <Box className="w-full flex items-center justify-between">
        <Box className="flex items-center justify-start gap-x-1">
          <img
            className="w-6 h-6"
            alt="logo"
            height={24}
            src="/favicon/favicon-32x32.png"
            width={24}
          />
          <Typography component="h1" className="b1-700">
            R*11
          </Typography>
        </Box>
        <Box className="flex items-center justify-end gap-x-2">
          <Button size="sm">구독하기</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Header;
