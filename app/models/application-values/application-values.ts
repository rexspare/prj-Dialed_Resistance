import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { Alert } from "react-native"
import SDK, { SDKStoreInstance } from "../../utils/bluetoothSdk"
import { RootStoreModel } from "../root-store/root-store"

const SDKStore = SDKStoreInstance
/**
 * Model description here for TypeScript hints.
 */
export const ApplicationValuesModel = types
  .model("ApplicationValues")
  .props({
    RPM: types.optional(types.number, 0),
    userEffortLevel: types.optional(types.number, 0),
    resistanceLevelRatio: types.optional(types.number, 0),
    log: types.optional(types.maybeNull(types.array(types.string)), []),
    finalTRP: types.optional(types.number, 0)
  })
  .views(self => ({
    get resistanceLevel() {
      const TRP = Number(SDKStore.rotation)
      return TRP / Number(self.resistanceLevelRatio)
    }
  }))
  .actions(self => ({
    logValue(value) {
      if (self.log !== null) {
        self.log.push(value)
      } else {
        self.log = [value]
      }
    },
    resetLogs: () => { self.log = null }
  }))
  .actions(self => ({
    updateRPM(RPM) {
      self.logValue(`updating rpm: ${RPM}`)
      self.RPM = Number(RPM)
    },

  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type ApplicationValuesType = Instance<typeof ApplicationValuesModel>
export interface ApplicationValues extends ApplicationValuesType {}
type ApplicationValuesSnapshotType = SnapshotOut<typeof ApplicationValuesModel>
export interface ApplicationValuesSnapshot extends ApplicationValuesSnapshotType {}
