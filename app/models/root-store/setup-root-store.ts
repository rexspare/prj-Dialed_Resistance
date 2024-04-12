import { onSnapshot } from "mobx-state-tree"
import { RootStoreModel, RootStore } from "./root-store"
import { Environment } from "../environment"
import * as storage from "../../utils/storage"

/**
 * The key we'll be saving our state as within async storage.
 */
const ROOT_STATE_STORAGE_KEY = "faadsfa"

/**
 * Setup the environment that all the models will be sharing.
 *
 * The environment includes other functions that will be picked from some
 * of the models that get created later. This is how we loosly couple things
 * like events between models.
 */
export async function createEnvironment() {
  const env = new Environment()
  await env.setup()
  return env
}

/**
 * Setup the root state.
 */
export async function setupRootStore() {
  let rootStore: RootStore
  let data: any

  // prepare the environment that will be associated with the RootStore.
  const env = await createEnvironment()
  try {
    // await storage.clear()
    // load data from storage
    data = (await storage.load(ROOT_STATE_STORAGE_KEY)) || {
      variables: [
        {
          title: "Connection timeout (s)",
          type: "numeric",
          hidden: true,
          value: "10",
        },
        {
          title: "Cadence poll time (ms)",
          type: "numeric",
          hidden: true,
          value: "100",
        },
        {
          title: "Screen 3 Time range (s)",
          type: "numeric",
          hidden: true,
          value: "5",
        },
        {
          title: "Screen 3 RPM range",
          type: "numeric",
          hidden: true,
          value: "3",
        },
        {
          title: "Target Cadence",
          type: "numeric",
          hidden: false,
          value: "75",
        },
        {
          title: "Target Time range (s)",
          type: "numeric",
          hidden: false,
          value: "5",
        },
        {
          title: "Target RPM Range",
          type: "numeric",
          hidden: false,
          value: "3",
        },
        {
          title: "Override RLR",
          type: "dropdown",
          hidden: true,
          values: ["Yes", "No"],
          value: "No",
        },
        {
          title: "RLR",
          type: "numeric",
          hidden: true,
          value: "100",
        },
        {
          title: "RLs",
          type: "numeric",
          hidden: true,
          value: "47.6",
        },
        {
          title: "Screen 3 Auto Advance (s)",
          type: "numeric",
          hidden: false,
          value: "60",
        },
        {
          title: "Strength Rating",
          type: "numeric",
          hidden: false,
          value: "45",
        },
        {
          title: "Show logs",
          type: "dropdown",
          hidden: false,
          values: ["Yes", "No"],
          value: "No",
        },
        {
          title: "Always Continue to Calibration",
          type: "dropdown",
          hidden: true,
          values: ["Yes", "No"],
          value: "No",
        },
        {
          title: "60 second ride",
          type: "dropdown",
          hidden: false,
          values: ["Yes", "No"],
          value: "No",
        },
        {
          title: "Metric update rate (ms)",
          type: "numeric",
          hidden: false,
          value: "100",
        },
      ],
      applicationValues: {},
      personalRecords: [],
      postWorkoutFeedback: {
        isRight: false,
        remainingRides: 0
      },
      profiles: [],
      RLRChangeModel:[],
      selectedProfile: null
    }
    console.log(data)
    // data.applicationValues = {}
    rootStore = RootStoreModel.create(data, env)
  } catch (e) {
    // if there's any problems loading, then let's at least fallback to an empty state
    // instead of crashing.
    rootStore = RootStoreModel.create({}, env)

    // but please inform us what happened
    __DEV__ && console.tron.error(e.message, null)
  }

  // reactotron logging
  if (__DEV__) {
    env.reactotron.setRootStore(rootStore, data)
  }

  // track changes & save to storage
  onSnapshot(rootStore, (snapshot) => storage.save(ROOT_STATE_STORAGE_KEY, snapshot))

  return rootStore
}
