import { z } from 'zod'

export const CreateUserValidator = z.object({
    firstName: z
        .string({
            required_error: 'Un prénom est requis !',
            invalid_type_error: 'Erreur de typage du champs *Prénom*'
        })
        .trim(),
    lastName: z
        .string({
            required_error: 'Un nom de famille est requis !',
            invalid_type_error: 'Erreur de typage du champs *Nom de famille*'
        })
        .trim(),
    email: z
        .string({
            required_error: 'Une adresse email est requise !',
            invalid_type_error: 'Erreur de typage du champs *Email*'
        })
        .email({ message: "L'adresse email fournie est invalide" })
        .trim(),
    password: z
        .string({
            required_error: 'Un mot de passe est requis !',
            invalid_type_error: 'Erreur de typage du champs *Mot de passe*'
        })
        .min(8, {
            message: 'Votre mot de passe doit faire minimum 8 caractères'
        })
        .max(255, {
            message: 'Votre mot de passe ne doit pas dépasser 255 caractères'
        })
})

export type CreateUserType = z.infer<typeof CreateUserValidator>
