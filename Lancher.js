(function () {
            const LAUNCH_FILES = [
                {
                    name: "gladihoppers",
                    url: "https://cdn.jsdelivr.net/gh/fitzpatricconnor/GameBookmark@main/gladihoppers.html"
                }
            ];

            // Updated header text
            const HEADER_TEXT = "Game Launcher";

            function launchHtmlInNewWindow(rawHtmlUrl) {
                fetch(rawHtmlUrl)
                    .then(response => {
                        if (!response.ok) throw new Error('Failed to fetch HTML: ' + response.statusText);
                        return response.text();
                    })
                    .then(htmlText => {
                        const newWindow = window.open('about:blank', '_blank');
                        if (!newWindow) {
                            alert("Popup blocked. Please allow popups for this site and try again.");
                            return;
                        }
                        newWindow.document.write(htmlText);
                        newWindow.document.close();
                    })
                    .catch(e => {
                        console.error("Error loading external HTML:", e);
                        alert(`Could not load HTML file from ${rawHtmlUrl}. Check the console for details.`);
                    });
            }

            function createLauncherUI() {
                const mainContainer = document.createElement('div');
                mainContainer.className = 'launcher-container';

                const style = document.createElement('style');
                style.textContent = `
                    .launcher-header {
                        width: 100%;
                        height: 50px;
                        background: #111; /* solid dark header */
                        color: white;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 0 10px;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
                        border-bottom: 2px solid #222;
                    }

                    .header-title {
                        margin: 0;
                        font-size: 1.2em;
                        font-weight: bold;
                        text-shadow: 2px 2px 4px #000;
                        text-align: center;
                    }

                    .button-content {
                        padding: 20px;
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    }

                    /* Solid orange buttons */
                    .launch-button {
                        padding: 12px 16px;
                        border: 2px solid #ff9900;
                        border-radius: 6px;
                        background: linear-gradient(180deg, #ffa329, #ff8a00);
                        color: #111;
                        font-size: 1em;
                        cursor: pointer;
                        transition: transform 0.06s ease, filter 0.2s ease, box-shadow 0.2s ease;
                        font-weight: bold;
                        text-shadow: none;
                        box-shadow: 0 2px 6px rgba(255, 138, 0, 0.35);
                    }
                    .launch-button:hover {
                        filter: brightness(1.05);
                        box-shadow: 0 4px 10px rgba(255, 138, 0, 0.45);
                    }
                    .launch-button:active {
                        transform: translateY(1px) scale(0.99);
                        filter: brightness(0.97);
                    }

                    /* Responsive */
                    @media (max-width: 420px) {
                        .header-title { font-size: 1.05em; }
                        .launch-button { font-size: 0.95em; padding: 11px 14px; }
                    }
                `;
                document.head.appendChild(style);

                const header = document.createElement('div');
                header.className = 'launcher-header';

                const title = document.createElement('h1');
                title.className = 'header-title';
                title.textContent = HEADER_TEXT;
                header.appendChild(title);

                mainContainer.appendChild(header);

                const buttonContent = document.createElement('div');
                buttonContent.className = 'button-content';

                LAUNCH_FILES.forEach(file => {
                    const button = document.createElement('button');
                    button.className = 'launch-button';
                    button.textContent = file.name;
                    button.addEventListener('click', () => launchHtmlInNewWindow(file.url));
                    buttonContent.appendChild(button);
                });

                mainContainer.appendChild(buttonContent);
                document.body.appendChild(mainContainer);
            }

            createLauncherUI();
        })();
