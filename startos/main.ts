import { manifest as filebrowserManifest } from 'filebrowser-startos/startos/manifest'
import { storeJson } from './fileModels/store.json'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting MeTube'))

  const downloadDestination = await storeJson.read((s) => s.downloadDestination).const(effects)

  if (!downloadDestination) {
    throw new Error(
      'Download destination not configured. Use the "Select Download Destination" action to set it up before starting MeTube.',
    )
  }

  const downloadDir =
    downloadDestination === 'filebrowser'
      ? '/mnt/filebrowser/metube-downloads'
      : '/downloads'

  let appMounts = sdk.Mounts.of()
    .mountVolume({ volumeId: 'main', subpath: null, mountpoint: '/config', readonly: false })
    .mountVolume({ volumeId: 'downloads', subpath: null, mountpoint: '/downloads', readonly: false })

  if (downloadDestination === 'filebrowser') {
    appMounts = appMounts.mountDependency<typeof filebrowserManifest>({
      dependencyId: 'filebrowser',
      volumeId: 'data',
      subpath: null,
      mountpoint: '/mnt/filebrowser',
      readonly: false,
    })
  }

  const appSub = await sdk.SubContainer.of(
    effects,
    { imageId: 'metube' },
    appMounts,
    'metube-main',
  )

  return sdk.Daemons.of(effects)
    .addOneshot('mkdir-download', {
      subcontainer: appSub,
      exec: {
        command: ['sh', '-c', `mkdir -p '${downloadDir}' && chmod 777 '${downloadDir}'`],
        user: 'root',
      },
      requires: [],
    })
    .addDaemon('primary', {
      subcontainer: appSub,
      exec: {
        command: sdk.useEntrypoint(),
        env: {
          DOWNLOAD_DIR: downloadDir,
          TEMP_DIR: downloadDir,
        },
      },
      ready: {
        display: i18n('Web Interface'),
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: i18n('The web interface is ready'),
            errorMessage: i18n('The web interface is not ready'),
          }),
        gracePeriod: 30_000,
      },
      requires: ['mkdir-download'],
    })
})
