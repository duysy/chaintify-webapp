import * as React from "react";
import { useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab/";
import SaveIcon from "@mui/icons-material/Save";
type Props = {
  setPath: any;
  accept: string;
  title: string | null;
};
import { create as createFilePrivate } from "../../apis/private/file/post_file";
export default function PopupCreateAlbum(props: Props) {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [path, setPath] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [present, setPresent] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);
  const handleFileSelect = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSetPathFile = (pathName: string) => {
    setPath(pathName);
    props.setPath(pathName);
  };

  const showError = (text: string) => {
    setError(text);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  useEffect(() => {
    const autoUploadFile = async () => {
      if (!selectedFile) return;
      if ((selectedFile as any)?.size > 24 * 1024 * 1024) {
        showError("Size max 24 Mb");
        return;
      }
      const formData = new FormData();
      formData.append("file_uploaded", selectedFile);
      try {
        setLoading(true);
        const response = await createFilePrivate({ formData: formData }, setPresent);
        const path = response.name;
        handleSetPathFile(path);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        showError("Upload fail");
      }
    };
    autoUploadFile();
  }, [selectedFile]);

  return (
    <Box sx={{ bgcolor: "background.default", p: "0.5rem", minWidth: "10rem", border: "2px dashed", borderColor: "text.primary" }}>
      <input
        disabled={loading == true}
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
        <Typography>{path ? `...${path.slice(path.length - 20, path.length)}` : props.title ? props.title : "Select file here "}</Typography>

        <LoadingButton loading={loading} loadingPosition="start" variant="outlined" startIcon={<SaveIcon />} disabled>
          <Typography sx={{ color: "text.primary" }}>{loading ? present + " %" : "Choose file"}</Typography>
        </LoadingButton>
        <Box sx={{ color: "red" }}>{error ?? <Typography>{error}</Typography>}</Box>
      </label>
    </Box>
  );
}
