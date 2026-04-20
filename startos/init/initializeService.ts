import { sdk } from '../sdk'
import { storeJson } from '../fileModels/store.json'

export const initializeService = sdk.setupOnInit(async (effects, kind) => {
  if (kind !== 'install') return
  // Initialize the store so subsequent onInit handlers can read it safely
  await storeJson.merge(effects, {})
})
