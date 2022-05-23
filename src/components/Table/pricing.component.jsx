
import { Container, Row, Col, Button, Modal, InputGroup, FormControl, Form } from "react-bootstrap";
import { collection, addDoc, getDocs, getDoc, doc, updateDoc} from "firebase/firestore";
import { useEffect, useState, useLayoutEffect } from "react";
import { db } from "../../firebase/firebase.init";
import { keyHandler } from "react-slick/lib/utils/innerSliderUtils";


export const InputPricing = () => {

    const [newNormal, setNewNormal] = useState("")
    const [newPremium, setNewPremium] = useState("")
    const [newChampion, setNewChampion] = useState("")
    const [normalData, setNormal] = useState([])
    const [colorData, setColor] = useState([])

    const [newBlack, setNewBlack] = useState("")
    const [newWhite, setNewWhite] = useState("")
    const [newBrown, setNewBrown] = useState("")
    const [newBridle, setNewBridle] = useState("")

    const colDoc = doc(db, "pricing", "color")
    const qualityDoc = doc(db, "pricing", "breedQuality")

    useEffect(() => {
        const getData = async () => {
        const colData = await getDoc(colDoc)
        const qualData = await getDoc(qualityDoc)
        const ColorData = colData.data()
        const QualityData = qualData.data()
        
        setNormal(QualityData)
        setColor(ColorData)
        
        // if (docSnap.exists()) {
        //         console.log('document data:', docSnap.data())
        // } else {
        //         console.log('No such document')
        // }
        }

        getData()
    }, [])
   


    const updateQualityPrice = async () => {

        await updateDoc(colDoc, {
            black: newBlack === '' ? colorData.black : newBlack ,
            white: newWhite === '' ? colorData.white : newWhite ,
            brown: newBrown === '' ? colorData.brown : newBrown ,
            bridle: newBridle === '' ? colorData.bridle : newBridle 
        })

        await updateDoc(qualityDoc, {
            normal: newNormal === '' ? normalData.normal : newNormal,
            premium: newPremium === '' ? normalData.premium : newPremium,
            champion: newChampion === '' ? normalData.champion : newChampion
        })

        console.log(newBlack)
        window.location.reload(false)
    }

    return (
        <>
            <Container>
                <Row className="h-100">
                    <Col>
                        <Form>
                            <Form.Label>
                                Quality Base Price
                            </Form.Label>
                            <InputGroup className="mb-3">
                                        <InputGroup.Text className="text">Normal</InputGroup.Text>
                                        <FormControl
                                            placeholder={normalData.normal}
                                            onChange={(event) => {setNewNormal(event.target.value)}}
                                            aria-describedby="basic-addon1" 
                                            />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                        <InputGroup.Text className="text">Premium</InputGroup.Text>
                                        <FormControl
                                            placeholder={normalData.premium}
                                            onChange={(event) => {setNewPremium(event.target.value)}}
                                            aria-describedby="basic-addon1" 
                                            />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                        <InputGroup.Text className="text">Champion</InputGroup.Text>
                                        <FormControl
                                            placeholder={normalData.champion}
                                            onChange={(event) => {setNewChampion(event.target.value)}}
                                            aria-describedby="basic-addon1" 
                                            />
                            </InputGroup>
                        </Form>
                       
                    </Col>
                    <Col>
                        <Form>
                            <Form.Label>
                                Color Base Price
                            </Form.Label>
                            <InputGroup className="mb-3">
                                        <InputGroup.Text className="text">Black</InputGroup.Text>
                                        <FormControl
                                            placeholder={colorData.black}
                                            onChange={(event) => {setNewBlack(event.target.value)}}
                                            aria-describedby="basic-addon1" 
                                            />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                        <InputGroup.Text className="text">White</InputGroup.Text>
                                        <FormControl
                                            placeholder={colorData.white}
                                            onChange={(event) => {setNewWhite(event.target.value)}}
                                            aria-describedby="basic-addon1" 
                                            />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                        <InputGroup.Text className="text">Brown</InputGroup.Text>
                                        <FormControl
                                            placeholder={colorData.brown}
                                            onChange={(event) => {setNewBrown(event.target.value)}}
                                            aria-describedby="basic-addon1" 
                                            />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                        <InputGroup.Text className="text">Bridle</InputGroup.Text>
                                        <FormControl
                                            placeholder={colorData.bridle}
                                            onChange={(event) => {setNewBridle(event.target.value)}}
                                            aria-describedby="basic-addon1" 
                                            />
                            </InputGroup>
                        </Form>
                        
                    </Col>
                </Row>
                <Button variant="primary" onClick={updateQualityPrice} >
                          Change Prices
                        </Button>
                
            </Container>
           
        </>
    )
}