"use client";

import { type FC, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { z } from "zod";
import {
  useForm,
  type UseFormRegister,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SquareButton from "../buttons/square-button";

const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(6, { message: "Phone must be at least 6 characters" }),
  postcode: z.string().optional().or(z.literal("")),
  message: z.string().optional().or(z.literal("")),
  checklist: z.object({
    customSauna: z.boolean(),
    premadeSauna: z.boolean(),
    iceBath: z.boolean(),
    hotTub: z.boolean(),
    infrared: z.boolean(),
    materialsAndAccessories: z.boolean(),
    residentialAndCommercialServices: z.boolean(),
    saunaAndSteamRoomEquipment: z.boolean(),
  }),
});

type Schema = z.infer<typeof schema>;

const ContactUs: FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      postcode: "",
      message: "",
      checklist: {
        customSauna: false,
        premadeSauna: false,
        iceBath: false,
        hotTub: false,
        infrared: false,
        materialsAndAccessories: false,
        residentialAndCommercialServices: false,
        saunaAndSteamRoomEquipment: false,
      },
    },
  });

  const onSubmit = (data: Schema) => {
    console.log("Submitting contact form", data);
  };
  return (
    <section className="flex justify-center bg-[#F2F2F2] px-4 py-[85px] leading-8 lg:px-0 w-full">
      <div className="flex  flex-col justify-center md:max-w-3xl">
        <span className="text-center text-[20px] font-medium uppercase lg:text-[26px]">
          Contact Us
        </span>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mt-[30px] flex flex-col gap-x-6 gap-y-5 sm:grid sm:grid-cols-2">
            <TextField
              register={register}
              registerName="name"
              label="Your name*"
              errorMessage={(errors.name?.message as string) ?? undefined}
              className="col-span-1"
            />
            <TextField
              register={register}
              registerName="email"
              label="Your email*"
              errorMessage={(errors.email?.message as string) ?? undefined}
              className="col-span-1"
            />
            <TextField
              register={register}
              registerName="phone"
              label="Your phone number"
              errorMessage={(errors.phone?.message as string) ?? undefined}
              className="col-span-1"
            />
            <TextField
              register={register}
              registerName="postcode"
              label="Your post code"
              className="col-span-1"
            />
            <MultiSelectField className="col-span-2" register={register} />
            <TextAreaField
              register={register}
              registerName="message"
              label="Your message"
              placeholder="Please provide us with as much information as possible so we can help you better"
              errorMessage={(errors.message?.message as string) ?? undefined}
              className="col-span-2"
            />
          </div>
          <div className="mt-7 flex justify-end leading-5">
            <SquareButton
              text="Submit"
              black
              submit
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </section>
  );
};
export default ContactUs;

interface TextFieldProps {
  label: string;
  placeholder?: string;
  className?: string;
  register: UseFormRegister<Schema>;
  registerName: keyof Schema;
  errorMessage?: string;
}

const TextField: FC<TextFieldProps> = ({
  label,
  placeholder,
  className = "",
  register,
  registerName,
  errorMessage,
}) => {
  return (
    <div className={"flex w-full flex-col" + " " + className}>
      <label>{label}</label>
      <input
        {...register(registerName)}
        placeholder={placeholder}
        className={
          "mt-[10px] w-full flex-1 border-b-2 px-2 py-1.5 text-[16px] font-medium text-[#4e4d4d] outline-none bg-white " +
          (errorMessage ? "border-[#FF0000]" : "focus:border-[#000000]")
        }
      />
      <div className="mt-1 h-5">
        <span className={"text-sm text-red-600 " + (errorMessage ? "" : "invisible")}>
          {errorMessage ?? "placeholder"}
        </span>
      </div>
    </div>
  );
};

interface MultiSelectFieldProps {
  className?: string;
  register: UseFormRegister<Schema>;
}

const MultiSelectField: FC<MultiSelectFieldProps> = ({
  className,
  register,
}) => {
  const getCheckbox = (label: string, span: string, registerName: string) => (
    <div className={"flex gap-3" + " " + span}>
      <input
        {...register(registerName as any)}
        className="rounded-none"
        type="checkbox"
      />
      <label>{label}</label>
    </div>
  );
  return (
    <div className={"flex w-full flex-col" + " " + className}>
      <label>What can we help you with?</label>
      <div className="mt-[10px] flex flex-wrap gap-x-4 gap-y-3 bg-white p-5 sm:grid sm:grid-cols-4">
        {getCheckbox("Custom Sauna", "col-span-1", "checklist.customSauna")}
        {getCheckbox("Pre-made Sauna", "col-span-1", "checklist.premadeSauna")}
        {getCheckbox("Ice Bath", "col-span-1", "checklist.iceBath")}
        {getCheckbox("Hot Tube", "col-span-1", "checklist.hotTub")}
        {getCheckbox("Infrared", "col-span-1", "checklist.infrared")}
        {getCheckbox(
          "Materials & Accessories",
          "col-span-3",
          "checklist.materialsAndAccessories",
        )}
        {getCheckbox(
          "Commercial & Residential Services",
          "col-span-2",
          "checklist.residentialAndCommercialServices",
        )}
        {getCheckbox(
          "Sauna & Steam room Equipment",
          "col-span-2",
          "checklist.saunaAndSteamRoomEquipment",
        )}
      </div>
    </div>
  );
};

interface TextAreaFieldProps {
  label: string;
  placeholder?: string;
  className?: string;
  register: UseFormRegister<Schema>;
  registerName: keyof Schema;
  errorMessage?: string;
}

const TextAreaField: FC<TextAreaFieldProps> = ({
  label,
  placeholder,
  className = "",
  register,
  registerName,
  errorMessage,
}) => {
  const [height, setHeight] = useState(0);
  const [rows, setRows] = useState(3);
  return (
    <div className={"flex w-full flex-col" + " " + className}>
      <label className="mb-[12px]">{label}</label>
      <TextareaAutosize
        {...register(registerName)}
        rows={rows}
        onHeightChange={(newHeight, instance) => {
          setHeight(newHeight);
          setRows(newHeight >= height ? rows + 1 : rows - 1);
        }}
        placeholder={placeholder ?? ""}
        className={
          "w-full flex-1 border-b-2 px-2 py-3 text-[16px] font-medium text-[#4e4d4d] outline-none bg-white " +
          (errorMessage ? "border-[#FF0000]" : "focus:border-[#000000]") +
          " " + className
        }
      />
      <div className="mt-1 h-5">
        <span className={"text-sm text-red-600 " + (errorMessage ? "" : "invisible")}>
          {errorMessage ?? "placeholder"}
        </span>
      </div>
    </div>
  );
};
