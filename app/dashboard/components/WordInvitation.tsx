"use client"
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import wordinglist from "../backend/WordingList";


export function WordInvitation() {
  const [text, setText] = useState("This is the default text in the textarea.");

  const handleChange = (value:any) => {
    setText(value);
  };

  return (
    <Card>
      <div className="grid w-full gap-3">
        <CardHeader>
          <CardTitle>Buat Template</CardTitle>
          <CardDescription className="text-red-500">*coming soon : mengedit dan memilih template</CardDescription>
        </CardHeader>
        <CardContent className="px-5  text-xs">
          {/* <ReactQuill
            value={text}
            onChange={handleChange}
            className="h-32 md:h-64 "
            theme="snow"
            placeholder="Type your message here."
          /> */}
          <div className="ql-container ql-snow py-0 my-0 rounded-xl">
            <div className="ql-editor  py-0 my-0">

              <p>
                Kepada Yth.<br />
                Bapak/Ibu/Saudara/i<br />
                Sendy<br />
                _____________________<br /><br />
                Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara pernikahan kami.<br /><br />
                Berikut link undangan kami, untuk info lengkap dari acara, bisa kunjungi :<br /><br />
                <a href="https://janjistory.com/topan-putri/?to=Sendy">https://janjistory.com/topan-putri/?to=Sendy</a><br /><br />
                Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.<br /><br />
                Terima Kasih<br /><br />
                Hormat kami,<br />
                Topan dan Putri<br />
                ____________________
              </p>
            </div>
          </div>

        </CardContent>
      </div>
    </Card>
  );
}
