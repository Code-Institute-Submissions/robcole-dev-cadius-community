import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.png"

import styles from "../../css/ServerAddEdit.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../css/Button.module.css";
import Asset from "../../components/Asset";
import { Image } from "react-bootstrap";

function ServerCreateForm() {

    const [errors, setErrors] = useState({});

    const [serverData, setServerData] = useState({
        name: "",
        address: "",
        banner: "",
    });
    const { name, address, banner } = serverData;

    const handleChange = (event) => {
        setServerData({
            ...serverData,
            [event.target.name]: event.taget.value,
        });
    };

    const handleChangeBanner = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(banner)
            setServerData({
                ...serverData,
                banner: URL.createObjectURL(event.target.files[0]),
            });
        };
    };

    const textFields = (
        <div className="text-center">
            <Form.Group>
                <Form.Label>Server Name</Form.Label>
                <Form.Control type="text" name="name" value={name} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Server Address</Form.Label>
                <Form.Control type="text" name="address" value={address} onChange={handleChange} />
            </Form.Group>

            <Button onClick={() => { }}>cancel</Button>
            <Button type="submit">create</Button>
        </div>
    );

    return (
        <Form>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group className="text-center">
                            {banner ? (
                                <>
                                    <figure>
                                        <Image className={appStyles.Image} src={banner} rounded />
                                    </figure>
                                    <div>
                                        <Form.Label className={`${btnStyles.Button} ${btnStyles.Blue} btn`} htmlFor="banner-upload" >Change Image</Form.Label>
                                    </div>
                                </>
                            ) : (
                                <Form.Label className="d-flex justify-content-center" htmlFor="banner-upload" >
                                    <Asset src={Upload} message="Click or tap to upload" />
                                </Form.Label>
                            )};

                            <Form.File id="banner-upload" accept="image/*" onChange={handleChangeBanner} />
                        </Form.Group>
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>{textFields}</Container>
                </Col>
            </Row>
        </Form >
    );
}

export default ServerCreateForm;