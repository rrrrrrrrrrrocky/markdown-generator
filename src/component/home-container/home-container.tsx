import {
  AspectRatio,
  Box,
  Button,
  Container,
  FileButton,
  Flex,
  Image,
  Input,
  Stack,
  Title,
} from "@mantine/core";

import { useMediaQuery } from "@mantine/hooks";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import supabase from "@/script/util/supabase";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

interface FormValues {
  title: string;
  // thumbnail: {
  //   file: null | File;
  //   id: string;
  //   path: string;
  //   name: string;
  // };
  thumbnail: File | null;
  markdown: string;
}

// interface ResolveFileObject {
//   file: File;
//   reader: FileReader;
// }

const HomeContainer = () => {
  const matches = useMediaQuery("(max-width: 1200px)");

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: "",
      thumbnail: null,
      // thumbnail: {
      //   file: null,
      //   id: "",
      //   path: "",
      //   name: "",
      // },
      markdown: "",
    },
  });

  const getPosts = async () => {
    const res = await supabase.from("posts").select();
    console.log("res >>", res);
  };

  useEffect(() => {
    getPosts();
  }, []);

  // const onUpload = useCallback(async (fileMap: FileList | null) => {
  //   const selectedFileList = Array.from(fileMap || []);
  //   const isImageType = selectedFileList.some(
  //     (file) =>
  //       file.type === "image/gif" ||
  //       file.type === "image/jpeg" ||
  //       file.type === "image/png" ||
  //       file.type === "image/jpg" ||
  //       file.type === "image/webp"
  //   );

  //   if (!isImageType) {
  //     alert("image 타입만 등록 가능합니다.");
  //     return;
  //   }
  //   const fileList = [...selectedFileList];
  //   // const fileList = [...initialFileList, ...selectedFileList];
  //   if (fileList.length > 1) {
  //     alert("최대 1개까지만 등록가능합니다.");
  //     return;
  //   }
  //   const files = selectedFileList.map((file) => {
  //     return new Promise<ResolveFileObject>((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         resolve({
  //           file,
  //           reader,
  //         });
  //       };
  //       reader.onerror = reject;
  //       reader.readAsDataURL(file);
  //     });
  //   });

  //   const addedFileList: Array<ResolveFileObject> = await Promise.all(files);
  //   console.log("addedFileList >>", addedFileList);
  // }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("data >", data);

    const res = await supabase.from("posts").insert({ ...data });
    console.log("res .>>", res);
  };

  return (
    <Container fluid px={0} component="main" h="100vh" w="100%">
      <Flex
        pos="sticky"
        top={0}
        bg="white"
        h="56px"
        display="flex"
        align="center"
        p="0px 16px"
        style={{
          zIndex: 10,
          borderBottom: "1px solid gray",
        }}
        component="header">
        <Box
          component="section"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              columnGap: "4px",
            }}>
            <Image
              style={{
                width: "24px",
                height: "24px",
              }}
              alt="logo"
              height={24}
              src="/favicon/favicon-32x32.png"
              width={24}
            />

            <Title size="h3">R*11</Title>
          </Box>

          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              columnGap: "8px",
            }}>
            <Button type="submit" form="submit-md">
              저장
            </Button>
            <Button
              color="gray"
              onClick={() => {
                supabase.auth.signOut();
              }}>
              로그아웃
            </Button>
          </Box>
        </Box>
      </Flex>

      <Stack
        component="article"
        style={
          matches
            ? {
                width: "100%",
                height: "calc(100% - 56px)",
              }
            : {
                maxWidth: "1200px",
                marginRight: "auto",
                marginLeft: "auto",
                height: "calc(100% - 56px)",
              }
        }>
        <Flex
          id="submit-md"
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          pos="relative"
          w="100%"
          justify="flex-end"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            rowGap: "16px",
            flexDirection: "column",
            padding: "16px",
            width: "100%",
            height: "100%",
          }}>
          <Controller
            control={control}
            name="thumbnail"
            render={({ field: { value, onChange, ...field } }) => {
              return (
                <>
                  {value && (
                    <AspectRatio ratio={1080 / 720} maw={300}>
                      <Image
                        alt="thumbnail"
                        radius={4}
                        src={URL.createObjectURL(value)}
                      />
                    </AspectRatio>
                  )}
                  <FileButton
                    onChange={(file) => {
                      onChange(file);
                    }}
                    accept="image/*"
                    {...field}>
                    {(props) => (
                      <Button w="300px" {...props}>
                        썸네일 업로드
                      </Button>
                    )}
                  </FileButton>
                </>
              );
            }}
          />

          <Controller
            control={control}
            name="title"
            render={({ field }) => {
              return (
                <Input.Wrapper label="Title">
                  <Input placeholder="블로그 제목을 입력하세요." {...field} />
                </Input.Wrapper>
              );
            }}
          />

          <Controller
            control={control}
            name="markdown"
            render={({ field: { value, onChange, ...field } }) => {
              return (
                <MDEditor
                  className=""
                  style={{
                    flex: 1,
                  }}
                  height="100%"
                  minHeight={undefined}
                  autoFocus
                  textareaProps={{
                    placeholder: "내용을 입력해주세요.",
                  }}
                  color="white"
                  data-color-mode="light"
                  value={value}
                  onChange={(str) => {
                    console.log("e >>", str);
                    onChange(str);
                  }}
                  previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                  }}
                  {...field}
                />
              );
            }}
          />
        </Flex>
      </Stack>
    </Container>
  );
};

export default HomeContainer;
