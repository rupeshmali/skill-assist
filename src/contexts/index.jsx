import React from "react";
import AuthStore from "./AuthStore";
import ChatStoreProvider from "./ChatStore";
import HomeStoreProvider from "./HomeStore";
import ProfileStoreProvider from "./ProfileStore";
import SellerStoreProvider from "./SellerStore";

export default function ContextWrapper({ children }) {
  return (
    <>
      <AuthStore>
        <ProfileStoreProvider>
          <SellerStoreProvider>
            <ChatStoreProvider>
              <HomeStoreProvider>{children}</HomeStoreProvider>
            </ChatStoreProvider>
          </SellerStoreProvider>
        </ProfileStoreProvider>
      </AuthStore>
    </>
  );
}
