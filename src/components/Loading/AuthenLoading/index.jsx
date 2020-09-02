/** @format */

import React from "react";
import LoadingAuthenticationImage from "../../../common/image/LoadingProject.gif";
export default function AuthLoading({ isLoading }) {
  return (
    isLoading && (
      <div className="authen-loading">
        <img src={LoadingAuthenticationImage} alt="loading" />
      </div>
    )
  );
}
