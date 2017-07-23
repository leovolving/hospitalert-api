https://hospitalert-api.herokuapp.com <br><br>

API for <a href="www.hospitalert.com">HospitAlert</a> built with PostgreSQL and <a href="http://docs.sequelizejs.com/">Sequelize</a>.<br><br>

<b>Tables</b>
<ul>
<li>Users</li>
<li>Hospitalizations</li>
<li>Friends</li>
</ul><br><br>

<b>Users</b>
<ul>
<li>GET (/users/dashboard) - uses Passport Basic Auth (for Demo Account only)</li>
<li>GET (/users/:name) - used for client-side searching (accepts full and partial matches)</li>
<li>POST (/users/facebook) - finds or creates account using client-side Facebok OAuth</li>
<li>DELETE (/users/:id)</li> 
</ul><br><br>

<b>Hospitalizations</b>
<ul>
<li>GET (/hospitalizations/:userId)</li>
<li>POST (/hospitalizations)</li>
<li>PUT (/hospitalizations/:id)</li>
<li>DELETE (/hospitalizations/:id)</li>
</ul><br><br>

<b>Friends</b>
<ul>
<li>GET (/friends/:userId)</li>
<li>GET (/friends/new/:id)</li>
<li>POST (/friends)</li>
<li>PUT (/friends/:id)</li>
<li>DELETE (/friends/:id)</li>
</ul>