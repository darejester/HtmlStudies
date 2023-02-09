const http = require('http');
const url = require('url');

// Import our static data
const teams = require('./teams.json');
const all_standings = require('./standings.json');
// The two variables above are now arrays of objects.  They
// will be your data for the application.  You shouldn't have to 
// read the files again.

// Some basic lists derived from the standings.  You will probable
// find these useful when building your pages
// Make sure you take a look at what this functionality is doing - 
// the map function is incredibly helpful for transforming arrays, 
// and the use of Set and Array.from allow you to remove duplicates.

// Array.from - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
// Set - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
// Array.map - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
const years = Array.from(new Set(all_standings.map(s => s.year)));
const leagues = Array.from(new Set(all_standings.map(s => s.league)));
const divisions = Array.from(new Set(all_standings.map(s => s.division)));

const heading = (title) => {
    const html = `
        <!doctype html>
            <html>
                <head>
                    <title>${title}</title>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.min.css">
                </head>
                <body>
                    <a href='/'>Home</a>
                    <br>
                    <h1>${title}</h1>
                </body>
            </html>
    `;
    return html;
}

const footing = () => {
    return `
        </body>
    </html>
    `;
}

//homePage
const homePage = () => {
    const html = `
        <!doctype html>
            <html>
                <body>
                    <p>
                        <a href='/teams'>Teams</a>
                        <br>
                        <p> 
                            Standings 
                        </p>
                        <ul>
                            <li>
                                <a href = '/standings/2022'>2022 Season</a>
                                <p>
                                    <ul>
                                   
                                        <li>
                                            <a>AL</a>
                                            <ul>
                                                <li>
                                                    <a>East</a>
                                                </li>
                                                <li>
                                                    <a>Central</a>
                                                </li>
                                                <li>
                                                    <a>West</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a>NL</a>
                                            <ul>
                                                <li>
                                                    <a>East</a>
                                                </li>
                                                <li>
                                                    <a>Central</a>
                                                </li>
                                                <li>
                                                    <a>West</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </p>
                            </li>
                            <p></p>
                            <li>
                                <a href = '/standings/2021'>2021 Season</a>
                                <p>
                                    <ul>
                                   
                                        <li>
                                            <a>AL</a>
                                            <ul>
                                                <li>
                                                    <a>East</a>
                                                </li>
                                                <li>
                                                    <a>Central</a>
                                                </li>
                                                <li>
                                                    <a>West</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a>NL</a>
                                            <ul>
                                                <li>
                                                    <a>East</a>
                                                </li>
                                                <li>
                                                    <a>Central</a>
                                                </li>
                                                <li>
                                                    <a>West</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </p>
                            </li>
                        </ul>
                    </p>
                    <p>

                </body>
            </html>
    `;
    return html;
}

//teamsPage
const teamsPage = () => {
    const html = `
        <!doctype html>
            <html>
                <body>
                    <p>
                        <b> LOGO	CITY	NAME	CODE</b>
                    </p>
                </body>
            </html>
    `;
    return html;
}



const serve = (req, res) => {
    const uri = url.parse(req.url).pathname;
    const parts = uri.split('/').splice(1);
    // parts[0] is going to be 'teams', 'standings', or '' - '' (homepage)
    console.log(parts[0]);
    //console.log(uri);

    // You should examine the URL to determine which page to build.
    // Each page will have the same heading part and footing - it's the contents
    // that will be different.

    // Hint:  Make one function for each page, and having it return the html
    // content, and reuse heading/footing for all of them.

    // For the starter, I'm just building a generic page with a generic title.
    const demo_site = `https://cmps369-p1.onrender.com/`;
    //html = heading('Home') + `<p>Not much here yet... but check out the <a href="${demo_site}">demo</a>!</p>` + footing();
    

    switch (parts[0]) {
        //home page
        case "":
            html = heading('Home') + homePage() + footing();
            res.write(html);
            res.end();
            break;
        case "teams":
            html = heading('Teams') + teamsPage() + footing()
            res.write(html);
            res.end();
            break;
        default:
            html = heading("Home") + '<p>Not much here yet...</p>' + footing();
            res.write(html);
            res.end();
            break;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    //res.write(html);
    //res.end();
}


// run server on port 3000
http.createServer(serve).listen(3000);
