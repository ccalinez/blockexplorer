import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Tooltip,
  IconButton,
  Link
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useLoaderData } from "react-router-dom";
import Block from './block.ts'


// 🔹 Componente
const BlockDetails = () => {

  const { block } = useLoaderData() as { block: Block };


  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };



  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Block Details
        </Typography>

        <Grid container spacing={2}>
          {/* Miner */}
          <Grid  size={12}>
            <Typography variant="subtitle2">Miner</Typography>
            <Grid container >
              <Tooltip title={block?.miner}>
                <Typography variant="body2" sx={{ mr: 1 }}>
                  {shortenAddress(block?.miner)}
                </Typography>
              </Tooltip>
              <IconButton size="small" onClick={() => copyToClipboard(block?.miner)}>
                <ContentCopyIcon fontSize="inherit" />
              </IconButton>
            </Grid>
          </Grid>

          {/* Extra Data */}
          <Grid  size={12}>
            <Typography variant="subtitle2">Extra Data</Typography>
            <Tooltip title={block?.extraData}>
              <Typography variant="body2">
                {hexToUtf8(block?.extraData) ?? "(binary data)"}
              </Typography>
            </Tooltip>
          </Grid>

          {/* Nonce */}
          <Grid  size={12}>
            <Typography variant="subtitle2">Nonce</Typography>
            <Tooltip title={block?.nonce}>
              <Typography variant="body2">
                {hexToDecimal(block?.nonce)}
              </Typography>
            </Tooltip>
          </Grid>
                    {/* Transactions */}
          <Grid  size={12}>
            <Typography variant="subtitle2">Transactions:</Typography>
            <Tooltip title={'Click to view transactions'}>
              <Typography variant="body2">
                <Link href="#" underline="none">
                  {block?.transactions.length} transactions.
                </Link>
              </Typography>
            </Tooltip>
          </Grid>


        </Grid>

        
      </CardContent>
    </Card>
  );
};


// Hex → UTF-8
const hexToUtf8 = (hex) => {
  try {
    if (!hex || hex === "0x") return "";
    const bytes = new Uint8Array(
      hex.slice(2).match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
    );
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
};

// Address checksum (simplificado → solo normalizamos)
const formatAddress = (address) => {
  if (!address) return "";
  return address.toLowerCase(); // podés dejarlo así o implementar checksum EIP-55 si querés
};

const shortenAddress = (addr) => {
  return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";
};

// Hex → número
const hexToDecimal = (hex) => {
  try {
    return BigInt(hex).toString();
  } catch {
    return hex;
  }
};

export default BlockDetails;