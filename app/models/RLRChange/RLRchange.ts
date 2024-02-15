import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const RLRChangeModel = types
  .model("RLRChange")
  .props({
    Date: types.maybeNull(types.string),
    Identifier: types.maybeNull(types.string),
    Age: types.maybeNull(types.string),
    Sex: types.maybeNull(types.string),
    Weight: types.maybeNull(types.string),
    Resting_Heart_Rate: types.maybeNull(types.string),
    Stationary_Bike: types.maybeNull(types.string),
    Ride_Preference: types.maybeNull(types.string),
    Ride_Length: types.maybeNull(types.number),
    RLR: types.maybeNull(types.number),
    Post_Workout_Rating: types.maybeNull(types.number),
    Ride_Total_Output: types.maybeNull(types.number),
    Personal_Record: types.maybeNull(types.string),
    Record_Type: types.maybeNull(types.string),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type RLRChangeType = Instance<typeof RLRChangeModel>
export interface RLRChange extends RLRChangeType {}
type RLRChangeSnapshotType = SnapshotOut<typeof RLRChangeModel>
export interface RLRChangeSnapshot extends RLRChangeSnapshotType {}
