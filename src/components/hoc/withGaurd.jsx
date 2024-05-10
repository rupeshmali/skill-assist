import { AuthContext } from "@contexts/AuthStore";
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

export default function withGaurd(Component) {
  return function WrapperComponent({ props }) {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Redirect to="/landing?authgaurd=show" />;
    }
    return <Component {...props} />;
  };
}
