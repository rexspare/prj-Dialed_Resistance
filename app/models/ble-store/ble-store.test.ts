import { BleStoreModel } from "./ble-store"

test("can be created", () => {
  const instance = BleStoreModel.create({})

  expect(instance).toBeTruthy()
})
