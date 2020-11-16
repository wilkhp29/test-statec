import { useCallback, useEffect, useReducer } from "react";
import OneSignal from "react-native-onesignal";
import socketIo from "socket.io-client";
import api from "../../services";

export interface init {
  Grupos: Array<grupo>;
  Grupo: grupo | null;
  Mensagens: Array<mensagem>;
  loading: boolean;
}

export interface grupo {
  id: number;
  name: string;
  Mensagens: Array<mensagem>;
}

interface mensagem {
  id: number;
  mensagem: string;
  Usuario: user | null;
}

interface user {
  id: number;
  email: string;
}

export enum Types {
  getGrupos = "GET_GRUPOS",
  addGrupo = "ADD_GRUPO",
  selectGrupo = "REMOVE_USER",
  removeGrupo = "ADDING_USER",
  addingeMensagens = "ADDING_MENSAGENS",
  addMensagem = "ADD_MENSAGEM",
  setLoading = "Loading",
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type DadosActions = ActionMap<payloadData>[keyof ActionMap<payloadData>];

type payloadData = {
  [Types.getGrupos]: { grupos: Array<grupo> };
  [Types.addGrupo]: { grupo: grupo };
  [Types.selectGrupo]: { grupo: grupo };
  [Types.removeGrupo]: { grupo: grupo };
  [Types.addingeMensagens]: { mensagens: Array<mensagem> };
  [Types.addMensagem]: { mensagen: mensagem };
  [Types.setLoading]: { loading: boolean };
};

export const startState: init = {
  Grupos: [],
  Mensagens: [],
  Grupo: null,
  loading: false,
};

const addGrupos = (state: init, Grupos: Array<grupo>): init => {
  return { ...state, Grupos };
};

const addGrupo = (state: init, Grupo: grupo): init => {
  const Grupos = state.Grupos;
  Grupos.push(Grupo);
  return { ...state, Grupos };
};

const selectGrupo = (state: init, Grupo: grupo): init => {
  return { ...state, Grupo };
};

const removeGrupo = (state: init, Grupo: grupo): init => {
  return { ...state, Grupo: null };
};

const addMensagens = (state: init, Mensagens: Array<mensagem>): init => {
  return { ...state, Mensagens };
};

const addMensagen = (state: init, Mensagen: mensagem): init => {
  const Mensagens = state.Mensagens;
  Mensagens.push(Mensagen);
  return { ...state, Mensagens };
};

const setLoading = (state: init, loading: boolean): init => {
  return { ...state, loading };
};

export const reduce = (state: init, action: DadosActions): init => {
  switch (action.type) {
    case Types.getGrupos:
      return addGrupos(state, action.payload.grupos);
    case Types.addGrupo:
      return addGrupo(state, action.payload.grupo);
    case Types.selectGrupo:
      return selectGrupo(state, action.payload.grupo);
    case Types.removeGrupo:
      return removeGrupo(state, action.payload.grupo);
    case Types.addingeMensagens:
      return addMensagens(state, action.payload.mensagens);
    case Types.addMensagem:
      return addMensagen(state, action.payload.mensagen);
    case Types.setLoading:
      return setLoading(state, action.payload.loading);
    default:
      return state;
  }
};

export const useAppReduce = () => {
  const [state, dispath] = useReducer(reduce, startState);

  const getGrupos = useCallback(() => {
    api.get("grupo").then(({ data }) => {
      dispath({ type: Types.getGrupos, payload: { grupos: data } });
    });
  }, []);

  const selectGrupo = useCallback((grupo: grupo) => {
    dispath({ type: Types.selectGrupo, payload: { grupo } });
  }, []);

  const addGrupo = useCallback((grupo: grupo) => {
    dispath({ type: Types.addGrupo, payload: { grupo } });
    OneSignal.tag("grupo", grupo.name);
  }, []);

  const removeGrupo = useCallback((grupo: grupo) => {
    dispath({ type: Types.removeGrupo, payload: { grupo } });
  }, []);

  const addMensagens = useCallback((mensagens: Array<mensagem>) => {
    dispath({ type: Types.addingeMensagens, payload: { mensagens } });
  }, []);

  const addMensagen = useCallback((mensagen: mensagem) => {
    dispath({ type: Types.addMensagem, payload: { mensagen } });
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    dispath({ type: Types.setLoading, payload: { loading } });
  }, []);

  const SocketRegister = useCallback(() => {
    const socket = socketIo("http://10.0.0.104:3000/");

    console.log("connect", socket.connected);
    socket.on("connect", () => {
      console.log("socket", socket.id);
    });
    socket.on("disconnect", () => {
      console.log("socket", socket.id);
    });
    socket.on("join", (data: any) => {
      addMensagen({
        mensagem: `o usuario ${data?.user?.email} entrou nesse grupo`,
        id: new Date().getTime(),
        Usuario: null,
      });
    });
    socket.on("mensagem", (data: mensagem) => {
      addMensagen("receved", data);
    });

    return socket;
  }, []);

  const onReceived = useCallback((notification) => {
    console.log("Notification received: ", notification);
  }, []);

  const onOpened = useCallback((openResult) => {
    console.log("Message: ", openResult.notification.payload.body);
    console.log("Data: ", openResult.notification.payload.additionalData);
    console.log("isActive: ", openResult.notification.isAppInFocus);
    console.log("openResult: ", openResult);
  }, []);

  const onIds = useCallback((device) => {
    console.log("Device info: ", device);
  }, []);

  useEffect(() => {
    OneSignal.init("78935163-9721-49ce-90d2-2d567ff2cedc");
    OneSignal.setLogLevel(6, 0);
    OneSignal.addEventListener("received", onReceived);
    OneSignal.addEventListener("opened", onOpened);
    OneSignal.addEventListener("ids", onIds);
    OneSignal.inFocusDisplaying(2);

    return () => {
      OneSignal.removeEventListener("received", onReceived);
      OneSignal.removeEventListener("opened", onOpened);
      OneSignal.removeEventListener("ids", onIds);
    };
  }, []);

  useEffect(() => {
    const socket = SocketRegister();
    return () => socket.disconnect();
  }, [SocketRegister()]);

  return {
    state,
    getGrupos,
    selectGrupo,
    removeGrupo,
    addMensagens,
    addMensagen,
    setLoading,
  };
};
