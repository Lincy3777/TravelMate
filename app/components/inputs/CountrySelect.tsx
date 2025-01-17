"use client";

import useCountries from "@/app/hooks/useCountries";
import Select from "react-select";
import Flag from "react-world-flags";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

type Props = {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
};

function CountrySelect({ value, onChange }: Props) {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <Flag code={option.value} className="w-5" />
            <div>
              {option.label},
              <span className="text-neutral-700 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-4 border-3",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#C6E7FF",
          },
        })}
      />
    </div>
  );
}

export default CountrySelect;