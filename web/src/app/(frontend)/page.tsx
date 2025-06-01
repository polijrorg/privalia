'use client'

import React from "react";
import MDEditor from "@uiw/react-md-editor";

export default function Home() {
  const [value, setValue] = React.useState("**Hello world!!!**");
  return (
    <div className="w-[80%] mx-auto">
      <MDEditor
        value={value}
        onChange={(value) => setValue(value || "")}
      />
    </div>
  );
}