// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Card, Button, FormLabel } from 'react-bootstrap';
// import Slider from 'react-slick';
// import leftArrowIcon from '../../icons/left-arrow.svg';
// import rightArrowIcon from '../../icons/right-arrow.svg';
// import './Content.css'; // Import custom CSS for styling
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// function Content() {
//     const packages = [
//         'Popular Packages',
//         'Fever',
//         'Women Health',
//         'Diabetes',
//         'Fitness',
//         'Covid 19',
//         'Senior Citizen',
//         'Lifestyle Habits',
//         'Full Body Check Up'
//     ];

//     const packageDetails = [
//         {
//             name: 'Comprehensive Gold Full Body Checkup',
//             totalTests: 10,
//             testNames: ['Complete Blood Count', 'Cholesterol Test', 'Liver Function Test', 'Vitamin Profile'],
//             reportTime: 'within 24 hours',
//             payableAmount: 800,
//             totalAmount: 1000,
//             discountPercentage: 20
//         },
//         {
//             name: 'Fever 2',
//             totalTests: 5,
//             testNames: ['Fever Panel 1', 'Fever Panel 2', 'Fever Panel 2', 'Fever Panel 3'],
//             reportTime: 'within 12 hours',
//             payableAmount: 450,
//             totalAmount: 500,
//             discountPercentage: 10
//         },
//         {
//             name: 'Diabetes 3',
//             totalTests: 6,
//             testNames: ['Diabetes Panel 1', 'Diabetes Panel 2'],
//             reportTime: 'within 12 hours',
//             payableAmount: 630,
//             totalAmount: 700,
//             discountPercentage: 10
//         },
//         {
//             name: 'Popular Packages 4',
//             totalTests: 10,
//             testNames: ['Complete Blood Count', 'Cholesterol Test', 'Liver Function Test', 'Vitamin Profile'],
//             reportTime: 'within 24 hours',
//             payableAmount: 800,
//             totalAmount: 1000,
//             discountPercentage: 20
//         },
//         {
//             name: 'Fever 5',
//             totalTests: 5,
//             testNames: ['Fever Panel 1', 'Fever Panel 2', 'Fever Panel 2', 'Fever Panel 3'],
//             reportTime: 'within 12 hours',
//             payableAmount: 450,
//             totalAmount: 500,
//             discountPercentage: 10
//         },
//         {
//             name: 'Diabetes 6',
//             totalTests: 6,
//             testNames: ['Diabetes Panel 1', 'Diabetes Panel 2','Diabetes Panel 2','Diabetes Panel 2'],
//             reportTime: 'within 12 hours',
//             payableAmount: 630,
//             totalAmount: 700,
//             discountPercentage: 10
//         }
//     ];

//     const [selectedPackage, setSelectedPackage] = useState(null);
//     const handlePackageSelection = (packageType) => {
//         setSelectedPackage(packageType);
//     };

//     const SamplePrevArrow = (props) => {
//         const { className, style, onClick } = props;
//         return (
//             <div className={className} style={{ ...style, display: props.currentSlide === 0 ? 'none' : 'block', left: "-28px", zIndex: "1"}} onClick={onClick}>
//                 {/* <img src={leftArrowIcon} alt="Left Arrow" /> */}
//             </div>
//         );
//     }


//     const SampleNextArrow = (props) => {
//         const { className, style, onClick, currentSlide, slideCount} = props;

//         return (
//             <div className={className} style={{ ...style, display: currentSlide === slideCount - currentSlide ? 'none' : 'block', right: "10px", zIndex: "1" }} onClick={onClick}>
//                 {/* <img src={rightArrowIcon} alt="Right Arrow" /> */}
//             </div>
//         );
//     }




//     const settings = {
//         dots: false,
//         infinite: false,
//         speed: 500,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         nextArrow: <SampleNextArrow/>,
//         prevArrow: <SamplePrevArrow />,


//     };

//     return (
//         <Container>
//             <Row className="mt-4 mb-4 d-flex align-items-center">
//                 <Form>
//                     <Form.Group as={Row} controlId="searchBar" className="search-bar">
//                         <Col lg={3}>
//                             <FormLabel><h4 className="popular-health-checkups">Popular health checkups</h4></FormLabel>
//                         </Col>
//                         <Col lg={6}>
//                             <Form.Control type="text" placeholder="Search for Test..." className="search-input" autoComplete='off' />
//                         </Col>
//                     </Form.Group>
//                 </Form>
//             </Row>

//             <Row className="mb-4">
//                 <Col>
//                     <div className="package-buttons" style={{ overflowX: 'auto' }}>
//                         {packages.map((packageType, index) => (
//                             <button
//                                 key={index}
//                                 className={`package-button ${selectedPackage === packageType ? 'active' : ''}`}
//                                 onClick={() => handlePackageSelection(packageType)}
//                             >
//                                 {packageType}
//                             </button>
//                         ))}
//                     </div>
//                 </Col>
//             </Row>

//             <Row>
//                 <Col>
//                     <Slider {...settings}>
//                         {packageDetails.map((packageItem, index) => (
//                             <div key={index} >
//                                 <Card className="h-100 m-3 package-details">
//                                     <Card.Body>
//                                         <Card.Title style={{ fontSize: '18px' }}>{packageItem.name}</Card.Title>
//                                         <Card.Text style={{ color: '#757575', fontWeight: '600', fontSize: '16px' }}>
//                                             <p>Includes {packageItem.totalTests} Tests</p>
//                                         </Card.Text>
//                                         <Card.Text className="test-names-container h-100" style={{ fontSize: '16px', maxHeight: '100px', color: '#757575', fontWeight: '600' }}>
//                                             {packageItem.testNames.slice(0, 3).map((testName, index) => (
//                                                 <span key={index}>{testName}<br /></span>
//                                             ))}
//                                             {packageItem.testNames.length > 3 && <span style={{ fontWeight: '700', fontSize: '16px' }}><b>+ More</b></span>}
//                                         </Card.Text>
//                                         <p style={{ color: '#757575', fontWeight: '600', fontSize: '16px' }}>Get report {packageItem.reportTime}</p>
//                                         <p style={{ fontSize: '20px' }}>
//                                             <span><b>₹ {packageItem.payableAmount}</b></span>
//                                             <span className="mx-2" style={{ color: '#757575', fontWeight: '600' }}><s>₹ {packageItem.totalAmount}</s></span>
//                                         </p>
//                                         <p>
//                                             <span className="discount-percentage-box">{packageItem.discountPercentage}% off</span>
//                                         </p>
//                                         <Button className="add-to-chart w-100 mt-auto">ADD TO CART</Button>
//                                     </Card.Body>
//                                 </Card>
//                             </div>
//                         ))}
//                     </Slider>
//                 </Col>
//             </Row>

//         </Container>
//     );
// }

// export default Content;


// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Form, Card, Button, FormLabel } from 'react-bootstrap';
// import Slider from 'react-slick';
// import './Content.css'; // Import custom CSS for styling
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { ref, onValue } from 'firebase/database';
// import { db } from '../../../../Firebase/Firebase'; // Adjust the path as per your project structure

// function Content() {
//     const packages = [
//         'Popular Packages',
//         'Fever',
//         'Women Health',
//         'Diabetes',
//         'Fitness',
//         'Covid 19',
//         'Senior Citizen',
//         'Lifestyle Habits',
//         'Full Body Check Up'
//     ];
//     const [testPackages, setTestPackages] = useState([]);
//     const [selectedPackage, setSelectedPackage] = useState(null);
//     const [searchQuery, setSearchQuery] = useState('');

//     useEffect(() => {
//         const testPackagesRef = ref(db, 'testPackages');
//         const unsubscribe = onValue(testPackagesRef, (snapshot) => {
//             const data = snapshot.val();
//             if (data) {
//                 const testPackagesList = Object.entries(data).map(([id, packageData]) => ({ id, ...packageData }));
//                 setTestPackages(testPackagesList);
//             } else {
//                 setTestPackages([]);
//             }
//         });

//         return () => {
//             unsubscribe();
//         };
//     }, []);

//     const filteredPackages = testPackages.filter((testPackage) => {
//         return (
//             testPackage.packageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             testPackage.testDetails.some((test) => test.testName.toLowerCase().includes(searchQuery.toLowerCase()))
//         );
//     });

//     const handlePackageSelection = (packageType) => {
//         setSelectedPackage(packageType);
//     };

//     const settings = {
//         dots: false,
//         infinite: false,
//         speed: 500,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         nextArrow: <SampleNextArrow />,
//         prevArrow: <SamplePrevArrow />,
//     };

//     function SamplePrevArrow(props) {
//         const { className, style, onClick } = props;
//         return (
//             <div
//                 className={className}
//                 style={{ ...style, display: props.currentSlide === 0 ? 'none' : 'block', left: '-28px', zIndex: '1' }}
//                 onClick={onClick}
//             ></div>
//         );
//     }

//     function SampleNextArrow(props) {
//         const { className, style, onClick, currentSlide, slideCount } = props;

//         return (
//             <div
//                 className={className}
//                 style={{
//                     ...style,
//                     display: currentSlide === slideCount - currentSlide ? 'none' : 'block',
//                     right: '10px',
//                     zIndex: '1',
//                 }}
//                 onClick={onClick}
//             ></div>
//         );
//     }

//     return (
//         <Container>
//             <Row className="mt-4 mb-4 d-flex align-items-center">
//                 <Form>
//                     <Form.Group as={Row} controlId="searchBar" className="search-bar">
//                         <Col lg={3}>
//                             <FormLabel>
//                                 <h4 className="popular-health-checkups">Popular health checkups</h4>
//                             </FormLabel>
//                         </Col>
//                         <Col lg={6}>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Search for Test..."
//                                 className="search-input"
//                                 autoComplete="off"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                             />
//                         </Col>
//                     </Form.Group>
//                 </Form>
//             </Row>

//             {/* <Row className="mb-4">
//                 <Col>
//                     <div className="package-buttons" style={{ overflowX: 'auto' }}>
//                         {filteredPackages.map((testPackage, index) => (
//                             <button
//                                 key={index}
//                                 className={`package-button ${selectedPackage === testPackage.packageName ? 'active' : ''}`}
//                                 onClick={() => handlePackageSelection(testPackage.packageName)}
//                             >
//                                 {testPackage.packageName}
//                             </button>
//                         ))}
//                     </div>
//                 </Col>
//             </Row> */}
//             <Row className="mb-4">
//                 <Col>
//                     <div className="package-buttons" style={{ overflowX: 'auto' }}>
//                         {packages.map((packageType, index) => (
//                             <button
//                                 key={index}
//                                 className={`package-button ${selectedPackage === packageType ? 'active' : ''}`}
//                                 onClick={() => handlePackageSelection(packageType)}
//                             >
//                                 {packageType}
//                             </button>
//                         ))}
//                     </div>
//                 </Col>
//             </Row>


//             <Row>
//                 <Col>
//                     <Slider {...settings}>
//                         {filteredPackages.map((testPackage, index) => (
//                             <div key={index}>
//                                 <Card className="h-100 m-3 package-details">
//                                     <Card.Body>
//                                         <Card.Title style={{ fontSize: '18px' }}>{testPackage.packageName}</Card.Title>
//                                         <Card.Text style={{ color: '#757575', fontWeight: '600', fontSize: '16px' }}>
//                                             <p>Includes {testPackage.testDetails.length} Tests</p>
//                                         </Card.Text>
//                                         <Card.Text className="test-names-container h-100" style={{ fontSize: '16px', maxHeight: '100px', color: '#757575', fontWeight: '600' }}>
//                                             {testPackage.testDetails.slice(0, 3).map((test, index) => (
//                                                 <span key={index}>{test.testName}<br /></span>
//                                             ))}
//                                             {testPackage.testDetails.length > 3 && <span style={{ fontWeight: '700', fontSize: '16px' }}><b>+ More</b></span>}
//                                         </Card.Text>
//                                         <p style={{ color: '#757575', fontWeight: '600', fontSize: '16px' }}>Get report {testPackage.reportTime}</p>
//                                         <p style={{ fontSize: '20px' }}>
//                                             <span><b>₹ {testPackage.totalAmount}</b></span>
//                                             <span className="mx-2" style={{ color: '#757575', fontWeight: '600' }}><s>₹ {testPackage.payableAmount}</s></span>
//                                         </p>
//                                         <p>
//                                             <span className="discount-percentage-box">{testPackage.discountPercent}% off</span>
//                                         </p>
//                                         <Button className="add-to-chart w-100 mt-auto">ADD TO CART</Button>
//                                     </Card.Body>
//                                 </Card>
//                             </div>
//                         ))}
//                     </Slider>
//                 </Col>
//             </Row>
//         </Container>
//     );
// }

// export default Content;

//done
// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Form, Card, Button, FormLabel } from 'react-bootstrap';
// import Slider from 'react-slick';
// import './Content.css'; // Import custom CSS for styling
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { ref, onValue } from 'firebase/database';
// import { db } from '../../../../Firebase/Firebase'; // Adjust the path as per your project structure

// function Content() {
//     const packages = [
//         'All Packages',
//         'Fever',
//         'Women Health',
//         'Diabetes',
//         'Fitness',
//         'Covid 19',
//         'Senior Citizen',
//         'Lifestyle Habits',
//         'Full Body Check Up'
//     ];
//     const [testPackages, setTestPackages] = useState([]);
//     const [selectedPackage, setSelectedPackage] = useState('All Packages');
//     const [searchQuery, setSearchQuery] = useState('');
//     const [sliderKey, setSliderKey] = useState(0);

//     useEffect(() => {
//         const testPackagesRef = ref(db, 'testPackages');
//         const unsubscribe = onValue(testPackagesRef, (snapshot) => {
//             const data = snapshot.val();
//             if (data) {
//                 const testPackagesList = Object.entries(data).map(([id, packageData]) => ({ id, ...packageData }));
//                 setTestPackages(testPackagesList);
//             } else {
//                 setTestPackages([]);
//             }
//         });

//         return () => {
//             unsubscribe();
//         };
//     }, []);

//     const filteredPackages = testPackages.filter((testPackage) => {
//         return (
//             testPackage.packageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             testPackage.testDetails.some((test) => test.testName.toLowerCase().includes(searchQuery.toLowerCase()))
//         );
//     });

//     const handlePackageSelection = (packageType) => {
//         setSelectedPackage(packageType === selectedPackage ? 'All Packages' : packageType);
//         // Restart the slider by changing the key
//         setSliderKey(sliderKey + 1);
//     };

//     const settings = {
//         key: sliderKey, // Add key to restart the slider
//         dots: false,
//         infinite: false,
//         speed: 500,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         nextArrow: <SampleNextArrow />,
//         prevArrow: <SamplePrevArrow />,
//     };

//     function SamplePrevArrow(props) {
//         const { className, style, onClick } = props;
//         return (
//             <div
//                 className={className}
//                 style={{ ...style, display: props.currentSlide === 0 ? 'none' : 'block', left: '-28px', zIndex: '1' }}
//                 onClick={onClick}
//             ></div>
//         );
//     }

//     function SampleNextArrow(props) {
//         const { className, style, onClick, currentSlide, slideCount } = props;
//         return (
//             <div
//                 className={className}
//                 style={{
//                     ...style,
//                     display: currentSlide === slideCount - 1 ? 'none' : 'block',
//                     right: '10px',
//                     zIndex: '1',
//                 }}
//                 onClick={onClick}
//             ></div>
//         );
//     }

//     return (
//         <Container>
//             <Row className="mt-4 mb-4 d-flex align-items-center">
//                 <Form>
//                     <Form.Group as={Row} controlId="searchBar" className="search-bar">
//                         <Col lg={3}>
//                             <FormLabel>
//                                 <h4 className="popular-health-checkups">Popular health checkups</h4>
//                             </FormLabel>
//                         </Col>
//                         <Col lg={6}>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Search for Test..."
//                                 className="search-input"
//                                 autoComplete="off"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                             />
//                         </Col>
//                     </Form.Group>
//                 </Form>
//             </Row>

//             <Row className="mb-4">
//                 <Col>
//                     <div className="package-buttons" style={{ overflowX: 'auto' }}>
//                         {packages.map((packageType, index) => (
//                             <button
//                                 key={index}
//                                 className={`package-button ${selectedPackage === packageType ? 'active' : ''}`}
//                                 onClick={() => handlePackageSelection(packageType)}
//                             >
//                                 {packageType}
//                             </button>
//                         ))}
//                     </div>
//                 </Col>
//             </Row>

//             <Row>
//                 <Col>
//                     <Slider {...settings}>
//                         {filteredPackages
//                             .filter(testPackage => selectedPackage === 'All Packages' || testPackage.selectedCategory === selectedPackage)
//                             .map((testPackage, index) => (
//                                 <div key={index}>
//                                     <Card className="h-100 m-3 package-details d-flex flex-wrap">
//                                         <Card.Body>
//                                             <Card.Title style={{ fontSize: '18px' }}>{testPackage.packageName}</Card.Title>
//                                             <Card.Text style={{ color: '#757575', fontWeight: '600', fontSize: '16px' }}>
//                                                 <p>Includes {testPackage.testDetails.length} Tests</p>
//                                             </Card.Text>
//                                             <Card.Text className="test-names-container h-100" style={{ fontSize: '16px', maxHeight: '100px', color: '#757575', fontWeight: '600' }}>
//                                                 {testPackage.testDetails.slice(0, 3).map((test, index) => (
//                                                     <span key={index}>{test.testName}<br /></span>
//                                                 ))}
//                                                 {testPackage.testDetails.length > 3 && <span style={{ fontWeight: '700', fontSize: '16px' }}><b>+ More</b></span>}
//                                             </Card.Text>
//                                             <p style={{ color: '#757575', fontWeight: '600', fontSize: '16px' }}>Get report within {testPackage.reportTime}</p>
//                                             <p style={{ fontSize: '20px' }}>
//                                                 <span> <b>₹ {testPackage.payableAmount}</b></span>
//                                                 <span className="mx-2" style={{ color: '#757575', fontWeight: '600' }}>{testPackage.discountPercent > 0 ? <s>₹ {testPackage.totalAmount}</s> : <>&nbsp;</>}</span>
//                                             </p>
//                                             <p className='h-100'> {testPackage.discountPercent > 0 ?
//                                                 <span className="discount-percentage-box">{testPackage.discountPercent}% off</span>
//                                                 :
//                                                 <span className="discount-percentage-box" style={{ border: 'none', backgroundColor: 'white', color: 'white' }}><>&nbsp;</></span>
//                                             }
//                                             </p>
//                                             <Button className="add-to-chart w-100 mt-auto">ADD TO CART</Button>
//                                         </Card.Body>
//                                     </Card>
//                                 </div>
//                             ))}
//                     </Slider>
//                 </Col>
//             </Row>
//         </Container>
//     );
// }

// export default Content;




// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Form, Card, Button, FormLabel } from 'react-bootstrap';
// import Slider from 'react-slick';
// import './Content.css'; // Import custom CSS for styling
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { ref, onValue } from 'firebase/database';
// import { db } from '../../../../Firebase/Firebase'; // Adjust the path as per your project structure

// function Content() {
//     const packages = [
//         'All Packages',
//         'Fever',
//         'Women Health',
//         'Diabetes',
//         'Fitness',
//         'Covid 19',
//         'Senior Citizen',
//         'Lifestyle Habits',
//         'Full Body Check Up'
//     ];
//     const [testPackages, setTestPackages] = useState([]);
//     const [selectedPackage, setSelectedPackage] = useState(null);
//     const [searchQuery, setSearchQuery] = useState('');

//     useEffect(() => {
//         const testPackagesRef = ref(db, 'testPackages');
//         const unsubscribe = onValue(testPackagesRef, (snapshot) => {
//             const data = snapshot.val();
//             if (data) {
//                 const testPackagesList = Object.entries(data).map(([id, packageData]) => ({ id, ...packageData }));
//                 setTestPackages(testPackagesList);
//             } else {
//                 setTestPackages([]);
//             }
//         });

//         return () => {
//             unsubscribe();
//         };
//     }, []);

//     const filteredPackages = testPackages.filter((testPackage) => {
//         return (
//             testPackage.packageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             testPackage.testDetails.some((test) => test.testName.toLowerCase().includes(searchQuery.toLowerCase()))
//         );
//     });

//     const handlePackageSelection = (packageType) => {
//         setSelectedPackage(packageType === selectedPackage ? null : packageType);
//     };

//     const settings = {
//         dots: false,
//         infinite: false,
//         speed: 500,
//         slidesToShow: selectedPackage ? filteredPackages.filter(pkg => pkg.selectedCategory === selectedPackage).length : 3,
//         slidesToScroll: 1,
//         nextArrow: <SampleNextArrow />,
//         prevArrow: <SamplePrevArrow />,
//     };

//     function SamplePrevArrow(props) {
//         const { className, style, onClick } = props;
//         return (
//             <div
//                 className={className}
//                 style={{ ...style, display: props.currentSlide === 0 ? 'none' : 'block', left: '-28px', zIndex: '1' }}
//                 onClick={onClick}
//             ></div>
//         );
//     }

//     function SampleNextArrow(props) {
//         const { className, style, onClick, currentSlide, slideCount } = props;

//         return (
//             <div
//                 className={className}
//                 style={{
//                     ...style,
//                     display: currentSlide === slideCount - currentSlide ? 'none' : 'block',
//                     right: '10px',
//                     zIndex: '1',
//                 }}
//                 onClick={onClick}
//             ></div>
//         );
//     }

//     return (
//         <Container>
//             <Row className="mt-4 mb-4 d-flex align-items-center">
//                 <Form>
//                     <Form.Group as={Row} controlId="searchBar" className="search-bar">
//                         <Col lg={3}>
//                             <FormLabel>
//                                 <h4 className="popular-health-checkups">Popular health checkups</h4>
//                             </FormLabel>
//                         </Col>
//                         <Col lg={6}>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Search for Test..."
//                                 className="search-input"
//                                 autoComplete="off"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                             />
//                         </Col>
//                     </Form.Group>
//                 </Form>
//             </Row>

//             <Row className="mb-4">
//                 <Col>
//                     <div className="package-buttons" style={{ overflowX: 'auto' }}>
//                         {packages.map((packageType, index) => (
//                             <button
//                                 key={index}
//                                 className={`package-button ${selectedPackage === packageType ? 'active' : ''}`}
//                                 onClick={() => handlePackageSelection(packageType)}
//                             >
//                                 {packageType}
//                             </button>
//                         ))}
//                     </div>
//                 </Col>
//             </Row>

//             <Row>
//                 <Col>
//                     <Slider {...settings}>
//                         {filteredPackages.map((testPackage, index) => (
//                             <div key={index}>
//                                 <Card className="h-100 m-3 package-details">
//                                     <Card.Body>
//                                         <Card.Title style={{ fontSize: '18px' }}>{testPackage.packageName}</Card.Title>
//                                         <Card.Text style={{ color: '#757575', fontWeight: '600', fontSize: '16px' }}>
//                                             <p>Includes {testPackage.testDetails.length} Tests</p>
//                                         </Card.Text>
//                                         <Card.Text className="test-names-container h-100" style={{ fontSize: '16px', maxHeight: '100px', color: '#757575', fontWeight: '600' }}>
//                                             {testPackage.testDetails.slice(0, 3).map((test, index) => (
//                                                 <span key={index}>{test.testName}<br /></span>
//                                             ))}
//                                             {testPackage.testDetails.length > 3 && <span style={{ fontWeight: '700', fontSize: '16px' }}><b>+ More</b></span>}
//                                         </Card.Text>
//                                         <p style={{ color: '#757575', fontWeight: '600', fontSize: '16px' }}>Get report within {testPackage.reportTime}</p>
//                                         <p style={{ fontSize: '20px' }}>
//                                             <span> <b>₹ {testPackage.payableAmount}</b></span>
//                                             <span className="mx-2" style={{ color: '#757575', fontWeight: '600' }}>{testPackage.discountPercent > 0 ? <s>₹ {testPackage.totalAmount}</s> : <>&nbsp;</>}</span>
//                                         </p>
//                                         <p className='h-100'> {testPackage.discountPercent > 0 ? 

//                                             <span className="discount-percentage-box">{testPackage.discountPercent}% off</span>
//                                             :
//                                             <span className="discount-percentage-box" style={{border:'none', backgroundColor:'white', color:'white'}}><>&nbsp;</></span>

//                                         }
//                                         </p>
//                                         <Button className="add-to-chart w-100 mt-auto">ADD TO CART</Button>
//                                     </Card.Body>
//                                 </Card>
//                             </div>
//                         ))}
//                     </Slider>
//                 </Col>
//             </Row>
//         </Container>
//     );
// }

// export default Content;

//done 2
// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Form, Card, Button, FormLabel } from 'react-bootstrap';
// import Slider from 'react-slick';
// import './Content.css'; // Import custom CSS for styling
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { ref, onValue } from 'firebase/database';
// import { db } from '../../../../Firebase/Firebase'; // Adjust the path as per your project structure

// function Content() {
//     const packages = [
//         'All Packages',
//         'Fever',
//         'Women Health',
//         'Diabetes',
//         'Fitness',
//         'Covid 19',
//         'Senior Citizen',
//         'Lifestyle Habits',
//         'Full Body Check Up'
//     ];
//     const [testPackages, setTestPackages] = useState([]);
//     const [selectedPackage, setSelectedPackage] = useState('All Packages');
//     const [searchQuery, setSearchQuery] = useState('');
//     const [showResults, setShowResults] = useState(false);
//     const [searchResults, setSearchResults] = useState([]);
//     const [sliderKey, setSliderKey] = useState(0);


//     useEffect(() => {
//         const testPackagesRef = ref(db, 'testPackages');
//         const unsubscribe = onValue(testPackagesRef, (snapshot) => {
//             const data = snapshot.val();
//             if (data) {
//                 const testPackagesList = Object.entries(data).map(([id, packageData]) => ({ id, ...packageData }));
//                 setTestPackages(testPackagesList);
//             } else {
//                 setTestPackages([]);
//             }
//         });

//         return () => {
//             unsubscribe();
//         };
//     }, []);

//     useEffect(() => {
//         if (searchQuery.trim() !== '') {
//             const filteredResults = testPackages.filter(testPackage =>
//                 testPackage.packageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 testPackage.testDetails.some(test => test.testName.toLowerCase().includes(searchQuery.toLowerCase()))
//             );
//             setSearchResults(filteredResults);
//             setShowResults(true);
//         } else {
//             setShowResults(false);
//         }
//     }, [searchQuery, testPackages]);

//     const handlePackageSelection = (packageType) => {
//         setSelectedPackage(packageType === selectedPackage ? 'All Packages' : packageType);
//         // Restart the slider by changing the key
//         setSliderKey(sliderKey + 1);
//     };

//     const settings = {
//         key: sliderKey, // Add key to restart the slider
//         dots: false,
//         infinite: false,
//         speed: 500,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         nextArrow: <SampleNextArrow />,
//         prevArrow: <SamplePrevArrow />,
//     };

//     function SamplePrevArrow(props) {
//         const { className, style, onClick } = props;
//         return (
//             <div
//                 className={className}
//                 style={{ ...style, display: props.currentSlide === 0 ? 'none' : 'block', left: '-28px', zIndex: '1' }}
//                 onClick={onClick}
//             ></div>
//         );
//     }

//     function SampleNextArrow(props) {
//         const { className, style, onClick, currentSlide, slideCount } = props;
//         return (
//             <div
//                 className={className}
//                 style={{
//                     ...style,
//                     display: currentSlide === slideCount - 1 ? 'none' : 'block',
//                     right: '10px',
//                     zIndex: '1',
//                 }}
//                 onClick={onClick}
//             ></div>
//         );
//     }

//     return (
//         <Container>
//             <Row className="mt-4 mb-4 d-flex align-items-center">
//                 <Form>
//                     <Form.Group as={Row} controlId="searchBar" className="search-bar">
//                         <Col lg={3}>
//                             <FormLabel>
//                                 <h4 className="popular-health-checkups">Popular health checkups</h4>
//                             </FormLabel>
//                         </Col>
//                         <Col lg={6}>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Search for Test..."
//                                 className="search-input"
//                                 autoComplete="off"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                             />
//                             {showResults && (
//                                 <div className="search-results">
//                                     {searchResults.length > 0 ? (
//                                         <ul>
//                                             {searchResults.map((result, index) => (
//                                                 <li key={index}>{result.packageName}</li>
//                                             ))}
//                                         </ul>
//                                     ) : (
//                                         <p>No results found</p>
//                                     )}
//                                 </div>
//                             )}
//                         </Col>
//                     </Form.Group>
//                 </Form>
//             </Row>

//             <Row className="mb-4">
//                 <Col>
//                     <div className="package-buttons" style={{ overflowX: 'auto' }}>
//                         {packages.map((packageType, index) => (
//                             <button
//                                 key={index}
//                                 className={`package-button ${selectedPackage === packageType ? 'active' : ''}`}
//                                 onClick={() => handlePackageSelection(packageType)}
//                             >
//                                 {packageType}
//                             </button>
//                         ))}
//                     </div>
//                 </Col>
//             </Row>

//             <Row>
//                 <Col>
//                     <Slider {...settings}>
//                         {testPackages
//                             .filter(testPackage => selectedPackage === 'All Packages' || testPackage.selectedCategory === selectedPackage)
//                             .map((testPackage, index) => (
//                                 <div key={index}>
//                                     <Card className="h-100 m-3 package-details d-flex flex-wrap">
//                                         <Card.Body>
//                                             <Card.Title style={{ fontSize: '18px' }}>{testPackage.packageName}</Card.Title>
//                                             <Card.Text style={{ color: '#757575', fontWeight: '600', fontSize: '16px' }}>
//                                                 <p>Includes {testPackage.testDetails.length} Tests</p>
//                                             </Card.Text>
//                                             <Card.Text className="test-names-container h-100" style={{ fontSize: '16px', maxHeight: '100px', color: '#757575', fontWeight: '600' }}>
//                                                 {testPackage.testDetails.slice(0, 3).map((test, index) => (
//                                                     <span key={index}>{test.testName}<br /></span>
//                                                 ))}
//                                                 {testPackage.testDetails.length > 3 && <span style={{ fontWeight: '700', fontSize: '16px' }}><b>+ More</b></span>}
//                                             </Card.Text>
//                                             <p style={{ color: '#757575', fontWeight: '600', fontSize: '16px' }}>Get report within {testPackage.reportTime}</p>
//                                             <p style={{ fontSize: '20px' }}>
//                                                 <span> <b>₹ {testPackage.payableAmount}</b></span>
//                                                 <span className="mx-2" style={{ color: '#757575', fontWeight: '600' }}>{testPackage.discountPercent > 0 ? <s>₹ {testPackage.totalAmount}</s> : <>&nbsp;</>}</span>
//                                             </p>
//                                             <p className='h-100'> {testPackage.discountPercent > 0 ?
//                                                 <span className="discount-percentage-box">{testPackage.discountPercent}% off</span>
//                                                 :
//                                                 <span className="discount-percentage-box" style={{ border: 'none', backgroundColor: 'white', color: 'white' }}><>&nbsp;</></span>
//                                             }
//                                             </p>
//                                             <Button className="add-to-chart w-100 mt-auto">ADD TO CART</Button>
//                                         </Card.Body>
//                                     </Card>
//                                 </div>
//                             ))}
//                     </Slider>
//                 </Col>
//             </Row>
//         </Container>
//     );
// }

// export default Content;

//done
// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Form, Card, Button, FormLabel } from 'react-bootstrap';
// import Slider from 'react-slick';
// import './Content.css'; // Import custom CSS for styling
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { ref, onValue } from 'firebase/database';
// import { db } from '../../../../Firebase/Firebase'; // Adjust the path as per your project structure
// import { Link } from 'react-router-dom'; // Import Link for navigation

// function Content() {
//     const packages = [
//         'All Packages',
//         'Fever',
//         'Women Health',
//         'Diabetes',
//         'Fitness',
//         'Covid 19',
//         'Senior Citizen',
//         'Lifestyle Habits',
//         'Full Body Check Up'
//     ];
//     const [testPackages, setTestPackages] = useState([]);
//     const [selectedPackage, setSelectedPackage] = useState('All Packages');
//     const [searchQuery, setSearchQuery] = useState('');
//     const [showResults, setShowResults] = useState(false);
//     const [searchResults, setSearchResults] = useState([]);
//     const [sliderKey, setSliderKey] = useState(0);

//     useEffect(() => {
//         const testPackagesRef = ref(db, 'testPackages');
//         const unsubscribe = onValue(testPackagesRef, (snapshot) => {
//             const data = snapshot.val();
//             if (data) {
//                 const testPackagesList = Object.entries(data).map(([id, packageData]) => ({ id, ...packageData }));
//                 setTestPackages(testPackagesList);
//             } else {
//                 setTestPackages([]);
//             }
//         });

//         return () => {
//             unsubscribe();
//         };
//     }, []);


//     useEffect(() => {
//         if (searchQuery.trim() !== '') {
//             const filteredResults = testPackages.filter(testPackage =>
//                 testPackage.packageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 testPackage.testDetails.some(test => test.testName.toLowerCase().includes(searchQuery.toLowerCase()))
//             );
//             setSearchResults(filteredResults);
//             setShowResults(true);
//         } else {
//             setShowResults(false);
//         }
//     }, [searchQuery, testPackages]);

//     const handlePackageSelection = (packageType) => {
//         setSelectedPackage(packageType === selectedPackage ? 'All Packages' : packageType);
//         // Restart the slider by changing the key
//         setSliderKey(sliderKey + 1);
//     };

//     const settings = {
//         key: sliderKey, // Add key to restart the slider
//         dots: false,
//         infinite: false,
//         speed: 500,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         nextArrow: <SampleNextArrow />,
//         prevArrow: <SamplePrevArrow />,
//     };

//     function SamplePrevArrow(props) {
//         const { className, style, onClick } = props;
//         return (
//             <div
//                 className={className}
//                 style={{ ...style, display: props.currentSlide === 0 ? 'none' : 'block', left: '-28px', zIndex: '1' }}
//                 onClick={onClick}
//             ></div>
//         );
//     }

//     function SampleNextArrow(props) {
//         const { className, style, onClick, currentSlide, slideCount } = props;
//         return (
//             <div
//                 className={className}
//                 style={{
//                     ...style,
//                     display: currentSlide === slideCount - 1 ? 'none' : 'block',
//                     right: '10px',
//                     zIndex: '1',
//                 }}
//                 onClick={onClick}
//             ></div>
//         );
//     }

//     return (
//         <Container>
//             <Row className="mt-4 mb-4 d-flex align-items-center">
//                 <Form>
//                     <Form.Group as={Row} controlId="searchBar" className="search-bar">
//                         <Col lg={3}>
//                             <FormLabel>
//                                 <h4 className="popular-health-checkups">Popular health checkups</h4>
//                             </FormLabel>
//                         </Col>
//                         <Col lg={6}>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Search for Test..."
//                                 className="search-input"
//                                 autoComplete="off"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                             />
//                             {showResults && (
//                                 <div className="search-results">
//                                     {searchResults.length > 0 ? (
//                                         <ul>
//                                             {searchResults.map((result, index) => (
//                                                 <li key={index}>{result.packageName}</li>
//                                             ))}
//                                         </ul>
//                                     ) : (
//                                         <p>No results found</p>
//                                     )}
//                                 </div>
//                             )}
//                         </Col>
//                     </Form.Group>
//                 </Form>
//             </Row>

//             <Row className="mb-4">
//                 <Col>
//                     <div className="package-buttons" style={{ overflowX: 'auto' }}>
//                         {packages.map((packageType, index) => (
//                             <button
//                                 key={index}
//                                 className={`package-button ${selectedPackage === packageType ? 'active' : ''}`}
//                                 onClick={() => handlePackageSelection(packageType)}
//                             >
//                                 {packageType}
//                             </button>
//                         ))}
//                     </div>
//                 </Col>
//             </Row>

//             <Row>
//                 <Col>
//                     <Slider {...settings}>
//                         {testPackages
//                             .filter(testPackage => selectedPackage === 'All Packages' || testPackage.selectedCategory === selectedPackage)
//                             .map((testPackage, index) => (
//                                 <div key={index}>
//                                     <Link to={`/package-details/${testPackage.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//                                         <Card className="h-100 m-3 package-details d-flex flex-wrap">
//                                             <Card.Body>
//                                                 <Card.Title style={{ fontSize: '18px' }}>{testPackage.packageName}</Card.Title>
//                                                 <Card.Text style={{ color: '#757575', fontWeight: '600', fontSize: '16px' }}>
//                                                     <p>Includes {testPackage.testDetails.length} Tests</p>
//                                                 </Card.Text>
//                                                 <Card.Text className="test-names-container h-100" style={{ fontSize: '16px', maxHeight: '100px', color: '#757575', fontWeight: '600' }}>
//                                                     {testPackage.testDetails.slice(0, 3).map((test, index) => (
//                                                         <span key={index}>{test.testName}<br /></span>
//                                                     ))}
//                                                     {testPackage.testDetails.length > 3 && <span style={{ fontWeight: '700', fontSize: '16px' }}><b>+ More</b></span>}
//                                                 </Card.Text>
//                                                 <p style={{ color: '#757575', fontWeight: '600', fontSize: '16px' }}>Get report within {testPackage.reportTime}</p>
//                                                 <p style={{ fontSize: '20px' }}>
//                                                     <span> <b>₹ {testPackage.payableAmount}</b></span>
//                                                     <span className="mx-2" style={{ color: '#757575', fontWeight: '600' }}>{testPackage.discountPercent > 0 ? <s>₹ {testPackage.totalAmount}</s> : <>&nbsp;</>}</span>
//                                                 </p>
//                                                 <p className='h-100'> {testPackage.discountPercent > 0 ?
//                                                     <span className="discount-percentage-box">{testPackage.discountPercent}% off</span>
//                                                     :
//                                                     <span className="discount-percentage-box" style={{ border: 'none', backgroundColor: 'white', color: 'white' }}><>&nbsp;</></span>
//                                                 }
//                                                 </p>
//                                                 <Button className="add-to-chart w-100 mt-auto">ADD TO CART</Button>
//                                             </Card.Body>
//                                         </Card>
//                                     </Link>
//                                 </div>
//                             ))}
//                     </Slider>
//                 </Col>
//             </Row>
//         </Container>
//     );
// }

// export default Content;

// Content.js done
// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Form, Card, Button, FormLabel } from 'react-bootstrap';
// import Slider from 'react-slick';
// import './Content.css';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { ref, onValue } from 'firebase/database';
// import { db } from '../../../../Firebase/Firebase';
// import { Link } from 'react-router-dom';
// import { useCart } from '../../Cart/CartContext';
// import { FaCheckCircle } from 'react-icons/fa';
// function Content() {
//     const packages = [
//         'All Packages',
//         'Fever',
//         'Women Health',
//         'Diabetes',
//         'Fitness',
//         'Covid 19',
//         'Senior Citizen',
//         'Lifestyle Habits',
//         'Full Body Check Up'
//     ];
//     const [testPackages, setTestPackages] = useState([]);
//     const [selectedPackage, setSelectedPackage] = useState('All Packages');
//     const [searchQuery, setSearchQuery] = useState('');
//     const [showResults, setShowResults] = useState(false);
//     const [searchResults, setSearchResults] = useState([]);
//     const [sliderKey, setSliderKey] = useState(0);
//     const { addToCart, cartItems } = useCart();



//     useEffect(() => {
//         const testPackagesRef = ref(db, 'testPackages');
//         const unsubscribe = onValue(testPackagesRef, (snapshot) => {
//             const data = snapshot.val();
//             if (data) {
//                 const testPackagesList = Object.entries(data).map(([id, packageData]) => ({ id, ...packageData }));
//                 setTestPackages(testPackagesList);
//             } else {
//                 setTestPackages([]);
//             }
//         });

//         return () => {
//             unsubscribe();
//         };
//     }, []);

//     useEffect(() => {
//         if (searchQuery.trim() !== '') {
//             const filteredResults = testPackages.filter(testPackage =>
//                 testPackage.packageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 testPackage.testDetails.some(test => test.testName.toLowerCase().includes(searchQuery.toLowerCase()))
//             );
//             setSearchResults(filteredResults);
//             setShowResults(true);
//         } else {
//             setShowResults(false);
//         }
//     }, [searchQuery, testPackages]);

//     const handlePackageSelection = (packageType) => {
//         setSelectedPackage(packageType === selectedPackage ? 'All Packages' : packageType);
//         setSliderKey(sliderKey + 1);
//     };

//     const settings = {
//         key: sliderKey,
//         dots: false,
//         infinite: false,
//         speed: 500,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         nextArrow: <SampleNextArrow />,
//         prevArrow: <SamplePrevArrow />,
//         responsive: [
//             {
//                 breakpoint: 768,
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                 }
//             }
//         ]
//     };

//     function SamplePrevArrow(props) {
//         const { className, style, onClick } = props;
//         return (
//             <div
//                 className={className}
//                 style={{ ...style, display: props.currentSlide === 0 ? 'none' : 'block', left: '-28px', zIndex: '1' }}
//                 onClick={onClick}
//             ></div>
//         );
//     }

//     function SampleNextArrow(props) {
//         const { className, style, onClick, currentSlide, slideCount } = props;
//         return (
//             <div
//                 className={className}
//                 style={{
//                     ...style,
//                     display: currentSlide === slideCount - 1 ? 'none' : 'block',
//                     right: '10px',
//                     zIndex: '1',
//                 }}
//                 onClick={onClick}
//             ></div>
//         );
//     }

//     // Function to add item to cart and store it in localStorage
//     const addToCartAndStore = (item) => {
//         // Check if the item is already in the cart
//         const isItemAdded = cartItems.some(cartItem => cartItem.id === item.id);
//         if (isItemAdded) {
//             return; // If item is already in cart, exit the function
//         }

//         // Add item to cart
//         addToCart(item);

//         // Store item in localStorage
//         localStorage.setItem('cartItems', JSON.stringify([...cartItems, item]));
//     };


//     return (
//         <Container>
//             <Row className="mt-4 mb-4 d-flex align-items-center">
//                 <Form>
//                     <Form.Group as={Row} controlId="searchBar" className="search-bar">
//                         <Col lg={3}>
//                             <FormLabel>
//                                 <h4 className="popular-health-checkups">Popular health checkups</h4>
//                             </FormLabel>
//                         </Col>
//                         <Col lg={6}>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Search for Test..."
//                                 className="search-input"
//                                 autoComplete="off"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                             />
//                             {showResults && (
//                                 <div className="search-results">
//                                     {searchResults.length > 0 ? (
//                                         <ul>
//                                             {searchResults.map((result, index) => (
//                                                 <li key={index}>{result.packageName}</li>
//                                             ))}
//                                         </ul>
//                                     ) : (
//                                         <p>No results found</p>
//                                     )}
//                                 </div>
//                             )}
//                         </Col>
//                     </Form.Group>
//                 </Form>
//             </Row>

//             <Row className="mb-4">
//                 <Col>
//                     <div className="package-buttons" style={{ overflowX: 'auto' }}>
//                         {packages.map((packageType, index) => (
//                             <button
//                                 key={index}
//                                 className={`package-button ${selectedPackage === packageType ? 'active' : ''}`}
//                                 onClick={() => handlePackageSelection(packageType)}
//                             >
//                                 {packageType}
//                             </button>
//                         ))}
//                     </div>
//                 </Col>
//             </Row>

//             <Row>
//                 <Col>
//                     <Slider {...settings}>
//                         {testPackages
//                             .filter(testPackage => selectedPackage === 'All Packages' || testPackage.selectedCategory === selectedPackage)
//                             .map((testPackage, index) => (
//                                 <div key={index}>
//                                     <Link to={`/package-details/${testPackage.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//                                         <Card className="h-100 m-3 package-details d-flex flex-wrap">
//                                             <Card.Body>
//                                                 <Card.Title style={{ fontSize: '18px' }}>{testPackage.packageName}</Card.Title>
//                                                 <Card.Text style={{ color: '#757575', fontWeight: '600', fontSize: '16px' }}>
//                                                     <p>Includes {testPackage.testDetails.length} Tests</p>
//                                                 </Card.Text>
//                                                 <Card.Text className="test-names-container h-100" style={{ fontSize: '16px', maxHeight: '100px', color: '#757575', fontWeight: '600' }}>
//                                                     {testPackage.testDetails.slice(0, 3).map((test, index) => (
//                                                         <span key={index}>{test.testName}<br /></span>
//                                                     ))}
//                                                     {testPackage.testDetails.length > 3 && <span style={{ fontWeight: '700', fontSize: '16px' }}><b>+ More</b></span>}
//                                                 </Card.Text>
//                                                 <p style={{ color: '#757575', fontWeight: '600', fontSize: '16px' }}>Get report within {testPackage.reportTime}</p>
//                                                 <p style={{ fontSize: '20px' }}>
//                                                     <span> <b>₹ {testPackage.payableAmount}</b></span>
//                                                     <span className="mx-2" style={{ color: '#757575', fontWeight: '600' }}>{testPackage.discountPercent > 0 ? <s>₹ {testPackage.totalAmount}</s> : <>&nbsp;</>}</span>
//                                                 </p>
//                                                 <p className='h-100'> {testPackage.discountPercent > 0 ?
//                                                     <span className="discount-percentage-box">{testPackage.discountPercent}% off</span>
//                                                     :
//                                                     <span className="discount-percentage-box" style={{ border: 'none', backgroundColor: 'white', color: 'white' }}><>&nbsp;</></span>
//                                                 }
//                                                 </p>
//                                                 {/* Change button text and style based on whether item is in cart */}

//                                                 <Button
//                                                     as={Link}
//                                                     to={cartItems.some(cartItem => cartItem.id === testPackage.id) ? "/cart" : ""}
//                                                     variant={cartItems.some(cartItem => cartItem.id === testPackage.id) ? "success" : "primary"}
//                                                     className={`w-100 mt-auto ${cartItems.some(cartItem => cartItem.id === testPackage.id) ? "go-to-cart" : "add-to-cart"}`}
//                                                     onClick={() => addToCartAndStore(testPackage)}
//                                                 >
//                                                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                                                         {cartItems.some(cartItem => cartItem.id === testPackage.id) ? (
//                                                             <>
//                                                                 <FaCheckCircle style={{ marginRight: '5px' }} />
//                                                                 <span>GO TO CART</span>
//                                                             </>
//                                                         ) : (
//                                                             <span>ADD TO CART</span>
//                                                         )}
//                                                     </div>
//                                                 </Button>

//                                             </Card.Body>
//                                         </Card>
//                                     </Link>
//                                 </div>
//                             ))}
//                     </Slider>
//                 </Col>
//             </Row>
//         </Container>
//     );
// }

// export default Content;




// responsive done
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Card, Button, FormLabel } from 'react-bootstrap';
import Slider from 'react-slick';
import './Content.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../../Firebase/Firebase';
import { Link } from 'react-router-dom';
import { useCart } from '../../Cart/CartContext';
import { FaCheckCircle } from 'react-icons/fa';

function Content() {
    const packages = [
        'All Packages',
        'Fever',
        'Women Health',
        'Diabetes',
        'Fitness',
        'Covid 19',
        'Senior Citizen',
        'Lifestyle Habits',
        'Full Body Check Up'
    ];
    const [testPackages, setTestPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState('All Packages');
    const [searchQuery, setSearchQuery] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [sliderKey, setSliderKey] = useState(0);
    const { addToCart, cartItems } = useCart();

    useEffect(() => {
        const testPackagesRef = ref(db, 'testPackages');
        const unsubscribe = onValue(testPackagesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const testPackagesList = Object.entries(data).map(([id, packageData]) => ({ id, ...packageData }));
                setTestPackages(testPackagesList);
            } else {
                setTestPackages([]);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (searchQuery.trim() !== '') {
            const filteredResults = testPackages.filter(testPackage =>
                testPackage.packageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                testPackage.testDetails.some(test => test.testName.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            setSearchResults(filteredResults);
            setShowResults(true);
        } else {
            setShowResults(false);
        }
    }, [searchQuery, testPackages]);

    const handlePackageSelection = (packageType) => {
        setSelectedPackage(packageType === selectedPackage ? 'All Packages' : packageType);
        setSliderKey(sliderKey + 1);
    };

    const settings = {
        key: sliderKey,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: props.currentSlide === 0 ? 'none' : 'block', left: '-28px', zIndex: '1' }}
                onClick={onClick}
            ></div>
        );
    }

    function SampleNextArrow(props) {
        const { className, style, onClick, currentSlide, slideCount } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: currentSlide === slideCount - 1 ? 'none' : 'block',
                    right: '10px',
                    zIndex: '1',
                }}
                onClick={onClick}
            ></div>
        );
    }

    // Function to add item to cart and store it in localStorage
    const addToCartAndStore = (item) => {
        // Check if the item is already in the cart
        const isItemAdded = cartItems.some(cartItem => cartItem.id === item.id);
        if (isItemAdded) {
            return; // If item is already in cart, exit the function
        }

        // Add item to cart
        addToCart(item);

        // Store item in localStorage
        localStorage.setItem('cartItems', JSON.stringify([...cartItems, item]));
    };

    return (
        <Container>
            <Row className="mt-4 mb-4 d-flex align-items-center">
                <Form>
                    <Form.Group as={Row} controlId="searchBar" className="search-bar">
                        <Col lg={3}>
                            <FormLabel>
                                <h4 className="popular-health-checkups">Popular health checkups</h4>
                            </FormLabel>
                        </Col>
                        <Col lg={6}>
                            <Form.Control
                                type="text"
                                placeholder="Search for Test..."
                                className="search-input"
                                autoComplete="off"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {showResults && (
                                <div className="search-results">
                                    {searchResults.length > 0 ? (
                                        <ul>
                                            {searchResults.map((result, index) => (
                                                <li key={index}>{result.packageName}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No results found</p>
                                    )}
                                </div>
                            )}
                        </Col>
                    </Form.Group>
                </Form>
            </Row>

            <Row className="mb-4">
                <Col>
                    <div className="package-buttons" style={{ overflowX: 'auto' }}>
                        {packages.map((packageType, index) => (
                            <button
                                key={index}
                                className={`package-button ${selectedPackage === packageType ? 'active' : ''}`}
                                onClick={() => handlePackageSelection(packageType)}
                            >
                                {packageType}
                            </button>
                        ))}
                    </div>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Slider {...settings}>
                        {testPackages
                            .filter(testPackage => selectedPackage === 'All Packages' || testPackage.selectedCategory === selectedPackage)
                            .map((testPackage, index) => (
                                <Col key={index} lg={4} md={6} sm={12} className="mb-3">
                                    <Link to={`/package-details/${testPackage.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Card className="h-100 package-details m-3">
                                            <Card.Body>
                                                <Card.Title style={{ fontSize: '18px' }}>{testPackage.packageName}</Card.Title>
                                                <Card.Text style={{ color: '#757575', fontWeight: '600', fontSize: '16px' }}>
                                                    <p>Includes {testPackage.testDetails.length} Tests</p>
                                                </Card.Text>
                                                <Card.Text className="test-names-container h-100" style={{ fontSize: '16px', maxHeight: '100px', color: '#757575', fontWeight: '600' }}>
                                                    {testPackage.testDetails.slice(0, 3).map((test, index) => (
                                                        <span key={index}>{test.testName}<br /></span>
                                                    ))}
                                                    {testPackage.testDetails.length > 3 && <span style={{ fontWeight: '700', fontSize: '16px' }}><b>+ More</b></span>}
                                                </Card.Text>
                                                <p style={{ color: '#757575', fontWeight: '600', fontSize: '16px' }}>Get report within {testPackage.reportTime}</p>
                                                <p style={{ fontSize: '20px' }}>
                                                    <span> <b>₹ {testPackage.payableAmount}</b></span>
                                                    <span className="mx-2" style={{ color: '#757575', fontWeight: '600' }}>{testPackage.discountPercent > 0 ? <s>₹ {testPackage.totalAmount}</s> : <>&nbsp;</>}</span>
                                                </p>
                                                <p className='h-100'> {testPackage.discountPercent > 0 ?
                                                    <span className="discount-percentage-box">{testPackage.discountPercent}% off</span>
                                                    :
                                                    <span className="discount-percentage-box" style={{ border: 'none', backgroundColor: 'white', color: 'white' }}><>&nbsp;</></span>
                                                }
                                                </p>
                                                <Button
                                                    as={Link}
                                                    to={cartItems.some(cartItem => cartItem.id === testPackage.id) ? "/cart" : ""}
                                                    variant={cartItems.some(cartItem => cartItem.id === testPackage.id) ? "success" : "primary"}
                                                    className={`w-100 mt-auto ${cartItems.some(cartItem => cartItem.id === testPackage.id) ? "go-to-cart" : "add-to-cart"}`}
                                                    onClick={() => addToCartAndStore(testPackage)}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        {cartItems.some(cartItem => cartItem.id === testPackage.id) ? (
                                                            <>
                                                                <FaCheckCircle style={{ marginRight: '5px' }} />
                                                                <span>GO TO CART</span>
                                                            </>
                                                        ) : (
                                                            <span>ADD TO CART</span>
                                                        )}
                                                    </div>
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                            ))}
                    </Slider>
                </Col>
            </Row>
        </Container>
    );
}

export default Content;




