
import React from 'react'
import './about_us.css'
import { Card } from 'react-bootstrap';
export default function AboutUs (){


    return (

        <>
        <div className="about_us_parant">

            <div className="about_us_cheldren">

                 <p><span>A</span>bout <span id = "us">us</span> </p>           
 
            </div>

            <div className = "about_us_cheldren2">

                <p>Our website specializes in booking more than one category , Allows the user to book according to the category available through our website</p>
            </div>


        </div>

        <div className="our-team">
        <h1>our team</h1>
        <p>Our website specializes in booking more than one category , Allows the user to book according to the category available through our website</p>


        </div>

        <div className="card_parant">
             <div className="card_chelren">
                 <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="https://scontent.famm3-2.fna.fbcdn.net/v/t1.6435-9/30441617_1824784334250802_1734354716642508800_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeFBqhkzq1ASjfgJjlh7hEHpLXL7JfXS5ywtcvsl9dLnLJ5hyLMw1q9Jyl9zw8rdDr_pDi9n8-kxQ6tu6POHH6_7&_nc_ohc=50QDxD2VxN0AX9i7SM0&_nc_ht=scontent.famm3-2.fna&oh=91c1cb7ebb424a1adddb5c0ad9e9f298&oe=60EB58D0" />
  <Card.Body>
    <Card.Title>firas diab</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
</Card>
             </div>
             <div className="card_chelren">
                 <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="https://scontent.famm3-3.fna.fbcdn.net/v/t1.6435-9/163228857_3901115089976079_5287367394491665865_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeHyiJeoRy04lXaWqhf42skoNGuAZI7RF9I0a4BkjtEX0m7coiwBYOfJltPcvaFwY-ijsJZeeNFTeV-rvOPCBGYa&_nc_ohc=mdK1R3wuBHoAX-mw70Y&_nc_ht=scontent.famm3-3.fna&oh=c64a36e6b35a7468fb79d3c097262746&oe=60EBBFB7" />
  <Card.Body>
    <Card.Title>loay issa</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
</Card>
             </div>
             <div className="card_chelren">
                 <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="https://scontent.famm3-3.fna.fbcdn.net/v/t1.18169-9/11071720_1172850646074293_4051102727768197061_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeF3k-Ea0aI26LaZJ3-b8W6OlyK-POGxgsiXIr484bGCyEo4cHnNrx-b0CL6eK__RmeLHwxMMg4HAjKL_2Vx0iZf&_nc_ohc=T7AsiVm8CqAAX8QU2Ee&_nc_ht=scontent.famm3-3.fna&oh=036d198cab5075b0966a577e6937d6a9&oe=60EC03EB" />
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
</Card>
             </div>
             <div className="card_chelren">
                <Card style={{ width: '20rem' }}>
  <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Steve_Jobs_Headshot_2010-CROP2.jpg/1200px-Steve_Jobs_Headshot_2010-CROP2.jpg" />
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
</Card> 
             </div>

        </div>
        </>
    )

}