import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { Model } from "../model.type";

const initialState: Model = {
  digitsNumber: 0,
  codeDistance: 0,
  directChannel: 0,
  reversedChannel: 0,
  ratio: 0,
  reliability: 0,
};

const ModelContext = createContext<{
  model: Model;
  setModel: Dispatch<SetStateAction<Model>>;
}>({ model: initialState, setModel: () => {} });

export const ModelProvider = ({ children }: PropsWithChildren) => {
  const [model, setModel] = useState(initialState);

  return (
    <ModelContext.Provider value={{ model, setModel }}>
      {children}
    </ModelContext.Provider>
  );
};

export const useModel = () => {
  const data = useContext(ModelContext);
  return data;
};
