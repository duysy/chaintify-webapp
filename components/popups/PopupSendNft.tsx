import React, { useState, useEffect, useRef } from "react";
import { TextField, Dialog, Typography, Button, Box, Stack, Link } from "@mui/material";
import { useEther } from "../../contexts/useEther";
import { Controller, useForm } from "react-hook-form";
import { useSendNFT } from "../../hooks/contracts/useSendNFT";
import { useAccount } from "wagmi";
import config from "../../config";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
  const { address } = useAccount();
  const handleClosePopUp = () => props.setOpen(false);
  const schema = yup.object().shape({
    to: yup.string().length(42).required(),
    amount: yup.number().min(1).max(10000).required(),
  });
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      to: "",
      amount: 1,
    },
  });
  const { send, data, prepareError, isPrepareError, error, isError, isLoading, isSuccess } = useSendNFT();
  async function onSubmit(dataMint: any) {
    const id = props.id;
    if (!address) return;
    if (!id) return;
    await send(address, dataMint.to, +id, dataMint.amount);
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

        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          padding="2rem 0"
          // marginTop="5rem"
          sx={{
            bgcolor: "background.default",
          }}
        >
          <form>
            <Controller
              name={"to"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Box sx={{ width: "100%", color: "text.primary", padding: "0.5rem 0" }}>
                  <Typography variant="h6">To Address</Typography>
                  <Typography variant="body1">Is the recipients wallet address when the minting occurs</Typography>
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
                  <Typography color="red">{errors.to?.message as any}</Typography>
                </Box>
              )}
            />
            <Controller
              name={"amount"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Box sx={{ width: "100%", color: "text.primary", padding: "0.5rem 0" }}>
                  <Typography variant="h6">Amount</Typography>
                  <Typography variant="body1">Is the recipients amount token mint when the minting occurs</Typography>
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
                  <Typography color="red">{errors.amount?.message as any}</Typography>
                </Box>
              )}
            />

            <Stack direction={"row"}>
              <Button
                onClick={() =>
                  reset({
                    to: "",
                    amount: 1,
                  })
                }
                variant={"outlined"}
              >
                Reset
              </Button>

              <Button disabled={isLoading || isSuccess} onClick={handleSubmit(onSubmit)}>
                {isLoading ? "Sending..." : "Send"}
              </Button>
            </Stack>

            {isSuccess && (
              <Box>
                Successfully sended your NFT!
                <Box>
                  <Link target="_blank" href={`${config.EXPLORER}/${data?.hash}`}>
                    Explorer scan
                  </Link>
                </Box>
              </Box>
            )}
            {(isPrepareError || isError) && <nav>Error: {(prepareError || error)?.message}</nav>}
          </form>
        </Box>
      </Box>
    </Dialog>
  );
}
