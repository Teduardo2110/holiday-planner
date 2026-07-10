import { db } from "./firebase.js";

import {
    collection,
    onSnapshot,
    doc,
    getDoc,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


const tripDiv = document.getElementById("trip");


// Check URL for selected trip

const params = new URLSearchParams(window.location.search);

const selectedTrip = params.get("trip");


// If no trip selected, show trip list

if (!selectedTrip) {

    showTrips();

} else {

    showTrip(selectedTrip);

}




async function showTrip(tripId){


    tripDiv.innerHTML = `
        <h2>Loading trip...</h2>
    `;


    // Load trip information

    const tripDoc = await getDoc(
        doc(db,"trips",tripId)
    );


    if(!tripDoc.exists()){

        tripDiv.innerHTML = `
            <h2>Trip not found</h2>
        `;

        return;
    }


    const trip = tripDoc.data();



    tripDiv.innerHTML = `

        <div class="day">

            <h2>${trip.title}</h2>

            <p>
            ${trip.description || ""}
            </p>

            <button onclick="window.location.href='?'">
                ← Back to Trips
            </button>

        </div>


        <div id="days"></div>

    `;



    const daysDiv = document.getElementById("days");



    const daysRef = collection(
        db,
        "trips",
        tripId,
        "days"
    );


    const daysQuery = query(
        daysRef,
        orderBy("order")
    );



    onSnapshot(daysQuery,(snapshot)=>{


        daysDiv.innerHTML="";


        snapshot.forEach((dayDoc)=>{


            const day = dayDoc.data();



            daysDiv.innerHTML += `

            <div class="day">


                <h2>
                    ${day.title}
                </h2>


                ${(day.activities || []).map(activity=>`

                    <div class="activity">
                        ✦ ${activity}
                    </div>

                `).join("")}


            </div>


            `;


        });


    });


}




window.openTrip = function(tripId){


    window.location.href =
    `?trip=${tripId}`;


};





function showTrip(tripId){


    tripDiv.innerHTML = `

    <h2>Loading trip...</h2>

    `;


    // Temporary message for now

    tripDiv.innerHTML = `

    <div class="day">

        <h2>${tripId}</h2>

        <p>Trip loading will be added next 🚀</p>

        <button onclick="window.location.href='?'">
            ← Back to Trips
        </button>

    </div>

    `;


}