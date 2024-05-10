import { useContext } from "react";
import { AuthContext } from "./AuthStore";
import { ChatStore } from "./ChatStore";
import { HomeStoreContext } from "./HomeStore";
import {ProfileStore} from './ProfileStore'
import { SellerStoreContext } from "./SellerStore";

export default {
    home: () => useContext(HomeStoreContext),
    user: () => useContext(AuthContext),
    profile: () => useContext(ProfileStore),
    seller: () => useContext(SellerStoreContext),
    chatStore: () => useContext(ChatStore)
}
