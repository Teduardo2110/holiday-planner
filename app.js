import { db } from "./firebase.js";

import {
    collection,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


const tripDiv = document.getElementById("trip");


const tripsRef = collection(db,"trips");



onSnapshot(tripsRef,(snapshot)=>{


    tripDiv.innerHTML = "";


    snapshot.forEach((document)=>{


        const trip = document.data();

        const tripId = document.id;



        tripDiv.innerHTML += `


        <div class="day">


            <h2>${trip.title}</h2>


            <p>
                ${trip.description || ""}
            </p>


            <button onclick="openTrip('${tripId}')">
                Open Trip →
            </button>


        </div>


        `;


    });


});



window.openTrip = function(tripId){


    window.location.href =
    `?trip=${tripId}`;


};