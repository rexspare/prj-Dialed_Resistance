import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const NumericVarModel = types
  .model("NumericVar")
  .props({
    title: types.string,
    type: types.literal('numeric'),
    value: types.optional(types.string, '55.9'),
    hidden: types.boolean
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type NumericVarType = Instance<typeof NumericVarModel>
export interface NumericVar extends NumericVarType {}
type NumericVarSnapshotType = SnapshotOut<typeof NumericVarModel>
export interface NumericVarSnapshot extends NumericVarSnapshotType {}
