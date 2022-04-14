export interface MessageTransit {
  machineName?: string
  processName?: string
  processId?: number
  assembly?: string
  assemblyVersion?: string
  frameworkVersion?: string
  massTransitVersion?: string
  operatingSystemVersion?: string
}

export const defaultHost: MessageTransit = {
  processId: process.pid,
  processName: process.title,
  frameworkVersion: process.version,
  operatingSystemVersion: process.platform,
  assembly: require.main?.filename,
}

export function host(): MessageTransit {
  return defaultHost
}
