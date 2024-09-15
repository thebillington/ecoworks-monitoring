import { createContext } from "react"
import User from "@/models/user"

export const RegistrationFormContext = createContext<User>( new User() )