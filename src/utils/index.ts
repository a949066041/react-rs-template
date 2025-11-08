export * from './app.config'

export function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}
