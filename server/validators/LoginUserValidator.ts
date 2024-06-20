import { z } from 'zod'

export const LoginUserValidator = z.object({
    email: z
        .string({
            required_error:
                'Une adresse email est requise pour vous connecter !',
            invalid_type_error: 'Erreur de typage du champs *Email*',
        })
        .email({ message: "L'adresse email fournie est invalide" })
        .trim(),
    password: z
        .string({
            required_error: 'Un mot de passe est requis pour vous inscrire !',
            invalid_type_error: 'Erreur de typage du champs *Mot de passe*',
        })
        .min(8, {
            message: 'Votre mot de passe doit faire minimum 8 caractères',
        }),
    rememberMe: z.boolean(),
})

export type LoginUserValidatorType = z.infer<typeof LoginUserValidator>
