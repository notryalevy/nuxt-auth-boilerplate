import { z } from 'zod'

export const CreateUserValidator = z
    .object({
        email: z
            .string({
                required_error: 'Une adresse email est requise ! ',
                invalid_type_error: 'Erreur de typage du champs *Email*',
            })
            .email({ message: "L'adresse email fournie est invalide" })
            .trim(),
        password: z
            .string({
                required_error:
                    'Un mot de passe est requis pour vous inscrire !',
                invalid_type_error: 'Erreur de typage du champs *Mot de passe*',
            })
            .min(8, {
                message: 'Votre mot de passe doit faire minimum 8 caractères',
            }),
        confirmPassword: z
            .string({
                required_error:
                    'La confirmation de votre mot de passe est requise pour vous inscrire !',
                invalid_type_error:
                    'Erreur de typage du champs *Confirmation du mot de passe*',
            })
            .min(8, {
                message: 'Votre mot de passe doit faire minimum 8 caractères',
            }),
        firstName: z
            .string({
                required_error: 'Un prénom est requis pour vous inscrire !',
                invalid_type_error: 'Erreur de typage du champs *Prénom*',
            })
            .min(1, {
                message: 'Votre prénom doit contenir au moins une lettre',
            })
            .max(50, {
                message: 'Votre prénom ne doit pas dépasser 50 caractères',
            }),
        lastName: z
            .string({
                required_error:
                    'Un nom de famille est requis pour vous inscrire !',
                invalid_type_error:
                    'Erreur de typage du champs *Nom de famille*',
            })
            .min(1, {
                message:
                    'Votre nom de famille doit contenir au minimum une lettre',
            })
            .max(50, {
                message:
                    'Votre nom de famille ne doit pas dépasser 50 caractères',
            }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message:
            'Votre mot de passe doit être le même que la confirmation du mot de passe !',
        path: ['confirmPassword'],
    })

export type CreateUserValidatorType = z.infer<typeof CreateUserValidator>
