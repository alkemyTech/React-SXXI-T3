import LinearProgress from "@mui/material/LinearProgress";

import React from "react";

export const ProgressBar = ({
  classes,
  color,
  sx,
  value,
  valueBuffer,
  variant,
}) => {
  return (
    <LinearProgress
      classes={classes}
      color={color}
      sx={sx}
      value={value}
      valueBuffer={valueBuffer}
      variant={variant}
    />
  );
};
