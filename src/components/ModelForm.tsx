import { Controller, useForm } from "react-hook-form";
import { Model } from "../model.type";
import { useModel } from "../context/ModelContext";
import { Button, TextField } from "@mui/material";

export const ModelForm = () => {
  const { setModel, model } = useModel();
  const { handleSubmit, control } = useForm<Model>();

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "center",
      }}
      onSubmit={handleSubmit(
        ({
          digitsNumber,
          codeDistance,
          directChannel,
          reversedChannel,
          ratio,
          reliability,
        }) =>
          setModel({
            digitsNumber: +digitsNumber,
            codeDistance: +codeDistance,
            directChannel: +directChannel,
            reversedChannel: +reversedChannel,
            ratio: +ratio,
            reliability: +reliability,
          })
      )}
    >
      <Controller
        control={control}
        name="digitsNumber"
        defaultValue={model.digitsNumber}
        render={({ field }) => (
          <TextField
            label={"Число разрядов"}
            required
            type="number"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="codeDistance"
        defaultValue={model.codeDistance}
        render={({ field }) => (
          <TextField
            label={"Кодовое расстояние"}
            required
            type="number"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="directChannel"
        defaultValue={model.directChannel}
        render={({ field }) => (
          <TextField
            label={"Вероятность ошибки в прямом канале"}
            required
            type="number"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="reversedChannel"
        defaultValue={model.reversedChannel}
        render={({ field }) => (
          <TextField
            label={"Вероятность ошибки в обратном канале"}
            required
            type="number"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="ratio"
        defaultValue={model.ratio}
        render={({ field }) => (
          <TextField label={"Соотношение"} required type="number" {...field} />
        )}
      />
      <Controller
        control={control}
        name="reliability"
        defaultValue={model.reliability}
        render={({ field }) => (
          <TextField
            label={"Достоверность"}
            required
            type="number"
            {...field}
          />
        )}
      />
      <Button variant="outlined" type="submit">
        Обновить
      </Button>
    </form>
  );
};
