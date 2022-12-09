import React, { useState, useEffect, useRef } from "react";
import config from "../../config";
import { TextField, Dialog, Typography, Button, Box, Stack } from "@mui/material";
import { ethers } from "ethers";
import { useEther } from "../../contexts/useEther";
import { Controller, useForm } from "react-hook-form";
const style = {
  width: "500px",
  height: "auto",
  bgcolor: "background.default",
  boxShadow: 24,
  p: 3,
};
type Props = {
  open: boolean;
  setOpen: (state: boolean) => void;
  id: string | string[] | undefined;
};
export default function PopupSendNft(props: Props) {
  const { currentAccount, provider } = useEther();
  const handleClosePopUp = () => props.setOpen(false);
  const { control, reset, handleSubmit } = useForm();

  async function handelOnclickMint(dataMint: any) {
    const id = props.id;
    const signer = provider.getSigner();
    const address = config.chaintifyContract;
    const abi = ["function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data)"];

    try {
      const contract = new ethers.Contract(address, abi, signer);
      const tx = await contract.functions.safeTransferFrom(currentAccount, dataMint.to, id, dataMint.amount, "0x");
      const receipt = await tx.wait();
      console.log("receipt", receipt);
      alert("SUCCESS");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Dialog onClose={handleClosePopUp} open={props.open} sx={{ zIndex: 2000 }}>
      <Box
        sx={style}
        style={{
          position: "relative",
        }}
      >
        <Button
          style={{
            position: "absolute",
            right: 0,
            top: 0,
          }}
          onClick={handleClosePopUp}
        >
          Close
        </Button>
        <Typography
          variant="h6"
          sx={{
            color: "text.primary",
          }}
        >
          Send NFT now
        </Typography>
      </Box>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"} padding="2rem 0 ">
        <form
          style={{
            color: "text.primary",
            width: "90%",
          }}
        >
          <Controller
            name={"to"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Box sx={{ width: "100%", color: "text.primary", padding: "0.5rem 0" }}>
                <Typography variant="h6">To Address</Typography>
                <Typography variant="body1">Is the recipient's wallet address when the minting occurs</Typography>
                <TextField
                  InputProps={{ inputProps: { min: 1, max: 1000000 } }}
                  label=""
                  variant="outlined"
                  type={"text"}
                  sx={{ width: "100%" }}
                  placeholder="0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1"
                  onChange={onChange}
                  value={value}
                />
              </Box>
            )}
          />
          <Controller
            name={"amount"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Box sx={{ width: "100%", color: "text.primary", padding: "0.5rem 0" }}>
                <Typography variant="h6">Amount</Typography>
                <Typography variant="body1">Is the recipient's amount token mint when the minting occurs</Typography>
                <TextField
                  InputProps={{ inputProps: { min: 1, max: 1000000 } }}
                  label=""
                  variant="outlined"
                  type={"number"}
                  sx={{ width: "100%" }}
                  placeholder="1"
                  onChange={onChange}
                  value={value}
                />
              </Box>
            )}
          />

          <Stack direction={"row"}>
            <Button
              onClick={() =>
                reset({
                  to: "",
                  amount: "",
                })
              }
              variant={"outlined"}
            >
              Reset
            </Button>
            <Button onClick={handleSubmit(handelOnclickMint)}>Send</Button>
          </Stack>
        </form>
      </Box>
    </Dialog>
  );
}
