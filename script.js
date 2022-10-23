// <--- Declaring a Variable ---> //

let searchBtn = document.getElementById("IdSearchBtn");
let countryIp = document.getElementById("IdCountryNameIp");
let resultDiv = document.getElementsByClassName("result")[0];

// <--- Click On Search Btn ---> //
searchBtn.addEventListener('click', () => {

    let countryName = countryIp.value;
    setTimeout(() => {
        countryIp.value = "";
    }, 5000);

    let CountryNameURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(CountryNameURL)
        .then((response) => response.json())
        .then((data) => {
            
            // -> Populate In a Html //

            let countryNames = data[0]["name"]["common"];
            let capital = data[0]["capital"][0];
            let countryFlagUrl = data[0]["flags"]["svg"];
            let countryContinient = data[0]["continents"][0];
            let countryCurrencies = Object.keys(data[0].currencies)[0];
            let currenciesName = data[0]["currencies"][`${countryCurrencies}`]["name"]
            let countryLanguage = Object.values(data[0].languages).join(", ");


            let resultHtml = `
           <img src="${countryFlagUrl}" alt="${countryNames}" class="flag-img" >
            
           <h2>${countryNames}</h2>

           <div class="wrapper">

                       <div class="data-wrapper">
                          <h4>Capital : </h4>
                          <span>${capital}</span>
                       </div>

                       <div class="data-wrapper">
                          <h4>Continent : </h4>
                          <span>${countryContinient}</span>
                       </div>

                       <div class="data-wrapper">
                          <h4>Currency : </h4>
                          <span>${countryCurrencies}</span>
                       </div>

                       <div class="data-wrapper">
                          <h4>Currency Name : </h4>
                          <span>${currenciesName}</span>
                       </div>

                       <div class="data-wrapper">
                          <h4>Languages : </h4>
                          <span>${countryLanguage}</span>
                       </div>
           </div>
           `;

            resultDiv.innerHTML = resultHtml;

        }).catch((error) => {
            // console.log(error);

            let NotFindUrl="https://miro.medium.com/max/800/1*hFwwQAW45673VGKrMPE2qQ.png";

            let errorHtml=`
            <img src="${NotFindUrl}" alt="Not-Found !!!" class="flag-img" >
            `;

            resultDiv.innerHTML = errorHtml;


        });


});
