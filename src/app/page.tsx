"use client";
import { data } from "@/const/data";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const parentheses = ["(", ")"];
  const operations = ["+", "-", "/", "*"];
  // const functions = [{ name: "sum", value: (a: number, b: number) => a + b }];
  const initialNames = data.map((el) => el.name);
  const options = [
    ...initialNames,
    ...operations,
    ...parentheses,
    // ...functions.map((el) => el.name),
  ];
  const [allNames, setAllNames] = useState<string[]>([]);
  const [result, setResult] = useState<number | string>(0);
  const [str, setStr] = useState("");
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-10">
      <h1 className="font-bold text-lg">Formula input functionality</h1>
      <div className="flex flex-col gap-5 w-full max-w-[800px]">
        <p>Formula: {str}</p>
        <Autocomplete
          multiple
          id="formula"
          freeSolo={true}
          options={
            // options
            str[str.length - 1] === "("
              ? initialNames
              : str[str.length - 1] === ")"
              ? operations
              : operations.includes(str[str.length - 1]) || str === ""
              ? options
              : [...operations, ...parentheses]
          }
          // getOptionLabel={(option) => option.title}
          // defaultValue={[data[0].name]}
          isOptionEqualToValue={() => false}
          value={allNames}
          onChange={(_, names) => {
            setAllNames(names);
            let st = "";
            names.forEach((name) => {
              if (initialNames.includes(name)) {
                st += data.find((el) => el.name === name)?.value;
              } else {
                st += name;
              }
            });
            setStr(st);
            try {
              setResult(Function("return " + st)());
              // setResult(eval(st));
            } catch {
              setResult("Error");
            }
          }}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="New Formula"
              // placeholder="Favorites"
            />
          )}
          renderTags={(value: readonly string[], getTagProps) =>
            value.map((option: string, index: number) => {
              if (initialNames.includes(option)) {
                return (
                  <Chip
                    key={index}
                    variant="outlined"
                    label={option}
                    // {...getTagProps({ index })}
                  />
                );
                // } else if (functions.map((el) => el.name).includes(option)) {
                //   return (
                //     <>
                //       <div className="flex gap-1 items-center">
                //         {option}
                //         <input
                //           aria-invalid={false}
                //           type="text"
                //           key={option}
                //           placeholder="value1, value2"
                //           className="rounded px-2 py-1 w-[107px] text-sm bg-transparent border-gray-300 border"
                //         ></input>
                //       </div>
                //     </>
                //   );
              } else {
                return (
                  <div className="px-1" key={index}>
                    {option}
                  </div>
                );
              }
            })
          }
        />
        <p className="text-center">
          Result: <span className="font-bold text-2xl">{result}</span>
        </p>
        <p className="text-sm text-center opacity-50 mt-10">
          Created by{" "}
          <a
            href="https://www.upwork.com/freelancers/svitlanaiordatii"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Svitlana Iordatii
          </a>
        </p>
      </div>
    </main>
  );
}
