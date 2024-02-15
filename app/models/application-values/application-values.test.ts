import { ApplicationValuesModel } from "./application-values"

test("can be created", () => {
  const instance = ApplicationValuesModel.create({})

  expect(instance).toBeTruthy()
})
