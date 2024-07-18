import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateInputField(props) {
    const { label, id, extra, placeholder, variant, state, disabled, onChange } = props;
    const currentDate = new Date();
    
    return (
        <div className={`${extra}`}>
            <label
                htmlFor={id}
                className={`text-sm text-gray-400 dark:text-white ${variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
                    }`}
            >
                {label}
            </label>
           
                <DatePicker
                    selected={props.selectedDate} // Pass the selected date as a prop
                    onChange={onChange}     // Pass the onChange function as a prop
                    placeholderText={placeholder}
                    dateFormat="MM/dd/yyyy"        // Customize date format as needed
                    minDate={currentDate}
                    name={id}
                    id={id}
                    className={`mt-2 min-w-[400px] h-12 w-full items-center justify-center rounded-xl border border-gray-400 bg-white/0 p-3 text-sm outline-none text-white ${disabled === true
                            ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                            : state === "error"
                                ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
                                : state === "success"
                                    ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
                                    : "border-gray-200 dark:!border-white/10 dark:text-white"
                        }`}
                />
           
        </div>
    );
}

export default DateInputField;
