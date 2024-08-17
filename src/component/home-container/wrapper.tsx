import { Box } from "../ui/box";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Container } from "../ui/container";
import Header from "../ui/header";
import { ReactNode } from "react";

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Container className="h-screen" component="main">
        <Header />
        <Container component="article" className="container py-10">
          <Box component="form" className="w-full flex flex-col gap-y-4">
            <Box className="grid w-full items-center gap-1.5">
              <Label htmlFor="title">타이틀</Label>
              <Input
                type="text"
                id="title"
                placeholder="블로그 제목을 입력해주세요"
              />
            </Box>
            <Box className="grid w-full items-center gap-1.5">
              <Label htmlFor="picture">썸네일</Label>
              <Input id="picture" type="file" />
            </Box>
            {children}
          </Box>
        </Container>
      </Container>
    </>
  );
};

export default Wrapper;
