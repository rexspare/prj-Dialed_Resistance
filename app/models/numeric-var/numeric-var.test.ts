import { NumericVarModel } from "./numeric-var"

test("can be created", () => {
  const instance = NumericVarModel.create({})

  expect(instance).toBeTruthy()
})
