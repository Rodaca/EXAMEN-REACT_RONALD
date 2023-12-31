import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Input } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react'
import Carrito from './carrito';
export default function Cart() {
    const [ApiData, setApiData] = useState([]);
    const [array, setArray] = useState([]);
    const [dataCard, setdataCard] = useState({
        "nombre": "",
        "imagen": [],
        "valoracion": 0,
        "descripcion": "",
        "precio": 0,
        "descuento": 0
      });
      const arrayProductos = []
    let history = useHistory();
    useEffect(() => {
        axios.get("http://localhost:5010/producto"/* ,
        {
            headers: { 
                'Accept-Version':'1.0.1'
            }
    } */)
            .then((response) => {
                setApiData(response.data.data);
                console.log(ApiData);
            })
        
        setArray(arrayProductos)

    }, []);

        function valoracion(valor) {
        let nuevoValor = parseInt(valor);
        let puntos = ""
        for (let index = 0; index < nuevoValor; index++) {
            puntos = puntos + "*";

        }
        return puntos;
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const carritopg = () => {
        
        history.push({ pathname: '/carrito', state: { producto: array } })
      };

    return (
        <div>
            
            <Button  onClick={carritopg}>Carrito</Button>
            
            <div className='card'>

                {ApiData.map((data) => {
                    return (
                        <Card maxW='sm' >

                            <div className='imgenes'>
                                <div>
                                    <Image src={data.imagen[1]} borderRadius='lg' width="100px" />
                                    <Image src={data.imagen[2]} borderRadius='lg' width="100px" />
                                    <Image src={data.imagen[3]} borderRadius='lg' width="100px" />
                                    <Image src={data.imagen[4]} borderRadius='lg' width="100px" />
                                </div>
                                <div>
                                    <Image src={data.imagen[0]} borderRadius='lg' />
                                </div>

                            </div>
                            <CardHeader>
                                <Heading size='md'>{data.nombre}</Heading>
                            </CardHeader>
                            <CardBody>

                                <Stack mt='6' spacing='3'>
                                    <Heading size='md'>{valoracion(data.valoracion)}</Heading>
                                    <Text>
                                        {data.descripcion}
                                    </Text>
                                    <Text color='blue.600' fontSize='2xl'>
                                        {data.precio} / {data.descuento}%
                                    </Text>
                                </Stack>
                            </CardBody>
                            <Divider />
                            <CardFooter onClick={onOpen}>
                                <Button onClick={() => {
                                    setdataCard(data);
                                }}>Detalles</Button>
                            </CardFooter>
                        </Card>

                    )
                })}
                {<Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Detalles</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {dataCard.nombre}
                            <Image src={dataCard.imagen[0]} borderRadius='lg' />
                            <Heading size='md'>{valoracion(dataCard.valoracion)}</Heading>
                            <Text>
                                {dataCard.descripcion}
                            </Text>
                            <Text color='blue.600' fontSize='2xl'>
                                {dataCard.precio} / {dataCard.descuento}%
                            </Text>
                            <Input placeholder='Cantidad' />
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button variant='ghost' onClick={()=>{
                                arrayProductos.push(dataCard)
                                console.log(arrayProductos);
                            }}>Agregar al carro</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>}
            </div>
        </div>


    )
}