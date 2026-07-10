import { db } from "./firebase.js";

import {
    collection,
    onSnapshot
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




function showTrips() {


    const tripsRef = collection(db,"trips");


    onSnapshot(tripsRef,(snapshot)=>{


        tripDiv.innerHTML = "";


        snapshot.forEach((document)=>{


            const trip = document.data();

            const tripId = document.id;


            tripDiv.innerHTML += `

            <div class="day">

                <h2>${trip.title}</h2>

                <p>${trip.description || ""}</p>


                <button onclick="openTrip('${tripId}')">
                    Open Trip →
                </button>


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