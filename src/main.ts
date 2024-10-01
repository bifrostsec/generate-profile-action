import * as core from '@actions/core'
import { HttpClient } from '@actions/http-client'
import { BearerCredentialHandler } from '@actions/http-client/lib/auth'

const apiURL = (serviceName: string, serviceVersion: string): string =>
  `https://portal.bifrostsec.com/api/v2/service/${serviceName}/version/${serviceVersion}/profile`

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const apiToken = core.getInput('api-token', { required: true })
    const serviceName = core.getInput('service-name', { required: true })
    const serviceVersion = core.getInput('service-version', { required: true })

    core.debug(`
Service name: ${serviceName}
Service version: ${serviceVersion}
`)

    const bearerCredentialHandler = new BearerCredentialHandler(apiToken)
    const client = new HttpClient('@bifrost/action', [bearerCredentialHandler])

    const profileName = await getProfileName(
      client,
      serviceName,
      serviceVersion
    )
    core.setOutput('profile-name', profileName)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

async function getProfileName(
  client: HttpClient,
  serviceName: string,
  serviceVersion: string
): Promise<string> {
  const response = await client.post(apiURL(serviceName, serviceVersion), '')
  if (response.message.statusCode !== 200) {
    throw new Error(`Failed to get profile name: ${await response.readBody()}`)
  }
  return await response.readBody()
}
