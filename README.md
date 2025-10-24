# WEB103 Project 4 - *Edit-Racket*

Submitted by: **Jose Huertero**

About this web app: **Edit-Racket is a full-stack CRUD web app where users design and manage custom tennis rackets. The React frontend lets you configure multiple features (head size, frame color, grip, string pattern, plus options like extended length and custom paint) and see a live visual preview and dynamic pricing as you change options. Submissions are saved to a PostgreSQL database via a Node/Express API; you can list all created rackets, view details, edit, or delete them. The app validates feature combinations to prevent impossible builds, and the UI mirrors a modern “configure-and-buy” experience tailored to tennis gear.**

Time spent: **10** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->
- [x] **The web app uses React to display data from the API.**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured `CustomItem` table.**
  - [x]  **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [x]  **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**
- [x] **Users can view **multiple** features of the `CustomItem` (e.g. car) they can customize, (e.g. wheels, exterior, etc.)**
- [x] **Each customizable feature has multiple options to choose from (e.g. exterior could be red, blue, black, etc.)**
- [x] **On selecting each option, the displayed visual icon for the `CustomItem` updates to match the option the user chose.**
- [x] **The price of the `CustomItem` (e.g. car) changes dynamically as different options are selected *OR* The app displays the total price of all features.**
- [x] **The visual interface changes in response to at least one customizable feature.**
- [x] **The user can submit their choices to save the item to the list of created `CustomItem`s.**
- [x] **If a user submits a feature combo that is impossible, they should receive an appropriate error message and the item should not be saved to the database.**
- [x] **Users can view a list of all submitted `CustomItem`s.**
- [x] **Users can edit a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can delete a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can update or delete `CustomItem`s that have been created from the detail page.**


The following **optional** features are implemented:

- [ ] Selecting particular options prevents incompatible options from being selected even before form submission

The following **additional** features are implemented:

- [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='https://imgur.com/zQ6KYeg.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  GIF tool here


[ScreenToGif](https://www.screentogif.com/) for Windows


## Notes

One challenge in building this app was getting the PostgreSQL database connection to work correctly with Render’s SSL requirements—initially, the server returned errors like “The server does not support SSL connections.” Fixing it required updating the database.js configuration to include ssl: { require: true, rejectUnauthorized: false }. Another issue involved file-name casing in imports (e.g., RacketCard.jsx vs. racketCard.jsx), which caused build failures on Windows. Finally, setting up the React-Express connection (port 5173 vs. 3001) and debugging 500 Internal Server Errors during API requests took careful coordination between the front-end fetch paths and the server routes. Once these were resolved, the app ran smoothly, allowing full CRUD operations and a clean tabbed interface for racket customization.

## License

Copyright [2025] [Jose Huertero]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
