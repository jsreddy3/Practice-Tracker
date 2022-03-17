CS193X Final Project
====================

Project Name: Practice Tracker
Your Name: Jaiden Reddy
Your SUNetID: jaiden

Overview
--------
My project allows individuals who practice music to log their practice sessions. It allows them to pick their primary instrument and view previous practices. Although there is no security, individuals can log in and see practices across sessions.

Running
-------
Nothing other than npm install and npm start is required.
To use the app, a user has to login (any credential will work), and to see it functioning, the user has to add some practices, click around a bit, etc.

Features
--------
1. Login: Users can login to their account and see their practice summary. If they have never logged in before, their account will be created.

2. Create Practice: There is a form that can be used to create practices. It is prominent on the primary page.

3. Add Practice: This button automatically fills the create practice form with the current day and time. This is a convenient way to add a practice session happening right now. There may be some odd behavior around midnight, as the app does not handle practices stretching multiple days.

4. Manage Practices: practices are displayed and ordered by time. They can be deleted, but not edited.

5. Instrument: Under the username is the picture of each user's primary instrument. The default primary instrument is a violin. Clicking the Instrument tab allows the user to update their primary instrument.

6. Changing Instrument: The current instrument is automatically highlighted when the user navigates to the instrument page. If they click a new instrument, it will be highlighted, but it does not update the user's instrument or the practice log picture unless the update button is clicked. The user can return to the practice log page using the back to practice log button if they do not want to update their primary instrument.

Collaboration and libraries
---------------------------
I did not use any external libraries or collaborate. Some code, like the apiRequest wrapper function or the loadOrCreate function, were reused from assignments.

Anything else?
-------------
I really enjoyed this course, and I feel like I learned a lot.
