import {Button, Card, CardBody, CardHeader, Checkbox, CheckboxGroup, Input, Textarea} from "@nextui-org/react";
import {ReactElement, useState} from "react";
import {PhotoUploadInput} from "../../components/input/PhotoUpload.tsx";
import {useFormik} from "formik";
import {EntityCreateSchema, EntityPlaceSchema} from 'benito-common/zod/models';
import {useCreateEntity, useUpdateEntity} from 'benito-common/hooks';
import {toFormikValidate} from "zod-formik-adapter";
import {InputMasked} from "../../components/input";
import {useEntityClient} from 'benito-common/client';
import {useNavigate} from "react-router-dom";


const validationSchema = toFormikValidate(EntityCreateSchema.merge(EntityPlaceSchema).omit({
    id: true,
    createdAt: true,
    updatedAt: true
}))


type InputSectionProps = {
  title: string
  inputs: ReactElement[][]
};

const InputSection = ({title, inputs}: InputSectionProps) => {
  return (
      <Card>
          <div className={"flex-col justify-center items-start"}>
              <div className={"pl-2 pt-2 xl:pt-4 xl:pl-4"}>
                  <p className={"font-bold"}>{title}</p>
              </div>

              <div className={"border-b-1 border-gray-400 w-full pt-2"}/>
          </div>

          <CardBody className={"gap-y-3"}>
              {inputs.map(i => {
                  return (
                      <div className={"flex gap-x-8"}>
                          {i}
                      </div>
                  )
              })}
          </CardBody>
      </Card>
  )
};

export default function RegisterOrEditEntity() {
    const entityClient = useEntityClient();
    const createEntity = useCreateEntity();
    const updateEntity = useUpdateEntity();
    const [image, setImage] = useState();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {},
        onSubmit: (values: any) => {
            const {
                name, description, email,
                phoneNumber,
                website,

                country,
                zipcode,
                region,
                city,
                street,
                number,

                opensAt, closesAt
            } = values;

            const payload = {
                name,
                description,
                email,
                phoneNumber,
                website,

                places: {
                    create: {
                        place: {
                            create: {
                                address: {
                                    create: {
                                        country,
                                        zipcode,
                                        region,
                                        city,
                                        street,
                                        number,
                                    }
                                },
                                opensAt,
                                closesAt,
                                workingDays: []
                            },
                        }
                    }
                }
            }

            const upload = async () => {
                const entity = await createEntity.mutateAsync({
                    data: payload
                })

                if(image) {
                    const imageUrl = await entityClient.uploadPhoto(entity.id, image)

                    await updateEntity.mutateAsync({
                        data: {
                            iconUrl: imageUrl
                        },
                        where: {
                            id: entity.id
                        }
                    })
                }
            }

            upload()
                .then(_ => navigate('/home/organizations'))
                .catch(e => console.error(e))
        },
        validate: validationSchema
    });

    // @ts-ignore
    const inputFormikProps = (name: string) => ({
        value: formik.values[name],
        onChange: (v) => {
            formik.handleChange(v)
        },
        onBlur: formik.handleBlur,
        isInvalid: formik.errors[name],
        errorMessage: formik.errors[name],
        id: name
    })

    const hourMask = {
        mask: 'Hh:Mm',
        replacement: { m: /\d/, M: /[0-5]/, h: /\d/, H: /[0-2]/ },
    }

    return (
        <Card>
            <CardHeader className={"justify-center items-center font-medium"}>
                <p className={"xl:text-xl"}>Registrar nova organização</p>
            </CardHeader>

                <form onSubmit={formik.handleSubmit}>
                    <div className={"mx-10 mt-4 mb-10 space-y-6"}>

                        <InputSection title={"Informações Gerais"} inputs={[
                            [<Input type={"text"} label={"Nome"} placeholder={"Filantropia"}
                                    {...inputFormikProps('name')}/>,
                             <Input type={"email"} label={"Email"} placeholder={"email@example.com"} {...inputFormikProps('email')}/>],
                            [<Textarea label={"Descrição"} placeholder={"Entidade de filantropia"} {...inputFormikProps('description')}/>],
                            [<Input type={"phoneNumber"} label={"Telefone"} placeholder={'xxxxxxxxxxx'} {...inputFormikProps('phoneNumber')}/>],
                            [<Input type={"text"} label={"Website"} placeholder={"https://website.com"} {...inputFormikProps('website')}/>]
                        ]}/>

                        <InputSection title={"Endereço"} inputs={[
                            [<Input type={"text"} label={"País"} placeholder={"Brasil"} {...inputFormikProps('country')}/>],
                            [<InputMasked type={"text"} label={"CEP"} placeholder={"XXXXX-XXX"} mask={'_____-___'} replacement={{ _: /\d/ }} {...inputFormikProps('zipcode')} />,
                             <Input type={"text"} label={"Estado"} placeholder={"RS"} {...inputFormikProps('region')} />,
                             <Input type={"text"} label={"Cidade"} placeholder={"Cidade"} {...inputFormikProps('city')} />],
                            [<Input type={"text"} label={"Rua"} placeholder={"Rua"} {...inputFormikProps('street')}/>],
                            [<Input type={"text"} label={"Número"} placeholder={"100"} {...inputFormikProps('number')}/>]
                        ]}/>

                        <InputSection title={"Funcionamento"} inputs={[
                            [<InputMasked type={"number"} label={"Abre"} placeholder={"08:00"} {...hourMask} {...inputFormikProps('opensAt')} />,
                             <InputMasked type={"number"} label={"Fecha"} placeholder={"18:00"} {...hourMask} {...inputFormikProps('closesAt')} />],
                            [
                                <CheckboxGroup
                                    label="Dias da semana"
                                    defaultValue={["1", "2", "3", "4", "5"]}
                                    id={"workingDays"}
                                    onChange={v => formik.values["workingDays"] = v}
                                >
                                    <Checkbox value="1">Segunda-feira</Checkbox>
                                    <Checkbox value="2">Terça-feira</Checkbox>
                                    <Checkbox value="3">Quarta-feira</Checkbox>
                                    <Checkbox value="4">Quinta-feira</Checkbox>
                                    <Checkbox value="5">Sexta-feira</Checkbox>
                                    <Checkbox value="6">Sábado</Checkbox>
                                    <Checkbox value="7">Domingo</Checkbox>
                                </CheckboxGroup>
                            ]
                        ]}/>

                        <PhotoUploadInput label={"Foto da organização"} inputId={"photo"} onImageChange={setImage}/>

                    </div>

                    <div className={"mx-10 mb-10"}>
                        <Button className={"w-full"} color={"danger"} variant={"shadow"} type={"submit"}>
                            Salvar
                        </Button>
                    </div>

                </form>

        </Card>
    )
}
