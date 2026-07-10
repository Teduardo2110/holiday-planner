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


const params = new URLSearchParams(window.location.search);

const selectedTrip = params.get("trip");


if (selectedTrip) {

    showTrip(selectedTrip);

} else {

    showTrips();

}




function showTrips() {


    const tripsRef = collection(db,"trips");


    onSnapshot(tripsRef,(snapshot)=>{


        tripDiv.innerHTML = "";


        snapshot.forEach((document)=>{


            const trip = document.data();


            tripDiv.innerHTML += `

            <div class="day">

                <h2>${trip.title}</h2>

                <p>
                    ${trip.description || ""}
                </p>

                <button onclick="openTrip('${document.id}')">
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





async function showTrip(tripId){


    tripDiv.innerHTML = "Loading trip...";


    const tripSnap = await getDoc(
        doc(db,"trips",tripId)
    );


    if(!tripSnap.exists()){

        tripDiv.innerHTML="Trip not found";

        return;

    }


    const trip = tripSnap.data();



    tripDiv.innerHTML = `

        <div class="day">

            <h2>${trip.title}</h2>

            <p>${trip.description || ""}</p>

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

                <h2>${day.title}</h2>


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