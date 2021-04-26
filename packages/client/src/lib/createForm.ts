import { writable, get } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { ObjectSchema, TypeOf, ValidationError } from 'yup'
import type { ObjectShape } from 'yup/lib/object'

export function createForm<
  Shape extends ObjectShape,
  Schema extends ObjectSchema<Shape>,
  State = TypeOf<Schema>
>(config: {
  initialValues?: Partial<State>
  schema: Schema
}): {
  state: Writable<Partial<State>>
  errors: Writable<{ [key in keyof State]?: string }>
  handleSubmit(submit: (state: State) => void): (event: Event) => void
} {
  const { initialValues, schema } = config
  const state = writable<Partial<State>>(initialValues ?? {})
  const errors = writable<{ [key in keyof State]?: string }>({})

  function handleSubmit(submit: (state: State) => void) {
    return async function (event: Event) {
      event?.preventDefault()

      const $state = get(state) as State

      const error = await getError(schema, $state)

      if (!error) {
        submit($state)
        errors.set({})
      } else {
        errors.set(error)
      }
    }
  }

  return { state, handleSubmit, errors }
}

async function getError<T>(
  schema: ObjectSchema<ObjectShape>,
  data: T
): Promise<null | { [key in keyof T]?: string }> {
  return schema
    .validate(data, { abortEarly: false })
    .then(() => null)
    .catch((validationError: ValidationError) => {
      const errorList = validationError.inner.filter(error => error.path)
      const errors = {}
      for (const error of errorList) {
        Object.assign(errors, { [error.path!]: error.message })
      }
      return errors
    })
}
