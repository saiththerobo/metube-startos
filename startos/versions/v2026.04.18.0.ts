import { VersionInfo } from '@start9labs/start-sdk'

export const v_2026_04_18_0 = VersionInfo.of({
  version: '2026.4.18:0',
  releaseNotes: {
    en_US: 'Initial release for StartOS',
    es_ES: 'Lanzamiento inicial para StartOS',
    de_DE: 'Erstveröffentlichung für StartOS',
    pl_PL: 'Pierwsze wydanie dla StartOS',
    fr_FR: 'Version initiale pour StartOS',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
