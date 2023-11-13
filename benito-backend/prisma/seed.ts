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
    id: "1",
    name: "Projeto refeição solidária",
    description:
        "Somos um grupo de pessoas que nos unimos para levar alimentos (marmitas) a pessoas em situação de rua.\n" +
        "Hoje, além de montarmos nossos kits alimentação, distribuímos kits pets, kits de higiene, kits de frio, cestas básicas, cobertores, etc",
    iconUrl: '/public/entities/refeicao_solidaria_logo.png',
    places: {
      create: [{
        place: {
          create: {
            workingDays: {},
            opensAt: 830,
            closesAt: 1800,
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
        }
      }]
    },
    tags: upsertEntityTag("Refeições")
  },
  {
    id: "2",
    name: "Ação Combate à Fome",
    description:
        "Somos amigos e parentes que mensalmente se unem de forma a ajudar o próximo, fazemos isso desde 1993.\n" +
        "Auxiliar a quem necessita doação de cestas básicas à famílias em situação de risco que moram em habitações coletivas, mães solteiras e idosos desamparados.",
    iconUrl: '/public/entities/acao_contra_fome_logo.png',
    places: {
      create: [{
        place: {
          create: {
            workingDays: {},
            opensAt: 830,
            closesAt: 1800,
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
        }
      }]
    },
    tags: upsertEntityTag("Refeição")
  },
  {
    id: "3",
    name: "Associação dos Remanecestes Quilombolas Urbano do Bairro da Liberdade",
    description:
        "Temos por finalidade melhorar a qualidade de vida de nossos associados em geral, defendendo-os, organizando-os e desenvolvendo trabalho social, cultural e educacional.\n" +
        "junto aos adultos, idosos, jovens e crianças portadores ou não-portadores de deficiência, incluindo remanescentes de quilombos do Bairro da Liberdade.",
    iconUrl: '/public/entities/quilombolas_logo.png',
    places: {
      create: [{
        place: {
          create: {
            workingDays: {},
            opensAt: 830,
            closesAt: 1800,
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
        }
      }]
    },
    tags: upsertEntityTag("Moradia")
  },
  {
    id: "4",
    name: "Santuário Rancho dos Gnomos",
    description:
        "Somos uma Organização Não-Governamental sem fins lucrativos e estamos movidos por uma filosofia de convivência harmoniosa entre os seres que habitam o planeta\n" +
        "Pregamos a ajuda mútua, onde não há melhor ou pior, mais ou menos importante, mas uma troca integrada de informação e de forças.",
    iconUrl: '/public/entities/rancho_gnomos_logo.png',
    places: {
      create: [{
        place: {
          create: {
            workingDays: {},
            opensAt: 830,
            closesAt: 1800,
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
        }
      }]
    },
    tags: upsertEntityTag("Animal")
  }
]


const itemMeasurement: Prisma.ItemMeasurementCreateInput[] = [
  {
    id: "1",
    name: "Quilogramas",
    unit: "Kg"
  },
  {
    id: "2",
    name: "Unidades",
    unit: ""
  },
  {
    id: "3",
    name: "Metros",
    unit: "M"
  },
  {
    id: "4",
    name: "Metros quadrados",
    unit: "M²"
  },
  {
    id: "5",
    name: "Metros cúbicos",
    unit: "M³"
  },
]

const itemCategories: Prisma.ItemCategoryCreateInput[] = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
    name: "Material de construção",
    description: "Material de construção.",
    measurement: {
      connect: {
        id: undefined,
        name: "Unidades",
      }
    }
  },
  {
    id: "4",
    name: "Ração animal",
    description: "Ração para animais domésticos como Cães e Gatos.",
    measurement: {
      connect: {
        id: undefined,
        name: "Quilogramas"
      }
    }
  },
]



const needs: Prisma.ItemNeedCreateInput[] = [
  {
    id: "1",
    name: "Alimentos para almoço solidário",
    description: "Estamos preparando um almoço solidário e precisamos de alimentos não perecíveis.",
    category: {
      connect: {
        id: "1"
      }
    },
    entity: {
      connect: {
        id: "1"
      }
    },
    urgency: Urgency.LOW,
    completed: false,
    active: true,
  },
  {
    id: "2",
    name: "Marmitas solidárias",
    description: "Estamos preparando refeições para distribuir a pessoas vulneráveis e precisamos de alimentos não perecíveis.",
    category: {
      connect: {
        id: "1"
      }
    },
    entity: {
      connect: {
        id: "2"
      }
    },
    urgency: Urgency.LOW,
    completed: false,
    active: true,
  },
  {
    id: "3",
    name: "Agasalho do bem",
    description: "Precisamos de roupas de inverno para distribuirmos na comunidade.",
    category: {
      connect: {
        id: "2"
      }
    },
    entity: {
      connect: {
        id: "3"
      }
    },
    urgency: Urgency.LOW,
    completed: false,
    active: true,
  },
  {
    id: "4",
    name: "Ração animal",
    description: "Precisamos de ração não perecível para ajudarmos animais de rua.",
    category: {
      connect: {
        id: "4"
      }
    },
    entity: {
      connect: {
        id: "4"
      }
    },
    urgency: Urgency.LOW,
    completed: false,
    active: true,
  },
]


function isDuplicateKey(code: string): boolean {
  return code !== "P2002"
}

async function createRecords(items: any[], collection) {
  for (const i of items) {
    try {
      await collection.create({
        data: i
      })
    } catch (e) {
      if (isDuplicateKey(e.code))
         console.info("failed", e)
    }
  }
}

async function createEntities() {
  for (const e of entities) {
    try {
      const {zipcode, number} = e.places.create[0].place.create.address.create;

      const cepInfo = await CepCoords.getByCep(zipcode);

      e.places.create[0].place.create.address.create = {
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
    } catch (e) {
      if (isDuplicateKey(e.code))
        console.info("failed", e)
    }
  }
}

async function main() {
  console.log(`Start seeding ...`)

  await createRecords(itemMeasurement, prisma.itemMeasurement)
  await createRecords(itemCategories, prisma.itemCategory)
  await createEntities();
  await createRecords(needs, prisma.itemNeed)

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
