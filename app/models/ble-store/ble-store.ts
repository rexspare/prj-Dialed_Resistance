import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { NativeModules } from "react-native"
const { PuckJS, Wahoo } = NativeModules
// type devices = 'all' | 'puck' | 'wahoo' | false
/**
 * Model description here for TypeScript hints.
 */
const NumericVarModel = types.model('Numeric', {
  title: types.string
})
export const BleStoreModel = types
  .model("BleStore")
  .props({
    HriRpmTrigger: NumericVarModel.create({
      title: 'me'
    })
  })
// eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type BleStoreType = Instance<typeof BleStoreModel>
export interface BleStore extends BleStoreType {}
type BleStoreSnapshotType = SnapshotOut<typeof BleStoreModel>
export interface BleStoreSnapshot extends BleStoreSnapshotType {}
