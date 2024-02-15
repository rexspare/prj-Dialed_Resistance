import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { number } from "mobx-state-tree/dist/internal"
import { Alert } from "react-native"
import { DevOption } from "../../screens/development-tools/presentation"
import { SDKStoreInstance } from "../../utils/bluetoothSdk"
import { ApplicationValuesModel } from "../application-values/application-values"
import { BleStoreModel } from "../ble-store/ble-store"
import { DropdownVarModel } from "../dropdown-var/dropdown-var"
import { NumericVarModel } from "../numeric-var/numeric-var"
import { PersonalRecordsModel } from "../personal_records/personal_records"
import { PostWorkoutFeedbackModel } from "../post_workout_feedback/post_workout_feedback"
import { ProfileModel } from "../profiles/profiles"
import { SelectedProfileModel } from "../selected_profile/selected_profile"
import { RLRChangeModel } from "../RLRChange/RLRchange"
const SDKStore = SDKStoreInstance
const mode = (a) => {
  a.sort((x, y) => x - y)

  let bestStreak = 1
  let bestElem = a[0]
  let currentStreak = 1
  let currentElem = a[0]

  for (let i = 1; i < a.length; i++) {
    if (a[i - 1] !== a[i]) {
      if (currentStreak > bestStreak) {
        bestStreak = currentStreak
        bestElem = currentElem
      }

      currentStreak = 0
      currentElem = a[i]
    }

    currentStreak++
  }

  return currentStreak > bestStreak ? currentElem : bestElem
}
/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  variables: types.array(types.union(NumericVarModel, DropdownVarModel)),
  applicationValues: types.maybeNull(ApplicationValuesModel),
  personalRecords: types.array(PersonalRecordsModel),
  postWorkoutFeedback: types.maybeNull(PostWorkoutFeedbackModel),
  profiles: types.array(ProfileModel),
  selectedProfile: types.maybeNull(SelectedProfileModel),
  RLRChangeModel: types.array(RLRChangeModel)
}).actions(self => ({
  updateOption(optionName: string, newValue: string): void {
    console.log('running:', optionName, newValue)
    self.variables[self.variables.findIndex(item => item.title === optionName)].value = newValue
  },
})).actions(self => ({
  insertPersonalRecord(optionName: string, newValue: unknown): void {
    console.log('running:', optionName, newValue)
    const prevData = self.personalRecords
    self.personalRecords = [newValue, ...prevData]
  },
})).actions(self => ({
  updatePersonalRecord(optionName: string, newValue: unknown): void {
    console.log('running:', optionName, newValue)
    self.personalRecords[self.personalRecords.findIndex(item => item.onlineStored === false)] = { ...newValue, onlineStored: true }
  },
})).actions(self => ({
  insertProfile(optionName: string, newValue: unknown): void {
    console.log('running:', optionName, newValue)
    const prevData = self.profiles
    self.profiles = [newValue, ...prevData]
  },
})).actions(self => ({
  getProfile(optionName: string, newValue: unknown): any {
    console.log('running:', optionName, newValue)
    return self.profiles?.filter(prof=>prof.anonymous_id === newValue)?.[0]
  },
})).actions(self => ({
  updateProfile(optionName: string, newValue: unknown): void {
    console.log('running:', optionName, newValue)
    self.profiles[self.profiles.findIndex(item => item.anonymous_id === newValue.anonymous_id)] = newValue
    if (self.selectedProfile.anonymous_id === newValue.anonymous_id) {
      self.selectedProfile = newValue
    }
  },
})).actions(self => ({
  setSelectedProfile(optionName: string, newValue: unknown): void {
    console.log('running:', optionName, newValue)
    self.selectedProfile = { ...newValue }
  },
})).actions(self => ({
  updatePostWorkoutFeedback(optionName: string, newValue: unknown): void {
    console.log('running:', optionName, newValue)
    self.postWorkoutFeedback = newValue
  },
})).actions(self => ({
  updateRLRChnage(optionName: string, newValue: unknown): void {
    console.log('running:', optionName, newValue)
    self.RLRChangeModel = newValue
  },
})).views(self => ({
  getVar: (title: string) => {
    console.log("Self",self?.variables)
    return self?.variables?.filter(item => item?.title === title)[0]?.value
  }
})).views(self => ({
  getRLRChnage(optionName: string, newValue: unknown): unknown {
    console.log('running:', optionName, newValue)
    return self.RLRChangeModel
  },
}))
  .actions(self => ({
    resetAppvalues() {
      // self.applicationValues.HRa = 0
      // self.applicationValues.HRi = 0
      if (self.applicationValues) {
        self.applicationValues.RPM = 0
        self.applicationValues.userEffortLevel = 0
        self.applicationValues.resistanceLevelRatio = 0
        self.applicationValues.log = null
      }
    },
    updateUEL: UEL => {
      if (self.applicationValues) {
        self.applicationValues?.logValue(`updating UEL: ${UEL}`)
        self.applicationValues.userEffortLevel = UEL
        const TRP = Number(SDKStore.rotation)
        self.applicationValues?.logValue(`updating final TRP: ${TRP}`)
        self.applicationValues.finalTRP = TRP
        console.log(self.variables)
        if (self.getVar('Override RLR') === 'Yes') {
          self.applicationValues.resistanceLevelRatio = Number(self.getVar('RLR'))
          self.applicationValues?.logValue(`overriding RLR: ${UEL} => ${Number(self.getVar('RLR'))}`)
        } else {
          self.applicationValues?.logValue(`updating RLR: ${UEL}`)
          self.applicationValues.resistanceLevelRatio = UEL
        }
      }
    },
  }))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
