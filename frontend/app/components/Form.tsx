"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdArrowOutward } from "react-icons/md";
import z from "zod";
import { buildZodSchema } from "../lib/validations";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

interface FormProps {
  form: any;
}

export default function AddForm(props: FormProps) {
  const form = props.form;
  const methods = useForm();

  const formSchema = buildZodSchema(form.form.fields || []);
  const formData = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const { data: validationData, error: validationError } =
      await formSchema.safeParseAsync(data);
    if (!validationData) {
      return;
    }
    // const emailHtml = await render(<EmailTemplate {...validationData} />)
    // await submitForm(data, emailHtml, 'A form submission has been submitted.')
    console.log(data);
  }

  return (
    <div className="section">
      <Form {...formData}>
        {JSON.stringify(formSchema)}
        <form
          className="space-y-6 lg:max-w-4/6"
          onSubmit={formData.handleSubmit(onSubmit)}
        >
          {form.form.fields.map((input: any, key: any) => (
            <FormField
              key={key}
              name={input.label.toLowerCase().replace(/\s/g, "")}
              control={formData.control}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="uppercase">
                    {input.label}
                    {!input.required && (
                      <span className="ml-1 text-sm text-gray-300 lowercase">
                        optional
                      </span>
                    )}
                  </FormLabel>
                  <FormControl>
                    {input._type == "textareaField" ? (
                      <Textarea {...field} rows={4} value={input.value} />
                    ) : input._type == "radioField" ? (
                      <RadioGroup
                        onValueChange={field.onChange}
                        className="flex flex-col"
                      >
                        {input.options?.map((val: any, key: any) => (
                          <FormItem
                            className="flex items-center gap-3"
                            key={key}
                          >
                            <FormControl>
                              <RadioGroupItem value={val} />
                            </FormControl>
                            <FormLabel className="">{val}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    ) : input._type == "selectField" ? (
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Please select" />
                        </SelectTrigger>
                        <SelectContent>
                          {input.options?.map((val: any, key: any) => (
                            <SelectItem value={val} key={key}>
                              {val}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : input._type == "checkboxField" ? (
                      <div>
                        {input.options?.map((val: any, key: any) => (
                          <FormItem
                            className="flex items-center gap-3"
                            key={key}
                          >
                            <FormControl>
                              <Checkbox value={val} />
                            </FormControl>
                            <FormLabel className="text-base">{val}</FormLabel>
                          </FormItem>
                        ))}
                      </div>
                    ) : (
                      <Input {...field} type="text" value={input.value} />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button
            type="submit"
            className="btn flex items-center gap-1"
            disabled={formData.formState.isSubmitting}
          >
            Submit
            <MdArrowOutward size={"1rem"} className="" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
