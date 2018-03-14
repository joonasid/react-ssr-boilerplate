export const storeDeviceType = (deviceType) => {
  if (typeof document !== 'undefined' && document.cookie) {
    document.cookie = `deviceType=${deviceType}`
  }
}
