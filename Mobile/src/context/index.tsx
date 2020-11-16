import React, { createContext, useContext } from "react";
import {
  grupo,
  init,
  mensagem,
  startState,
  useAppReduce,
} from "../hooks/reduce";

type ContextProp = {
  state: init;
  addMensagen: () => void;
  addMensagens: (mensagens: Array<mensagem>) => void;
  getGrupos: () => void;
  removeGrupo: () => void;
  selectGrupo: (grupo: grupo) => void;
  setLoading: (loading: boolean) => void;
};

const Context = createContext<ContextProp>({
  state: startState,
  addMensagen: () => {},
  addMensagens: () => {},
  getGrupos: () => {},
  removeGrupo: () => {},
  selectGrupo: () => {},
  setLoading: () => {},
});

const AppContext: React.FC = ({ children }) => {
  const {
    state,
    addMensagen,
    addMensagens,
    getGrupos,
    removeGrupo,
    selectGrupo,
    setLoading,
  } = useAppReduce();

  return (
    <Context.Provider
      value={{
        state,
        addMensagen,
        addMensagens,
        getGrupos,
        removeGrupo,
        selectGrupo,
        setLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export function useAppContext() {
  const context = useContext(Context);
  const {
    state,
    addMensagen,
    addMensagens,
    getGrupos,
    removeGrupo,
    selectGrupo,
    setLoading,
  } = context;

  return {
    state,
    addMensagen,
    addMensagens,
    getGrupos,
    removeGrupo,
    selectGrupo,
    setLoading,
  };
}

export default AppContext;
