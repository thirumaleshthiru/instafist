async function getInstagramData() {
    const urlInput = document.getElementById('url').value.trim();
    const videoUrl = document.getElementById('instavid');
    const downloadButton = document.getElementById('download');
    const loadingMessage = document.querySelector('.loading');

    try {
        if (urlInput === '') {
            throw new Error('Please enter a valid Instagram URL.');
        }

        // Display loading message
        loadingMessage.style.display = 'block';

        const response = await fetch(`https://nice-gray-barnacle-yoke.cyclic.app/getInstagramData?url=${encodeURIComponent(urlInput)}`);
        const jsonData = await response.json();

        // Hide loading message
        loadingMessage.style.display = 'none';

        if (jsonData.length > 0) {
            // Display video and show download button
            videoUrl.src = jsonData[0].download_link;
            videoUrl.style.display = 'block';
            downloadButton.style.display = 'block';
        } else {
            alert('Please Try Again (Invalid URL/Instram Might Restricted/Server Problem');
        }
    } catch (error) {
        console.error('Error fetching Instagram URL:', error);
        alert(error.message);
        // Hide loading message in case of an error
        loadingMessage.style.display = 'none';
    }
}

document.getElementById("submit").onclick = function () {
    getInstagramData();
};

function downloadVideo() {
    // Redirect to the download link
    window.location.href = document.getElementById('instavid').src;
}
