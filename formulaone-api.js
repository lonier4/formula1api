const form = document.getElementById('formula1Form');
const season = document.getElementById('season');
const round = document.querySelector('#round');

form.addEventListener('submit', (event) => {
    event.preventDefault();
     getData(season.value, round.value);
});

let getData = async (season, round) => {
    let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`);
    const info = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
    createHTML(info)
}

const createHTML = (driverList) => {
    let table = document.createElement('table')
    let header = table.createTHead();
    let headerRow = header.insertRow();
    let positionHeader = headerRow.insertCell(0);
    let firstNameHeader = headerRow.insertCell(1);
    let lastNameHeader = headerRow.insertCell(2);
    let teamHeader = headerRow.insertCell(3);
    let driverNationalityHeader = headerRow.insertCell(4);
    let driverNumberHeader = headerRow.insertCell(5);
    let teamInfoHeader = headerRow.insertCell(6);

    positionHeader.innerHTML = "Position" 
    firstNameHeader.innerHTML = "Given Name" 
    lastNameHeader.innerHTML = "Family Name" 
    teamHeader.innerHTML = "Team"
    driverNationalityHeader.innerHTML = "Nationality" 
    driverNumberHeader.innerHTML = "Driver Number" 
    teamInfoHeader.innerHTML = "Team Info" 

    for (let d=0; d < driverList.length; d++){
        let row = table.insertRow()
        let position = row.insertCell(0);
        let firstName = row.insertCell(1);
        let lastName = row.insertCell(2);
        let team = row.insertCell(3);
        let driverNationality = row.insertCell(4);
        let driverNumber = row.insertCell(5);
        let teamInfo = row.insertCell(6);

        position.innerHTML = driverList[d].position
        firstName.innerHTML = driverList[d].Driver.givenName
        lastName.innerHTML = driverList[d].Driver.familyName
        team.innerHTML = driverList[d].Constructors[0].name
        driverNationality.innerHTML = driverList[d].Driver.nationality
        driverNumber.innerHTML = driverList[d].Driver.permanentNumber
        teamInfo.innerHTML = driverList[d].Constructors[0].url
    }
    table.classList.add('table1')
    document.querySelector('.driverTable').innerHTML="";
    document.querySelector('.driverTable').append(table)
}