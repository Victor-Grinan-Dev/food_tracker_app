import { FetchWrapper } from './fetch_wrapper.js';
import Chart from 'chart.js/auto';
import snackbar from "snackbar";
import "snackbar/dist/snackbar.min.css";

const url = "https://firestore.googleapis.com/v1/projects/programmingjs-90a13/databases/(default)/documents/";
const endpoint = "victor1";

const enterBtn = document.querySelector("#enter");
const cardFrame = document.querySelector("#cardFrame");

const ctx = document.getElementById('chart');
let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Protein', 'Carbs', 'Fat'],
        datasets: [{
            label: 'g',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const API = new FetchWrapper(url);

const getData  = () => {
    API.get(endpoint).then(data => {
        data.documents.forEach(item =>{

            cardFrame.insertAdjacentHTML('beforeend', 
            `<div class="card">
            <h1 class="food-name">${item.fields.foodName.stringValue}</h1>
            <div class="card-values">
                <div>
                    <p class="protein">Protein: </p>
                    <p class="carbs">Carbs: </p>
                    <p class="fat">fat: </p>
                </div>
                <div>
                    <p> ${item.fields.protein.integerValue} </p>
                    <p> ${item.fields.carbs.integerValue} </p>
                    <p> ${item.fields.fat.integerValue} </p>
                </div>                   
            </div>
        </div> 
            `)

            console.log(item.fields.foodName.stringValue, item.fields.protein.integerValue, item.fields.fat.integerValue, item.fields.carbs.integerValue);
        });
    });
}

const postData = () => {

    let foodName = document.querySelector("#newFood").value;
    let protein = document.querySelector("#protein").value;
    let carbs = document.querySelector("#carbs").value;
    let fat = document.querySelector("#fat").value;
    
    //console.log(false && true)
    console.log(Boolean(foodName) && Boolean(protein) && Boolean(carbs) && Boolean(fat))

    if (foodName && protein && carbs && fat){
       
        const body = {
            fields: {
              foodName: {
                stringValue: foodName,
              },
              carbs: {
                integerValue: protein,
              },
              protein: {
                integerValue: carbs,
              },
              fat: {
                integerValue: fat,
              },               
            },
        }

        API.post(endpoint, body);
        snackbar.show('${foodName} added')
        getData()

    }

}

snackbar.show("Systems online!");
enterBtn.addEventListener("click", getData);