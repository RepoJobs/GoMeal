import prisma from '../../src/infra/db/prisma/client'

export const createCountry = async (name: string) => {
  const country = await prisma.client.country.create({
    data: {
      name,
    },
  })

  return country
}

export const createState = async (name: string, countryId: number) => {
  const state = await prisma.client.state.create({
    data: {
      name,
      countryId,
    },
  })

  return state
}

export const createCity = async (name: string, stateId: number) => {
  const city = await prisma.client.city.create({
    data: {
      name,
      stateId,
    },
  })

  return city
}

export const generateLocalization = async (country: string, state: string, city: string) => {
  const countryInstance = await createCountry(country)
  const stateInstance = await createState(state, countryInstance.id)
  const cityInstance = await createCity(city, stateInstance.id)

  return {
    country: countryInstance,
    state: stateInstance,
    city: cityInstance,
  }
}