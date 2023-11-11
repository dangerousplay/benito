import { PrismaClient, Prisma, Urgency } from '@prisma/client'

import * as CepCoords from "coordenadas-do-cep";

const prisma = new PrismaClient();


const upsertEntityTag = (name: string) => {

  return {
    create: {
      tag: {
        connectOrCreate: {
          where: {
            name: name
          },
          create: {
            name: name
          }
        }
      }
    }
  }
}


const entities: Prisma.EntityCreateInput[] = [
  {
    id: 1,
    name: "Projeto refeição solidária",
    description:
        "Somos um grupo de pessoas que nos unimos para levar alimentos (marmitas) a pessoas em situação de rua.\n" +
        "Hoje, além de montarmos nossos kits alimentação, distribuímos kits pets, kits de higiene, kits de frio, cestas básicas, cobertores, etc",
    iconUrl: '/public/entities/refeicao_solidaria_logo.png',
    place: {
      create: {
        workingDays: {},
        opens_at: 830,
        closes_at: 1800,
        address: {
          create: {
            latitude: 0,
            longitude: 0,
            street: "",
            zipcode: "92310-300",
            country: "",
            region: "",
            city: "",
            number: "612"
          }
        }
      }
    },
    tags: upsertEntityTag("Refeições")
  },
  {
    id: 2,
    name: "Ação Combate à Fome",
    description:
        "Somos amigos e parentes que mensalmente se unem de forma a ajudar o próximo, fazemos isso desde 1993.\n" +
        "Auxiliar a quem necessita doação de cestas básicas à famílias em situação de risco que moram em habitações coletivas, mães solteiras e idosos desamparados.",
    iconUrl: 'combateFomeIconUrl',
    place: {
      create: {
        workingDays: {},
        opens_at: 830,
        closes_at: 1800,
        address: {
          create: {
            latitude: 0,
            longitude: 0,
            street: "",
            zipcode: "92330-500",
            country: "",
            region: "",
            city: "",
            number: "89"
          }
        }
      }
    },
    tags: upsertEntityTag("Refeição")
  },
  {
    id: 3,
    name: "Associação dos Remanecestes Quilombolas Urbano do Bairro da Liberdade",
    description:
        "Temos por finalidade melhorar a qualidade de vida de nossos associados em geral, defendendo-os, organizando-os e desenvolvendo trabalho social, cultural e educacional.\n" +
        "junto aos adultos, idosos, jovens e crianças portadores ou não-portadores de deficiência, incluindo remanescentes de quilombos do Bairro da Liberdade.",
    iconUrl: 'quilombolasIconUrl',
    place: {
      create: {
        workingDays: {},
        opens_at: 830,
        closes_at: 1800,
        address: {
          create: {
            latitude: 0,
            longitude: 0,
            street: "",
            zipcode: "92120-002",
            country: "",
            region: "",
            city: "",
            number: "100"
          }
        }
      }
    },
    tags: upsertEntityTag("Moradia")
  },
  {
    id: 4,
    name: "Santuário Rancho dos Gnomos",
    description:
        "Somos uma Organização Não-Governamental sem fins lucrativos e estamos movidos por uma filosofia de convivência harmoniosa entre os seres que habitam o planeta\n" +
        "Pregamos a ajuda mútua, onde não há melhor ou pior, mais ou menos importante, mas uma troca integrada de informação e de forças.",
    iconUrl: 'ranchoIconUrl',
    place: {
      create: {
        workingDays: {},
        opens_at: 830,
        closes_at: 1800,
        address: {
          create: {
            latitude: 0,
            longitude: 0,
            street: "",
            zipcode: "92020-475",
            country: "",
            region: "",
            city: "",
            number: "361"
          }
        }
      }
    },
    tags: upsertEntityTag("Animal")
  }
]


const itemMeasurement: Prisma.ItemMeasurementCreateInput[] = [
  {
    id: 1,
    name: "Quilogramas",
    unit: "Kg"
  },
  {
    id: 2,
    name: "Unidades",
    unit: ""
  },
  {
    id: 3,
    name: "Metros",
    unit: "M"
  },
  {
    id: 4,
    name: "Metros quadrados",
    unit: "M²"
  },
  {
    id: 5,
    name: "Metros cúbicos",
    unit: "M³"
  },
]

const itemCategories: Prisma.ItemCategoryCreateInput[] = [
  {
    id: 1,
    name: "Alimentos não perecíveis",
    description: "Alimentos não perecíveis como Arroz, feijão, massa.",
    measurement: {
      connect: {
        id: undefined,
        name: "Quilogramas"
      }
    }
  },
  {
    id: 2,
    name: "Roupas",
    description: "Roupas de adultos e crianças.",
    measurement: {
      connect: {
        id: undefined,
        name: "Unidades",
      }
    }
  },
  {
    id: 3,
    name: "Material de construção",
    description: "Material de construção.",
    measurement: {
      connect: {
        id: undefined,
        name: "Unidades",
      }
    }
  },
]



const needs: Prisma.ItemNeedCreateInput[] = [
  {
    id: 1,
    name: "Alimentos para almoço solidário",
    description: "Estamos preparando um almoço solidário e precisamos de alimentos não perecíveis.",
    category: {
      connect: {
        id: undefined,
        name: "Alimentos não perecíveis"
      }
    },
    entity: {
      connect: {
        id: undefined,
        name: "Projeto refeição solidária"
      }
    },
    urgency: Urgency.LOW,
    completed: false,
    active: true,
  }
]


async function createItemMeasurements() {
  for (let i of itemMeasurement) {
    const measurement = await prisma.itemMeasurement.create({
      data: i
    })
  }
}


async function createItemCategories() {
  for (let i of itemCategories) {
    const category = await prisma.itemCategory.create({
      data: i
    })
  }
}

async function createNeeds() {
  for (let n of needs) {
    const need = await prisma.itemNeed.create({
      data: n
    })
  }
}


async function createEntities() {
  for (const e of entities) {
    const {zipcode, number} = e.place.create.address.create;

    const cepInfo = await CepCoords.getByCep(zipcode);

    e.place.create.address.create = {
      latitude: cepInfo.lat,
      longitude: cepInfo.lon,
      street: cepInfo.logradouro,
      zipcode: zipcode,
      country: "Brazil",
      region: cepInfo.uf,
      city: cepInfo.localidade,
      number: number
    }

    const entity = await prisma.entity.create({
      data: e,
    })

    console.log(`Created entity with id: ${entity.id}`)
  }
}

async function main() {
  console.log(`Start seeding ...`)

  await createItemMeasurements();
  await createItemCategories();
  await createNeeds();

  await createEntities();

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
