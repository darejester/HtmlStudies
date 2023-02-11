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

//controller
const controller = (parts) => {
  console.log(parts);

}

//homePage
// const homePage = () => {
//     const html = `
//         <!doctype html>
//             <html>
//                 <body>
//                     <p>
//                         <a href='/teams'>Teams</a>
//                         <br>
//                         <p> 
//                             Standings 
//                         </p>
//                         <ul>
//                             <li>
//                                 <a href = '/standings/2022'>2022 Season</a>
//                                 <p>
//                                     <ul>
                                   
//                                         <li>
//                                             <a>AL</a>
//                                             <ul>
//                                                 <li>
//                                                     <a>East</a>
//                                                 </li>
//                                                 <li>
//                                                     <a>Central</a>
//                                                 </li>
//                                                 <li>
//                                                     <a>West</a>
//                                                 </li>
//                                             </ul>
//                                         </li>
//                                         <li>
//                                             <a>NL</a>
//                                             <ul>
//                                                 <li>
//                                                     <a>East</a>
//                                                 </li>
//                                                 <li>
//                                                     <a>Central</a>
//                                                 </li>
//                                                 <li>
//                                                     <a>West</a>
//                                                 </li>
//                                             </ul>
//                                         </li>
//                                     </ul>
//                                 </p>
//                             </li>
//                             <p></p>
//                             <li>
//                                 <a href = '/standings/2021'>2021 Season</a>
//                                 <p>
//                                     <ul>
                                   
//                                         <li>
//                                             <a>AL</a>
//                                             <ul>
//                                                 <li>
//                                                     <a>East</a>
//                                                 </li>
//                                                 <li>
//                                                     <a>Central</a>
//                                                 </li>
//                                                 <li>
//                                                     <a>West</a>
//                                                 </li>
//                                             </ul>
//                                         </li>
//                                         <li>
//                                             <a>NL</a>
//                                             <ul>
//                                                 <li>
//                                                     <a>East</a>
//                                                 </li>
//                                                 <li>
//                                                     <a>Central</a>
//                                                 </li>
//                                                 <li>
//                                                     <a>West</a>
//                                                 </li>
//                                             </ul>
//                                         </li>
//                                     </ul>
//                                 </p>
//                             </li>
//                         </ul>
//                     </p>
//                     <p>

//                 </body>
//             </html>
//     `;
//     return html;
// }

const homePage = () => { 
    const html = `
    <!doctype html>
    <html>
      <body>
        <p>
          <a href='/teams'>Teams</a>
          <br>
          <p>Standings</p>
          <ul>
            ${years.map(year => `
              <li>
                <a href='/standings/${year}'>${year} Season</a>
                <p>
                  <ul>
                    ${leagues.map(league => `
                      <li>
                        <a href = '/standings/${year}/${league}'>${league}</a>
                        <ul>
                          ${divisions.map(division => `
                            <li>
                              <a href='/standings/${year}/${league}/${division}'>${division}</a>
                            </li>
                          `).join('')}
                        </ul>
                      </li>
                    `).join('')}
                  </ul>
                </p>
              </li>
            `).join('')}
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
              <table>
                <tr style="border-bottom:1px solid white">
                  <th>LOGO</th>
                  <th>CITY</th>
                  <th>NAME</th>
                  <th>CODE</th>
                </tr>
                
                ${teams.map(team => `
                <tr>
                  <td><img src="${team.logo}"></td>
                  <td>${team.city}</td>
                  <td>${team.name}</td>
                  <td>${team.code}</td>
                </tr>
                `).join('')}
              </table>
            </html>
    `;
    return html;
}

//standingsPage
//all_standings.team === team.code
const standingsPage = (a_year) => {
  //find standings for this year
  const yearStandings = all_standings.filter(standing => standing.year === a_year);
  //sort this year's standings based on wins
  const sortedStandings = yearStandings.sort((a, b) => b.wins - a.wins);

  const html = 
    `<!doctype html>
            <html>
              <table>
                <tr style="border-bottom:1px solid white">
                  <th>LOGO</th>
                  <th>CITY</th>
                  <th>NAME</th>
                  <th>WINS</th>
                  <th>LOSSES</th>
                </tr>
                
                ${sortedStandings.map(standing => {team = teams.find(team1 => team1.code === standing.team);
                  return `
                    <tr>
                      <td><img src="${team.logo}"></td>
                      <td>${team.city}</td>
                      <td>${team.name}</td>
                      <td>${standing.wins}</td>
                      <td>${standing.losses}</td>
                    </tr>
                  `;
                }).join('')}
                
              </table>
            </html>
    `;
    return html;
}

//leaguesPage
const leaguesPage = (a_year, a_league) =>{
  //find standings for this year
  const yearStandings = all_standings.filter(standing => standing.year === a_year && standing.league === a_league);
  //sort this year's standings based on wins
  const sortedStandings = yearStandings.sort((a, b) => b.wins - a.wins);

  const html = 
    `<!doctype html>
            <html>
              <table>
                <tr style="border-bottom:1px solid white">
                  <th>LOGO</th>
                  <th>CITY</th>
                  <th>NAME</th>
                  <th>WINS</th>
                  <th>LOSSES</th>
                </tr>
                
                ${sortedStandings.map(standing => {team = teams.find(team1 => team1.code === standing.team);
                  return `
                    <tr>
                      <td><img src="${team.logo}"></td>
                      <td>${team.city}</td>
                      <td>${team.name}</td>
                      <td>${standing.wins}</td>
                      <td>${standing.losses}</td>
                    </tr>
                  `;
                }).join('')}
                
              </table>
            </html>
    `;
    return html;
}

//divisionsPage
const divisionsPage = (a_year, a_league, a_division) =>{
  //find standings for this year
  const yearStandings = all_standings.filter(standing => standing.year === a_year && standing.league === a_league && standing.division === a_division);
  //sort this year's standings based on wins
  const sortedStandings = yearStandings.sort((a, b) => b.wins - a.wins);

  const html = 
    `<!doctype html>
            <html>
              <table>
                <tr style="border-bottom:1px solid white">
                  <th>LOGO</th>
                  <th>CITY</th>
                  <th>NAME</th>
                  <th>WINS</th>
                  <th>LOSSES</th>
                </tr>
                
                ${sortedStandings.map(standing => {team = teams.find(team1 => team1.code === standing.team);
                  return `
                    <tr>
                      <td><img src="${team.logo}"></td>
                      <td>${team.city}</td>
                      <td>${team.name}</td>
                      <td>${standing.wins}</td>
                      <td>${standing.losses}</td>
                    </tr>
                  `;
                }).join('')}
                
              </table>
            </html>
    `;
    return html;
}

const serve = (req, res) => {
    const uri = url.parse(req.url).pathname;
    const parts = uri.split('/').splice(1);
    // parts[0] is going to be 'teams', 'standings', or '' - '' (homepage)
    //console.log(parts[0]);
    //console.log(uri);

    // You should examine the URL to determine which page to build.
    // Each page will have the same heading part and footing - it's the contents
    // that will be different.

    // Hint:  Make one function for each page, and having it return the html
    // content, and reuse heading/footing for all of them.

    // For the starter, I'm just building a generic page with a generic title.
    const demo_site = `https://cmps369-p1.onrender.com/`;
    //html = heading('Home') + `<p>Not much here yet... but check out the <a href="${demo_site}">demo</a>!</p>` + footing();
    //console.log(years);
    //console.log(leagues);
    //console.log(divisions);
    //years.forEach(year => console.log(year));
    controller(parts)   

    switch (parts[0]) {
        //home page
        case '':
          html = heading('Home') + homePage() + footing();
          res.write(html);
          res.end();
          break;
        //teams  
        case "teams":
          html = heading('Teams') + teamsPage() + footing()
          res.write(html);
          res.end();
          break;
        //standings and sub categories
        case "standings":
          if (parts[1])
          {
            if(parts[2])
            {
              if(parts[3])
              {
                html = heading("Standings - " + parts[1] + " - " + parts[2] + " - " + parts[3]) + divisionsPage(parts[1],parts[2],parts[3]) + footing()
                res.write(html);
                res.end();
              }
              else
              {
                html = heading("Standings - " + parts[1] + " - " + parts[2]) + leaguesPage(parts[1],parts[2]) + footing()
                res.write(html);
                res.end();
              }
            }
            else
            {
              html = heading("Standings - " + parts[1]) + standingsPage(parts[1]) + footing()
              res.write(html);
              res.end();
            }
            
          }
          break;
        default:
          html = '<p>ERROR 404</p>' 
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
