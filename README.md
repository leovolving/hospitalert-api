<h1>HospitAlert API</h1>

https://hospitalert-api.herokuapp.com <br><br>

API for <a href="www.hospitalert.com">HospitAlert</a> built with PostgreSQL and <a href="http://docs.sequelizejs.com/">Sequelize</a>.
Find the repo for the client <a href="https://github.com/Ljyockey/hospitalert-client">here</a>.<br><br>

<h2>Tables</h2>

<h3>Users</h3>
<ul>
<li>GET (/users/dashboard) - uses Passport Basic Auth (for Demo Account only)</li>
<li>GET (/users/:name) - used for client-side searching (accepts full and partial matches)</li>
<li>POST (/users/facebook) - finds or creates account using client-side Facebok OAuth</li>
<li>DELETE (/users/:id)</li> 
</ul><br><br>

<h3>Hospitalizations</h3>
<ul>
<li>GET (/hospitalizations/:userId)</li>
<li>POST (/hospitalizations)</li>
<li>PUT (/hospitalizations/:id)</li>
<li>DELETE (/hospitalizations/:id)</li>
</ul><br><br>

<h3>Friends</h3>
<ul>
<li>GET (/friends/:userId)</li>
<li>GET (/friends/new/:id)</li>
<li>POST (/friends)</li>
<li>PUT (/friends/:id)</li>
<li>DELETE (/friends/:id)</li>
</ul>

<h2>Technologies</h2>
<ul>
<li>PostgreSQL</li>
<li>Sequelize</li>
<li>Node/Express</li>
<li>Mocha/Chai Testing</li>
<li>Continuous Integration with Travis CI</li>
</ul>