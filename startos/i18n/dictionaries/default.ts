export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting MeTube': 0,
  'Web Interface': 1,
  'The web interface is ready': 2,
  'The web interface is not ready': 3,

  // interfaces.ts
  'Web UI': 4,
  'The web interface of MeTube': 5,

  // actions/downloadDestination.ts
  'Download Destination': 6,
  'File Browser': 7,
  'Local Storage': 8,
  'Select Download Destination': 9,
  'Service MeTube uses to save downloads': 10,

  // init/taskSelectDownloadDestination.ts
  'Select where MeTube saves downloads': 11,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
