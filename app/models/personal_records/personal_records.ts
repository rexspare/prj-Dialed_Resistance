import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const PersonalRecordsModel = types
  .model("PersonalRecords")
  .props({
    duration: types.number,
    timeInRide: types.number,
    total_output: types.number,
    date: types.Date,
    RLR: types.number,
    isPR: types.boolean,
    profileId: types.string,
    onlineStored: types.boolean,
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type PersonalRecordsType = Instance<typeof PersonalRecordsModel>
export interface PersonalRecords extends PersonalRecordsType {}
type PersonalRecordsSnapshotType = SnapshotOut<typeof PersonalRecordsModel>
export interface PersonalRecordsSnapshot extends PersonalRecordsSnapshotType {}
