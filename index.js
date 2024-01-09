 // Function to fetch and display data
 function fetchData() {
   
    fetch('https://services.isrostats.in/api/launches')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Process the data and display it in the table

            function compareSeq(a, b) {
                return a.SerialNumber - b.SerialNumber;
            }
            
            // Sort the array based on the compare function
            data.sort(compareSeq);

            displayData(data,1);
            generatePagination(data)
           
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}


// Function to generate pagination links
function generatePagination(itemList) {
    var totalItems = itemList.length;
    var itemsPerPage = 5;
    var totalPages = Math.ceil(totalItems / itemsPerPage);

    var paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    for (var i = 1; i <= totalPages; i++) {
        var listItem = document.createElement('li');
        listItem.textContent = i;
        listItem.addEventListener('click', function () {
            var pageNumber = parseInt(this.textContent);
            displayData(itemList,pageNumber);

            // Highlight the active page
            document.querySelectorAll('.pagination li').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
        });

        paginationContainer.appendChild(listItem);
    }
}

// Function to display data in the HTML table
function displayData(itemList,pageNumber) {

            var itemsPerPage = 5;
            var startIndex = (pageNumber - 1) * itemsPerPage;
            var endIndex = startIndex + itemsPerPage;

            var dataBody = document.getElementById('dataBody');

            // Clear existing rows in the table body
            dataBody.innerHTML = '';
            var i=(pageNumber-1)*5;
            i++;
            var pageItems = itemList.slice(startIndex, endIndex);
            pageItems.forEach(entry => {
                var row = document.createElement('tr');
                var name  = document.createElement('td');
                var serialNumber = document.createElement('td');
                var LaunchDate = document.createElement('td');
                var Payload = document.createElement('td');
                var MissionStatus = document.createElement('td');
                var link = document.createElement('td');
                var num = document.createElement('td');
        
                var tag = document.createElement('a');
                tag.href = entry.Link;
                tag.textContent = 'Link';
                link.appendChild(tag);
                name.textContent = entry.Name;
                serialNumber.textContent = entry.SerialNumber;
                LaunchDate.textContent = entry.LaunchDate;
                Payload.textContent = entry.Payload;
                MissionStatus.textContent = entry.MissionStatus;
                row.appendChild(serialNumber);
                
                row.appendChild(name);
            
                row.appendChild(LaunchDate);
                row.appendChild(Payload);
                row.appendChild(MissionStatus);
                row.appendChild(link);

                var addButton = document.createElement('button');
                addButton.textContent = '+';
                addButton.className = 'favorite-button';
                addButton.addEventListener('click', function () {
                    addToFavorites(entry);
                });
                row.appendChild(addButton);
                
                dataBody.appendChild(row);
            });
   

   

    
}
function addToFavorites(entry) {

    let dataBody = document.getElementById('favTableBody');


    var row = document.createElement('tr');
    var name  = document.createElement('td');
    var serialNumber = document.createElement('td');
    var LaunchDate = document.createElement('td');
    var Payload = document.createElement('td');
    var MissionStatus = document.createElement('td');
    var link = document.createElement('td');
    var num = document.createElement('td');

    var tag = document.createElement('a');
    tag.href = entry.Link;
    tag.textContent = 'Link';
    link.appendChild(tag);
    name.textContent = entry.Name;
    serialNumber.textContent = entry.SerialNumber;
    LaunchDate.textContent = entry.LaunchDate;
    Payload.textContent = entry.Payload;
    MissionStatus.textContent = entry.MissionStatus;
    row.appendChild(serialNumber);

    row.appendChild(name);
    
    row.appendChild(LaunchDate);
    row.appendChild(Payload);
    row.appendChild(MissionStatus);
    row.appendChild(link);

    var addButton = document.createElement('button');
    addButton.textContent = '-';
    addButton.className = 'favorite-button';
    addButton.addEventListener('click', function () {
        var parentTr = this.parentNode;
        parentTr.parentNode.removeChild(parentTr);
    });
    row.appendChild(addButton);
    
    dataBody.appendChild(row);
}

// Call the fetchData function when the page loads
document.addEventListener('DOMContentLoaded', function () {
    fetchData();
   
});