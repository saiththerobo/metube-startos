import { sdk } from '../sdk'
import { downloadDestination } from './downloadDestination'

export const actions = sdk.Actions.of().addAction(downloadDestination)
