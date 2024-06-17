"use client";
import { data } from "@/const/data";
import useData from "@/hooks/useData";
import { Autocomplete, Chip, Input, TextField } from "@mui/material";
import { useState } from "react";

const Formula = () => {
  const { data, isLoading } = useData();
  const parentheses = ["(", ")"];
  const operations = ["+", "-", "/", "*"];
  const [allNames, setAllNames] = useState<string[]>([]);
  const [result, setResult] = useState<number | string>(0);
  const [str, setStr] = useState("");
  return (
    <>
      <p>Formula: {str}</p>
      {isLoading && (
        <Autocomplete
          freeSolo={true}
          multiple
          disabled
          options={operations}
          renderInput={(params) => (
            <TextField {...params} label="New Formula" />
          )}
        />
      )}
      {data && (
        <Autocomplete
          multiple
          id="formula"
          freeSolo={true}
          options={
            // options
            str[str.length - 1] === "("
              ? data.initialNames
              : str[str.length - 1] === ")"
              ? operations
              : operations.includes(str[str.length - 1]) || str === ""
              ? data.options
              : [...operations, ...parentheses]
          }
          isOptionEqualToValue={() => false}
          value={allNames}
          onChange={(_, names) => {
            setAllNames(names);
            let st = "";
            names.forEach((name) => {
              if (data.initialNames.includes(name)) {
                st += data.data.find((el) => el.name === name)?.value;
              } else {
                st += name;
              }
            });
            setStr(st);
            try {
              setResult(Function("return " + st)());
            } catch {
              setResult("Error");
            }
          }}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField {...params} label="New Formula" />
          )}
          renderTags={(value: readonly string[], getTagProps) =>
            value.map((option, index: number) => {
              if (data.initialNames.includes(option)) {
                return <Chip key={index} variant="outlined" label={option} />;
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
      )}

      <p className="text-center">
        Result: <span className="font-bold text-2xl">{result}</span>
      </p>
    </>
  );
};

export default Formula;
