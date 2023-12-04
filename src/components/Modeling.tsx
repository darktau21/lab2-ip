import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useModel } from "../context/ModelContext";
import { Calculate } from "../utils/Calculate";
import { useState } from "react";

export const Modeling = () => {
  const { model } = useModel();
  const [msgCount, setMsgCount] = useState(0);
  const [res, setRes] = useState<{
    success: number;
    repeat: number;
    drop: number;
  }>();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <Typography variant="h3" component={"h1"}>
        Моделирование
      </Typography>
      <Divider />
      <TextField
        value={msgCount}
        onChange={(e) => void setMsgCount(+e.target.value)}
        sx={{ width: "100%" }}
        label="Количество сообщений"
      />
      <Button
        onClick={() => {
          const calcs = new Calculate(model);
          setRes(calcs.modeling(msgCount));
        }}
        type="submit"
        variant="outlined"
      >
        Рассчитать
      </Button>
      <Divider />
      {res ? (
        <Typography variant="h5" component={"h1"}>
          Количество сообщений: {msgCount} <br />
          Выдача без ошибок: {res.success} <br />
          Стирание и повтор: {res.repeat} <br />
          Выпадение: {res.drop} <br />
        </Typography>
      ) : null}
    </Box>
  );
};
