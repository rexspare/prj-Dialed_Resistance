import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const SelectedProfileModel = types
  .model("SelectedProfile")
  .props({
    name: types.string,
    age: types.maybeNull(types.number),
    gender: types.string,
    weight: types.maybeNull(types.number),
    restingHeartRate: types.maybeNull(types.number),
    ridePreference: types.string,
    ridePreferenceValue: types.number,
    bike: types.string,
    RLR: types.number,
    id: types.number,
    anonymous_id: types.string,
    allow_logs: types.boolean
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type SelectedProfileType = Instance<typeof SelectedProfileModel>
export interface SelectedProfile extends SelectedProfileType {}
type SelectedProfileSnapshotType = SnapshotOut<typeof SelectedProfileModel>
export interface SelectedProfileSnapshot extends SelectedProfileSnapshotType {}
