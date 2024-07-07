"use client"

import { createContext, useContext } from "react"
import {}  

type SocketContextType = {
socket : Socket
}

const SocketContext = createContext<SocketContextType>({})
export const useSocket = ()=> useContext(SocketContext);
