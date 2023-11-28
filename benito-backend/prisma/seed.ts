import { PrismaClient, Prisma } from '@prisma/client'

import {S3} from '@aws-sdk/client-s3';
import * as fs from 'fs';
import * as path from 'path';

import {detectImageType} from "../src/image";
import {CoordenadasDoCep} from '../src/service/address.service'

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


const users: Prisma.UserCreateInput[] = [
  {
    id: "1",
    name: "Alice",
    lastName: "Martens",
    password: "12345678",
    email: "alice@email.com",
    birthDate: "26/11/2000",
    iconUrl: ""
  },
  {
    id: "2",
    name: "Bob",
    lastName: "Speck",
    password: "12345678",
    email: "bob@email.com",
    birthDate: "26/12/2000",
    iconUrl: ""
  },
  {
    id: "3",
    name: "Luca",
    lastName: "Colins",
    password: "12345678",
    email: "luca@email.com",
    birthDate: "26/04/2000",
    iconUrl: ""
  },
  {
    id: "4",
    name: "Roger",
    lastName: "Williams",
    password: "12345678",
    email: "roger@email.com",
    birthDate: "26/09/2000",
    iconUrl: ""
  }
]


const entities: Prisma.EntityCreateInput[] = [
  {
    id: "1",
    name: "Projeto refeição solidária",
    description:
        "Somos um grupo de pessoas que nos unimos para levar alimentos (marmitas) a pessoas em situação de rua.\n" +
        "Hoje, além de montarmos nossos kits alimentação, distribuímos kits pets, kits de higiene, kits de frio, cestas básicas, cobertores, etc",
    iconUrl: 'http://localhost:3002/entity/1/image',
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
    users: {
      create: {
        user: {
          connect: {
            id: "1"
          }
        },
        role: "MANAGER",
      }
    },
    tags: upsertEntityTag("Refeições")
  },
  {
    id: "2",
    name: "Ação Combate à Fome",
    description:
        "Somos amigos e parentes que mensalmente se unem de forma a ajudar o próximo, fazemos isso desde 1993.\n" +
        "Auxiliar a quem necessita doação de cestas básicas à famílias em situação de risco que moram em habitações coletivas, mães solteiras e idosos desamparados.",
    iconUrl: 'http://localhost:3002/entity/2/image',
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
    users: {
      create: {
        user: {
          connect: {
            id: "2"
          }
        },
        role: "MANAGER",
      }
    },
    tags: upsertEntityTag("Refeição")
  },
  {
    id: "3",
    name: "Associação dos Remanecestes Quilombolas Urbano do Bairro da Liberdade",
    description:
        "Temos por finalidade melhorar a qualidade de vida de nossos associados em geral, defendendo-os, organizando-os e desenvolvendo trabalho social, cultural e educacional.\n" +
        "junto aos adultos, idosos, jovens e crianças portadores ou não-portadores de deficiência, incluindo remanescentes de quilombos do Bairro da Liberdade.",
    iconUrl: 'http://localhost:3002/entity/3/image',
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
    iconUrl: 'http://localhost:3002/entity/4/image',
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


const entityImages: Photo[] = [
  {id: "1", imagePath: "./images/entities/refeicao_solidaria_logo.png"},
  {id: "2", imagePath: "./images/entities/acao_contra_fome_logo.png"},
  {id: "3", imagePath: "./images/entities/quilombolas_logo.png"},
  {id: "4", imagePath: "./images/entities/rancho_gnomos_logo.png"},
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
    },
    iconUrl: "http://localhost:3002/item/category/1/image"
  },
  {
    id: "2",
    name: "Roupas leves",
    description: "Roupas leves de adultos e crianças.",
    measurement: {
      connect: {
        id: undefined,
        name: "Unidades",
      }
    },
    iconUrl: "http://localhost:3002/item/category/2/image"
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
    },
    iconUrl: "http://localhost:3002/item/category/3/image"
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
    },
    iconUrl: "http://localhost:3002/item/category/4/image"
  },
  {
    id: "5",
    name: "Remédios",
    description: "Remédios para o tratamento de feridas.",
    measurement: {
      connect: {
        id: undefined,
        name: "Unidades"
      }
    },
    iconUrl: "http://localhost:3002/item/category/5/image"
  },
  {
    id: "6",
    name: "Cobertores",
    description: "Cobertores para adultos e crianças.",
    measurement: {
      connect: {
        id: undefined,
        name: "Unidades"
      }
    },
    iconUrl: "http://localhost:3002/item/category/6/image"
  },
  {
    id: "7",
    name: "Higiene",
    description: "Materiais para higiene, como desinfetante, detergente.",
    measurement: {
      connect: {
        id: undefined,
        name: "Unidades"
      }
    },
    iconUrl: "http://localhost:3002/item/category/7/image"
  },
]


const itemCategoriesImages: Photo[] = [
  {id: "1", imagePath: "./images/item_category/non_perishable_food.png"},
  {id: "2", imagePath: "./images/item_category/soft_clothes.png"},
  {id: "3", imagePath: "./images/item_category/construction.png"},
  {id: "4", imagePath: "./images/item_category/pet_items.png"},
  {id: "5", imagePath: "./images/item_category/medicine.png"},
  {id: "6", imagePath: "./images/item_category/medicine.png"},
  {id: "7", imagePath: "./images/item_category/hygiene.png"},
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

      const cepInfo = await CoordenadasDoCep.getByCep(zipcode);

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

type Photo = {
  id: string;
  imagePath: string;
};


async function uploadPhotos(s3: S3, bucket: string, dir: string, photos: Photo[]) {
  for (const photo of photos) {
    console.log(`Loading photo ${photo.imagePath} to upload to S3 on path ${dir}`)

    const body = fs.readFileSync(photo.imagePath)
    const imageType = await detectImageType(body)
    const key = path.join(dir, photo.id)

    const result = await s3.putObject({
      Body: body,
      ContentType: imageType.mime,
      Key: key,
      Bucket: bucket
    })

    console.log(`Uploaded photo ${photo.imagePath} to S3 in path ${key}`)
  }
}



async function main() {
  const s3 = new S3({
    endpoint: "http://localhost:9000",
    credentials: {
      accessKeyId: "minioadmin",
      secretAccessKey: "minioadmin"
    },
    region: "sa-east-1",
    forcePathStyle: true,
  })

  console.log(`Start seeding ...`)

  await createRecords(itemMeasurement, prisma.itemMeasurement)
  await createRecords(itemCategories, prisma.itemCategory)
  await createRecords(users, prisma.user)
  await createEntities();
  await createRecords(needs, prisma.itemNeed)

  await uploadPhotos(s3, "benito-images", "entity", entityImages)
  await uploadPhotos(s3, "benito-images", "item-category", itemCategoriesImages)

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
