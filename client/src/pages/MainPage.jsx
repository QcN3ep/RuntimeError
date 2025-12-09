import { useState } from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import ReactLogo from "../assets/react.svg";
import { invoke } from "@tauri-apps/api/core";

export default function MainPage() {
  const [name, setName] = useState("");
  const [greetMsg, setGreetMsg] = useState("");
  const greet = async () => {
    if (!name.trim()) return;
    try {
      const res = await invoke("greet", { name });
      setGreetMsg(res);
    } catch {
      setGreetMsg("请求失败");
    }
  };
  return (
    <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", px: 2 }}>
      <Container maxWidth="xs" sx={{ textAlign: "center" }}>
        <Box
          component="img"
          src={ReactLogo}
          alt="React"
          sx={{
            width: 96,
            height: 96,
            mb: 3,
            display: "block",
            mx: "auto",
            animation: "spin 12s linear infinite",
            "@keyframes spin": { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } }
          }}
        />
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Runtime Error
        </Typography>
        <TextField value={name} onChange={e => setName(e.target.value)} placeholder="你的名字" fullWidth variant="outlined" sx={{ mb: 2 }} />
        <Button variant="contained" onClick={greet} disabled={!name.trim()} size="large" sx={{ mb: 1 }}>
          问好
        </Button>
        {greetMsg && (
          <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
            {greetMsg}
          </Typography>
        )}
      </Container>
    </Box>
  );
}
