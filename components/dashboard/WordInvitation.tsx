"use client"
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export function WordInvitation() {
  const [text, setText] = useState("This is the default text in the textarea.");

  const handleChange = (value:any) => {
    setText(value);
  };

  return (
    <Card>
      <div className="grid w-full gap-3">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent className="h-52 md:h-80">
          <ReactQuill
            value={text}
            onChange={handleChange}
            className="h-32 md:h-64 "
            theme="snow"
            placeholder="Type your message here."
          />
 
        </CardContent>
      </div>
    </Card>
  );
}
