import React from 'react';
import Banner from './Banner/Banner';
import Content from './Content/Content';
import { Container } from 'react-bootstrap';

function Home() {
    return (
        <Container fluid className='mt-5'>
            <Banner />
            <Content />
        </Container>
    );
}

export default Home;
