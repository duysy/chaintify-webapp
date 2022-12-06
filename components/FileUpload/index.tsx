import * as React from "react";
import { useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

type Props = {
  setPath: any;
  accept: string;
  title: string | null;
};
import { create as createFilePrivate } from "../../apis/private/file/post_file";
export default function PopupCreateAlbum(props: Props) {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [path, setPath] = React.useState<string | null>(null);
  const [title, setTitle] = React.useState<string | null>(props.title);
  const handleFileSelect = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSetPathFile = (pathName: string) => {
    setPath(pathName);
    props.setPath(pathName);
  };

  useEffect(() => {
    const autoUploadFile = async () => {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("file_uploaded", selectedFile);
      try {
        const response = await createFilePrivate({ formData: formData });
        alert("Success");
        const path = response.name;
        handleSetPathFile(path);
      } catch (error: any) {
        alert("Fail: " + error?.message);
      }
    };
    autoUploadFile();
  }, [selectedFile]);

  return (
    <Box sx={{ bgcolor: "background.default", p: "0.5rem", minWidth: "10rem", border: "2px dashed", borderColor: "text.primary" }}>
      <input
        name="file_uploaded"
        accept={props.accept}
        type="file"
        id={props.accept}
        style={{
          display: "none",
        }}
        onChange={handleFileSelect}
      />
      <label
        style={{
          width: "100%",
          height: "6rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
        }}
        htmlFor={props.accept}
      >
        <Typography>{path ? `...${path.slice(path.length - 20, path.length)}` : title ? title : "Select file here "}</Typography>
        <Button disabled variant="contained">
          Choose file
        </Button>
      </label>

      {/* <TextField
        name="file_uploaded"
        type="file"
        inputProps={{ accept: props.accept, id: "file_uploaded" }}
        style={{
          // display: "none",
        }}
        onChange={handleFileSelect}
      /> */}
    </Box>
  );
}
