"use client";

import React from "react";
import { Range } from "react-date-range";
import Button from "../Button";
import Calendar from "../inputs/Calender";

type Props = {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
};

function ListingReservation({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}: Props) {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="flex gap-1 text-2xl font-semibold">
        ₹ {price} <div className="font-light text-neutral-600">night</div>
        </div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <hr />
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <p>Total</p>
        <p> ₹ {totalPrice}</p>
      </div>
    </div>
  );
}

export default ListingReservation;