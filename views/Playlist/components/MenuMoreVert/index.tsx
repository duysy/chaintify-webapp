import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Delete, MoreVert } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useMutation } from "react-query";
import { deletePlaylist } from "../../../../apis/private/models/playlist/delete_playlist";
import { useRouter } from "next/router";
import { Typography } from "@material-ui/core";
type TProps = {
  id: number;
};
export default function MenuMoreVert(props: TProps) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const mutationSubmit = useMutation((id: number) => deletePlaylist(id), {
    onSuccess: (data) => {
      handleClose();
      router.push(`/mymusic`);
    },
    onError: () => {
      alert("Fail");
    },
  });

  const handelDeleteClick = (id: number) => {
    mutationSubmit.mutate(id);
  };

  return (
    <Box>
      <Box onClick={handleClick}>
        <MoreVert
          sx={{
            color: "text.primary",
          }}
        />
      </Box>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => handelDeleteClick(props.id)} disableRipple>
          <Delete />
          <Typography>Delete</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
