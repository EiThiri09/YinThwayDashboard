import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading({ style }) {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        ...style,
      }}
    >
      <CircularProgress />
    </div>
  );
}
