import { DropdownVarModel } from "./dropdown-var"

test("can be created", () => {
  const instance = DropdownVarModel.create({})

  expect(instance).toBeTruthy()
})
