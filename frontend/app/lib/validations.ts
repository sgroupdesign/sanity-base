import { z } from "zod";

// function buildFieldSchema(field: SanityField) {
// 	let validator

// 	switch (field._type) {
// 		case 'textField':
// 			validator = z.string()
// 			break

// 		case 'emailField':
// 			validator = z.email({
// 				message: `${field.label} is required`,
// 			})
// 			break

// 		case 'telField':
// 			validator = z.number()
// 			break

// 		case 'numberField':
// 			validator = z.number()
// 			break

// 		case 'selectField':
// 			validator = z.enum([])
// 			break

// 		case 'radioField':
// 			validator = z.enum([])
// 			break

// 		case 'checkboxField':
// 			validator = z.enum([])
// 			break

// 		default:
// 			validator = z.string()
// 			break
// 	}

// 	// Mark optional if not required
// 	if (!field.required) {
// 		validator = validator.optional()
// 	}

// 	return {
// 		key: toCamelCase(field.label),
// 		validator: validator,
// 	}
// }

// export function buildZodSchema(fields: SanityField[]) {
// 	const shape: Record<
// 		string,
// 		| z.ZodString
// 		| z.ZodEmail
// 		| z.ZodNumber
// 		| z.ZodEnum
// 		| z.ZodOptional<z.ZodString>
// 		| z.ZodOptional<z.ZodEmail>
// 		| z.ZodOptional<z.ZodNumber>
// 		| z.ZodOptional<z.ZodEnum>
// 	> = {}

// 	fields.forEach((field) => {
// 		const { key, validator } = buildFieldSchema(field)
// 		shape[key] = validator
// 	})

// 	return z.object(shape)
// }

export type SanityField = {
  label: string;
  _type: string;
  required?: boolean;
};

export function buildZodSchema(fields: SanityField[]) {
  const shape: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    let schema: z.ZodTypeAny;

    switch (field._type) {
      case "emailField":
        schema = z.email();
        break;
      case "selectField":
        schema = z.enum([]);
        break;
      case "radioField":
        schema = z.enum([]);
        break;
      case "checkboxField":
        schema = z.enum([]);
        break;

      default:
        schema = z.string();
    }

    if (field.required) {
      schema = schema.refine((val) => val, {
        message: `${field.label} is required`,
      });
    } else {
      schema = schema.optional();
    }

    shape[field.label.toLowerCase().replace(/\s/g, "")] = schema;
  });

  return z.object(shape);
}
