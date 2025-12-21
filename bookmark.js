javascript: (async () => {
    const htmlUrl = 'https://cdn.jsdelivr.net/gh/fitzpatricconnor/GameBookmark@main/GameLauncher.html'; 
    try {
        const response = await fetch(htmlUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const htmlContent = await response.text();
        document.open();
        document.write(htmlContent);
        document.close();
    } catch (error) {
        alert('Error loading HTML: ' + error.message);
    }
})();
