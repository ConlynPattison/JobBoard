import NavHeaders from "../components/NavHeader";
import React from "react";
import {Card, CardBody, Image, Text} from "@chakra-ui/react";
import {Center} from "@chakra-ui/layout";
// import {useAuth} from "../hooks/useAuth";


const ProfilePage = () => {
    // const { user, logout } = useAuth();

    return (
        <>
            <NavHeaders />
            <br />
            <Center>
                <Image
                    borderRadius='full'
                    boxSize='150px'
                    src='https://avatars.githubusercontent.com/u/112051310?v=4'
                    alt='Conlyn Pattison'
                />
            </Center>
            <br />
            <Center> <Text fontSize='3xl'> Conlyn Pattison </Text> </Center>
            <br />
            <Card>
                <CardBody>
                    Text
                </CardBody>
            </Card>
        </>
    );
}

export default ProfilePage;