import { Box, Divider, Typography } from "@mui/material";
import { useModel } from "../context/ModelContext";
import { Calculate } from "../utils/Calculate";

export const Calculations = () => {
  const { model } = useModel();

  const calculations = new Calculate(model);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <Typography variant="h5" component={"p"}>
        Pпп = (1+ Pош1)^m – вероятность правильного решения в ПК(прямом канале)
        <br />
        {calculations.successProbInDirectCh.formula} ={" "}
        {calculations.successProbInDirectCh.res.toFixed(3)}
      </Typography>
      <Divider />
      <Typography variant="h5" component={"p"}>
        Pоо - вероятность обнаружения ошибки в ПК
        <br />
        {calculations.errorDetectionProbDirectCh.formula} ={" "}
        {calculations.errorDetectionProbDirectCh.res.toFixed(3)}
      </Typography>
      <Divider />
      <Typography variant="h5" component={"p"}>
        Pнп = 1 - Pпп – Pоо - вероятность необнаружения ошибки ПК
        <br />
        {calculations.errorNotDetectionProbDirectCh.formula} ={" "}
        {calculations.errorNotDetectionProbDirectCh.res.toFixed(3)}
      </Typography>
      <Divider />
      <Typography variant="h5" component={"p"}>
        P*л = Рнп / (1 - Роо) - вероятность выдачи сообщения с ошибкой при
        отсутствии ошибки в обратном канале
        <br />
        {calculations.msgWithError.formula} ={" "}
        {calculations.msgWithError.res.toFixed(3)}
      </Typography>
      <Divider />
      <Typography variant="h5" component={"p"}>
        Рнпд оп - допустимое значение вероятности неправильного приема сигнала
        обратной связи
        <br />
        {calculations.acceptableValProbIncorrectReceptReversedCh.formula} ={" "}
        {calculations.acceptableValProbIncorrectReceptReversedCh.res.toFixed(3)}
      </Typography>
      <Divider />
      <Typography variant="h5" component={"p"}>
        Рнп - минимальное допустимое значение неправильного приема сигнала
        <br />
        {calculations.minAcceptableValProbIncorrectRecept.formula} ={" "}
        {calculations.minAcceptableValProbIncorrectRecept.res.toFixed(3)}
      </Typography>
    </Box>
  );
};
